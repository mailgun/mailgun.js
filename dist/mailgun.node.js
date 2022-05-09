/*! mailgun.js v6.0.0 */
/*! mailgun.js v6.0.0 */
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

  DomainClient.prototype.verify = function (domain) {
    var _this = this;

    return this.request.put("/v3/domains/".concat(domain, "/verify")).then(function (res) {
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

/***/ "./lib/formDataBuilder.ts":
/*!********************************!*\
  !*** ./lib/formDataBuilder.ts ***!
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

var FormDataBuilder =
/** @class */
function () {
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

  FormDataBuilder.prototype.isNodeFormData = function (formDataInstance) {
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
    if (this.isNodeFormData(formDataInstance)) {
      if (Buffer.isBuffer(data)) {
        formDataInstance.append(key, data, {
          filename: 'MimeMessage'
        });
      }
    } else {
      formDataInstance.append(key, data, 'MimeMessage');
    }
  };

  FormDataBuilder.prototype.addFilesToFD = function (propertyName, value, formDataInstance) {
    var _this = this;

    var appendFileToFD = function (originalKey, obj, formData) {
      var key = originalKey === 'multipleValidationFile' ? 'file' : originalKey;

      var isStreamData = _this.isStream(obj);

      var objData = isStreamData ? obj : obj.data; // getAttachmentOptions should be called with obj parameter to prevent loosing filename

      var options = _this.getAttachmentOptions(obj);

      if (_this.isNodeFormData(formData)) {
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

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var IpPoolsClient =
/** @class */
function () {
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
            return [4
            /*yield*/
            , this.request.postWithFD('/v1/ip_pools', data)];

          case 1:
            response = _a.sent();
            return [2
            /*return*/
            , __assign({
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
            return [4
            /*yield*/
            , this.request.patchWithFD("/v1/ip_pools/".concat(poolId), data)];

          case 1:
            response = _a.sent();
            return [2
            /*return*/
            , __assign({
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
            return [4
            /*yield*/
            , this.request.delete("/v1/ip_pools/".concat(poolId), data)];

          case 1:
            response = _a.sent();
            return [2
            /*return*/
            , __assign({
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

/***/ "./lib/ips.ts":
/*!********************!*\
  !*** ./lib/ips.ts ***!
  \********************/
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
    return __awaiter(this, void 0, void 0, function () {
      var response;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4
            /*yield*/
            , this.request.get('/v3/ips', query)];

          case 1:
            response = _a.sent();
            return [2
            /*return*/
            , this.parseIpsResponse(response)];
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
            return [4
            /*yield*/
            , this.request.get("/v3/ips/".concat(ip))];

          case 1:
            response = _a.sent();
            return [2
            /*return*/
            , this.parseIpsResponse(response)];
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

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var MultipleValidationClient =
/** @class */
function () {
  function MultipleValidationClient(request) {
    this.request = request;
  }

  MultipleValidationClient.prototype.handleResponse = function (response) {
    return __assign({
      status: response.status
    }, response === null || response === void 0 ? void 0 : response.body);
  };

  MultipleValidationClient.prototype.list = function () {
    return __awaiter(this, void 0, void 0, function () {
      var response;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4
            /*yield*/
            , this.request.get('/v4/address/validate/bulk')];

          case 1:
            response = _a.sent();
            return [2
            /*return*/
            , this.handleResponse(response)];
        }
      });
    });
  };

  MultipleValidationClient.prototype.get = function (listId) {
    return __awaiter(this, void 0, void 0, function () {
      var response;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4
            /*yield*/
            , this.request.get("/v4/address/validate/bulk/".concat(listId))];

          case 1:
            response = _a.sent();
            return [2
            /*return*/
            , __assign({
              responseStatusCode: response.status
            }, response === null || response === void 0 ? void 0 : response.body)];
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
            return [4
            /*yield*/
            , this.request.postWithFD("/v4/address/validate/bulk/".concat(listId), multipleValidationData)];

          case 1:
            response = _a.sent();
            return [2
            /*return*/
            , this.handleResponse(response)];
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
            return [4
            /*yield*/
            , this.request.delete("/v4/address/validate/bulk/".concat(listId))];

          case 1:
            response = _a.sent();
            return [2
            /*return*/
            , this.handleResponse(response)];
        }
      });
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

var formDataBuilder_1 = __importDefault(__webpack_require__(/*! ./formDataBuilder */ "./lib/formDataBuilder.ts"));

var Request =
/** @class */
function () {
  function Request(options, formData) {
    this.username = options.username;
    this.key = options.key;
    this.url = options.url;
    this.timeout = options.timeout;
    this.headers = options.headers || {};
    this.formDataBuilder = new formDataBuilder_1.default(formData);
  }

  Request.prototype.request = function (method, url, onCallOptions) {
    return __awaiter(this, void 0, void 0, function () {
      var options, basic, onCallHeaders, headers, params, response, res_1, res;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            options = __assign({}, onCallOptions);
            basic = base64.encode("".concat(this.username, ":").concat(this.key));
            onCallHeaders = options.headers ? options.headers : {};
            headers = __assign(__assign({
              Authorization: "Basic ".concat(basic)
            }, this.headers), onCallHeaders);
            options === null || options === void 0 ? true : delete options.headers;
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
            response = _a.sent();
            if (!!(response === null || response === void 0 ? void 0 : response.ok)) return [3
            /*break*/
            , 3];
            return [4
            /*yield*/
            , this.getResponseBody(response)];

          case 2:
            res_1 = _a.sent();
            throw new error_1.default({
              status: response === null || response === void 0 ? void 0 : response.status,
              statusText: response === null || response === void 0 ? void 0 : response.statusText,
              body: res_1.body
            });

          case 3:
            return [4
            /*yield*/
            , this.getResponseBody(response)];

          case 4:
            res = _a.sent();
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
            res.status = 400;
            res.body = {
              message: responseString
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
    return this.command('post', url, formData, {}, false);
  };

  Request.prototype.putWithFD = function (url, data) {
    var formData = this.formDataBuilder.createFormData(data);
    return this.command('put', url, formData, {}, false);
  };

  Request.prototype.patchWithFD = function (url, data) {
    var formData = this.formDataBuilder.createFormData(data);
    return this.command('patch', url, formData, {}, false);
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
    return __awaiter(this, void 0, void 0, function () {
      var query, result;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            query = {
              address: address
            };
            return [4
            /*yield*/
            , this.request.get('/v4/address/validate', query)];

          case 1:
            result = _a.sent();
            return [2
            /*return*/
            , result.body];
        }
      });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LEdBQUc7QUFDSDs7QUFFQSw4RUFBa0M7Ozs7Ozs7Ozs7O0FDaENsQztBQUNBLENBQUMsS0FBNEQ7QUFDN0QsQ0FBQyxDQUNpRztBQUNsRyxDQUFDLHNCQUFzQjs7QUFFdkI7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxrREFBa0Q7QUFDbEQ7QUFDQSxrREFBa0Q7O0FBRWxEO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxvQkFBb0I7QUFDcEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEdBQUc7O0FBRUg7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDBDQUEwQztBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLGlDQUFpQztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esc0RBQXNELHlCQUF5QjtBQUMvRTs7QUFFQTtBQUNBO0FBQ0EsMkVBQTJFLGVBQWU7QUFDMUY7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNB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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxNQUFNO0FBQ047QUFDQSxJQUFJO0FBQ0o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHLElBQUk7QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0EsR0FBRyxJQUFJO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBLEVBQUUsSUFBSTtBQUNOOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsOENBQThDO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNB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QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtEQUFrRCxPQUFPO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxrQkFBa0I7QUFDL0IsZUFBZSxrQkFBa0I7QUFDakMsYUFBYSxrQkFBa0I7QUFDL0IsbUJBQW1CLGtCQUFrQjtBQUNyQyxtQkFBbUI7QUFDbkIsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLGdDQUFnQztBQUM3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdFQUFnRSxNQUFNO0FB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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLHFCQUFxQjtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxREFBcUQsa0RBQWtEO0FBQ3ZHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxREFBcUQsNENBQTRDO0FBQ2pHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBLGlEQUFpRCxtREFBbUQ7QUFDcEcsd0ZBQXdGO0FBQ3hGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLGtCQUFrQjtBQUMvQixhQUFhLGtCQUFrQjtBQUMvQixtQkFBbUIsa0JBQWtCO0FBQ3JDLGFBQWEsa0JBQWtCO0FBQy9CLGNBQWMsa0JBQWtCO0FBQ2hDLG1CQUFtQixrQkFBa0I7QUFDckMsYUFBYTtBQUNiLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix1Q0FBdUM7QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSw2Q0FBNkM7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixrQkFBa0I7QUFDckMsY0FBYyxrQkFBa0I7QUFDaEMsYUFBYTtBQUNiLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscURBQXFELE1BQU07QUFDM0Q7QUFDQTtBQUNBO0FBQ0Esc0VBQXNFLE1BQU07QUFDNUU7QUFDQTtBQUNBO0FBQ0Esa0VBQWtFLE1BQU07QUFDeEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyREFBMkQsaURBQWlEO0FBQzVHO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQixpQkFBaUI7QUFDakIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQSx3QkFBd0IsdUNBQXVDO0FBQy9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxrQkFBa0I7QUFDL0IsZUFBZSxrQkFBa0I7QUFDakMsYUFBYSxrQkFBa0I7QUFDL0IsbUJBQW1CO0FBQ25CLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0VBQXNFLE1BQU07QUFDNUU7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhFQUE4RSxTQUFTO0FBQ3ZGO0FBQ0E7QUFDQSx1RUFBdUUsU0FBUztBQUNoRjtBQUNBO0FBQ0EsbUVBQW1FLFNBQVM7QUFDNUU7QUFDQTtBQUNBLHFFQUFxRSxTQUFTO0FBQzlFLGtGQUFrRixTQUFTO0FBQzNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsS0FBSztBQUNuQjtBQUNBLCtCQUErQixTQUFTLEdBQUcsS0FBSztBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3RkFBd0YsU0FBUztBQUNqRztBQUNBO0FBQ0E7QUFDQSxjQUFjLEtBQUs7QUFDbkI7QUFDQSwrQkFBK0IsU0FBUyxHQUFHLEtBQUs7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyxTQUFTO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLFNBQVM7QUFDeEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQyxTQUFTO0FBQy9DO0FBQ0E7QUFDQSxzQ0FBc0MsU0FBUztBQUMvQyxhQUFhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGtCQUFrQjtBQUMxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMERBQTBELDJDQUEyQztBQUNyRztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdGQUFnRjtBQUNoRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkM7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUM7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksc0JBQXNCO0FBQ2xDO0FBQ0E7QUFDQSxvRUFBb0U7QUFDcEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxrQkFBa0I7QUFDaEMsaUJBQWlCLGtCQUFrQjtBQUNuQyxtQkFBbUIsa0JBQWtCO0FBQ3JDLGNBQWMsa0JBQWtCO0FBQ2hDLFdBQVcsa0JBQWtCO0FBQzdCLGNBQWMsa0JBQWtCO0FBQ2hDLGNBQWM7QUFDZCxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscURBQXFELE1BQU07QUFDM0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixrQkFBa0I7QUFDdkMsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxnRUFBZ0UsTUFBTTtBQUN0RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNB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Olsid2VicGFjazovL21haWxndW4vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL21haWxndW4vLi9ub2RlX21vZHVsZXMvYWJvcnQtY29udHJvbGxlci9kaXN0L2Fib3J0LWNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL2xpYi9jbGllbnQudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL2xpYi9kb21haW5zLnRzIiwid2VicGFjazovL21haWxndW4vLi9saWIvZG9tYWluc0NyZWRlbnRpYWxzLnRzIiwid2VicGFjazovL21haWxndW4vLi9saWIvZG9tYWluc1RhZ3MudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL2xpYi9kb21haW5zVGVtcGxhdGVzLnRzIiwid2VicGFjazovL21haWxndW4vLi9saWIvZXJyb3IudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL2xpYi9ldmVudHMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL2xpYi9mb3JtRGF0YUJ1aWxkZXIudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL2xpYi9pbmRleC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLy4vbGliL2ludGVyZmFjZXMvU3VwcmVzc2lvbnMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL2xpYi9pcC1wb29scy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLy4vbGliL2lwcy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLy4vbGliL2xpc3RzLnRzIiwid2VicGFjazovL21haWxndW4vLi9saWIvbWFpbExpc3RNZW1iZXJzLnRzIiwid2VicGFjazovL21haWxndW4vLi9saWIvbWVzc2FnZXMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL2xpYi9tdWx0aXBsZVZhbGlkYXRpb24udHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL2xpYi9yZXF1ZXN0LnRzIiwid2VicGFjazovL21haWxndW4vLi9saWIvcm91dGVzLnRzIiwid2VicGFjazovL21haWxndW4vLi9saWIvc3RhdHMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL2xpYi9zdXBwcmVzc2lvbnMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL2xpYi92YWxpZGF0ZS50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLy4vbGliL3dlYmhvb2tzLnRzIiwid2VicGFjazovL21haWxndW4vLi9ub2RlX21vZHVsZXMvYmFzZS02NC9iYXNlNjQuanMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL25vZGVfbW9kdWxlcy9kYXRhLXVyaS10by1idWZmZXIvZGlzdC9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL25vZGVfbW9kdWxlcy9ldmVudC10YXJnZXQtc2hpbS9kaXN0L2V2ZW50LXRhcmdldC1zaGltLmpzIiwid2VicGFjazovL21haWxndW4vLi9ub2RlX21vZHVsZXMvZmV0Y2gtYmxvYi9pbmRleC5qcyIsIndlYnBhY2s6Ly9tYWlsZ3VuLy4vbm9kZV9tb2R1bGVzL2t5LXVuaXZlcnNhbC9pbmRleC5qcyIsIndlYnBhY2s6Ly9tYWlsZ3VuLy4vbm9kZV9tb2R1bGVzL2t5L3VtZC5qcyIsIndlYnBhY2s6Ly9tYWlsZ3VuLy4vbm9kZV9tb2R1bGVzL3VybC1qb2luL2xpYi91cmwtam9pbi5qcyIsIndlYnBhY2s6Ly9tYWlsZ3VuL2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJjcnlwdG9cIiIsIndlYnBhY2s6Ly9tYWlsZ3VuL2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJodHRwXCIiLCJ3ZWJwYWNrOi8vbWFpbGd1bi9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwiaHR0cHNcIiIsIndlYnBhY2s6Ly9tYWlsZ3VuL2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJzdHJlYW1cIiIsIndlYnBhY2s6Ly9tYWlsZ3VuL2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJ1cmxcIiIsIndlYnBhY2s6Ly9tYWlsZ3VuL2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJ1dGlsXCIiLCJ3ZWJwYWNrOi8vbWFpbGd1bi9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwiemxpYlwiIiwid2VicGFjazovL21haWxndW4vLi9ub2RlX21vZHVsZXMvbm9kZS1mZXRjaC9kaXN0L2luZGV4LmNqcyIsIndlYnBhY2s6Ly9tYWlsZ3VuLy4vbm9kZV9tb2R1bGVzL3dlYi1zdHJlYW1zLXBvbHlmaWxsL2Rpc3QvcG9ueWZpbGwuZXMyMDE4Lm1qcyIsIndlYnBhY2s6Ly9tYWlsZ3VuL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL21haWxndW4vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL21haWxndW4vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9tYWlsZ3VuL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbWFpbGd1bi93ZWJwYWNrL3J1bnRpbWUvbm9kZSBtb2R1bGUgZGVjb3JhdG9yIiwid2VicGFjazovL21haWxndW4vd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9tYWlsZ3VuL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9tYWlsZ3VuL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJtYWlsZ3VuXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIm1haWxndW5cIl0gPSBmYWN0b3J5KCk7XG59KSh0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiAiLCIvKipcbiAqIEBhdXRob3IgVG9ydSBOYWdhc2hpbWEgPGh0dHBzOi8vZ2l0aHViLmNvbS9teXN0aWNhdGVhPlxuICogU2VlIExJQ0VOU0UgZmlsZSBpbiByb290IGRpcmVjdG9yeSBmb3IgZnVsbCBsaWNlbnNlLlxuICovXG4ndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG5cbnZhciBldmVudFRhcmdldFNoaW0gPSByZXF1aXJlKCdldmVudC10YXJnZXQtc2hpbScpO1xuXG4vKipcbiAqIFRoZSBzaWduYWwgY2xhc3MuXG4gKiBAc2VlIGh0dHBzOi8vZG9tLnNwZWMud2hhdHdnLm9yZy8jYWJvcnRzaWduYWxcbiAqL1xuY2xhc3MgQWJvcnRTaWduYWwgZXh0ZW5kcyBldmVudFRhcmdldFNoaW0uRXZlbnRUYXJnZXQge1xuICAgIC8qKlxuICAgICAqIEFib3J0U2lnbmFsIGNhbm5vdCBiZSBjb25zdHJ1Y3RlZCBkaXJlY3RseS5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkFib3J0U2lnbmFsIGNhbm5vdCBiZSBjb25zdHJ1Y3RlZCBkaXJlY3RseVwiKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBgdHJ1ZWAgaWYgdGhpcyBgQWJvcnRTaWduYWxgJ3MgYEFib3J0Q29udHJvbGxlcmAgaGFzIHNpZ25hbGVkIHRvIGFib3J0LCBhbmQgYGZhbHNlYCBvdGhlcndpc2UuXG4gICAgICovXG4gICAgZ2V0IGFib3J0ZWQoKSB7XG4gICAgICAgIGNvbnN0IGFib3J0ZWQgPSBhYm9ydGVkRmxhZ3MuZ2V0KHRoaXMpO1xuICAgICAgICBpZiAodHlwZW9mIGFib3J0ZWQgIT09IFwiYm9vbGVhblwiKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBFeHBlY3RlZCAndGhpcycgdG8gYmUgYW4gJ0Fib3J0U2lnbmFsJyBvYmplY3QsIGJ1dCBnb3QgJHt0aGlzID09PSBudWxsID8gXCJudWxsXCIgOiB0eXBlb2YgdGhpc31gKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYWJvcnRlZDtcbiAgICB9XG59XG5ldmVudFRhcmdldFNoaW0uZGVmaW5lRXZlbnRBdHRyaWJ1dGUoQWJvcnRTaWduYWwucHJvdG90eXBlLCBcImFib3J0XCIpO1xuLyoqXG4gKiBDcmVhdGUgYW4gQWJvcnRTaWduYWwgb2JqZWN0LlxuICovXG5mdW5jdGlvbiBjcmVhdGVBYm9ydFNpZ25hbCgpIHtcbiAgICBjb25zdCBzaWduYWwgPSBPYmplY3QuY3JlYXRlKEFib3J0U2lnbmFsLnByb3RvdHlwZSk7XG4gICAgZXZlbnRUYXJnZXRTaGltLkV2ZW50VGFyZ2V0LmNhbGwoc2lnbmFsKTtcbiAgICBhYm9ydGVkRmxhZ3Muc2V0KHNpZ25hbCwgZmFsc2UpO1xuICAgIHJldHVybiBzaWduYWw7XG59XG4vKipcbiAqIEFib3J0IGEgZ2l2ZW4gc2lnbmFsLlxuICovXG5mdW5jdGlvbiBhYm9ydFNpZ25hbChzaWduYWwpIHtcbiAgICBpZiAoYWJvcnRlZEZsYWdzLmdldChzaWduYWwpICE9PSBmYWxzZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGFib3J0ZWRGbGFncy5zZXQoc2lnbmFsLCB0cnVlKTtcbiAgICBzaWduYWwuZGlzcGF0Y2hFdmVudCh7IHR5cGU6IFwiYWJvcnRcIiB9KTtcbn1cbi8qKlxuICogQWJvcnRlZCBmbGFnIGZvciBlYWNoIGluc3RhbmNlcy5cbiAqL1xuY29uc3QgYWJvcnRlZEZsYWdzID0gbmV3IFdlYWtNYXAoKTtcbi8vIFByb3BlcnRpZXMgc2hvdWxkIGJlIGVudW1lcmFibGUuXG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyhBYm9ydFNpZ25hbC5wcm90b3R5cGUsIHtcbiAgICBhYm9ydGVkOiB7IGVudW1lcmFibGU6IHRydWUgfSxcbn0pO1xuLy8gYHRvU3RyaW5nKClgIHNob3VsZCByZXR1cm4gYFwiW29iamVjdCBBYm9ydFNpZ25hbF1cImBcbmlmICh0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC50b1N0cmluZ1RhZyA9PT0gXCJzeW1ib2xcIikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShBYm9ydFNpZ25hbC5wcm90b3R5cGUsIFN5bWJvbC50b1N0cmluZ1RhZywge1xuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgIHZhbHVlOiBcIkFib3J0U2lnbmFsXCIsXG4gICAgfSk7XG59XG5cbi8qKlxuICogVGhlIEFib3J0Q29udHJvbGxlci5cbiAqIEBzZWUgaHR0cHM6Ly9kb20uc3BlYy53aGF0d2cub3JnLyNhYm9ydGNvbnRyb2xsZXJcbiAqL1xuY2xhc3MgQWJvcnRDb250cm9sbGVyIHtcbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplIHRoaXMgY29udHJvbGxlci5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc2lnbmFscy5zZXQodGhpcywgY3JlYXRlQWJvcnRTaWduYWwoKSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGBBYm9ydFNpZ25hbGAgb2JqZWN0IGFzc29jaWF0ZWQgd2l0aCB0aGlzIG9iamVjdC5cbiAgICAgKi9cbiAgICBnZXQgc2lnbmFsKCkge1xuICAgICAgICByZXR1cm4gZ2V0U2lnbmFsKHRoaXMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBYm9ydCBhbmQgc2lnbmFsIHRvIGFueSBvYnNlcnZlcnMgdGhhdCB0aGUgYXNzb2NpYXRlZCBhY3Rpdml0eSBpcyB0byBiZSBhYm9ydGVkLlxuICAgICAqL1xuICAgIGFib3J0KCkge1xuICAgICAgICBhYm9ydFNpZ25hbChnZXRTaWduYWwodGhpcykpO1xuICAgIH1cbn1cbi8qKlxuICogQXNzb2NpYXRlZCBzaWduYWxzLlxuICovXG5jb25zdCBzaWduYWxzID0gbmV3IFdlYWtNYXAoKTtcbi8qKlxuICogR2V0IHRoZSBhc3NvY2lhdGVkIHNpZ25hbCBvZiBhIGdpdmVuIGNvbnRyb2xsZXIuXG4gKi9cbmZ1bmN0aW9uIGdldFNpZ25hbChjb250cm9sbGVyKSB7XG4gICAgY29uc3Qgc2lnbmFsID0gc2lnbmFscy5nZXQoY29udHJvbGxlcik7XG4gICAgaWYgKHNpZ25hbCA9PSBudWxsKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYEV4cGVjdGVkICd0aGlzJyB0byBiZSBhbiAnQWJvcnRDb250cm9sbGVyJyBvYmplY3QsIGJ1dCBnb3QgJHtjb250cm9sbGVyID09PSBudWxsID8gXCJudWxsXCIgOiB0eXBlb2YgY29udHJvbGxlcn1gKTtcbiAgICB9XG4gICAgcmV0dXJuIHNpZ25hbDtcbn1cbi8vIFByb3BlcnRpZXMgc2hvdWxkIGJlIGVudW1lcmFibGUuXG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyhBYm9ydENvbnRyb2xsZXIucHJvdG90eXBlLCB7XG4gICAgc2lnbmFsOiB7IGVudW1lcmFibGU6IHRydWUgfSxcbiAgICBhYm9ydDogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG59KTtcbmlmICh0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC50b1N0cmluZ1RhZyA9PT0gXCJzeW1ib2xcIikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShBYm9ydENvbnRyb2xsZXIucHJvdG90eXBlLCBTeW1ib2wudG9TdHJpbmdUYWcsIHtcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICB2YWx1ZTogXCJBYm9ydENvbnRyb2xsZXJcIixcbiAgICB9KTtcbn1cblxuZXhwb3J0cy5BYm9ydENvbnRyb2xsZXIgPSBBYm9ydENvbnRyb2xsZXI7XG5leHBvcnRzLkFib3J0U2lnbmFsID0gQWJvcnRTaWduYWw7XG5leHBvcnRzLmRlZmF1bHQgPSBBYm9ydENvbnRyb2xsZXI7XG5cbm1vZHVsZS5leHBvcnRzID0gQWJvcnRDb250cm9sbGVyXG5tb2R1bGUuZXhwb3J0cy5BYm9ydENvbnRyb2xsZXIgPSBtb2R1bGUuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBBYm9ydENvbnRyb2xsZXJcbm1vZHVsZS5leHBvcnRzLkFib3J0U2lnbmFsID0gQWJvcnRTaWduYWxcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFib3J0LWNvbnRyb2xsZXIuanMubWFwXG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4vcmVxdWVzdCc7XG5pbXBvcnQgT3B0aW9ucyBmcm9tICcuL2ludGVyZmFjZXMvT3B0aW9ucyc7XG5pbXBvcnQgeyBSZXF1ZXN0T3B0aW9ucyB9IGZyb20gJy4vaW50ZXJmYWNlcy9SZXF1ZXN0T3B0aW9ucyc7XG5cbmltcG9ydCBEb21haW5DbGllbnQgZnJvbSAnLi9kb21haW5zJztcbmltcG9ydCBFdmVudENsaWVudCBmcm9tICcuL2V2ZW50cyc7XG5pbXBvcnQgU3RhdHNDbGllbnQgZnJvbSAnLi9zdGF0cyc7XG5pbXBvcnQgU3VwcHJlc3Npb25DbGllbnQgZnJvbSAnLi9zdXBwcmVzc2lvbnMnO1xuaW1wb3J0IFdlYmhvb2tDbGllbnQgZnJvbSAnLi93ZWJob29rcyc7XG5pbXBvcnQgTWVzc2FnZXNDbGllbnQgZnJvbSAnLi9tZXNzYWdlcyc7XG5pbXBvcnQgUm91dGVzQ2xpZW50IGZyb20gJy4vcm91dGVzJztcbmltcG9ydCBWYWxpZGF0ZUNsaWVudCBmcm9tICcuL3ZhbGlkYXRlJztcbmltcG9ydCBJcHNDbGllbnQgZnJvbSAnLi9pcHMnO1xuaW1wb3J0IElwUG9vbHNDbGllbnQgZnJvbSAnLi9pcC1wb29scyc7XG5pbXBvcnQgTGlzdHNDbGllbnQgZnJvbSAnLi9saXN0cyc7XG5pbXBvcnQgTWFpbExpc3RzTWVtYmVycyBmcm9tICcuL21haWxMaXN0TWVtYmVycyc7XG5pbXBvcnQgeyBJbnB1dEZvcm1EYXRhIH0gZnJvbSAnLi9pbnRlcmZhY2VzL0lGb3JtRGF0YSc7XG5pbXBvcnQgRG9tYWluQ3JlZGVudGlhbHNDbGllbnQgZnJvbSAnLi9kb21haW5zQ3JlZGVudGlhbHMnO1xuaW1wb3J0IE11bHRpcGxlVmFsaWRhdGlvbkNsaWVudCBmcm9tICcuL211bHRpcGxlVmFsaWRhdGlvbic7XG5pbXBvcnQgRG9tYWluVGVtcGxhdGVzQ2xpZW50IGZyb20gJy4vZG9tYWluc1RlbXBsYXRlcyc7XG5pbXBvcnQgRG9tYWluVGFnc0NsaWVudCBmcm9tICcuL2RvbWFpbnNUYWdzJztcbmltcG9ydCB7IElNYWlsZ3VuQ2xpZW50IH0gZnJvbSAnLi9pbnRlcmZhY2VzL0lNYWlsZ3VuQ2xpZW50JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2xpZW50IGltcGxlbWVudHMgSU1haWxndW5DbGllbnQge1xuICBwcml2YXRlIHJlcXVlc3Q7XG5cbiAgcHVibGljIGRvbWFpbnM7XG4gIHB1YmxpYyB3ZWJob29rcztcbiAgcHVibGljIGV2ZW50cztcbiAgcHVibGljIHN0YXRzO1xuICBwdWJsaWMgc3VwcHJlc3Npb25zO1xuICBwdWJsaWMgbWVzc2FnZXM7XG4gIHB1YmxpYyByb3V0ZXM7XG4gIHB1YmxpYyB2YWxpZGF0ZTtcbiAgcHVibGljIGlwcztcbiAgcHVibGljIGlwX3Bvb2xzO1xuICBwdWJsaWMgbGlzdHM7XG5cbiAgY29uc3RydWN0b3Iob3B0aW9uczogT3B0aW9ucywgZm9ybURhdGE6IElucHV0Rm9ybURhdGEpIHtcbiAgICBjb25zdCBjb25maWc6IFJlcXVlc3RPcHRpb25zID0geyAuLi5vcHRpb25zIH0gYXMgUmVxdWVzdE9wdGlvbnM7XG5cbiAgICBpZiAoIWNvbmZpZy51cmwpIHtcbiAgICAgIGNvbmZpZy51cmwgPSAnaHR0cHM6Ly9hcGkubWFpbGd1bi5uZXQnO1xuICAgIH1cblxuICAgIGlmICghY29uZmlnLnVzZXJuYW1lKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BhcmFtZXRlciBcInVzZXJuYW1lXCIgaXMgcmVxdWlyZWQnKTtcbiAgICB9XG5cbiAgICBpZiAoIWNvbmZpZy5rZXkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignUGFyYW1ldGVyIFwia2V5XCIgaXMgcmVxdWlyZWQnKTtcbiAgICB9XG5cbiAgICAvKiogQGludGVybmFsICovXG4gICAgdGhpcy5yZXF1ZXN0ID0gbmV3IFJlcXVlc3QoY29uZmlnLCBmb3JtRGF0YSk7XG4gICAgY29uc3QgbWFpbExpc3RzTWVtYmVycyA9IG5ldyBNYWlsTGlzdHNNZW1iZXJzKHRoaXMucmVxdWVzdCk7XG4gICAgY29uc3QgZG9tYWluQ3JlZGVudGlhbHNDbGllbnQgPSBuZXcgRG9tYWluQ3JlZGVudGlhbHNDbGllbnQodGhpcy5yZXF1ZXN0KTtcbiAgICBjb25zdCBkb21haW5UZW1wbGF0ZXNDbGllbnQgPSBuZXcgRG9tYWluVGVtcGxhdGVzQ2xpZW50KHRoaXMucmVxdWVzdCk7XG4gICAgY29uc3QgZG9tYWluVGFnc0NsaWVudCA9IG5ldyBEb21haW5UYWdzQ2xpZW50KHRoaXMucmVxdWVzdCk7XG4gICAgY29uc3QgbXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50ID0gbmV3IE11bHRpcGxlVmFsaWRhdGlvbkNsaWVudCh0aGlzLnJlcXVlc3QpO1xuXG4gICAgdGhpcy5kb21haW5zID0gbmV3IERvbWFpbkNsaWVudChcbiAgICAgIHRoaXMucmVxdWVzdCxcbiAgICAgIGRvbWFpbkNyZWRlbnRpYWxzQ2xpZW50LFxuICAgICAgZG9tYWluVGVtcGxhdGVzQ2xpZW50LFxuICAgICAgZG9tYWluVGFnc0NsaWVudFxuICAgICk7XG4gICAgdGhpcy53ZWJob29rcyA9IG5ldyBXZWJob29rQ2xpZW50KHRoaXMucmVxdWVzdCk7XG4gICAgdGhpcy5ldmVudHMgPSBuZXcgRXZlbnRDbGllbnQodGhpcy5yZXF1ZXN0KTtcbiAgICB0aGlzLnN0YXRzID0gbmV3IFN0YXRzQ2xpZW50KHRoaXMucmVxdWVzdCk7XG4gICAgdGhpcy5zdXBwcmVzc2lvbnMgPSBuZXcgU3VwcHJlc3Npb25DbGllbnQodGhpcy5yZXF1ZXN0KTtcbiAgICB0aGlzLm1lc3NhZ2VzID0gbmV3IE1lc3NhZ2VzQ2xpZW50KHRoaXMucmVxdWVzdCk7XG4gICAgdGhpcy5yb3V0ZXMgPSBuZXcgUm91dGVzQ2xpZW50KHRoaXMucmVxdWVzdCk7XG4gICAgdGhpcy5pcHMgPSBuZXcgSXBzQ2xpZW50KHRoaXMucmVxdWVzdCk7XG4gICAgdGhpcy5pcF9wb29scyA9IG5ldyBJcFBvb2xzQ2xpZW50KHRoaXMucmVxdWVzdCk7XG4gICAgdGhpcy5saXN0cyA9IG5ldyBMaXN0c0NsaWVudCh0aGlzLnJlcXVlc3QsIG1haWxMaXN0c01lbWJlcnMpO1xuICAgIHRoaXMudmFsaWRhdGUgPSBuZXcgVmFsaWRhdGVDbGllbnQodGhpcy5yZXF1ZXN0LCBtdWx0aXBsZVZhbGlkYXRpb25DbGllbnQpO1xuICB9XG59XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cbmltcG9ydCB1cmxqb2luIGZyb20gJ3VybC1qb2luJztcbmltcG9ydCB7XG4gIERvbWFpblJlc3BvbnNlRGF0YSxcbiAgRGVzdHJveWVkRG9tYWluUmVzcG9uc2UsXG4gIERvbWFpbnNRdWVyeSxcbiAgRG9tYWluSW5mbyxcbiAgRG9tYWluTGlzdFJlc3BvbnNlRGF0YSxcbiAgRG9tYWluU2hvcnREYXRhLFxuICBETlNSZWNvcmQsXG4gIENvbm5lY3Rpb25TZXR0aW5nc1Jlc3BvbnNlLFxuICBDb25uZWN0aW9uU2V0dGluZ3MsXG4gIFVwZGF0ZWRDb25uZWN0aW9uU2V0dGluZ3MsXG4gIFVwZGF0ZWRDb25uZWN0aW9uU2V0dGluZ3NSZXMsXG4gIERLSU1BdXRob3JpdHlJbmZvLFxuICBVcGRhdGVkREtJTUF1dGhvcml0eSxcbiAgVXBkYXRlZERLSU1BdXRob3JpdHlSZXNwb25zZSxcbiAgREtJTVNlbGVjdG9ySW5mbyxcbiAgVXBkYXRlZERLSU1TZWxlY3RvclJlc3BvbnNlLFxuICBXZWJQcmVmaXhJbmZvLFxuICBVcGRhdGVkV2ViUHJlZml4UmVzcG9uc2UsXG4gIFJlcGxhY2VtZW50Rm9yUG9vbCxcbiAgTWVzc2FnZVJlc3BvbnNlLFxufSBmcm9tICcuL2ludGVyZmFjZXMvRG9tYWlucyc7XG5cbmltcG9ydCBBUElSZXNwb25zZSBmcm9tICcuL2ludGVyZmFjZXMvQXBpUmVzcG9uc2UnO1xuaW1wb3J0IEFQSUVycm9yIGZyb20gJy4vZXJyb3InO1xuaW1wb3J0IEFQSUVycm9yT3B0aW9ucyBmcm9tICcuL2ludGVyZmFjZXMvQVBJRXJyb3JPcHRpb25zJztcblxuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi9yZXF1ZXN0JztcbmltcG9ydCB7XG4gIERvbWFpblRyYWNraW5nUmVzcG9uc2UsXG4gIERvbWFpblRyYWNraW5nRGF0YSxcbiAgT3BlblRyYWNraW5nSW5mbyxcbiAgQ2xpY2tUcmFja2luZ0luZm8sXG4gIFVuc3Vic2NyaWJlVHJhY2tpbmdJbmZvLFxuICBVcGRhdGVEb21haW5UcmFja2luZ1Jlc3BvbnNlLFxuICBVcGRhdGVkT3BlblRyYWNraW5nXG59IGZyb20gJy4vaW50ZXJmYWNlcy9Eb21haW5UcmFja2luZyc7XG5pbXBvcnQgeyBJRG9tYWluQ3JlZGVudGlhbHMgfSBmcm9tICcuL2ludGVyZmFjZXMvRG9tYWluQ3JlZGVudGlhbHMnO1xuaW1wb3J0IHsgSURvbWFpblRlbXBsYXRlc0NsaWVudCB9IGZyb20gJy4vaW50ZXJmYWNlcy9Eb21haW5UZW1wbGF0ZXMnO1xuaW1wb3J0IERvbWFpbkNyZWRlbnRpYWxzQ2xpZW50IGZyb20gJy4vZG9tYWluc0NyZWRlbnRpYWxzJztcbmltcG9ydCBEb21haW5UZW1wbGF0ZXNDbGllbnQgZnJvbSAnLi9kb21haW5zVGVtcGxhdGVzJztcbmltcG9ydCB7IElEb21haW5UYWdzQ2xpZW50IH0gZnJvbSAnLi9pbnRlcmZhY2VzL0RvbWFpblRhZ3MnO1xuaW1wb3J0IERvbWFpblRhZ3NDbGllbnQgZnJvbSAnLi9kb21haW5zVGFncyc7XG5cbmV4cG9ydCBjbGFzcyBEb21haW4ge1xuICBuYW1lOiBzdHJpbmc7XG4gIHJlcXVpcmVfdGxzOiBib29sZWFuO1xuICBza2lwX3ZlcmlmaWNhdGlvbjogYm9vbGVhbjtcbiAgc3RhdGU6IHN0cmluZztcbiAgd2lsZGNhcmQ6IGJvb2xlYW47XG4gIHNwYW1fYWN0aW9uOiBzdHJpbmc7XG4gIGNyZWF0ZWRfYXQ6IHN0cmluZztcbiAgc210cF9wYXNzd29yZDogc3RyaW5nO1xuICBzbXRwX2xvZ2luOiBzdHJpbmc7XG4gIHR5cGU6IHN0cmluZztcbiAgcmVjZWl2aW5nX2Ruc19yZWNvcmRzOiBETlNSZWNvcmRbXSB8IG51bGw7XG4gIHNlbmRpbmdfZG5zX3JlY29yZHM6IEROU1JlY29yZFtdIHwgbnVsbDtcblxuICBjb25zdHJ1Y3RvcihkYXRhOiBEb21haW5TaG9ydERhdGEsIHJlY2VpdmluZz86IEROU1JlY29yZFtdIHwgbnVsbCwgc2VuZGluZz86IEROU1JlY29yZFtdIHwgbnVsbCkge1xuICAgIHRoaXMubmFtZSA9IGRhdGEubmFtZTtcbiAgICB0aGlzLnJlcXVpcmVfdGxzID0gZGF0YS5yZXF1aXJlX3RscztcbiAgICB0aGlzLnNraXBfdmVyaWZpY2F0aW9uID0gZGF0YS5za2lwX3ZlcmlmaWNhdGlvbjtcbiAgICB0aGlzLnN0YXRlID0gZGF0YS5zdGF0ZTtcbiAgICB0aGlzLndpbGRjYXJkID0gZGF0YS53aWxkY2FyZDtcbiAgICB0aGlzLnNwYW1fYWN0aW9uID0gZGF0YS5zcGFtX2FjdGlvbjtcbiAgICB0aGlzLmNyZWF0ZWRfYXQgPSBkYXRhLmNyZWF0ZWRfYXQ7XG4gICAgdGhpcy5zbXRwX3Bhc3N3b3JkID0gZGF0YS5zbXRwX3Bhc3N3b3JkO1xuICAgIHRoaXMuc210cF9sb2dpbiA9IGRhdGEuc210cF9sb2dpbjtcbiAgICB0aGlzLnR5cGUgPSBkYXRhLnR5cGU7XG5cbiAgICB0aGlzLnJlY2VpdmluZ19kbnNfcmVjb3JkcyA9IHJlY2VpdmluZyB8fCBudWxsO1xuICAgIHRoaXMuc2VuZGluZ19kbnNfcmVjb3JkcyA9IHNlbmRpbmcgfHwgbnVsbDtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEb21haW5DbGllbnQge1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuICBwdWJsaWMgZG9tYWluQ3JlZGVudGlhbHM6IElEb21haW5DcmVkZW50aWFscztcbiAgcHVibGljIGRvbWFpblRlbXBsYXRlczogSURvbWFpblRlbXBsYXRlc0NsaWVudDtcbiAgcHVibGljIGRvbWFpblRhZ3M6IElEb21haW5UYWdzQ2xpZW50O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHJlcXVlc3Q6IFJlcXVlc3QsXG4gICAgZG9tYWluQ3JlZGVudGlhbHNDbGllbnQ6IERvbWFpbkNyZWRlbnRpYWxzQ2xpZW50LFxuICAgIGRvbWFpblRlbXBsYXRlc0NsaWVudDogRG9tYWluVGVtcGxhdGVzQ2xpZW50LFxuICAgIGRvbWFpblRhZ3NDbGllbnQ6IERvbWFpblRhZ3NDbGllbnRcbiAgKSB7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICB0aGlzLmRvbWFpbkNyZWRlbnRpYWxzID0gZG9tYWluQ3JlZGVudGlhbHNDbGllbnQ7XG4gICAgdGhpcy5kb21haW5UZW1wbGF0ZXMgPSBkb21haW5UZW1wbGF0ZXNDbGllbnQ7XG4gICAgdGhpcy5kb21haW5UYWdzID0gZG9tYWluVGFnc0NsaWVudDtcbiAgfVxuXG4gIHByaXZhdGUgX3BhcnNlTWVzc2FnZShyZXNwb25zZTogRGVzdHJveWVkRG9tYWluUmVzcG9uc2UpIDogTWVzc2FnZVJlc3BvbnNlIHtcbiAgICByZXR1cm4gcmVzcG9uc2UuYm9keTtcbiAgfVxuXG4gIHByaXZhdGUgX3BhcnNlRG9tYWluTGlzdChyZXNwb25zZTogRG9tYWluTGlzdFJlc3BvbnNlRGF0YSk6IERvbWFpbltdIHtcbiAgICByZXR1cm4gcmVzcG9uc2UuYm9keS5pdGVtcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHJldHVybiBuZXcgRG9tYWluKGl0ZW0pO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfcGFyc2VEb21haW4ocmVzcG9uc2U6IERvbWFpblJlc3BvbnNlRGF0YSk6IERvbWFpbiB7XG4gICAgcmV0dXJuIG5ldyBEb21haW4oXG4gICAgICByZXNwb25zZS5ib2R5LmRvbWFpbixcbiAgICAgIHJlc3BvbnNlLmJvZHkucmVjZWl2aW5nX2Ruc19yZWNvcmRzLFxuICAgICAgcmVzcG9uc2UuYm9keS5zZW5kaW5nX2Ruc19yZWNvcmRzXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgX3BhcnNlVHJhY2tpbmdTZXR0aW5ncyhyZXNwb25zZTogRG9tYWluVHJhY2tpbmdSZXNwb25zZSkgOiBEb21haW5UcmFja2luZ0RhdGEge1xuICAgIHJldHVybiByZXNwb25zZS5ib2R5LnRyYWNraW5nO1xuICB9XG5cbiAgcHJpdmF0ZSBfcGFyc2VUcmFja2luZ1VwZGF0ZShyZXNwb25zZTogVXBkYXRlRG9tYWluVHJhY2tpbmdSZXNwb25zZSkgOlVwZGF0ZWRPcGVuVHJhY2tpbmcge1xuICAgIHJldHVybiByZXNwb25zZS5ib2R5O1xuICB9XG5cbiAgbGlzdChxdWVyeT86IERvbWFpbnNRdWVyeSk6IFByb21pc2U8RG9tYWluW10+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCgnL3YzL2RvbWFpbnMnLCBxdWVyeSlcbiAgICAgIC50aGVuKChyZXMgOiBBUElSZXNwb25zZSkgPT4gdGhpcy5fcGFyc2VEb21haW5MaXN0KHJlcyBhcyBEb21haW5MaXN0UmVzcG9uc2VEYXRhKSk7XG4gIH1cblxuICBnZXQoZG9tYWluOiBzdHJpbmcpIDogUHJvbWlzZTxEb21haW4+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldChgL3YzL2RvbWFpbnMvJHtkb21haW59YClcbiAgICAgIC50aGVuKChyZXMgOiBBUElSZXNwb25zZSkgPT4gdGhpcy5fcGFyc2VEb21haW4ocmVzIGFzIERvbWFpblJlc3BvbnNlRGF0YSkpO1xuICB9XG5cbiAgY3JlYXRlKGRhdGE6IERvbWFpbkluZm8pIDogUHJvbWlzZTxEb21haW4+IHtcbiAgICBjb25zdCBwb3N0T2JqID0geyAuLi5kYXRhIH07XG4gICAgaWYgKCdmb3JjZV9ka2ltX2F1dGhvcml0eScgaW4gcG9zdE9iaiAmJiB0eXBlb2YgcG9zdE9iai5mb3JjZV9ka2ltX2F1dGhvcml0eSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICBwb3N0T2JqLmZvcmNlX2RraW1fYXV0aG9yaXR5ID0gcG9zdE9iai50b1N0cmluZygpID09PSAndHJ1ZScgPyAndHJ1ZScgOiAnZmFsc2UnO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucG9zdFdpdGhGRCgnL3YzL2RvbWFpbnMnLCBwb3N0T2JqKVxuICAgICAgLnRoZW4oKHJlcyA6IEFQSVJlc3BvbnNlKSA9PiB0aGlzLl9wYXJzZURvbWFpbihyZXMgYXMgRG9tYWluUmVzcG9uc2VEYXRhKSk7XG4gIH1cblxuICB2ZXJpZnkoZG9tYWluOiBzdHJpbmcpOiBQcm9taXNlPERvbWFpbj4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucHV0KGAvdjMvZG9tYWlucy8ke2RvbWFpbn0vdmVyaWZ5YClcbiAgICAgIC50aGVuKChyZXMgOiBBUElSZXNwb25zZSkgPT4gdGhpcy5fcGFyc2VEb21haW4ocmVzIGFzIERvbWFpblJlc3BvbnNlRGF0YSkpO1xuICB9XG5cbiAgZGVzdHJveShkb21haW46IHN0cmluZyk6IFByb21pc2U8TWVzc2FnZVJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5kZWxldGUoYC92My9kb21haW5zLyR7ZG9tYWlufWApXG4gICAgICAudGhlbigocmVzIDogQVBJUmVzcG9uc2UpID0+IHRoaXMuX3BhcnNlTWVzc2FnZShyZXMgYXMgRGVzdHJveWVkRG9tYWluUmVzcG9uc2UpKTtcbiAgfVxuXG4gIGdldENvbm5lY3Rpb24oZG9tYWluOiBzdHJpbmcpOiBQcm9taXNlPENvbm5lY3Rpb25TZXR0aW5ncz4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KGAvdjMvZG9tYWlucy8ke2RvbWFpbn0vY29ubmVjdGlvbmApXG4gICAgICAudGhlbigocmVzIDogQVBJUmVzcG9uc2UpID0+IHJlcyBhcyBDb25uZWN0aW9uU2V0dGluZ3NSZXNwb25zZSlcbiAgICAgIC50aGVuKChyZXM6Q29ubmVjdGlvblNldHRpbmdzUmVzcG9uc2UpID0+IHJlcy5ib2R5LmNvbm5lY3Rpb24gYXMgQ29ubmVjdGlvblNldHRpbmdzKTtcbiAgfVxuXG4gIHVwZGF0ZUNvbm5lY3Rpb24oZG9tYWluOiBzdHJpbmcsIGRhdGE6IENvbm5lY3Rpb25TZXR0aW5ncyk6IFByb21pc2U8VXBkYXRlZENvbm5lY3Rpb25TZXR0aW5ncz4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucHV0KGAvdjMvZG9tYWlucy8ke2RvbWFpbn0vY29ubmVjdGlvbmAsIGRhdGEpXG4gICAgICAudGhlbigocmVzIDogQVBJUmVzcG9uc2UpID0+IHJlcyBhcyBVcGRhdGVkQ29ubmVjdGlvblNldHRpbmdzUmVzKVxuICAgICAgLnRoZW4oKHJlczpVcGRhdGVkQ29ubmVjdGlvblNldHRpbmdzUmVzKSA9PiByZXMuYm9keSBhcyBVcGRhdGVkQ29ubmVjdGlvblNldHRpbmdzKTtcbiAgfVxuXG4gIC8vIFRyYWNraW5nXG5cbiAgZ2V0VHJhY2tpbmcoZG9tYWluOiBzdHJpbmcpIDogUHJvbWlzZTxEb21haW5UcmFja2luZ0RhdGE+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKCcvdjMvZG9tYWlucycsIGRvbWFpbiwgJ3RyYWNraW5nJykpXG4gICAgICAudGhlbih0aGlzLl9wYXJzZVRyYWNraW5nU2V0dGluZ3MpO1xuICB9XG5cbiAgdXBkYXRlVHJhY2tpbmcoXG4gICAgZG9tYWluOiBzdHJpbmcsXG4gICAgdHlwZTogc3RyaW5nLFxuICAgIGRhdGE6IE9wZW5UcmFja2luZ0luZm8gfCBDbGlja1RyYWNraW5nSW5mbyB8IFVuc3Vic2NyaWJlVHJhY2tpbmdJbmZvXG4gICk6IFByb21pc2U8VXBkYXRlZE9wZW5UcmFja2luZz4ge1xuICAgIGlmICh0eXBlb2YgZGF0YT8uYWN0aXZlID09PSAnYm9vbGVhbicpIHtcbiAgICAgIHRocm93IG5ldyBBUElFcnJvcih7IHN0YXR1czogNDAwLCBzdGF0dXNUZXh0OiAnUmVjZWl2ZWQgYm9vbGVhbiB2YWx1ZSBmb3IgYWN0aXZlIHByb3BlcnR5JywgYm9keTogeyBtZXNzYWdlOiAnUHJvcGVydHkgXCJhY3RpdmVcIiBtdXN0IGNvbnRhaW4gc3RyaW5nIHZhbHVlLicgfSB9IGFzIEFQSUVycm9yT3B0aW9ucyk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucHV0V2l0aEZEKHVybGpvaW4oJy92My9kb21haW5zJywgZG9tYWluLCAndHJhY2tpbmcnLCB0eXBlKSwgZGF0YSlcbiAgICAgIC50aGVuKChyZXMgOiBBUElSZXNwb25zZSkgPT4gdGhpcy5fcGFyc2VUcmFja2luZ1VwZGF0ZShyZXMgYXMgVXBkYXRlRG9tYWluVHJhY2tpbmdSZXNwb25zZSkpO1xuICB9XG5cbiAgLy8gSVBzXG5cbiAgZ2V0SXBzKGRvbWFpbjogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmdbXT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KHVybGpvaW4oJy92My9kb21haW5zJywgZG9tYWluLCAnaXBzJykpXG4gICAgICAudGhlbigocmVzcG9uc2U6IEFQSVJlc3BvbnNlKSA9PiByZXNwb25zZT8uYm9keT8uaXRlbXMpO1xuICB9XG5cbiAgYXNzaWduSXAoZG9tYWluOiBzdHJpbmcsIGlwOiBzdHJpbmcpOiBQcm9taXNlPEFQSVJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKHVybGpvaW4oJy92My9kb21haW5zJywgZG9tYWluLCAnaXBzJyksIHsgaXAgfSk7XG4gIH1cblxuICBkZWxldGVJcChkb21haW46IHN0cmluZywgaXA6IHN0cmluZyk6IFByb21pc2U8QVBJUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmRlbGV0ZSh1cmxqb2luKCcvdjMvZG9tYWlucycsIGRvbWFpbiwgJ2lwcycsIGlwKSk7XG4gIH1cblxuICBsaW5rSXBQb29sKGRvbWFpbjogc3RyaW5nLCBwb29sX2lkOiBzdHJpbmcpOiBQcm9taXNlPEFQSVJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKHVybGpvaW4oJy92My9kb21haW5zJywgZG9tYWluLCAnaXBzJyksIHsgcG9vbF9pZCB9KTtcbiAgfVxuXG4gIHVubGlua0lwUG9sbChkb21haW46IHN0cmluZywgcmVwbGFjZW1lbnQ6IFJlcGxhY2VtZW50Rm9yUG9vbCk6IFByb21pc2U8QVBJUmVzcG9uc2U+IHtcbiAgICBsZXQgc2VhcmNoUGFyYW1zID0gJyc7XG4gICAgaWYgKHJlcGxhY2VtZW50LnBvb2xfaWQgJiYgcmVwbGFjZW1lbnQuaXApIHtcbiAgICAgIHRocm93IG5ldyBBUElFcnJvcihcbiAgICAgICAge1xuICAgICAgICAgIHN0YXR1czogNDAwLFxuICAgICAgICAgIHN0YXR1c1RleHQ6ICdUb28gbXVjaCBkYXRhIGZvciByZXBsYWNlbWVudCcsXG4gICAgICAgICAgYm9keTogeyBtZXNzYWdlOiAnUGxlYXNlIHNwZWNpZnkgZWl0aGVyIHBvb2xfaWQgb3IgaXAgKG5vdCBib3RoKScgfVxuICAgICAgICB9IGFzIEFQSUVycm9yT3B0aW9uc1xuICAgICAgKTtcbiAgICB9IGVsc2UgaWYgKHJlcGxhY2VtZW50LnBvb2xfaWQpIHtcbiAgICAgIHNlYXJjaFBhcmFtcyA9IGA/cG9vbF9pZD0ke3JlcGxhY2VtZW50LnBvb2xfaWR9YDtcbiAgICB9IGVsc2UgaWYgKHJlcGxhY2VtZW50LmlwKSB7XG4gICAgICBzZWFyY2hQYXJhbXMgPSBgP2lwPSR7cmVwbGFjZW1lbnQuaXB9YDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5kZWxldGUodXJsam9pbignL3YzL2RvbWFpbnMnLCBkb21haW4sICdpcHMnLCAnaXBfcG9vbCcsIHNlYXJjaFBhcmFtcykpO1xuICB9XG5cbiAgdXBkYXRlREtJTUF1dGhvcml0eShkb21haW46IHN0cmluZywgZGF0YTogREtJTUF1dGhvcml0eUluZm8pOiBQcm9taXNlPFVwZGF0ZWRES0lNQXV0aG9yaXR5PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXQoYC92My9kb21haW5zLyR7ZG9tYWlufS9ka2ltX2F1dGhvcml0eWAsIHt9LCB7IHF1ZXJ5OiBgc2VsZj0ke2RhdGEuc2VsZn1gIH0pXG4gICAgICAudGhlbigocmVzIDogQVBJUmVzcG9uc2UpID0+IHJlcyBhcyBVcGRhdGVkREtJTUF1dGhvcml0eVJlc3BvbnNlKVxuICAgICAgLnRoZW4oKHJlcyA6IFVwZGF0ZWRES0lNQXV0aG9yaXR5UmVzcG9uc2UpID0+IHJlcy5ib2R5IGFzIFVwZGF0ZWRES0lNQXV0aG9yaXR5KTtcbiAgfVxuXG4gIHVwZGF0ZURLSU1TZWxlY3Rvcihkb21haW46IHN0cmluZywgZGF0YTogREtJTVNlbGVjdG9ySW5mbyk6IFByb21pc2U8VXBkYXRlZERLSU1TZWxlY3RvclJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXQoYC92My9kb21haW5zLyR7ZG9tYWlufS9ka2ltX3NlbGVjdG9yYCwge30sIHsgcXVlcnk6IGBka2ltX3NlbGVjdG9yPSR7ZGF0YS5ka2ltU2VsZWN0b3J9YCB9KVxuICAgICAgLnRoZW4oKHJlcyA6IEFQSVJlc3BvbnNlKSA9PiByZXMgYXMgVXBkYXRlZERLSU1TZWxlY3RvclJlc3BvbnNlKTtcbiAgfVxuXG4gIHVwZGF0ZVdlYlByZWZpeChkb21haW46IHN0cmluZywgZGF0YTogV2ViUHJlZml4SW5mbyk6IFByb21pc2U8VXBkYXRlZFdlYlByZWZpeFJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXQoYC92My9kb21haW5zLyR7ZG9tYWlufS93ZWJfcHJlZml4YCwge30sIHsgcXVlcnk6IGB3ZWJfcHJlZml4PSR7ZGF0YS53ZWJQcmVmaXh9YCB9KVxuICAgICAgLnRoZW4oKHJlcyA6IEFQSVJlc3BvbnNlKSA9PiByZXMgYXMgVXBkYXRlZFdlYlByZWZpeFJlc3BvbnNlKTtcbiAgfVxufVxuIiwiaW1wb3J0IHVybGpvaW4gZnJvbSAndXJsLWpvaW4nO1xuaW1wb3J0IEFQSVJlc3BvbnNlIGZyb20gJy4vaW50ZXJmYWNlcy9BcGlSZXNwb25zZSc7XG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuL3JlcXVlc3QnO1xuXG5pbXBvcnQge1xuICBDcmVhdGVkVXBkYXRlZERvbWFpbkNyZWRlbnRpYWxzUmVzcG9uc2UsXG4gIERlbGV0ZWREb21haW5DcmVkZW50aWFsc1Jlc3BvbnNlLFxuICBEb21haW5DcmVkZW50aWFscyxcbiAgRG9tYWluQ3JlZGVudGlhbHNMaXN0LFxuICBEb21haW5DcmVkZW50aWFsc1F1ZXJ5LFxuICBEb21haW5DcmVkZW50aWFsc1Jlc3BvbnNlRGF0YSxcbiAgRG9tYWluQ3JlZGVudGlhbHNSZXN1bHQsXG4gIElEb21haW5DcmVkZW50aWFscyxcbiAgVXBkYXRlRG9tYWluQ3JlZGVudGlhbHNEYXRhXG59IGZyb20gJy4vaW50ZXJmYWNlcy9Eb21haW5DcmVkZW50aWFscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERvbWFpbkNyZWRlbnRpYWxzQ2xpZW50IGltcGxlbWVudHMgSURvbWFpbkNyZWRlbnRpYWxzIHtcbiAgYmFzZVJvdXRlOiBzdHJpbmc7XG4gIHJlcXVlc3Q6IFJlcXVlc3Q7XG5cbiAgY29uc3RydWN0b3IocmVxdWVzdDogUmVxdWVzdCkge1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgdGhpcy5iYXNlUm91dGUgPSAnL3YzL2RvbWFpbnMvJztcbiAgfVxuXG4gIHByaXZhdGUgX3BhcnNlRG9tYWluQ3JlZGVudGlhbHNMaXN0KFxuICAgIHJlc3BvbnNlOiBEb21haW5DcmVkZW50aWFsc1Jlc3BvbnNlRGF0YVxuICApOiBEb21haW5DcmVkZW50aWFsc0xpc3Qge1xuICAgIHJldHVybiB7XG4gICAgICBpdGVtczogcmVzcG9uc2UuYm9keS5pdGVtcyxcbiAgICAgIHRvdGFsQ291bnQ6IHJlc3BvbnNlLmJvZHkudG90YWxfY291bnRcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBfcGFyc2VNZXNzYWdlUmVzcG9uc2UoXG4gICAgcmVzcG9uc2U6IENyZWF0ZWRVcGRhdGVkRG9tYWluQ3JlZGVudGlhbHNSZXNwb25zZVxuICApOiBEb21haW5DcmVkZW50aWFsc1Jlc3VsdCB7XG4gICAgY29uc3QgcmVzdWx0ID0ge1xuICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICBtZXNzYWdlOiByZXNwb25zZS5ib2R5Lm1lc3NhZ2VcbiAgICB9IGFzIERvbWFpbkNyZWRlbnRpYWxzUmVzdWx0O1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwcml2YXRlIF9wYXJzZURlbGV0ZWRSZXNwb25zZShcbiAgICByZXNwb25zZTpEZWxldGVkRG9tYWluQ3JlZGVudGlhbHNSZXNwb25zZVxuICApOiBEb21haW5DcmVkZW50aWFsc1Jlc3VsdCB7XG4gICAgY29uc3QgcmVzdWx0ID0ge1xuICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICBtZXNzYWdlOiByZXNwb25zZS5ib2R5Lm1lc3NhZ2UsXG4gICAgICBzcGVjOiByZXNwb25zZS5ib2R5LnNwZWNcbiAgICB9IGFzIERvbWFpbkNyZWRlbnRpYWxzUmVzdWx0O1xuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGxpc3QoZG9tYWluOiBzdHJpbmcsIHF1ZXJ5PzogRG9tYWluQ3JlZGVudGlhbHNRdWVyeSk6IFByb21pc2U8RG9tYWluQ3JlZGVudGlhbHNMaXN0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL2NyZWRlbnRpYWxzJyksIHF1ZXJ5KVxuICAgICAgLnRoZW4oXG4gICAgICAgIChyZXM6IEFQSVJlc3BvbnNlKSA9PiB0aGlzLl9wYXJzZURvbWFpbkNyZWRlbnRpYWxzTGlzdChyZXMgYXMgRG9tYWluQ3JlZGVudGlhbHNSZXNwb25zZURhdGEpXG4gICAgICApO1xuICB9XG5cbiAgY3JlYXRlKFxuICAgIGRvbWFpbjogc3RyaW5nLFxuICAgIGRhdGE6IERvbWFpbkNyZWRlbnRpYWxzXG4gICk6IFByb21pc2U8RG9tYWluQ3JlZGVudGlhbHNSZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQoYCR7dGhpcy5iYXNlUm91dGV9JHtkb21haW59L2NyZWRlbnRpYWxzYCwgZGF0YSlcbiAgICAgIC50aGVuKChyZXM6IEFQSVJlc3BvbnNlKSA9PiB0aGlzLl9wYXJzZU1lc3NhZ2VSZXNwb25zZShyZXMpKTtcbiAgfVxuXG4gIHVwZGF0ZShcbiAgICBkb21haW46IHN0cmluZyxcbiAgICBjcmVkZW50aWFsc0xvZ2luOiBzdHJpbmcsXG4gICAgZGF0YTogVXBkYXRlRG9tYWluQ3JlZGVudGlhbHNEYXRhXG4gICk6IFByb21pc2U8RG9tYWluQ3JlZGVudGlhbHNSZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnB1dFdpdGhGRChgJHt0aGlzLmJhc2VSb3V0ZX0ke2RvbWFpbn0vY3JlZGVudGlhbHMvJHtjcmVkZW50aWFsc0xvZ2lufWAsIGRhdGEpXG4gICAgICAudGhlbigocmVzOiBBUElSZXNwb25zZSkgPT4gdGhpcy5fcGFyc2VNZXNzYWdlUmVzcG9uc2UocmVzKSk7XG4gIH1cblxuICBkZXN0cm95KFxuICAgIGRvbWFpbjogc3RyaW5nLFxuICAgIGNyZWRlbnRpYWxzTG9naW46IHN0cmluZ1xuICApOiBQcm9taXNlPERvbWFpbkNyZWRlbnRpYWxzUmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5kZWxldGUoYCR7dGhpcy5iYXNlUm91dGV9JHtkb21haW59L2NyZWRlbnRpYWxzLyR7Y3JlZGVudGlhbHNMb2dpbn1gKVxuICAgICAgLnRoZW4oKHJlczogQVBJUmVzcG9uc2UpID0+IHRoaXMuX3BhcnNlRGVsZXRlZFJlc3BvbnNlKHJlcykpO1xuICB9XG59XG4iLCJpbXBvcnQgdXJsam9pbiBmcm9tICd1cmwtam9pbic7XG5pbXBvcnQgQVBJUmVzcG9uc2UgZnJvbSAnLi9pbnRlcmZhY2VzL0FwaVJlc3BvbnNlJztcbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4vcmVxdWVzdCc7XG5cbmltcG9ydCB7XG4gIERvbWFpblRhZ0FQSVJlc3BvbnNlU3RhdHNJdGVtLFxuICBEb21haW5UYWdDb3VudHJpZXNBZ2dyZWdhdGlvbixcbiAgRG9tYWluVGFnQ291bnRyaWVzQVBJUmVzcG9uc2UsXG4gIERvbWFpblRhZ0RldmljZXNBZ2dyZWdhdGlvbixcbiAgRG9tYWluVGFnRGV2aWNlc0FQSVJlc3BvbnNlLFxuICBEb21haW5UYWdQcm92aWRlcnNBZ2dyZWdhdGlvbixcbiAgRG9tYWluVGFnUHJvdmlkZXJzQVBJUmVzcG9uc2UsXG4gIERvbWFpblRhZ3NJdGVtLFxuICBEb21haW5UYWdzSXRlbUluZm8sXG4gIERvbWFpblRhZ3NMaXN0LFxuICBEb21haW5UYWdzTWVzc2FnZVJlcyxcbiAgRG9tYWluVGFnc1F1ZXJ5LFxuICBEb21haW5UYWdzUmVzcG9uc2VEYXRhLFxuICBEb21haW5UYWdzU3RhdGlzdGljUXVlcnksXG4gIERvbWFpblRhZ1N0YXRBUElSZXNwb25zZSxcbiAgRG9tYWluVGFnU3RhdGlzdGljSXRlbSxcbiAgRG9tYWluVGFnU3RhdGlzdGljUmVzdWx0LFxuICBJRG9tYWluVGFnc0NsaWVudCxcbiAgUGFnZXNMaXN0LFxuICBQYWdlc0xpc3RBY2N1bXVsYXRvcixcbiAgUGFyc2VkUGFnZXNMaXN0LFxuICBSZXNvbHV0aW9uXG59IGZyb20gJy4vaW50ZXJmYWNlcy9Eb21haW5UYWdzJztcblxuZXhwb3J0IGNsYXNzIERvbWFpblRhZyBpbXBsZW1lbnRzIERvbWFpblRhZ3NJdGVtIHtcbiAgdGFnOiBzdHJpbmc7XG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gICdmaXJzdC1zZWVuJzogRGF0ZTtcbiAgJ2xhc3Qtc2Vlbic6IERhdGU7XG5cbiAgY29uc3RydWN0b3IodGFnSW5mbzogRG9tYWluVGFnc0l0ZW1JbmZvKSB7XG4gICAgdGhpcy50YWcgPSB0YWdJbmZvLnRhZztcbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gdGFnSW5mby5kZXNjcmlwdGlvbjtcbiAgICB0aGlzWydmaXJzdC1zZWVuJ10gPSBuZXcgRGF0ZSh0YWdJbmZvWydmaXJzdC1zZWVuJ10pO1xuICAgIHRoaXNbJ2xhc3Qtc2VlbiddID0gbmV3IERhdGUodGFnSW5mb1snbGFzdC1zZWVuJ10pO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBEb21haW5UYWdTdGF0aXN0aWMgaW1wbGVtZW50cyBEb21haW5UYWdTdGF0aXN0aWNSZXN1bHQge1xuICB0YWc6IHN0cmluZztcbiAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgc3RhcnQ6IERhdGU7XG4gIGVuZDogRGF0ZTtcbiAgcmVzb2x1dGlvbjogUmVzb2x1dGlvbjtcbiAgc3RhdHM6IERvbWFpblRhZ1N0YXRpc3RpY0l0ZW1bXTtcblxuICBjb25zdHJ1Y3Rvcih0YWdTdGF0aXN0aWNJbmZvOiBEb21haW5UYWdTdGF0QVBJUmVzcG9uc2UpIHtcbiAgICB0aGlzLnRhZyA9IHRhZ1N0YXRpc3RpY0luZm8uYm9keS50YWc7XG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IHRhZ1N0YXRpc3RpY0luZm8uYm9keS5kZXNjcmlwdGlvbjtcbiAgICB0aGlzLnN0YXJ0ID0gbmV3IERhdGUodGFnU3RhdGlzdGljSW5mby5ib2R5LnN0YXJ0KTtcbiAgICB0aGlzLmVuZCA9IG5ldyBEYXRlKHRhZ1N0YXRpc3RpY0luZm8uYm9keS5lbmQpO1xuICAgIHRoaXMucmVzb2x1dGlvbiA9IHRhZ1N0YXRpc3RpY0luZm8uYm9keS5yZXNvbHV0aW9uO1xuICAgIHRoaXMuc3RhdHMgPSB0YWdTdGF0aXN0aWNJbmZvLmJvZHkuc3RhdHMubWFwKGZ1bmN0aW9uIChzdGF0OiBEb21haW5UYWdBUElSZXNwb25zZVN0YXRzSXRlbSkge1xuICAgICAgY29uc3QgcmVzID0geyAuLi5zdGF0LCB0aW1lOiBuZXcgRGF0ZShzdGF0LnRpbWUpIH07XG4gICAgICByZXR1cm4gcmVzO1xuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERvbWFpblRhZ3NDbGllbnQgaW1wbGVtZW50cyBJRG9tYWluVGFnc0NsaWVudCB7XG4gIGJhc2VSb3V0ZTogc3RyaW5nO1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuXG4gIGNvbnN0cnVjdG9yKHJlcXVlc3Q6IFJlcXVlc3QpIHtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgIHRoaXMuYmFzZVJvdXRlID0gJy92My8nO1xuICB9XG5cbiAgcHJpdmF0ZSBfcGFyc2VQYWdlTGlua3MocmVzcG9uc2U6IERvbWFpblRhZ3NSZXNwb25zZURhdGEpOiBQYXJzZWRQYWdlc0xpc3Qge1xuICAgIGNvbnN0IHBhZ2VzID0gT2JqZWN0LmVudHJpZXMocmVzcG9uc2UuYm9keS5wYWdpbmcgYXMgUGFnZXNMaXN0KTtcbiAgICByZXR1cm4gcGFnZXMucmVkdWNlKFxuICAgICAgKGFjYzogUGFnZXNMaXN0QWNjdW11bGF0b3IsIGVudHJpZTogW3VybDogc3RyaW5nLCBpZDogc3RyaW5nXSkgPT4ge1xuICAgICAgICBjb25zdCBpZCA9IGVudHJpZVswXTtcbiAgICAgICAgY29uc3QgdXJsID0gZW50cmllWzFdO1xuICAgICAgICBhY2NbaWRdID0ge1xuICAgICAgICAgIGlkLFxuICAgICAgICAgIHVybFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgfSwge31cbiAgICApIGFzIHVua25vd24gYXMgUGFyc2VkUGFnZXNMaXN0O1xuICB9XG5cbiAgcHJpdmF0ZSBfcGFyc2VEb21haW5UYWdzTGlzdChcbiAgICByZXNwb25zZTogRG9tYWluVGFnc1Jlc3BvbnNlRGF0YVxuICApOiBEb21haW5UYWdzTGlzdCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGl0ZW1zOiByZXNwb25zZS5ib2R5Lml0ZW1zLm1hcCgodGFnSW5mbykgPT4gbmV3IERvbWFpblRhZyh0YWdJbmZvKSksXG4gICAgICBwYWdlczogdGhpcy5fcGFyc2VQYWdlTGlua3MocmVzcG9uc2UpXG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgX3BhcnNlVGFnU3RhdGlzdGljKFxuICAgIHJlc3BvbnNlOiBEb21haW5UYWdTdGF0QVBJUmVzcG9uc2VcbiAgKTogRG9tYWluVGFnU3RhdGlzdGljIHtcbiAgICByZXR1cm4gbmV3IERvbWFpblRhZ1N0YXRpc3RpYyhyZXNwb25zZSk7XG4gIH1cblxuICBsaXN0KGRvbWFpbjogc3RyaW5nLCBxdWVyeT86IERvbWFpblRhZ3NRdWVyeSk6IFByb21pc2U8RG9tYWluVGFnc0xpc3Q+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGFncycpLCBxdWVyeSlcbiAgICAgIC50aGVuKFxuICAgICAgICAocmVzOiBBUElSZXNwb25zZSkgPT4gdGhpcy5fcGFyc2VEb21haW5UYWdzTGlzdChyZXMgYXMgRG9tYWluVGFnc1Jlc3BvbnNlRGF0YSlcbiAgICAgICk7XG4gIH1cblxuICBnZXQoZG9tYWluOiBzdHJpbmcsIHRhZzogc3RyaW5nKTogUHJvbWlzZTxEb21haW5UYWdzSXRlbT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90YWdzJywgdGFnKSlcbiAgICAgIC50aGVuKFxuICAgICAgICAocmVzOiBBUElSZXNwb25zZSkgPT4gbmV3IERvbWFpblRhZyhyZXMuYm9keSlcbiAgICAgICk7XG4gIH1cblxuICB1cGRhdGUoZG9tYWluOiBzdHJpbmcsIHRhZzogc3RyaW5nLCBkZXNjcmlwdGlvbjogc3RyaW5nKTogUHJvbWlzZTxEb21haW5UYWdzTWVzc2FnZVJlcz4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucHV0KHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90YWdzJywgdGFnKSwgZGVzY3JpcHRpb24pXG4gICAgICAudGhlbihcbiAgICAgICAgKHJlczogQVBJUmVzcG9uc2UpID0+IHJlcy5ib2R5IGFzIERvbWFpblRhZ3NNZXNzYWdlUmVzXG4gICAgICApO1xuICB9XG5cbiAgZGVzdHJveShcbiAgICBkb21haW46IHN0cmluZyxcbiAgICB0YWc6IHN0cmluZ1xuICApOiBQcm9taXNlPERvbWFpblRhZ3NNZXNzYWdlUmVzPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5kZWxldGUoYCR7dGhpcy5iYXNlUm91dGV9JHtkb21haW59L3RhZ3MvJHt0YWd9YClcbiAgICAgIC50aGVuKChyZXM6IEFQSVJlc3BvbnNlKSA9PiAoXG4gICAgICAgIHtcbiAgICAgICAgICBtZXNzYWdlOiByZXMuYm9keS5tZXNzYWdlLFxuICAgICAgICAgIHN0YXR1czogcmVzLnN0YXR1c1xuICAgICAgICB9IGFzIERvbWFpblRhZ3NNZXNzYWdlUmVzKSk7XG4gIH1cblxuICBzdGF0aXN0aWMoZG9tYWluOiBzdHJpbmcsIHRhZzogc3RyaW5nLCBxdWVyeTogRG9tYWluVGFnc1N0YXRpc3RpY1F1ZXJ5KVxuICAgIDogUHJvbWlzZTxEb21haW5UYWdTdGF0aXN0aWM+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGFncycsIHRhZywgJ3N0YXRzJyksIHF1ZXJ5KVxuICAgICAgLnRoZW4oXG4gICAgICAgIChyZXM6IEFQSVJlc3BvbnNlKSA9PiB0aGlzLl9wYXJzZVRhZ1N0YXRpc3RpYyhyZXMpXG4gICAgICApO1xuICB9XG5cbiAgY291bnRyaWVzKGRvbWFpbjogc3RyaW5nLCB0YWc6IHN0cmluZyk6IFByb21pc2U8RG9tYWluVGFnQ291bnRyaWVzQWdncmVnYXRpb24+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGFncycsIHRhZywgJ3N0YXRzL2FnZ3JlZ2F0ZXMvY291bnRyaWVzJykpXG4gICAgICAudGhlbihcbiAgICAgICAgKHJlczogRG9tYWluVGFnQ291bnRyaWVzQVBJUmVzcG9uc2UpID0+IHJlcy5ib2R5IGFzIERvbWFpblRhZ0NvdW50cmllc0FnZ3JlZ2F0aW9uXG4gICAgICApO1xuICB9XG5cbiAgcHJvdmlkZXJzKGRvbWFpbjogc3RyaW5nLCB0YWc6IHN0cmluZyk6IFByb21pc2U8RG9tYWluVGFnUHJvdmlkZXJzQWdncmVnYXRpb24+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGFncycsIHRhZywgJ3N0YXRzL2FnZ3JlZ2F0ZXMvcHJvdmlkZXJzJykpXG4gICAgICAudGhlbihcbiAgICAgICAgKHJlczogRG9tYWluVGFnUHJvdmlkZXJzQVBJUmVzcG9uc2UpID0+IHJlcy5ib2R5IGFzIERvbWFpblRhZ1Byb3ZpZGVyc0FnZ3JlZ2F0aW9uXG4gICAgICApO1xuICB9XG5cbiAgZGV2aWNlcyhkb21haW46IHN0cmluZywgdGFnOiBzdHJpbmcpOiBQcm9taXNlPERvbWFpblRhZ0RldmljZXNBZ2dyZWdhdGlvbj4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90YWdzJywgdGFnLCAnc3RhdHMvYWdncmVnYXRlcy9kZXZpY2VzJykpXG4gICAgICAudGhlbihcbiAgICAgICAgKHJlczogRG9tYWluVGFnRGV2aWNlc0FQSVJlc3BvbnNlKSA9PiByZXMuYm9keSBhcyBEb21haW5UYWdEZXZpY2VzQWdncmVnYXRpb25cbiAgICAgICk7XG4gIH1cbn1cbiIsImltcG9ydCB1cmxqb2luIGZyb20gJ3VybC1qb2luJztcbmltcG9ydCBBUElSZXNwb25zZSBmcm9tICcuL2ludGVyZmFjZXMvQXBpUmVzcG9uc2UnO1xuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi9yZXF1ZXN0JztcblxuaW1wb3J0IHtcbiAgQ3JlYXRlRG9tYWluVGVtcGxhdGVBUElSZXNwb25zZSxcbiAgQ3JlYXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uQVBJUmVzcG9uc2UsXG4gIENyZWF0ZURvbWFpblRlbXBsYXRlVmVyc2lvblJlc3VsdCxcbiAgRG9tYWluVGVtcGxhdGUsIERvbWFpblRlbXBsYXRlRGF0YSxcbiAgRG9tYWluVGVtcGxhdGVzUXVlcnksXG4gIERvbWFpblRlbXBsYXRlVXBkYXRlRGF0YSxcbiAgRG9tYWluVGVtcGxhdGVVcGRhdGVWZXJzaW9uRGF0YSxcbiAgRG9tYWluVGVtcGxhdGVWZXJzaW9uRGF0YSxcbiAgR2V0RG9tYWluVGVtcGxhdGVBUElSZXNwb25zZSxcbiAgSURvbWFpblRlbXBsYXRlc0NsaWVudCxcbiAgTGlzdERvbWFpblRlbXBsYXRlc0FQSVJlc3BvbnNlLFxuICBMaXN0RG9tYWluVGVtcGxhdGVzUmVzdWx0LFxuICBMaXN0RG9tYWluVGVtcGxhdGVWZXJzaW9uc0FQSVJlc3BvbnNlLFxuICBMaXN0RG9tYWluVGVtcGxhdGVWZXJzaW9uc1Jlc3VsdCxcbiAgTXV0YXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uQVBJUmVzcG9uc2UsXG4gIE11dGF0ZURvbWFpblRlbXBsYXRlVmVyc2lvblJlc3VsdCxcbiAgTm90aWZpY2F0aW9uQVBJUmVzcG9uc2UsXG4gIE5vdGlmaWNhdGlvblJlc3VsdCxcbiAgU2hvcnRUZW1wbGF0ZVZlcnNpb24sXG4gIFRlbXBsYXRlUXVlcnksXG4gIFRlbXBsYXRlVmVyc2lvbixcbiAgVXBkYXRlT3JEZWxldGVEb21haW5UZW1wbGF0ZUFQSVJlc3BvbnNlLFxuICBVcGRhdGVPckRlbGV0ZURvbWFpblRlbXBsYXRlUmVzdWx0XG59IGZyb20gJy4vaW50ZXJmYWNlcy9Eb21haW5UZW1wbGF0ZXMnO1xuXG5leHBvcnQgY2xhc3MgRG9tYWluVGVtcGxhdGVJdGVtIGltcGxlbWVudHMgRG9tYWluVGVtcGxhdGUge1xuICBuYW1lIDogc3RyaW5nO1xuICBkZXNjcmlwdGlvbiA6IHN0cmluZztcbiAgY3JlYXRlZEF0IDogRGF0ZSB8ICcnO1xuICBjcmVhdGVkQnkgOiBzdHJpbmc7XG4gIGlkIDogc3RyaW5nO1xuICB2ZXJzaW9uPzogVGVtcGxhdGVWZXJzaW9uO1xuICB2ZXJzaW9ucz86IFNob3J0VGVtcGxhdGVWZXJzaW9uW107XG5cbiAgY29uc3RydWN0b3IoZG9tYWluVGVtcGxhdGVGcm9tQVBJOiBEb21haW5UZW1wbGF0ZSkge1xuICAgIHRoaXMubmFtZSA9IGRvbWFpblRlbXBsYXRlRnJvbUFQSS5uYW1lO1xuICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkb21haW5UZW1wbGF0ZUZyb21BUEkuZGVzY3JpcHRpb247XG4gICAgdGhpcy5jcmVhdGVkQXQgPSBkb21haW5UZW1wbGF0ZUZyb21BUEkuY3JlYXRlZEF0ID8gbmV3IERhdGUoZG9tYWluVGVtcGxhdGVGcm9tQVBJLmNyZWF0ZWRBdCkgOiAnJztcbiAgICB0aGlzLmNyZWF0ZWRCeSA9IGRvbWFpblRlbXBsYXRlRnJvbUFQSS5jcmVhdGVkQnk7XG4gICAgdGhpcy5pZCA9IGRvbWFpblRlbXBsYXRlRnJvbUFQSS5pZDtcblxuICAgIGlmIChkb21haW5UZW1wbGF0ZUZyb21BUEkudmVyc2lvbikge1xuICAgICAgdGhpcy52ZXJzaW9uID0gZG9tYWluVGVtcGxhdGVGcm9tQVBJLnZlcnNpb247XG4gICAgICBpZiAoZG9tYWluVGVtcGxhdGVGcm9tQVBJLnZlcnNpb24uY3JlYXRlZEF0KSB7XG4gICAgICAgIHRoaXMudmVyc2lvbi5jcmVhdGVkQXQgPSBuZXcgRGF0ZShkb21haW5UZW1wbGF0ZUZyb21BUEkudmVyc2lvbi5jcmVhdGVkQXQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChkb21haW5UZW1wbGF0ZUZyb21BUEkudmVyc2lvbnMgJiYgZG9tYWluVGVtcGxhdGVGcm9tQVBJLnZlcnNpb25zLmxlbmd0aCkge1xuICAgICAgdGhpcy52ZXJzaW9ucyA9IGRvbWFpblRlbXBsYXRlRnJvbUFQSS52ZXJzaW9ucy5tYXAoKHZlcnNpb24pID0+IHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0geyAuLi52ZXJzaW9uIH07XG4gICAgICAgIHJlc3VsdC5jcmVhdGVkQXQgPSBuZXcgRGF0ZSh2ZXJzaW9uLmNyZWF0ZWRBdCk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRG9tYWluVGVtcGxhdGVzQ2xpZW50IGltcGxlbWVudHMgSURvbWFpblRlbXBsYXRlc0NsaWVudCB7XG4gIGJhc2VSb3V0ZTogc3RyaW5nO1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuXG4gIGNvbnN0cnVjdG9yKHJlcXVlc3Q6IFJlcXVlc3QpIHtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgIHRoaXMuYmFzZVJvdXRlID0gJy92My8nO1xuICB9XG5cbiAgcHJpdmF0ZSBwYXJzZUNyZWF0aW9uUmVzcG9uc2UoZGF0YTogQ3JlYXRlRG9tYWluVGVtcGxhdGVBUElSZXNwb25zZSk6IERvbWFpblRlbXBsYXRlSXRlbSB7XG4gICAgcmV0dXJuIG5ldyBEb21haW5UZW1wbGF0ZUl0ZW0oZGF0YS5ib2R5LnRlbXBsYXRlKTtcbiAgfVxuXG4gIHByaXZhdGUgcGFyc2VDcmVhdGlvblZlcnNpb25SZXNwb25zZShcbiAgICBkYXRhOiBDcmVhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25BUElSZXNwb25zZVxuICApOiBDcmVhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25SZXN1bHQge1xuICAgIGNvbnN0IHJlc3VsdDogQ3JlYXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uUmVzdWx0ID0ge30gYXMgQ3JlYXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uUmVzdWx0O1xuICAgIHJlc3VsdC5zdGF0dXMgPSBkYXRhLnN0YXR1cztcbiAgICByZXN1bHQubWVzc2FnZSA9IGRhdGEuYm9keS5tZXNzYWdlO1xuICAgIGlmIChkYXRhLmJvZHkgJiYgZGF0YS5ib2R5LnRlbXBsYXRlKSB7XG4gICAgICByZXN1bHQudGVtcGxhdGUgPSBuZXcgRG9tYWluVGVtcGxhdGVJdGVtKGRhdGEuYm9keS50ZW1wbGF0ZSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwcml2YXRlIHBhcnNlTXV0YXRpb25SZXNwb25zZShcbiAgICBkYXRhOiBVcGRhdGVPckRlbGV0ZURvbWFpblRlbXBsYXRlQVBJUmVzcG9uc2VcbiAgKTogVXBkYXRlT3JEZWxldGVEb21haW5UZW1wbGF0ZVJlc3VsdCB7XG4gICAgY29uc3QgcmVzdWx0OiBVcGRhdGVPckRlbGV0ZURvbWFpblRlbXBsYXRlUmVzdWx0ID0ge30gYXMgVXBkYXRlT3JEZWxldGVEb21haW5UZW1wbGF0ZVJlc3VsdDtcbiAgICByZXN1bHQuc3RhdHVzID0gZGF0YS5zdGF0dXM7XG4gICAgcmVzdWx0Lm1lc3NhZ2UgPSBkYXRhLmJvZHkubWVzc2FnZTtcbiAgICBpZiAoZGF0YS5ib2R5ICYmIGRhdGEuYm9keS50ZW1wbGF0ZSkge1xuICAgICAgcmVzdWx0LnRlbXBsYXRlTmFtZSA9IGRhdGEuYm9keS50ZW1wbGF0ZS5uYW1lO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcHJpdmF0ZSBwYXJzZU5vdGlmaWNhdGlvblJlc3BvbnNlKGRhdGE6IE5vdGlmaWNhdGlvbkFQSVJlc3BvbnNlKTogTm90aWZpY2F0aW9uUmVzdWx0IHtcbiAgICBjb25zdCByZXN1bHQ6IE5vdGlmaWNhdGlvblJlc3VsdCA9IHt9IGFzIE5vdGlmaWNhdGlvblJlc3VsdDtcbiAgICByZXN1bHQuc3RhdHVzID0gZGF0YS5zdGF0dXM7XG4gICAgcmVzdWx0Lm1lc3NhZ2UgPSBkYXRhLmJvZHkubWVzc2FnZTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcHJpdmF0ZSBwYXJzZU11dGF0ZVRlbXBsYXRlVmVyc2lvblJlc3BvbnNlKFxuICAgIGRhdGE6IE11dGF0ZURvbWFpblRlbXBsYXRlVmVyc2lvbkFQSVJlc3BvbnNlXG4gICk6IE11dGF0ZURvbWFpblRlbXBsYXRlVmVyc2lvblJlc3VsdCB7XG4gICAgY29uc3QgcmVzdWx0OiBNdXRhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25SZXN1bHQgPSB7fSBhcyBNdXRhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25SZXN1bHQ7XG4gICAgcmVzdWx0LnN0YXR1cyA9IGRhdGEuc3RhdHVzO1xuICAgIHJlc3VsdC5tZXNzYWdlID0gZGF0YS5ib2R5Lm1lc3NhZ2U7XG4gICAgaWYgKGRhdGEuYm9keS50ZW1wbGF0ZSkge1xuICAgICAgcmVzdWx0LnRlbXBsYXRlTmFtZSA9IGRhdGEuYm9keS50ZW1wbGF0ZS5uYW1lO1xuICAgICAgcmVzdWx0LnRlbXBsYXRlVmVyc2lvbiA9IHsgdGFnOiBkYXRhLmJvZHkudGVtcGxhdGUudmVyc2lvbi50YWcgfTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHByaXZhdGUgcGFyc2VMaXN0KHJlc3BvbnNlOiBMaXN0RG9tYWluVGVtcGxhdGVzQVBJUmVzcG9uc2UpOiBMaXN0RG9tYWluVGVtcGxhdGVzUmVzdWx0IHtcbiAgICBjb25zdCBkYXRhID0ge30gYXMgTGlzdERvbWFpblRlbXBsYXRlc1Jlc3VsdDtcblxuICAgIGRhdGEuaXRlbXMgPSByZXNwb25zZS5ib2R5Lml0ZW1zLm1hcCgoZDogRG9tYWluVGVtcGxhdGUpID0+IG5ldyBEb21haW5UZW1wbGF0ZUl0ZW0oZCkpO1xuXG4gICAgZGF0YS5wYWdlcyA9IHJlc3BvbnNlLmJvZHkucGFnaW5nO1xuXG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxuICBwcml2YXRlIHBhcnNlTGlzdFRlbXBsYXRlVmVyc2lvbnMoXG4gICAgcmVzcG9uc2U6IExpc3REb21haW5UZW1wbGF0ZVZlcnNpb25zQVBJUmVzcG9uc2VcbiAgKTogTGlzdERvbWFpblRlbXBsYXRlVmVyc2lvbnNSZXN1bHQge1xuICAgIGNvbnN0IGRhdGEgPSB7fSBhcyBMaXN0RG9tYWluVGVtcGxhdGVWZXJzaW9uc1Jlc3VsdDtcblxuICAgIGRhdGEudGVtcGxhdGUgPSBuZXcgRG9tYWluVGVtcGxhdGVJdGVtKHJlc3BvbnNlLmJvZHkudGVtcGxhdGUpO1xuXG4gICAgZGF0YS5wYWdlcyA9IHJlc3BvbnNlLmJvZHkucGFnaW5nO1xuXG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxuICBsaXN0KGRvbWFpbjogc3RyaW5nLCBxdWVyeT86IERvbWFpblRlbXBsYXRlc1F1ZXJ5KTogUHJvbWlzZTxMaXN0RG9tYWluVGVtcGxhdGVzUmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RlbXBsYXRlcycpLCBxdWVyeSlcbiAgICAgIC50aGVuKFxuICAgICAgICAocmVzOiBBUElSZXNwb25zZSkgPT4gdGhpcy5wYXJzZUxpc3QocmVzKVxuICAgICAgKTtcbiAgfVxuXG4gIGdldChkb21haW46IHN0cmluZywgdGVtcGxhdGVOYW1lOiBzdHJpbmcsIHF1ZXJ5PzogVGVtcGxhdGVRdWVyeSk6IFByb21pc2U8RG9tYWluVGVtcGxhdGVJdGVtPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RlbXBsYXRlcy8nLCB0ZW1wbGF0ZU5hbWUpLCBxdWVyeSlcbiAgICAgIC50aGVuKFxuICAgICAgICAocmVzOiBHZXREb21haW5UZW1wbGF0ZUFQSVJlc3BvbnNlKSA9PiBuZXcgRG9tYWluVGVtcGxhdGVJdGVtKHJlcy5ib2R5LnRlbXBsYXRlKVxuICAgICAgKTtcbiAgfVxuXG4gIGNyZWF0ZShcbiAgICBkb21haW46IHN0cmluZyxcbiAgICBkYXRhOiBEb21haW5UZW1wbGF0ZURhdGFcbiAgKTogUHJvbWlzZTxEb21haW5UZW1wbGF0ZUl0ZW0+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RlbXBsYXRlcycpLCBkYXRhKVxuICAgICAgLnRoZW4oKHJlczogQ3JlYXRlRG9tYWluVGVtcGxhdGVBUElSZXNwb25zZSkgPT4gdGhpcy5wYXJzZUNyZWF0aW9uUmVzcG9uc2UocmVzKSk7XG4gIH1cblxuICB1cGRhdGUoXG4gICAgZG9tYWluOiBzdHJpbmcsXG4gICAgdGVtcGxhdGVOYW1lOiBzdHJpbmcsXG4gICAgZGF0YTogRG9tYWluVGVtcGxhdGVVcGRhdGVEYXRhXG4gICk6IFByb21pc2U8VXBkYXRlT3JEZWxldGVEb21haW5UZW1wbGF0ZVJlc3VsdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucHV0V2l0aEZEKHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90ZW1wbGF0ZXMvJywgdGVtcGxhdGVOYW1lKSwgZGF0YSlcbiAgICAgIC50aGVuKChyZXM6IFVwZGF0ZU9yRGVsZXRlRG9tYWluVGVtcGxhdGVBUElSZXNwb25zZSkgPT4gdGhpcy5wYXJzZU11dGF0aW9uUmVzcG9uc2UocmVzKSk7XG4gIH1cblxuICBkZXN0cm95KGRvbWFpbjogc3RyaW5nLCB0ZW1wbGF0ZU5hbWU6IHN0cmluZyk6IFByb21pc2U8VXBkYXRlT3JEZWxldGVEb21haW5UZW1wbGF0ZVJlc3VsdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZGVsZXRlKHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90ZW1wbGF0ZXMvJywgdGVtcGxhdGVOYW1lKSlcbiAgICAgIC50aGVuKChyZXM6IFVwZGF0ZU9yRGVsZXRlRG9tYWluVGVtcGxhdGVBUElSZXNwb25zZSkgPT4gdGhpcy5wYXJzZU11dGF0aW9uUmVzcG9uc2UocmVzKSk7XG4gIH1cblxuICBkZXN0cm95QWxsKGRvbWFpbjogc3RyaW5nKTogUHJvbWlzZTxOb3RpZmljYXRpb25SZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmRlbGV0ZSh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGVtcGxhdGVzJykpXG4gICAgICAudGhlbigocmVzOiBOb3RpZmljYXRpb25BUElSZXNwb25zZSkgPT4gdGhpcy5wYXJzZU5vdGlmaWNhdGlvblJlc3BvbnNlKHJlcykpO1xuICB9XG5cbiAgY3JlYXRlVmVyc2lvbihcbiAgICBkb21haW46IHN0cmluZyxcbiAgICB0ZW1wbGF0ZU5hbWU6IHN0cmluZyxcbiAgICBkYXRhOiBEb21haW5UZW1wbGF0ZVZlcnNpb25EYXRhXG4gICk6IFByb21pc2U8Q3JlYXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uUmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90ZW1wbGF0ZXMvJywgdGVtcGxhdGVOYW1lLCAnL3ZlcnNpb25zJyksIGRhdGEpXG4gICAgICAudGhlbihcbiAgICAgICAgKHJlczogQ3JlYXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uQVBJUmVzcG9uc2UpID0+IHRoaXMucGFyc2VDcmVhdGlvblZlcnNpb25SZXNwb25zZShyZXMpXG4gICAgICApO1xuICB9XG5cbiAgZ2V0VmVyc2lvbihkb21haW46IHN0cmluZywgdGVtcGxhdGVOYW1lOiBzdHJpbmcsIHRhZzogc3RyaW5nKTogUHJvbWlzZTxEb21haW5UZW1wbGF0ZUl0ZW0+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGVtcGxhdGVzLycsIHRlbXBsYXRlTmFtZSwgJy92ZXJzaW9ucy8nLCB0YWcpKVxuICAgICAgLnRoZW4oXG4gICAgICAgIChyZXM6IEdldERvbWFpblRlbXBsYXRlQVBJUmVzcG9uc2UpID0+IG5ldyBEb21haW5UZW1wbGF0ZUl0ZW0ocmVzLmJvZHkudGVtcGxhdGUpXG4gICAgICApO1xuICB9XG5cbiAgdXBkYXRlVmVyc2lvbihcbiAgICBkb21haW46IHN0cmluZyxcbiAgICB0ZW1wbGF0ZU5hbWU6IHN0cmluZyxcbiAgICB0YWc6IHN0cmluZyxcbiAgICBkYXRhOiBEb21haW5UZW1wbGF0ZVVwZGF0ZVZlcnNpb25EYXRhXG4gICk6IFByb21pc2U8TXV0YXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uUmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXRXaXRoRkQodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RlbXBsYXRlcy8nLCB0ZW1wbGF0ZU5hbWUsICcvdmVyc2lvbnMvJywgdGFnKSwgZGF0YSlcbiAgICAgIC50aGVuKFxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LWxlblxuICAgICAgICAocmVzOiBNdXRhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25BUElSZXNwb25zZSkgPT4gdGhpcy5wYXJzZU11dGF0ZVRlbXBsYXRlVmVyc2lvblJlc3BvbnNlKHJlcylcbiAgICAgICk7XG4gIH1cblxuICBkZXN0cm95VmVyc2lvbihcbiAgICBkb21haW46IHN0cmluZyxcbiAgICB0ZW1wbGF0ZU5hbWU6IHN0cmluZyxcbiAgICB0YWc6IHN0cmluZ1xuICApOiBQcm9taXNlPE11dGF0ZURvbWFpblRlbXBsYXRlVmVyc2lvblJlc3VsdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZGVsZXRlKHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90ZW1wbGF0ZXMvJywgdGVtcGxhdGVOYW1lLCAnL3ZlcnNpb25zLycsIHRhZykpXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LWxlblxuICAgICAgLnRoZW4oKHJlczogTXV0YXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uQVBJUmVzcG9uc2UpID0+IHRoaXMucGFyc2VNdXRhdGVUZW1wbGF0ZVZlcnNpb25SZXNwb25zZShyZXMpKTtcbiAgfVxuXG4gIGxpc3RWZXJzaW9ucyhcbiAgICBkb21haW46IHN0cmluZyxcbiAgICB0ZW1wbGF0ZU5hbWU6IHN0cmluZyxcbiAgICBxdWVyeT86IERvbWFpblRlbXBsYXRlc1F1ZXJ5XG4gICk6IFByb21pc2U8TGlzdERvbWFpblRlbXBsYXRlVmVyc2lvbnNSZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGVtcGxhdGVzJywgdGVtcGxhdGVOYW1lLCAnL3ZlcnNpb25zJyksIHF1ZXJ5KVxuICAgICAgLnRoZW4oXG4gICAgICAgIChyZXM6IExpc3REb21haW5UZW1wbGF0ZVZlcnNpb25zQVBJUmVzcG9uc2UpID0+IHRoaXMucGFyc2VMaXN0VGVtcGxhdGVWZXJzaW9ucyhyZXMpXG4gICAgICApO1xuICB9XG59XG4iLCJpbXBvcnQgQVBJRXJyb3JPcHRpb25zIGZyb20gJy4vaW50ZXJmYWNlcy9BUElFcnJvck9wdGlvbnMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBUElFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgc3RhdHVzOiBudW1iZXIgfCBzdHJpbmc7XG4gIHN0YWNrOiBzdHJpbmc7XG4gIGRldGFpbHM6IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcih7XG4gICAgc3RhdHVzLFxuICAgIHN0YXR1c1RleHQsXG4gICAgbWVzc2FnZSxcbiAgICBib2R5ID0ge31cbiAgfTogQVBJRXJyb3JPcHRpb25zKSB7XG4gICAgY29uc3QgeyBtZXNzYWdlOiBib2R5TWVzc2FnZSwgZXJyb3IgfSA9IGJvZHk7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuc3RhY2sgPSAnJztcbiAgICB0aGlzLnN0YXR1cyA9IHN0YXR1cztcbiAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlIHx8IGVycm9yIHx8IHN0YXR1c1RleHQ7XG4gICAgdGhpcy5kZXRhaWxzID0gYm9keU1lc3NhZ2U7XG4gIH1cbn1cbiIsImltcG9ydCB1cmxqb2luIGZyb20gJ3VybC1qb2luJztcbmltcG9ydCB7XG4gIEV2ZW50c0xpc3QsXG4gIEV2ZW50c1BhZ2UsXG4gIEV2ZW50c1F1ZXJ5LFxuICBFdmVudHNSZXNwb25zZSxcbiAgUGFnZXNMaXN0LFxuICBQYWdlc0xpc3RBY2N1bXVsYXRvcixcbiAgUGFyc2VkUGFnZXNMaXN0XG59IGZyb20gJy4vaW50ZXJmYWNlcy9FdmVudHMnO1xuXG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuL3JlcXVlc3QnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFdmVudENsaWVudCB7XG4gIHJlcXVlc3Q6IFJlcXVlc3Q7XG5cbiAgY29uc3RydWN0b3IocmVxdWVzdDogUmVxdWVzdCkge1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gIH1cblxuICBfcGFyc2VQYWdlTnVtYmVyKHVybDogc3RyaW5nKSA6IHN0cmluZyB7XG4gICAgcmV0dXJuIHVybC5zcGxpdCgnLycpLnBvcCgpIHx8ICcnO1xuICB9XG5cbiAgX3BhcnNlUGFnZShpZDogc3RyaW5nLCB1cmw6IHN0cmluZykgOiBFdmVudHNQYWdlIHtcbiAgICByZXR1cm4geyBpZCwgbnVtYmVyOiB0aGlzLl9wYXJzZVBhZ2VOdW1iZXIodXJsKSwgdXJsIH07XG4gIH1cblxuICBfcGFyc2VQYWdlTGlua3MocmVzcG9uc2U6IEV2ZW50c1Jlc3BvbnNlKSA6IFBhcnNlZFBhZ2VzTGlzdCB7XG4gICAgY29uc3QgcGFnZXMgPSBPYmplY3QuZW50cmllcyhyZXNwb25zZS5ib2R5LnBhZ2luZyBhcyBQYWdlc0xpc3QpO1xuICAgIHJldHVybiBwYWdlcy5yZWR1Y2UoXG4gICAgICAoYWNjOiBQYWdlc0xpc3RBY2N1bXVsYXRvciwgcGFpcjogW3VybDogc3RyaW5nLCBpZDogc3RyaW5nXSkgPT4ge1xuICAgICAgICBjb25zdCBpZCA9IHBhaXJbMF07XG4gICAgICAgIGNvbnN0IHVybCA9IHBhaXJbMV07XG4gICAgICAgIGFjY1tpZF0gPSB0aGlzLl9wYXJzZVBhZ2UoaWQsIHVybCk7XG4gICAgICAgIHJldHVybiBhY2M7XG4gICAgICB9LCB7fVxuICAgICkgYXMgdW5rbm93biBhcyBQYXJzZWRQYWdlc0xpc3Q7XG4gIH1cblxuICBfcGFyc2VFdmVudExpc3QocmVzcG9uc2U6IEV2ZW50c1Jlc3BvbnNlKSA6IEV2ZW50c0xpc3Qge1xuICAgIHJldHVybiB7XG4gICAgICBpdGVtczogcmVzcG9uc2UuYm9keS5pdGVtcyxcbiAgICAgIHBhZ2VzOiB0aGlzLl9wYXJzZVBhZ2VMaW5rcyhyZXNwb25zZSlcbiAgICB9O1xuICB9XG5cbiAgZ2V0KGRvbWFpbjogc3RyaW5nLCBxdWVyeT86IEV2ZW50c1F1ZXJ5KSA6IFByb21pc2U8RXZlbnRzTGlzdD4ge1xuICAgIGxldCB1cmw7XG4gICAgY29uc3QgcXVlcnlDb3B5ID0geyAuLi5xdWVyeSB9O1xuICAgIGlmIChxdWVyeUNvcHkgJiYgcXVlcnlDb3B5LnBhZ2UpIHtcbiAgICAgIHVybCA9IHVybGpvaW4oJy92MycsIGRvbWFpbiwgJ2V2ZW50cycsIHF1ZXJ5Q29weS5wYWdlKTtcbiAgICAgIGRlbGV0ZSBxdWVyeUNvcHkucGFnZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdXJsID0gdXJsam9pbignL3YzJywgZG9tYWluLCAnZXZlbnRzJyk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KHVybCwgcXVlcnlDb3B5KVxuICAgICAgLnRoZW4oKHJlc3BvbnNlOiBFdmVudHNSZXNwb25zZSkgPT4gdGhpcy5fcGFyc2VFdmVudExpc3QocmVzcG9uc2UpKTtcbiAgfVxufVxuIiwiaW1wb3J0ICogYXMgTm9kZUZvcm1EYXRhIGZyb20gJ2Zvcm0tZGF0YSc7XG5pbXBvcnQgeyBJbnB1dEZvcm1EYXRhIH0gZnJvbSAnLi9pbnRlcmZhY2VzL0lGb3JtRGF0YSc7XG5cbmNsYXNzIEZvcm1EYXRhQnVpbGRlciB7XG4gIHByaXZhdGUgRm9ybURhdGFDb25zdHJ1Y3RvcjogSW5wdXRGb3JtRGF0YTtcbiAgY29uc3RydWN0b3IoRm9ybURhdGFDb25zdHJ1Y3RvcjogSW5wdXRGb3JtRGF0YSkge1xuICAgIHRoaXMuRm9ybURhdGFDb25zdHJ1Y3RvciA9IEZvcm1EYXRhQ29uc3RydWN0b3I7XG4gIH1cblxuICBwdWJsaWMgY3JlYXRlRm9ybURhdGEoZGF0YTogYW55KTogTm9kZUZvcm1EYXRhIHwgRm9ybURhdGEge1xuICAgIGlmICghZGF0YSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdQbGVhc2UgcHJvdmlkZSBkYXRhIG9iamVjdCcpO1xuICAgIH1cbiAgICBjb25zdCBmb3JtRGF0YTogTm9kZUZvcm1EYXRhIHwgRm9ybURhdGEgPSBPYmplY3Qua2V5cyhkYXRhKVxuICAgICAgLmZpbHRlcihmdW5jdGlvbiAoa2V5KSB7IHJldHVybiBkYXRhW2tleV07IH0pXG4gICAgICAucmVkdWNlKChmb3JtRGF0YUFjYzogTm9kZUZvcm1EYXRhIHwgRm9ybURhdGEsIGtleSkgPT4ge1xuICAgICAgICBjb25zdCBmaWxlS2V5cyA9IFsnYXR0YWNobWVudCcsICdpbmxpbmUnLCAnbXVsdGlwbGVWYWxpZGF0aW9uRmlsZSddO1xuICAgICAgICBpZiAoZmlsZUtleXMuaW5jbHVkZXMoa2V5KSkge1xuICAgICAgICAgIHRoaXMuYWRkRmlsZXNUb0ZEKGtleSwgZGF0YVtrZXldLCBmb3JtRGF0YUFjYyk7XG4gICAgICAgICAgcmV0dXJuIGZvcm1EYXRhQWNjO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGtleSA9PT0gJ21lc3NhZ2UnKSB7IC8vIG1pbWUgbWVzc2FnZVxuICAgICAgICAgIHRoaXMuYWRkTWltZURhdGFUb0ZEKGtleSwgZGF0YVtrZXldLCBmb3JtRGF0YUFjYyk7XG4gICAgICAgICAgcmV0dXJuIGZvcm1EYXRhQWNjO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5hZGRDb21tb25Qcm9wZXJ0eVRvRkQoa2V5LCBkYXRhW2tleV0sIGZvcm1EYXRhQWNjKTtcbiAgICAgICAgcmV0dXJuIGZvcm1EYXRhQWNjO1xuICAgICAgfSwgbmV3IHRoaXMuRm9ybURhdGFDb25zdHJ1Y3RvcigpKTtcbiAgICByZXR1cm4gZm9ybURhdGE7XG4gIH1cblxuICBwcml2YXRlIGlzTm9kZUZvcm1EYXRhKGZvcm1EYXRhSW5zdGFuY2U6IE5vZGVGb3JtRGF0YSB8IEZvcm1EYXRhKVxuICA6IGZvcm1EYXRhSW5zdGFuY2UgaXMgTm9kZUZvcm1EYXRhIHtcbiAgICByZXR1cm4gKDxOb2RlRm9ybURhdGE+Zm9ybURhdGFJbnN0YW5jZSkuZ2V0SGVhZGVycyAhPT0gdW5kZWZpbmVkO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRBdHRhY2htZW50T3B0aW9ucyhpdGVtOiB7XG4gICAgZmlsZW5hbWU/OiBzdHJpbmc7XG4gICAgY29udGVudFR5cGU/IDogc3RyaW5nO1xuICAgIGtub3duTGVuZ3RoPzogbnVtYmVyO1xuICB9KToge1xuICAgIGZpbGVuYW1lPzogc3RyaW5nLFxuICAgIGNvbnRlbnRUeXBlPzogc3RyaW5nLFxuICAgIGtub3duTGVuZ3RoPzogbnVtYmVyXG4gIH0ge1xuICAgIGlmICh0eXBlb2YgaXRlbSAhPT0gJ29iamVjdCcgfHwgdGhpcy5pc1N0cmVhbShpdGVtKSkgcmV0dXJuIHt9O1xuICAgIGNvbnN0IHtcbiAgICAgIGZpbGVuYW1lLFxuICAgICAgY29udGVudFR5cGUsXG4gICAgICBrbm93bkxlbmd0aFxuICAgIH0gPSBpdGVtO1xuICAgIHJldHVybiB7XG4gICAgICAuLi4oZmlsZW5hbWUgPyB7IGZpbGVuYW1lIH0gOiB7IGZpbGVuYW1lOiAnZmlsZScgfSksXG4gICAgICAuLi4oY29udGVudFR5cGUgJiYgeyBjb250ZW50VHlwZSB9KSxcbiAgICAgIC4uLihrbm93bkxlbmd0aCAmJiB7IGtub3duTGVuZ3RoIH0pXG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgYWRkTWltZURhdGFUb0ZEKFxuICAgIGtleTogc3RyaW5nLFxuICAgIGRhdGE6IEJ1ZmZlciB8IEJsb2IsXG4gICAgZm9ybURhdGFJbnN0YW5jZTogTm9kZUZvcm1EYXRhIHwgRm9ybURhdGFcbiAgKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaXNOb2RlRm9ybURhdGEoZm9ybURhdGFJbnN0YW5jZSkpIHtcbiAgICAgIGlmIChCdWZmZXIuaXNCdWZmZXIoZGF0YSkpIHtcbiAgICAgICAgZm9ybURhdGFJbnN0YW5jZS5hcHBlbmQoa2V5LCBkYXRhLCB7IGZpbGVuYW1lOiAnTWltZU1lc3NhZ2UnIH0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmb3JtRGF0YUluc3RhbmNlLmFwcGVuZChrZXksIGRhdGEgYXMgQmxvYiwgJ01pbWVNZXNzYWdlJyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhZGRGaWxlc1RvRkQoXG4gICAgcHJvcGVydHlOYW1lOiBzdHJpbmcsXG4gICAgdmFsdWU6IGFueSxcbiAgICBmb3JtRGF0YUluc3RhbmNlOiBOb2RlRm9ybURhdGEgfCBGb3JtRGF0YVxuICApOiB2b2lkIHtcbiAgICBjb25zdCBhcHBlbmRGaWxlVG9GRCA9IChcbiAgICAgIG9yaWdpbmFsS2V5OiBzdHJpbmcsXG4gICAgICBvYmo6IGFueSxcbiAgICAgIGZvcm1EYXRhOiBOb2RlRm9ybURhdGEgfCBGb3JtRGF0YVxuICAgICk6IHZvaWQgPT4ge1xuICAgICAgY29uc3Qga2V5ID0gb3JpZ2luYWxLZXkgPT09ICdtdWx0aXBsZVZhbGlkYXRpb25GaWxlJyA/ICdmaWxlJyA6IG9yaWdpbmFsS2V5O1xuICAgICAgY29uc3QgaXNTdHJlYW1EYXRhID0gdGhpcy5pc1N0cmVhbShvYmopO1xuICAgICAgY29uc3Qgb2JqRGF0YSA9IGlzU3RyZWFtRGF0YSA/IG9iaiA6IG9iai5kYXRhO1xuICAgICAgLy8gZ2V0QXR0YWNobWVudE9wdGlvbnMgc2hvdWxkIGJlIGNhbGxlZCB3aXRoIG9iaiBwYXJhbWV0ZXIgdG8gcHJldmVudCBsb29zaW5nIGZpbGVuYW1lXG4gICAgICBjb25zdCBvcHRpb25zID0gdGhpcy5nZXRBdHRhY2htZW50T3B0aW9ucyhvYmopO1xuICAgICAgaWYgKHRoaXMuaXNOb2RlRm9ybURhdGEoZm9ybURhdGEpKSB7XG4gICAgICAgIGZvcm1EYXRhLmFwcGVuZChrZXksIG9iakRhdGEsIG9wdGlvbnMpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBmb3JtRGF0YS5hcHBlbmQoa2V5LCBvYmpEYXRhLCBvcHRpb25zLmZpbGVuYW1lKTtcbiAgICB9O1xuXG4gICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICB2YWx1ZS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgIGFwcGVuZEZpbGVUb0ZEKHByb3BlcnR5TmFtZSwgaXRlbSwgZm9ybURhdGFJbnN0YW5jZSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBwZW5kRmlsZVRvRkQocHJvcGVydHlOYW1lLCB2YWx1ZSwgZm9ybURhdGFJbnN0YW5jZSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBpc1N0cmVhbShkYXRhOiBhbnkpIHtcbiAgICByZXR1cm4gdHlwZW9mIGRhdGEgPT09ICdvYmplY3QnICYmIHR5cGVvZiBkYXRhLnBpcGUgPT09ICdmdW5jdGlvbic7XG4gIH1cblxuICBwcml2YXRlIGFkZENvbW1vblByb3BlcnR5VG9GRChcbiAgICBrZXk6IHN0cmluZyxcbiAgICB2YWx1ZTogYW55LFxuICAgIGZvcm1EYXRhQWNjOiBOb2RlRm9ybURhdGEgfCBGb3JtRGF0YVxuICApOiB2b2lkIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgIHZhbHVlLmZvckVhY2goZnVuY3Rpb24gKGl0ZW06IGFueSkge1xuICAgICAgICBmb3JtRGF0YUFjYy5hcHBlbmQoa2V5LCBpdGVtKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAodmFsdWUgIT0gbnVsbCkge1xuICAgICAgZm9ybURhdGFBY2MuYXBwZW5kKGtleSwgdmFsdWUpO1xuICAgIH1cbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgRm9ybURhdGFCdWlsZGVyO1xuIiwiaW1wb3J0IENsaWVudCBmcm9tICcuL2NsaWVudCc7XG5pbXBvcnQgeyBJbnB1dEZvcm1EYXRhIH0gZnJvbSAnLi9pbnRlcmZhY2VzL0lGb3JtRGF0YSc7XG5pbXBvcnQgT3B0aW9ucyBmcm9tICcuL2ludGVyZmFjZXMvT3B0aW9ucyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1haWxndW4ge1xuICBzdGF0aWMgZ2V0IGRlZmF1bHQoKTogdHlwZW9mIE1haWxndW4geyByZXR1cm4gdGhpczsgfVxuICBwcml2YXRlIGZvcm1EYXRhOiBJbnB1dEZvcm1EYXRhXG5cbiAgY29uc3RydWN0b3IoRm9ybURhdGE6IElucHV0Rm9ybURhdGEpIHtcbiAgICB0aGlzLmZvcm1EYXRhID0gRm9ybURhdGE7XG4gIH1cblxuICBjbGllbnQob3B0aW9uczogT3B0aW9ucykgOiBDbGllbnQge1xuICAgIHJldHVybiBuZXcgQ2xpZW50KG9wdGlvbnMsIHRoaXMuZm9ybURhdGEpO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBCb3VuY2UsIENvbXBsYWludCwgVW5zdWJzY3JpYmUsIFdoaXRlTGlzdFxufSBmcm9tICcuLi9zdXBwcmVzc2lvbnMnO1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cbmV4cG9ydCBpbnRlcmZhY2UgQm91bmNlRGF0YSB7XG4gIGFkZHJlc3M6IHN0cmluZztcbiAgY29kZTogbnVtYmVyO1xuICBlcnJvcjogc3RyaW5nO1xuICBjcmVhdGVkX2F0OiBzdHJpbmcgfCBEYXRlO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIENvbXBsYWludERhdGEge1xuICBhZGRyZXNzOiBzdHJpbmc7XG4gIGNyZWF0ZWRfYXQ6IHN0cmluZyB8IERhdGU7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVW5zdWJzY3JpYmVEYXRhIHtcbiAgYWRkcmVzczogc3RyaW5nO1xuICB0YWdzOiBhbnk7XG4gIGNyZWF0ZWRfYXQ6IHN0cmluZyB8IERhdGU7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgV2hpdGVMaXN0RGF0YSB7XG4gIHR5cGU6IHN0cmluZztcbiAgdmFsdWU6IHN0cmluZztcbiAgcmVhc29uOiBzdHJpbmc7XG4gIGNyZWF0ZWRBdDogc3RyaW5nIHwgRGF0ZTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQYXJzZWRQYWdlIHtcbiAgaWQ6IHN0cmluZztcbiAgcGFnZTogc3RyaW5nIHwgbnVsbCB8IHVuZGVmaW5lZDtcbiAgYWRkcmVzczogc3RyaW5nIHwgbnVsbCB8IHVuZGVmaW5lZDtcbiAgdXJsOiBzdHJpbmdcbn1cbmV4cG9ydCBpbnRlcmZhY2UgUGFyc2VkUGFnZXNMaXN0IHtcbiAgcHJldmlvdXM6IFBhcnNlZFBhZ2U7XG4gIGZpcnN0OiBQYXJzZWRQYWdlO1xuICBsYXN0OiBQYXJzZWRQYWdlO1xuICBuZXh0OiBQYXJzZWRQYWdlO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFN1cHByZXNzaW9uTGlzdCB7XG4gIGl0ZW1zOiAoQm91bmNlIHwgQ29tcGxhaW50IHwgVW5zdWJzY3JpYmUgfCBXaGl0ZUxpc3QpW107XG4gIHBhZ2VzOiBQYXJzZWRQYWdlc0xpc3Q7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGFnZXNMaXN0IHtcbiAgcHJldmlvdXM6IHN0cmluZztcbiAgZmlyc3Q6IHN0cmluZztcbiAgbGFzdDogc3RyaW5nO1xuICBuZXh0OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBlbnVtIFN1cHByZXNzaW9uTW9kZWxzIHtcbiAgQk9VTkNFUyA9ICdib3VuY2VzJyxcbiAgQ09NUExBSU5UUyA9ICdjb21wbGFpbnRzJyxcbiAgVU5TVUJTQ1JJQkVTID0gJ3Vuc3Vic2NyaWJlcycsXG4gIFdISVRFTElTVFMgPSAnd2hpdGVsaXN0cydcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQYWdlc0xpc3RBY2N1bXVsYXRvciB7XG4gIFtpbmRleDogc3RyaW5nXTogUGFyc2VkUGFnZTtcbn1cblxuZXhwb3J0IHR5cGUgU3VwcHJlc3Npb25MaXN0UXVlcnkgPSB7XG4gIGxpbWl0PzogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFN1cHByZXNzaW9uTGlzdFJlc3BvbnNlIHtcbiAgYm9keToge1xuICAgIGl0ZW1zOiBCb3VuY2VEYXRhW10gfCBDb21wbGFpbnREYXRhW10gfCBVbnN1YnNjcmliZURhdGFbXSB8IFdoaXRlTGlzdERhdGFbXTtcbiAgICBwYWdpbmc6IFBhZ2VzTGlzdDtcbiAgfVxuICBzdGF0dXM6IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTdXBwcmVzc2lvblJlc3BvbnNlIHtcbiAgYm9keTogQm91bmNlRGF0YSB8IENvbXBsYWludERhdGEgfCBVbnN1YnNjcmliZURhdGEgfCBXaGl0ZUxpc3REYXRhO1xuICBzdGF0dXM6IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTdXBwcmVzc2lvbkRlc3Ryb3lSZXNwb25zZSB7XG4gIGJvZHk6IHtcbiAgICBtZXNzYWdlOiBzdHJpbmc7XG4gICAgdmFsdWU/OiBzdHJpbmc7XG4gICAgYWRkcmVzcz86IHN0cmluZztcbiAgfVxuICBzdGF0dXM6IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTdXBwcmVzc2lvbkRlc3Ryb3lSZXN1bHQge1xuICBtZXNzYWdlOiBzdHJpbmc7XG4gIHZhbHVlOiBzdHJpbmc7XG4gIGFkZHJlc3M6IHN0cmluZztcbiAgc3RhdHVzOiBudW1iZXI7XG59XG5cbmV4cG9ydCB0eXBlIFN1cHByZXNzaW9uQ3JlYXRpb25EYXRhID0ge1xuICBhZGRyZXNzOiBzdHJpbmc7XG4gIGNvZGU/OiBudW1iZXI7XG4gIGVycm9yPzogc3RyaW5nO1xuICBkb21haW4/OiBzdHJpbmc7XG4gIHRhZz86IHN0cmluZztcbiAgY3JlYXRlZF9hdD86IHN0cmluZyA7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3VwcHJlc3Npb25DcmVhdGlvblJlc3BvbnNlIHtcbiAgYm9keTp7XG4gICAgbWVzc2FnZTpzdHJpbmc7XG4gICAgdHlwZT86IHN0cmluZztcbiAgICB2YWx1ZT86IHN0cmluZztcbiAgfVxuICBzdGF0dXM6IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTdXBwcmVzc2lvbkNyZWF0aW9uUmVzdWx0IHtcbiAgbWVzc2FnZTpzdHJpbmc7XG4gIHR5cGU6IHN0cmluZztcbiAgdmFsdWU6IHN0cmluZztcbiAgc3RhdHVzOiBudW1iZXI7XG59XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4vcmVxdWVzdCc7XG5cbmltcG9ydCB7XG4gIElwUG9vbENyZWF0ZURhdGEsXG4gIElwUG9vbENyZWF0ZVJlc3BvbnNlLFxuICBJcFBvb2xDcmVhdGVSZXN1bHQsXG4gIElwUG9vbERlbGV0ZURhdGEsXG4gIElwUG9vbExpc3RSZXNwb25zZSxcbiAgSXBQb29sTGlzdFJlc3VsdCxcbiAgSXBQb29sTWVzc2FnZVJlc3BvbnNlLFxuICBJcFBvb2xNZXNzYWdlUmVzdWx0LFxuICBJcFBvb2xVcGRhdGVEYXRhLFxufSBmcm9tICcuL2ludGVyZmFjZXMvSXBQb29scyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIElwUG9vbHNDbGllbnQge1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuXG4gIGNvbnN0cnVjdG9yKHJlcXVlc3Q6IFJlcXVlc3QpIHtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICB9XG5cbiAgbGlzdCgpOiBQcm9taXNlPElwUG9vbExpc3RSZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCgnL3YxL2lwX3Bvb2xzJylcbiAgICAgIC50aGVuKChyZXNwb25zZTogSXBQb29sTGlzdFJlc3BvbnNlKSA9PiB0aGlzLnBhcnNlSXBQb29sc1Jlc3BvbnNlKHJlc3BvbnNlKSk7XG4gIH1cblxuICBhc3luYyBjcmVhdGUoZGF0YTogSXBQb29sQ3JlYXRlRGF0YSk6IFByb21pc2U8SXBQb29sQ3JlYXRlUmVzdWx0PiB7XG4gICAgY29uc3QgcmVzcG9uc2U6IElwUG9vbENyZWF0ZVJlc3BvbnNlID0gYXdhaXQgdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQoJy92MS9pcF9wb29scycsIGRhdGEpO1xuICAgIHJldHVybiB7XG4gICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgIC4uLnJlc3BvbnNlLmJvZHlcbiAgICB9O1xuICB9XG5cbiAgYXN5bmMgdXBkYXRlKHBvb2xJZDogc3RyaW5nLCBkYXRhOiBJcFBvb2xVcGRhdGVEYXRhKTogUHJvbWlzZTxJcFBvb2xNZXNzYWdlUmVzdWx0PiB7XG4gICAgY29uc3QgcmVzcG9uc2U6IElwUG9vbE1lc3NhZ2VSZXNwb25zZSA9IGF3YWl0IHRoaXMucmVxdWVzdC5wYXRjaFdpdGhGRChgL3YxL2lwX3Bvb2xzLyR7cG9vbElkfWAsIGRhdGEpO1xuICAgIHJldHVybiB7XG4gICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgIC4uLnJlc3BvbnNlLmJvZHlcbiAgICB9O1xuICB9XG5cbiAgYXN5bmMgZGVsZXRlKHBvb2xJZDogc3RyaW5nLCBkYXRhOiBJcFBvb2xEZWxldGVEYXRhKTogUHJvbWlzZTxJcFBvb2xNZXNzYWdlUmVzdWx0PiB7XG4gICAgY29uc3QgcmVzcG9uc2U6SXBQb29sTWVzc2FnZVJlc3BvbnNlID0gYXdhaXQgdGhpcy5yZXF1ZXN0LmRlbGV0ZShgL3YxL2lwX3Bvb2xzLyR7cG9vbElkfWAsIGRhdGEpO1xuICAgIHJldHVybiB7XG4gICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgIC4uLnJlc3BvbnNlLmJvZHlcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBwYXJzZUlwUG9vbHNSZXNwb25zZShyZXNwb25zZTogSXBQb29sTGlzdFJlc3BvbnNlKTogSXBQb29sTGlzdFJlc3VsdCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgLi4ucmVzcG9uc2UuYm9keVxuICAgIH07XG4gIH1cbn1cbiIsImltcG9ydCBNZ1JlcXVlc3QgZnJvbSAnLi9yZXF1ZXN0JztcbmltcG9ydCB7IElwRGF0YSwgSXBzTGlzdFJlc3BvbnNlQm9keSB9IGZyb20gJy4vaW50ZXJmYWNlcy9JcHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJcHNDbGllbnQge1xuICByZXF1ZXN0OiBNZ1JlcXVlc3Q7XG5cbiAgY29uc3RydWN0b3IocmVxdWVzdDogTWdSZXF1ZXN0KSB7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgfVxuXG4gIGFzeW5jIGxpc3QocXVlcnk6IGFueSk6IFByb21pc2U8SXBzTGlzdFJlc3BvbnNlQm9keT4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5yZXF1ZXN0LmdldCgnL3YzL2lwcycsIHF1ZXJ5KTtcbiAgICByZXR1cm4gdGhpcy5wYXJzZUlwc1Jlc3BvbnNlPElwc0xpc3RSZXNwb25zZUJvZHk+KHJlc3BvbnNlKTtcbiAgfVxuXG4gIGFzeW5jIGdldChpcDogc3RyaW5nKTogUHJvbWlzZTxJcERhdGE+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMucmVxdWVzdC5nZXQoYC92My9pcHMvJHtpcH1gKTtcbiAgICByZXR1cm4gdGhpcy5wYXJzZUlwc1Jlc3BvbnNlPElwRGF0YT4ocmVzcG9uc2UpO1xuICB9XG5cbiAgcHJpdmF0ZSBwYXJzZUlwc1Jlc3BvbnNlPFQ+KHJlc3BvbnNlOiB7IGJvZHk6IFQgfSk6IFQge1xuICAgIHJldHVybiByZXNwb25zZS5ib2R5O1xuICB9XG59XG4iLCJpbXBvcnQgUmVxdWVzdCBmcm9tICcuL3JlcXVlc3QnO1xuaW1wb3J0IHtcbiAgTGlzdHNRdWVyeSxcbiAgQ3JlYXRlVXBkYXRlTGlzdCxcbiAgRGVzdHJveWVkTGlzdCxcbiAgTWFpbGluZ0xpc3QsXG4gIFZhbGlkYXRpb25BcGlSZXNwb25zZSxcbiAgU3RhcnRWYWxpZGF0aW9uUmVzdWx0LFxuICBWYWxpZGF0aW9uUmVzdWx0LFxuICBDYW5jZWxWYWxpZGF0aW9uUmVzdWx0XG59IGZyb20gJy4vaW50ZXJmYWNlcy9saXN0cyc7XG5pbXBvcnQgeyBJTWFpbExpc3RzTWVtYmVycyB9IGZyb20gJy4vaW50ZXJmYWNlcy9tYWlsTGlzdE1lbWJlcnMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMaXN0c0NsaWVudCB7XG4gIGJhc2VSb3V0ZTogc3RyaW5nO1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuICBtZW1iZXJzOiBJTWFpbExpc3RzTWVtYmVycztcblxuICBjb25zdHJ1Y3RvcihyZXF1ZXN0OiBSZXF1ZXN0LCBtZW1iZXJzOklNYWlsTGlzdHNNZW1iZXJzKSB7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICB0aGlzLmJhc2VSb3V0ZSA9ICcvdjMvbGlzdHMnO1xuICAgIHRoaXMubWVtYmVycyA9IG1lbWJlcnM7XG4gIH1cblxuICBwcml2YXRlIHBhcnNlVmFsaWRhdGlvblJlc3VsdChzdGF0dXM6IG51bWJlciwgZGF0YTogVmFsaWRhdGlvbkFwaVJlc3BvbnNlKTogVmFsaWRhdGlvblJlc3VsdCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXR1cyxcbiAgICAgIHZhbGlkYXRpb25SZXN1bHQ6IHtcbiAgICAgICAgLi4uZGF0YSxcbiAgICAgICAgY3JlYXRlZF9hdDogbmV3IERhdGUoZGF0YS5jcmVhdGVkX2F0ICogMTAwMCkgLy8gYWRkIG1pbGxpc2Vjb25kIHRvIFVuaXggdGltZXN0YW1wXG4gICAgICB9XG4gICAgfSBhcyBWYWxpZGF0aW9uUmVzdWx0O1xuICB9XG5cbiAgbGlzdChxdWVyeT86IExpc3RzUXVlcnkpOiBQcm9taXNlPE1haWxpbmdMaXN0W10+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldChgJHt0aGlzLmJhc2VSb3V0ZX0vcGFnZXNgLCBxdWVyeSlcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuYm9keS5pdGVtcyBhcyBNYWlsaW5nTGlzdFtdKTtcbiAgfVxuXG4gIGdldChtYWlsTGlzdEFkZHJlc3M6IHN0cmluZyk6IFByb21pc2U8TWFpbGluZ0xpc3Q+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldChgJHt0aGlzLmJhc2VSb3V0ZX0vJHttYWlsTGlzdEFkZHJlc3N9YClcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuYm9keS5saXN0IGFzIE1haWxpbmdMaXN0KTtcbiAgfVxuXG4gIGNyZWF0ZShkYXRhOiBDcmVhdGVVcGRhdGVMaXN0KTogUHJvbWlzZTxNYWlsaW5nTGlzdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucG9zdFdpdGhGRCh0aGlzLmJhc2VSb3V0ZSwgZGF0YSlcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuYm9keS5saXN0IGFzIE1haWxpbmdMaXN0KTtcbiAgfVxuXG4gIHVwZGF0ZShtYWlsTGlzdEFkZHJlc3M6IHN0cmluZywgZGF0YTogQ3JlYXRlVXBkYXRlTGlzdCk6IFByb21pc2U8TWFpbGluZ0xpc3Q+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnB1dFdpdGhGRChgJHt0aGlzLmJhc2VSb3V0ZX0vJHttYWlsTGlzdEFkZHJlc3N9YCwgZGF0YSlcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuYm9keS5saXN0IGFzIE1haWxpbmdMaXN0KTtcbiAgfVxuXG4gIGRlc3Ryb3kobWFpbExpc3RBZGRyZXNzOiBzdHJpbmcpOiBQcm9taXNlPERlc3Ryb3llZExpc3Q+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmRlbGV0ZShgJHt0aGlzLmJhc2VSb3V0ZX0vJHttYWlsTGlzdEFkZHJlc3N9YClcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuYm9keSBhcyBEZXN0cm95ZWRMaXN0KTtcbiAgfVxuXG4gIHZhbGlkYXRlKG1haWxMaXN0QWRkcmVzczogc3RyaW5nKTogUHJvbWlzZTxTdGFydFZhbGlkYXRpb25SZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3QoYCR7dGhpcy5iYXNlUm91dGV9LyR7bWFpbExpc3RBZGRyZXNzfS92YWxpZGF0ZWAsIHt9KVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiAoe1xuICAgICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgICAgLi4ucmVzcG9uc2UuYm9keVxuICAgICAgfSkgYXMgU3RhcnRWYWxpZGF0aW9uUmVzdWx0KTtcbiAgfVxuXG4gIHZhbGlkYXRpb25SZXN1bHQobWFpbExpc3RBZGRyZXNzOiBzdHJpbmcpOiBQcm9taXNlPFZhbGlkYXRpb25SZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldChgJHt0aGlzLmJhc2VSb3V0ZX0vJHttYWlsTGlzdEFkZHJlc3N9L3ZhbGlkYXRlYClcbiAgICAgIC50aGVuKFxuICAgICAgICAocmVzcG9uc2UpID0+IHRoaXMucGFyc2VWYWxpZGF0aW9uUmVzdWx0KFxuICAgICAgICAgIHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgICAgICAgcmVzcG9uc2UuYm9keSBhcyBWYWxpZGF0aW9uQXBpUmVzcG9uc2VcbiAgICAgICAgKVxuICAgICAgKTtcbiAgfVxuXG4gIGNhbmNlbFZhbGlkYXRpb24obWFpbExpc3RBZGRyZXNzOiBzdHJpbmcpOiBQcm9taXNlPENhbmNlbFZhbGlkYXRpb25SZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmRlbGV0ZShgJHt0aGlzLmJhc2VSb3V0ZX0vJHttYWlsTGlzdEFkZHJlc3N9L3ZhbGlkYXRlYClcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gKHtcbiAgICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICAgIG1lc3NhZ2U6IHJlc3BvbnNlLmJvZHkubWVzc2FnZVxuICAgICAgfSBhcyBDYW5jZWxWYWxpZGF0aW9uUmVzdWx0KSk7XG4gIH1cbn1cbiIsImltcG9ydCBSZXF1ZXN0IGZyb20gJy4vcmVxdWVzdCc7XG5pbXBvcnQge1xuICBNYWlsTGlzdE1lbWJlcnNRdWVyeSxcbiAgSU1haWxMaXN0c01lbWJlcnMsXG4gIENyZWF0ZVVwZGF0ZU1haWxMaXN0TWVtYmVycyxcbiAgTWFpbExpc3RNZW1iZXIsXG4gIE11bHRpcGxlTWVtYmVyc0RhdGEsXG4gIE11bHRpcGxlTWVtYmVyc1JlcURhdGEsXG4gIERlbGV0ZWRNZW1iZXIsXG4gIENyZWF0ZVVwZGF0ZU1haWxMaXN0TWVtYmVyc1JlcSxcbiAgTmV3TXVsdGlwbGVNZW1iZXJzUmVzcG9uc2Vcbn0gZnJvbSAnLi9pbnRlcmZhY2VzL21haWxMaXN0TWVtYmVycyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1haWxMaXN0c01lbWJlcnMgaW1wbGVtZW50cyBJTWFpbExpc3RzTWVtYmVycyB7XG4gIGJhc2VSb3V0ZTogc3RyaW5nO1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuXG4gIGNvbnN0cnVjdG9yKHJlcXVlc3Q6IFJlcXVlc3QpIHtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgIHRoaXMuYmFzZVJvdXRlID0gJy92My9saXN0cyc7XG4gIH1cblxuICBwcml2YXRlIGNoZWNrQW5kVXBkYXRlRGF0YShkYXRhOiBDcmVhdGVVcGRhdGVNYWlsTGlzdE1lbWJlcnMpIHtcbiAgICBjb25zdCBuZXdEYXRhID0geyAuLi5kYXRhIH07XG5cbiAgICBpZiAodHlwZW9mIGRhdGEudmFycyA9PT0gJ29iamVjdCcpIHtcbiAgICAgIG5ld0RhdGEudmFycyA9IEpTT04uc3RyaW5naWZ5KG5ld0RhdGEudmFycyk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBkYXRhLnN1YnNjcmliZWQgPT09ICdib29sZWFuJykge1xuICAgICAgbmV3RGF0YS5zdWJzY3JpYmVkID0gZGF0YS5zdWJzY3JpYmVkID8gJ3llcycgOiAnbm8nO1xuICAgIH1cblxuICAgIHJldHVybiBuZXdEYXRhIGFzIENyZWF0ZVVwZGF0ZU1haWxMaXN0TWVtYmVyc1JlcTtcbiAgfVxuXG4gIGxpc3RNZW1iZXJzKG1haWxMaXN0QWRkcmVzczogc3RyaW5nLCBxdWVyeT86IE1haWxMaXN0TWVtYmVyc1F1ZXJ5KTogUHJvbWlzZTxNYWlsTGlzdE1lbWJlcltdPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQoYCR7dGhpcy5iYXNlUm91dGV9LyR7bWFpbExpc3RBZGRyZXNzfS9tZW1iZXJzL3BhZ2VzYCwgcXVlcnkpXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmJvZHkuaXRlbXMgYXMgTWFpbExpc3RNZW1iZXJbXSk7XG4gIH1cblxuICBnZXRNZW1iZXIobWFpbExpc3RBZGRyZXNzOiBzdHJpbmcsIG1haWxMaXN0TWVtYmVyQWRkcmVzczogc3RyaW5nKTogUHJvbWlzZTxNYWlsTGlzdE1lbWJlcj4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KGAke3RoaXMuYmFzZVJvdXRlfS8ke21haWxMaXN0QWRkcmVzc30vbWVtYmVycy8ke21haWxMaXN0TWVtYmVyQWRkcmVzc31gKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5ib2R5Lm1lbWJlciBhcyBNYWlsTGlzdE1lbWJlcik7XG4gIH1cblxuICBjcmVhdGVNZW1iZXIoXG4gICAgbWFpbExpc3RBZGRyZXNzOiBzdHJpbmcsXG4gICAgZGF0YTogQ3JlYXRlVXBkYXRlTWFpbExpc3RNZW1iZXJzXG4gICk6IFByb21pc2U8TWFpbExpc3RNZW1iZXI+IHtcbiAgICBjb25zdCByZXFEYXRhID0gdGhpcy5jaGVja0FuZFVwZGF0ZURhdGEoZGF0YSk7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKGAke3RoaXMuYmFzZVJvdXRlfS8ke21haWxMaXN0QWRkcmVzc30vbWVtYmVyc2AsIHJlcURhdGEpXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmJvZHkubWVtYmVyIGFzIE1haWxMaXN0TWVtYmVyKTtcbiAgfVxuXG4gIGNyZWF0ZU1lbWJlcnMoXG4gICAgbWFpbExpc3RBZGRyZXNzOiBzdHJpbmcsXG4gICAgZGF0YTogTXVsdGlwbGVNZW1iZXJzRGF0YVxuICApOiBQcm9taXNlPE5ld011bHRpcGxlTWVtYmVyc1Jlc3BvbnNlPiB7XG4gICAgY29uc3QgbmV3RGF0YTogTXVsdGlwbGVNZW1iZXJzUmVxRGF0YSA9IHtcbiAgICAgIG1lbWJlcnM6IEFycmF5LmlzQXJyYXkoZGF0YS5tZW1iZXJzKSA/IEpTT04uc3RyaW5naWZ5KGRhdGEubWVtYmVycykgOiBkYXRhLm1lbWJlcnMsXG4gICAgICB1cHNlcnQ6IGRhdGEudXBzZXJ0XG4gICAgfTtcblxuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucG9zdFdpdGhGRChgJHt0aGlzLmJhc2VSb3V0ZX0vJHttYWlsTGlzdEFkZHJlc3N9L21lbWJlcnMuanNvbmAsIG5ld0RhdGEpXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmJvZHkgYXMgTmV3TXVsdGlwbGVNZW1iZXJzUmVzcG9uc2UpO1xuICB9XG5cbiAgdXBkYXRlTWVtYmVyKFxuICAgIG1haWxMaXN0QWRkcmVzczogc3RyaW5nLFxuICAgIG1haWxMaXN0TWVtYmVyQWRkcmVzczogc3RyaW5nLFxuICAgIGRhdGE6IENyZWF0ZVVwZGF0ZU1haWxMaXN0TWVtYmVyc1xuICApOiBQcm9taXNlPE1haWxMaXN0TWVtYmVyPiB7XG4gICAgY29uc3QgcmVxRGF0YSA9IHRoaXMuY2hlY2tBbmRVcGRhdGVEYXRhKGRhdGEpO1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucHV0V2l0aEZEKGAke3RoaXMuYmFzZVJvdXRlfS8ke21haWxMaXN0QWRkcmVzc30vbWVtYmVycy8ke21haWxMaXN0TWVtYmVyQWRkcmVzc31gLCByZXFEYXRhKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5ib2R5Lm1lbWJlciBhcyBNYWlsTGlzdE1lbWJlcik7XG4gIH1cblxuICBkZXN0cm95TWVtYmVyKG1haWxMaXN0QWRkcmVzczogc3RyaW5nLCBtYWlsTGlzdE1lbWJlckFkZHJlc3M6IHN0cmluZykgOiBQcm9taXNlPERlbGV0ZWRNZW1iZXI+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmRlbGV0ZShgJHt0aGlzLmJhc2VSb3V0ZX0vJHttYWlsTGlzdEFkZHJlc3N9L21lbWJlcnMvJHttYWlsTGlzdE1lbWJlckFkZHJlc3N9YClcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuYm9keSBhcyBEZWxldGVkTWVtYmVyKTtcbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgTWFpbGd1bk1lc3NhZ2VEYXRhLFxuICBNZXNzYWdlc1NlbmRBUElSZXNwb25zZSxcbiAgTWVzc2FnZXNTZW5kUmVzdWx0XG59IGZyb20gJy4vaW50ZXJmYWNlcy9NZXNzYWdlcyc7XG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuL3JlcXVlc3QnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNZXNzYWdlc0NsaWVudCB7XG4gIHJlcXVlc3Q6IFJlcXVlc3Q7XG5cbiAgY29uc3RydWN0b3IocmVxdWVzdDogUmVxdWVzdCkge1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gIH1cblxuICBfcGFyc2VSZXNwb25zZShyZXNwb25zZTogTWVzc2FnZXNTZW5kQVBJUmVzcG9uc2UpOiBNZXNzYWdlc1NlbmRSZXN1bHQge1xuICAgIHJldHVybiB7XG4gICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgIC4uLnJlc3BvbnNlLmJvZHlcbiAgICB9O1xuICB9XG5cbiAgY3JlYXRlKGRvbWFpbjogc3RyaW5nLCBkYXRhOiBNYWlsZ3VuTWVzc2FnZURhdGEpOiBQcm9taXNlPE1lc3NhZ2VzU2VuZFJlc3VsdD4ge1xuICAgIGlmIChkYXRhLm1lc3NhZ2UpIHtcbiAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QucG9zdFdpdGhGRChgL3YzLyR7ZG9tYWlufS9tZXNzYWdlcy5taW1lYCwgZGF0YSlcbiAgICAgICAgLnRoZW4odGhpcy5fcGFyc2VSZXNwb25zZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKGAvdjMvJHtkb21haW59L21lc3NhZ2VzYCwgZGF0YSlcbiAgICAgIC50aGVuKHRoaXMuX3BhcnNlUmVzcG9uc2UpO1xuICB9XG59XG4iLCJpbXBvcnQgQVBJUmVzcG9uc2UgZnJvbSAnLi9pbnRlcmZhY2VzL0FwaVJlc3BvbnNlJztcbmltcG9ydCB7XG4gIENhbmNlbGVkTXVsdGlwbGVWYWxpZGF0aW9uSm9iLFxuICBDcmVhdGVkTXVsdGlwbGVWYWxpZGF0aW9uSm9iLFxuICBJTXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50LFxuICBNdWx0aXBsZVZhbGlkYXRpb25DcmVhdGlvbkRhdGFVcGRhdGVkLFxuICBNdWx0aXBsZVZhbGlkYXRpb25DcmVhdGlvbkRhdGEsXG4gIE11bHRpcGxlVmFsaWRhdGlvbkpvYixcbiAgTXVsdGlwbGVWYWxpZGF0aW9uSm9ic0xpc3RSZXN1bHRcbn1cbiAgZnJvbSAnLi9pbnRlcmZhY2VzL011bHRpcGxlVmFsaWRhdGlvbic7XG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuL3JlcXVlc3QnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNdWx0aXBsZVZhbGlkYXRpb25DbGllbnQgaW1wbGVtZW50cyBJTXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50IHtcbiAgcmVxdWVzdDogUmVxdWVzdDtcblxuICBjb25zdHJ1Y3RvcihyZXF1ZXN0OiBSZXF1ZXN0KSB7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgfVxuXG4gIHByaXZhdGUgaGFuZGxlUmVzcG9uc2U8VD4ocmVzcG9uc2U6IEFQSVJlc3BvbnNlKTogVCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgLi4ucmVzcG9uc2U/LmJvZHlcbiAgICB9O1xuICB9XG5cbiAgYXN5bmMgbGlzdCgpOiBQcm9taXNlPE11bHRpcGxlVmFsaWRhdGlvbkpvYnNMaXN0UmVzdWx0PiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLnJlcXVlc3QuZ2V0KCcvdjQvYWRkcmVzcy92YWxpZGF0ZS9idWxrJyk7XG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVzcG9uc2U8TXVsdGlwbGVWYWxpZGF0aW9uSm9ic0xpc3RSZXN1bHQ+KHJlc3BvbnNlKTtcbiAgfVxuXG4gIGFzeW5jIGdldChsaXN0SWQ6IHN0cmluZyk6IFByb21pc2U8TXVsdGlwbGVWYWxpZGF0aW9uSm9iPiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLnJlcXVlc3QuZ2V0KGAvdjQvYWRkcmVzcy92YWxpZGF0ZS9idWxrLyR7bGlzdElkfWApO1xuICAgIHJldHVybiB7XG4gICAgICByZXNwb25zZVN0YXR1c0NvZGU6IHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgIC4uLnJlc3BvbnNlPy5ib2R5XG4gICAgfTtcbiAgfVxuXG4gIGFzeW5jIGNyZWF0ZShcbiAgICBsaXN0SWQ6IHN0cmluZyxcbiAgICBkYXRhOiBNdWx0aXBsZVZhbGlkYXRpb25DcmVhdGlvbkRhdGFcbiAgKTogUHJvbWlzZTxDcmVhdGVkTXVsdGlwbGVWYWxpZGF0aW9uSm9iPiB7XG4gICAgY29uc3QgbXVsdGlwbGVWYWxpZGF0aW9uRGF0YTogTXVsdGlwbGVWYWxpZGF0aW9uQ3JlYXRpb25EYXRhVXBkYXRlZCA9IHtcbiAgICAgIG11bHRpcGxlVmFsaWRhdGlvbkZpbGU6IHtcbiAgICAgICAgLi4uZGF0YT8uZmlsZVxuICAgICAgfSxcbiAgICAgIC4uLmRhdGFcbiAgICB9O1xuICAgIGRlbGV0ZSBtdWx0aXBsZVZhbGlkYXRpb25EYXRhLmZpbGU7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLnJlcXVlc3QucG9zdFdpdGhGRChgL3Y0L2FkZHJlc3MvdmFsaWRhdGUvYnVsay8ke2xpc3RJZH1gLCBtdWx0aXBsZVZhbGlkYXRpb25EYXRhKTtcbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXNwb25zZTxDcmVhdGVkTXVsdGlwbGVWYWxpZGF0aW9uSm9iPihyZXNwb25zZSk7XG4gIH1cblxuICBhc3luYyBkZXN0cm95KGxpc3RJZDogc3RyaW5nKTogUHJvbWlzZTxDYW5jZWxlZE11bHRpcGxlVmFsaWRhdGlvbkpvYj4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5yZXF1ZXN0LmRlbGV0ZShgL3Y0L2FkZHJlc3MvdmFsaWRhdGUvYnVsay8ke2xpc3RJZH1gKTtcbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXNwb25zZTxDYW5jZWxlZE11bHRpcGxlVmFsaWRhdGlvbkpvYj4ocmVzcG9uc2UpO1xuICB9XG59XG4iLCJpbXBvcnQgKiBhcyBiYXNlNjQgZnJvbSAnYmFzZS02NCc7XG5pbXBvcnQgdXJsam9pbiBmcm9tICd1cmwtam9pbic7XG5pbXBvcnQga3kgZnJvbSAna3ktdW5pdmVyc2FsJztcbmltcG9ydCAqIGFzIE5vZGVGb3JtRGF0YSBmcm9tICdmb3JtLWRhdGEnO1xuaW1wb3J0IEFQSUVycm9yIGZyb20gJy4vZXJyb3InO1xuaW1wb3J0IHsgT25DYWxsRW1wdHlIZWFkZXJzLCBPbkNhbGxSZXF1ZXN0T3B0aW9ucywgUmVxdWVzdE9wdGlvbnMgfSBmcm9tICcuL2ludGVyZmFjZXMvUmVxdWVzdE9wdGlvbnMnO1xuaW1wb3J0IEFQSUVycm9yT3B0aW9ucyBmcm9tICcuL2ludGVyZmFjZXMvQVBJRXJyb3JPcHRpb25zJztcbmltcG9ydCB7IElucHV0Rm9ybURhdGEgfSBmcm9tICcuL2ludGVyZmFjZXMvSUZvcm1EYXRhJztcbmltcG9ydCBBUElSZXNwb25zZSBmcm9tICcuL2ludGVyZmFjZXMvQXBpUmVzcG9uc2UnO1xuaW1wb3J0IEZvcm1EYXRhQnVpbGRlciBmcm9tICcuL2Zvcm1EYXRhQnVpbGRlcic7XG5pbXBvcnQgeyBJcFBvb2xEZWxldGVEYXRhIH0gZnJvbSAnLi9pbnRlcmZhY2VzL0lwUG9vbHMnO1xuXG5jbGFzcyBSZXF1ZXN0IHtcbiAgcHJpdmF0ZSB1c2VybmFtZTogc3RyaW5nO1xuICBwcml2YXRlIGtleTogc3RyaW5nO1xuICBwcml2YXRlIHVybDogc3RyaW5nO1xuICBwcml2YXRlIHRpbWVvdXQ6IG51bWJlcjtcbiAgcHJpdmF0ZSBoZWFkZXJzOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPjtcbiAgcHJpdmF0ZSBmb3JtRGF0YUJ1aWxkZXI6IEZvcm1EYXRhQnVpbGRlcjtcblxuICBjb25zdHJ1Y3RvcihvcHRpb25zOiBSZXF1ZXN0T3B0aW9ucywgZm9ybURhdGE6IElucHV0Rm9ybURhdGEpIHtcbiAgICB0aGlzLnVzZXJuYW1lID0gb3B0aW9ucy51c2VybmFtZTtcbiAgICB0aGlzLmtleSA9IG9wdGlvbnMua2V5O1xuICAgIHRoaXMudXJsID0gb3B0aW9ucy51cmwgYXMgc3RyaW5nO1xuICAgIHRoaXMudGltZW91dCA9IG9wdGlvbnMudGltZW91dDtcbiAgICB0aGlzLmhlYWRlcnMgPSBvcHRpb25zLmhlYWRlcnMgfHwge307XG4gICAgdGhpcy5mb3JtRGF0YUJ1aWxkZXIgPSBuZXcgRm9ybURhdGFCdWlsZGVyKGZvcm1EYXRhKTtcbiAgfVxuXG4gIGFzeW5jIHJlcXVlc3QoXG4gICAgbWV0aG9kOiBzdHJpbmcsXG4gICAgdXJsOiBzdHJpbmcsXG4gICAgb25DYWxsT3B0aW9ucz86IFJlY29yZDxzdHJpbmcsIHVua25vd24gfCBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiA+XG4gICk6IFByb21pc2U8QVBJUmVzcG9uc2U+IHtcbiAgICBjb25zdCBvcHRpb25zOiBPbkNhbGxSZXF1ZXN0T3B0aW9ucyA9IHsgLi4ub25DYWxsT3B0aW9ucyB9O1xuICAgIGNvbnN0IGJhc2ljID0gYmFzZTY0LmVuY29kZShgJHt0aGlzLnVzZXJuYW1lfToke3RoaXMua2V5fWApO1xuICAgIGNvbnN0IG9uQ2FsbEhlYWRlcnMgPSBvcHRpb25zLmhlYWRlcnMgPyBvcHRpb25zLmhlYWRlcnMgOiB7fTtcbiAgICBjb25zdCBoZWFkZXJzOiBIZWFkZXJzSW5pdHwgT25DYWxsRW1wdHlIZWFkZXJzID0ge1xuICAgICAgQXV0aG9yaXphdGlvbjogYEJhc2ljICR7YmFzaWN9YCxcbiAgICAgIC4uLnRoaXMuaGVhZGVycyxcbiAgICAgIC4uLm9uQ2FsbEhlYWRlcnNcbiAgICB9O1xuXG4gICAgZGVsZXRlIG9wdGlvbnM/LmhlYWRlcnM7XG5cbiAgICBjb25zdCBwYXJhbXMgPSB7IC4uLm9wdGlvbnMgfTtcblxuICAgIGlmIChvcHRpb25zPy5xdWVyeSAmJiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvcHRpb25zPy5xdWVyeSkubGVuZ3RoID4gMCkge1xuICAgICAgcGFyYW1zLnNlYXJjaFBhcmFtcyA9IG9wdGlvbnMucXVlcnk7XG4gICAgICBkZWxldGUgcGFyYW1zLnF1ZXJ5O1xuICAgIH1cblxuICAgIGNvbnN0IHJlc3BvbnNlOiBSZXNwb25zZSA9IGF3YWl0IGt5KFxuICAgICAgdXJsam9pbih0aGlzLnVybCwgdXJsKSxcbiAgICAgIHtcbiAgICAgICAgbWV0aG9kOiBtZXRob2QudG9Mb2NhbGVVcHBlckNhc2UoKSxcbiAgICAgICAgaGVhZGVycyxcbiAgICAgICAgdGhyb3dIdHRwRXJyb3JzOiBmYWxzZSxcbiAgICAgICAgdGltZW91dDogdGhpcy50aW1lb3V0LFxuICAgICAgICAuLi5wYXJhbXNcbiAgICAgIH1cbiAgICApO1xuXG4gICAgaWYgKCFyZXNwb25zZT8ub2spIHtcbiAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRoaXMuZ2V0UmVzcG9uc2VCb2R5KHJlc3BvbnNlKTtcblxuICAgICAgdGhyb3cgbmV3IEFQSUVycm9yKHtcbiAgICAgICAgc3RhdHVzOiByZXNwb25zZT8uc3RhdHVzLFxuICAgICAgICBzdGF0dXNUZXh0OiByZXNwb25zZT8uc3RhdHVzVGV4dCxcbiAgICAgICAgYm9keTogcmVzLmJvZHlcbiAgICAgIH0gYXMgQVBJRXJyb3JPcHRpb25zKTtcbiAgICB9XG5cbiAgICBjb25zdCByZXMgPSBhd2FpdCB0aGlzLmdldFJlc3BvbnNlQm9keShyZXNwb25zZSk7XG4gICAgcmV0dXJuIHJlcyBhcyBBUElSZXNwb25zZTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgZ2V0UmVzcG9uc2VCb2R5KHJlc3BvbnNlOiBSZXNwb25zZSk6IFByb21pc2U8QVBJUmVzcG9uc2U+IHtcbiAgICBjb25zdCByZXMgPSB7XG4gICAgICBib2R5OiB7fSxcbiAgICAgIHN0YXR1czogcmVzcG9uc2U/LnN0YXR1c1xuICAgIH0gYXMgQVBJUmVzcG9uc2U7XG4gICAgbGV0IHJlc3BvbnNlU3RyaW5nID0gJyc7XG4gICAgdHJ5IHtcbiAgICAgIHJlc3BvbnNlU3RyaW5nID0gYXdhaXQgcmVzcG9uc2UudGV4dCgpO1xuICAgICAgY29uc3QganNvbkJvZHkgPSBKU09OLnBhcnNlKHJlc3BvbnNlU3RyaW5nKTtcbiAgICAgIHJlcy5ib2R5ID0ganNvbkJvZHk7XG4gICAgICByZXR1cm4gcmVzO1xuICAgIH0gY2F0Y2ggKGVycm9yOiB1bmtub3duKSB7XG4gICAgICByZXMuc3RhdHVzID0gNDAwO1xuICAgICAgcmVzLmJvZHkgPSB7XG4gICAgICAgIG1lc3NhZ2U6IHJlc3BvbnNlU3RyaW5nLFxuICAgICAgfTtcbiAgICAgIHJldHVybiByZXM7XG4gICAgfVxuICB9XG5cbiAgcXVlcnkoXG4gICAgbWV0aG9kOiBzdHJpbmcsXG4gICAgdXJsOiBzdHJpbmcsXG4gICAgcXVlcnk/OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiB8IEFycmF5PEFycmF5PHN0cmluZz4+LFxuICAgIG9wdGlvbnM/OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPlxuICApOiBQcm9taXNlPEFQSVJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChtZXRob2QsIHVybCwgeyBxdWVyeSwgLi4ub3B0aW9ucyB9KTtcbiAgfVxuXG4gIGNvbW1hbmQoXG4gICAgbWV0aG9kOiBzdHJpbmcsXG4gICAgdXJsOiBzdHJpbmcsXG4gICAgZGF0YT86IFJlY29yZDxzdHJpbmcsIHVua25vd24+IHwgc3RyaW5nIHwgTm9kZUZvcm1EYXRhIHwgRm9ybURhdGEsXG4gICAgb3B0aW9ucz86IFJlY29yZDxzdHJpbmcsIHVua25vd24+LFxuICAgIGFkZERlZmF1bHRIZWFkZXJzID0gdHJ1ZVxuICApOiBQcm9taXNlPEFQSVJlc3BvbnNlPiB7XG4gICAgbGV0IGhlYWRlcnMgPSB7fTtcbiAgICBpZiAoYWRkRGVmYXVsdEhlYWRlcnMpIHtcbiAgICAgIGhlYWRlcnMgPSB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyB9O1xuICAgIH1cbiAgICBjb25zdCByZXF1ZXN0T3B0aW9ucyA9IHtcbiAgICAgIC4uLmhlYWRlcnMsXG4gICAgICBib2R5OiBkYXRhLFxuICAgICAgLi4ub3B0aW9uc1xuICAgIH07XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChcbiAgICAgIG1ldGhvZCxcbiAgICAgIHVybCxcbiAgICAgIHJlcXVlc3RPcHRpb25zXG4gICAgKTtcbiAgfVxuXG4gIGdldChcbiAgICB1cmw6IHN0cmluZyxcbiAgICBxdWVyeT86IFJlY29yZDxzdHJpbmcsIHVua25vd24+IHwgQXJyYXk8QXJyYXk8c3RyaW5nPj4sXG4gICAgb3B0aW9ucz86IFJlY29yZDxzdHJpbmcsIHVua25vd24+XG4gICk6IFByb21pc2U8QVBJUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5xdWVyeSgnZ2V0JywgdXJsLCBxdWVyeSwgb3B0aW9ucyk7XG4gIH1cblxuICBwb3N0KFxuICAgIHVybDogc3RyaW5nLFxuICAgIGRhdGE/OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiB8IHN0cmluZyxcbiAgICBvcHRpb25zPzogUmVjb3JkPHN0cmluZywgdW5rbm93bj5cbiAgKTogUHJvbWlzZTxBUElSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLmNvbW1hbmQoJ3Bvc3QnLCB1cmwsIGRhdGEsIG9wdGlvbnMpO1xuICB9XG5cbiAgcG9zdFdpdGhGRChcbiAgICB1cmw6IHN0cmluZyxcbiAgICBkYXRhOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiB8IFJlY29yZDxzdHJpbmcsIHVua25vd24+W11cbiAgKTogUHJvbWlzZTxBUElSZXNwb25zZT4ge1xuICAgIGNvbnN0IGZvcm1EYXRhID0gdGhpcy5mb3JtRGF0YUJ1aWxkZXIuY3JlYXRlRm9ybURhdGEoZGF0YSk7XG4gICAgcmV0dXJuIHRoaXMuY29tbWFuZCgncG9zdCcsIHVybCwgZm9ybURhdGEsIHt9LCBmYWxzZSk7XG4gIH1cblxuICBwdXRXaXRoRkQodXJsOiBzdHJpbmcsIGRhdGE6IFJlY29yZDxzdHJpbmcsIHVua25vd24+KTogUHJvbWlzZTxBUElSZXNwb25zZT4ge1xuICAgIGNvbnN0IGZvcm1EYXRhID0gdGhpcy5mb3JtRGF0YUJ1aWxkZXIuY3JlYXRlRm9ybURhdGEoZGF0YSk7XG4gICAgcmV0dXJuIHRoaXMuY29tbWFuZCgncHV0JywgdXJsLCBmb3JtRGF0YSwge30sIGZhbHNlKTtcbiAgfVxuXG4gIHBhdGNoV2l0aEZEKHVybDogc3RyaW5nLCBkYXRhOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPik6IFByb21pc2U8QVBJUmVzcG9uc2U+IHtcbiAgICBjb25zdCBmb3JtRGF0YSA9IHRoaXMuZm9ybURhdGFCdWlsZGVyLmNyZWF0ZUZvcm1EYXRhKGRhdGEpO1xuICAgIHJldHVybiB0aGlzLmNvbW1hbmQoJ3BhdGNoJywgdXJsLCBmb3JtRGF0YSwge30sIGZhbHNlKTtcbiAgfVxuXG4gIHB1dCh1cmw6IHN0cmluZywgZGF0YT86IFJlY29yZDxzdHJpbmcsIHVua25vd24+IHwgc3RyaW5nLCBvcHRpb25zPzogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pXG4gIDogUHJvbWlzZTxBUElSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLmNvbW1hbmQoJ3B1dCcsIHVybCwgZGF0YSwgb3B0aW9ucyk7XG4gIH1cblxuICBkZWxldGUodXJsOiBzdHJpbmcsIGRhdGE/OiBJcFBvb2xEZWxldGVEYXRhKTogUHJvbWlzZTxBUElSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLmNvbW1hbmQoJ2RlbGV0ZScsIHVybCwgZGF0YSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUmVxdWVzdDtcbiIsImltcG9ydCB7XG4gIENyZWF0ZVVwZGF0ZVJvdXRlRGF0YSwgRGVzdHJveVJvdXRlUmVzcG9uc2UsIFJvdXRlLCBSb3V0ZXNMaXN0UXVlcnksIFVwZGF0ZVJvdXRlUmVzcG9uc2Vcbn0gZnJvbSAnLi9pbnRlcmZhY2VzL3JvdXRlcyc7XG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuL3JlcXVlc3QnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb3V0ZXNDbGllbnQge1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuXG4gIGNvbnN0cnVjdG9yKHJlcXVlc3Q6IFJlcXVlc3QpIHtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICB9XG5cbiAgbGlzdChxdWVyeTogUm91dGVzTGlzdFF1ZXJ5KTogUHJvbWlzZTxSb3V0ZVtdPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQoJy92My9yb3V0ZXMnLCBxdWVyeSlcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuYm9keS5pdGVtcyk7XG4gIH1cblxuICBnZXQoaWQ6IHN0cmluZyk6IFByb21pc2U8Um91dGU+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldChgL3YzL3JvdXRlcy8ke2lkfWApXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmJvZHkucm91dGUpO1xuICB9XG5cbiAgY3JlYXRlKGRhdGE6IENyZWF0ZVVwZGF0ZVJvdXRlRGF0YSk6IFByb21pc2U8Um91dGU+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQoJy92My9yb3V0ZXMnLCBkYXRhKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5ib2R5LnJvdXRlKTtcbiAgfVxuXG4gIHVwZGF0ZShpZDogc3RyaW5nLCBkYXRhOiBDcmVhdGVVcGRhdGVSb3V0ZURhdGEpOiBQcm9taXNlPFVwZGF0ZVJvdXRlUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnB1dFdpdGhGRChgL3YzL3JvdXRlcy8ke2lkfWAsIGRhdGEpXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmJvZHkpO1xuICB9XG5cbiAgZGVzdHJveShpZDogc3RyaW5nKTogUHJvbWlzZTxEZXN0cm95Um91dGVSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZGVsZXRlKGAvdjMvcm91dGVzLyR7aWR9YClcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuYm9keSk7XG4gIH1cbn1cbiIsImltcG9ydCB1cmxqb2luIGZyb20gJ3VybC1qb2luJztcbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4vcmVxdWVzdCc7XG5pbXBvcnQgeyBTdGF0c1F1ZXJ5LCBTdGF0c09wdGlvbnMsIFN0YXQgfSBmcm9tICcuL2ludGVyZmFjZXMvU3RhdHNPcHRpb25zJztcblxuY2xhc3MgU3RhdHMge1xuICBzdGFydDogRGF0ZTtcbiAgZW5kOiBEYXRlO1xuICByZXNvbHV0aW9uOiBzdHJpbmc7XG4gIHN0YXRzOiBTdGF0W107XG5cbiAgY29uc3RydWN0b3IoZGF0YTogU3RhdHNPcHRpb25zKSB7XG4gICAgdGhpcy5zdGFydCA9IG5ldyBEYXRlKGRhdGEuc3RhcnQpO1xuICAgIHRoaXMuZW5kID0gbmV3IERhdGUoZGF0YS5lbmQpO1xuICAgIHRoaXMucmVzb2x1dGlvbiA9IGRhdGEucmVzb2x1dGlvbjtcbiAgICB0aGlzLnN0YXRzID0gZGF0YS5zdGF0cy5tYXAoZnVuY3Rpb24gKHN0YXQ6IFN0YXQpIHtcbiAgICAgIGNvbnN0IHJlcyA9IHsgLi4uc3RhdCB9O1xuICAgICAgcmVzLnRpbWUgPSBuZXcgRGF0ZShzdGF0LnRpbWUpO1xuICAgICAgcmV0dXJuIHJlcztcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdGF0c0NsaWVudCB7XG4gIHJlcXVlc3Q6IFJlcXVlc3Q7XG5cbiAgY29uc3RydWN0b3IocmVxdWVzdDogUmVxdWVzdCkge1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gIH1cblxuICBwcml2YXRlIHByZXBhcmVTZWFyY2hQYXJhbXMocXVlcnk6IFN0YXRzUXVlcnkgfCB1bmRlZmluZWQpOiBBcnJheTxBcnJheTxzdHJpbmc+PiB7XG4gICAgbGV0IHNlYXJjaFBhcmFtcyA9IFtdIGFzIEFycmF5PEFycmF5PHN0cmluZz4+O1xuICAgIGlmICh0eXBlb2YgcXVlcnkgPT09ICdvYmplY3QnICYmIE9iamVjdC5rZXlzKHF1ZXJ5KS5sZW5ndGgpIHtcbiAgICAgIHNlYXJjaFBhcmFtcyA9IE9iamVjdC5lbnRyaWVzKHF1ZXJ5KS5yZWR1Y2UoKGFycmF5V2l0aFBhaXJzLCBjdXJyZW50UGFpcikgPT4ge1xuICAgICAgICBjb25zdCBba2V5LCB2YWx1ZV0gPSBjdXJyZW50UGFpcjtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpICYmIHZhbHVlLmxlbmd0aCkge1xuICAgICAgICAgIGNvbnN0IHJlcGVhdGVkUHJvcGVydHkgPSB2YWx1ZS5tYXAoKGl0ZW0pID0+IFtrZXksIGl0ZW1dKTtcbiAgICAgICAgICByZXR1cm4gWy4uLmFycmF5V2l0aFBhaXJzLCAuLi5yZXBlYXRlZFByb3BlcnR5XTtcbiAgICAgICAgfVxuICAgICAgICBhcnJheVdpdGhQYWlycy5wdXNoKFtrZXksIHZhbHVlXSk7XG4gICAgICAgIHJldHVybiBhcnJheVdpdGhQYWlycztcbiAgICAgIH0sIFtdIGFzIEFycmF5PEFycmF5PHN0cmluZz4+KTtcbiAgICB9XG5cbiAgICByZXR1cm4gc2VhcmNoUGFyYW1zO1xuICB9XG5cbiAgX3BhcnNlU3RhdHMocmVzcG9uc2U6IHsgYm9keTogU3RhdHNPcHRpb25zIH0pOiBTdGF0cyB7XG4gICAgcmV0dXJuIG5ldyBTdGF0cyhyZXNwb25zZS5ib2R5KTtcbiAgfVxuXG4gIGdldERvbWFpbihkb21haW46IHN0cmluZywgcXVlcnk/OiBTdGF0c1F1ZXJ5KTogUHJvbWlzZTxTdGF0cz4ge1xuICAgIGNvbnN0IHNlYXJjaFBhcmFtcyA9IHRoaXMucHJlcGFyZVNlYXJjaFBhcmFtcyhxdWVyeSk7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQodXJsam9pbignL3YzJywgZG9tYWluLCAnc3RhdHMvdG90YWwnKSwgc2VhcmNoUGFyYW1zKVxuICAgICAgLnRoZW4odGhpcy5fcGFyc2VTdGF0cyk7XG4gIH1cblxuICBnZXRBY2NvdW50KHF1ZXJ5PzogU3RhdHNRdWVyeSk6IFByb21pc2U8U3RhdHM+IHtcbiAgICBjb25zdCBzZWFyY2hQYXJhbXMgPSB0aGlzLnByZXBhcmVTZWFyY2hQYXJhbXMocXVlcnkpO1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KCcvdjMvc3RhdHMvdG90YWwnLCBzZWFyY2hQYXJhbXMpXG4gICAgICAudGhlbih0aGlzLl9wYXJzZVN0YXRzKTtcbiAgfVxufVxuIiwiLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG5pbXBvcnQgdXJsam9pbiBmcm9tICd1cmwtam9pbic7XG5cbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4vcmVxdWVzdCc7XG5pbXBvcnQge1xuICBCb3VuY2VEYXRhLFxuICBDb21wbGFpbnREYXRhLFxuICBQYWdlc0xpc3QsXG4gIFBhZ2VzTGlzdEFjY3VtdWxhdG9yLFxuICBQYXJzZWRQYWdlLFxuICBQYXJzZWRQYWdlc0xpc3QsXG4gIFN1cHByZXNzaW9uQ3JlYXRpb25EYXRhLFxuICBTdXBwcmVzc2lvbkNyZWF0aW9uUmVzcG9uc2UsXG4gIFN1cHByZXNzaW9uQ3JlYXRpb25SZXN1bHQsXG4gIFN1cHByZXNzaW9uRGVzdHJveVJlc3BvbnNlLFxuICBTdXBwcmVzc2lvbkRlc3Ryb3lSZXN1bHQsXG4gIFN1cHByZXNzaW9uTGlzdCxcbiAgU3VwcHJlc3Npb25MaXN0UXVlcnksXG4gIFN1cHByZXNzaW9uTGlzdFJlc3BvbnNlLFxuICBTdXBwcmVzc2lvbk1vZGVscyxcbiAgU3VwcHJlc3Npb25SZXNwb25zZSxcbiAgVW5zdWJzY3JpYmVEYXRhLFxuICBXaGl0ZUxpc3REYXRhLFxufSBmcm9tICcuL2ludGVyZmFjZXMvU3VwcmVzc2lvbnMnO1xuaW1wb3J0IEFQSUVycm9yIGZyb20gJy4vZXJyb3InO1xuaW1wb3J0IEFQSUVycm9yT3B0aW9ucyBmcm9tICcuL2ludGVyZmFjZXMvQVBJRXJyb3JPcHRpb25zJztcblxuY29uc3QgY3JlYXRlT3B0aW9ucyA9IHtcbiAgaGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH1cbn07XG5leHBvcnQgY2xhc3MgU3VwcHJlc3Npb24ge1xuICB0eXBlOiBzdHJpbmc7XG4gIGNvbnN0cnVjdG9yKHR5cGU6IFN1cHByZXNzaW9uTW9kZWxzKSB7XG4gICAgdGhpcy50eXBlID0gdHlwZTtcbiAgfVxufVxuZXhwb3J0IGNsYXNzIEJvdW5jZSBleHRlbmRzIFN1cHByZXNzaW9uIHtcbiAgYWRkcmVzczogc3RyaW5nO1xuICBjb2RlOiBudW1iZXI7XG4gIGVycm9yOiBzdHJpbmc7XG4gIGNyZWF0ZWRfYXQ6IERhdGU7XG5cbiAgY29uc3RydWN0b3IoZGF0YTogQm91bmNlRGF0YSkge1xuICAgIHN1cGVyKFN1cHByZXNzaW9uTW9kZWxzLkJPVU5DRVMpO1xuICAgIHRoaXMuYWRkcmVzcyA9IGRhdGEuYWRkcmVzcztcbiAgICB0aGlzLmNvZGUgPSArZGF0YS5jb2RlO1xuICAgIHRoaXMuZXJyb3IgPSBkYXRhLmVycm9yO1xuICAgIHRoaXMuY3JlYXRlZF9hdCA9IG5ldyBEYXRlKGRhdGEuY3JlYXRlZF9hdCk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIENvbXBsYWludCBleHRlbmRzIFN1cHByZXNzaW9uIHtcbiAgYWRkcmVzczogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICBjcmVhdGVkX2F0OiBEYXRlO1xuXG4gIGNvbnN0cnVjdG9yKGRhdGE6IENvbXBsYWludERhdGEpIHtcbiAgICBzdXBlcihTdXBwcmVzc2lvbk1vZGVscy5DT01QTEFJTlRTKTtcbiAgICB0aGlzLmFkZHJlc3MgPSBkYXRhLmFkZHJlc3M7XG4gICAgdGhpcy5jcmVhdGVkX2F0ID0gbmV3IERhdGUoZGF0YS5jcmVhdGVkX2F0KTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgVW5zdWJzY3JpYmUgZXh0ZW5kcyBTdXBwcmVzc2lvbiB7XG4gIGFkZHJlc3M6IHN0cmluZztcbiAgdGFnczogc3RyaW5nW107XG4gIGNyZWF0ZWRfYXQ6IERhdGU7XG5cbiAgY29uc3RydWN0b3IoZGF0YTogVW5zdWJzY3JpYmVEYXRhKSB7XG4gICAgc3VwZXIoU3VwcHJlc3Npb25Nb2RlbHMuVU5TVUJTQ1JJQkVTKTtcbiAgICB0aGlzLmFkZHJlc3MgPSBkYXRhLmFkZHJlc3M7XG4gICAgdGhpcy50YWdzID0gZGF0YS50YWdzO1xuICAgIHRoaXMuY3JlYXRlZF9hdCA9IG5ldyBEYXRlKGRhdGEuY3JlYXRlZF9hdCk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFdoaXRlTGlzdCBleHRlbmRzIFN1cHByZXNzaW9uIHtcbiAgdmFsdWU6IHN0cmluZztcbiAgcmVhc29uOiBzdHJpbmc7XG4gIGNyZWF0ZWRBdDogRGF0ZTtcblxuICBjb25zdHJ1Y3RvcihkYXRhOiBXaGl0ZUxpc3REYXRhKSB7XG4gICAgc3VwZXIoU3VwcHJlc3Npb25Nb2RlbHMuV0hJVEVMSVNUUyk7XG4gICAgdGhpcy52YWx1ZSA9IGRhdGEudmFsdWU7XG4gICAgdGhpcy5yZWFzb24gPSBkYXRhLnJlYXNvbjtcbiAgICB0aGlzLmNyZWF0ZWRBdCA9IG5ldyBEYXRlKGRhdGEuY3JlYXRlZEF0KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdXBwcmVzc2lvbkNsaWVudCB7XG4gIHJlcXVlc3Q6IFJlcXVlc3Q7XG4gIG1vZGVsczogTWFwPHN0cmluZywgYW55PjtcblxuICBjb25zdHJ1Y3RvcihyZXF1ZXN0OiBSZXF1ZXN0KSB7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICB0aGlzLm1vZGVscyA9IG5ldyBNYXAoKTtcbiAgICB0aGlzLm1vZGVscy5zZXQoJ2JvdW5jZXMnLCBCb3VuY2UpO1xuICAgIHRoaXMubW9kZWxzLnNldCgnY29tcGxhaW50cycsIENvbXBsYWludCk7XG4gICAgdGhpcy5tb2RlbHMuc2V0KCd1bnN1YnNjcmliZXMnLCBVbnN1YnNjcmliZSk7XG4gICAgdGhpcy5tb2RlbHMuc2V0KCd3aGl0ZWxpc3RzJywgV2hpdGVMaXN0KTtcbiAgfVxuXG4gIF9wYXJzZVBhZ2UoaWQ6IHN0cmluZywgcGFnZVVybDogc3RyaW5nKSA6IFBhcnNlZFBhZ2Uge1xuICAgIGNvbnN0IHBhcnNlZFVybCA9IG5ldyBVUkwocGFnZVVybCk7XG4gICAgY29uc3QgeyBzZWFyY2hQYXJhbXMgfSA9IHBhcnNlZFVybDtcbiAgICByZXR1cm4ge1xuICAgICAgaWQsXG4gICAgICBwYWdlOiBzZWFyY2hQYXJhbXMuaGFzKCdwYWdlJykgPyBzZWFyY2hQYXJhbXMuZ2V0KCdwYWdlJykgOiB1bmRlZmluZWQsXG4gICAgICBhZGRyZXNzOiBzZWFyY2hQYXJhbXMuaGFzKCdhZGRyZXNzJykgPyBzZWFyY2hQYXJhbXMuZ2V0KCdhZGRyZXNzJykgOiB1bmRlZmluZWQsXG4gICAgICB1cmw6IHBhZ2VVcmxcbiAgICB9O1xuICB9XG5cbiAgX3BhcnNlUGFnZUxpbmtzKHJlc3BvbnNlOiBTdXBwcmVzc2lvbkxpc3RSZXNwb25zZSk6IFBhcnNlZFBhZ2VzTGlzdCB7XG4gICAgY29uc3QgcGFnZXMgPSBPYmplY3QuZW50cmllcyhyZXNwb25zZS5ib2R5LnBhZ2luZyBhcyBQYWdlc0xpc3QpO1xuICAgIHJldHVybiBwYWdlcy5yZWR1Y2UoXG4gICAgICAoYWNjOiBQYWdlc0xpc3RBY2N1bXVsYXRvciwgcGFpcjogW3BhZ2VVcmw6IHN0cmluZywgaWQ6IHN0cmluZ10pID0+IHtcbiAgICAgICAgY29uc3QgaWQgPSBwYWlyWzBdO1xuICAgICAgICBjb25zdCBwYWdlVXJsID0gcGFpclsxXTtcbiAgICAgICAgYWNjW2lkXSA9IHRoaXMuX3BhcnNlUGFnZShpZCwgcGFnZVVybCk7XG4gICAgICAgIHJldHVybiBhY2M7XG4gICAgICB9LCB7fVxuICAgICkgYXMgdW5rbm93biBhcyBQYXJzZWRQYWdlc0xpc3Q7XG4gIH1cblxuICBfcGFyc2VMaXN0KFxuICAgIHJlc3BvbnNlOiBTdXBwcmVzc2lvbkxpc3RSZXNwb25zZSxcbiAgICBNb2RlbDoge1xuICAgICAgbmV3KGRhdGE6IEJvdW5jZURhdGEgfCBDb21wbGFpbnREYXRhIHwgVW5zdWJzY3JpYmVEYXRhIHwgV2hpdGVMaXN0RGF0YSk6XG4gICAgICBCb3VuY2UgfCBDb21wbGFpbnQgfCBVbnN1YnNjcmliZSB8IFdoaXRlTGlzdFxuICAgIH1cbiAgKTogU3VwcHJlc3Npb25MaXN0IHtcbiAgICBjb25zdCBkYXRhID0ge30gYXMgU3VwcHJlc3Npb25MaXN0O1xuICAgIGRhdGEuaXRlbXMgPSByZXNwb25zZS5ib2R5Lml0ZW1zLm1hcCgoaXRlbSkgPT4gbmV3IE1vZGVsKGl0ZW0pKTtcblxuICAgIGRhdGEucGFnZXMgPSB0aGlzLl9wYXJzZVBhZ2VMaW5rcyhyZXNwb25zZSk7XG5cbiAgICByZXR1cm4gZGF0YTtcbiAgfVxuXG4gIF9wYXJzZUl0ZW08VCBleHRlbmRzIFN1cHByZXNzaW9uPihcbiAgICBkYXRhIDogQm91bmNlRGF0YSB8IENvbXBsYWludERhdGEgfCBVbnN1YnNjcmliZURhdGEgfCBXaGl0ZUxpc3REYXRhLFxuICAgIE1vZGVsOiB7XG4gICAgICBuZXcoZGF0YTogQm91bmNlRGF0YSB8IENvbXBsYWludERhdGEgfCBVbnN1YnNjcmliZURhdGEgfCBXaGl0ZUxpc3REYXRhKTpcbiAgICAgIFRcbiAgICB9XG4gICk6IFQge1xuICAgIHJldHVybiBuZXcgTW9kZWwoZGF0YSk7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZVdoaXRlTGlzdChcbiAgICBkb21haW46IHN0cmluZyxcbiAgICBkYXRhOiBTdXBwcmVzc2lvbkNyZWF0aW9uRGF0YSB8IFN1cHByZXNzaW9uQ3JlYXRpb25EYXRhW11cbiAgKTogUHJvbWlzZTxTdXBwcmVzc2lvbkNyZWF0aW9uUmVzdWx0PiB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoZGF0YSkpIHtcbiAgICAgIHRocm93IG5ldyBBUElFcnJvcih7XG4gICAgICAgIHN0YXR1czogNDAwLFxuICAgICAgICBzdGF0dXNUZXh0OiAnRGF0YSBwcm9wZXJ0eSBzaG91bGQgYmUgYW4gb2JqZWN0JyxcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIG1lc3NhZ2U6ICdXaGl0ZWxpc3RcXCdzIGNyZWF0aW9uIHByb2Nlc3MgZG9lcyBub3Qgc3VwcG9ydCBtdWx0aXBsZSBjcmVhdGlvbnMuIERhdGEgcHJvcGVydHkgc2hvdWxkIGJlIGFuIG9iamVjdCdcbiAgICAgICAgfVxuICAgICAgfSBhcyBBUElFcnJvck9wdGlvbnMpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0XG4gICAgICAucG9zdFdpdGhGRCh1cmxqb2luKCd2MycsIGRvbWFpbiwgJ3doaXRlbGlzdHMnKSwgZGF0YSlcbiAgICAgIC50aGVuKHRoaXMucHJlcGFyZVJlc3BvbnNlKTtcbiAgfVxuXG4gIHByaXZhdGUgY2hlY2tUeXBlKHR5cGU6IHN0cmluZykge1xuICAgIGlmICghdGhpcy5tb2RlbHMuaGFzKHR5cGUpKSB7XG4gICAgICB0aHJvdyBuZXcgQVBJRXJyb3Ioe1xuICAgICAgICBzdGF0dXM6IDQwMCxcbiAgICAgICAgc3RhdHVzVGV4dDogJ1Vua25vd24gdHlwZSB2YWx1ZScsXG4gICAgICAgIGJvZHk6IHsgbWVzc2FnZTogJ1R5cGUgbWF5IGJlIG9ubHkgb25lIG9mIFtib3VuY2VzLCBjb21wbGFpbnRzLCB1bnN1YnNjcmliZXMsIHdoaXRlbGlzdHNdJyB9XG4gICAgICB9IGFzIEFQSUVycm9yT3B0aW9ucyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBwcmVwYXJlUmVzcG9uc2UocmVzcG9uc2U6IFN1cHByZXNzaW9uQ3JlYXRpb25SZXNwb25zZSk6IFN1cHByZXNzaW9uQ3JlYXRpb25SZXN1bHQge1xuICAgIHJldHVybiB7XG4gICAgICBtZXNzYWdlOiByZXNwb25zZS5ib2R5Lm1lc3NhZ2UsXG4gICAgICB0eXBlOiByZXNwb25zZS5ib2R5LnR5cGUgfHwgJycsXG4gICAgICB2YWx1ZTogcmVzcG9uc2UuYm9keS52YWx1ZSB8fCAnJyxcbiAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzXG4gICAgfTtcbiAgfVxuXG4gIGxpc3QoXG4gICAgZG9tYWluOiBzdHJpbmcsXG4gICAgdHlwZTogc3RyaW5nLFxuICAgIHF1ZXJ5PzogU3VwcHJlc3Npb25MaXN0UXVlcnlcbiAgKTogUHJvbWlzZTxTdXBwcmVzc2lvbkxpc3Q+IHtcbiAgICB0aGlzLmNoZWNrVHlwZSh0eXBlKTtcblxuICAgIGNvbnN0IG1vZGVsID0gdGhpcy5tb2RlbHMuZ2V0KHR5cGUpO1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3RcbiAgICAgIC5nZXQodXJsam9pbigndjMnLCBkb21haW4sIHR5cGUpLCBxdWVyeSlcbiAgICAgIC50aGVuKChyZXNwb25zZTogU3VwcHJlc3Npb25MaXN0UmVzcG9uc2UpID0+IHRoaXMuX3BhcnNlTGlzdChyZXNwb25zZSwgbW9kZWwpKTtcbiAgfVxuXG4gIGdldChcbiAgICBkb21haW46IHN0cmluZyxcbiAgICB0eXBlOiBzdHJpbmcsXG4gICAgYWRkcmVzczogc3RyaW5nXG4gICk6IFByb21pc2U8Qm91bmNlIHwgQ29tcGxhaW50IHwgVW5zdWJzY3JpYmUgfCBXaGl0ZUxpc3Q+IHtcbiAgICB0aGlzLmNoZWNrVHlwZSh0eXBlKTtcblxuICAgIGNvbnN0IG1vZGVsID0gdGhpcy5tb2RlbHMuZ2V0KHR5cGUpO1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3RcbiAgICAgIC5nZXQodXJsam9pbigndjMnLCBkb21haW4sIHR5cGUsIGVuY29kZVVSSUNvbXBvbmVudChhZGRyZXNzKSkpXG4gICAgICAudGhlbigocmVzcG9uc2U6IFN1cHByZXNzaW9uUmVzcG9uc2UpID0+IHRoaXMuX3BhcnNlSXRlbTx0eXBlb2YgbW9kZWw+KHJlc3BvbnNlLmJvZHksIG1vZGVsKSk7XG4gIH1cblxuICBjcmVhdGUoXG4gICAgZG9tYWluOiBzdHJpbmcsXG4gICAgdHlwZTogc3RyaW5nLFxuICAgIGRhdGE6IFN1cHByZXNzaW9uQ3JlYXRpb25EYXRhIHwgU3VwcHJlc3Npb25DcmVhdGlvbkRhdGFbXVxuICApOiBQcm9taXNlPFN1cHByZXNzaW9uQ3JlYXRpb25SZXN1bHQ+IHtcbiAgICB0aGlzLmNoZWNrVHlwZSh0eXBlKTtcbiAgICAvLyBzdXBwb3J0cyBhZGRpbmcgbXVsdGlwbGUgc3VwcHJlc3Npb25zIGJ5IGRlZmF1bHRcbiAgICBsZXQgcG9zdERhdGE7XG4gICAgaWYgKHR5cGUgPT09ICd3aGl0ZWxpc3RzJykge1xuICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlV2hpdGVMaXN0KGRvbWFpbiwgZGF0YSk7XG4gICAgfVxuXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGRhdGEpKSB7XG4gICAgICBwb3N0RGF0YSA9IFtkYXRhXTtcbiAgICB9IGVsc2Uge1xuICAgICAgcG9zdERhdGEgPSBbLi4uZGF0YV07XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdFxuICAgICAgLnBvc3QodXJsam9pbigndjMnLCBkb21haW4sIHR5cGUpLCBKU09OLnN0cmluZ2lmeShwb3N0RGF0YSksIGNyZWF0ZU9wdGlvbnMpXG4gICAgICAudGhlbih0aGlzLnByZXBhcmVSZXNwb25zZSk7XG4gIH1cblxuICBkZXN0cm95KFxuICAgIGRvbWFpbjogc3RyaW5nLFxuICAgIHR5cGU6IHN0cmluZyxcbiAgICBhZGRyZXNzOiBzdHJpbmdcbiAgKTogUHJvbWlzZTxTdXBwcmVzc2lvbkRlc3Ryb3lSZXN1bHQ+IHtcbiAgICB0aGlzLmNoZWNrVHlwZSh0eXBlKTtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0XG4gICAgICAuZGVsZXRlKHVybGpvaW4oJ3YzJywgZG9tYWluLCB0eXBlLCBlbmNvZGVVUklDb21wb25lbnQoYWRkcmVzcykpKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlOiBTdXBwcmVzc2lvbkRlc3Ryb3lSZXNwb25zZSkgPT4gKHtcbiAgICAgICAgbWVzc2FnZTogcmVzcG9uc2UuYm9keS5tZXNzYWdlLFxuICAgICAgICB2YWx1ZTogcmVzcG9uc2UuYm9keS52YWx1ZSB8fCAnJyxcbiAgICAgICAgYWRkcmVzczogcmVzcG9uc2UuYm9keS5hZGRyZXNzIHx8ICcnLFxuICAgICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1c1xuICAgICAgfSkpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gU3VwcHJlc3Npb25DbGllbnQ7XG4iLCJpbXBvcnQgeyBJTXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50IH0gZnJvbSAnLi9pbnRlcmZhY2VzL011bHRpcGxlVmFsaWRhdGlvbic7XG5pbXBvcnQgeyBWYWxpZGF0aW9uUmVzdWx0LCBWYWxpZGF0aW9uUmVzcG9uc2UsIFZhbGlkYXRpb25RdWVyeSB9IGZyb20gJy4vaW50ZXJmYWNlcy9WYWxpZGF0ZSc7XG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuL3JlcXVlc3QnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWYWxpZGF0ZUNsaWVudCB7XG4gIHB1YmxpYyBtdWx0aXBsZVZhbGlkYXRpb247XG4gIHJlcXVlc3Q6IFJlcXVlc3Q7XG5cbiAgY29uc3RydWN0b3IocmVxdWVzdDogUmVxdWVzdCwgbXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50OiBJTXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50KSB7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICB0aGlzLm11bHRpcGxlVmFsaWRhdGlvbiA9IG11bHRpcGxlVmFsaWRhdGlvbkNsaWVudDtcbiAgfVxuXG4gIGFzeW5jIGdldChhZGRyZXNzOiBzdHJpbmcpOiBQcm9taXNlPFZhbGlkYXRpb25SZXN1bHQ+IHtcbiAgICBjb25zdCBxdWVyeTogVmFsaWRhdGlvblF1ZXJ5ID0geyBhZGRyZXNzIH07XG4gICAgY29uc3QgcmVzdWx0OiBWYWxpZGF0aW9uUmVzcG9uc2UgPSBhd2FpdCB0aGlzLnJlcXVlc3QuZ2V0KCcvdjQvYWRkcmVzcy92YWxpZGF0ZScsIHF1ZXJ5KTtcbiAgICByZXR1cm4gcmVzdWx0LmJvZHkgYXMgVmFsaWRhdGlvblJlc3VsdDtcbiAgfVxufVxuIiwiaW1wb3J0IHVybGpvaW4gZnJvbSAndXJsLWpvaW4nO1xuXG5pbXBvcnQge1xuICBWYWxpZGF0aW9uUmVzcG9uc2UsXG4gIFdlYmhvb2tMaXN0LFxuICBXZWJob29rUmVzcG9uc2UsXG4gIFdlYmhvb2tzSWRzLFxuICBXZWJob29rc1F1ZXJ5XG59IGZyb20gJy4vaW50ZXJmYWNlcy9XZWJob29rcyc7XG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuL3JlcXVlc3QnO1xuXG5jbGFzcyBXZWJob29rIHtcbiAgaWQ6IHN0cmluZztcbiAgdXJsOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgY29uc3RydWN0b3IoaWQ6IHN0cmluZywgdXJsOiBzdHJpbmcgfCB1bmRlZmluZWQpIHtcbiAgICB0aGlzLmlkID0gaWQ7XG4gICAgdGhpcy51cmwgPSB1cmw7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2ViaG9va0NsaWVudCB7XG4gIHJlcXVlc3Q6IFJlcXVlc3Q7XG5cbiAgY29uc3RydWN0b3IocmVxdWVzdDogUmVxdWVzdCkge1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gIH1cblxuICBfcGFyc2VXZWJob29rTGlzdChyZXNwb25zZTogeyBib2R5OiB7IHdlYmhvb2tzOiBXZWJob29rTGlzdCB9IH0pOiBXZWJob29rTGlzdCB7XG4gICAgcmV0dXJuIHJlc3BvbnNlLmJvZHkud2ViaG9va3M7XG4gIH1cblxuICBfcGFyc2VXZWJob29rV2l0aElEKGlkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHJlc3BvbnNlOiBXZWJob29rUmVzcG9uc2UpOiBXZWJob29rIHtcbiAgICAgIGNvbnN0IHdlYmhvb2tSZXNwb25zZSA9IHJlc3BvbnNlPy5ib2R5Py53ZWJob29rO1xuICAgICAgbGV0IHVybCA9IHdlYmhvb2tSZXNwb25zZT8udXJsO1xuICAgICAgaWYgKCF1cmwpIHtcbiAgICAgICAgdXJsID0gd2ViaG9va1Jlc3BvbnNlPy51cmxzICYmIHdlYmhvb2tSZXNwb25zZS51cmxzLmxlbmd0aFxuICAgICAgICAgID8gd2ViaG9va1Jlc3BvbnNlLnVybHNbMF1cbiAgICAgICAgICA6IHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBuZXcgV2ViaG9vayhpZCwgdXJsKTtcbiAgICB9O1xuICB9XG5cbiAgX3BhcnNlV2ViaG9va1Rlc3QocmVzcG9uc2U6IHsgYm9keTogeyBjb2RlOiBudW1iZXIsIG1lc3NhZ2U6IHN0cmluZyB9IH0pXG4gIDoge2NvZGU6IG51bWJlciwgbWVzc2FnZTpzdHJpbmd9IHtcbiAgICByZXR1cm4geyBjb2RlOiByZXNwb25zZS5ib2R5LmNvZGUsIG1lc3NhZ2U6IHJlc3BvbnNlLmJvZHkubWVzc2FnZSB9IGFzIFZhbGlkYXRpb25SZXNwb25zZTtcbiAgfVxuXG4gIGxpc3QoZG9tYWluOiBzdHJpbmcsIHF1ZXJ5OiBXZWJob29rc1F1ZXJ5KTogUHJvbWlzZTxXZWJob29rTGlzdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KHVybGpvaW4oJy92My9kb21haW5zJywgZG9tYWluLCAnd2ViaG9va3MnKSwgcXVlcnkpXG4gICAgICAudGhlbih0aGlzLl9wYXJzZVdlYmhvb2tMaXN0KTtcbiAgfVxuXG4gIGdldChkb21haW46IHN0cmluZywgaWQ6IFdlYmhvb2tzSWRzKTogUHJvbWlzZTxXZWJob29rPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQodXJsam9pbignL3YzL2RvbWFpbnMnLCBkb21haW4sICd3ZWJob29rcycsIGlkKSlcbiAgICAgIC50aGVuKHRoaXMuX3BhcnNlV2ViaG9va1dpdGhJRChpZCkpO1xuICB9XG5cbiAgY3JlYXRlKGRvbWFpbjogc3RyaW5nLFxuICAgIGlkOiBzdHJpbmcsXG4gICAgdXJsOiBzdHJpbmcsXG4gICAgdGVzdCA9IGZhbHNlKTogUHJvbWlzZTxXZWJob29rIHwgVmFsaWRhdGlvblJlc3BvbnNlPiB7XG4gICAgaWYgKHRlc3QpIHtcbiAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QucHV0V2l0aEZEKHVybGpvaW4oJy92My9kb21haW5zJywgZG9tYWluLCAnd2ViaG9va3MnLCBpZCwgJ3Rlc3QnKSwgeyB1cmwgfSlcbiAgICAgICAgLnRoZW4odGhpcy5fcGFyc2VXZWJob29rVGVzdCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKHVybGpvaW4oJy92My9kb21haW5zJywgZG9tYWluLCAnd2ViaG9va3MnKSwgeyBpZCwgdXJsIH0pXG4gICAgICAudGhlbih0aGlzLl9wYXJzZVdlYmhvb2tXaXRoSUQoaWQpKTtcbiAgfVxuXG4gIHVwZGF0ZShkb21haW46IHN0cmluZywgaWQ6IHN0cmluZywgdXJsOiBzdHJpbmcpOiBQcm9taXNlPFdlYmhvb2s+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnB1dFdpdGhGRCh1cmxqb2luKCcvdjMvZG9tYWlucycsIGRvbWFpbiwgJ3dlYmhvb2tzJywgaWQpLCB7IHVybCB9KVxuICAgICAgLnRoZW4odGhpcy5fcGFyc2VXZWJob29rV2l0aElEKGlkKSk7XG4gIH1cblxuICBkZXN0cm95KGRvbWFpbjogc3RyaW5nLCBpZDogc3RyaW5nKSA6IFByb21pc2U8V2ViaG9vaz4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZGVsZXRlKHVybGpvaW4oJy92My9kb21haW5zJywgZG9tYWluLCAnd2ViaG9va3MnLCBpZCkpXG4gICAgICAudGhlbih0aGlzLl9wYXJzZVdlYmhvb2tXaXRoSUQoaWQpKTtcbiAgfVxufVxuIiwiLyohIGh0dHBzOi8vbXRocy5iZS9iYXNlNjQgdjEuMC4wIGJ5IEBtYXRoaWFzIHwgTUlUIGxpY2Vuc2UgKi9cbjsoZnVuY3Rpb24ocm9vdCkge1xuXG5cdC8vIERldGVjdCBmcmVlIHZhcmlhYmxlcyBgZXhwb3J0c2AuXG5cdHZhciBmcmVlRXhwb3J0cyA9IHR5cGVvZiBleHBvcnRzID09ICdvYmplY3QnICYmIGV4cG9ydHM7XG5cblx0Ly8gRGV0ZWN0IGZyZWUgdmFyaWFibGUgYG1vZHVsZWAuXG5cdHZhciBmcmVlTW9kdWxlID0gdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUgJiZcblx0XHRtb2R1bGUuZXhwb3J0cyA9PSBmcmVlRXhwb3J0cyAmJiBtb2R1bGU7XG5cblx0Ly8gRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGdsb2JhbGAsIGZyb20gTm9kZS5qcyBvciBCcm93c2VyaWZpZWQgY29kZSwgYW5kIHVzZVxuXHQvLyBpdCBhcyBgcm9vdGAuXG5cdHZhciBmcmVlR2xvYmFsID0gdHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWw7XG5cdGlmIChmcmVlR2xvYmFsLmdsb2JhbCA9PT0gZnJlZUdsb2JhbCB8fCBmcmVlR2xvYmFsLndpbmRvdyA9PT0gZnJlZUdsb2JhbCkge1xuXHRcdHJvb3QgPSBmcmVlR2xvYmFsO1xuXHR9XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0dmFyIEludmFsaWRDaGFyYWN0ZXJFcnJvciA9IGZ1bmN0aW9uKG1lc3NhZ2UpIHtcblx0XHR0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuXHR9O1xuXHRJbnZhbGlkQ2hhcmFjdGVyRXJyb3IucHJvdG90eXBlID0gbmV3IEVycm9yO1xuXHRJbnZhbGlkQ2hhcmFjdGVyRXJyb3IucHJvdG90eXBlLm5hbWUgPSAnSW52YWxpZENoYXJhY3RlckVycm9yJztcblxuXHR2YXIgZXJyb3IgPSBmdW5jdGlvbihtZXNzYWdlKSB7XG5cdFx0Ly8gTm90ZTogdGhlIGVycm9yIG1lc3NhZ2VzIHVzZWQgdGhyb3VnaG91dCB0aGlzIGZpbGUgbWF0Y2ggdGhvc2UgdXNlZCBieVxuXHRcdC8vIHRoZSBuYXRpdmUgYGF0b2JgL2BidG9hYCBpbXBsZW1lbnRhdGlvbiBpbiBDaHJvbWl1bS5cblx0XHR0aHJvdyBuZXcgSW52YWxpZENoYXJhY3RlckVycm9yKG1lc3NhZ2UpO1xuXHR9O1xuXG5cdHZhciBUQUJMRSA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvJztcblx0Ly8gaHR0cDovL3doYXR3Zy5vcmcvaHRtbC9jb21tb24tbWljcm9zeW50YXhlcy5odG1sI3NwYWNlLWNoYXJhY3RlclxuXHR2YXIgUkVHRVhfU1BBQ0VfQ0hBUkFDVEVSUyA9IC9bXFx0XFxuXFxmXFxyIF0vZztcblxuXHQvLyBgZGVjb2RlYCBpcyBkZXNpZ25lZCB0byBiZSBmdWxseSBjb21wYXRpYmxlIHdpdGggYGF0b2JgIGFzIGRlc2NyaWJlZCBpbiB0aGVcblx0Ly8gSFRNTCBTdGFuZGFyZC4gaHR0cDovL3doYXR3Zy5vcmcvaHRtbC93ZWJhcHBhcGlzLmh0bWwjZG9tLXdpbmRvd2Jhc2U2NC1hdG9iXG5cdC8vIFRoZSBvcHRpbWl6ZWQgYmFzZTY0LWRlY29kaW5nIGFsZ29yaXRobSB1c2VkIGlzIGJhc2VkIG9uIEBhdGvigJlzIGV4Y2VsbGVudFxuXHQvLyBpbXBsZW1lbnRhdGlvbi4gaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vYXRrLzEwMjAzOTZcblx0dmFyIGRlY29kZSA9IGZ1bmN0aW9uKGlucHV0KSB7XG5cdFx0aW5wdXQgPSBTdHJpbmcoaW5wdXQpXG5cdFx0XHQucmVwbGFjZShSRUdFWF9TUEFDRV9DSEFSQUNURVJTLCAnJyk7XG5cdFx0dmFyIGxlbmd0aCA9IGlucHV0Lmxlbmd0aDtcblx0XHRpZiAobGVuZ3RoICUgNCA9PSAwKSB7XG5cdFx0XHRpbnB1dCA9IGlucHV0LnJlcGxhY2UoLz09PyQvLCAnJyk7XG5cdFx0XHRsZW5ndGggPSBpbnB1dC5sZW5ndGg7XG5cdFx0fVxuXHRcdGlmIChcblx0XHRcdGxlbmd0aCAlIDQgPT0gMSB8fFxuXHRcdFx0Ly8gaHR0cDovL3doYXR3Zy5vcmcvQyNhbHBoYW51bWVyaWMtYXNjaWktY2hhcmFjdGVyc1xuXHRcdFx0L1teK2EtekEtWjAtOS9dLy50ZXN0KGlucHV0KVxuXHRcdCkge1xuXHRcdFx0ZXJyb3IoXG5cdFx0XHRcdCdJbnZhbGlkIGNoYXJhY3RlcjogdGhlIHN0cmluZyB0byBiZSBkZWNvZGVkIGlzIG5vdCBjb3JyZWN0bHkgZW5jb2RlZC4nXG5cdFx0XHQpO1xuXHRcdH1cblx0XHR2YXIgYml0Q291bnRlciA9IDA7XG5cdFx0dmFyIGJpdFN0b3JhZ2U7XG5cdFx0dmFyIGJ1ZmZlcjtcblx0XHR2YXIgb3V0cHV0ID0gJyc7XG5cdFx0dmFyIHBvc2l0aW9uID0gLTE7XG5cdFx0d2hpbGUgKCsrcG9zaXRpb24gPCBsZW5ndGgpIHtcblx0XHRcdGJ1ZmZlciA9IFRBQkxFLmluZGV4T2YoaW5wdXQuY2hhckF0KHBvc2l0aW9uKSk7XG5cdFx0XHRiaXRTdG9yYWdlID0gYml0Q291bnRlciAlIDQgPyBiaXRTdG9yYWdlICogNjQgKyBidWZmZXIgOiBidWZmZXI7XG5cdFx0XHQvLyBVbmxlc3MgdGhpcyBpcyB0aGUgZmlyc3Qgb2YgYSBncm91cCBvZiA0IGNoYXJhY3RlcnPigKZcblx0XHRcdGlmIChiaXRDb3VudGVyKysgJSA0KSB7XG5cdFx0XHRcdC8vIOKApmNvbnZlcnQgdGhlIGZpcnN0IDggYml0cyB0byBhIHNpbmdsZSBBU0NJSSBjaGFyYWN0ZXIuXG5cdFx0XHRcdG91dHB1dCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKFxuXHRcdFx0XHRcdDB4RkYgJiBiaXRTdG9yYWdlID4+ICgtMiAqIGJpdENvdW50ZXIgJiA2KVxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gb3V0cHV0O1xuXHR9O1xuXG5cdC8vIGBlbmNvZGVgIGlzIGRlc2lnbmVkIHRvIGJlIGZ1bGx5IGNvbXBhdGlibGUgd2l0aCBgYnRvYWAgYXMgZGVzY3JpYmVkIGluIHRoZVxuXHQvLyBIVE1MIFN0YW5kYXJkOiBodHRwOi8vd2hhdHdnLm9yZy9odG1sL3dlYmFwcGFwaXMuaHRtbCNkb20td2luZG93YmFzZTY0LWJ0b2Fcblx0dmFyIGVuY29kZSA9IGZ1bmN0aW9uKGlucHV0KSB7XG5cdFx0aW5wdXQgPSBTdHJpbmcoaW5wdXQpO1xuXHRcdGlmICgvW15cXDAtXFx4RkZdLy50ZXN0KGlucHV0KSkge1xuXHRcdFx0Ly8gTm90ZTogbm8gbmVlZCB0byBzcGVjaWFsLWNhc2UgYXN0cmFsIHN5bWJvbHMgaGVyZSwgYXMgc3Vycm9nYXRlcyBhcmVcblx0XHRcdC8vIG1hdGNoZWQsIGFuZCB0aGUgaW5wdXQgaXMgc3VwcG9zZWQgdG8gb25seSBjb250YWluIEFTQ0lJIGFueXdheS5cblx0XHRcdGVycm9yKFxuXHRcdFx0XHQnVGhlIHN0cmluZyB0byBiZSBlbmNvZGVkIGNvbnRhaW5zIGNoYXJhY3RlcnMgb3V0c2lkZSBvZiB0aGUgJyArXG5cdFx0XHRcdCdMYXRpbjEgcmFuZ2UuJ1xuXHRcdFx0KTtcblx0XHR9XG5cdFx0dmFyIHBhZGRpbmcgPSBpbnB1dC5sZW5ndGggJSAzO1xuXHRcdHZhciBvdXRwdXQgPSAnJztcblx0XHR2YXIgcG9zaXRpb24gPSAtMTtcblx0XHR2YXIgYTtcblx0XHR2YXIgYjtcblx0XHR2YXIgYztcblx0XHR2YXIgYnVmZmVyO1xuXHRcdC8vIE1ha2Ugc3VyZSBhbnkgcGFkZGluZyBpcyBoYW5kbGVkIG91dHNpZGUgb2YgdGhlIGxvb3AuXG5cdFx0dmFyIGxlbmd0aCA9IGlucHV0Lmxlbmd0aCAtIHBhZGRpbmc7XG5cblx0XHR3aGlsZSAoKytwb3NpdGlvbiA8IGxlbmd0aCkge1xuXHRcdFx0Ly8gUmVhZCB0aHJlZSBieXRlcywgaS5lLiAyNCBiaXRzLlxuXHRcdFx0YSA9IGlucHV0LmNoYXJDb2RlQXQocG9zaXRpb24pIDw8IDE2O1xuXHRcdFx0YiA9IGlucHV0LmNoYXJDb2RlQXQoKytwb3NpdGlvbikgPDwgODtcblx0XHRcdGMgPSBpbnB1dC5jaGFyQ29kZUF0KCsrcG9zaXRpb24pO1xuXHRcdFx0YnVmZmVyID0gYSArIGIgKyBjO1xuXHRcdFx0Ly8gVHVybiB0aGUgMjQgYml0cyBpbnRvIGZvdXIgY2h1bmtzIG9mIDYgYml0cyBlYWNoLCBhbmQgYXBwZW5kIHRoZVxuXHRcdFx0Ly8gbWF0Y2hpbmcgY2hhcmFjdGVyIGZvciBlYWNoIG9mIHRoZW0gdG8gdGhlIG91dHB1dC5cblx0XHRcdG91dHB1dCArPSAoXG5cdFx0XHRcdFRBQkxFLmNoYXJBdChidWZmZXIgPj4gMTggJiAweDNGKSArXG5cdFx0XHRcdFRBQkxFLmNoYXJBdChidWZmZXIgPj4gMTIgJiAweDNGKSArXG5cdFx0XHRcdFRBQkxFLmNoYXJBdChidWZmZXIgPj4gNiAmIDB4M0YpICtcblx0XHRcdFx0VEFCTEUuY2hhckF0KGJ1ZmZlciAmIDB4M0YpXG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdGlmIChwYWRkaW5nID09IDIpIHtcblx0XHRcdGEgPSBpbnB1dC5jaGFyQ29kZUF0KHBvc2l0aW9uKSA8PCA4O1xuXHRcdFx0YiA9IGlucHV0LmNoYXJDb2RlQXQoKytwb3NpdGlvbik7XG5cdFx0XHRidWZmZXIgPSBhICsgYjtcblx0XHRcdG91dHB1dCArPSAoXG5cdFx0XHRcdFRBQkxFLmNoYXJBdChidWZmZXIgPj4gMTApICtcblx0XHRcdFx0VEFCTEUuY2hhckF0KChidWZmZXIgPj4gNCkgJiAweDNGKSArXG5cdFx0XHRcdFRBQkxFLmNoYXJBdCgoYnVmZmVyIDw8IDIpICYgMHgzRikgK1xuXHRcdFx0XHQnPSdcblx0XHRcdCk7XG5cdFx0fSBlbHNlIGlmIChwYWRkaW5nID09IDEpIHtcblx0XHRcdGJ1ZmZlciA9IGlucHV0LmNoYXJDb2RlQXQocG9zaXRpb24pO1xuXHRcdFx0b3V0cHV0ICs9IChcblx0XHRcdFx0VEFCTEUuY2hhckF0KGJ1ZmZlciA+PiAyKSArXG5cdFx0XHRcdFRBQkxFLmNoYXJBdCgoYnVmZmVyIDw8IDQpICYgMHgzRikgK1xuXHRcdFx0XHQnPT0nXG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdHJldHVybiBvdXRwdXQ7XG5cdH07XG5cblx0dmFyIGJhc2U2NCA9IHtcblx0XHQnZW5jb2RlJzogZW5jb2RlLFxuXHRcdCdkZWNvZGUnOiBkZWNvZGUsXG5cdFx0J3ZlcnNpb24nOiAnMS4wLjAnXG5cdH07XG5cblx0Ly8gU29tZSBBTUQgYnVpbGQgb3B0aW1pemVycywgbGlrZSByLmpzLCBjaGVjayBmb3Igc3BlY2lmaWMgY29uZGl0aW9uIHBhdHRlcm5zXG5cdC8vIGxpa2UgdGhlIGZvbGxvd2luZzpcblx0aWYgKFxuXHRcdHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJlxuXHRcdHR5cGVvZiBkZWZpbmUuYW1kID09ICdvYmplY3QnICYmXG5cdFx0ZGVmaW5lLmFtZFxuXHQpIHtcblx0XHRkZWZpbmUoZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gYmFzZTY0O1xuXHRcdH0pO1xuXHR9XHRlbHNlIGlmIChmcmVlRXhwb3J0cyAmJiAhZnJlZUV4cG9ydHMubm9kZVR5cGUpIHtcblx0XHRpZiAoZnJlZU1vZHVsZSkgeyAvLyBpbiBOb2RlLmpzIG9yIFJpbmdvSlMgdjAuOC4wK1xuXHRcdFx0ZnJlZU1vZHVsZS5leHBvcnRzID0gYmFzZTY0O1xuXHRcdH0gZWxzZSB7IC8vIGluIE5hcndoYWwgb3IgUmluZ29KUyB2MC43LjAtXG5cdFx0XHRmb3IgKHZhciBrZXkgaW4gYmFzZTY0KSB7XG5cdFx0XHRcdGJhc2U2NC5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIChmcmVlRXhwb3J0c1trZXldID0gYmFzZTY0W2tleV0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fSBlbHNlIHsgLy8gaW4gUmhpbm8gb3IgYSB3ZWIgYnJvd3NlclxuXHRcdHJvb3QuYmFzZTY0ID0gYmFzZTY0O1xuXHR9XG5cbn0odGhpcykpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKipcbiAqIFJldHVybnMgYSBgQnVmZmVyYCBpbnN0YW5jZSBmcm9tIHRoZSBnaXZlbiBkYXRhIFVSSSBgdXJpYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdXJpIERhdGEgVVJJIHRvIHR1cm4gaW50byBhIEJ1ZmZlciBpbnN0YW5jZVxuICogQHJldHVybiB7QnVmZmVyfSBCdWZmZXIgaW5zdGFuY2UgZnJvbSBEYXRhIFVSSVxuICogQGFwaSBwdWJsaWNcbiAqL1xuZnVuY3Rpb24gZGF0YVVyaVRvQnVmZmVyKHVyaSkge1xuICAgIGlmICghL15kYXRhOi9pLnRlc3QodXJpKSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdgdXJpYCBkb2VzIG5vdCBhcHBlYXIgdG8gYmUgYSBEYXRhIFVSSSAobXVzdCBiZWdpbiB3aXRoIFwiZGF0YTpcIiknKTtcbiAgICB9XG4gICAgLy8gc3RyaXAgbmV3bGluZXNcbiAgICB1cmkgPSB1cmkucmVwbGFjZSgvXFxyP1xcbi9nLCAnJyk7XG4gICAgLy8gc3BsaXQgdGhlIFVSSSB1cCBpbnRvIHRoZSBcIm1ldGFkYXRhXCIgYW5kIHRoZSBcImRhdGFcIiBwb3J0aW9uc1xuICAgIGNvbnN0IGZpcnN0Q29tbWEgPSB1cmkuaW5kZXhPZignLCcpO1xuICAgIGlmIChmaXJzdENvbW1hID09PSAtMSB8fCBmaXJzdENvbW1hIDw9IDQpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignbWFsZm9ybWVkIGRhdGE6IFVSSScpO1xuICAgIH1cbiAgICAvLyByZW1vdmUgdGhlIFwiZGF0YTpcIiBzY2hlbWUgYW5kIHBhcnNlIHRoZSBtZXRhZGF0YVxuICAgIGNvbnN0IG1ldGEgPSB1cmkuc3Vic3RyaW5nKDUsIGZpcnN0Q29tbWEpLnNwbGl0KCc7Jyk7XG4gICAgbGV0IGNoYXJzZXQgPSAnJztcbiAgICBsZXQgYmFzZTY0ID0gZmFsc2U7XG4gICAgY29uc3QgdHlwZSA9IG1ldGFbMF0gfHwgJ3RleHQvcGxhaW4nO1xuICAgIGxldCB0eXBlRnVsbCA9IHR5cGU7XG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCBtZXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChtZXRhW2ldID09PSAnYmFzZTY0Jykge1xuICAgICAgICAgICAgYmFzZTY0ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHR5cGVGdWxsICs9IGA7JHttZXRhW2ldfWA7XG4gICAgICAgICAgICBpZiAobWV0YVtpXS5pbmRleE9mKCdjaGFyc2V0PScpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgY2hhcnNldCA9IG1ldGFbaV0uc3Vic3RyaW5nKDgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8vIGRlZmF1bHRzIHRvIFVTLUFTQ0lJIG9ubHkgaWYgdHlwZSBpcyBub3QgcHJvdmlkZWRcbiAgICBpZiAoIW1ldGFbMF0gJiYgIWNoYXJzZXQubGVuZ3RoKSB7XG4gICAgICAgIHR5cGVGdWxsICs9ICc7Y2hhcnNldD1VUy1BU0NJSSc7XG4gICAgICAgIGNoYXJzZXQgPSAnVVMtQVNDSUknO1xuICAgIH1cbiAgICAvLyBnZXQgdGhlIGVuY29kZWQgZGF0YSBwb3J0aW9uIGFuZCBkZWNvZGUgVVJJLWVuY29kZWQgY2hhcnNcbiAgICBjb25zdCBlbmNvZGluZyA9IGJhc2U2NCA/ICdiYXNlNjQnIDogJ2FzY2lpJztcbiAgICBjb25zdCBkYXRhID0gdW5lc2NhcGUodXJpLnN1YnN0cmluZyhmaXJzdENvbW1hICsgMSkpO1xuICAgIGNvbnN0IGJ1ZmZlciA9IEJ1ZmZlci5mcm9tKGRhdGEsIGVuY29kaW5nKTtcbiAgICAvLyBzZXQgYC50eXBlYCBhbmQgYC50eXBlRnVsbGAgcHJvcGVydGllcyB0byBNSU1FIHR5cGVcbiAgICBidWZmZXIudHlwZSA9IHR5cGU7XG4gICAgYnVmZmVyLnR5cGVGdWxsID0gdHlwZUZ1bGw7XG4gICAgLy8gc2V0IHRoZSBgLmNoYXJzZXRgIHByb3BlcnR5XG4gICAgYnVmZmVyLmNoYXJzZXQgPSBjaGFyc2V0O1xuICAgIHJldHVybiBidWZmZXI7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGRhdGFVcmlUb0J1ZmZlcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsIi8qKlxuICogQGF1dGhvciBUb3J1IE5hZ2FzaGltYSA8aHR0cHM6Ly9naXRodWIuY29tL215c3RpY2F0ZWE+XG4gKiBAY29weXJpZ2h0IDIwMTUgVG9ydSBOYWdhc2hpbWEuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBTZWUgTElDRU5TRSBmaWxlIGluIHJvb3QgZGlyZWN0b3J5IGZvciBmdWxsIGxpY2Vuc2UuXG4gKi9cbid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcblxuLyoqXG4gKiBAdHlwZWRlZiB7b2JqZWN0fSBQcml2YXRlRGF0YVxuICogQHByb3BlcnR5IHtFdmVudFRhcmdldH0gZXZlbnRUYXJnZXQgVGhlIGV2ZW50IHRhcmdldC5cbiAqIEBwcm9wZXJ0eSB7e3R5cGU6c3RyaW5nfX0gZXZlbnQgVGhlIG9yaWdpbmFsIGV2ZW50IG9iamVjdC5cbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBldmVudFBoYXNlIFRoZSBjdXJyZW50IGV2ZW50IHBoYXNlLlxuICogQHByb3BlcnR5IHtFdmVudFRhcmdldHxudWxsfSBjdXJyZW50VGFyZ2V0IFRoZSBjdXJyZW50IGV2ZW50IHRhcmdldC5cbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gY2FuY2VsZWQgVGhlIGZsYWcgdG8gcHJldmVudCBkZWZhdWx0LlxuICogQHByb3BlcnR5IHtib29sZWFufSBzdG9wcGVkIFRoZSBmbGFnIHRvIHN0b3AgcHJvcGFnYXRpb24uXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IGltbWVkaWF0ZVN0b3BwZWQgVGhlIGZsYWcgdG8gc3RvcCBwcm9wYWdhdGlvbiBpbW1lZGlhdGVseS5cbiAqIEBwcm9wZXJ0eSB7RnVuY3Rpb258bnVsbH0gcGFzc2l2ZUxpc3RlbmVyIFRoZSBsaXN0ZW5lciBpZiB0aGUgY3VycmVudCBsaXN0ZW5lciBpcyBwYXNzaXZlLiBPdGhlcndpc2UgdGhpcyBpcyBudWxsLlxuICogQHByb3BlcnR5IHtudW1iZXJ9IHRpbWVTdGFtcCBUaGUgdW5peCB0aW1lLlxuICogQHByaXZhdGVcbiAqL1xuXG4vKipcbiAqIFByaXZhdGUgZGF0YSBmb3IgZXZlbnQgd3JhcHBlcnMuXG4gKiBAdHlwZSB7V2Vha01hcDxFdmVudCwgUHJpdmF0ZURhdGE+fVxuICogQHByaXZhdGVcbiAqL1xuY29uc3QgcHJpdmF0ZURhdGEgPSBuZXcgV2Vha01hcCgpO1xuXG4vKipcbiAqIENhY2hlIGZvciB3cmFwcGVyIGNsYXNzZXMuXG4gKiBAdHlwZSB7V2Vha01hcDxPYmplY3QsIEZ1bmN0aW9uPn1cbiAqIEBwcml2YXRlXG4gKi9cbmNvbnN0IHdyYXBwZXJzID0gbmV3IFdlYWtNYXAoKTtcblxuLyoqXG4gKiBHZXQgcHJpdmF0ZSBkYXRhLlxuICogQHBhcmFtIHtFdmVudH0gZXZlbnQgVGhlIGV2ZW50IG9iamVjdCB0byBnZXQgcHJpdmF0ZSBkYXRhLlxuICogQHJldHVybnMge1ByaXZhdGVEYXRhfSBUaGUgcHJpdmF0ZSBkYXRhIG9mIHRoZSBldmVudC5cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIHBkKGV2ZW50KSB7XG4gICAgY29uc3QgcmV0diA9IHByaXZhdGVEYXRhLmdldChldmVudCk7XG4gICAgY29uc29sZS5hc3NlcnQoXG4gICAgICAgIHJldHYgIT0gbnVsbCxcbiAgICAgICAgXCIndGhpcycgaXMgZXhwZWN0ZWQgYW4gRXZlbnQgb2JqZWN0LCBidXQgZ290XCIsXG4gICAgICAgIGV2ZW50XG4gICAgKTtcbiAgICByZXR1cm4gcmV0dlxufVxuXG4vKipcbiAqIGh0dHBzOi8vZG9tLnNwZWMud2hhdHdnLm9yZy8jc2V0LXRoZS1jYW5jZWxlZC1mbGFnXG4gKiBAcGFyYW0gZGF0YSB7UHJpdmF0ZURhdGF9IHByaXZhdGUgZGF0YS5cbiAqL1xuZnVuY3Rpb24gc2V0Q2FuY2VsRmxhZyhkYXRhKSB7XG4gICAgaWYgKGRhdGEucGFzc2l2ZUxpc3RlbmVyICE9IG51bGwpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgdHlwZW9mIGNvbnNvbGUgIT09IFwidW5kZWZpbmVkXCIgJiZcbiAgICAgICAgICAgIHR5cGVvZiBjb25zb2xlLmVycm9yID09PSBcImZ1bmN0aW9uXCJcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICAgICAgICAgIFwiVW5hYmxlIHRvIHByZXZlbnREZWZhdWx0IGluc2lkZSBwYXNzaXZlIGV2ZW50IGxpc3RlbmVyIGludm9jYXRpb24uXCIsXG4gICAgICAgICAgICAgICAgZGF0YS5wYXNzaXZlTGlzdGVuZXJcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGlmICghZGF0YS5ldmVudC5jYW5jZWxhYmxlKSB7XG4gICAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGRhdGEuY2FuY2VsZWQgPSB0cnVlO1xuICAgIGlmICh0eXBlb2YgZGF0YS5ldmVudC5wcmV2ZW50RGVmYXVsdCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIGRhdGEuZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG59XG5cbi8qKlxuICogQHNlZSBodHRwczovL2RvbS5zcGVjLndoYXR3Zy5vcmcvI2ludGVyZmFjZS1ldmVudFxuICogQHByaXZhdGVcbiAqL1xuLyoqXG4gKiBUaGUgZXZlbnQgd3JhcHBlci5cbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtFdmVudFRhcmdldH0gZXZlbnRUYXJnZXQgVGhlIGV2ZW50IHRhcmdldCBvZiB0aGlzIGRpc3BhdGNoaW5nLlxuICogQHBhcmFtIHtFdmVudHx7dHlwZTpzdHJpbmd9fSBldmVudCBUaGUgb3JpZ2luYWwgZXZlbnQgdG8gd3JhcC5cbiAqL1xuZnVuY3Rpb24gRXZlbnQoZXZlbnRUYXJnZXQsIGV2ZW50KSB7XG4gICAgcHJpdmF0ZURhdGEuc2V0KHRoaXMsIHtcbiAgICAgICAgZXZlbnRUYXJnZXQsXG4gICAgICAgIGV2ZW50LFxuICAgICAgICBldmVudFBoYXNlOiAyLFxuICAgICAgICBjdXJyZW50VGFyZ2V0OiBldmVudFRhcmdldCxcbiAgICAgICAgY2FuY2VsZWQ6IGZhbHNlLFxuICAgICAgICBzdG9wcGVkOiBmYWxzZSxcbiAgICAgICAgaW1tZWRpYXRlU3RvcHBlZDogZmFsc2UsXG4gICAgICAgIHBhc3NpdmVMaXN0ZW5lcjogbnVsbCxcbiAgICAgICAgdGltZVN0YW1wOiBldmVudC50aW1lU3RhbXAgfHwgRGF0ZS5ub3coKSxcbiAgICB9KTtcblxuICAgIC8vIGh0dHBzOi8vaGV5Y2FtLmdpdGh1Yi5pby93ZWJpZGwvI1VuZm9yZ2VhYmxlXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIFwiaXNUcnVzdGVkXCIsIHsgdmFsdWU6IGZhbHNlLCBlbnVtZXJhYmxlOiB0cnVlIH0pO1xuXG4gICAgLy8gRGVmaW5lIGFjY2Vzc29yc1xuICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhldmVudCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGNvbnN0IGtleSA9IGtleXNbaV07XG4gICAgICAgIGlmICghKGtleSBpbiB0aGlzKSkge1xuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIGtleSwgZGVmaW5lUmVkaXJlY3REZXNjcmlwdG9yKGtleSkpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG4vLyBTaG91bGQgYmUgZW51bWVyYWJsZSwgYnV0IGNsYXNzIG1ldGhvZHMgYXJlIG5vdCBlbnVtZXJhYmxlLlxuRXZlbnQucHJvdG90eXBlID0ge1xuICAgIC8qKlxuICAgICAqIFRoZSB0eXBlIG9mIHRoaXMgZXZlbnQuXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKi9cbiAgICBnZXQgdHlwZSgpIHtcbiAgICAgICAgcmV0dXJuIHBkKHRoaXMpLmV2ZW50LnR5cGVcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVGhlIHRhcmdldCBvZiB0aGlzIGV2ZW50LlxuICAgICAqIEB0eXBlIHtFdmVudFRhcmdldH1cbiAgICAgKi9cbiAgICBnZXQgdGFyZ2V0KCkge1xuICAgICAgICByZXR1cm4gcGQodGhpcykuZXZlbnRUYXJnZXRcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVGhlIHRhcmdldCBvZiB0aGlzIGV2ZW50LlxuICAgICAqIEB0eXBlIHtFdmVudFRhcmdldH1cbiAgICAgKi9cbiAgICBnZXQgY3VycmVudFRhcmdldCgpIHtcbiAgICAgICAgcmV0dXJuIHBkKHRoaXMpLmN1cnJlbnRUYXJnZXRcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMge0V2ZW50VGFyZ2V0W119IFRoZSBjb21wb3NlZCBwYXRoIG9mIHRoaXMgZXZlbnQuXG4gICAgICovXG4gICAgY29tcG9zZWRQYXRoKCkge1xuICAgICAgICBjb25zdCBjdXJyZW50VGFyZ2V0ID0gcGQodGhpcykuY3VycmVudFRhcmdldDtcbiAgICAgICAgaWYgKGN1cnJlbnRUYXJnZXQgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIFtdXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFtjdXJyZW50VGFyZ2V0XVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBDb25zdGFudCBvZiBOT05FLlxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICovXG4gICAgZ2V0IE5PTkUoKSB7XG4gICAgICAgIHJldHVybiAwXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIENvbnN0YW50IG9mIENBUFRVUklOR19QSEFTRS5cbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqL1xuICAgIGdldCBDQVBUVVJJTkdfUEhBU0UoKSB7XG4gICAgICAgIHJldHVybiAxXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIENvbnN0YW50IG9mIEFUX1RBUkdFVC5cbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqL1xuICAgIGdldCBBVF9UQVJHRVQoKSB7XG4gICAgICAgIHJldHVybiAyXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIENvbnN0YW50IG9mIEJVQkJMSU5HX1BIQVNFLlxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICovXG4gICAgZ2V0IEJVQkJMSU5HX1BIQVNFKCkge1xuICAgICAgICByZXR1cm4gM1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBUaGUgdGFyZ2V0IG9mIHRoaXMgZXZlbnQuXG4gICAgICogQHR5cGUge251bWJlcn1cbiAgICAgKi9cbiAgICBnZXQgZXZlbnRQaGFzZSgpIHtcbiAgICAgICAgcmV0dXJuIHBkKHRoaXMpLmV2ZW50UGhhc2VcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogU3RvcCBldmVudCBidWJibGluZy5cbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cbiAgICAgKi9cbiAgICBzdG9wUHJvcGFnYXRpb24oKSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBwZCh0aGlzKTtcblxuICAgICAgICBkYXRhLnN0b3BwZWQgPSB0cnVlO1xuICAgICAgICBpZiAodHlwZW9mIGRhdGEuZXZlbnQuc3RvcFByb3BhZ2F0aW9uID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIGRhdGEuZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogU3RvcCBldmVudCBidWJibGluZy5cbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cbiAgICAgKi9cbiAgICBzdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBwZCh0aGlzKTtcblxuICAgICAgICBkYXRhLnN0b3BwZWQgPSB0cnVlO1xuICAgICAgICBkYXRhLmltbWVkaWF0ZVN0b3BwZWQgPSB0cnVlO1xuICAgICAgICBpZiAodHlwZW9mIGRhdGEuZXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIGRhdGEuZXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVGhlIGZsYWcgdG8gYmUgYnViYmxpbmcuXG4gICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICovXG4gICAgZ2V0IGJ1YmJsZXMoKSB7XG4gICAgICAgIHJldHVybiBCb29sZWFuKHBkKHRoaXMpLmV2ZW50LmJ1YmJsZXMpXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFRoZSBmbGFnIHRvIGJlIGNhbmNlbGFibGUuXG4gICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICovXG4gICAgZ2V0IGNhbmNlbGFibGUoKSB7XG4gICAgICAgIHJldHVybiBCb29sZWFuKHBkKHRoaXMpLmV2ZW50LmNhbmNlbGFibGUpXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIENhbmNlbCB0aGlzIGV2ZW50LlxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxuICAgICAqL1xuICAgIHByZXZlbnREZWZhdWx0KCkge1xuICAgICAgICBzZXRDYW5jZWxGbGFnKHBkKHRoaXMpKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVGhlIGZsYWcgdG8gaW5kaWNhdGUgY2FuY2VsbGF0aW9uIHN0YXRlLlxuICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAqL1xuICAgIGdldCBkZWZhdWx0UHJldmVudGVkKCkge1xuICAgICAgICByZXR1cm4gcGQodGhpcykuY2FuY2VsZWRcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVGhlIGZsYWcgdG8gYmUgY29tcG9zZWQuXG4gICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICovXG4gICAgZ2V0IGNvbXBvc2VkKCkge1xuICAgICAgICByZXR1cm4gQm9vbGVhbihwZCh0aGlzKS5ldmVudC5jb21wb3NlZClcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVGhlIHVuaXggdGltZSBvZiB0aGlzIGV2ZW50LlxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICovXG4gICAgZ2V0IHRpbWVTdGFtcCgpIHtcbiAgICAgICAgcmV0dXJuIHBkKHRoaXMpLnRpbWVTdGFtcFxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBUaGUgdGFyZ2V0IG9mIHRoaXMgZXZlbnQuXG4gICAgICogQHR5cGUge0V2ZW50VGFyZ2V0fVxuICAgICAqIEBkZXByZWNhdGVkXG4gICAgICovXG4gICAgZ2V0IHNyY0VsZW1lbnQoKSB7XG4gICAgICAgIHJldHVybiBwZCh0aGlzKS5ldmVudFRhcmdldFxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBUaGUgZmxhZyB0byBzdG9wIGV2ZW50IGJ1YmJsaW5nLlxuICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAqIEBkZXByZWNhdGVkXG4gICAgICovXG4gICAgZ2V0IGNhbmNlbEJ1YmJsZSgpIHtcbiAgICAgICAgcmV0dXJuIHBkKHRoaXMpLnN0b3BwZWRcbiAgICB9LFxuICAgIHNldCBjYW5jZWxCdWJibGUodmFsdWUpIHtcbiAgICAgICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZGF0YSA9IHBkKHRoaXMpO1xuXG4gICAgICAgIGRhdGEuc3RvcHBlZCA9IHRydWU7XG4gICAgICAgIGlmICh0eXBlb2YgZGF0YS5ldmVudC5jYW5jZWxCdWJibGUgPT09IFwiYm9vbGVhblwiKSB7XG4gICAgICAgICAgICBkYXRhLmV2ZW50LmNhbmNlbEJ1YmJsZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVGhlIGZsYWcgdG8gaW5kaWNhdGUgY2FuY2VsbGF0aW9uIHN0YXRlLlxuICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAqIEBkZXByZWNhdGVkXG4gICAgICovXG4gICAgZ2V0IHJldHVyblZhbHVlKCkge1xuICAgICAgICByZXR1cm4gIXBkKHRoaXMpLmNhbmNlbGVkXG4gICAgfSxcbiAgICBzZXQgcmV0dXJuVmFsdWUodmFsdWUpIHtcbiAgICAgICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICAgICAgc2V0Q2FuY2VsRmxhZyhwZCh0aGlzKSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZSB0aGlzIGV2ZW50IG9iamVjdC4gQnV0IGRvIG5vdGhpbmcgdW5kZXIgZXZlbnQgZGlzcGF0Y2hpbmcuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgVGhlIGV2ZW50IHR5cGUuXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbYnViYmxlcz1mYWxzZV0gVGhlIGZsYWcgdG8gYmUgcG9zc2libGUgdG8gYnViYmxlIHVwLlxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW2NhbmNlbGFibGU9ZmFsc2VdIFRoZSBmbGFnIHRvIGJlIHBvc3NpYmxlIHRvIGNhbmNlbC5cbiAgICAgKiBAZGVwcmVjYXRlZFxuICAgICAqL1xuICAgIGluaXRFdmVudCgpIHtcbiAgICAgICAgLy8gRG8gbm90aGluZy5cbiAgICB9LFxufTtcblxuLy8gYGNvbnN0cnVjdG9yYCBpcyBub3QgZW51bWVyYWJsZS5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShFdmVudC5wcm90b3R5cGUsIFwiY29uc3RydWN0b3JcIiwge1xuICAgIHZhbHVlOiBFdmVudCxcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgd3JpdGFibGU6IHRydWUsXG59KTtcblxuLy8gRW5zdXJlIGBldmVudCBpbnN0YW5jZW9mIHdpbmRvdy5FdmVudGAgaXMgYHRydWVgLlxuaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiYgdHlwZW9mIHdpbmRvdy5FdmVudCAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZihFdmVudC5wcm90b3R5cGUsIHdpbmRvdy5FdmVudC5wcm90b3R5cGUpO1xuXG4gICAgLy8gTWFrZSBhc3NvY2lhdGlvbiBmb3Igd3JhcHBlcnMuXG4gICAgd3JhcHBlcnMuc2V0KHdpbmRvdy5FdmVudC5wcm90b3R5cGUsIEV2ZW50KTtcbn1cblxuLyoqXG4gKiBHZXQgdGhlIHByb3BlcnR5IGRlc2NyaXB0b3IgdG8gcmVkaXJlY3QgYSBnaXZlbiBwcm9wZXJ0eS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgUHJvcGVydHkgbmFtZSB0byBkZWZpbmUgcHJvcGVydHkgZGVzY3JpcHRvci5cbiAqIEByZXR1cm5zIHtQcm9wZXJ0eURlc2NyaXB0b3J9IFRoZSBwcm9wZXJ0eSBkZXNjcmlwdG9yIHRvIHJlZGlyZWN0IHRoZSBwcm9wZXJ0eS5cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGRlZmluZVJlZGlyZWN0RGVzY3JpcHRvcihrZXkpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBnZXQoKSB7XG4gICAgICAgICAgICByZXR1cm4gcGQodGhpcykuZXZlbnRba2V5XVxuICAgICAgICB9LFxuICAgICAgICBzZXQodmFsdWUpIHtcbiAgICAgICAgICAgIHBkKHRoaXMpLmV2ZW50W2tleV0gPSB2YWx1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgIH1cbn1cblxuLyoqXG4gKiBHZXQgdGhlIHByb3BlcnR5IGRlc2NyaXB0b3IgdG8gY2FsbCBhIGdpdmVuIG1ldGhvZCBwcm9wZXJ0eS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgUHJvcGVydHkgbmFtZSB0byBkZWZpbmUgcHJvcGVydHkgZGVzY3JpcHRvci5cbiAqIEByZXR1cm5zIHtQcm9wZXJ0eURlc2NyaXB0b3J9IFRoZSBwcm9wZXJ0eSBkZXNjcmlwdG9yIHRvIGNhbGwgdGhlIG1ldGhvZCBwcm9wZXJ0eS5cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGRlZmluZUNhbGxEZXNjcmlwdG9yKGtleSkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHZhbHVlKCkge1xuICAgICAgICAgICAgY29uc3QgZXZlbnQgPSBwZCh0aGlzKS5ldmVudDtcbiAgICAgICAgICAgIHJldHVybiBldmVudFtrZXldLmFwcGx5KGV2ZW50LCBhcmd1bWVudHMpXG4gICAgICAgIH0sXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICB9XG59XG5cbi8qKlxuICogRGVmaW5lIG5ldyB3cmFwcGVyIGNsYXNzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gQmFzZUV2ZW50IFRoZSBiYXNlIHdyYXBwZXIgY2xhc3MuXG4gKiBAcGFyYW0ge09iamVjdH0gcHJvdG8gVGhlIHByb3RvdHlwZSBvZiB0aGUgb3JpZ2luYWwgZXZlbnQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFRoZSBkZWZpbmVkIHdyYXBwZXIgY2xhc3MuXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBkZWZpbmVXcmFwcGVyKEJhc2VFdmVudCwgcHJvdG8pIHtcbiAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMocHJvdG8pO1xuICAgIGlmIChrZXlzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gQmFzZUV2ZW50XG4gICAgfVxuXG4gICAgLyoqIEN1c3RvbUV2ZW50ICovXG4gICAgZnVuY3Rpb24gQ3VzdG9tRXZlbnQoZXZlbnRUYXJnZXQsIGV2ZW50KSB7XG4gICAgICAgIEJhc2VFdmVudC5jYWxsKHRoaXMsIGV2ZW50VGFyZ2V0LCBldmVudCk7XG4gICAgfVxuXG4gICAgQ3VzdG9tRXZlbnQucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShCYXNlRXZlbnQucHJvdG90eXBlLCB7XG4gICAgICAgIGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBDdXN0b21FdmVudCwgY29uZmlndXJhYmxlOiB0cnVlLCB3cml0YWJsZTogdHJ1ZSB9LFxuICAgIH0pO1xuXG4gICAgLy8gRGVmaW5lIGFjY2Vzc29ycy5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgY29uc3Qga2V5ID0ga2V5c1tpXTtcbiAgICAgICAgaWYgKCEoa2V5IGluIEJhc2VFdmVudC5wcm90b3R5cGUpKSB7XG4gICAgICAgICAgICBjb25zdCBkZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihwcm90bywga2V5KTtcbiAgICAgICAgICAgIGNvbnN0IGlzRnVuYyA9IHR5cGVvZiBkZXNjcmlwdG9yLnZhbHVlID09PSBcImZ1bmN0aW9uXCI7XG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoXG4gICAgICAgICAgICAgICAgQ3VzdG9tRXZlbnQucHJvdG90eXBlLFxuICAgICAgICAgICAgICAgIGtleSxcbiAgICAgICAgICAgICAgICBpc0Z1bmNcbiAgICAgICAgICAgICAgICAgICAgPyBkZWZpbmVDYWxsRGVzY3JpcHRvcihrZXkpXG4gICAgICAgICAgICAgICAgICAgIDogZGVmaW5lUmVkaXJlY3REZXNjcmlwdG9yKGtleSlcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gQ3VzdG9tRXZlbnRcbn1cblxuLyoqXG4gKiBHZXQgdGhlIHdyYXBwZXIgY2xhc3Mgb2YgYSBnaXZlbiBwcm90b3R5cGUuXG4gKiBAcGFyYW0ge09iamVjdH0gcHJvdG8gVGhlIHByb3RvdHlwZSBvZiB0aGUgb3JpZ2luYWwgZXZlbnQgdG8gZ2V0IGl0cyB3cmFwcGVyLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBUaGUgd3JhcHBlciBjbGFzcy5cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGdldFdyYXBwZXIocHJvdG8pIHtcbiAgICBpZiAocHJvdG8gPT0gbnVsbCB8fCBwcm90byA9PT0gT2JqZWN0LnByb3RvdHlwZSkge1xuICAgICAgICByZXR1cm4gRXZlbnRcbiAgICB9XG5cbiAgICBsZXQgd3JhcHBlciA9IHdyYXBwZXJzLmdldChwcm90byk7XG4gICAgaWYgKHdyYXBwZXIgPT0gbnVsbCkge1xuICAgICAgICB3cmFwcGVyID0gZGVmaW5lV3JhcHBlcihnZXRXcmFwcGVyKE9iamVjdC5nZXRQcm90b3R5cGVPZihwcm90bykpLCBwcm90byk7XG4gICAgICAgIHdyYXBwZXJzLnNldChwcm90bywgd3JhcHBlcik7XG4gICAgfVxuICAgIHJldHVybiB3cmFwcGVyXG59XG5cbi8qKlxuICogV3JhcCBhIGdpdmVuIGV2ZW50IHRvIG1hbmFnZW1lbnQgYSBkaXNwYXRjaGluZy5cbiAqIEBwYXJhbSB7RXZlbnRUYXJnZXR9IGV2ZW50VGFyZ2V0IFRoZSBldmVudCB0YXJnZXQgb2YgdGhpcyBkaXNwYXRjaGluZy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBldmVudCBUaGUgZXZlbnQgdG8gd3JhcC5cbiAqIEByZXR1cm5zIHtFdmVudH0gVGhlIHdyYXBwZXIgaW5zdGFuY2UuXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiB3cmFwRXZlbnQoZXZlbnRUYXJnZXQsIGV2ZW50KSB7XG4gICAgY29uc3QgV3JhcHBlciA9IGdldFdyYXBwZXIoT2JqZWN0LmdldFByb3RvdHlwZU9mKGV2ZW50KSk7XG4gICAgcmV0dXJuIG5ldyBXcmFwcGVyKGV2ZW50VGFyZ2V0LCBldmVudClcbn1cblxuLyoqXG4gKiBHZXQgdGhlIGltbWVkaWF0ZVN0b3BwZWQgZmxhZyBvZiBhIGdpdmVuIGV2ZW50LlxuICogQHBhcmFtIHtFdmVudH0gZXZlbnQgVGhlIGV2ZW50IHRvIGdldC5cbiAqIEByZXR1cm5zIHtib29sZWFufSBUaGUgZmxhZyB0byBzdG9wIHByb3BhZ2F0aW9uIGltbWVkaWF0ZWx5LlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gaXNTdG9wcGVkKGV2ZW50KSB7XG4gICAgcmV0dXJuIHBkKGV2ZW50KS5pbW1lZGlhdGVTdG9wcGVkXG59XG5cbi8qKlxuICogU2V0IHRoZSBjdXJyZW50IGV2ZW50IHBoYXNlIG9mIGEgZ2l2ZW4gZXZlbnQuXG4gKiBAcGFyYW0ge0V2ZW50fSBldmVudCBUaGUgZXZlbnQgdG8gc2V0IGN1cnJlbnQgdGFyZ2V0LlxuICogQHBhcmFtIHtudW1iZXJ9IGV2ZW50UGhhc2UgTmV3IGV2ZW50IHBoYXNlLlxuICogQHJldHVybnMge3ZvaWR9XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBzZXRFdmVudFBoYXNlKGV2ZW50LCBldmVudFBoYXNlKSB7XG4gICAgcGQoZXZlbnQpLmV2ZW50UGhhc2UgPSBldmVudFBoYXNlO1xufVxuXG4vKipcbiAqIFNldCB0aGUgY3VycmVudCB0YXJnZXQgb2YgYSBnaXZlbiBldmVudC5cbiAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IFRoZSBldmVudCB0byBzZXQgY3VycmVudCB0YXJnZXQuXG4gKiBAcGFyYW0ge0V2ZW50VGFyZ2V0fG51bGx9IGN1cnJlbnRUYXJnZXQgTmV3IGN1cnJlbnQgdGFyZ2V0LlxuICogQHJldHVybnMge3ZvaWR9XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBzZXRDdXJyZW50VGFyZ2V0KGV2ZW50LCBjdXJyZW50VGFyZ2V0KSB7XG4gICAgcGQoZXZlbnQpLmN1cnJlbnRUYXJnZXQgPSBjdXJyZW50VGFyZ2V0O1xufVxuXG4vKipcbiAqIFNldCBhIHBhc3NpdmUgbGlzdGVuZXIgb2YgYSBnaXZlbiBldmVudC5cbiAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IFRoZSBldmVudCB0byBzZXQgY3VycmVudCB0YXJnZXQuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufG51bGx9IHBhc3NpdmVMaXN0ZW5lciBOZXcgcGFzc2l2ZSBsaXN0ZW5lci5cbiAqIEByZXR1cm5zIHt2b2lkfVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gc2V0UGFzc2l2ZUxpc3RlbmVyKGV2ZW50LCBwYXNzaXZlTGlzdGVuZXIpIHtcbiAgICBwZChldmVudCkucGFzc2l2ZUxpc3RlbmVyID0gcGFzc2l2ZUxpc3RlbmVyO1xufVxuXG4vKipcbiAqIEB0eXBlZGVmIHtvYmplY3R9IExpc3RlbmVyTm9kZVxuICogQHByb3BlcnR5IHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqIEBwcm9wZXJ0eSB7MXwyfDN9IGxpc3RlbmVyVHlwZVxuICogQHByb3BlcnR5IHtib29sZWFufSBwYXNzaXZlXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IG9uY2VcbiAqIEBwcm9wZXJ0eSB7TGlzdGVuZXJOb2RlfG51bGx9IG5leHRcbiAqIEBwcml2YXRlXG4gKi9cblxuLyoqXG4gKiBAdHlwZSB7V2Vha01hcDxvYmplY3QsIE1hcDxzdHJpbmcsIExpc3RlbmVyTm9kZT4+fVxuICogQHByaXZhdGVcbiAqL1xuY29uc3QgbGlzdGVuZXJzTWFwID0gbmV3IFdlYWtNYXAoKTtcblxuLy8gTGlzdGVuZXIgdHlwZXNcbmNvbnN0IENBUFRVUkUgPSAxO1xuY29uc3QgQlVCQkxFID0gMjtcbmNvbnN0IEFUVFJJQlVURSA9IDM7XG5cbi8qKlxuICogQ2hlY2sgd2hldGhlciBhIGdpdmVuIHZhbHVlIGlzIGFuIG9iamVjdCBvciBub3QuXG4gKiBAcGFyYW0ge2FueX0geCBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gYHRydWVgIGlmIHRoZSB2YWx1ZSBpcyBhbiBvYmplY3QuXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHgpIHtcbiAgICByZXR1cm4geCAhPT0gbnVsbCAmJiB0eXBlb2YgeCA9PT0gXCJvYmplY3RcIiAvL2VzbGludC1kaXNhYmxlLWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcbn1cblxuLyoqXG4gKiBHZXQgbGlzdGVuZXJzLlxuICogQHBhcmFtIHtFdmVudFRhcmdldH0gZXZlbnRUYXJnZXQgVGhlIGV2ZW50IHRhcmdldCB0byBnZXQuXG4gKiBAcmV0dXJucyB7TWFwPHN0cmluZywgTGlzdGVuZXJOb2RlPn0gVGhlIGxpc3RlbmVycy5cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGdldExpc3RlbmVycyhldmVudFRhcmdldCkge1xuICAgIGNvbnN0IGxpc3RlbmVycyA9IGxpc3RlbmVyc01hcC5nZXQoZXZlbnRUYXJnZXQpO1xuICAgIGlmIChsaXN0ZW5lcnMgPT0gbnVsbCkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgICAgICAgXCIndGhpcycgaXMgZXhwZWN0ZWQgYW4gRXZlbnRUYXJnZXQgb2JqZWN0LCBidXQgZ290IGFub3RoZXIgdmFsdWUuXCJcbiAgICAgICAgKVxuICAgIH1cbiAgICByZXR1cm4gbGlzdGVuZXJzXG59XG5cbi8qKlxuICogR2V0IHRoZSBwcm9wZXJ0eSBkZXNjcmlwdG9yIGZvciB0aGUgZXZlbnQgYXR0cmlidXRlIG9mIGEgZ2l2ZW4gZXZlbnQuXG4gKiBAcGFyYW0ge3N0cmluZ30gZXZlbnROYW1lIFRoZSBldmVudCBuYW1lIHRvIGdldCBwcm9wZXJ0eSBkZXNjcmlwdG9yLlxuICogQHJldHVybnMge1Byb3BlcnR5RGVzY3JpcHRvcn0gVGhlIHByb3BlcnR5IGRlc2NyaXB0b3IuXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBkZWZpbmVFdmVudEF0dHJpYnV0ZURlc2NyaXB0b3IoZXZlbnROYW1lKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZ2V0KCkge1xuICAgICAgICAgICAgY29uc3QgbGlzdGVuZXJzID0gZ2V0TGlzdGVuZXJzKHRoaXMpO1xuICAgICAgICAgICAgbGV0IG5vZGUgPSBsaXN0ZW5lcnMuZ2V0KGV2ZW50TmFtZSk7XG4gICAgICAgICAgICB3aGlsZSAobm9kZSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgaWYgKG5vZGUubGlzdGVuZXJUeXBlID09PSBBVFRSSUJVVEUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5vZGUubGlzdGVuZXJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbm9kZSA9IG5vZGUubmV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBudWxsXG4gICAgICAgIH0sXG5cbiAgICAgICAgc2V0KGxpc3RlbmVyKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGxpc3RlbmVyICE9PSBcImZ1bmN0aW9uXCIgJiYgIWlzT2JqZWN0KGxpc3RlbmVyKSkge1xuICAgICAgICAgICAgICAgIGxpc3RlbmVyID0gbnVsbDsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgbGlzdGVuZXJzID0gZ2V0TGlzdGVuZXJzKHRoaXMpO1xuXG4gICAgICAgICAgICAvLyBUcmF2ZXJzZSB0byB0aGUgdGFpbCB3aGlsZSByZW1vdmluZyBvbGQgdmFsdWUuXG4gICAgICAgICAgICBsZXQgcHJldiA9IG51bGw7XG4gICAgICAgICAgICBsZXQgbm9kZSA9IGxpc3RlbmVycy5nZXQoZXZlbnROYW1lKTtcbiAgICAgICAgICAgIHdoaWxlIChub2RlICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBpZiAobm9kZS5saXN0ZW5lclR5cGUgPT09IEFUVFJJQlVURSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBSZW1vdmUgb2xkIHZhbHVlLlxuICAgICAgICAgICAgICAgICAgICBpZiAocHJldiAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJldi5uZXh0ID0gbm9kZS5uZXh0O1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG5vZGUubmV4dCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGlzdGVuZXJzLnNldChldmVudE5hbWUsIG5vZGUubmV4dCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lcnMuZGVsZXRlKGV2ZW50TmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBwcmV2ID0gbm9kZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBub2RlID0gbm9kZS5uZXh0O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBBZGQgbmV3IHZhbHVlLlxuICAgICAgICAgICAgaWYgKGxpc3RlbmVyICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbmV3Tm9kZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgbGlzdGVuZXIsXG4gICAgICAgICAgICAgICAgICAgIGxpc3RlbmVyVHlwZTogQVRUUklCVVRFLFxuICAgICAgICAgICAgICAgICAgICBwYXNzaXZlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgb25jZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIG5leHQ6IG51bGwsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBpZiAocHJldiA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lcnMuc2V0KGV2ZW50TmFtZSwgbmV3Tm9kZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcHJldi5uZXh0ID0gbmV3Tm9kZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICB9XG59XG5cbi8qKlxuICogRGVmaW5lIGFuIGV2ZW50IGF0dHJpYnV0ZSAoZS5nLiBgZXZlbnRUYXJnZXQub25jbGlja2ApLlxuICogQHBhcmFtIHtPYmplY3R9IGV2ZW50VGFyZ2V0UHJvdG90eXBlIFRoZSBldmVudCB0YXJnZXQgcHJvdG90eXBlIHRvIGRlZmluZSBhbiBldmVudCBhdHRyYml0ZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBldmVudE5hbWUgVGhlIGV2ZW50IG5hbWUgdG8gZGVmaW5lLlxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmZ1bmN0aW9uIGRlZmluZUV2ZW50QXR0cmlidXRlKGV2ZW50VGFyZ2V0UHJvdG90eXBlLCBldmVudE5hbWUpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoXG4gICAgICAgIGV2ZW50VGFyZ2V0UHJvdG90eXBlLFxuICAgICAgICBgb24ke2V2ZW50TmFtZX1gLFxuICAgICAgICBkZWZpbmVFdmVudEF0dHJpYnV0ZURlc2NyaXB0b3IoZXZlbnROYW1lKVxuICAgICk7XG59XG5cbi8qKlxuICogRGVmaW5lIGEgY3VzdG9tIEV2ZW50VGFyZ2V0IHdpdGggZXZlbnQgYXR0cmlidXRlcy5cbiAqIEBwYXJhbSB7c3RyaW5nW119IGV2ZW50TmFtZXMgRXZlbnQgbmFtZXMgZm9yIGV2ZW50IGF0dHJpYnV0ZXMuXG4gKiBAcmV0dXJucyB7RXZlbnRUYXJnZXR9IFRoZSBjdXN0b20gRXZlbnRUYXJnZXQuXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBkZWZpbmVDdXN0b21FdmVudFRhcmdldChldmVudE5hbWVzKSB7XG4gICAgLyoqIEN1c3RvbUV2ZW50VGFyZ2V0ICovXG4gICAgZnVuY3Rpb24gQ3VzdG9tRXZlbnRUYXJnZXQoKSB7XG4gICAgICAgIEV2ZW50VGFyZ2V0LmNhbGwodGhpcyk7XG4gICAgfVxuXG4gICAgQ3VzdG9tRXZlbnRUYXJnZXQucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShFdmVudFRhcmdldC5wcm90b3R5cGUsIHtcbiAgICAgICAgY29uc3RydWN0b3I6IHtcbiAgICAgICAgICAgIHZhbHVlOiBDdXN0b21FdmVudFRhcmdldCxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICB9LFxuICAgIH0pO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBldmVudE5hbWVzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGRlZmluZUV2ZW50QXR0cmlidXRlKEN1c3RvbUV2ZW50VGFyZ2V0LnByb3RvdHlwZSwgZXZlbnROYW1lc1tpXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIEN1c3RvbUV2ZW50VGFyZ2V0XG59XG5cbi8qKlxuICogRXZlbnRUYXJnZXQuXG4gKlxuICogLSBUaGlzIGlzIGNvbnN0cnVjdG9yIGlmIG5vIGFyZ3VtZW50cy5cbiAqIC0gVGhpcyBpcyBhIGZ1bmN0aW9uIHdoaWNoIHJldHVybnMgYSBDdXN0b21FdmVudFRhcmdldCBjb25zdHJ1Y3RvciBpZiB0aGVyZSBhcmUgYXJndW1lbnRzLlxuICpcbiAqIEZvciBleGFtcGxlOlxuICpcbiAqICAgICBjbGFzcyBBIGV4dGVuZHMgRXZlbnRUYXJnZXQge31cbiAqICAgICBjbGFzcyBCIGV4dGVuZHMgRXZlbnRUYXJnZXQoXCJtZXNzYWdlXCIpIHt9XG4gKiAgICAgY2xhc3MgQyBleHRlbmRzIEV2ZW50VGFyZ2V0KFwibWVzc2FnZVwiLCBcImVycm9yXCIpIHt9XG4gKiAgICAgY2xhc3MgRCBleHRlbmRzIEV2ZW50VGFyZ2V0KFtcIm1lc3NhZ2VcIiwgXCJlcnJvclwiXSkge31cbiAqL1xuZnVuY3Rpb24gRXZlbnRUYXJnZXQoKSB7XG4gICAgLyplc2xpbnQtZGlzYWJsZSBjb25zaXN0ZW50LXJldHVybiAqL1xuICAgIGlmICh0aGlzIGluc3RhbmNlb2YgRXZlbnRUYXJnZXQpIHtcbiAgICAgICAgbGlzdGVuZXJzTWFwLnNldCh0aGlzLCBuZXcgTWFwKCkpO1xuICAgICAgICByZXR1cm5cbiAgICB9XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEgJiYgQXJyYXkuaXNBcnJheShhcmd1bWVudHNbMF0pKSB7XG4gICAgICAgIHJldHVybiBkZWZpbmVDdXN0b21FdmVudFRhcmdldChhcmd1bWVudHNbMF0pXG4gICAgfVxuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMCkge1xuICAgICAgICBjb25zdCB0eXBlcyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIHR5cGVzW2ldID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkZWZpbmVDdXN0b21FdmVudFRhcmdldCh0eXBlcylcbiAgICB9XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKVxuICAgIC8qZXNsaW50LWVuYWJsZSBjb25zaXN0ZW50LXJldHVybiAqL1xufVxuXG4vLyBTaG91bGQgYmUgZW51bWVyYWJsZSwgYnV0IGNsYXNzIG1ldGhvZHMgYXJlIG5vdCBlbnVtZXJhYmxlLlxuRXZlbnRUYXJnZXQucHJvdG90eXBlID0ge1xuICAgIC8qKlxuICAgICAqIEFkZCBhIGdpdmVuIGxpc3RlbmVyIHRvIHRoaXMgZXZlbnQgdGFyZ2V0LlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudE5hbWUgVGhlIGV2ZW50IG5hbWUgdG8gYWRkLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyIFRoZSBsaXN0ZW5lciB0byBhZGQuXG4gICAgICogQHBhcmFtIHtib29sZWFufHtjYXB0dXJlPzpib29sZWFuLHBhc3NpdmU/OmJvb2xlYW4sb25jZT86Ym9vbGVhbn19IFtvcHRpb25zXSBUaGUgb3B0aW9ucyBmb3IgdGhpcyBsaXN0ZW5lci5cbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cbiAgICAgKi9cbiAgICBhZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgbGlzdGVuZXIsIG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKGxpc3RlbmVyID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgbGlzdGVuZXIgIT09IFwiZnVuY3Rpb25cIiAmJiAhaXNPYmplY3QobGlzdGVuZXIpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiJ2xpc3RlbmVyJyBzaG91bGQgYmUgYSBmdW5jdGlvbiBvciBhbiBvYmplY3QuXCIpXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBsaXN0ZW5lcnMgPSBnZXRMaXN0ZW5lcnModGhpcyk7XG4gICAgICAgIGNvbnN0IG9wdGlvbnNJc09iaiA9IGlzT2JqZWN0KG9wdGlvbnMpO1xuICAgICAgICBjb25zdCBjYXB0dXJlID0gb3B0aW9uc0lzT2JqXG4gICAgICAgICAgICA/IEJvb2xlYW4ob3B0aW9ucy5jYXB0dXJlKVxuICAgICAgICAgICAgOiBCb29sZWFuKG9wdGlvbnMpO1xuICAgICAgICBjb25zdCBsaXN0ZW5lclR5cGUgPSBjYXB0dXJlID8gQ0FQVFVSRSA6IEJVQkJMRTtcbiAgICAgICAgY29uc3QgbmV3Tm9kZSA9IHtcbiAgICAgICAgICAgIGxpc3RlbmVyLFxuICAgICAgICAgICAgbGlzdGVuZXJUeXBlLFxuICAgICAgICAgICAgcGFzc2l2ZTogb3B0aW9uc0lzT2JqICYmIEJvb2xlYW4ob3B0aW9ucy5wYXNzaXZlKSxcbiAgICAgICAgICAgIG9uY2U6IG9wdGlvbnNJc09iaiAmJiBCb29sZWFuKG9wdGlvbnMub25jZSksXG4gICAgICAgICAgICBuZXh0OiBudWxsLFxuICAgICAgICB9O1xuXG4gICAgICAgIC8vIFNldCBpdCBhcyB0aGUgZmlyc3Qgbm9kZSBpZiB0aGUgZmlyc3Qgbm9kZSBpcyBudWxsLlxuICAgICAgICBsZXQgbm9kZSA9IGxpc3RlbmVycy5nZXQoZXZlbnROYW1lKTtcbiAgICAgICAgaWYgKG5vZGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgbGlzdGVuZXJzLnNldChldmVudE5hbWUsIG5ld05vZGUpO1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICAvLyBUcmF2ZXJzZSB0byB0aGUgdGFpbCB3aGlsZSBjaGVja2luZyBkdXBsaWNhdGlvbi4uXG4gICAgICAgIGxldCBwcmV2ID0gbnVsbDtcbiAgICAgICAgd2hpbGUgKG5vZGUgIT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIG5vZGUubGlzdGVuZXIgPT09IGxpc3RlbmVyICYmXG4gICAgICAgICAgICAgICAgbm9kZS5saXN0ZW5lclR5cGUgPT09IGxpc3RlbmVyVHlwZVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgLy8gU2hvdWxkIGlnbm9yZSBkdXBsaWNhdGlvbi5cbiAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHByZXYgPSBub2RlO1xuICAgICAgICAgICAgbm9kZSA9IG5vZGUubmV4dDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEFkZCBpdC5cbiAgICAgICAgcHJldi5uZXh0ID0gbmV3Tm9kZTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlIGEgZ2l2ZW4gbGlzdGVuZXIgZnJvbSB0aGlzIGV2ZW50IHRhcmdldC5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnROYW1lIFRoZSBldmVudCBuYW1lIHRvIHJlbW92ZS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lciBUaGUgbGlzdGVuZXIgdG8gcmVtb3ZlLlxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbnx7Y2FwdHVyZT86Ym9vbGVhbixwYXNzaXZlPzpib29sZWFuLG9uY2U/OmJvb2xlYW59fSBbb3B0aW9uc10gVGhlIG9wdGlvbnMgZm9yIHRoaXMgbGlzdGVuZXIuXG4gICAgICogQHJldHVybnMge3ZvaWR9XG4gICAgICovXG4gICAgcmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGxpc3RlbmVyLCBvcHRpb25zKSB7XG4gICAgICAgIGlmIChsaXN0ZW5lciA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGxpc3RlbmVycyA9IGdldExpc3RlbmVycyh0aGlzKTtcbiAgICAgICAgY29uc3QgY2FwdHVyZSA9IGlzT2JqZWN0KG9wdGlvbnMpXG4gICAgICAgICAgICA/IEJvb2xlYW4ob3B0aW9ucy5jYXB0dXJlKVxuICAgICAgICAgICAgOiBCb29sZWFuKG9wdGlvbnMpO1xuICAgICAgICBjb25zdCBsaXN0ZW5lclR5cGUgPSBjYXB0dXJlID8gQ0FQVFVSRSA6IEJVQkJMRTtcblxuICAgICAgICBsZXQgcHJldiA9IG51bGw7XG4gICAgICAgIGxldCBub2RlID0gbGlzdGVuZXJzLmdldChldmVudE5hbWUpO1xuICAgICAgICB3aGlsZSAobm9kZSAhPSBudWxsKSB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgbm9kZS5saXN0ZW5lciA9PT0gbGlzdGVuZXIgJiZcbiAgICAgICAgICAgICAgICBub2RlLmxpc3RlbmVyVHlwZSA9PT0gbGlzdGVuZXJUeXBlXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBpZiAocHJldiAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBwcmV2Lm5leHQgPSBub2RlLm5leHQ7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChub2RlLm5leHQgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgbGlzdGVuZXJzLnNldChldmVudE5hbWUsIG5vZGUubmV4dCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbGlzdGVuZXJzLmRlbGV0ZShldmVudE5hbWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcHJldiA9IG5vZGU7XG4gICAgICAgICAgICBub2RlID0gbm9kZS5uZXh0O1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIERpc3BhdGNoIGEgZ2l2ZW4gZXZlbnQuXG4gICAgICogQHBhcmFtIHtFdmVudHx7dHlwZTpzdHJpbmd9fSBldmVudCBUaGUgZXZlbnQgdG8gZGlzcGF0Y2guXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IGBmYWxzZWAgaWYgY2FuY2VsZWQuXG4gICAgICovXG4gICAgZGlzcGF0Y2hFdmVudChldmVudCkge1xuICAgICAgICBpZiAoZXZlbnQgPT0gbnVsbCB8fCB0eXBlb2YgZXZlbnQudHlwZSAhPT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJldmVudC50eXBlXCIgc2hvdWxkIGJlIGEgc3RyaW5nLicpXG4gICAgICAgIH1cblxuICAgICAgICAvLyBJZiBsaXN0ZW5lcnMgYXJlbid0IHJlZ2lzdGVyZWQsIHRlcm1pbmF0ZS5cbiAgICAgICAgY29uc3QgbGlzdGVuZXJzID0gZ2V0TGlzdGVuZXJzKHRoaXMpO1xuICAgICAgICBjb25zdCBldmVudE5hbWUgPSBldmVudC50eXBlO1xuICAgICAgICBsZXQgbm9kZSA9IGxpc3RlbmVycy5nZXQoZXZlbnROYW1lKTtcbiAgICAgICAgaWYgKG5vZGUgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFNpbmNlIHdlIGNhbm5vdCByZXdyaXRlIHNldmVyYWwgcHJvcGVydGllcywgc28gd3JhcCBvYmplY3QuXG4gICAgICAgIGNvbnN0IHdyYXBwZWRFdmVudCA9IHdyYXBFdmVudCh0aGlzLCBldmVudCk7XG5cbiAgICAgICAgLy8gVGhpcyBkb2Vzbid0IHByb2Nlc3MgY2FwdHVyaW5nIHBoYXNlIGFuZCBidWJibGluZyBwaGFzZS5cbiAgICAgICAgLy8gVGhpcyBpc24ndCBwYXJ0aWNpcGF0aW5nIGluIGEgdHJlZS5cbiAgICAgICAgbGV0IHByZXYgPSBudWxsO1xuICAgICAgICB3aGlsZSAobm9kZSAhPSBudWxsKSB7XG4gICAgICAgICAgICAvLyBSZW1vdmUgdGhpcyBsaXN0ZW5lciBpZiBpdCdzIG9uY2VcbiAgICAgICAgICAgIGlmIChub2RlLm9uY2UpIHtcbiAgICAgICAgICAgICAgICBpZiAocHJldiAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBwcmV2Lm5leHQgPSBub2RlLm5leHQ7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChub2RlLm5leHQgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgbGlzdGVuZXJzLnNldChldmVudE5hbWUsIG5vZGUubmV4dCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbGlzdGVuZXJzLmRlbGV0ZShldmVudE5hbWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcHJldiA9IG5vZGU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIENhbGwgdGhpcyBsaXN0ZW5lclxuICAgICAgICAgICAgc2V0UGFzc2l2ZUxpc3RlbmVyKFxuICAgICAgICAgICAgICAgIHdyYXBwZWRFdmVudCxcbiAgICAgICAgICAgICAgICBub2RlLnBhc3NpdmUgPyBub2RlLmxpc3RlbmVyIDogbnVsbFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygbm9kZS5saXN0ZW5lciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5saXN0ZW5lci5jYWxsKHRoaXMsIHdyYXBwZWRFdmVudCk7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGVvZiBjb25zb2xlICE9PSBcInVuZGVmaW5lZFwiICYmXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlb2YgY29uc29sZS5lcnJvciA9PT0gXCJmdW5jdGlvblwiXG4gICAgICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgICAgICBub2RlLmxpc3RlbmVyVHlwZSAhPT0gQVRUUklCVVRFICYmXG4gICAgICAgICAgICAgICAgdHlwZW9mIG5vZGUubGlzdGVuZXIuaGFuZGxlRXZlbnQgPT09IFwiZnVuY3Rpb25cIlxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgbm9kZS5saXN0ZW5lci5oYW5kbGVFdmVudCh3cmFwcGVkRXZlbnQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBCcmVhayBpZiBgZXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uYCB3YXMgY2FsbGVkLlxuICAgICAgICAgICAgaWYgKGlzU3RvcHBlZCh3cmFwcGVkRXZlbnQpKSB7XG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbm9kZSA9IG5vZGUubmV4dDtcbiAgICAgICAgfVxuICAgICAgICBzZXRQYXNzaXZlTGlzdGVuZXIod3JhcHBlZEV2ZW50LCBudWxsKTtcbiAgICAgICAgc2V0RXZlbnRQaGFzZSh3cmFwcGVkRXZlbnQsIDApO1xuICAgICAgICBzZXRDdXJyZW50VGFyZ2V0KHdyYXBwZWRFdmVudCwgbnVsbCk7XG5cbiAgICAgICAgcmV0dXJuICF3cmFwcGVkRXZlbnQuZGVmYXVsdFByZXZlbnRlZFxuICAgIH0sXG59O1xuXG4vLyBgY29uc3RydWN0b3JgIGlzIG5vdCBlbnVtZXJhYmxlLlxuT2JqZWN0LmRlZmluZVByb3BlcnR5KEV2ZW50VGFyZ2V0LnByb3RvdHlwZSwgXCJjb25zdHJ1Y3RvclwiLCB7XG4gICAgdmFsdWU6IEV2ZW50VGFyZ2V0LFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICB3cml0YWJsZTogdHJ1ZSxcbn0pO1xuXG4vLyBFbnN1cmUgYGV2ZW50VGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkV2ZW50VGFyZ2V0YCBpcyBgdHJ1ZWAuXG5pZiAoXG4gICAgdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJlxuICAgIHR5cGVvZiB3aW5kb3cuRXZlbnRUYXJnZXQgIT09IFwidW5kZWZpbmVkXCJcbikge1xuICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZihFdmVudFRhcmdldC5wcm90b3R5cGUsIHdpbmRvdy5FdmVudFRhcmdldC5wcm90b3R5cGUpO1xufVxuXG5leHBvcnRzLmRlZmluZUV2ZW50QXR0cmlidXRlID0gZGVmaW5lRXZlbnRBdHRyaWJ1dGU7XG5leHBvcnRzLkV2ZW50VGFyZ2V0ID0gRXZlbnRUYXJnZXQ7XG5leHBvcnRzLmRlZmF1bHQgPSBFdmVudFRhcmdldDtcblxubW9kdWxlLmV4cG9ydHMgPSBFdmVudFRhcmdldFxubW9kdWxlLmV4cG9ydHMuRXZlbnRUYXJnZXQgPSBtb2R1bGUuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBFdmVudFRhcmdldFxubW9kdWxlLmV4cG9ydHMuZGVmaW5lRXZlbnRBdHRyaWJ1dGUgPSBkZWZpbmVFdmVudEF0dHJpYnV0ZVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZXZlbnQtdGFyZ2V0LXNoaW0uanMubWFwXG4iLCJjb25zdCB7UmVhZGFibGV9ID0gcmVxdWlyZSgnc3RyZWFtJyk7XG5cbi8qKlxuICogQHR5cGUge1dlYWtNYXA8QmxvYiwge3R5cGU6IHN0cmluZywgc2l6ZTogbnVtYmVyLCBwYXJ0czogKEJsb2IgfCBCdWZmZXIpW10gfT59XG4gKi9cbmNvbnN0IHdtID0gbmV3IFdlYWtNYXAoKTtcblxuYXN5bmMgZnVuY3Rpb24gKiByZWFkKHBhcnRzKSB7XG5cdGZvciAoY29uc3QgcGFydCBvZiBwYXJ0cykge1xuXHRcdGlmICgnc3RyZWFtJyBpbiBwYXJ0KSB7XG5cdFx0XHR5aWVsZCAqIHBhcnQuc3RyZWFtKCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHlpZWxkIHBhcnQ7XG5cdFx0fVxuXHR9XG59XG5cbmNsYXNzIEJsb2Ige1xuXHQvKipcblx0ICogVGhlIEJsb2IoKSBjb25zdHJ1Y3RvciByZXR1cm5zIGEgbmV3IEJsb2Igb2JqZWN0LiBUaGUgY29udGVudFxuXHQgKiBvZiB0aGUgYmxvYiBjb25zaXN0cyBvZiB0aGUgY29uY2F0ZW5hdGlvbiBvZiB0aGUgdmFsdWVzIGdpdmVuXG5cdCAqIGluIHRoZSBwYXJhbWV0ZXIgYXJyYXkuXG5cdCAqXG5cdCAqIEBwYXJhbSB7KEFycmF5QnVmZmVyTGlrZSB8IEFycmF5QnVmZmVyVmlldyB8IEJsb2IgfCBCdWZmZXIgfCBzdHJpbmcpW119IGJsb2JQYXJ0c1xuXHQgKiBAcGFyYW0ge3sgdHlwZT86IHN0cmluZyB9fSBbb3B0aW9uc11cblx0ICovXG5cdGNvbnN0cnVjdG9yKGJsb2JQYXJ0cyA9IFtdLCBvcHRpb25zID0ge30pIHtcblx0XHRsZXQgc2l6ZSA9IDA7XG5cblx0XHRjb25zdCBwYXJ0cyA9IGJsb2JQYXJ0cy5tYXAoZWxlbWVudCA9PiB7XG5cdFx0XHRsZXQgYnVmZmVyO1xuXHRcdFx0aWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBCdWZmZXIpIHtcblx0XHRcdFx0YnVmZmVyID0gZWxlbWVudDtcblx0XHRcdH0gZWxzZSBpZiAoQXJyYXlCdWZmZXIuaXNWaWV3KGVsZW1lbnQpKSB7XG5cdFx0XHRcdGJ1ZmZlciA9IEJ1ZmZlci5mcm9tKGVsZW1lbnQuYnVmZmVyLCBlbGVtZW50LmJ5dGVPZmZzZXQsIGVsZW1lbnQuYnl0ZUxlbmd0aCk7XG5cdFx0XHR9IGVsc2UgaWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikge1xuXHRcdFx0XHRidWZmZXIgPSBCdWZmZXIuZnJvbShlbGVtZW50KTtcblx0XHRcdH0gZWxzZSBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIEJsb2IpIHtcblx0XHRcdFx0YnVmZmVyID0gZWxlbWVudDtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGJ1ZmZlciA9IEJ1ZmZlci5mcm9tKHR5cGVvZiBlbGVtZW50ID09PSAnc3RyaW5nJyA/IGVsZW1lbnQgOiBTdHJpbmcoZWxlbWVudCkpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgdW5pY29ybi9leHBsaWNpdC1sZW5ndGgtY2hlY2tcblx0XHRcdHNpemUgKz0gYnVmZmVyLmxlbmd0aCB8fCBidWZmZXIuc2l6ZSB8fCAwO1xuXHRcdFx0cmV0dXJuIGJ1ZmZlcjtcblx0XHR9KTtcblxuXHRcdGNvbnN0IHR5cGUgPSBvcHRpb25zLnR5cGUgPT09IHVuZGVmaW5lZCA/ICcnIDogU3RyaW5nKG9wdGlvbnMudHlwZSkudG9Mb3dlckNhc2UoKTtcblxuXHRcdHdtLnNldCh0aGlzLCB7XG5cdFx0XHR0eXBlOiAvW15cXHUwMDIwLVxcdTAwN0VdLy50ZXN0KHR5cGUpID8gJycgOiB0eXBlLFxuXHRcdFx0c2l6ZSxcblx0XHRcdHBhcnRzXG5cdFx0fSk7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIEJsb2IgaW50ZXJmYWNlJ3Mgc2l6ZSBwcm9wZXJ0eSByZXR1cm5zIHRoZVxuXHQgKiBzaXplIG9mIHRoZSBCbG9iIGluIGJ5dGVzLlxuXHQgKi9cblx0Z2V0IHNpemUoKSB7XG5cdFx0cmV0dXJuIHdtLmdldCh0aGlzKS5zaXplO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSB0eXBlIHByb3BlcnR5IG9mIGEgQmxvYiBvYmplY3QgcmV0dXJucyB0aGUgTUlNRSB0eXBlIG9mIHRoZSBmaWxlLlxuXHQgKi9cblx0Z2V0IHR5cGUoKSB7XG5cdFx0cmV0dXJuIHdtLmdldCh0aGlzKS50eXBlO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSB0ZXh0KCkgbWV0aG9kIGluIHRoZSBCbG9iIGludGVyZmFjZSByZXR1cm5zIGEgUHJvbWlzZVxuXHQgKiB0aGF0IHJlc29sdmVzIHdpdGggYSBzdHJpbmcgY29udGFpbmluZyB0aGUgY29udGVudHMgb2Zcblx0ICogdGhlIGJsb2IsIGludGVycHJldGVkIGFzIFVURi04LlxuXHQgKlxuXHQgKiBAcmV0dXJuIHtQcm9taXNlPHN0cmluZz59XG5cdCAqL1xuXHRhc3luYyB0ZXh0KCkge1xuXHRcdHJldHVybiBCdWZmZXIuZnJvbShhd2FpdCB0aGlzLmFycmF5QnVmZmVyKCkpLnRvU3RyaW5nKCk7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIGFycmF5QnVmZmVyKCkgbWV0aG9kIGluIHRoZSBCbG9iIGludGVyZmFjZSByZXR1cm5zIGFcblx0ICogUHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIGNvbnRlbnRzIG9mIHRoZSBibG9iIGFzXG5cdCAqIGJpbmFyeSBkYXRhIGNvbnRhaW5lZCBpbiBhbiBBcnJheUJ1ZmZlci5cblx0ICpcblx0ICogQHJldHVybiB7UHJvbWlzZTxBcnJheUJ1ZmZlcj59XG5cdCAqL1xuXHRhc3luYyBhcnJheUJ1ZmZlcigpIHtcblx0XHRjb25zdCBkYXRhID0gbmV3IFVpbnQ4QXJyYXkodGhpcy5zaXplKTtcblx0XHRsZXQgb2Zmc2V0ID0gMDtcblx0XHRmb3IgYXdhaXQgKGNvbnN0IGNodW5rIG9mIHRoaXMuc3RyZWFtKCkpIHtcblx0XHRcdGRhdGEuc2V0KGNodW5rLCBvZmZzZXQpO1xuXHRcdFx0b2Zmc2V0ICs9IGNodW5rLmxlbmd0aDtcblx0XHR9XG5cblx0XHRyZXR1cm4gZGF0YS5idWZmZXI7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIEJsb2IgaW50ZXJmYWNlJ3Mgc3RyZWFtKCkgbWV0aG9kIGlzIGRpZmZlcmVuY2UgZnJvbSBuYXRpdmVcblx0ICogYW5kIHVzZXMgbm9kZSBzdHJlYW1zIGluc3RlYWQgb2Ygd2hhdHdnIHN0cmVhbXMuXG5cdCAqXG5cdCAqIEByZXR1cm5zIHtSZWFkYWJsZX0gTm9kZSByZWFkYWJsZSBzdHJlYW1cblx0ICovXG5cdHN0cmVhbSgpIHtcblx0XHRyZXR1cm4gUmVhZGFibGUuZnJvbShyZWFkKHdtLmdldCh0aGlzKS5wYXJ0cykpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSBCbG9iIGludGVyZmFjZSdzIHNsaWNlKCkgbWV0aG9kIGNyZWF0ZXMgYW5kIHJldHVybnMgYVxuXHQgKiBuZXcgQmxvYiBvYmplY3Qgd2hpY2ggY29udGFpbnMgZGF0YSBmcm9tIGEgc3Vic2V0IG9mIHRoZVxuXHQgKiBibG9iIG9uIHdoaWNoIGl0J3MgY2FsbGVkLlxuXHQgKlxuXHQgKiBAcGFyYW0ge251bWJlcn0gW3N0YXJ0XVxuXHQgKiBAcGFyYW0ge251bWJlcn0gW2VuZF1cblx0ICogQHBhcmFtIHtzdHJpbmd9IFt0eXBlXVxuXHQgKi9cblx0c2xpY2Uoc3RhcnQgPSAwLCBlbmQgPSB0aGlzLnNpemUsIHR5cGUgPSAnJykge1xuXHRcdGNvbnN0IHtzaXplfSA9IHRoaXM7XG5cblx0XHRsZXQgcmVsYXRpdmVTdGFydCA9IHN0YXJ0IDwgMCA/IE1hdGgubWF4KHNpemUgKyBzdGFydCwgMCkgOiBNYXRoLm1pbihzdGFydCwgc2l6ZSk7XG5cdFx0bGV0IHJlbGF0aXZlRW5kID0gZW5kIDwgMCA/IE1hdGgubWF4KHNpemUgKyBlbmQsIDApIDogTWF0aC5taW4oZW5kLCBzaXplKTtcblxuXHRcdGNvbnN0IHNwYW4gPSBNYXRoLm1heChyZWxhdGl2ZUVuZCAtIHJlbGF0aXZlU3RhcnQsIDApO1xuXHRcdGNvbnN0IHBhcnRzID0gd20uZ2V0KHRoaXMpLnBhcnRzLnZhbHVlcygpO1xuXHRcdGNvbnN0IGJsb2JQYXJ0cyA9IFtdO1xuXHRcdGxldCBhZGRlZCA9IDA7XG5cblx0XHRmb3IgKGNvbnN0IHBhcnQgb2YgcGFydHMpIHtcblx0XHRcdGNvbnN0IHNpemUgPSBBcnJheUJ1ZmZlci5pc1ZpZXcocGFydCkgPyBwYXJ0LmJ5dGVMZW5ndGggOiBwYXJ0LnNpemU7XG5cdFx0XHRpZiAocmVsYXRpdmVTdGFydCAmJiBzaXplIDw9IHJlbGF0aXZlU3RhcnQpIHtcblx0XHRcdFx0Ly8gU2tpcCB0aGUgYmVnaW5uaW5nIGFuZCBjaGFuZ2UgdGhlIHJlbGF0aXZlXG5cdFx0XHRcdC8vIHN0YXJ0ICYgZW5kIHBvc2l0aW9uIGFzIHdlIHNraXAgdGhlIHVud2FudGVkIHBhcnRzXG5cdFx0XHRcdHJlbGF0aXZlU3RhcnQgLT0gc2l6ZTtcblx0XHRcdFx0cmVsYXRpdmVFbmQgLT0gc2l6ZTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGNvbnN0IGNodW5rID0gcGFydC5zbGljZShyZWxhdGl2ZVN0YXJ0LCBNYXRoLm1pbihzaXplLCByZWxhdGl2ZUVuZCkpO1xuXHRcdFx0XHRibG9iUGFydHMucHVzaChjaHVuayk7XG5cdFx0XHRcdGFkZGVkICs9IEFycmF5QnVmZmVyLmlzVmlldyhjaHVuaykgPyBjaHVuay5ieXRlTGVuZ3RoIDogY2h1bmsuc2l6ZTtcblx0XHRcdFx0cmVsYXRpdmVTdGFydCA9IDA7IC8vIEFsbCBuZXh0IHNlcXVlbnRhbCBwYXJ0cyBzaG91bGQgc3RhcnQgYXQgMFxuXG5cdFx0XHRcdC8vIGRvbid0IGFkZCB0aGUgb3ZlcmZsb3cgdG8gbmV3IGJsb2JQYXJ0c1xuXHRcdFx0XHRpZiAoYWRkZWQgPj0gc3Bhbikge1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Y29uc3QgYmxvYiA9IG5ldyBCbG9iKFtdLCB7dHlwZTogU3RyaW5nKHR5cGUpLnRvTG93ZXJDYXNlKCl9KTtcblx0XHRPYmplY3QuYXNzaWduKHdtLmdldChibG9iKSwge3NpemU6IHNwYW4sIHBhcnRzOiBibG9iUGFydHN9KTtcblxuXHRcdHJldHVybiBibG9iO1xuXHR9XG5cblx0Z2V0IFtTeW1ib2wudG9TdHJpbmdUYWddKCkge1xuXHRcdHJldHVybiAnQmxvYic7XG5cdH1cblxuXHRzdGF0aWMgW1N5bWJvbC5oYXNJbnN0YW5jZV0ob2JqZWN0KSB7XG5cdFx0cmV0dXJuIChcblx0XHRcdG9iamVjdCAmJlxuXHRcdFx0dHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCcgJiZcblx0XHRcdHR5cGVvZiBvYmplY3Quc3RyZWFtID09PSAnZnVuY3Rpb24nICYmXG5cdFx0XHRvYmplY3Quc3RyZWFtLmxlbmd0aCA9PT0gMCAmJlxuXHRcdFx0dHlwZW9mIG9iamVjdC5jb25zdHJ1Y3RvciA9PT0gJ2Z1bmN0aW9uJyAmJlxuXHRcdFx0L14oQmxvYnxGaWxlKSQvLnRlc3Qob2JqZWN0W1N5bWJvbC50b1N0cmluZ1RhZ10pXG5cdFx0KTtcblx0fVxufVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyhCbG9iLnByb3RvdHlwZSwge1xuXHRzaXplOiB7ZW51bWVyYWJsZTogdHJ1ZX0sXG5cdHR5cGU6IHtlbnVtZXJhYmxlOiB0cnVlfSxcblx0c2xpY2U6IHtlbnVtZXJhYmxlOiB0cnVlfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gQmxvYjtcbiIsIid1c2Ugc3RyaWN0JztcbmNvbnN0IGZldGNoID0gcmVxdWlyZSgnbm9kZS1mZXRjaCcpO1xuY29uc3QgQWJvcnRDb250cm9sbGVyID0gcmVxdWlyZSgnYWJvcnQtY29udHJvbGxlcicpO1xuXG5jb25zdCBURU5fTUVHQUJZVEVTID0gMTAwMCAqIDEwMDAgKiAxMDtcblxuaWYgKCFnbG9iYWwuZmV0Y2gpIHtcblx0Z2xvYmFsLmZldGNoID0gKHVybCwgb3B0aW9ucykgPT4gZmV0Y2godXJsLCB7aGlnaFdhdGVyTWFyazogVEVOX01FR0FCWVRFUywgLi4ub3B0aW9uc30pO1xufVxuXG5pZiAoIWdsb2JhbC5IZWFkZXJzKSB7XG5cdGdsb2JhbC5IZWFkZXJzID0gZmV0Y2guSGVhZGVycztcbn1cblxuaWYgKCFnbG9iYWwuUmVxdWVzdCkge1xuXHRnbG9iYWwuUmVxdWVzdCA9IGZldGNoLlJlcXVlc3Q7XG59XG5cbmlmICghZ2xvYmFsLlJlc3BvbnNlKSB7XG5cdGdsb2JhbC5SZXNwb25zZSA9IGZldGNoLlJlc3BvbnNlO1xufVxuXG5pZiAoIWdsb2JhbC5BYm9ydENvbnRyb2xsZXIpIHtcblx0Z2xvYmFsLkFib3J0Q29udHJvbGxlciA9IEFib3J0Q29udHJvbGxlcjtcbn1cblxuaWYgKCFnbG9iYWwuUmVhZGFibGVTdHJlYW0pIHtcblx0dHJ5IHtcblx0XHRnbG9iYWwuUmVhZGFibGVTdHJlYW0gPSByZXF1aXJlKCd3ZWItc3RyZWFtcy1wb2x5ZmlsbC9wb255ZmlsbC9lczIwMTgnKTtcblx0fSBjYXRjaCAoXykge31cbn1cblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCdreS91bWQnKTtcbiIsIihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG5cdHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyA/IG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpIDpcblx0dHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kID8gZGVmaW5lKGZhY3RvcnkpIDpcblx0KGdsb2JhbCA9IHR5cGVvZiBnbG9iYWxUaGlzICE9PSAndW5kZWZpbmVkJyA/IGdsb2JhbFRoaXMgOiBnbG9iYWwgfHwgc2VsZiwgZ2xvYmFsLmt5ID0gZmFjdG9yeSgpKTtcbn0odGhpcywgKGZ1bmN0aW9uICgpIHsgJ3VzZSBzdHJpY3QnO1xuXG5cdC8qISBNSVQgTGljZW5zZSDCqSBTaW5kcmUgU29yaHVzICovXG5cblx0Y29uc3QgZ2xvYmFscyA9IHt9O1xuXG5cdGNvbnN0IGdldEdsb2JhbCA9IHByb3BlcnR5ID0+IHtcblx0XHQvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuXHRcdGlmICh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgJiYgc2VsZiAmJiBwcm9wZXJ0eSBpbiBzZWxmKSB7XG5cdFx0XHRyZXR1cm4gc2VsZjtcblx0XHR9XG5cblx0XHQvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cgJiYgcHJvcGVydHkgaW4gd2luZG93KSB7XG5cdFx0XHRyZXR1cm4gd2luZG93O1xuXHRcdH1cblxuXHRcdGlmICh0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJyAmJiBnbG9iYWwgJiYgcHJvcGVydHkgaW4gZ2xvYmFsKSB7XG5cdFx0XHRyZXR1cm4gZ2xvYmFsO1xuXHRcdH1cblxuXHRcdC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG5cdFx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzICE9PSAndW5kZWZpbmVkJyAmJiBnbG9iYWxUaGlzKSB7XG5cdFx0XHRyZXR1cm4gZ2xvYmFsVGhpcztcblx0XHR9XG5cdH07XG5cblx0Y29uc3QgZ2xvYmFsUHJvcGVydGllcyA9IFtcblx0XHQnSGVhZGVycycsXG5cdFx0J1JlcXVlc3QnLFxuXHRcdCdSZXNwb25zZScsXG5cdFx0J1JlYWRhYmxlU3RyZWFtJyxcblx0XHQnZmV0Y2gnLFxuXHRcdCdBYm9ydENvbnRyb2xsZXInLFxuXHRcdCdGb3JtRGF0YSdcblx0XTtcblxuXHRmb3IgKGNvbnN0IHByb3BlcnR5IG9mIGdsb2JhbFByb3BlcnRpZXMpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZ2xvYmFscywgcHJvcGVydHksIHtcblx0XHRcdGdldCgpIHtcblx0XHRcdFx0Y29uc3QgZ2xvYmFsT2JqZWN0ID0gZ2V0R2xvYmFsKHByb3BlcnR5KTtcblx0XHRcdFx0Y29uc3QgdmFsdWUgPSBnbG9iYWxPYmplY3QgJiYgZ2xvYmFsT2JqZWN0W3Byb3BlcnR5XTtcblx0XHRcdFx0cmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJyA/IHZhbHVlLmJpbmQoZ2xvYmFsT2JqZWN0KSA6IHZhbHVlO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0Y29uc3QgaXNPYmplY3QgPSB2YWx1ZSA9PiB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnO1xuXHRjb25zdCBzdXBwb3J0c0Fib3J0Q29udHJvbGxlciA9IHR5cGVvZiBnbG9iYWxzLkFib3J0Q29udHJvbGxlciA9PT0gJ2Z1bmN0aW9uJztcblx0Y29uc3Qgc3VwcG9ydHNTdHJlYW1zID0gdHlwZW9mIGdsb2JhbHMuUmVhZGFibGVTdHJlYW0gPT09ICdmdW5jdGlvbic7XG5cdGNvbnN0IHN1cHBvcnRzRm9ybURhdGEgPSB0eXBlb2YgZ2xvYmFscy5Gb3JtRGF0YSA9PT0gJ2Z1bmN0aW9uJztcblxuXHRjb25zdCBtZXJnZUhlYWRlcnMgPSAoc291cmNlMSwgc291cmNlMikgPT4ge1xuXHRcdGNvbnN0IHJlc3VsdCA9IG5ldyBnbG9iYWxzLkhlYWRlcnMoc291cmNlMSB8fCB7fSk7XG5cdFx0Y29uc3QgaXNIZWFkZXJzSW5zdGFuY2UgPSBzb3VyY2UyIGluc3RhbmNlb2YgZ2xvYmFscy5IZWFkZXJzO1xuXHRcdGNvbnN0IHNvdXJjZSA9IG5ldyBnbG9iYWxzLkhlYWRlcnMoc291cmNlMiB8fCB7fSk7XG5cblx0XHRmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBzb3VyY2UpIHtcblx0XHRcdGlmICgoaXNIZWFkZXJzSW5zdGFuY2UgJiYgdmFsdWUgPT09ICd1bmRlZmluZWQnKSB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdHJlc3VsdC5kZWxldGUoa2V5KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJlc3VsdC5zZXQoa2V5LCB2YWx1ZSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fTtcblxuXHRjb25zdCBkZWVwTWVyZ2UgPSAoLi4uc291cmNlcykgPT4ge1xuXHRcdGxldCByZXR1cm5WYWx1ZSA9IHt9O1xuXHRcdGxldCBoZWFkZXJzID0ge307XG5cblx0XHRmb3IgKGNvbnN0IHNvdXJjZSBvZiBzb3VyY2VzKSB7XG5cdFx0XHRpZiAoQXJyYXkuaXNBcnJheShzb3VyY2UpKSB7XG5cdFx0XHRcdGlmICghKEFycmF5LmlzQXJyYXkocmV0dXJuVmFsdWUpKSkge1xuXHRcdFx0XHRcdHJldHVyblZhbHVlID0gW107XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm5WYWx1ZSA9IFsuLi5yZXR1cm5WYWx1ZSwgLi4uc291cmNlXTtcblx0XHRcdH0gZWxzZSBpZiAoaXNPYmplY3Qoc291cmNlKSkge1xuXHRcdFx0XHRmb3IgKGxldCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMoc291cmNlKSkge1xuXHRcdFx0XHRcdGlmIChpc09iamVjdCh2YWx1ZSkgJiYgKGtleSBpbiByZXR1cm5WYWx1ZSkpIHtcblx0XHRcdFx0XHRcdHZhbHVlID0gZGVlcE1lcmdlKHJldHVyblZhbHVlW2tleV0sIHZhbHVlKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRyZXR1cm5WYWx1ZSA9IHsuLi5yZXR1cm5WYWx1ZSwgW2tleV06IHZhbHVlfTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChpc09iamVjdChzb3VyY2UuaGVhZGVycykpIHtcblx0XHRcdFx0XHRoZWFkZXJzID0gbWVyZ2VIZWFkZXJzKGhlYWRlcnMsIHNvdXJjZS5oZWFkZXJzKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm5WYWx1ZS5oZWFkZXJzID0gaGVhZGVycztcblx0XHR9XG5cblx0XHRyZXR1cm4gcmV0dXJuVmFsdWU7XG5cdH07XG5cblx0Y29uc3QgcmVxdWVzdE1ldGhvZHMgPSBbXG5cdFx0J2dldCcsXG5cdFx0J3Bvc3QnLFxuXHRcdCdwdXQnLFxuXHRcdCdwYXRjaCcsXG5cdFx0J2hlYWQnLFxuXHRcdCdkZWxldGUnXG5cdF07XG5cblx0Y29uc3QgcmVzcG9uc2VUeXBlcyA9IHtcblx0XHRqc29uOiAnYXBwbGljYXRpb24vanNvbicsXG5cdFx0dGV4dDogJ3RleHQvKicsXG5cdFx0Zm9ybURhdGE6ICdtdWx0aXBhcnQvZm9ybS1kYXRhJyxcblx0XHRhcnJheUJ1ZmZlcjogJyovKicsXG5cdFx0YmxvYjogJyovKidcblx0fTtcblxuXHRjb25zdCByZXRyeU1ldGhvZHMgPSBbXG5cdFx0J2dldCcsXG5cdFx0J3B1dCcsXG5cdFx0J2hlYWQnLFxuXHRcdCdkZWxldGUnLFxuXHRcdCdvcHRpb25zJyxcblx0XHQndHJhY2UnXG5cdF07XG5cblx0Y29uc3QgcmV0cnlTdGF0dXNDb2RlcyA9IFtcblx0XHQ0MDgsXG5cdFx0NDEzLFxuXHRcdDQyOSxcblx0XHQ1MDAsXG5cdFx0NTAyLFxuXHRcdDUwMyxcblx0XHQ1MDRcblx0XTtcblxuXHRjb25zdCByZXRyeUFmdGVyU3RhdHVzQ29kZXMgPSBbXG5cdFx0NDEzLFxuXHRcdDQyOSxcblx0XHQ1MDNcblx0XTtcblxuXHRjb25zdCBzdG9wID0gU3ltYm9sKCdzdG9wJyk7XG5cblx0Y2xhc3MgSFRUUEVycm9yIGV4dGVuZHMgRXJyb3Ige1xuXHRcdGNvbnN0cnVjdG9yKHJlc3BvbnNlKSB7XG5cdFx0XHQvLyBTZXQgdGhlIG1lc3NhZ2UgdG8gdGhlIHN0YXR1cyB0ZXh0LCBzdWNoIGFzIFVuYXV0aG9yaXplZCxcblx0XHRcdC8vIHdpdGggc29tZSBmYWxsYmFja3MuIFRoaXMgbWVzc2FnZSBzaG91bGQgbmV2ZXIgYmUgdW5kZWZpbmVkLlxuXHRcdFx0c3VwZXIoXG5cdFx0XHRcdHJlc3BvbnNlLnN0YXR1c1RleHQgfHxcblx0XHRcdFx0U3RyaW5nKFxuXHRcdFx0XHRcdChyZXNwb25zZS5zdGF0dXMgPT09IDAgfHwgcmVzcG9uc2Uuc3RhdHVzKSA/XG5cdFx0XHRcdFx0XHRyZXNwb25zZS5zdGF0dXMgOiAnVW5rbm93biByZXNwb25zZSBlcnJvcidcblx0XHRcdFx0KVxuXHRcdFx0KTtcblx0XHRcdHRoaXMubmFtZSA9ICdIVFRQRXJyb3InO1xuXHRcdFx0dGhpcy5yZXNwb25zZSA9IHJlc3BvbnNlO1xuXHRcdH1cblx0fVxuXG5cdGNsYXNzIFRpbWVvdXRFcnJvciBleHRlbmRzIEVycm9yIHtcblx0XHRjb25zdHJ1Y3RvcihyZXF1ZXN0KSB7XG5cdFx0XHRzdXBlcignUmVxdWVzdCB0aW1lZCBvdXQnKTtcblx0XHRcdHRoaXMubmFtZSA9ICdUaW1lb3V0RXJyb3InO1xuXHRcdFx0dGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcblx0XHR9XG5cdH1cblxuXHRjb25zdCBkZWxheSA9IG1zID0+IG5ldyBQcm9taXNlKHJlc29sdmUgPT4gc2V0VGltZW91dChyZXNvbHZlLCBtcykpO1xuXG5cdC8vIGBQcm9taXNlLnJhY2UoKWAgd29ya2Fyb3VuZCAoIzkxKVxuXHRjb25zdCB0aW1lb3V0ID0gKHJlcXVlc3QsIGFib3J0Q29udHJvbGxlciwgb3B0aW9ucykgPT5cblx0XHRuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRjb25zdCB0aW1lb3V0SUQgPSBzZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdFx0aWYgKGFib3J0Q29udHJvbGxlcikge1xuXHRcdFx0XHRcdGFib3J0Q29udHJvbGxlci5hYm9ydCgpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmVqZWN0KG5ldyBUaW1lb3V0RXJyb3IocmVxdWVzdCkpO1xuXHRcdFx0fSwgb3B0aW9ucy50aW1lb3V0KTtcblxuXHRcdFx0LyogZXNsaW50LWRpc2FibGUgcHJvbWlzZS9wcmVmZXItYXdhaXQtdG8tdGhlbiAqL1xuXHRcdFx0b3B0aW9ucy5mZXRjaChyZXF1ZXN0KVxuXHRcdFx0XHQudGhlbihyZXNvbHZlKVxuXHRcdFx0XHQuY2F0Y2gocmVqZWN0KVxuXHRcdFx0XHQudGhlbigoKSA9PiB7XG5cdFx0XHRcdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXRJRCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0LyogZXNsaW50LWVuYWJsZSBwcm9taXNlL3ByZWZlci1hd2FpdC10by10aGVuICovXG5cdFx0fSk7XG5cblx0Y29uc3Qgbm9ybWFsaXplUmVxdWVzdE1ldGhvZCA9IGlucHV0ID0+IHJlcXVlc3RNZXRob2RzLmluY2x1ZGVzKGlucHV0KSA/IGlucHV0LnRvVXBwZXJDYXNlKCkgOiBpbnB1dDtcblxuXHRjb25zdCBkZWZhdWx0UmV0cnlPcHRpb25zID0ge1xuXHRcdGxpbWl0OiAyLFxuXHRcdG1ldGhvZHM6IHJldHJ5TWV0aG9kcyxcblx0XHRzdGF0dXNDb2RlczogcmV0cnlTdGF0dXNDb2Rlcyxcblx0XHRhZnRlclN0YXR1c0NvZGVzOiByZXRyeUFmdGVyU3RhdHVzQ29kZXNcblx0fTtcblxuXHRjb25zdCBub3JtYWxpemVSZXRyeU9wdGlvbnMgPSAocmV0cnkgPSB7fSkgPT4ge1xuXHRcdGlmICh0eXBlb2YgcmV0cnkgPT09ICdudW1iZXInKSB7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHQuLi5kZWZhdWx0UmV0cnlPcHRpb25zLFxuXHRcdFx0XHRsaW1pdDogcmV0cnlcblx0XHRcdH07XG5cdFx0fVxuXG5cdFx0aWYgKHJldHJ5Lm1ldGhvZHMgJiYgIUFycmF5LmlzQXJyYXkocmV0cnkubWV0aG9kcykpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcigncmV0cnkubWV0aG9kcyBtdXN0IGJlIGFuIGFycmF5Jyk7XG5cdFx0fVxuXG5cdFx0aWYgKHJldHJ5LnN0YXR1c0NvZGVzICYmICFBcnJheS5pc0FycmF5KHJldHJ5LnN0YXR1c0NvZGVzKSkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdyZXRyeS5zdGF0dXNDb2RlcyBtdXN0IGJlIGFuIGFycmF5Jyk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHtcblx0XHRcdC4uLmRlZmF1bHRSZXRyeU9wdGlvbnMsXG5cdFx0XHQuLi5yZXRyeSxcblx0XHRcdGFmdGVyU3RhdHVzQ29kZXM6IHJldHJ5QWZ0ZXJTdGF0dXNDb2Rlc1xuXHRcdH07XG5cdH07XG5cblx0Ly8gVGhlIG1heGltdW0gdmFsdWUgb2YgYSAzMmJpdCBpbnQgKHNlZSBpc3N1ZSAjMTE3KVxuXHRjb25zdCBtYXhTYWZlVGltZW91dCA9IDIxNDc0ODM2NDc7XG5cblx0Y2xhc3MgS3kge1xuXHRcdGNvbnN0cnVjdG9yKGlucHV0LCBvcHRpb25zID0ge30pIHtcblx0XHRcdHRoaXMuX3JldHJ5Q291bnQgPSAwO1xuXHRcdFx0dGhpcy5faW5wdXQgPSBpbnB1dDtcblx0XHRcdHRoaXMuX29wdGlvbnMgPSB7XG5cdFx0XHRcdC8vIFRPRE86IGNyZWRlbnRpYWxzIGNhbiBiZSByZW1vdmVkIHdoZW4gdGhlIHNwZWMgY2hhbmdlIGlzIGltcGxlbWVudGVkIGluIGFsbCBicm93c2Vycy4gQ29udGV4dDogaHR0cHM6Ly93d3cuY2hyb21lc3RhdHVzLmNvbS9mZWF0dXJlLzQ1Mzk0NzMzMTIzNTAyMDhcblx0XHRcdFx0Y3JlZGVudGlhbHM6IHRoaXMuX2lucHV0LmNyZWRlbnRpYWxzIHx8ICdzYW1lLW9yaWdpbicsXG5cdFx0XHRcdC4uLm9wdGlvbnMsXG5cdFx0XHRcdGhlYWRlcnM6IG1lcmdlSGVhZGVycyh0aGlzLl9pbnB1dC5oZWFkZXJzLCBvcHRpb25zLmhlYWRlcnMpLFxuXHRcdFx0XHRob29rczogZGVlcE1lcmdlKHtcblx0XHRcdFx0XHRiZWZvcmVSZXF1ZXN0OiBbXSxcblx0XHRcdFx0XHRiZWZvcmVSZXRyeTogW10sXG5cdFx0XHRcdFx0YWZ0ZXJSZXNwb25zZTogW11cblx0XHRcdFx0fSwgb3B0aW9ucy5ob29rcyksXG5cdFx0XHRcdG1ldGhvZDogbm9ybWFsaXplUmVxdWVzdE1ldGhvZChvcHRpb25zLm1ldGhvZCB8fCB0aGlzLl9pbnB1dC5tZXRob2QpLFxuXHRcdFx0XHRwcmVmaXhVcmw6IFN0cmluZyhvcHRpb25zLnByZWZpeFVybCB8fCAnJyksXG5cdFx0XHRcdHJldHJ5OiBub3JtYWxpemVSZXRyeU9wdGlvbnMob3B0aW9ucy5yZXRyeSksXG5cdFx0XHRcdHRocm93SHR0cEVycm9yczogb3B0aW9ucy50aHJvd0h0dHBFcnJvcnMgIT09IGZhbHNlLFxuXHRcdFx0XHR0aW1lb3V0OiB0eXBlb2Ygb3B0aW9ucy50aW1lb3V0ID09PSAndW5kZWZpbmVkJyA/IDEwMDAwIDogb3B0aW9ucy50aW1lb3V0LFxuXHRcdFx0XHRmZXRjaDogb3B0aW9ucy5mZXRjaCB8fCBnbG9iYWxzLmZldGNoXG5cdFx0XHR9O1xuXG5cdFx0XHRpZiAodHlwZW9mIHRoaXMuX2lucHV0ICE9PSAnc3RyaW5nJyAmJiAhKHRoaXMuX2lucHV0IGluc3RhbmNlb2YgVVJMIHx8IHRoaXMuX2lucHV0IGluc3RhbmNlb2YgZ2xvYmFscy5SZXF1ZXN0KSkge1xuXHRcdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdgaW5wdXRgIG11c3QgYmUgYSBzdHJpbmcsIFVSTCwgb3IgUmVxdWVzdCcpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAodGhpcy5fb3B0aW9ucy5wcmVmaXhVcmwgJiYgdHlwZW9mIHRoaXMuX2lucHV0ID09PSAnc3RyaW5nJykge1xuXHRcdFx0XHRpZiAodGhpcy5faW5wdXQuc3RhcnRzV2l0aCgnLycpKSB7XG5cdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdgaW5wdXRgIG11c3Qgbm90IGJlZ2luIHdpdGggYSBzbGFzaCB3aGVuIHVzaW5nIGBwcmVmaXhVcmxgJyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoIXRoaXMuX29wdGlvbnMucHJlZml4VXJsLmVuZHNXaXRoKCcvJykpIHtcblx0XHRcdFx0XHR0aGlzLl9vcHRpb25zLnByZWZpeFVybCArPSAnLyc7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0aGlzLl9pbnB1dCA9IHRoaXMuX29wdGlvbnMucHJlZml4VXJsICsgdGhpcy5faW5wdXQ7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChzdXBwb3J0c0Fib3J0Q29udHJvbGxlcikge1xuXHRcdFx0XHR0aGlzLmFib3J0Q29udHJvbGxlciA9IG5ldyBnbG9iYWxzLkFib3J0Q29udHJvbGxlcigpO1xuXHRcdFx0XHRpZiAodGhpcy5fb3B0aW9ucy5zaWduYWwpIHtcblx0XHRcdFx0XHR0aGlzLl9vcHRpb25zLnNpZ25hbC5hZGRFdmVudExpc3RlbmVyKCdhYm9ydCcsICgpID0+IHtcblx0XHRcdFx0XHRcdHRoaXMuYWJvcnRDb250cm9sbGVyLmFib3J0KCk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0aGlzLl9vcHRpb25zLnNpZ25hbCA9IHRoaXMuYWJvcnRDb250cm9sbGVyLnNpZ25hbDtcblx0XHRcdH1cblxuXHRcdFx0dGhpcy5yZXF1ZXN0ID0gbmV3IGdsb2JhbHMuUmVxdWVzdCh0aGlzLl9pbnB1dCwgdGhpcy5fb3B0aW9ucyk7XG5cblx0XHRcdGlmICh0aGlzLl9vcHRpb25zLnNlYXJjaFBhcmFtcykge1xuXHRcdFx0XHRjb25zdCBzZWFyY2hQYXJhbXMgPSAnPycgKyBuZXcgVVJMU2VhcmNoUGFyYW1zKHRoaXMuX29wdGlvbnMuc2VhcmNoUGFyYW1zKS50b1N0cmluZygpO1xuXHRcdFx0XHRjb25zdCB1cmwgPSB0aGlzLnJlcXVlc3QudXJsLnJlcGxhY2UoLyg/OlxcPy4qPyk/KD89I3wkKS8sIHNlYXJjaFBhcmFtcyk7XG5cblx0XHRcdFx0Ly8gVG8gcHJvdmlkZSBjb3JyZWN0IGZvcm0gYm91bmRhcnksIENvbnRlbnQtVHlwZSBoZWFkZXIgc2hvdWxkIGJlIGRlbGV0ZWQgZWFjaCB0aW1lIHdoZW4gbmV3IFJlcXVlc3QgaW5zdGFudGlhdGVkIGZyb20gYW5vdGhlciBvbmVcblx0XHRcdFx0aWYgKCgoc3VwcG9ydHNGb3JtRGF0YSAmJiB0aGlzLl9vcHRpb25zLmJvZHkgaW5zdGFuY2VvZiBnbG9iYWxzLkZvcm1EYXRhKSB8fCB0aGlzLl9vcHRpb25zLmJvZHkgaW5zdGFuY2VvZiBVUkxTZWFyY2hQYXJhbXMpICYmICEodGhpcy5fb3B0aW9ucy5oZWFkZXJzICYmIHRoaXMuX29wdGlvbnMuaGVhZGVyc1snY29udGVudC10eXBlJ10pKSB7XG5cdFx0XHRcdFx0dGhpcy5yZXF1ZXN0LmhlYWRlcnMuZGVsZXRlKCdjb250ZW50LXR5cGUnKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHRoaXMucmVxdWVzdCA9IG5ldyBnbG9iYWxzLlJlcXVlc3QobmV3IGdsb2JhbHMuUmVxdWVzdCh1cmwsIHRoaXMucmVxdWVzdCksIHRoaXMuX29wdGlvbnMpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAodGhpcy5fb3B0aW9ucy5qc29uICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0dGhpcy5fb3B0aW9ucy5ib2R5ID0gSlNPTi5zdHJpbmdpZnkodGhpcy5fb3B0aW9ucy5qc29uKTtcblx0XHRcdFx0dGhpcy5yZXF1ZXN0LmhlYWRlcnMuc2V0KCdjb250ZW50LXR5cGUnLCAnYXBwbGljYXRpb24vanNvbicpO1xuXHRcdFx0XHR0aGlzLnJlcXVlc3QgPSBuZXcgZ2xvYmFscy5SZXF1ZXN0KHRoaXMucmVxdWVzdCwge2JvZHk6IHRoaXMuX29wdGlvbnMuYm9keX0pO1xuXHRcdFx0fVxuXG5cdFx0XHRjb25zdCBmbiA9IGFzeW5jICgpID0+IHtcblx0XHRcdFx0aWYgKHRoaXMuX29wdGlvbnMudGltZW91dCA+IG1heFNhZmVUaW1lb3V0KSB7XG5cdFx0XHRcdFx0dGhyb3cgbmV3IFJhbmdlRXJyb3IoYFRoZSBcXGB0aW1lb3V0XFxgIG9wdGlvbiBjYW5ub3QgYmUgZ3JlYXRlciB0aGFuICR7bWF4U2FmZVRpbWVvdXR9YCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRhd2FpdCBkZWxheSgxKTtcblx0XHRcdFx0bGV0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5fZmV0Y2goKTtcblxuXHRcdFx0XHRmb3IgKGNvbnN0IGhvb2sgb2YgdGhpcy5fb3B0aW9ucy5ob29rcy5hZnRlclJlc3BvbnNlKSB7XG5cdFx0XHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWF3YWl0LWluLWxvb3Bcblx0XHRcdFx0XHRjb25zdCBtb2RpZmllZFJlc3BvbnNlID0gYXdhaXQgaG9vayhcblx0XHRcdFx0XHRcdHRoaXMucmVxdWVzdCxcblx0XHRcdFx0XHRcdHRoaXMuX29wdGlvbnMsXG5cdFx0XHRcdFx0XHR0aGlzLl9kZWNvcmF0ZVJlc3BvbnNlKHJlc3BvbnNlLmNsb25lKCkpXG5cdFx0XHRcdFx0KTtcblxuXHRcdFx0XHRcdGlmIChtb2RpZmllZFJlc3BvbnNlIGluc3RhbmNlb2YgZ2xvYmFscy5SZXNwb25zZSkge1xuXHRcdFx0XHRcdFx0cmVzcG9uc2UgPSBtb2RpZmllZFJlc3BvbnNlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdHRoaXMuX2RlY29yYXRlUmVzcG9uc2UocmVzcG9uc2UpO1xuXG5cdFx0XHRcdGlmICghcmVzcG9uc2Uub2sgJiYgdGhpcy5fb3B0aW9ucy50aHJvd0h0dHBFcnJvcnMpIHtcblx0XHRcdFx0XHR0aHJvdyBuZXcgSFRUUEVycm9yKHJlc3BvbnNlKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIElmIGBvbkRvd25sb2FkUHJvZ3Jlc3NgIGlzIHBhc3NlZCwgaXQgdXNlcyB0aGUgc3RyZWFtIEFQSSBpbnRlcm5hbGx5XG5cdFx0XHRcdC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG5cdFx0XHRcdGlmICh0aGlzLl9vcHRpb25zLm9uRG93bmxvYWRQcm9ncmVzcykge1xuXHRcdFx0XHRcdGlmICh0eXBlb2YgdGhpcy5fb3B0aW9ucy5vbkRvd25sb2FkUHJvZ3Jlc3MgIT09ICdmdW5jdGlvbicpIHtcblx0XHRcdFx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBgb25Eb3dubG9hZFByb2dyZXNzYCBvcHRpb24gbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYgKCFzdXBwb3J0c1N0cmVhbXMpIHtcblx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcignU3RyZWFtcyBhcmUgbm90IHN1cHBvcnRlZCBpbiB5b3VyIGVudmlyb25tZW50LiBgUmVhZGFibGVTdHJlYW1gIGlzIG1pc3NpbmcuJyk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMuX3N0cmVhbShyZXNwb25zZS5jbG9uZSgpLCB0aGlzLl9vcHRpb25zLm9uRG93bmxvYWRQcm9ncmVzcyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gcmVzcG9uc2U7XG5cdFx0XHR9O1xuXG5cdFx0XHRjb25zdCBpc1JldHJpYWJsZU1ldGhvZCA9IHRoaXMuX29wdGlvbnMucmV0cnkubWV0aG9kcy5pbmNsdWRlcyh0aGlzLnJlcXVlc3QubWV0aG9kLnRvTG93ZXJDYXNlKCkpO1xuXHRcdFx0Y29uc3QgcmVzdWx0ID0gaXNSZXRyaWFibGVNZXRob2QgPyB0aGlzLl9yZXRyeShmbikgOiBmbigpO1xuXG5cdFx0XHRmb3IgKGNvbnN0IFt0eXBlLCBtaW1lVHlwZV0gb2YgT2JqZWN0LmVudHJpZXMocmVzcG9uc2VUeXBlcykpIHtcblx0XHRcdFx0cmVzdWx0W3R5cGVdID0gYXN5bmMgKCkgPT4ge1xuXHRcdFx0XHRcdHRoaXMucmVxdWVzdC5oZWFkZXJzLnNldCgnYWNjZXB0JywgdGhpcy5yZXF1ZXN0LmhlYWRlcnMuZ2V0KCdhY2NlcHQnKSB8fCBtaW1lVHlwZSk7XG5cblx0XHRcdFx0XHRjb25zdCByZXNwb25zZSA9IChhd2FpdCByZXN1bHQpLmNsb25lKCk7XG5cblx0XHRcdFx0XHRpZiAodHlwZSA9PT0gJ2pzb24nKSB7XG5cdFx0XHRcdFx0XHRpZiAocmVzcG9uc2Uuc3RhdHVzID09PSAyMDQpIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuICcnO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5wYXJzZUpzb24pIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIG9wdGlvbnMucGFyc2VKc29uKGF3YWl0IHJlc3BvbnNlLnRleHQoKSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0cmV0dXJuIHJlc3BvbnNlW3R5cGVdKCk7XG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fVxuXG5cdFx0X2NhbGN1bGF0ZVJldHJ5RGVsYXkoZXJyb3IpIHtcblx0XHRcdHRoaXMuX3JldHJ5Q291bnQrKztcblxuXHRcdFx0aWYgKHRoaXMuX3JldHJ5Q291bnQgPCB0aGlzLl9vcHRpb25zLnJldHJ5LmxpbWl0ICYmICEoZXJyb3IgaW5zdGFuY2VvZiBUaW1lb3V0RXJyb3IpKSB7XG5cdFx0XHRcdGlmIChlcnJvciBpbnN0YW5jZW9mIEhUVFBFcnJvcikge1xuXHRcdFx0XHRcdGlmICghdGhpcy5fb3B0aW9ucy5yZXRyeS5zdGF0dXNDb2Rlcy5pbmNsdWRlcyhlcnJvci5yZXNwb25zZS5zdGF0dXMpKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gMDtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRjb25zdCByZXRyeUFmdGVyID0gZXJyb3IucmVzcG9uc2UuaGVhZGVycy5nZXQoJ1JldHJ5LUFmdGVyJyk7XG5cdFx0XHRcdFx0aWYgKHJldHJ5QWZ0ZXIgJiYgdGhpcy5fb3B0aW9ucy5yZXRyeS5hZnRlclN0YXR1c0NvZGVzLmluY2x1ZGVzKGVycm9yLnJlc3BvbnNlLnN0YXR1cykpIHtcblx0XHRcdFx0XHRcdGxldCBhZnRlciA9IE51bWJlcihyZXRyeUFmdGVyKTtcblx0XHRcdFx0XHRcdGlmIChOdW1iZXIuaXNOYU4oYWZ0ZXIpKSB7XG5cdFx0XHRcdFx0XHRcdGFmdGVyID0gRGF0ZS5wYXJzZShyZXRyeUFmdGVyKSAtIERhdGUubm93KCk7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRhZnRlciAqPSAxMDAwO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRpZiAodHlwZW9mIHRoaXMuX29wdGlvbnMucmV0cnkubWF4UmV0cnlBZnRlciAhPT0gJ3VuZGVmaW5lZCcgJiYgYWZ0ZXIgPiB0aGlzLl9vcHRpb25zLnJldHJ5Lm1heFJldHJ5QWZ0ZXIpIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIDA7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdHJldHVybiBhZnRlcjtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAoZXJyb3IucmVzcG9uc2Uuc3RhdHVzID09PSA0MTMpIHtcblx0XHRcdFx0XHRcdHJldHVybiAwO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdGNvbnN0IEJBQ0tPRkZfRkFDVE9SID0gMC4zO1xuXHRcdFx0XHRyZXR1cm4gQkFDS09GRl9GQUNUT1IgKiAoMiAqKiAodGhpcy5fcmV0cnlDb3VudCAtIDEpKSAqIDEwMDA7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiAwO1xuXHRcdH1cblxuXHRcdF9kZWNvcmF0ZVJlc3BvbnNlKHJlc3BvbnNlKSB7XG5cdFx0XHRpZiAodGhpcy5fb3B0aW9ucy5wYXJzZUpzb24pIHtcblx0XHRcdFx0cmVzcG9uc2UuanNvbiA9IGFzeW5jICgpID0+IHtcblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5fb3B0aW9ucy5wYXJzZUpzb24oYXdhaXQgcmVzcG9uc2UudGV4dCgpKTtcblx0XHRcdFx0fTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHJlc3BvbnNlO1xuXHRcdH1cblxuXHRcdGFzeW5jIF9yZXRyeShmbikge1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0cmV0dXJuIGF3YWl0IGZuKCk7XG5cdFx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0XHRjb25zdCBtcyA9IE1hdGgubWluKHRoaXMuX2NhbGN1bGF0ZVJldHJ5RGVsYXkoZXJyb3IpLCBtYXhTYWZlVGltZW91dCk7XG5cdFx0XHRcdGlmIChtcyAhPT0gMCAmJiB0aGlzLl9yZXRyeUNvdW50ID4gMCkge1xuXHRcdFx0XHRcdGF3YWl0IGRlbGF5KG1zKTtcblxuXHRcdFx0XHRcdGZvciAoY29uc3QgaG9vayBvZiB0aGlzLl9vcHRpb25zLmhvb2tzLmJlZm9yZVJldHJ5KSB7XG5cdFx0XHRcdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYXdhaXQtaW4tbG9vcFxuXHRcdFx0XHRcdFx0Y29uc3QgaG9va1Jlc3VsdCA9IGF3YWl0IGhvb2soe1xuXHRcdFx0XHRcdFx0XHRyZXF1ZXN0OiB0aGlzLnJlcXVlc3QsXG5cdFx0XHRcdFx0XHRcdG9wdGlvbnM6IHRoaXMuX29wdGlvbnMsXG5cdFx0XHRcdFx0XHRcdGVycm9yLFxuXHRcdFx0XHRcdFx0XHRyZXRyeUNvdW50OiB0aGlzLl9yZXRyeUNvdW50XG5cdFx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdFx0Ly8gSWYgYHN0b3BgIGlzIHJldHVybmVkIGZyb20gdGhlIGhvb2ssIHRoZSByZXRyeSBwcm9jZXNzIGlzIHN0b3BwZWRcblx0XHRcdFx0XHRcdGlmIChob29rUmVzdWx0ID09PSBzdG9wKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5fcmV0cnkoZm4pO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKHRoaXMuX29wdGlvbnMudGhyb3dIdHRwRXJyb3JzKSB7XG5cdFx0XHRcdFx0dGhyb3cgZXJyb3I7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRhc3luYyBfZmV0Y2goKSB7XG5cdFx0XHRmb3IgKGNvbnN0IGhvb2sgb2YgdGhpcy5fb3B0aW9ucy5ob29rcy5iZWZvcmVSZXF1ZXN0KSB7XG5cdFx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1hd2FpdC1pbi1sb29wXG5cdFx0XHRcdGNvbnN0IHJlc3VsdCA9IGF3YWl0IGhvb2sodGhpcy5yZXF1ZXN0LCB0aGlzLl9vcHRpb25zKTtcblxuXHRcdFx0XHRpZiAocmVzdWx0IGluc3RhbmNlb2YgUmVxdWVzdCkge1xuXHRcdFx0XHRcdHRoaXMucmVxdWVzdCA9IHJlc3VsdDtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChyZXN1bHQgaW5zdGFuY2VvZiBSZXNwb25zZSkge1xuXHRcdFx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0aWYgKHRoaXMuX29wdGlvbnMudGltZW91dCA9PT0gZmFsc2UpIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuX29wdGlvbnMuZmV0Y2godGhpcy5yZXF1ZXN0LmNsb25lKCkpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gdGltZW91dCh0aGlzLnJlcXVlc3QuY2xvbmUoKSwgdGhpcy5hYm9ydENvbnRyb2xsZXIsIHRoaXMuX29wdGlvbnMpO1xuXHRcdH1cblxuXHRcdC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG5cdFx0X3N0cmVhbShyZXNwb25zZSwgb25Eb3dubG9hZFByb2dyZXNzKSB7XG5cdFx0XHRjb25zdCB0b3RhbEJ5dGVzID0gTnVtYmVyKHJlc3BvbnNlLmhlYWRlcnMuZ2V0KCdjb250ZW50LWxlbmd0aCcpKSB8fCAwO1xuXHRcdFx0bGV0IHRyYW5zZmVycmVkQnl0ZXMgPSAwO1xuXG5cdFx0XHRyZXR1cm4gbmV3IGdsb2JhbHMuUmVzcG9uc2UoXG5cdFx0XHRcdG5ldyBnbG9iYWxzLlJlYWRhYmxlU3RyZWFtKHtcblx0XHRcdFx0XHRzdGFydChjb250cm9sbGVyKSB7XG5cdFx0XHRcdFx0XHRjb25zdCByZWFkZXIgPSByZXNwb25zZS5ib2R5LmdldFJlYWRlcigpO1xuXG5cdFx0XHRcdFx0XHRpZiAob25Eb3dubG9hZFByb2dyZXNzKSB7XG5cdFx0XHRcdFx0XHRcdG9uRG93bmxvYWRQcm9ncmVzcyh7cGVyY2VudDogMCwgdHJhbnNmZXJyZWRCeXRlczogMCwgdG90YWxCeXRlc30sIG5ldyBVaW50OEFycmF5KCkpO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRhc3luYyBmdW5jdGlvbiByZWFkKCkge1xuXHRcdFx0XHRcdFx0XHRjb25zdCB7ZG9uZSwgdmFsdWV9ID0gYXdhaXQgcmVhZGVyLnJlYWQoKTtcblx0XHRcdFx0XHRcdFx0aWYgKGRvbmUpIHtcblx0XHRcdFx0XHRcdFx0XHRjb250cm9sbGVyLmNsb3NlKCk7XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0aWYgKG9uRG93bmxvYWRQcm9ncmVzcykge1xuXHRcdFx0XHRcdFx0XHRcdHRyYW5zZmVycmVkQnl0ZXMgKz0gdmFsdWUuYnl0ZUxlbmd0aDtcblx0XHRcdFx0XHRcdFx0XHRjb25zdCBwZXJjZW50ID0gdG90YWxCeXRlcyA9PT0gMCA/IDAgOiB0cmFuc2ZlcnJlZEJ5dGVzIC8gdG90YWxCeXRlcztcblx0XHRcdFx0XHRcdFx0XHRvbkRvd25sb2FkUHJvZ3Jlc3Moe3BlcmNlbnQsIHRyYW5zZmVycmVkQnl0ZXMsIHRvdGFsQnl0ZXN9LCB2YWx1ZSk7XG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRjb250cm9sbGVyLmVucXVldWUodmFsdWUpO1xuXHRcdFx0XHRcdFx0XHRyZWFkKCk7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdHJlYWQoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pXG5cdFx0XHQpO1xuXHRcdH1cblx0fVxuXG5cdGNvbnN0IHZhbGlkYXRlQW5kTWVyZ2UgPSAoLi4uc291cmNlcykgPT4ge1xuXHRcdGZvciAoY29uc3Qgc291cmNlIG9mIHNvdXJjZXMpIHtcblx0XHRcdGlmICgoIWlzT2JqZWN0KHNvdXJjZSkgfHwgQXJyYXkuaXNBcnJheShzb3VyY2UpKSAmJiB0eXBlb2Ygc291cmNlICE9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgYG9wdGlvbnNgIGFyZ3VtZW50IG11c3QgYmUgYW4gb2JqZWN0Jyk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGRlZXBNZXJnZSh7fSwgLi4uc291cmNlcyk7XG5cdH07XG5cblx0Y29uc3QgY3JlYXRlSW5zdGFuY2UgPSBkZWZhdWx0cyA9PiB7XG5cdFx0Y29uc3Qga3kgPSAoaW5wdXQsIG9wdGlvbnMpID0+IG5ldyBLeShpbnB1dCwgdmFsaWRhdGVBbmRNZXJnZShkZWZhdWx0cywgb3B0aW9ucykpO1xuXG5cdFx0Zm9yIChjb25zdCBtZXRob2Qgb2YgcmVxdWVzdE1ldGhvZHMpIHtcblx0XHRcdGt5W21ldGhvZF0gPSAoaW5wdXQsIG9wdGlvbnMpID0+IG5ldyBLeShpbnB1dCwgdmFsaWRhdGVBbmRNZXJnZShkZWZhdWx0cywgb3B0aW9ucywge21ldGhvZH0pKTtcblx0XHR9XG5cblx0XHRreS5IVFRQRXJyb3IgPSBIVFRQRXJyb3I7XG5cdFx0a3kuVGltZW91dEVycm9yID0gVGltZW91dEVycm9yO1xuXHRcdGt5LmNyZWF0ZSA9IG5ld0RlZmF1bHRzID0+IGNyZWF0ZUluc3RhbmNlKHZhbGlkYXRlQW5kTWVyZ2UobmV3RGVmYXVsdHMpKTtcblx0XHRreS5leHRlbmQgPSBuZXdEZWZhdWx0cyA9PiBjcmVhdGVJbnN0YW5jZSh2YWxpZGF0ZUFuZE1lcmdlKGRlZmF1bHRzLCBuZXdEZWZhdWx0cykpO1xuXHRcdGt5LnN0b3AgPSBzdG9wO1xuXG5cdFx0cmV0dXJuIGt5O1xuXHR9O1xuXG5cdHZhciBpbmRleCA9IGNyZWF0ZUluc3RhbmNlKCk7XG5cblx0cmV0dXJuIGluZGV4O1xuXG59KSkpO1xuIiwiKGZ1bmN0aW9uIChuYW1lLCBjb250ZXh0LCBkZWZpbml0aW9uKSB7XG4gIGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykgbW9kdWxlLmV4cG9ydHMgPSBkZWZpbml0aW9uKCk7XG4gIGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkgZGVmaW5lKGRlZmluaXRpb24pO1xuICBlbHNlIGNvbnRleHRbbmFtZV0gPSBkZWZpbml0aW9uKCk7XG59KSgndXJsam9pbicsIHRoaXMsIGZ1bmN0aW9uICgpIHtcblxuICBmdW5jdGlvbiBub3JtYWxpemUgKHN0ckFycmF5KSB7XG4gICAgdmFyIHJlc3VsdEFycmF5ID0gW107XG4gICAgaWYgKHN0ckFycmF5Lmxlbmd0aCA9PT0gMCkgeyByZXR1cm4gJyc7IH1cblxuICAgIGlmICh0eXBlb2Ygc3RyQXJyYXlbMF0gIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdVcmwgbXVzdCBiZSBhIHN0cmluZy4gUmVjZWl2ZWQgJyArIHN0ckFycmF5WzBdKTtcbiAgICB9XG5cbiAgICAvLyBJZiB0aGUgZmlyc3QgcGFydCBpcyBhIHBsYWluIHByb3RvY29sLCB3ZSBjb21iaW5lIGl0IHdpdGggdGhlIG5leHQgcGFydC5cbiAgICBpZiAoc3RyQXJyYXlbMF0ubWF0Y2goL15bXi86XSs6XFwvKiQvKSAmJiBzdHJBcnJheS5sZW5ndGggPiAxKSB7XG4gICAgICB2YXIgZmlyc3QgPSBzdHJBcnJheS5zaGlmdCgpO1xuICAgICAgc3RyQXJyYXlbMF0gPSBmaXJzdCArIHN0ckFycmF5WzBdO1xuICAgIH1cblxuICAgIC8vIFRoZXJlIG11c3QgYmUgdHdvIG9yIHRocmVlIHNsYXNoZXMgaW4gdGhlIGZpbGUgcHJvdG9jb2wsIHR3byBzbGFzaGVzIGluIGFueXRoaW5nIGVsc2UuXG4gICAgaWYgKHN0ckFycmF5WzBdLm1hdGNoKC9eZmlsZTpcXC9cXC9cXC8vKSkge1xuICAgICAgc3RyQXJyYXlbMF0gPSBzdHJBcnJheVswXS5yZXBsYWNlKC9eKFteLzpdKyk6XFwvKi8sICckMTovLy8nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RyQXJyYXlbMF0gPSBzdHJBcnJheVswXS5yZXBsYWNlKC9eKFteLzpdKyk6XFwvKi8sICckMTovLycpO1xuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyQXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBjb21wb25lbnQgPSBzdHJBcnJheVtpXTtcblxuICAgICAgaWYgKHR5cGVvZiBjb21wb25lbnQgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1VybCBtdXN0IGJlIGEgc3RyaW5nLiBSZWNlaXZlZCAnICsgY29tcG9uZW50KTtcbiAgICAgIH1cblxuICAgICAgaWYgKGNvbXBvbmVudCA9PT0gJycpIHsgY29udGludWU7IH1cblxuICAgICAgaWYgKGkgPiAwKSB7XG4gICAgICAgIC8vIFJlbW92aW5nIHRoZSBzdGFydGluZyBzbGFzaGVzIGZvciBlYWNoIGNvbXBvbmVudCBidXQgdGhlIGZpcnN0LlxuICAgICAgICBjb21wb25lbnQgPSBjb21wb25lbnQucmVwbGFjZSgvXltcXC9dKy8sICcnKTtcbiAgICAgIH1cbiAgICAgIGlmIChpIDwgc3RyQXJyYXkubGVuZ3RoIC0gMSkge1xuICAgICAgICAvLyBSZW1vdmluZyB0aGUgZW5kaW5nIHNsYXNoZXMgZm9yIGVhY2ggY29tcG9uZW50IGJ1dCB0aGUgbGFzdC5cbiAgICAgICAgY29tcG9uZW50ID0gY29tcG9uZW50LnJlcGxhY2UoL1tcXC9dKyQvLCAnJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBGb3IgdGhlIGxhc3QgY29tcG9uZW50IHdlIHdpbGwgY29tYmluZSBtdWx0aXBsZSBzbGFzaGVzIHRvIGEgc2luZ2xlIG9uZS5cbiAgICAgICAgY29tcG9uZW50ID0gY29tcG9uZW50LnJlcGxhY2UoL1tcXC9dKyQvLCAnLycpO1xuICAgICAgfVxuXG4gICAgICByZXN1bHRBcnJheS5wdXNoKGNvbXBvbmVudCk7XG5cbiAgICB9XG5cbiAgICB2YXIgc3RyID0gcmVzdWx0QXJyYXkuam9pbignLycpO1xuICAgIC8vIEVhY2ggaW5wdXQgY29tcG9uZW50IGlzIG5vdyBzZXBhcmF0ZWQgYnkgYSBzaW5nbGUgc2xhc2ggZXhjZXB0IHRoZSBwb3NzaWJsZSBmaXJzdCBwbGFpbiBwcm90b2NvbCBwYXJ0LlxuXG4gICAgLy8gcmVtb3ZlIHRyYWlsaW5nIHNsYXNoIGJlZm9yZSBwYXJhbWV0ZXJzIG9yIGhhc2hcbiAgICBzdHIgPSBzdHIucmVwbGFjZSgvXFwvKFxcP3wmfCNbXiFdKS9nLCAnJDEnKTtcblxuICAgIC8vIHJlcGxhY2UgPyBpbiBwYXJhbWV0ZXJzIHdpdGggJlxuICAgIHZhciBwYXJ0cyA9IHN0ci5zcGxpdCgnPycpO1xuICAgIHN0ciA9IHBhcnRzLnNoaWZ0KCkgKyAocGFydHMubGVuZ3RoID4gMCA/ICc/JzogJycpICsgcGFydHMuam9pbignJicpO1xuXG4gICAgcmV0dXJuIHN0cjtcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGlucHV0O1xuXG4gICAgaWYgKHR5cGVvZiBhcmd1bWVudHNbMF0gPT09ICdvYmplY3QnKSB7XG4gICAgICBpbnB1dCA9IGFyZ3VtZW50c1swXTtcbiAgICB9IGVsc2Uge1xuICAgICAgaW5wdXQgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5vcm1hbGl6ZShpbnB1dCk7XG4gIH07XG5cbn0pO1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY3J5cHRvXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImh0dHBcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaHR0cHNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic3RyZWFtXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInVybFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ1dGlsXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInpsaWJcIik7IiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBmZXRjaDtcblxuY29uc3QgaHR0cCA9IHJlcXVpcmUoJ2h0dHAnKTtcbmNvbnN0IGh0dHBzID0gcmVxdWlyZSgnaHR0cHMnKTtcbmNvbnN0IHpsaWIgPSByZXF1aXJlKCd6bGliJyk7XG5jb25zdCBTdHJlYW0gPSByZXF1aXJlKCdzdHJlYW0nKTtcbmNvbnN0IGRhdGFVcmlUb0J1ZmZlciA9IHJlcXVpcmUoJ2RhdGEtdXJpLXRvLWJ1ZmZlcicpO1xuY29uc3QgdXRpbCA9IHJlcXVpcmUoJ3V0aWwnKTtcbmNvbnN0IEJsb2IgPSByZXF1aXJlKCdmZXRjaC1ibG9iJyk7XG5jb25zdCBjcnlwdG8gPSByZXF1aXJlKCdjcnlwdG8nKTtcbmNvbnN0IHVybCA9IHJlcXVpcmUoJ3VybCcpO1xuXG5jbGFzcyBGZXRjaEJhc2VFcnJvciBleHRlbmRzIEVycm9yIHtcblx0Y29uc3RydWN0b3IobWVzc2FnZSwgdHlwZSkge1xuXHRcdHN1cGVyKG1lc3NhZ2UpO1xuXHRcdC8vIEhpZGUgY3VzdG9tIGVycm9yIGltcGxlbWVudGF0aW9uIGRldGFpbHMgZnJvbSBlbmQtdXNlcnNcblx0XHRFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSh0aGlzLCB0aGlzLmNvbnN0cnVjdG9yKTtcblxuXHRcdHRoaXMudHlwZSA9IHR5cGU7XG5cdH1cblxuXHRnZXQgbmFtZSgpIHtcblx0XHRyZXR1cm4gdGhpcy5jb25zdHJ1Y3Rvci5uYW1lO1xuXHR9XG5cblx0Z2V0IFtTeW1ib2wudG9TdHJpbmdUYWddKCkge1xuXHRcdHJldHVybiB0aGlzLmNvbnN0cnVjdG9yLm5hbWU7XG5cdH1cbn1cblxuLyoqXG4gKiBAdHlwZWRlZiB7eyBhZGRyZXNzPzogc3RyaW5nLCBjb2RlOiBzdHJpbmcsIGRlc3Q/OiBzdHJpbmcsIGVycm5vOiBudW1iZXIsIGluZm8/OiBvYmplY3QsIG1lc3NhZ2U6IHN0cmluZywgcGF0aD86IHN0cmluZywgcG9ydD86IG51bWJlciwgc3lzY2FsbDogc3RyaW5nfX0gU3lzdGVtRXJyb3JcbiovXG5cbi8qKlxuICogRmV0Y2hFcnJvciBpbnRlcmZhY2UgZm9yIG9wZXJhdGlvbmFsIGVycm9yc1xuICovXG5jbGFzcyBGZXRjaEVycm9yIGV4dGVuZHMgRmV0Y2hCYXNlRXJyb3Ige1xuXHQvKipcblx0ICogQHBhcmFtICB7c3RyaW5nfSBtZXNzYWdlIC0gICAgICBFcnJvciBtZXNzYWdlIGZvciBodW1hblxuXHQgKiBAcGFyYW0gIHtzdHJpbmd9IFt0eXBlXSAtICAgICAgICBFcnJvciB0eXBlIGZvciBtYWNoaW5lXG5cdCAqIEBwYXJhbSAge1N5c3RlbUVycm9yfSBbc3lzdGVtRXJyb3JdIC0gRm9yIE5vZGUuanMgc3lzdGVtIGVycm9yXG5cdCAqL1xuXHRjb25zdHJ1Y3RvcihtZXNzYWdlLCB0eXBlLCBzeXN0ZW1FcnJvcikge1xuXHRcdHN1cGVyKG1lc3NhZ2UsIHR5cGUpO1xuXHRcdC8vIFdoZW4gZXJyLnR5cGUgaXMgYHN5c3RlbWAsIGVyci5lcnJvcmVkU3lzQ2FsbCBjb250YWlucyBzeXN0ZW0gZXJyb3IgYW5kIGVyci5jb2RlIGNvbnRhaW5zIHN5c3RlbSBlcnJvciBjb2RlXG5cdFx0aWYgKHN5c3RlbUVycm9yKSB7XG5cdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbXVsdGktYXNzaWduXG5cdFx0XHR0aGlzLmNvZGUgPSB0aGlzLmVycm5vID0gc3lzdGVtRXJyb3IuY29kZTtcblx0XHRcdHRoaXMuZXJyb3JlZFN5c0NhbGwgPSBzeXN0ZW1FcnJvci5zeXNjYWxsO1xuXHRcdH1cblx0fVxufVxuXG4vKipcbiAqIElzLmpzXG4gKlxuICogT2JqZWN0IHR5cGUgY2hlY2tzLlxuICovXG5cbmNvbnN0IE5BTUUgPSBTeW1ib2wudG9TdHJpbmdUYWc7XG5cbi8qKlxuICogQ2hlY2sgaWYgYG9iamAgaXMgYSBVUkxTZWFyY2hQYXJhbXMgb2JqZWN0XG4gKiByZWY6IGh0dHBzOi8vZ2l0aHViLmNvbS9ub2RlLWZldGNoL25vZGUtZmV0Y2gvaXNzdWVzLzI5NiNpc3N1ZWNvbW1lbnQtMzA3NTk4MTQzXG4gKlxuICogQHBhcmFtICB7Kn0gb2JqXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5jb25zdCBpc1VSTFNlYXJjaFBhcmFtZXRlcnMgPSBvYmplY3QgPT4ge1xuXHRyZXR1cm4gKFxuXHRcdHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnICYmXG5cdFx0dHlwZW9mIG9iamVjdC5hcHBlbmQgPT09ICdmdW5jdGlvbicgJiZcblx0XHR0eXBlb2Ygb2JqZWN0LmRlbGV0ZSA9PT0gJ2Z1bmN0aW9uJyAmJlxuXHRcdHR5cGVvZiBvYmplY3QuZ2V0ID09PSAnZnVuY3Rpb24nICYmXG5cdFx0dHlwZW9mIG9iamVjdC5nZXRBbGwgPT09ICdmdW5jdGlvbicgJiZcblx0XHR0eXBlb2Ygb2JqZWN0LmhhcyA9PT0gJ2Z1bmN0aW9uJyAmJlxuXHRcdHR5cGVvZiBvYmplY3Quc2V0ID09PSAnZnVuY3Rpb24nICYmXG5cdFx0dHlwZW9mIG9iamVjdC5zb3J0ID09PSAnZnVuY3Rpb24nICYmXG5cdFx0b2JqZWN0W05BTUVdID09PSAnVVJMU2VhcmNoUGFyYW1zJ1xuXHQpO1xufTtcblxuLyoqXG4gKiBDaGVjayBpZiBgb2JqZWN0YCBpcyBhIFczQyBgQmxvYmAgb2JqZWN0ICh3aGljaCBgRmlsZWAgaW5oZXJpdHMgZnJvbSlcbiAqXG4gKiBAcGFyYW0gIHsqfSBvYmpcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmNvbnN0IGlzQmxvYiA9IG9iamVjdCA9PiB7XG5cdHJldHVybiAoXG5cdFx0dHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCcgJiZcblx0XHR0eXBlb2Ygb2JqZWN0LmFycmF5QnVmZmVyID09PSAnZnVuY3Rpb24nICYmXG5cdFx0dHlwZW9mIG9iamVjdC50eXBlID09PSAnc3RyaW5nJyAmJlxuXHRcdHR5cGVvZiBvYmplY3Quc3RyZWFtID09PSAnZnVuY3Rpb24nICYmXG5cdFx0dHlwZW9mIG9iamVjdC5jb25zdHJ1Y3RvciA9PT0gJ2Z1bmN0aW9uJyAmJlxuXHRcdC9eKEJsb2J8RmlsZSkkLy50ZXN0KG9iamVjdFtOQU1FXSlcblx0KTtcbn07XG5cbi8qKlxuICogQ2hlY2sgaWYgYG9iamAgaXMgYSBzcGVjLWNvbXBsaWFudCBgRm9ybURhdGFgIG9iamVjdFxuICpcbiAqIEBwYXJhbSB7Kn0gb2JqZWN0XG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBpc0Zvcm1EYXRhKG9iamVjdCkge1xuXHRyZXR1cm4gKFxuXHRcdHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnICYmXG5cdFx0dHlwZW9mIG9iamVjdC5hcHBlbmQgPT09ICdmdW5jdGlvbicgJiZcblx0XHR0eXBlb2Ygb2JqZWN0LnNldCA9PT0gJ2Z1bmN0aW9uJyAmJlxuXHRcdHR5cGVvZiBvYmplY3QuZ2V0ID09PSAnZnVuY3Rpb24nICYmXG5cdFx0dHlwZW9mIG9iamVjdC5nZXRBbGwgPT09ICdmdW5jdGlvbicgJiZcblx0XHR0eXBlb2Ygb2JqZWN0LmRlbGV0ZSA9PT0gJ2Z1bmN0aW9uJyAmJlxuXHRcdHR5cGVvZiBvYmplY3Qua2V5cyA9PT0gJ2Z1bmN0aW9uJyAmJlxuXHRcdHR5cGVvZiBvYmplY3QudmFsdWVzID09PSAnZnVuY3Rpb24nICYmXG5cdFx0dHlwZW9mIG9iamVjdC5lbnRyaWVzID09PSAnZnVuY3Rpb24nICYmXG5cdFx0dHlwZW9mIG9iamVjdC5jb25zdHJ1Y3RvciA9PT0gJ2Z1bmN0aW9uJyAmJlxuXHRcdG9iamVjdFtOQU1FXSA9PT0gJ0Zvcm1EYXRhJ1xuXHQpO1xufVxuXG4vKipcbiAqIENoZWNrIGlmIGBvYmpgIGlzIGFuIGluc3RhbmNlIG9mIEFib3J0U2lnbmFsLlxuICpcbiAqIEBwYXJhbSAgeyp9IG9ialxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuY29uc3QgaXNBYm9ydFNpZ25hbCA9IG9iamVjdCA9PiB7XG5cdHJldHVybiAoXG5cdFx0dHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCcgJiZcblx0XHRvYmplY3RbTkFNRV0gPT09ICdBYm9ydFNpZ25hbCdcblx0KTtcbn07XG5cbmNvbnN0IGNhcnJpYWdlID0gJ1xcclxcbic7XG5jb25zdCBkYXNoZXMgPSAnLScucmVwZWF0KDIpO1xuY29uc3QgY2FycmlhZ2VMZW5ndGggPSBCdWZmZXIuYnl0ZUxlbmd0aChjYXJyaWFnZSk7XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IGJvdW5kYXJ5XG4gKi9cbmNvbnN0IGdldEZvb3RlciA9IGJvdW5kYXJ5ID0+IGAke2Rhc2hlc30ke2JvdW5kYXJ5fSR7ZGFzaGVzfSR7Y2FycmlhZ2UucmVwZWF0KDIpfWA7XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IGJvdW5kYXJ5XG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogQHBhcmFtIHsqfSBmaWVsZFxuICpcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gZ2V0SGVhZGVyKGJvdW5kYXJ5LCBuYW1lLCBmaWVsZCkge1xuXHRsZXQgaGVhZGVyID0gJyc7XG5cblx0aGVhZGVyICs9IGAke2Rhc2hlc30ke2JvdW5kYXJ5fSR7Y2FycmlhZ2V9YDtcblx0aGVhZGVyICs9IGBDb250ZW50LURpc3Bvc2l0aW9uOiBmb3JtLWRhdGE7IG5hbWU9XCIke25hbWV9XCJgO1xuXG5cdGlmIChpc0Jsb2IoZmllbGQpKSB7XG5cdFx0aGVhZGVyICs9IGA7IGZpbGVuYW1lPVwiJHtmaWVsZC5uYW1lfVwiJHtjYXJyaWFnZX1gO1xuXHRcdGhlYWRlciArPSBgQ29udGVudC1UeXBlOiAke2ZpZWxkLnR5cGUgfHwgJ2FwcGxpY2F0aW9uL29jdGV0LXN0cmVhbSd9YDtcblx0fVxuXG5cdHJldHVybiBgJHtoZWFkZXJ9JHtjYXJyaWFnZS5yZXBlYXQoMil9YDtcbn1cblxuLyoqXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmNvbnN0IGdldEJvdW5kYXJ5ID0gKCkgPT4gY3J5cHRvLnJhbmRvbUJ5dGVzKDgpLnRvU3RyaW5nKCdoZXgnKTtcblxuLyoqXG4gKiBAcGFyYW0ge0Zvcm1EYXRhfSBmb3JtXG4gKiBAcGFyYW0ge3N0cmluZ30gYm91bmRhcnlcbiAqL1xuYXN5bmMgZnVuY3Rpb24gKiBmb3JtRGF0YUl0ZXJhdG9yKGZvcm0sIGJvdW5kYXJ5KSB7XG5cdGZvciAoY29uc3QgW25hbWUsIHZhbHVlXSBvZiBmb3JtKSB7XG5cdFx0eWllbGQgZ2V0SGVhZGVyKGJvdW5kYXJ5LCBuYW1lLCB2YWx1ZSk7XG5cblx0XHRpZiAoaXNCbG9iKHZhbHVlKSkge1xuXHRcdFx0eWllbGQgKiB2YWx1ZS5zdHJlYW0oKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0eWllbGQgdmFsdWU7XG5cdFx0fVxuXG5cdFx0eWllbGQgY2FycmlhZ2U7XG5cdH1cblxuXHR5aWVsZCBnZXRGb290ZXIoYm91bmRhcnkpO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7Rm9ybURhdGF9IGZvcm1cbiAqIEBwYXJhbSB7c3RyaW5nfSBib3VuZGFyeVxuICovXG5mdW5jdGlvbiBnZXRGb3JtRGF0YUxlbmd0aChmb3JtLCBib3VuZGFyeSkge1xuXHRsZXQgbGVuZ3RoID0gMDtcblxuXHRmb3IgKGNvbnN0IFtuYW1lLCB2YWx1ZV0gb2YgZm9ybSkge1xuXHRcdGxlbmd0aCArPSBCdWZmZXIuYnl0ZUxlbmd0aChnZXRIZWFkZXIoYm91bmRhcnksIG5hbWUsIHZhbHVlKSk7XG5cblx0XHRpZiAoaXNCbG9iKHZhbHVlKSkge1xuXHRcdFx0bGVuZ3RoICs9IHZhbHVlLnNpemU7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGxlbmd0aCArPSBCdWZmZXIuYnl0ZUxlbmd0aChTdHJpbmcodmFsdWUpKTtcblx0XHR9XG5cblx0XHRsZW5ndGggKz0gY2FycmlhZ2VMZW5ndGg7XG5cdH1cblxuXHRsZW5ndGggKz0gQnVmZmVyLmJ5dGVMZW5ndGgoZ2V0Rm9vdGVyKGJvdW5kYXJ5KSk7XG5cblx0cmV0dXJuIGxlbmd0aDtcbn1cblxuY29uc3QgSU5URVJOQUxTID0gU3ltYm9sKCdCb2R5IGludGVybmFscycpO1xuXG4vKipcbiAqIEJvZHkgbWl4aW5cbiAqXG4gKiBSZWY6IGh0dHBzOi8vZmV0Y2guc3BlYy53aGF0d2cub3JnLyNib2R5XG4gKlxuICogQHBhcmFtICAgU3RyZWFtICBib2R5ICBSZWFkYWJsZSBzdHJlYW1cbiAqIEBwYXJhbSAgIE9iamVjdCAgb3B0cyAgUmVzcG9uc2Ugb3B0aW9uc1xuICogQHJldHVybiAgVm9pZFxuICovXG5jbGFzcyBCb2R5IHtcblx0Y29uc3RydWN0b3IoYm9keSwge1xuXHRcdHNpemUgPSAwXG5cdH0gPSB7fSkge1xuXHRcdGxldCBib3VuZGFyeSA9IG51bGw7XG5cblx0XHRpZiAoYm9keSA9PT0gbnVsbCkge1xuXHRcdFx0Ly8gQm9keSBpcyB1bmRlZmluZWQgb3IgbnVsbFxuXHRcdFx0Ym9keSA9IG51bGw7XG5cdFx0fSBlbHNlIGlmIChpc1VSTFNlYXJjaFBhcmFtZXRlcnMoYm9keSkpIHtcblx0XHQvLyBCb2R5IGlzIGEgVVJMU2VhcmNoUGFyYW1zXG5cdFx0XHRib2R5ID0gQnVmZmVyLmZyb20oYm9keS50b1N0cmluZygpKTtcblx0XHR9IGVsc2UgaWYgKGlzQmxvYihib2R5KSkgOyBlbHNlIGlmIChCdWZmZXIuaXNCdWZmZXIoYm9keSkpIDsgZWxzZSBpZiAodXRpbC50eXBlcy5pc0FueUFycmF5QnVmZmVyKGJvZHkpKSB7XG5cdFx0XHQvLyBCb2R5IGlzIEFycmF5QnVmZmVyXG5cdFx0XHRib2R5ID0gQnVmZmVyLmZyb20oYm9keSk7XG5cdFx0fSBlbHNlIGlmIChBcnJheUJ1ZmZlci5pc1ZpZXcoYm9keSkpIHtcblx0XHRcdC8vIEJvZHkgaXMgQXJyYXlCdWZmZXJWaWV3XG5cdFx0XHRib2R5ID0gQnVmZmVyLmZyb20oYm9keS5idWZmZXIsIGJvZHkuYnl0ZU9mZnNldCwgYm9keS5ieXRlTGVuZ3RoKTtcblx0XHR9IGVsc2UgaWYgKGJvZHkgaW5zdGFuY2VvZiBTdHJlYW0pIDsgZWxzZSBpZiAoaXNGb3JtRGF0YShib2R5KSkge1xuXHRcdFx0Ly8gQm9keSBpcyBhbiBpbnN0YW5jZSBvZiBmb3JtZGF0YS1ub2RlXG5cdFx0XHRib3VuZGFyeSA9IGBOb2RlRmV0Y2hGb3JtRGF0YUJvdW5kYXJ5JHtnZXRCb3VuZGFyeSgpfWA7XG5cdFx0XHRib2R5ID0gU3RyZWFtLlJlYWRhYmxlLmZyb20oZm9ybURhdGFJdGVyYXRvcihib2R5LCBib3VuZGFyeSkpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBOb25lIG9mIHRoZSBhYm92ZVxuXHRcdFx0Ly8gY29lcmNlIHRvIHN0cmluZyB0aGVuIGJ1ZmZlclxuXHRcdFx0Ym9keSA9IEJ1ZmZlci5mcm9tKFN0cmluZyhib2R5KSk7XG5cdFx0fVxuXG5cdFx0dGhpc1tJTlRFUk5BTFNdID0ge1xuXHRcdFx0Ym9keSxcblx0XHRcdGJvdW5kYXJ5LFxuXHRcdFx0ZGlzdHVyYmVkOiBmYWxzZSxcblx0XHRcdGVycm9yOiBudWxsXG5cdFx0fTtcblx0XHR0aGlzLnNpemUgPSBzaXplO1xuXG5cdFx0aWYgKGJvZHkgaW5zdGFuY2VvZiBTdHJlYW0pIHtcblx0XHRcdGJvZHkub24oJ2Vycm9yJywgZXJyID0+IHtcblx0XHRcdFx0Y29uc3QgZXJyb3IgPSBlcnIgaW5zdGFuY2VvZiBGZXRjaEJhc2VFcnJvciA/XG5cdFx0XHRcdFx0ZXJyIDpcblx0XHRcdFx0XHRuZXcgRmV0Y2hFcnJvcihgSW52YWxpZCByZXNwb25zZSBib2R5IHdoaWxlIHRyeWluZyB0byBmZXRjaCAke3RoaXMudXJsfTogJHtlcnIubWVzc2FnZX1gLCAnc3lzdGVtJywgZXJyKTtcblx0XHRcdFx0dGhpc1tJTlRFUk5BTFNdLmVycm9yID0gZXJyb3I7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cblxuXHRnZXQgYm9keSgpIHtcblx0XHRyZXR1cm4gdGhpc1tJTlRFUk5BTFNdLmJvZHk7XG5cdH1cblxuXHRnZXQgYm9keVVzZWQoKSB7XG5cdFx0cmV0dXJuIHRoaXNbSU5URVJOQUxTXS5kaXN0dXJiZWQ7XG5cdH1cblxuXHQvKipcblx0ICogRGVjb2RlIHJlc3BvbnNlIGFzIEFycmF5QnVmZmVyXG5cdCAqXG5cdCAqIEByZXR1cm4gIFByb21pc2Vcblx0ICovXG5cdGFzeW5jIGFycmF5QnVmZmVyKCkge1xuXHRcdGNvbnN0IHtidWZmZXIsIGJ5dGVPZmZzZXQsIGJ5dGVMZW5ndGh9ID0gYXdhaXQgY29uc3VtZUJvZHkodGhpcyk7XG5cdFx0cmV0dXJuIGJ1ZmZlci5zbGljZShieXRlT2Zmc2V0LCBieXRlT2Zmc2V0ICsgYnl0ZUxlbmd0aCk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJuIHJhdyByZXNwb25zZSBhcyBCbG9iXG5cdCAqXG5cdCAqIEByZXR1cm4gUHJvbWlzZVxuXHQgKi9cblx0YXN5bmMgYmxvYigpIHtcblx0XHRjb25zdCBjdCA9ICh0aGlzLmhlYWRlcnMgJiYgdGhpcy5oZWFkZXJzLmdldCgnY29udGVudC10eXBlJykpIHx8ICh0aGlzW0lOVEVSTkFMU10uYm9keSAmJiB0aGlzW0lOVEVSTkFMU10uYm9keS50eXBlKSB8fCAnJztcblx0XHRjb25zdCBidWYgPSBhd2FpdCB0aGlzLmJ1ZmZlcigpO1xuXG5cdFx0cmV0dXJuIG5ldyBCbG9iKFtidWZdLCB7XG5cdFx0XHR0eXBlOiBjdFxuXHRcdH0pO1xuXHR9XG5cblx0LyoqXG5cdCAqIERlY29kZSByZXNwb25zZSBhcyBqc29uXG5cdCAqXG5cdCAqIEByZXR1cm4gIFByb21pc2Vcblx0ICovXG5cdGFzeW5jIGpzb24oKSB7XG5cdFx0Y29uc3QgYnVmZmVyID0gYXdhaXQgY29uc3VtZUJvZHkodGhpcyk7XG5cdFx0cmV0dXJuIEpTT04ucGFyc2UoYnVmZmVyLnRvU3RyaW5nKCkpO1xuXHR9XG5cblx0LyoqXG5cdCAqIERlY29kZSByZXNwb25zZSBhcyB0ZXh0XG5cdCAqXG5cdCAqIEByZXR1cm4gIFByb21pc2Vcblx0ICovXG5cdGFzeW5jIHRleHQoKSB7XG5cdFx0Y29uc3QgYnVmZmVyID0gYXdhaXQgY29uc3VtZUJvZHkodGhpcyk7XG5cdFx0cmV0dXJuIGJ1ZmZlci50b1N0cmluZygpO1xuXHR9XG5cblx0LyoqXG5cdCAqIERlY29kZSByZXNwb25zZSBhcyBidWZmZXIgKG5vbi1zcGVjIGFwaSlcblx0ICpcblx0ICogQHJldHVybiAgUHJvbWlzZVxuXHQgKi9cblx0YnVmZmVyKCkge1xuXHRcdHJldHVybiBjb25zdW1lQm9keSh0aGlzKTtcblx0fVxufVxuXG4vLyBJbiBicm93c2VycywgYWxsIHByb3BlcnRpZXMgYXJlIGVudW1lcmFibGUuXG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyhCb2R5LnByb3RvdHlwZSwge1xuXHRib2R5OiB7ZW51bWVyYWJsZTogdHJ1ZX0sXG5cdGJvZHlVc2VkOiB7ZW51bWVyYWJsZTogdHJ1ZX0sXG5cdGFycmF5QnVmZmVyOiB7ZW51bWVyYWJsZTogdHJ1ZX0sXG5cdGJsb2I6IHtlbnVtZXJhYmxlOiB0cnVlfSxcblx0anNvbjoge2VudW1lcmFibGU6IHRydWV9LFxuXHR0ZXh0OiB7ZW51bWVyYWJsZTogdHJ1ZX1cbn0pO1xuXG4vKipcbiAqIENvbnN1bWUgYW5kIGNvbnZlcnQgYW4gZW50aXJlIEJvZHkgdG8gYSBCdWZmZXIuXG4gKlxuICogUmVmOiBodHRwczovL2ZldGNoLnNwZWMud2hhdHdnLm9yZy8jY29uY2VwdC1ib2R5LWNvbnN1bWUtYm9keVxuICpcbiAqIEByZXR1cm4gUHJvbWlzZVxuICovXG5hc3luYyBmdW5jdGlvbiBjb25zdW1lQm9keShkYXRhKSB7XG5cdGlmIChkYXRhW0lOVEVSTkFMU10uZGlzdHVyYmVkKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihgYm9keSB1c2VkIGFscmVhZHkgZm9yOiAke2RhdGEudXJsfWApO1xuXHR9XG5cblx0ZGF0YVtJTlRFUk5BTFNdLmRpc3R1cmJlZCA9IHRydWU7XG5cblx0aWYgKGRhdGFbSU5URVJOQUxTXS5lcnJvcikge1xuXHRcdHRocm93IGRhdGFbSU5URVJOQUxTXS5lcnJvcjtcblx0fVxuXG5cdGxldCB7Ym9keX0gPSBkYXRhO1xuXG5cdC8vIEJvZHkgaXMgbnVsbFxuXHRpZiAoYm9keSA9PT0gbnVsbCkge1xuXHRcdHJldHVybiBCdWZmZXIuYWxsb2MoMCk7XG5cdH1cblxuXHQvLyBCb2R5IGlzIGJsb2Jcblx0aWYgKGlzQmxvYihib2R5KSkge1xuXHRcdGJvZHkgPSBib2R5LnN0cmVhbSgpO1xuXHR9XG5cblx0Ly8gQm9keSBpcyBidWZmZXJcblx0aWYgKEJ1ZmZlci5pc0J1ZmZlcihib2R5KSkge1xuXHRcdHJldHVybiBib2R5O1xuXHR9XG5cblx0LyogYzggaWdub3JlIG5leHQgMyAqL1xuXHRpZiAoIShib2R5IGluc3RhbmNlb2YgU3RyZWFtKSkge1xuXHRcdHJldHVybiBCdWZmZXIuYWxsb2MoMCk7XG5cdH1cblxuXHQvLyBCb2R5IGlzIHN0cmVhbVxuXHQvLyBnZXQgcmVhZHkgdG8gYWN0dWFsbHkgY29uc3VtZSB0aGUgYm9keVxuXHRjb25zdCBhY2N1bSA9IFtdO1xuXHRsZXQgYWNjdW1CeXRlcyA9IDA7XG5cblx0dHJ5IHtcblx0XHRmb3IgYXdhaXQgKGNvbnN0IGNodW5rIG9mIGJvZHkpIHtcblx0XHRcdGlmIChkYXRhLnNpemUgPiAwICYmIGFjY3VtQnl0ZXMgKyBjaHVuay5sZW5ndGggPiBkYXRhLnNpemUpIHtcblx0XHRcdFx0Y29uc3QgZXJyID0gbmV3IEZldGNoRXJyb3IoYGNvbnRlbnQgc2l6ZSBhdCAke2RhdGEudXJsfSBvdmVyIGxpbWl0OiAke2RhdGEuc2l6ZX1gLCAnbWF4LXNpemUnKTtcblx0XHRcdFx0Ym9keS5kZXN0cm95KGVycik7XG5cdFx0XHRcdHRocm93IGVycjtcblx0XHRcdH1cblxuXHRcdFx0YWNjdW1CeXRlcyArPSBjaHVuay5sZW5ndGg7XG5cdFx0XHRhY2N1bS5wdXNoKGNodW5rKTtcblx0XHR9XG5cdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0aWYgKGVycm9yIGluc3RhbmNlb2YgRmV0Y2hCYXNlRXJyb3IpIHtcblx0XHRcdHRocm93IGVycm9yO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBPdGhlciBlcnJvcnMsIHN1Y2ggYXMgaW5jb3JyZWN0IGNvbnRlbnQtZW5jb2Rpbmdcblx0XHRcdHRocm93IG5ldyBGZXRjaEVycm9yKGBJbnZhbGlkIHJlc3BvbnNlIGJvZHkgd2hpbGUgdHJ5aW5nIHRvIGZldGNoICR7ZGF0YS51cmx9OiAke2Vycm9yLm1lc3NhZ2V9YCwgJ3N5c3RlbScsIGVycm9yKTtcblx0XHR9XG5cdH1cblxuXHRpZiAoYm9keS5yZWFkYWJsZUVuZGVkID09PSB0cnVlIHx8IGJvZHkuX3JlYWRhYmxlU3RhdGUuZW5kZWQgPT09IHRydWUpIHtcblx0XHR0cnkge1xuXHRcdFx0aWYgKGFjY3VtLmV2ZXJ5KGMgPT4gdHlwZW9mIGMgPT09ICdzdHJpbmcnKSkge1xuXHRcdFx0XHRyZXR1cm4gQnVmZmVyLmZyb20oYWNjdW0uam9pbignJykpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gQnVmZmVyLmNvbmNhdChhY2N1bSwgYWNjdW1CeXRlcyk7XG5cdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdHRocm93IG5ldyBGZXRjaEVycm9yKGBDb3VsZCBub3QgY3JlYXRlIEJ1ZmZlciBmcm9tIHJlc3BvbnNlIGJvZHkgZm9yICR7ZGF0YS51cmx9OiAke2Vycm9yLm1lc3NhZ2V9YCwgJ3N5c3RlbScsIGVycm9yKTtcblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0dGhyb3cgbmV3IEZldGNoRXJyb3IoYFByZW1hdHVyZSBjbG9zZSBvZiBzZXJ2ZXIgcmVzcG9uc2Ugd2hpbGUgdHJ5aW5nIHRvIGZldGNoICR7ZGF0YS51cmx9YCk7XG5cdH1cbn1cblxuLyoqXG4gKiBDbG9uZSBib2R5IGdpdmVuIFJlcy9SZXEgaW5zdGFuY2VcbiAqXG4gKiBAcGFyYW0gICBNaXhlZCAgIGluc3RhbmNlICAgICAgIFJlc3BvbnNlIG9yIFJlcXVlc3QgaW5zdGFuY2VcbiAqIEBwYXJhbSAgIFN0cmluZyAgaGlnaFdhdGVyTWFyayAgaGlnaFdhdGVyTWFyayBmb3IgYm90aCBQYXNzVGhyb3VnaCBib2R5IHN0cmVhbXNcbiAqIEByZXR1cm4gIE1peGVkXG4gKi9cbmNvbnN0IGNsb25lID0gKGluc3RhbmNlLCBoaWdoV2F0ZXJNYXJrKSA9PiB7XG5cdGxldCBwMTtcblx0bGV0IHAyO1xuXHRsZXQge2JvZHl9ID0gaW5zdGFuY2U7XG5cblx0Ly8gRG9uJ3QgYWxsb3cgY2xvbmluZyBhIHVzZWQgYm9keVxuXHRpZiAoaW5zdGFuY2UuYm9keVVzZWQpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ2Nhbm5vdCBjbG9uZSBib2R5IGFmdGVyIGl0IGlzIHVzZWQnKTtcblx0fVxuXG5cdC8vIENoZWNrIHRoYXQgYm9keSBpcyBhIHN0cmVhbSBhbmQgbm90IGZvcm0tZGF0YSBvYmplY3Rcblx0Ly8gbm90ZTogd2UgY2FuJ3QgY2xvbmUgdGhlIGZvcm0tZGF0YSBvYmplY3Qgd2l0aG91dCBoYXZpbmcgaXQgYXMgYSBkZXBlbmRlbmN5XG5cdGlmICgoYm9keSBpbnN0YW5jZW9mIFN0cmVhbSkgJiYgKHR5cGVvZiBib2R5LmdldEJvdW5kYXJ5ICE9PSAnZnVuY3Rpb24nKSkge1xuXHRcdC8vIFRlZSBpbnN0YW5jZSBib2R5XG5cdFx0cDEgPSBuZXcgU3RyZWFtLlBhc3NUaHJvdWdoKHtoaWdoV2F0ZXJNYXJrfSk7XG5cdFx0cDIgPSBuZXcgU3RyZWFtLlBhc3NUaHJvdWdoKHtoaWdoV2F0ZXJNYXJrfSk7XG5cdFx0Ym9keS5waXBlKHAxKTtcblx0XHRib2R5LnBpcGUocDIpO1xuXHRcdC8vIFNldCBpbnN0YW5jZSBib2R5IHRvIHRlZWQgYm9keSBhbmQgcmV0dXJuIHRoZSBvdGhlciB0ZWVkIGJvZHlcblx0XHRpbnN0YW5jZVtJTlRFUk5BTFNdLmJvZHkgPSBwMTtcblx0XHRib2R5ID0gcDI7XG5cdH1cblxuXHRyZXR1cm4gYm9keTtcbn07XG5cbi8qKlxuICogUGVyZm9ybXMgdGhlIG9wZXJhdGlvbiBcImV4dHJhY3QgYSBgQ29udGVudC1UeXBlYCB2YWx1ZSBmcm9tIHxvYmplY3R8XCIgYXNcbiAqIHNwZWNpZmllZCBpbiB0aGUgc3BlY2lmaWNhdGlvbjpcbiAqIGh0dHBzOi8vZmV0Y2guc3BlYy53aGF0d2cub3JnLyNjb25jZXB0LWJvZHlpbml0LWV4dHJhY3RcbiAqXG4gKiBUaGlzIGZ1bmN0aW9uIGFzc3VtZXMgdGhhdCBpbnN0YW5jZS5ib2R5IGlzIHByZXNlbnQuXG4gKlxuICogQHBhcmFtIHthbnl9IGJvZHkgQW55IG9wdGlvbnMuYm9keSBpbnB1dFxuICogQHJldHVybnMge3N0cmluZyB8IG51bGx9XG4gKi9cbmNvbnN0IGV4dHJhY3RDb250ZW50VHlwZSA9IChib2R5LCByZXF1ZXN0KSA9PiB7XG5cdC8vIEJvZHkgaXMgbnVsbCBvciB1bmRlZmluZWRcblx0aWYgKGJvZHkgPT09IG51bGwpIHtcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXG5cdC8vIEJvZHkgaXMgc3RyaW5nXG5cdGlmICh0eXBlb2YgYm9keSA9PT0gJ3N0cmluZycpIHtcblx0XHRyZXR1cm4gJ3RleHQvcGxhaW47Y2hhcnNldD1VVEYtOCc7XG5cdH1cblxuXHQvLyBCb2R5IGlzIGEgVVJMU2VhcmNoUGFyYW1zXG5cdGlmIChpc1VSTFNlYXJjaFBhcmFtZXRlcnMoYm9keSkpIHtcblx0XHRyZXR1cm4gJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDtjaGFyc2V0PVVURi04Jztcblx0fVxuXG5cdC8vIEJvZHkgaXMgYmxvYlxuXHRpZiAoaXNCbG9iKGJvZHkpKSB7XG5cdFx0cmV0dXJuIGJvZHkudHlwZSB8fCBudWxsO1xuXHR9XG5cblx0Ly8gQm9keSBpcyBhIEJ1ZmZlciAoQnVmZmVyLCBBcnJheUJ1ZmZlciBvciBBcnJheUJ1ZmZlclZpZXcpXG5cdGlmIChCdWZmZXIuaXNCdWZmZXIoYm9keSkgfHwgdXRpbC50eXBlcy5pc0FueUFycmF5QnVmZmVyKGJvZHkpIHx8IEFycmF5QnVmZmVyLmlzVmlldyhib2R5KSkge1xuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cblx0Ly8gRGV0ZWN0IGZvcm0gZGF0YSBpbnB1dCBmcm9tIGZvcm0tZGF0YSBtb2R1bGVcblx0aWYgKGJvZHkgJiYgdHlwZW9mIGJvZHkuZ2V0Qm91bmRhcnkgPT09ICdmdW5jdGlvbicpIHtcblx0XHRyZXR1cm4gYG11bHRpcGFydC9mb3JtLWRhdGE7Ym91bmRhcnk9JHtib2R5LmdldEJvdW5kYXJ5KCl9YDtcblx0fVxuXG5cdGlmIChpc0Zvcm1EYXRhKGJvZHkpKSB7XG5cdFx0cmV0dXJuIGBtdWx0aXBhcnQvZm9ybS1kYXRhOyBib3VuZGFyeT0ke3JlcXVlc3RbSU5URVJOQUxTXS5ib3VuZGFyeX1gO1xuXHR9XG5cblx0Ly8gQm9keSBpcyBzdHJlYW0gLSBjYW4ndCByZWFsbHkgZG8gbXVjaCBhYm91dCB0aGlzXG5cdGlmIChib2R5IGluc3RhbmNlb2YgU3RyZWFtKSB7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblxuXHQvLyBCb2R5IGNvbnN0cnVjdG9yIGRlZmF1bHRzIG90aGVyIHRoaW5ncyB0byBzdHJpbmdcblx0cmV0dXJuICd0ZXh0L3BsYWluO2NoYXJzZXQ9VVRGLTgnO1xufTtcblxuLyoqXG4gKiBUaGUgRmV0Y2ggU3RhbmRhcmQgdHJlYXRzIHRoaXMgYXMgaWYgXCJ0b3RhbCBieXRlc1wiIGlzIGEgcHJvcGVydHkgb24gdGhlIGJvZHkuXG4gKiBGb3IgdXMsIHdlIGhhdmUgdG8gZXhwbGljaXRseSBnZXQgaXQgd2l0aCBhIGZ1bmN0aW9uLlxuICpcbiAqIHJlZjogaHR0cHM6Ly9mZXRjaC5zcGVjLndoYXR3Zy5vcmcvI2NvbmNlcHQtYm9keS10b3RhbC1ieXRlc1xuICpcbiAqIEBwYXJhbSB7YW55fSBvYmouYm9keSBCb2R5IG9iamVjdCBmcm9tIHRoZSBCb2R5IGluc3RhbmNlLlxuICogQHJldHVybnMge251bWJlciB8IG51bGx9XG4gKi9cbmNvbnN0IGdldFRvdGFsQnl0ZXMgPSByZXF1ZXN0ID0+IHtcblx0Y29uc3Qge2JvZHl9ID0gcmVxdWVzdDtcblxuXHQvLyBCb2R5IGlzIG51bGwgb3IgdW5kZWZpbmVkXG5cdGlmIChib2R5ID09PSBudWxsKSB7XG5cdFx0cmV0dXJuIDA7XG5cdH1cblxuXHQvLyBCb2R5IGlzIEJsb2Jcblx0aWYgKGlzQmxvYihib2R5KSkge1xuXHRcdHJldHVybiBib2R5LnNpemU7XG5cdH1cblxuXHQvLyBCb2R5IGlzIEJ1ZmZlclxuXHRpZiAoQnVmZmVyLmlzQnVmZmVyKGJvZHkpKSB7XG5cdFx0cmV0dXJuIGJvZHkubGVuZ3RoO1xuXHR9XG5cblx0Ly8gRGV0ZWN0IGZvcm0gZGF0YSBpbnB1dCBmcm9tIGZvcm0tZGF0YSBtb2R1bGVcblx0aWYgKGJvZHkgJiYgdHlwZW9mIGJvZHkuZ2V0TGVuZ3RoU3luYyA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdHJldHVybiBib2R5Lmhhc0tub3duTGVuZ3RoICYmIGJvZHkuaGFzS25vd25MZW5ndGgoKSA/IGJvZHkuZ2V0TGVuZ3RoU3luYygpIDogbnVsbDtcblx0fVxuXG5cdC8vIEJvZHkgaXMgYSBzcGVjLWNvbXBsaWFudCBmb3JtLWRhdGFcblx0aWYgKGlzRm9ybURhdGEoYm9keSkpIHtcblx0XHRyZXR1cm4gZ2V0Rm9ybURhdGFMZW5ndGgocmVxdWVzdFtJTlRFUk5BTFNdLmJvdW5kYXJ5KTtcblx0fVxuXG5cdC8vIEJvZHkgaXMgc3RyZWFtXG5cdHJldHVybiBudWxsO1xufTtcblxuLyoqXG4gKiBXcml0ZSBhIEJvZHkgdG8gYSBOb2RlLmpzIFdyaXRhYmxlU3RyZWFtIChlLmcuIGh0dHAuUmVxdWVzdCkgb2JqZWN0LlxuICpcbiAqIEBwYXJhbSB7U3RyZWFtLldyaXRhYmxlfSBkZXN0IFRoZSBzdHJlYW0gdG8gd3JpdGUgdG8uXG4gKiBAcGFyYW0gb2JqLmJvZHkgQm9keSBvYmplY3QgZnJvbSB0aGUgQm9keSBpbnN0YW5jZS5cbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5jb25zdCB3cml0ZVRvU3RyZWFtID0gKGRlc3QsIHtib2R5fSkgPT4ge1xuXHRpZiAoYm9keSA9PT0gbnVsbCkge1xuXHRcdC8vIEJvZHkgaXMgbnVsbFxuXHRcdGRlc3QuZW5kKCk7XG5cdH0gZWxzZSBpZiAoaXNCbG9iKGJvZHkpKSB7XG5cdFx0Ly8gQm9keSBpcyBCbG9iXG5cdFx0Ym9keS5zdHJlYW0oKS5waXBlKGRlc3QpO1xuXHR9IGVsc2UgaWYgKEJ1ZmZlci5pc0J1ZmZlcihib2R5KSkge1xuXHRcdC8vIEJvZHkgaXMgYnVmZmVyXG5cdFx0ZGVzdC53cml0ZShib2R5KTtcblx0XHRkZXN0LmVuZCgpO1xuXHR9IGVsc2Uge1xuXHRcdC8vIEJvZHkgaXMgc3RyZWFtXG5cdFx0Ym9keS5waXBlKGRlc3QpO1xuXHR9XG59O1xuXG4vKipcbiAqIEhlYWRlcnMuanNcbiAqXG4gKiBIZWFkZXJzIGNsYXNzIG9mZmVycyBjb252ZW5pZW50IGhlbHBlcnNcbiAqL1xuXG5jb25zdCB2YWxpZGF0ZUhlYWRlck5hbWUgPSB0eXBlb2YgaHR0cC52YWxpZGF0ZUhlYWRlck5hbWUgPT09ICdmdW5jdGlvbicgP1xuXHRodHRwLnZhbGlkYXRlSGVhZGVyTmFtZSA6XG5cdG5hbWUgPT4ge1xuXHRcdGlmICghL15bXFxeYFxcLVxcdyEjJCUmJyorLnx+XSskLy50ZXN0KG5hbWUpKSB7XG5cdFx0XHRjb25zdCBlcnIgPSBuZXcgVHlwZUVycm9yKGBIZWFkZXIgbmFtZSBtdXN0IGJlIGEgdmFsaWQgSFRUUCB0b2tlbiBbJHtuYW1lfV1gKTtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlcnIsICdjb2RlJywge3ZhbHVlOiAnRVJSX0lOVkFMSURfSFRUUF9UT0tFTid9KTtcblx0XHRcdHRocm93IGVycjtcblx0XHR9XG5cdH07XG5cbmNvbnN0IHZhbGlkYXRlSGVhZGVyVmFsdWUgPSB0eXBlb2YgaHR0cC52YWxpZGF0ZUhlYWRlclZhbHVlID09PSAnZnVuY3Rpb24nID9cblx0aHR0cC52YWxpZGF0ZUhlYWRlclZhbHVlIDpcblx0KG5hbWUsIHZhbHVlKSA9PiB7XG5cdFx0aWYgKC9bXlxcdFxcdTAwMjAtXFx1MDA3RVxcdTAwODAtXFx1MDBGRl0vLnRlc3QodmFsdWUpKSB7XG5cdFx0XHRjb25zdCBlcnIgPSBuZXcgVHlwZUVycm9yKGBJbnZhbGlkIGNoYXJhY3RlciBpbiBoZWFkZXIgY29udGVudCBbXCIke25hbWV9XCJdYCk7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXJyLCAnY29kZScsIHt2YWx1ZTogJ0VSUl9JTlZBTElEX0NIQVInfSk7XG5cdFx0XHR0aHJvdyBlcnI7XG5cdFx0fVxuXHR9O1xuXG4vKipcbiAqIEB0eXBlZGVmIHtIZWFkZXJzIHwgUmVjb3JkPHN0cmluZywgc3RyaW5nPiB8IEl0ZXJhYmxlPHJlYWRvbmx5IFtzdHJpbmcsIHN0cmluZ10+IHwgSXRlcmFibGU8SXRlcmFibGU8c3RyaW5nPj59IEhlYWRlcnNJbml0XG4gKi9cblxuLyoqXG4gKiBUaGlzIEZldGNoIEFQSSBpbnRlcmZhY2UgYWxsb3dzIHlvdSB0byBwZXJmb3JtIHZhcmlvdXMgYWN0aW9ucyBvbiBIVFRQIHJlcXVlc3QgYW5kIHJlc3BvbnNlIGhlYWRlcnMuXG4gKiBUaGVzZSBhY3Rpb25zIGluY2x1ZGUgcmV0cmlldmluZywgc2V0dGluZywgYWRkaW5nIHRvLCBhbmQgcmVtb3ZpbmcuXG4gKiBBIEhlYWRlcnMgb2JqZWN0IGhhcyBhbiBhc3NvY2lhdGVkIGhlYWRlciBsaXN0LCB3aGljaCBpcyBpbml0aWFsbHkgZW1wdHkgYW5kIGNvbnNpc3RzIG9mIHplcm8gb3IgbW9yZSBuYW1lIGFuZCB2YWx1ZSBwYWlycy5cbiAqIFlvdSBjYW4gYWRkIHRvIHRoaXMgdXNpbmcgbWV0aG9kcyBsaWtlIGFwcGVuZCgpIChzZWUgRXhhbXBsZXMuKVxuICogSW4gYWxsIG1ldGhvZHMgb2YgdGhpcyBpbnRlcmZhY2UsIGhlYWRlciBuYW1lcyBhcmUgbWF0Y2hlZCBieSBjYXNlLWluc2Vuc2l0aXZlIGJ5dGUgc2VxdWVuY2UuXG4gKlxuICovXG5jbGFzcyBIZWFkZXJzIGV4dGVuZHMgVVJMU2VhcmNoUGFyYW1zIHtcblx0LyoqXG5cdCAqIEhlYWRlcnMgY2xhc3Ncblx0ICpcblx0ICogQGNvbnN0cnVjdG9yXG5cdCAqIEBwYXJhbSB7SGVhZGVyc0luaXR9IFtpbml0XSAtIFJlc3BvbnNlIGhlYWRlcnNcblx0ICovXG5cdGNvbnN0cnVjdG9yKGluaXQpIHtcblx0XHQvLyBWYWxpZGF0ZSBhbmQgbm9ybWFsaXplIGluaXQgb2JqZWN0IGluIFtuYW1lLCB2YWx1ZShzKV1bXVxuXHRcdC8qKiBAdHlwZSB7c3RyaW5nW11bXX0gKi9cblx0XHRsZXQgcmVzdWx0ID0gW107XG5cdFx0aWYgKGluaXQgaW5zdGFuY2VvZiBIZWFkZXJzKSB7XG5cdFx0XHRjb25zdCByYXcgPSBpbml0LnJhdygpO1xuXHRcdFx0Zm9yIChjb25zdCBbbmFtZSwgdmFsdWVzXSBvZiBPYmplY3QuZW50cmllcyhyYXcpKSB7XG5cdFx0XHRcdHJlc3VsdC5wdXNoKC4uLnZhbHVlcy5tYXAodmFsdWUgPT4gW25hbWUsIHZhbHVlXSkpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSBpZiAoaW5pdCA9PSBudWxsKSA7IGVsc2UgaWYgKHR5cGVvZiBpbml0ID09PSAnb2JqZWN0JyAmJiAhdXRpbC50eXBlcy5pc0JveGVkUHJpbWl0aXZlKGluaXQpKSB7XG5cdFx0XHRjb25zdCBtZXRob2QgPSBpbml0W1N5bWJvbC5pdGVyYXRvcl07XG5cdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tZXEtbnVsbCwgZXFlcWVxXG5cdFx0XHRpZiAobWV0aG9kID09IG51bGwpIHtcblx0XHRcdFx0Ly8gUmVjb3JkPEJ5dGVTdHJpbmcsIEJ5dGVTdHJpbmc+XG5cdFx0XHRcdHJlc3VsdC5wdXNoKC4uLk9iamVjdC5lbnRyaWVzKGluaXQpKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmICh0eXBlb2YgbWV0aG9kICE9PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignSGVhZGVyIHBhaXJzIG11c3QgYmUgaXRlcmFibGUnKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIFNlcXVlbmNlPHNlcXVlbmNlPEJ5dGVTdHJpbmc+PlxuXHRcdFx0XHQvLyBOb3RlOiBwZXIgc3BlYyB3ZSBoYXZlIHRvIGZpcnN0IGV4aGF1c3QgdGhlIGxpc3RzIHRoZW4gcHJvY2VzcyB0aGVtXG5cdFx0XHRcdHJlc3VsdCA9IFsuLi5pbml0XVxuXHRcdFx0XHRcdC5tYXAocGFpciA9PiB7XG5cdFx0XHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0XHRcdHR5cGVvZiBwYWlyICE9PSAnb2JqZWN0JyB8fCB1dGlsLnR5cGVzLmlzQm94ZWRQcmltaXRpdmUocGFpcilcblx0XHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdFYWNoIGhlYWRlciBwYWlyIG11c3QgYmUgYW4gaXRlcmFibGUgb2JqZWN0Jyk7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdHJldHVybiBbLi4ucGFpcl07XG5cdFx0XHRcdFx0fSkubWFwKHBhaXIgPT4ge1xuXHRcdFx0XHRcdFx0aWYgKHBhaXIubGVuZ3RoICE9PSAyKSB7XG5cdFx0XHRcdFx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ0VhY2ggaGVhZGVyIHBhaXIgbXVzdCBiZSBhIG5hbWUvdmFsdWUgdHVwbGUnKTtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0cmV0dXJuIFsuLi5wYWlyXTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignRmFpbGVkIHRvIGNvbnN0cnVjdCBcXCdIZWFkZXJzXFwnOiBUaGUgcHJvdmlkZWQgdmFsdWUgaXMgbm90IG9mIHR5cGUgXFwnKHNlcXVlbmNlPHNlcXVlbmNlPEJ5dGVTdHJpbmc+PiBvciByZWNvcmQ8Qnl0ZVN0cmluZywgQnl0ZVN0cmluZz4pJyk7XG5cdFx0fVxuXG5cdFx0Ly8gVmFsaWRhdGUgYW5kIGxvd2VyY2FzZVxuXHRcdHJlc3VsdCA9XG5cdFx0XHRyZXN1bHQubGVuZ3RoID4gMCA/XG5cdFx0XHRcdHJlc3VsdC5tYXAoKFtuYW1lLCB2YWx1ZV0pID0+IHtcblx0XHRcdFx0XHR2YWxpZGF0ZUhlYWRlck5hbWUobmFtZSk7XG5cdFx0XHRcdFx0dmFsaWRhdGVIZWFkZXJWYWx1ZShuYW1lLCBTdHJpbmcodmFsdWUpKTtcblx0XHRcdFx0XHRyZXR1cm4gW1N0cmluZyhuYW1lKS50b0xvd2VyQ2FzZSgpLCBTdHJpbmcodmFsdWUpXTtcblx0XHRcdFx0fSkgOlxuXHRcdFx0XHR1bmRlZmluZWQ7XG5cblx0XHRzdXBlcihyZXN1bHQpO1xuXG5cdFx0Ly8gUmV0dXJuaW5nIGEgUHJveHkgdGhhdCB3aWxsIGxvd2VyY2FzZSBrZXkgbmFtZXMsIHZhbGlkYXRlIHBhcmFtZXRlcnMgYW5kIHNvcnQga2V5c1xuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zdHJ1Y3Rvci1yZXR1cm5cblx0XHRyZXR1cm4gbmV3IFByb3h5KHRoaXMsIHtcblx0XHRcdGdldCh0YXJnZXQsIHAsIHJlY2VpdmVyKSB7XG5cdFx0XHRcdHN3aXRjaCAocCkge1xuXHRcdFx0XHRcdGNhc2UgJ2FwcGVuZCc6XG5cdFx0XHRcdFx0Y2FzZSAnc2V0Jzpcblx0XHRcdFx0XHRcdHJldHVybiAobmFtZSwgdmFsdWUpID0+IHtcblx0XHRcdFx0XHRcdFx0dmFsaWRhdGVIZWFkZXJOYW1lKG5hbWUpO1xuXHRcdFx0XHRcdFx0XHR2YWxpZGF0ZUhlYWRlclZhbHVlKG5hbWUsIFN0cmluZyh2YWx1ZSkpO1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gVVJMU2VhcmNoUGFyYW1zLnByb3RvdHlwZVtwXS5jYWxsKFxuXHRcdFx0XHRcdFx0XHRcdHJlY2VpdmVyLFxuXHRcdFx0XHRcdFx0XHRcdFN0cmluZyhuYW1lKS50b0xvd2VyQ2FzZSgpLFxuXHRcdFx0XHRcdFx0XHRcdFN0cmluZyh2YWx1ZSlcblx0XHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHRjYXNlICdkZWxldGUnOlxuXHRcdFx0XHRcdGNhc2UgJ2hhcyc6XG5cdFx0XHRcdFx0Y2FzZSAnZ2V0QWxsJzpcblx0XHRcdFx0XHRcdHJldHVybiBuYW1lID0+IHtcblx0XHRcdFx0XHRcdFx0dmFsaWRhdGVIZWFkZXJOYW1lKG5hbWUpO1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gVVJMU2VhcmNoUGFyYW1zLnByb3RvdHlwZVtwXS5jYWxsKFxuXHRcdFx0XHRcdFx0XHRcdHJlY2VpdmVyLFxuXHRcdFx0XHRcdFx0XHRcdFN0cmluZyhuYW1lKS50b0xvd2VyQ2FzZSgpXG5cdFx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHR9O1xuXG5cdFx0XHRcdFx0Y2FzZSAna2V5cyc6XG5cdFx0XHRcdFx0XHRyZXR1cm4gKCkgPT4ge1xuXHRcdFx0XHRcdFx0XHR0YXJnZXQuc29ydCgpO1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gbmV3IFNldChVUkxTZWFyY2hQYXJhbXMucHJvdG90eXBlLmtleXMuY2FsbCh0YXJnZXQpKS5rZXlzKCk7XG5cdFx0XHRcdFx0XHR9O1xuXG5cdFx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRcdHJldHVybiBSZWZsZWN0LmdldCh0YXJnZXQsIHAsIHJlY2VpdmVyKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0LyogYzggaWdub3JlIG5leHQgKi9cblx0XHR9KTtcblx0fVxuXG5cdGdldCBbU3ltYm9sLnRvU3RyaW5nVGFnXSgpIHtcblx0XHRyZXR1cm4gdGhpcy5jb25zdHJ1Y3Rvci5uYW1lO1xuXHR9XG5cblx0dG9TdHJpbmcoKSB7XG5cdFx0cmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh0aGlzKTtcblx0fVxuXG5cdGdldChuYW1lKSB7XG5cdFx0Y29uc3QgdmFsdWVzID0gdGhpcy5nZXRBbGwobmFtZSk7XG5cdFx0aWYgKHZhbHVlcy5sZW5ndGggPT09IDApIHtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblxuXHRcdGxldCB2YWx1ZSA9IHZhbHVlcy5qb2luKCcsICcpO1xuXHRcdGlmICgvXmNvbnRlbnQtZW5jb2RpbmckL2kudGVzdChuYW1lKSkge1xuXHRcdFx0dmFsdWUgPSB2YWx1ZS50b0xvd2VyQ2FzZSgpO1xuXHRcdH1cblxuXHRcdHJldHVybiB2YWx1ZTtcblx0fVxuXG5cdGZvckVhY2goY2FsbGJhY2spIHtcblx0XHRmb3IgKGNvbnN0IG5hbWUgb2YgdGhpcy5rZXlzKCkpIHtcblx0XHRcdGNhbGxiYWNrKHRoaXMuZ2V0KG5hbWUpLCBuYW1lKTtcblx0XHR9XG5cdH1cblxuXHQqIHZhbHVlcygpIHtcblx0XHRmb3IgKGNvbnN0IG5hbWUgb2YgdGhpcy5rZXlzKCkpIHtcblx0XHRcdHlpZWxkIHRoaXMuZ2V0KG5hbWUpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBAdHlwZSB7KCkgPT4gSXRlcmFibGVJdGVyYXRvcjxbc3RyaW5nLCBzdHJpbmddPn1cblx0ICovXG5cdCogZW50cmllcygpIHtcblx0XHRmb3IgKGNvbnN0IG5hbWUgb2YgdGhpcy5rZXlzKCkpIHtcblx0XHRcdHlpZWxkIFtuYW1lLCB0aGlzLmdldChuYW1lKV07XG5cdFx0fVxuXHR9XG5cblx0W1N5bWJvbC5pdGVyYXRvcl0oKSB7XG5cdFx0cmV0dXJuIHRoaXMuZW50cmllcygpO1xuXHR9XG5cblx0LyoqXG5cdCAqIE5vZGUtZmV0Y2ggbm9uLXNwZWMgbWV0aG9kXG5cdCAqIHJldHVybmluZyBhbGwgaGVhZGVycyBhbmQgdGhlaXIgdmFsdWVzIGFzIGFycmF5XG5cdCAqIEByZXR1cm5zIHtSZWNvcmQ8c3RyaW5nLCBzdHJpbmdbXT59XG5cdCAqL1xuXHRyYXcoKSB7XG5cdFx0cmV0dXJuIFsuLi50aGlzLmtleXMoKV0ucmVkdWNlKChyZXN1bHQsIGtleSkgPT4ge1xuXHRcdFx0cmVzdWx0W2tleV0gPSB0aGlzLmdldEFsbChrZXkpO1xuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9LCB7fSk7XG5cdH1cblxuXHQvKipcblx0ICogRm9yIGJldHRlciBjb25zb2xlLmxvZyhoZWFkZXJzKSBhbmQgYWxzbyB0byBjb252ZXJ0IEhlYWRlcnMgaW50byBOb2RlLmpzIFJlcXVlc3QgY29tcGF0aWJsZSBmb3JtYXRcblx0ICovXG5cdFtTeW1ib2wuZm9yKCdub2RlanMudXRpbC5pbnNwZWN0LmN1c3RvbScpXSgpIHtcblx0XHRyZXR1cm4gWy4uLnRoaXMua2V5cygpXS5yZWR1Y2UoKHJlc3VsdCwga2V5KSA9PiB7XG5cdFx0XHRjb25zdCB2YWx1ZXMgPSB0aGlzLmdldEFsbChrZXkpO1xuXHRcdFx0Ly8gSHR0cC5yZXF1ZXN0KCkgb25seSBzdXBwb3J0cyBzdHJpbmcgYXMgSG9zdCBoZWFkZXIuXG5cdFx0XHQvLyBUaGlzIGhhY2sgbWFrZXMgc3BlY2lmeWluZyBjdXN0b20gSG9zdCBoZWFkZXIgcG9zc2libGUuXG5cdFx0XHRpZiAoa2V5ID09PSAnaG9zdCcpIHtcblx0XHRcdFx0cmVzdWx0W2tleV0gPSB2YWx1ZXNbMF07XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXN1bHRba2V5XSA9IHZhbHVlcy5sZW5ndGggPiAxID8gdmFsdWVzIDogdmFsdWVzWzBdO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH0sIHt9KTtcblx0fVxufVxuXG4vKipcbiAqIFJlLXNoYXBpbmcgb2JqZWN0IGZvciBXZWIgSURMIHRlc3RzXG4gKiBPbmx5IG5lZWQgdG8gZG8gaXQgZm9yIG92ZXJyaWRkZW4gbWV0aG9kc1xuICovXG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyhcblx0SGVhZGVycy5wcm90b3R5cGUsXG5cdFsnZ2V0JywgJ2VudHJpZXMnLCAnZm9yRWFjaCcsICd2YWx1ZXMnXS5yZWR1Y2UoKHJlc3VsdCwgcHJvcGVydHkpID0+IHtcblx0XHRyZXN1bHRbcHJvcGVydHldID0ge2VudW1lcmFibGU6IHRydWV9O1xuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0sIHt9KVxuKTtcblxuLyoqXG4gKiBDcmVhdGUgYSBIZWFkZXJzIG9iamVjdCBmcm9tIGFuIGh0dHAuSW5jb21pbmdNZXNzYWdlLnJhd0hlYWRlcnMsIGlnbm9yaW5nIHRob3NlIHRoYXQgZG9cbiAqIG5vdCBjb25mb3JtIHRvIEhUVFAgZ3JhbW1hciBwcm9kdWN0aW9ucy5cbiAqIEBwYXJhbSB7aW1wb3J0KCdodHRwJykuSW5jb21pbmdNZXNzYWdlWydyYXdIZWFkZXJzJ119IGhlYWRlcnNcbiAqL1xuZnVuY3Rpb24gZnJvbVJhd0hlYWRlcnMoaGVhZGVycyA9IFtdKSB7XG5cdHJldHVybiBuZXcgSGVhZGVycyhcblx0XHRoZWFkZXJzXG5cdFx0XHQvLyBTcGxpdCBpbnRvIHBhaXJzXG5cdFx0XHQucmVkdWNlKChyZXN1bHQsIHZhbHVlLCBpbmRleCwgYXJyYXkpID0+IHtcblx0XHRcdFx0aWYgKGluZGV4ICUgMiA9PT0gMCkge1xuXHRcdFx0XHRcdHJlc3VsdC5wdXNoKGFycmF5LnNsaWNlKGluZGV4LCBpbmRleCArIDIpKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHR9LCBbXSlcblx0XHRcdC5maWx0ZXIoKFtuYW1lLCB2YWx1ZV0pID0+IHtcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHR2YWxpZGF0ZUhlYWRlck5hbWUobmFtZSk7XG5cdFx0XHRcdFx0dmFsaWRhdGVIZWFkZXJWYWx1ZShuYW1lLCBTdHJpbmcodmFsdWUpKTtcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0fSBjYXRjaCB7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHR9KVxuXG5cdCk7XG59XG5cbmNvbnN0IHJlZGlyZWN0U3RhdHVzID0gbmV3IFNldChbMzAxLCAzMDIsIDMwMywgMzA3LCAzMDhdKTtcblxuLyoqXG4gKiBSZWRpcmVjdCBjb2RlIG1hdGNoaW5nXG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IGNvZGUgLSBTdGF0dXMgY29kZVxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuY29uc3QgaXNSZWRpcmVjdCA9IGNvZGUgPT4ge1xuXHRyZXR1cm4gcmVkaXJlY3RTdGF0dXMuaGFzKGNvZGUpO1xufTtcblxuLyoqXG4gKiBSZXNwb25zZS5qc1xuICpcbiAqIFJlc3BvbnNlIGNsYXNzIHByb3ZpZGVzIGNvbnRlbnQgZGVjb2RpbmdcbiAqL1xuXG5jb25zdCBJTlRFUk5BTFMkMSA9IFN5bWJvbCgnUmVzcG9uc2UgaW50ZXJuYWxzJyk7XG5cbi8qKlxuICogUmVzcG9uc2UgY2xhc3NcbiAqXG4gKiBAcGFyYW0gICBTdHJlYW0gIGJvZHkgIFJlYWRhYmxlIHN0cmVhbVxuICogQHBhcmFtICAgT2JqZWN0ICBvcHRzICBSZXNwb25zZSBvcHRpb25zXG4gKiBAcmV0dXJuICBWb2lkXG4gKi9cbmNsYXNzIFJlc3BvbnNlIGV4dGVuZHMgQm9keSB7XG5cdGNvbnN0cnVjdG9yKGJvZHkgPSBudWxsLCBvcHRpb25zID0ge30pIHtcblx0XHRzdXBlcihib2R5LCBvcHRpb25zKTtcblxuXHRcdGNvbnN0IHN0YXR1cyA9IG9wdGlvbnMuc3RhdHVzIHx8IDIwMDtcblx0XHRjb25zdCBoZWFkZXJzID0gbmV3IEhlYWRlcnMob3B0aW9ucy5oZWFkZXJzKTtcblxuXHRcdGlmIChib2R5ICE9PSBudWxsICYmICFoZWFkZXJzLmhhcygnQ29udGVudC1UeXBlJykpIHtcblx0XHRcdGNvbnN0IGNvbnRlbnRUeXBlID0gZXh0cmFjdENvbnRlbnRUeXBlKGJvZHkpO1xuXHRcdFx0aWYgKGNvbnRlbnRUeXBlKSB7XG5cdFx0XHRcdGhlYWRlcnMuYXBwZW5kKCdDb250ZW50LVR5cGUnLCBjb250ZW50VHlwZSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dGhpc1tJTlRFUk5BTFMkMV0gPSB7XG5cdFx0XHR1cmw6IG9wdGlvbnMudXJsLFxuXHRcdFx0c3RhdHVzLFxuXHRcdFx0c3RhdHVzVGV4dDogb3B0aW9ucy5zdGF0dXNUZXh0IHx8ICcnLFxuXHRcdFx0aGVhZGVycyxcblx0XHRcdGNvdW50ZXI6IG9wdGlvbnMuY291bnRlcixcblx0XHRcdGhpZ2hXYXRlck1hcms6IG9wdGlvbnMuaGlnaFdhdGVyTWFya1xuXHRcdH07XG5cdH1cblxuXHRnZXQgdXJsKCkge1xuXHRcdHJldHVybiB0aGlzW0lOVEVSTkFMUyQxXS51cmwgfHwgJyc7XG5cdH1cblxuXHRnZXQgc3RhdHVzKCkge1xuXHRcdHJldHVybiB0aGlzW0lOVEVSTkFMUyQxXS5zdGF0dXM7XG5cdH1cblxuXHQvKipcblx0ICogQ29udmVuaWVuY2UgcHJvcGVydHkgcmVwcmVzZW50aW5nIGlmIHRoZSByZXF1ZXN0IGVuZGVkIG5vcm1hbGx5XG5cdCAqL1xuXHRnZXQgb2soKSB7XG5cdFx0cmV0dXJuIHRoaXNbSU5URVJOQUxTJDFdLnN0YXR1cyA+PSAyMDAgJiYgdGhpc1tJTlRFUk5BTFMkMV0uc3RhdHVzIDwgMzAwO1xuXHR9XG5cblx0Z2V0IHJlZGlyZWN0ZWQoKSB7XG5cdFx0cmV0dXJuIHRoaXNbSU5URVJOQUxTJDFdLmNvdW50ZXIgPiAwO1xuXHR9XG5cblx0Z2V0IHN0YXR1c1RleHQoKSB7XG5cdFx0cmV0dXJuIHRoaXNbSU5URVJOQUxTJDFdLnN0YXR1c1RleHQ7XG5cdH1cblxuXHRnZXQgaGVhZGVycygpIHtcblx0XHRyZXR1cm4gdGhpc1tJTlRFUk5BTFMkMV0uaGVhZGVycztcblx0fVxuXG5cdGdldCBoaWdoV2F0ZXJNYXJrKCkge1xuXHRcdHJldHVybiB0aGlzW0lOVEVSTkFMUyQxXS5oaWdoV2F0ZXJNYXJrO1xuXHR9XG5cblx0LyoqXG5cdCAqIENsb25lIHRoaXMgcmVzcG9uc2Vcblx0ICpcblx0ICogQHJldHVybiAgUmVzcG9uc2Vcblx0ICovXG5cdGNsb25lKCkge1xuXHRcdHJldHVybiBuZXcgUmVzcG9uc2UoY2xvbmUodGhpcywgdGhpcy5oaWdoV2F0ZXJNYXJrKSwge1xuXHRcdFx0dXJsOiB0aGlzLnVybCxcblx0XHRcdHN0YXR1czogdGhpcy5zdGF0dXMsXG5cdFx0XHRzdGF0dXNUZXh0OiB0aGlzLnN0YXR1c1RleHQsXG5cdFx0XHRoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG5cdFx0XHRvazogdGhpcy5vayxcblx0XHRcdHJlZGlyZWN0ZWQ6IHRoaXMucmVkaXJlY3RlZCxcblx0XHRcdHNpemU6IHRoaXMuc2l6ZVxuXHRcdH0pO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgICAgVGhlIFVSTCB0aGF0IHRoZSBuZXcgcmVzcG9uc2UgaXMgdG8gb3JpZ2luYXRlIGZyb20uXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBzdGF0dXMgQW4gb3B0aW9uYWwgc3RhdHVzIGNvZGUgZm9yIHRoZSByZXNwb25zZSAoZS5nLiwgMzAyLilcblx0ICogQHJldHVybnMge1Jlc3BvbnNlfSAgICBBIFJlc3BvbnNlIG9iamVjdC5cblx0ICovXG5cdHN0YXRpYyByZWRpcmVjdCh1cmwsIHN0YXR1cyA9IDMwMikge1xuXHRcdGlmICghaXNSZWRpcmVjdChzdGF0dXMpKSB7XG5cdFx0XHR0aHJvdyBuZXcgUmFuZ2VFcnJvcignRmFpbGVkIHRvIGV4ZWN1dGUgXCJyZWRpcmVjdFwiIG9uIFwicmVzcG9uc2VcIjogSW52YWxpZCBzdGF0dXMgY29kZScpO1xuXHRcdH1cblxuXHRcdHJldHVybiBuZXcgUmVzcG9uc2UobnVsbCwge1xuXHRcdFx0aGVhZGVyczoge1xuXHRcdFx0XHRsb2NhdGlvbjogbmV3IFVSTCh1cmwpLnRvU3RyaW5nKClcblx0XHRcdH0sXG5cdFx0XHRzdGF0dXNcblx0XHR9KTtcblx0fVxuXG5cdGdldCBbU3ltYm9sLnRvU3RyaW5nVGFnXSgpIHtcblx0XHRyZXR1cm4gJ1Jlc3BvbnNlJztcblx0fVxufVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyhSZXNwb25zZS5wcm90b3R5cGUsIHtcblx0dXJsOiB7ZW51bWVyYWJsZTogdHJ1ZX0sXG5cdHN0YXR1czoge2VudW1lcmFibGU6IHRydWV9LFxuXHRvazoge2VudW1lcmFibGU6IHRydWV9LFxuXHRyZWRpcmVjdGVkOiB7ZW51bWVyYWJsZTogdHJ1ZX0sXG5cdHN0YXR1c1RleHQ6IHtlbnVtZXJhYmxlOiB0cnVlfSxcblx0aGVhZGVyczoge2VudW1lcmFibGU6IHRydWV9LFxuXHRjbG9uZToge2VudW1lcmFibGU6IHRydWV9XG59KTtcblxuY29uc3QgZ2V0U2VhcmNoID0gcGFyc2VkVVJMID0+IHtcblx0aWYgKHBhcnNlZFVSTC5zZWFyY2gpIHtcblx0XHRyZXR1cm4gcGFyc2VkVVJMLnNlYXJjaDtcblx0fVxuXG5cdGNvbnN0IGxhc3RPZmZzZXQgPSBwYXJzZWRVUkwuaHJlZi5sZW5ndGggLSAxO1xuXHRjb25zdCBoYXNoID0gcGFyc2VkVVJMLmhhc2ggfHwgKHBhcnNlZFVSTC5ocmVmW2xhc3RPZmZzZXRdID09PSAnIycgPyAnIycgOiAnJyk7XG5cdHJldHVybiBwYXJzZWRVUkwuaHJlZltsYXN0T2Zmc2V0IC0gaGFzaC5sZW5ndGhdID09PSAnPycgPyAnPycgOiAnJztcbn07XG5cbmNvbnN0IElOVEVSTkFMUyQyID0gU3ltYm9sKCdSZXF1ZXN0IGludGVybmFscycpO1xuXG4vKipcbiAqIENoZWNrIGlmIGBvYmpgIGlzIGFuIGluc3RhbmNlIG9mIFJlcXVlc3QuXG4gKlxuICogQHBhcmFtICB7Kn0gb2JqXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5jb25zdCBpc1JlcXVlc3QgPSBvYmplY3QgPT4ge1xuXHRyZXR1cm4gKFxuXHRcdHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnICYmXG5cdFx0dHlwZW9mIG9iamVjdFtJTlRFUk5BTFMkMl0gPT09ICdvYmplY3QnXG5cdCk7XG59O1xuXG4vKipcbiAqIFJlcXVlc3QgY2xhc3NcbiAqXG4gKiBAcGFyYW0gICBNaXhlZCAgIGlucHV0ICBVcmwgb3IgUmVxdWVzdCBpbnN0YW5jZVxuICogQHBhcmFtICAgT2JqZWN0ICBpbml0ICAgQ3VzdG9tIG9wdGlvbnNcbiAqIEByZXR1cm4gIFZvaWRcbiAqL1xuY2xhc3MgUmVxdWVzdCBleHRlbmRzIEJvZHkge1xuXHRjb25zdHJ1Y3RvcihpbnB1dCwgaW5pdCA9IHt9KSB7XG5cdFx0bGV0IHBhcnNlZFVSTDtcblxuXHRcdC8vIE5vcm1hbGl6ZSBpbnB1dCBhbmQgZm9yY2UgVVJMIHRvIGJlIGVuY29kZWQgYXMgVVRGLTggKGh0dHBzOi8vZ2l0aHViLmNvbS9ub2RlLWZldGNoL25vZGUtZmV0Y2gvaXNzdWVzLzI0NSlcblx0XHRpZiAoaXNSZXF1ZXN0KGlucHV0KSkge1xuXHRcdFx0cGFyc2VkVVJMID0gbmV3IFVSTChpbnB1dC51cmwpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRwYXJzZWRVUkwgPSBuZXcgVVJMKGlucHV0KTtcblx0XHRcdGlucHV0ID0ge307XG5cdFx0fVxuXG5cdFx0bGV0IG1ldGhvZCA9IGluaXQubWV0aG9kIHx8IGlucHV0Lm1ldGhvZCB8fCAnR0VUJztcblx0XHRtZXRob2QgPSBtZXRob2QudG9VcHBlckNhc2UoKTtcblxuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1lcS1udWxsLCBlcWVxZXFcblx0XHRpZiAoKChpbml0LmJvZHkgIT0gbnVsbCB8fCBpc1JlcXVlc3QoaW5wdXQpKSAmJiBpbnB1dC5ib2R5ICE9PSBudWxsKSAmJlxuXHRcdFx0KG1ldGhvZCA9PT0gJ0dFVCcgfHwgbWV0aG9kID09PSAnSEVBRCcpKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdSZXF1ZXN0IHdpdGggR0VUL0hFQUQgbWV0aG9kIGNhbm5vdCBoYXZlIGJvZHknKTtcblx0XHR9XG5cblx0XHRjb25zdCBpbnB1dEJvZHkgPSBpbml0LmJvZHkgP1xuXHRcdFx0aW5pdC5ib2R5IDpcblx0XHRcdChpc1JlcXVlc3QoaW5wdXQpICYmIGlucHV0LmJvZHkgIT09IG51bGwgP1xuXHRcdFx0XHRjbG9uZShpbnB1dCkgOlxuXHRcdFx0XHRudWxsKTtcblxuXHRcdHN1cGVyKGlucHV0Qm9keSwge1xuXHRcdFx0c2l6ZTogaW5pdC5zaXplIHx8IGlucHV0LnNpemUgfHwgMFxuXHRcdH0pO1xuXG5cdFx0Y29uc3QgaGVhZGVycyA9IG5ldyBIZWFkZXJzKGluaXQuaGVhZGVycyB8fCBpbnB1dC5oZWFkZXJzIHx8IHt9KTtcblxuXHRcdGlmIChpbnB1dEJvZHkgIT09IG51bGwgJiYgIWhlYWRlcnMuaGFzKCdDb250ZW50LVR5cGUnKSkge1xuXHRcdFx0Y29uc3QgY29udGVudFR5cGUgPSBleHRyYWN0Q29udGVudFR5cGUoaW5wdXRCb2R5LCB0aGlzKTtcblx0XHRcdGlmIChjb250ZW50VHlwZSkge1xuXHRcdFx0XHRoZWFkZXJzLmFwcGVuZCgnQ29udGVudC1UeXBlJywgY29udGVudFR5cGUpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGxldCBzaWduYWwgPSBpc1JlcXVlc3QoaW5wdXQpID9cblx0XHRcdGlucHV0LnNpZ25hbCA6XG5cdFx0XHRudWxsO1xuXHRcdGlmICgnc2lnbmFsJyBpbiBpbml0KSB7XG5cdFx0XHRzaWduYWwgPSBpbml0LnNpZ25hbDtcblx0XHR9XG5cblx0XHRpZiAoc2lnbmFsICE9PSBudWxsICYmICFpc0Fib3J0U2lnbmFsKHNpZ25hbCkpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIHNpZ25hbCB0byBiZSBhbiBpbnN0YW5jZW9mIEFib3J0U2lnbmFsJyk7XG5cdFx0fVxuXG5cdFx0dGhpc1tJTlRFUk5BTFMkMl0gPSB7XG5cdFx0XHRtZXRob2QsXG5cdFx0XHRyZWRpcmVjdDogaW5pdC5yZWRpcmVjdCB8fCBpbnB1dC5yZWRpcmVjdCB8fCAnZm9sbG93Jyxcblx0XHRcdGhlYWRlcnMsXG5cdFx0XHRwYXJzZWRVUkwsXG5cdFx0XHRzaWduYWxcblx0XHR9O1xuXG5cdFx0Ly8gTm9kZS1mZXRjaC1vbmx5IG9wdGlvbnNcblx0XHR0aGlzLmZvbGxvdyA9IGluaXQuZm9sbG93ID09PSB1bmRlZmluZWQgPyAoaW5wdXQuZm9sbG93ID09PSB1bmRlZmluZWQgPyAyMCA6IGlucHV0LmZvbGxvdykgOiBpbml0LmZvbGxvdztcblx0XHR0aGlzLmNvbXByZXNzID0gaW5pdC5jb21wcmVzcyA9PT0gdW5kZWZpbmVkID8gKGlucHV0LmNvbXByZXNzID09PSB1bmRlZmluZWQgPyB0cnVlIDogaW5wdXQuY29tcHJlc3MpIDogaW5pdC5jb21wcmVzcztcblx0XHR0aGlzLmNvdW50ZXIgPSBpbml0LmNvdW50ZXIgfHwgaW5wdXQuY291bnRlciB8fCAwO1xuXHRcdHRoaXMuYWdlbnQgPSBpbml0LmFnZW50IHx8IGlucHV0LmFnZW50O1xuXHRcdHRoaXMuaGlnaFdhdGVyTWFyayA9IGluaXQuaGlnaFdhdGVyTWFyayB8fCBpbnB1dC5oaWdoV2F0ZXJNYXJrIHx8IDE2Mzg0O1xuXHRcdHRoaXMuaW5zZWN1cmVIVFRQUGFyc2VyID0gaW5pdC5pbnNlY3VyZUhUVFBQYXJzZXIgfHwgaW5wdXQuaW5zZWN1cmVIVFRQUGFyc2VyIHx8IGZhbHNlO1xuXHR9XG5cblx0Z2V0IG1ldGhvZCgpIHtcblx0XHRyZXR1cm4gdGhpc1tJTlRFUk5BTFMkMl0ubWV0aG9kO1xuXHR9XG5cblx0Z2V0IHVybCgpIHtcblx0XHRyZXR1cm4gdXJsLmZvcm1hdCh0aGlzW0lOVEVSTkFMUyQyXS5wYXJzZWRVUkwpO1xuXHR9XG5cblx0Z2V0IGhlYWRlcnMoKSB7XG5cdFx0cmV0dXJuIHRoaXNbSU5URVJOQUxTJDJdLmhlYWRlcnM7XG5cdH1cblxuXHRnZXQgcmVkaXJlY3QoKSB7XG5cdFx0cmV0dXJuIHRoaXNbSU5URVJOQUxTJDJdLnJlZGlyZWN0O1xuXHR9XG5cblx0Z2V0IHNpZ25hbCgpIHtcblx0XHRyZXR1cm4gdGhpc1tJTlRFUk5BTFMkMl0uc2lnbmFsO1xuXHR9XG5cblx0LyoqXG5cdCAqIENsb25lIHRoaXMgcmVxdWVzdFxuXHQgKlxuXHQgKiBAcmV0dXJuICBSZXF1ZXN0XG5cdCAqL1xuXHRjbG9uZSgpIHtcblx0XHRyZXR1cm4gbmV3IFJlcXVlc3QodGhpcyk7XG5cdH1cblxuXHRnZXQgW1N5bWJvbC50b1N0cmluZ1RhZ10oKSB7XG5cdFx0cmV0dXJuICdSZXF1ZXN0Jztcblx0fVxufVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyhSZXF1ZXN0LnByb3RvdHlwZSwge1xuXHRtZXRob2Q6IHtlbnVtZXJhYmxlOiB0cnVlfSxcblx0dXJsOiB7ZW51bWVyYWJsZTogdHJ1ZX0sXG5cdGhlYWRlcnM6IHtlbnVtZXJhYmxlOiB0cnVlfSxcblx0cmVkaXJlY3Q6IHtlbnVtZXJhYmxlOiB0cnVlfSxcblx0Y2xvbmU6IHtlbnVtZXJhYmxlOiB0cnVlfSxcblx0c2lnbmFsOiB7ZW51bWVyYWJsZTogdHJ1ZX1cbn0pO1xuXG4vKipcbiAqIENvbnZlcnQgYSBSZXF1ZXN0IHRvIE5vZGUuanMgaHR0cCByZXF1ZXN0IG9wdGlvbnMuXG4gKlxuICogQHBhcmFtICAgUmVxdWVzdCAgQSBSZXF1ZXN0IGluc3RhbmNlXG4gKiBAcmV0dXJuICBPYmplY3QgICBUaGUgb3B0aW9ucyBvYmplY3QgdG8gYmUgcGFzc2VkIHRvIGh0dHAucmVxdWVzdFxuICovXG5jb25zdCBnZXROb2RlUmVxdWVzdE9wdGlvbnMgPSByZXF1ZXN0ID0+IHtcblx0Y29uc3Qge3BhcnNlZFVSTH0gPSByZXF1ZXN0W0lOVEVSTkFMUyQyXTtcblx0Y29uc3QgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHJlcXVlc3RbSU5URVJOQUxTJDJdLmhlYWRlcnMpO1xuXG5cdC8vIEZldGNoIHN0ZXAgMS4zXG5cdGlmICghaGVhZGVycy5oYXMoJ0FjY2VwdCcpKSB7XG5cdFx0aGVhZGVycy5zZXQoJ0FjY2VwdCcsICcqLyonKTtcblx0fVxuXG5cdC8vIEhUVFAtbmV0d29yay1vci1jYWNoZSBmZXRjaCBzdGVwcyAyLjQtMi43XG5cdGxldCBjb250ZW50TGVuZ3RoVmFsdWUgPSBudWxsO1xuXHRpZiAocmVxdWVzdC5ib2R5ID09PSBudWxsICYmIC9eKHBvc3R8cHV0KSQvaS50ZXN0KHJlcXVlc3QubWV0aG9kKSkge1xuXHRcdGNvbnRlbnRMZW5ndGhWYWx1ZSA9ICcwJztcblx0fVxuXG5cdGlmIChyZXF1ZXN0LmJvZHkgIT09IG51bGwpIHtcblx0XHRjb25zdCB0b3RhbEJ5dGVzID0gZ2V0VG90YWxCeXRlcyhyZXF1ZXN0KTtcblx0XHQvLyBTZXQgQ29udGVudC1MZW5ndGggaWYgdG90YWxCeXRlcyBpcyBhIG51bWJlciAodGhhdCBpcyBub3QgTmFOKVxuXHRcdGlmICh0eXBlb2YgdG90YWxCeXRlcyA9PT0gJ251bWJlcicgJiYgIU51bWJlci5pc05hTih0b3RhbEJ5dGVzKSkge1xuXHRcdFx0Y29udGVudExlbmd0aFZhbHVlID0gU3RyaW5nKHRvdGFsQnl0ZXMpO1xuXHRcdH1cblx0fVxuXG5cdGlmIChjb250ZW50TGVuZ3RoVmFsdWUpIHtcblx0XHRoZWFkZXJzLnNldCgnQ29udGVudC1MZW5ndGgnLCBjb250ZW50TGVuZ3RoVmFsdWUpO1xuXHR9XG5cblx0Ly8gSFRUUC1uZXR3b3JrLW9yLWNhY2hlIGZldGNoIHN0ZXAgMi4xMVxuXHRpZiAoIWhlYWRlcnMuaGFzKCdVc2VyLUFnZW50JykpIHtcblx0XHRoZWFkZXJzLnNldCgnVXNlci1BZ2VudCcsICdub2RlLWZldGNoJyk7XG5cdH1cblxuXHQvLyBIVFRQLW5ldHdvcmstb3ItY2FjaGUgZmV0Y2ggc3RlcCAyLjE1XG5cdGlmIChyZXF1ZXN0LmNvbXByZXNzICYmICFoZWFkZXJzLmhhcygnQWNjZXB0LUVuY29kaW5nJykpIHtcblx0XHRoZWFkZXJzLnNldCgnQWNjZXB0LUVuY29kaW5nJywgJ2d6aXAsZGVmbGF0ZSxicicpO1xuXHR9XG5cblx0bGV0IHthZ2VudH0gPSByZXF1ZXN0O1xuXHRpZiAodHlwZW9mIGFnZW50ID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0YWdlbnQgPSBhZ2VudChwYXJzZWRVUkwpO1xuXHR9XG5cblx0aWYgKCFoZWFkZXJzLmhhcygnQ29ubmVjdGlvbicpICYmICFhZ2VudCkge1xuXHRcdGhlYWRlcnMuc2V0KCdDb25uZWN0aW9uJywgJ2Nsb3NlJyk7XG5cdH1cblxuXHQvLyBIVFRQLW5ldHdvcmsgZmV0Y2ggc3RlcCA0LjJcblx0Ly8gY2h1bmtlZCBlbmNvZGluZyBpcyBoYW5kbGVkIGJ5IE5vZGUuanNcblxuXHRjb25zdCBzZWFyY2ggPSBnZXRTZWFyY2gocGFyc2VkVVJMKTtcblxuXHQvLyBNYW51YWxseSBzcHJlYWQgdGhlIFVSTCBvYmplY3QgaW5zdGVhZCBvZiBzcHJlYWQgc3ludGF4XG5cdGNvbnN0IHJlcXVlc3RPcHRpb25zID0ge1xuXHRcdHBhdGg6IHBhcnNlZFVSTC5wYXRobmFtZSArIHNlYXJjaCxcblx0XHRwYXRobmFtZTogcGFyc2VkVVJMLnBhdGhuYW1lLFxuXHRcdGhvc3RuYW1lOiBwYXJzZWRVUkwuaG9zdG5hbWUsXG5cdFx0cHJvdG9jb2w6IHBhcnNlZFVSTC5wcm90b2NvbCxcblx0XHRwb3J0OiBwYXJzZWRVUkwucG9ydCxcblx0XHRoYXNoOiBwYXJzZWRVUkwuaGFzaCxcblx0XHRzZWFyY2g6IHBhcnNlZFVSTC5zZWFyY2gsXG5cdFx0cXVlcnk6IHBhcnNlZFVSTC5xdWVyeSxcblx0XHRocmVmOiBwYXJzZWRVUkwuaHJlZixcblx0XHRtZXRob2Q6IHJlcXVlc3QubWV0aG9kLFxuXHRcdGhlYWRlcnM6IGhlYWRlcnNbU3ltYm9sLmZvcignbm9kZWpzLnV0aWwuaW5zcGVjdC5jdXN0b20nKV0oKSxcblx0XHRpbnNlY3VyZUhUVFBQYXJzZXI6IHJlcXVlc3QuaW5zZWN1cmVIVFRQUGFyc2VyLFxuXHRcdGFnZW50XG5cdH07XG5cblx0cmV0dXJuIHJlcXVlc3RPcHRpb25zO1xufTtcblxuLyoqXG4gKiBBYm9ydEVycm9yIGludGVyZmFjZSBmb3IgY2FuY2VsbGVkIHJlcXVlc3RzXG4gKi9cbmNsYXNzIEFib3J0RXJyb3IgZXh0ZW5kcyBGZXRjaEJhc2VFcnJvciB7XG5cdGNvbnN0cnVjdG9yKG1lc3NhZ2UsIHR5cGUgPSAnYWJvcnRlZCcpIHtcblx0XHRzdXBlcihtZXNzYWdlLCB0eXBlKTtcblx0fVxufVxuXG4vKipcbiAqIEluZGV4LmpzXG4gKlxuICogYSByZXF1ZXN0IEFQSSBjb21wYXRpYmxlIHdpdGggd2luZG93LmZldGNoXG4gKlxuICogQWxsIHNwZWMgYWxnb3JpdGhtIHN0ZXAgbnVtYmVycyBhcmUgYmFzZWQgb24gaHR0cHM6Ly9mZXRjaC5zcGVjLndoYXR3Zy5vcmcvY29tbWl0LXNuYXBzaG90cy9hZTcxNjgyMmNiM2E2MTg0MzIyNmNkMDkwZWVmYzY1ODk0NDZjMWQyLy5cbiAqL1xuXG5jb25zdCBzdXBwb3J0ZWRTY2hlbWFzID0gbmV3IFNldChbJ2RhdGE6JywgJ2h0dHA6JywgJ2h0dHBzOiddKTtcblxuLyoqXG4gKiBGZXRjaCBmdW5jdGlvblxuICpcbiAqIEBwYXJhbSAgIHtzdHJpbmcgfCBVUkwgfCBpbXBvcnQoJy4vcmVxdWVzdCcpLmRlZmF1bHR9IHVybCAtIEFic29sdXRlIHVybCBvciBSZXF1ZXN0IGluc3RhbmNlXG4gKiBAcGFyYW0gICB7Kn0gW29wdGlvbnNfXSAtIEZldGNoIG9wdGlvbnNcbiAqIEByZXR1cm4gIHtQcm9taXNlPGltcG9ydCgnLi9yZXNwb25zZScpLmRlZmF1bHQ+fVxuICovXG5hc3luYyBmdW5jdGlvbiBmZXRjaCh1cmwsIG9wdGlvbnNfKSB7XG5cdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0Ly8gQnVpbGQgcmVxdWVzdCBvYmplY3Rcblx0XHRjb25zdCByZXF1ZXN0ID0gbmV3IFJlcXVlc3QodXJsLCBvcHRpb25zXyk7XG5cdFx0Y29uc3Qgb3B0aW9ucyA9IGdldE5vZGVSZXF1ZXN0T3B0aW9ucyhyZXF1ZXN0KTtcblx0XHRpZiAoIXN1cHBvcnRlZFNjaGVtYXMuaGFzKG9wdGlvbnMucHJvdG9jb2wpKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKGBub2RlLWZldGNoIGNhbm5vdCBsb2FkICR7dXJsfS4gVVJMIHNjaGVtZSBcIiR7b3B0aW9ucy5wcm90b2NvbC5yZXBsYWNlKC86JC8sICcnKX1cIiBpcyBub3Qgc3VwcG9ydGVkLmApO1xuXHRcdH1cblxuXHRcdGlmIChvcHRpb25zLnByb3RvY29sID09PSAnZGF0YTonKSB7XG5cdFx0XHRjb25zdCBkYXRhID0gZGF0YVVyaVRvQnVmZmVyKHJlcXVlc3QudXJsKTtcblx0XHRcdGNvbnN0IHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlKGRhdGEsIHtoZWFkZXJzOiB7J0NvbnRlbnQtVHlwZSc6IGRhdGEudHlwZUZ1bGx9fSk7XG5cdFx0XHRyZXNvbHZlKHJlc3BvbnNlKTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyBXcmFwIGh0dHAucmVxdWVzdCBpbnRvIGZldGNoXG5cdFx0Y29uc3Qgc2VuZCA9IChvcHRpb25zLnByb3RvY29sID09PSAnaHR0cHM6JyA/IGh0dHBzIDogaHR0cCkucmVxdWVzdDtcblx0XHRjb25zdCB7c2lnbmFsfSA9IHJlcXVlc3Q7XG5cdFx0bGV0IHJlc3BvbnNlID0gbnVsbDtcblxuXHRcdGNvbnN0IGFib3J0ID0gKCkgPT4ge1xuXHRcdFx0Y29uc3QgZXJyb3IgPSBuZXcgQWJvcnRFcnJvcignVGhlIG9wZXJhdGlvbiB3YXMgYWJvcnRlZC4nKTtcblx0XHRcdHJlamVjdChlcnJvcik7XG5cdFx0XHRpZiAocmVxdWVzdC5ib2R5ICYmIHJlcXVlc3QuYm9keSBpbnN0YW5jZW9mIFN0cmVhbS5SZWFkYWJsZSkge1xuXHRcdFx0XHRyZXF1ZXN0LmJvZHkuZGVzdHJveShlcnJvcik7XG5cdFx0XHR9XG5cblx0XHRcdGlmICghcmVzcG9uc2UgfHwgIXJlc3BvbnNlLmJvZHkpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXNwb25zZS5ib2R5LmVtaXQoJ2Vycm9yJywgZXJyb3IpO1xuXHRcdH07XG5cblx0XHRpZiAoc2lnbmFsICYmIHNpZ25hbC5hYm9ydGVkKSB7XG5cdFx0XHRhYm9ydCgpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGNvbnN0IGFib3J0QW5kRmluYWxpemUgPSAoKSA9PiB7XG5cdFx0XHRhYm9ydCgpO1xuXHRcdFx0ZmluYWxpemUoKTtcblx0XHR9O1xuXG5cdFx0Ly8gU2VuZCByZXF1ZXN0XG5cdFx0Y29uc3QgcmVxdWVzdF8gPSBzZW5kKG9wdGlvbnMpO1xuXG5cdFx0aWYgKHNpZ25hbCkge1xuXHRcdFx0c2lnbmFsLmFkZEV2ZW50TGlzdGVuZXIoJ2Fib3J0JywgYWJvcnRBbmRGaW5hbGl6ZSk7XG5cdFx0fVxuXG5cdFx0Y29uc3QgZmluYWxpemUgPSAoKSA9PiB7XG5cdFx0XHRyZXF1ZXN0Xy5hYm9ydCgpO1xuXHRcdFx0aWYgKHNpZ25hbCkge1xuXHRcdFx0XHRzaWduYWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignYWJvcnQnLCBhYm9ydEFuZEZpbmFsaXplKTtcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0cmVxdWVzdF8ub24oJ2Vycm9yJywgZXJyID0+IHtcblx0XHRcdHJlamVjdChuZXcgRmV0Y2hFcnJvcihgcmVxdWVzdCB0byAke3JlcXVlc3QudXJsfSBmYWlsZWQsIHJlYXNvbjogJHtlcnIubWVzc2FnZX1gLCAnc3lzdGVtJywgZXJyKSk7XG5cdFx0XHRmaW5hbGl6ZSgpO1xuXHRcdH0pO1xuXG5cdFx0cmVxdWVzdF8ub24oJ3Jlc3BvbnNlJywgcmVzcG9uc2VfID0+IHtcblx0XHRcdHJlcXVlc3RfLnNldFRpbWVvdXQoMCk7XG5cdFx0XHRjb25zdCBoZWFkZXJzID0gZnJvbVJhd0hlYWRlcnMocmVzcG9uc2VfLnJhd0hlYWRlcnMpO1xuXG5cdFx0XHQvLyBIVFRQIGZldGNoIHN0ZXAgNVxuXHRcdFx0aWYgKGlzUmVkaXJlY3QocmVzcG9uc2VfLnN0YXR1c0NvZGUpKSB7XG5cdFx0XHRcdC8vIEhUVFAgZmV0Y2ggc3RlcCA1LjJcblx0XHRcdFx0Y29uc3QgbG9jYXRpb24gPSBoZWFkZXJzLmdldCgnTG9jYXRpb24nKTtcblxuXHRcdFx0XHQvLyBIVFRQIGZldGNoIHN0ZXAgNS4zXG5cdFx0XHRcdGNvbnN0IGxvY2F0aW9uVVJMID0gbG9jYXRpb24gPT09IG51bGwgPyBudWxsIDogbmV3IFVSTChsb2NhdGlvbiwgcmVxdWVzdC51cmwpO1xuXG5cdFx0XHRcdC8vIEhUVFAgZmV0Y2ggc3RlcCA1LjVcblx0XHRcdFx0c3dpdGNoIChyZXF1ZXN0LnJlZGlyZWN0KSB7XG5cdFx0XHRcdFx0Y2FzZSAnZXJyb3InOlxuXHRcdFx0XHRcdFx0cmVqZWN0KG5ldyBGZXRjaEVycm9yKGB1cmkgcmVxdWVzdGVkIHJlc3BvbmRzIHdpdGggYSByZWRpcmVjdCwgcmVkaXJlY3QgbW9kZSBpcyBzZXQgdG8gZXJyb3I6ICR7cmVxdWVzdC51cmx9YCwgJ25vLXJlZGlyZWN0JykpO1xuXHRcdFx0XHRcdFx0ZmluYWxpemUoKTtcblx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHRjYXNlICdtYW51YWwnOlxuXHRcdFx0XHRcdFx0Ly8gTm9kZS1mZXRjaC1zcGVjaWZpYyBzdGVwOiBtYWtlIG1hbnVhbCByZWRpcmVjdCBhIGJpdCBlYXNpZXIgdG8gdXNlIGJ5IHNldHRpbmcgdGhlIExvY2F0aW9uIGhlYWRlciB2YWx1ZSB0byB0aGUgcmVzb2x2ZWQgVVJMLlxuXHRcdFx0XHRcdFx0aWYgKGxvY2F0aW9uVVJMICE9PSBudWxsKSB7XG5cdFx0XHRcdFx0XHRcdC8vIEhhbmRsZSBjb3JydXB0ZWQgaGVhZGVyXG5cdFx0XHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRcdFx0aGVhZGVycy5zZXQoJ0xvY2F0aW9uJywgbG9jYXRpb25VUkwpO1xuXHRcdFx0XHRcdFx0XHRcdC8qIGM4IGlnbm9yZSBuZXh0IDMgKi9cblx0XHRcdFx0XHRcdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdFx0XHRcdFx0XHRyZWplY3QoZXJyb3IpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdGNhc2UgJ2ZvbGxvdyc6IHtcblx0XHRcdFx0XHRcdC8vIEhUVFAtcmVkaXJlY3QgZmV0Y2ggc3RlcCAyXG5cdFx0XHRcdFx0XHRpZiAobG9jYXRpb25VUkwgPT09IG51bGwpIHtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdC8vIEhUVFAtcmVkaXJlY3QgZmV0Y2ggc3RlcCA1XG5cdFx0XHRcdFx0XHRpZiAocmVxdWVzdC5jb3VudGVyID49IHJlcXVlc3QuZm9sbG93KSB7XG5cdFx0XHRcdFx0XHRcdHJlamVjdChuZXcgRmV0Y2hFcnJvcihgbWF4aW11bSByZWRpcmVjdCByZWFjaGVkIGF0OiAke3JlcXVlc3QudXJsfWAsICdtYXgtcmVkaXJlY3QnKSk7XG5cdFx0XHRcdFx0XHRcdGZpbmFsaXplKCk7XG5cdFx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0Ly8gSFRUUC1yZWRpcmVjdCBmZXRjaCBzdGVwIDYgKGNvdW50ZXIgaW5jcmVtZW50KVxuXHRcdFx0XHRcdFx0Ly8gQ3JlYXRlIGEgbmV3IFJlcXVlc3Qgb2JqZWN0LlxuXHRcdFx0XHRcdFx0Y29uc3QgcmVxdWVzdE9wdGlvbnMgPSB7XG5cdFx0XHRcdFx0XHRcdGhlYWRlcnM6IG5ldyBIZWFkZXJzKHJlcXVlc3QuaGVhZGVycyksXG5cdFx0XHRcdFx0XHRcdGZvbGxvdzogcmVxdWVzdC5mb2xsb3csXG5cdFx0XHRcdFx0XHRcdGNvdW50ZXI6IHJlcXVlc3QuY291bnRlciArIDEsXG5cdFx0XHRcdFx0XHRcdGFnZW50OiByZXF1ZXN0LmFnZW50LFxuXHRcdFx0XHRcdFx0XHRjb21wcmVzczogcmVxdWVzdC5jb21wcmVzcyxcblx0XHRcdFx0XHRcdFx0bWV0aG9kOiByZXF1ZXN0Lm1ldGhvZCxcblx0XHRcdFx0XHRcdFx0Ym9keTogcmVxdWVzdC5ib2R5LFxuXHRcdFx0XHRcdFx0XHRzaWduYWw6IHJlcXVlc3Quc2lnbmFsLFxuXHRcdFx0XHRcdFx0XHRzaXplOiByZXF1ZXN0LnNpemVcblx0XHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHRcdC8vIEhUVFAtcmVkaXJlY3QgZmV0Y2ggc3RlcCA5XG5cdFx0XHRcdFx0XHRpZiAocmVzcG9uc2VfLnN0YXR1c0NvZGUgIT09IDMwMyAmJiByZXF1ZXN0LmJvZHkgJiYgb3B0aW9uc18uYm9keSBpbnN0YW5jZW9mIFN0cmVhbS5SZWFkYWJsZSkge1xuXHRcdFx0XHRcdFx0XHRyZWplY3QobmV3IEZldGNoRXJyb3IoJ0Nhbm5vdCBmb2xsb3cgcmVkaXJlY3Qgd2l0aCBib2R5IGJlaW5nIGEgcmVhZGFibGUgc3RyZWFtJywgJ3Vuc3VwcG9ydGVkLXJlZGlyZWN0JykpO1xuXHRcdFx0XHRcdFx0XHRmaW5hbGl6ZSgpO1xuXHRcdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdC8vIEhUVFAtcmVkaXJlY3QgZmV0Y2ggc3RlcCAxMVxuXHRcdFx0XHRcdFx0aWYgKHJlc3BvbnNlXy5zdGF0dXNDb2RlID09PSAzMDMgfHwgKChyZXNwb25zZV8uc3RhdHVzQ29kZSA9PT0gMzAxIHx8IHJlc3BvbnNlXy5zdGF0dXNDb2RlID09PSAzMDIpICYmIHJlcXVlc3QubWV0aG9kID09PSAnUE9TVCcpKSB7XG5cdFx0XHRcdFx0XHRcdHJlcXVlc3RPcHRpb25zLm1ldGhvZCA9ICdHRVQnO1xuXHRcdFx0XHRcdFx0XHRyZXF1ZXN0T3B0aW9ucy5ib2R5ID0gdW5kZWZpbmVkO1xuXHRcdFx0XHRcdFx0XHRyZXF1ZXN0T3B0aW9ucy5oZWFkZXJzLmRlbGV0ZSgnY29udGVudC1sZW5ndGgnKTtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0Ly8gSFRUUC1yZWRpcmVjdCBmZXRjaCBzdGVwIDE1XG5cdFx0XHRcdFx0XHRyZXNvbHZlKGZldGNoKG5ldyBSZXF1ZXN0KGxvY2F0aW9uVVJMLCByZXF1ZXN0T3B0aW9ucykpKTtcblx0XHRcdFx0XHRcdGZpbmFsaXplKCk7XG5cdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdC8vIERvIG5vdGhpbmdcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBQcmVwYXJlIHJlc3BvbnNlXG5cdFx0XHRyZXNwb25zZV8ub25jZSgnZW5kJywgKCkgPT4ge1xuXHRcdFx0XHRpZiAoc2lnbmFsKSB7XG5cdFx0XHRcdFx0c2lnbmFsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Fib3J0JywgYWJvcnRBbmRGaW5hbGl6ZSk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHRsZXQgYm9keSA9IFN0cmVhbS5waXBlbGluZShyZXNwb25zZV8sIG5ldyBTdHJlYW0uUGFzc1Rocm91Z2goKSwgZXJyb3IgPT4ge1xuXHRcdFx0XHRyZWplY3QoZXJyb3IpO1xuXHRcdFx0fSk7XG5cdFx0XHQvLyBzZWUgaHR0cHM6Ly9naXRodWIuY29tL25vZGVqcy9ub2RlL3B1bGwvMjkzNzZcblx0XHRcdGlmIChwcm9jZXNzLnZlcnNpb24gPCAndjEyLjEwJykge1xuXHRcdFx0XHRyZXNwb25zZV8ub24oJ2Fib3J0ZWQnLCBhYm9ydEFuZEZpbmFsaXplKTtcblx0XHRcdH1cblxuXHRcdFx0Y29uc3QgcmVzcG9uc2VPcHRpb25zID0ge1xuXHRcdFx0XHR1cmw6IHJlcXVlc3QudXJsLFxuXHRcdFx0XHRzdGF0dXM6IHJlc3BvbnNlXy5zdGF0dXNDb2RlLFxuXHRcdFx0XHRzdGF0dXNUZXh0OiByZXNwb25zZV8uc3RhdHVzTWVzc2FnZSxcblx0XHRcdFx0aGVhZGVycyxcblx0XHRcdFx0c2l6ZTogcmVxdWVzdC5zaXplLFxuXHRcdFx0XHRjb3VudGVyOiByZXF1ZXN0LmNvdW50ZXIsXG5cdFx0XHRcdGhpZ2hXYXRlck1hcms6IHJlcXVlc3QuaGlnaFdhdGVyTWFya1xuXHRcdFx0fTtcblxuXHRcdFx0Ly8gSFRUUC1uZXR3b3JrIGZldGNoIHN0ZXAgMTIuMS4xLjNcblx0XHRcdGNvbnN0IGNvZGluZ3MgPSBoZWFkZXJzLmdldCgnQ29udGVudC1FbmNvZGluZycpO1xuXG5cdFx0XHQvLyBIVFRQLW5ldHdvcmsgZmV0Y2ggc3RlcCAxMi4xLjEuNDogaGFuZGxlIGNvbnRlbnQgY29kaW5nc1xuXG5cdFx0XHQvLyBpbiBmb2xsb3dpbmcgc2NlbmFyaW9zIHdlIGlnbm9yZSBjb21wcmVzc2lvbiBzdXBwb3J0XG5cdFx0XHQvLyAxLiBjb21wcmVzc2lvbiBzdXBwb3J0IGlzIGRpc2FibGVkXG5cdFx0XHQvLyAyLiBIRUFEIHJlcXVlc3Rcblx0XHRcdC8vIDMuIG5vIENvbnRlbnQtRW5jb2RpbmcgaGVhZGVyXG5cdFx0XHQvLyA0LiBubyBjb250ZW50IHJlc3BvbnNlICgyMDQpXG5cdFx0XHQvLyA1LiBjb250ZW50IG5vdCBtb2RpZmllZCByZXNwb25zZSAoMzA0KVxuXHRcdFx0aWYgKCFyZXF1ZXN0LmNvbXByZXNzIHx8IHJlcXVlc3QubWV0aG9kID09PSAnSEVBRCcgfHwgY29kaW5ncyA9PT0gbnVsbCB8fCByZXNwb25zZV8uc3RhdHVzQ29kZSA9PT0gMjA0IHx8IHJlc3BvbnNlXy5zdGF0dXNDb2RlID09PSAzMDQpIHtcblx0XHRcdFx0cmVzcG9uc2UgPSBuZXcgUmVzcG9uc2UoYm9keSwgcmVzcG9uc2VPcHRpb25zKTtcblx0XHRcdFx0cmVzb2x2ZShyZXNwb25zZSk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gRm9yIE5vZGUgdjYrXG5cdFx0XHQvLyBCZSBsZXNzIHN0cmljdCB3aGVuIGRlY29kaW5nIGNvbXByZXNzZWQgcmVzcG9uc2VzLCBzaW5jZSBzb21ldGltZXNcblx0XHRcdC8vIHNlcnZlcnMgc2VuZCBzbGlnaHRseSBpbnZhbGlkIHJlc3BvbnNlcyB0aGF0IGFyZSBzdGlsbCBhY2NlcHRlZFxuXHRcdFx0Ly8gYnkgY29tbW9uIGJyb3dzZXJzLlxuXHRcdFx0Ly8gQWx3YXlzIHVzaW5nIFpfU1lOQ19GTFVTSCBpcyB3aGF0IGNVUkwgZG9lcy5cblx0XHRcdGNvbnN0IHpsaWJPcHRpb25zID0ge1xuXHRcdFx0XHRmbHVzaDogemxpYi5aX1NZTkNfRkxVU0gsXG5cdFx0XHRcdGZpbmlzaEZsdXNoOiB6bGliLlpfU1lOQ19GTFVTSFxuXHRcdFx0fTtcblxuXHRcdFx0Ly8gRm9yIGd6aXBcblx0XHRcdGlmIChjb2RpbmdzID09PSAnZ3ppcCcgfHwgY29kaW5ncyA9PT0gJ3gtZ3ppcCcpIHtcblx0XHRcdFx0Ym9keSA9IFN0cmVhbS5waXBlbGluZShib2R5LCB6bGliLmNyZWF0ZUd1bnppcCh6bGliT3B0aW9ucyksIGVycm9yID0+IHtcblx0XHRcdFx0XHRyZWplY3QoZXJyb3IpO1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0cmVzcG9uc2UgPSBuZXcgUmVzcG9uc2UoYm9keSwgcmVzcG9uc2VPcHRpb25zKTtcblx0XHRcdFx0cmVzb2x2ZShyZXNwb25zZSk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gRm9yIGRlZmxhdGVcblx0XHRcdGlmIChjb2RpbmdzID09PSAnZGVmbGF0ZScgfHwgY29kaW5ncyA9PT0gJ3gtZGVmbGF0ZScpIHtcblx0XHRcdFx0Ly8gSGFuZGxlIHRoZSBpbmZhbW91cyByYXcgZGVmbGF0ZSByZXNwb25zZSBmcm9tIG9sZCBzZXJ2ZXJzXG5cdFx0XHRcdC8vIGEgaGFjayBmb3Igb2xkIElJUyBhbmQgQXBhY2hlIHNlcnZlcnNcblx0XHRcdFx0Y29uc3QgcmF3ID0gU3RyZWFtLnBpcGVsaW5lKHJlc3BvbnNlXywgbmV3IFN0cmVhbS5QYXNzVGhyb3VnaCgpLCBlcnJvciA9PiB7XG5cdFx0XHRcdFx0cmVqZWN0KGVycm9yKTtcblx0XHRcdFx0fSk7XG5cdFx0XHRcdHJhdy5vbmNlKCdkYXRhJywgY2h1bmsgPT4ge1xuXHRcdFx0XHRcdC8vIFNlZSBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzM3NTE5ODI4XG5cdFx0XHRcdFx0aWYgKChjaHVua1swXSAmIDB4MEYpID09PSAweDA4KSB7XG5cdFx0XHRcdFx0XHRib2R5ID0gU3RyZWFtLnBpcGVsaW5lKGJvZHksIHpsaWIuY3JlYXRlSW5mbGF0ZSgpLCBlcnJvciA9PiB7XG5cdFx0XHRcdFx0XHRcdHJlamVjdChlcnJvcik7XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0Ym9keSA9IFN0cmVhbS5waXBlbGluZShib2R5LCB6bGliLmNyZWF0ZUluZmxhdGVSYXcoKSwgZXJyb3IgPT4ge1xuXHRcdFx0XHRcdFx0XHRyZWplY3QoZXJyb3IpO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0cmVzcG9uc2UgPSBuZXcgUmVzcG9uc2UoYm9keSwgcmVzcG9uc2VPcHRpb25zKTtcblx0XHRcdFx0XHRyZXNvbHZlKHJlc3BvbnNlKTtcblx0XHRcdFx0fSk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gRm9yIGJyXG5cdFx0XHRpZiAoY29kaW5ncyA9PT0gJ2JyJykge1xuXHRcdFx0XHRib2R5ID0gU3RyZWFtLnBpcGVsaW5lKGJvZHksIHpsaWIuY3JlYXRlQnJvdGxpRGVjb21wcmVzcygpLCBlcnJvciA9PiB7XG5cdFx0XHRcdFx0cmVqZWN0KGVycm9yKTtcblx0XHRcdFx0fSk7XG5cdFx0XHRcdHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlKGJvZHksIHJlc3BvbnNlT3B0aW9ucyk7XG5cdFx0XHRcdHJlc29sdmUocmVzcG9uc2UpO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdC8vIE90aGVyd2lzZSwgdXNlIHJlc3BvbnNlIGFzLWlzXG5cdFx0XHRyZXNwb25zZSA9IG5ldyBSZXNwb25zZShib2R5LCByZXNwb25zZU9wdGlvbnMpO1xuXHRcdFx0cmVzb2x2ZShyZXNwb25zZSk7XG5cdFx0fSk7XG5cblx0XHR3cml0ZVRvU3RyZWFtKHJlcXVlc3RfLCByZXF1ZXN0KTtcblx0fSk7XG59XG5cbmV4cG9ydHMuQWJvcnRFcnJvciA9IEFib3J0RXJyb3I7XG5leHBvcnRzLkZldGNoRXJyb3IgPSBGZXRjaEVycm9yO1xuZXhwb3J0cy5IZWFkZXJzID0gSGVhZGVycztcbmV4cG9ydHMuUmVxdWVzdCA9IFJlcXVlc3Q7XG5leHBvcnRzLlJlc3BvbnNlID0gUmVzcG9uc2U7XG5leHBvcnRzLmRlZmF1bHQgPSBmZXRjaDtcbmV4cG9ydHMuaXNSZWRpcmVjdCA9IGlzUmVkaXJlY3Q7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5janMubWFwXG4iLCIvKipcbiAqIHdlYi1zdHJlYW1zLXBvbHlmaWxsIHYzLjIuMFxuICovXG4vLy8gPHJlZmVyZW5jZSBsaWI9XCJlczIwMTUuc3ltYm9sXCIgLz5cbmNvbnN0IFN5bWJvbFBvbHlmaWxsID0gdHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSAnc3ltYm9sJyA/XG4gICAgU3ltYm9sIDpcbiAgICBkZXNjcmlwdGlvbiA9PiBgU3ltYm9sKCR7ZGVzY3JpcHRpb259KWA7XG5cbi8vLyA8cmVmZXJlbmNlIGxpYj1cImRvbVwiIC8+XG5mdW5jdGlvbiBub29wKCkge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG59XG5mdW5jdGlvbiBnZXRHbG9iYWxzKCkge1xuICAgIGlmICh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybiB3aW5kb3c7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybiBnbG9iYWw7XG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG59XG5jb25zdCBnbG9iYWxzID0gZ2V0R2xvYmFscygpO1xuXG5mdW5jdGlvbiB0eXBlSXNPYmplY3QoeCkge1xuICAgIHJldHVybiAodHlwZW9mIHggPT09ICdvYmplY3QnICYmIHggIT09IG51bGwpIHx8IHR5cGVvZiB4ID09PSAnZnVuY3Rpb24nO1xufVxuY29uc3QgcmV0aHJvd0Fzc2VydGlvbkVycm9yUmVqZWN0aW9uID0gbm9vcDtcblxuY29uc3Qgb3JpZ2luYWxQcm9taXNlID0gUHJvbWlzZTtcbmNvbnN0IG9yaWdpbmFsUHJvbWlzZVRoZW4gPSBQcm9taXNlLnByb3RvdHlwZS50aGVuO1xuY29uc3Qgb3JpZ2luYWxQcm9taXNlUmVzb2x2ZSA9IFByb21pc2UucmVzb2x2ZS5iaW5kKG9yaWdpbmFsUHJvbWlzZSk7XG5jb25zdCBvcmlnaW5hbFByb21pc2VSZWplY3QgPSBQcm9taXNlLnJlamVjdC5iaW5kKG9yaWdpbmFsUHJvbWlzZSk7XG5mdW5jdGlvbiBuZXdQcm9taXNlKGV4ZWN1dG9yKSB7XG4gICAgcmV0dXJuIG5ldyBvcmlnaW5hbFByb21pc2UoZXhlY3V0b3IpO1xufVxuZnVuY3Rpb24gcHJvbWlzZVJlc29sdmVkV2l0aCh2YWx1ZSkge1xuICAgIHJldHVybiBvcmlnaW5hbFByb21pc2VSZXNvbHZlKHZhbHVlKTtcbn1cbmZ1bmN0aW9uIHByb21pc2VSZWplY3RlZFdpdGgocmVhc29uKSB7XG4gICAgcmV0dXJuIG9yaWdpbmFsUHJvbWlzZVJlamVjdChyZWFzb24pO1xufVxuZnVuY3Rpb24gUGVyZm9ybVByb21pc2VUaGVuKHByb21pc2UsIG9uRnVsZmlsbGVkLCBvblJlamVjdGVkKSB7XG4gICAgLy8gVGhlcmUgZG9lc24ndCBhcHBlYXIgdG8gYmUgYW55IHdheSB0byBjb3JyZWN0bHkgZW11bGF0ZSB0aGUgYmVoYXZpb3VyIGZyb20gSmF2YVNjcmlwdCwgc28gdGhpcyBpcyBqdXN0IGFuXG4gICAgLy8gYXBwcm94aW1hdGlvbi5cbiAgICByZXR1cm4gb3JpZ2luYWxQcm9taXNlVGhlbi5jYWxsKHByb21pc2UsIG9uRnVsZmlsbGVkLCBvblJlamVjdGVkKTtcbn1cbmZ1bmN0aW9uIHVwb25Qcm9taXNlKHByb21pc2UsIG9uRnVsZmlsbGVkLCBvblJlamVjdGVkKSB7XG4gICAgUGVyZm9ybVByb21pc2VUaGVuKFBlcmZvcm1Qcm9taXNlVGhlbihwcm9taXNlLCBvbkZ1bGZpbGxlZCwgb25SZWplY3RlZCksIHVuZGVmaW5lZCwgcmV0aHJvd0Fzc2VydGlvbkVycm9yUmVqZWN0aW9uKTtcbn1cbmZ1bmN0aW9uIHVwb25GdWxmaWxsbWVudChwcm9taXNlLCBvbkZ1bGZpbGxlZCkge1xuICAgIHVwb25Qcm9taXNlKHByb21pc2UsIG9uRnVsZmlsbGVkKTtcbn1cbmZ1bmN0aW9uIHVwb25SZWplY3Rpb24ocHJvbWlzZSwgb25SZWplY3RlZCkge1xuICAgIHVwb25Qcm9taXNlKHByb21pc2UsIHVuZGVmaW5lZCwgb25SZWplY3RlZCk7XG59XG5mdW5jdGlvbiB0cmFuc2Zvcm1Qcm9taXNlV2l0aChwcm9taXNlLCBmdWxmaWxsbWVudEhhbmRsZXIsIHJlamVjdGlvbkhhbmRsZXIpIHtcbiAgICByZXR1cm4gUGVyZm9ybVByb21pc2VUaGVuKHByb21pc2UsIGZ1bGZpbGxtZW50SGFuZGxlciwgcmVqZWN0aW9uSGFuZGxlcik7XG59XG5mdW5jdGlvbiBzZXRQcm9taXNlSXNIYW5kbGVkVG9UcnVlKHByb21pc2UpIHtcbiAgICBQZXJmb3JtUHJvbWlzZVRoZW4ocHJvbWlzZSwgdW5kZWZpbmVkLCByZXRocm93QXNzZXJ0aW9uRXJyb3JSZWplY3Rpb24pO1xufVxuY29uc3QgcXVldWVNaWNyb3Rhc2sgPSAoKCkgPT4ge1xuICAgIGNvbnN0IGdsb2JhbFF1ZXVlTWljcm90YXNrID0gZ2xvYmFscyAmJiBnbG9iYWxzLnF1ZXVlTWljcm90YXNrO1xuICAgIGlmICh0eXBlb2YgZ2xvYmFsUXVldWVNaWNyb3Rhc2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuIGdsb2JhbFF1ZXVlTWljcm90YXNrO1xuICAgIH1cbiAgICBjb25zdCByZXNvbHZlZFByb21pc2UgPSBwcm9taXNlUmVzb2x2ZWRXaXRoKHVuZGVmaW5lZCk7XG4gICAgcmV0dXJuIChmbikgPT4gUGVyZm9ybVByb21pc2VUaGVuKHJlc29sdmVkUHJvbWlzZSwgZm4pO1xufSkoKTtcbmZ1bmN0aW9uIHJlZmxlY3RDYWxsKEYsIFYsIGFyZ3MpIHtcbiAgICBpZiAodHlwZW9mIEYgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJndW1lbnQgaXMgbm90IGEgZnVuY3Rpb24nKTtcbiAgICB9XG4gICAgcmV0dXJuIEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseS5jYWxsKEYsIFYsIGFyZ3MpO1xufVxuZnVuY3Rpb24gcHJvbWlzZUNhbGwoRiwgViwgYXJncykge1xuICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBwcm9taXNlUmVzb2x2ZWRXaXRoKHJlZmxlY3RDYWxsKEYsIFYsIGFyZ3MpKTtcbiAgICB9XG4gICAgY2F0Y2ggKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBwcm9taXNlUmVqZWN0ZWRXaXRoKHZhbHVlKTtcbiAgICB9XG59XG5cbi8vIE9yaWdpbmFsIGZyb20gQ2hyb21pdW1cbi8vIGh0dHBzOi8vY2hyb21pdW0uZ29vZ2xlc291cmNlLmNvbS9jaHJvbWl1bS9zcmMvKy8wYWVlNDQzNGE0ZGJhNDJhNDJhYmFlYTliZmJjMGNkMTk2YTYzYmMxL3RoaXJkX3BhcnR5L2JsaW5rL3JlbmRlcmVyL2NvcmUvc3RyZWFtcy9TaW1wbGVRdWV1ZS5qc1xuY29uc3QgUVVFVUVfTUFYX0FSUkFZX1NJWkUgPSAxNjM4NDtcbi8qKlxuICogU2ltcGxlIHF1ZXVlIHN0cnVjdHVyZS5cbiAqXG4gKiBBdm9pZHMgc2NhbGFiaWxpdHkgaXNzdWVzIHdpdGggdXNpbmcgYSBwYWNrZWQgYXJyYXkgZGlyZWN0bHkgYnkgdXNpbmdcbiAqIG11bHRpcGxlIGFycmF5cyBpbiBhIGxpbmtlZCBsaXN0IGFuZCBrZWVwaW5nIHRoZSBhcnJheSBzaXplIGJvdW5kZWQuXG4gKi9cbmNsYXNzIFNpbXBsZVF1ZXVlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5fY3Vyc29yID0gMDtcbiAgICAgICAgdGhpcy5fc2l6ZSA9IDA7XG4gICAgICAgIC8vIF9mcm9udCBhbmQgX2JhY2sgYXJlIGFsd2F5cyBkZWZpbmVkLlxuICAgICAgICB0aGlzLl9mcm9udCA9IHtcbiAgICAgICAgICAgIF9lbGVtZW50czogW10sXG4gICAgICAgICAgICBfbmV4dDogdW5kZWZpbmVkXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuX2JhY2sgPSB0aGlzLl9mcm9udDtcbiAgICAgICAgLy8gVGhlIGN1cnNvciBpcyB1c2VkIHRvIGF2b2lkIGNhbGxpbmcgQXJyYXkuc2hpZnQoKS5cbiAgICAgICAgLy8gSXQgY29udGFpbnMgdGhlIGluZGV4IG9mIHRoZSBmcm9udCBlbGVtZW50IG9mIHRoZSBhcnJheSBpbnNpZGUgdGhlXG4gICAgICAgIC8vIGZyb250LW1vc3Qgbm9kZS4gSXQgaXMgYWx3YXlzIGluIHRoZSByYW5nZSBbMCwgUVVFVUVfTUFYX0FSUkFZX1NJWkUpLlxuICAgICAgICB0aGlzLl9jdXJzb3IgPSAwO1xuICAgICAgICAvLyBXaGVuIHRoZXJlIGlzIG9ubHkgb25lIG5vZGUsIHNpemUgPT09IGVsZW1lbnRzLmxlbmd0aCAtIGN1cnNvci5cbiAgICAgICAgdGhpcy5fc2l6ZSA9IDA7XG4gICAgfVxuICAgIGdldCBsZW5ndGgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zaXplO1xuICAgIH1cbiAgICAvLyBGb3IgZXhjZXB0aW9uIHNhZmV0eSwgdGhpcyBtZXRob2QgaXMgc3RydWN0dXJlZCBpbiBvcmRlcjpcbiAgICAvLyAxLiBSZWFkIHN0YXRlXG4gICAgLy8gMi4gQ2FsY3VsYXRlIHJlcXVpcmVkIHN0YXRlIG11dGF0aW9uc1xuICAgIC8vIDMuIFBlcmZvcm0gc3RhdGUgbXV0YXRpb25zXG4gICAgcHVzaChlbGVtZW50KSB7XG4gICAgICAgIGNvbnN0IG9sZEJhY2sgPSB0aGlzLl9iYWNrO1xuICAgICAgICBsZXQgbmV3QmFjayA9IG9sZEJhY2s7XG4gICAgICAgIGlmIChvbGRCYWNrLl9lbGVtZW50cy5sZW5ndGggPT09IFFVRVVFX01BWF9BUlJBWV9TSVpFIC0gMSkge1xuICAgICAgICAgICAgbmV3QmFjayA9IHtcbiAgICAgICAgICAgICAgICBfZWxlbWVudHM6IFtdLFxuICAgICAgICAgICAgICAgIF9uZXh0OiB1bmRlZmluZWRcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgLy8gcHVzaCgpIGlzIHRoZSBtdXRhdGlvbiBtb3N0IGxpa2VseSB0byB0aHJvdyBhbiBleGNlcHRpb24sIHNvIGl0XG4gICAgICAgIC8vIGdvZXMgZmlyc3QuXG4gICAgICAgIG9sZEJhY2suX2VsZW1lbnRzLnB1c2goZWxlbWVudCk7XG4gICAgICAgIGlmIChuZXdCYWNrICE9PSBvbGRCYWNrKSB7XG4gICAgICAgICAgICB0aGlzLl9iYWNrID0gbmV3QmFjaztcbiAgICAgICAgICAgIG9sZEJhY2suX25leHQgPSBuZXdCYWNrO1xuICAgICAgICB9XG4gICAgICAgICsrdGhpcy5fc2l6ZTtcbiAgICB9XG4gICAgLy8gTGlrZSBwdXNoKCksIHNoaWZ0KCkgZm9sbG93cyB0aGUgcmVhZCAtPiBjYWxjdWxhdGUgLT4gbXV0YXRlIHBhdHRlcm4gZm9yXG4gICAgLy8gZXhjZXB0aW9uIHNhZmV0eS5cbiAgICBzaGlmdCgpIHsgLy8gbXVzdCBub3QgYmUgY2FsbGVkIG9uIGFuIGVtcHR5IHF1ZXVlXG4gICAgICAgIGNvbnN0IG9sZEZyb250ID0gdGhpcy5fZnJvbnQ7XG4gICAgICAgIGxldCBuZXdGcm9udCA9IG9sZEZyb250O1xuICAgICAgICBjb25zdCBvbGRDdXJzb3IgPSB0aGlzLl9jdXJzb3I7XG4gICAgICAgIGxldCBuZXdDdXJzb3IgPSBvbGRDdXJzb3IgKyAxO1xuICAgICAgICBjb25zdCBlbGVtZW50cyA9IG9sZEZyb250Ll9lbGVtZW50cztcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IGVsZW1lbnRzW29sZEN1cnNvcl07XG4gICAgICAgIGlmIChuZXdDdXJzb3IgPT09IFFVRVVFX01BWF9BUlJBWV9TSVpFKSB7XG4gICAgICAgICAgICBuZXdGcm9udCA9IG9sZEZyb250Ll9uZXh0O1xuICAgICAgICAgICAgbmV3Q3Vyc29yID0gMDtcbiAgICAgICAgfVxuICAgICAgICAvLyBObyBtdXRhdGlvbnMgYmVmb3JlIHRoaXMgcG9pbnQuXG4gICAgICAgIC0tdGhpcy5fc2l6ZTtcbiAgICAgICAgdGhpcy5fY3Vyc29yID0gbmV3Q3Vyc29yO1xuICAgICAgICBpZiAob2xkRnJvbnQgIT09IG5ld0Zyb250KSB7XG4gICAgICAgICAgICB0aGlzLl9mcm9udCA9IG5ld0Zyb250O1xuICAgICAgICB9XG4gICAgICAgIC8vIFBlcm1pdCBzaGlmdGVkIGVsZW1lbnQgdG8gYmUgZ2FyYmFnZSBjb2xsZWN0ZWQuXG4gICAgICAgIGVsZW1lbnRzW29sZEN1cnNvcl0gPSB1bmRlZmluZWQ7XG4gICAgICAgIHJldHVybiBlbGVtZW50O1xuICAgIH1cbiAgICAvLyBUaGUgdHJpY2t5IHRoaW5nIGFib3V0IGZvckVhY2goKSBpcyB0aGF0IGl0IGNhbiBiZSBjYWxsZWRcbiAgICAvLyByZS1lbnRyYW50bHkuIFRoZSBxdWV1ZSBtYXkgYmUgbXV0YXRlZCBpbnNpZGUgdGhlIGNhbGxiYWNrLiBJdCBpcyBlYXN5IHRvXG4gICAgLy8gc2VlIHRoYXQgcHVzaCgpIHdpdGhpbiB0aGUgY2FsbGJhY2sgaGFzIG5vIG5lZ2F0aXZlIGVmZmVjdHMgc2luY2UgdGhlIGVuZFxuICAgIC8vIG9mIHRoZSBxdWV1ZSBpcyBjaGVja2VkIGZvciBvbiBldmVyeSBpdGVyYXRpb24uIElmIHNoaWZ0KCkgaXMgY2FsbGVkXG4gICAgLy8gcmVwZWF0ZWRseSB3aXRoaW4gdGhlIGNhbGxiYWNrIHRoZW4gdGhlIG5leHQgaXRlcmF0aW9uIG1heSByZXR1cm4gYW5cbiAgICAvLyBlbGVtZW50IHRoYXQgaGFzIGJlZW4gcmVtb3ZlZC4gSW4gdGhpcyBjYXNlIHRoZSBjYWxsYmFjayB3aWxsIGJlIGNhbGxlZFxuICAgIC8vIHdpdGggdW5kZWZpbmVkIHZhbHVlcyB1bnRpbCB3ZSBlaXRoZXIgXCJjYXRjaCB1cFwiIHdpdGggZWxlbWVudHMgdGhhdCBzdGlsbFxuICAgIC8vIGV4aXN0IG9yIHJlYWNoIHRoZSBiYWNrIG9mIHRoZSBxdWV1ZS5cbiAgICBmb3JFYWNoKGNhbGxiYWNrKSB7XG4gICAgICAgIGxldCBpID0gdGhpcy5fY3Vyc29yO1xuICAgICAgICBsZXQgbm9kZSA9IHRoaXMuX2Zyb250O1xuICAgICAgICBsZXQgZWxlbWVudHMgPSBub2RlLl9lbGVtZW50cztcbiAgICAgICAgd2hpbGUgKGkgIT09IGVsZW1lbnRzLmxlbmd0aCB8fCBub2RlLl9uZXh0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmIChpID09PSBlbGVtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBub2RlID0gbm9kZS5fbmV4dDtcbiAgICAgICAgICAgICAgICBlbGVtZW50cyA9IG5vZGUuX2VsZW1lbnRzO1xuICAgICAgICAgICAgICAgIGkgPSAwO1xuICAgICAgICAgICAgICAgIGlmIChlbGVtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FsbGJhY2soZWxlbWVudHNbaV0pO1xuICAgICAgICAgICAgKytpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIFJldHVybiB0aGUgZWxlbWVudCB0aGF0IHdvdWxkIGJlIHJldHVybmVkIGlmIHNoaWZ0KCkgd2FzIGNhbGxlZCBub3csXG4gICAgLy8gd2l0aG91dCBtb2RpZnlpbmcgdGhlIHF1ZXVlLlxuICAgIHBlZWsoKSB7IC8vIG11c3Qgbm90IGJlIGNhbGxlZCBvbiBhbiBlbXB0eSBxdWV1ZVxuICAgICAgICBjb25zdCBmcm9udCA9IHRoaXMuX2Zyb250O1xuICAgICAgICBjb25zdCBjdXJzb3IgPSB0aGlzLl9jdXJzb3I7XG4gICAgICAgIHJldHVybiBmcm9udC5fZWxlbWVudHNbY3Vyc29yXTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIFJlYWRhYmxlU3RyZWFtUmVhZGVyR2VuZXJpY0luaXRpYWxpemUocmVhZGVyLCBzdHJlYW0pIHtcbiAgICByZWFkZXIuX293bmVyUmVhZGFibGVTdHJlYW0gPSBzdHJlYW07XG4gICAgc3RyZWFtLl9yZWFkZXIgPSByZWFkZXI7XG4gICAgaWYgKHN0cmVhbS5fc3RhdGUgPT09ICdyZWFkYWJsZScpIHtcbiAgICAgICAgZGVmYXVsdFJlYWRlckNsb3NlZFByb21pc2VJbml0aWFsaXplKHJlYWRlcik7XG4gICAgfVxuICAgIGVsc2UgaWYgKHN0cmVhbS5fc3RhdGUgPT09ICdjbG9zZWQnKSB7XG4gICAgICAgIGRlZmF1bHRSZWFkZXJDbG9zZWRQcm9taXNlSW5pdGlhbGl6ZUFzUmVzb2x2ZWQocmVhZGVyKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGRlZmF1bHRSZWFkZXJDbG9zZWRQcm9taXNlSW5pdGlhbGl6ZUFzUmVqZWN0ZWQocmVhZGVyLCBzdHJlYW0uX3N0b3JlZEVycm9yKTtcbiAgICB9XG59XG4vLyBBIGNsaWVudCBvZiBSZWFkYWJsZVN0cmVhbURlZmF1bHRSZWFkZXIgYW5kIFJlYWRhYmxlU3RyZWFtQllPQlJlYWRlciBtYXkgdXNlIHRoZXNlIGZ1bmN0aW9ucyBkaXJlY3RseSB0byBieXBhc3Mgc3RhdGVcbi8vIGNoZWNrLlxuZnVuY3Rpb24gUmVhZGFibGVTdHJlYW1SZWFkZXJHZW5lcmljQ2FuY2VsKHJlYWRlciwgcmVhc29uKSB7XG4gICAgY29uc3Qgc3RyZWFtID0gcmVhZGVyLl9vd25lclJlYWRhYmxlU3RyZWFtO1xuICAgIHJldHVybiBSZWFkYWJsZVN0cmVhbUNhbmNlbChzdHJlYW0sIHJlYXNvbik7XG59XG5mdW5jdGlvbiBSZWFkYWJsZVN0cmVhbVJlYWRlckdlbmVyaWNSZWxlYXNlKHJlYWRlcikge1xuICAgIGlmIChyZWFkZXIuX293bmVyUmVhZGFibGVTdHJlYW0uX3N0YXRlID09PSAncmVhZGFibGUnKSB7XG4gICAgICAgIGRlZmF1bHRSZWFkZXJDbG9zZWRQcm9taXNlUmVqZWN0KHJlYWRlciwgbmV3IFR5cGVFcnJvcihgUmVhZGVyIHdhcyByZWxlYXNlZCBhbmQgY2FuIG5vIGxvbmdlciBiZSB1c2VkIHRvIG1vbml0b3IgdGhlIHN0cmVhbSdzIGNsb3NlZG5lc3NgKSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBkZWZhdWx0UmVhZGVyQ2xvc2VkUHJvbWlzZVJlc2V0VG9SZWplY3RlZChyZWFkZXIsIG5ldyBUeXBlRXJyb3IoYFJlYWRlciB3YXMgcmVsZWFzZWQgYW5kIGNhbiBubyBsb25nZXIgYmUgdXNlZCB0byBtb25pdG9yIHRoZSBzdHJlYW0ncyBjbG9zZWRuZXNzYCkpO1xuICAgIH1cbiAgICByZWFkZXIuX293bmVyUmVhZGFibGVTdHJlYW0uX3JlYWRlciA9IHVuZGVmaW5lZDtcbiAgICByZWFkZXIuX293bmVyUmVhZGFibGVTdHJlYW0gPSB1bmRlZmluZWQ7XG59XG4vLyBIZWxwZXIgZnVuY3Rpb25zIGZvciB0aGUgcmVhZGVycy5cbmZ1bmN0aW9uIHJlYWRlckxvY2tFeGNlcHRpb24obmFtZSkge1xuICAgIHJldHVybiBuZXcgVHlwZUVycm9yKCdDYW5ub3QgJyArIG5hbWUgKyAnIGEgc3RyZWFtIHVzaW5nIGEgcmVsZWFzZWQgcmVhZGVyJyk7XG59XG4vLyBIZWxwZXIgZnVuY3Rpb25zIGZvciB0aGUgUmVhZGFibGVTdHJlYW1EZWZhdWx0UmVhZGVyLlxuZnVuY3Rpb24gZGVmYXVsdFJlYWRlckNsb3NlZFByb21pc2VJbml0aWFsaXplKHJlYWRlcikge1xuICAgIHJlYWRlci5fY2xvc2VkUHJvbWlzZSA9IG5ld1Byb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICByZWFkZXIuX2Nsb3NlZFByb21pc2VfcmVzb2x2ZSA9IHJlc29sdmU7XG4gICAgICAgIHJlYWRlci5fY2xvc2VkUHJvbWlzZV9yZWplY3QgPSByZWplY3Q7XG4gICAgfSk7XG59XG5mdW5jdGlvbiBkZWZhdWx0UmVhZGVyQ2xvc2VkUHJvbWlzZUluaXRpYWxpemVBc1JlamVjdGVkKHJlYWRlciwgcmVhc29uKSB7XG4gICAgZGVmYXVsdFJlYWRlckNsb3NlZFByb21pc2VJbml0aWFsaXplKHJlYWRlcik7XG4gICAgZGVmYXVsdFJlYWRlckNsb3NlZFByb21pc2VSZWplY3QocmVhZGVyLCByZWFzb24pO1xufVxuZnVuY3Rpb24gZGVmYXVsdFJlYWRlckNsb3NlZFByb21pc2VJbml0aWFsaXplQXNSZXNvbHZlZChyZWFkZXIpIHtcbiAgICBkZWZhdWx0UmVhZGVyQ2xvc2VkUHJvbWlzZUluaXRpYWxpemUocmVhZGVyKTtcbiAgICBkZWZhdWx0UmVhZGVyQ2xvc2VkUHJvbWlzZVJlc29sdmUocmVhZGVyKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRSZWFkZXJDbG9zZWRQcm9taXNlUmVqZWN0KHJlYWRlciwgcmVhc29uKSB7XG4gICAgaWYgKHJlYWRlci5fY2xvc2VkUHJvbWlzZV9yZWplY3QgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHNldFByb21pc2VJc0hhbmRsZWRUb1RydWUocmVhZGVyLl9jbG9zZWRQcm9taXNlKTtcbiAgICByZWFkZXIuX2Nsb3NlZFByb21pc2VfcmVqZWN0KHJlYXNvbik7XG4gICAgcmVhZGVyLl9jbG9zZWRQcm9taXNlX3Jlc29sdmUgPSB1bmRlZmluZWQ7XG4gICAgcmVhZGVyLl9jbG9zZWRQcm9taXNlX3JlamVjdCA9IHVuZGVmaW5lZDtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRSZWFkZXJDbG9zZWRQcm9taXNlUmVzZXRUb1JlamVjdGVkKHJlYWRlciwgcmVhc29uKSB7XG4gICAgZGVmYXVsdFJlYWRlckNsb3NlZFByb21pc2VJbml0aWFsaXplQXNSZWplY3RlZChyZWFkZXIsIHJlYXNvbik7XG59XG5mdW5jdGlvbiBkZWZhdWx0UmVhZGVyQ2xvc2VkUHJvbWlzZVJlc29sdmUocmVhZGVyKSB7XG4gICAgaWYgKHJlYWRlci5fY2xvc2VkUHJvbWlzZV9yZXNvbHZlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICByZWFkZXIuX2Nsb3NlZFByb21pc2VfcmVzb2x2ZSh1bmRlZmluZWQpO1xuICAgIHJlYWRlci5fY2xvc2VkUHJvbWlzZV9yZXNvbHZlID0gdW5kZWZpbmVkO1xuICAgIHJlYWRlci5fY2xvc2VkUHJvbWlzZV9yZWplY3QgPSB1bmRlZmluZWQ7XG59XG5cbmNvbnN0IEFib3J0U3RlcHMgPSBTeW1ib2xQb2x5ZmlsbCgnW1tBYm9ydFN0ZXBzXV0nKTtcbmNvbnN0IEVycm9yU3RlcHMgPSBTeW1ib2xQb2x5ZmlsbCgnW1tFcnJvclN0ZXBzXV0nKTtcbmNvbnN0IENhbmNlbFN0ZXBzID0gU3ltYm9sUG9seWZpbGwoJ1tbQ2FuY2VsU3RlcHNdXScpO1xuY29uc3QgUHVsbFN0ZXBzID0gU3ltYm9sUG9seWZpbGwoJ1tbUHVsbFN0ZXBzXV0nKTtcblxuLy8vIDxyZWZlcmVuY2UgbGliPVwiZXMyMDE1LmNvcmVcIiAvPlxuLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvTnVtYmVyL2lzRmluaXRlI1BvbHlmaWxsXG5jb25zdCBOdW1iZXJJc0Zpbml0ZSA9IE51bWJlci5pc0Zpbml0ZSB8fCBmdW5jdGlvbiAoeCkge1xuICAgIHJldHVybiB0eXBlb2YgeCA9PT0gJ251bWJlcicgJiYgaXNGaW5pdGUoeCk7XG59O1xuXG4vLy8gPHJlZmVyZW5jZSBsaWI9XCJlczIwMTUuY29yZVwiIC8+XG4vLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9NYXRoL3RydW5jI1BvbHlmaWxsXG5jb25zdCBNYXRoVHJ1bmMgPSBNYXRoLnRydW5jIHx8IGZ1bmN0aW9uICh2KSB7XG4gICAgcmV0dXJuIHYgPCAwID8gTWF0aC5jZWlsKHYpIDogTWF0aC5mbG9vcih2KTtcbn07XG5cbi8vIGh0dHBzOi8vaGV5Y2FtLmdpdGh1Yi5pby93ZWJpZGwvI2lkbC1kaWN0aW9uYXJpZXNcbmZ1bmN0aW9uIGlzRGljdGlvbmFyeSh4KSB7XG4gICAgcmV0dXJuIHR5cGVvZiB4ID09PSAnb2JqZWN0JyB8fCB0eXBlb2YgeCA9PT0gJ2Z1bmN0aW9uJztcbn1cbmZ1bmN0aW9uIGFzc2VydERpY3Rpb25hcnkob2JqLCBjb250ZXh0KSB7XG4gICAgaWYgKG9iaiAhPT0gdW5kZWZpbmVkICYmICFpc0RpY3Rpb25hcnkob2JqKSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGAke2NvbnRleHR9IGlzIG5vdCBhbiBvYmplY3QuYCk7XG4gICAgfVxufVxuLy8gaHR0cHM6Ly9oZXljYW0uZ2l0aHViLmlvL3dlYmlkbC8jaWRsLWNhbGxiYWNrLWZ1bmN0aW9uc1xuZnVuY3Rpb24gYXNzZXJ0RnVuY3Rpb24oeCwgY29udGV4dCkge1xuICAgIGlmICh0eXBlb2YgeCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGAke2NvbnRleHR9IGlzIG5vdCBhIGZ1bmN0aW9uLmApO1xuICAgIH1cbn1cbi8vIGh0dHBzOi8vaGV5Y2FtLmdpdGh1Yi5pby93ZWJpZGwvI2lkbC1vYmplY3RcbmZ1bmN0aW9uIGlzT2JqZWN0KHgpIHtcbiAgICByZXR1cm4gKHR5cGVvZiB4ID09PSAnb2JqZWN0JyAmJiB4ICE9PSBudWxsKSB8fCB0eXBlb2YgeCA9PT0gJ2Z1bmN0aW9uJztcbn1cbmZ1bmN0aW9uIGFzc2VydE9iamVjdCh4LCBjb250ZXh0KSB7XG4gICAgaWYgKCFpc09iamVjdCh4KSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGAke2NvbnRleHR9IGlzIG5vdCBhbiBvYmplY3QuYCk7XG4gICAgfVxufVxuZnVuY3Rpb24gYXNzZXJ0UmVxdWlyZWRBcmd1bWVudCh4LCBwb3NpdGlvbiwgY29udGV4dCkge1xuICAgIGlmICh4ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgUGFyYW1ldGVyICR7cG9zaXRpb259IGlzIHJlcXVpcmVkIGluICcke2NvbnRleHR9Jy5gKTtcbiAgICB9XG59XG5mdW5jdGlvbiBhc3NlcnRSZXF1aXJlZEZpZWxkKHgsIGZpZWxkLCBjb250ZXh0KSB7XG4gICAgaWYgKHggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGAke2ZpZWxkfSBpcyByZXF1aXJlZCBpbiAnJHtjb250ZXh0fScuYCk7XG4gICAgfVxufVxuLy8gaHR0cHM6Ly9oZXljYW0uZ2l0aHViLmlvL3dlYmlkbC8jaWRsLXVucmVzdHJpY3RlZC1kb3VibGVcbmZ1bmN0aW9uIGNvbnZlcnRVbnJlc3RyaWN0ZWREb3VibGUodmFsdWUpIHtcbiAgICByZXR1cm4gTnVtYmVyKHZhbHVlKTtcbn1cbmZ1bmN0aW9uIGNlbnNvck5lZ2F0aXZlWmVybyh4KSB7XG4gICAgcmV0dXJuIHggPT09IDAgPyAwIDogeDtcbn1cbmZ1bmN0aW9uIGludGVnZXJQYXJ0KHgpIHtcbiAgICByZXR1cm4gY2Vuc29yTmVnYXRpdmVaZXJvKE1hdGhUcnVuYyh4KSk7XG59XG4vLyBodHRwczovL2hleWNhbS5naXRodWIuaW8vd2ViaWRsLyNpZGwtdW5zaWduZWQtbG9uZy1sb25nXG5mdW5jdGlvbiBjb252ZXJ0VW5zaWduZWRMb25nTG9uZ1dpdGhFbmZvcmNlUmFuZ2UodmFsdWUsIGNvbnRleHQpIHtcbiAgICBjb25zdCBsb3dlckJvdW5kID0gMDtcbiAgICBjb25zdCB1cHBlckJvdW5kID0gTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVI7XG4gICAgbGV0IHggPSBOdW1iZXIodmFsdWUpO1xuICAgIHggPSBjZW5zb3JOZWdhdGl2ZVplcm8oeCk7XG4gICAgaWYgKCFOdW1iZXJJc0Zpbml0ZSh4KSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGAke2NvbnRleHR9IGlzIG5vdCBhIGZpbml0ZSBudW1iZXJgKTtcbiAgICB9XG4gICAgeCA9IGludGVnZXJQYXJ0KHgpO1xuICAgIGlmICh4IDwgbG93ZXJCb3VuZCB8fCB4ID4gdXBwZXJCb3VuZCkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGAke2NvbnRleHR9IGlzIG91dHNpZGUgdGhlIGFjY2VwdGVkIHJhbmdlIG9mICR7bG93ZXJCb3VuZH0gdG8gJHt1cHBlckJvdW5kfSwgaW5jbHVzaXZlYCk7XG4gICAgfVxuICAgIGlmICghTnVtYmVySXNGaW5pdGUoeCkgfHwgeCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgLy8gVE9ETyBVc2UgQmlnSW50IGlmIHN1cHBvcnRlZD9cbiAgICAvLyBsZXQgeEJpZ0ludCA9IEJpZ0ludChpbnRlZ2VyUGFydCh4KSk7XG4gICAgLy8geEJpZ0ludCA9IEJpZ0ludC5hc1VpbnROKDY0LCB4QmlnSW50KTtcbiAgICAvLyByZXR1cm4gTnVtYmVyKHhCaWdJbnQpO1xuICAgIHJldHVybiB4O1xufVxuXG5mdW5jdGlvbiBhc3NlcnRSZWFkYWJsZVN0cmVhbSh4LCBjb250ZXh0KSB7XG4gICAgaWYgKCFJc1JlYWRhYmxlU3RyZWFtKHgpKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYCR7Y29udGV4dH0gaXMgbm90IGEgUmVhZGFibGVTdHJlYW0uYCk7XG4gICAgfVxufVxuXG4vLyBBYnN0cmFjdCBvcGVyYXRpb25zIGZvciB0aGUgUmVhZGFibGVTdHJlYW0uXG5mdW5jdGlvbiBBY3F1aXJlUmVhZGFibGVTdHJlYW1EZWZhdWx0UmVhZGVyKHN0cmVhbSkge1xuICAgIHJldHVybiBuZXcgUmVhZGFibGVTdHJlYW1EZWZhdWx0UmVhZGVyKHN0cmVhbSk7XG59XG4vLyBSZWFkYWJsZVN0cmVhbSBBUEkgZXhwb3NlZCBmb3IgY29udHJvbGxlcnMuXG5mdW5jdGlvbiBSZWFkYWJsZVN0cmVhbUFkZFJlYWRSZXF1ZXN0KHN0cmVhbSwgcmVhZFJlcXVlc3QpIHtcbiAgICBzdHJlYW0uX3JlYWRlci5fcmVhZFJlcXVlc3RzLnB1c2gocmVhZFJlcXVlc3QpO1xufVxuZnVuY3Rpb24gUmVhZGFibGVTdHJlYW1GdWxmaWxsUmVhZFJlcXVlc3Qoc3RyZWFtLCBjaHVuaywgZG9uZSkge1xuICAgIGNvbnN0IHJlYWRlciA9IHN0cmVhbS5fcmVhZGVyO1xuICAgIGNvbnN0IHJlYWRSZXF1ZXN0ID0gcmVhZGVyLl9yZWFkUmVxdWVzdHMuc2hpZnQoKTtcbiAgICBpZiAoZG9uZSkge1xuICAgICAgICByZWFkUmVxdWVzdC5fY2xvc2VTdGVwcygpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmVhZFJlcXVlc3QuX2NodW5rU3RlcHMoY2h1bmspO1xuICAgIH1cbn1cbmZ1bmN0aW9uIFJlYWRhYmxlU3RyZWFtR2V0TnVtUmVhZFJlcXVlc3RzKHN0cmVhbSkge1xuICAgIHJldHVybiBzdHJlYW0uX3JlYWRlci5fcmVhZFJlcXVlc3RzLmxlbmd0aDtcbn1cbmZ1bmN0aW9uIFJlYWRhYmxlU3RyZWFtSGFzRGVmYXVsdFJlYWRlcihzdHJlYW0pIHtcbiAgICBjb25zdCByZWFkZXIgPSBzdHJlYW0uX3JlYWRlcjtcbiAgICBpZiAocmVhZGVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoIUlzUmVhZGFibGVTdHJlYW1EZWZhdWx0UmVhZGVyKHJlYWRlcikpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn1cbi8qKlxuICogQSBkZWZhdWx0IHJlYWRlciB2ZW5kZWQgYnkgYSB7QGxpbmsgUmVhZGFibGVTdHJlYW19LlxuICpcbiAqIEBwdWJsaWNcbiAqL1xuY2xhc3MgUmVhZGFibGVTdHJlYW1EZWZhdWx0UmVhZGVyIHtcbiAgICBjb25zdHJ1Y3RvcihzdHJlYW0pIHtcbiAgICAgICAgYXNzZXJ0UmVxdWlyZWRBcmd1bWVudChzdHJlYW0sIDEsICdSZWFkYWJsZVN0cmVhbURlZmF1bHRSZWFkZXInKTtcbiAgICAgICAgYXNzZXJ0UmVhZGFibGVTdHJlYW0oc3RyZWFtLCAnRmlyc3QgcGFyYW1ldGVyJyk7XG4gICAgICAgIGlmIChJc1JlYWRhYmxlU3RyZWFtTG9ja2VkKHN0cmVhbSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoaXMgc3RyZWFtIGhhcyBhbHJlYWR5IGJlZW4gbG9ja2VkIGZvciBleGNsdXNpdmUgcmVhZGluZyBieSBhbm90aGVyIHJlYWRlcicpO1xuICAgICAgICB9XG4gICAgICAgIFJlYWRhYmxlU3RyZWFtUmVhZGVyR2VuZXJpY0luaXRpYWxpemUodGhpcywgc3RyZWFtKTtcbiAgICAgICAgdGhpcy5fcmVhZFJlcXVlc3RzID0gbmV3IFNpbXBsZVF1ZXVlKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBwcm9taXNlIHRoYXQgd2lsbCBiZSBmdWxmaWxsZWQgd2hlbiB0aGUgc3RyZWFtIGJlY29tZXMgY2xvc2VkLFxuICAgICAqIG9yIHJlamVjdGVkIGlmIHRoZSBzdHJlYW0gZXZlciBlcnJvcnMgb3IgdGhlIHJlYWRlcidzIGxvY2sgaXMgcmVsZWFzZWQgYmVmb3JlIHRoZSBzdHJlYW0gZmluaXNoZXMgY2xvc2luZy5cbiAgICAgKi9cbiAgICBnZXQgY2xvc2VkKCkge1xuICAgICAgICBpZiAoIUlzUmVhZGFibGVTdHJlYW1EZWZhdWx0UmVhZGVyKHRoaXMpKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJvbWlzZVJlamVjdGVkV2l0aChkZWZhdWx0UmVhZGVyQnJhbmRDaGVja0V4Y2VwdGlvbignY2xvc2VkJykpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9jbG9zZWRQcm9taXNlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBJZiB0aGUgcmVhZGVyIGlzIGFjdGl2ZSwgYmVoYXZlcyB0aGUgc2FtZSBhcyB7QGxpbmsgUmVhZGFibGVTdHJlYW0uY2FuY2VsIHwgc3RyZWFtLmNhbmNlbChyZWFzb24pfS5cbiAgICAgKi9cbiAgICBjYW5jZWwocmVhc29uID0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmICghSXNSZWFkYWJsZVN0cmVhbURlZmF1bHRSZWFkZXIodGhpcykpIHtcbiAgICAgICAgICAgIHJldHVybiBwcm9taXNlUmVqZWN0ZWRXaXRoKGRlZmF1bHRSZWFkZXJCcmFuZENoZWNrRXhjZXB0aW9uKCdjYW5jZWwnKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX293bmVyUmVhZGFibGVTdHJlYW0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIHByb21pc2VSZWplY3RlZFdpdGgocmVhZGVyTG9ja0V4Y2VwdGlvbignY2FuY2VsJykpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBSZWFkYWJsZVN0cmVhbVJlYWRlckdlbmVyaWNDYW5jZWwodGhpcywgcmVhc29uKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIHByb21pc2UgdGhhdCBhbGxvd3MgYWNjZXNzIHRvIHRoZSBuZXh0IGNodW5rIGZyb20gdGhlIHN0cmVhbSdzIGludGVybmFsIHF1ZXVlLCBpZiBhdmFpbGFibGUuXG4gICAgICpcbiAgICAgKiBJZiByZWFkaW5nIGEgY2h1bmsgY2F1c2VzIHRoZSBxdWV1ZSB0byBiZWNvbWUgZW1wdHksIG1vcmUgZGF0YSB3aWxsIGJlIHB1bGxlZCBmcm9tIHRoZSB1bmRlcmx5aW5nIHNvdXJjZS5cbiAgICAgKi9cbiAgICByZWFkKCkge1xuICAgICAgICBpZiAoIUlzUmVhZGFibGVTdHJlYW1EZWZhdWx0UmVhZGVyKHRoaXMpKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJvbWlzZVJlamVjdGVkV2l0aChkZWZhdWx0UmVhZGVyQnJhbmRDaGVja0V4Y2VwdGlvbigncmVhZCcpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fb3duZXJSZWFkYWJsZVN0cmVhbSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJvbWlzZVJlamVjdGVkV2l0aChyZWFkZXJMb2NrRXhjZXB0aW9uKCdyZWFkIGZyb20nKSk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHJlc29sdmVQcm9taXNlO1xuICAgICAgICBsZXQgcmVqZWN0UHJvbWlzZTtcbiAgICAgICAgY29uc3QgcHJvbWlzZSA9IG5ld1Byb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZVByb21pc2UgPSByZXNvbHZlO1xuICAgICAgICAgICAgcmVqZWN0UHJvbWlzZSA9IHJlamVjdDtcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IHJlYWRSZXF1ZXN0ID0ge1xuICAgICAgICAgICAgX2NodW5rU3RlcHM6IGNodW5rID0+IHJlc29sdmVQcm9taXNlKHsgdmFsdWU6IGNodW5rLCBkb25lOiBmYWxzZSB9KSxcbiAgICAgICAgICAgIF9jbG9zZVN0ZXBzOiAoKSA9PiByZXNvbHZlUHJvbWlzZSh7IHZhbHVlOiB1bmRlZmluZWQsIGRvbmU6IHRydWUgfSksXG4gICAgICAgICAgICBfZXJyb3JTdGVwczogZSA9PiByZWplY3RQcm9taXNlKGUpXG4gICAgICAgIH07XG4gICAgICAgIFJlYWRhYmxlU3RyZWFtRGVmYXVsdFJlYWRlclJlYWQodGhpcywgcmVhZFJlcXVlc3QpO1xuICAgICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVsZWFzZXMgdGhlIHJlYWRlcidzIGxvY2sgb24gdGhlIGNvcnJlc3BvbmRpbmcgc3RyZWFtLiBBZnRlciB0aGUgbG9jayBpcyByZWxlYXNlZCwgdGhlIHJlYWRlciBpcyBubyBsb25nZXIgYWN0aXZlLlxuICAgICAqIElmIHRoZSBhc3NvY2lhdGVkIHN0cmVhbSBpcyBlcnJvcmVkIHdoZW4gdGhlIGxvY2sgaXMgcmVsZWFzZWQsIHRoZSByZWFkZXIgd2lsbCBhcHBlYXIgZXJyb3JlZCBpbiB0aGUgc2FtZSB3YXlcbiAgICAgKiBmcm9tIG5vdyBvbjsgb3RoZXJ3aXNlLCB0aGUgcmVhZGVyIHdpbGwgYXBwZWFyIGNsb3NlZC5cbiAgICAgKlxuICAgICAqIEEgcmVhZGVyJ3MgbG9jayBjYW5ub3QgYmUgcmVsZWFzZWQgd2hpbGUgaXQgc3RpbGwgaGFzIGEgcGVuZGluZyByZWFkIHJlcXVlc3QsIGkuZS4sIGlmIGEgcHJvbWlzZSByZXR1cm5lZCBieVxuICAgICAqIHRoZSByZWFkZXIncyB7QGxpbmsgUmVhZGFibGVTdHJlYW1EZWZhdWx0UmVhZGVyLnJlYWQgfCByZWFkKCl9IG1ldGhvZCBoYXMgbm90IHlldCBiZWVuIHNldHRsZWQuIEF0dGVtcHRpbmcgdG9cbiAgICAgKiBkbyBzbyB3aWxsIHRocm93IGEgYFR5cGVFcnJvcmAgYW5kIGxlYXZlIHRoZSByZWFkZXIgbG9ja2VkIHRvIHRoZSBzdHJlYW0uXG4gICAgICovXG4gICAgcmVsZWFzZUxvY2soKSB7XG4gICAgICAgIGlmICghSXNSZWFkYWJsZVN0cmVhbURlZmF1bHRSZWFkZXIodGhpcykpIHtcbiAgICAgICAgICAgIHRocm93IGRlZmF1bHRSZWFkZXJCcmFuZENoZWNrRXhjZXB0aW9uKCdyZWxlYXNlTG9jaycpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9vd25lclJlYWRhYmxlU3RyZWFtID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fcmVhZFJlcXVlc3RzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RyaWVkIHRvIHJlbGVhc2UgYSByZWFkZXIgbG9jayB3aGVuIHRoYXQgcmVhZGVyIGhhcyBwZW5kaW5nIHJlYWQoKSBjYWxscyB1bi1zZXR0bGVkJyk7XG4gICAgICAgIH1cbiAgICAgICAgUmVhZGFibGVTdHJlYW1SZWFkZXJHZW5lcmljUmVsZWFzZSh0aGlzKTtcbiAgICB9XG59XG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyhSZWFkYWJsZVN0cmVhbURlZmF1bHRSZWFkZXIucHJvdG90eXBlLCB7XG4gICAgY2FuY2VsOiB7IGVudW1lcmFibGU6IHRydWUgfSxcbiAgICByZWFkOiB7IGVudW1lcmFibGU6IHRydWUgfSxcbiAgICByZWxlYXNlTG9jazogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG4gICAgY2xvc2VkOiB7IGVudW1lcmFibGU6IHRydWUgfVxufSk7XG5pZiAodHlwZW9mIFN5bWJvbFBvbHlmaWxsLnRvU3RyaW5nVGFnID09PSAnc3ltYm9sJykge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShSZWFkYWJsZVN0cmVhbURlZmF1bHRSZWFkZXIucHJvdG90eXBlLCBTeW1ib2xQb2x5ZmlsbC50b1N0cmluZ1RhZywge1xuICAgICAgICB2YWx1ZTogJ1JlYWRhYmxlU3RyZWFtRGVmYXVsdFJlYWRlcicsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xufVxuLy8gQWJzdHJhY3Qgb3BlcmF0aW9ucyBmb3IgdGhlIHJlYWRlcnMuXG5mdW5jdGlvbiBJc1JlYWRhYmxlU3RyZWFtRGVmYXVsdFJlYWRlcih4KSB7XG4gICAgaWYgKCF0eXBlSXNPYmplY3QoeCkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh4LCAnX3JlYWRSZXF1ZXN0cycpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHggaW5zdGFuY2VvZiBSZWFkYWJsZVN0cmVhbURlZmF1bHRSZWFkZXI7XG59XG5mdW5jdGlvbiBSZWFkYWJsZVN0cmVhbURlZmF1bHRSZWFkZXJSZWFkKHJlYWRlciwgcmVhZFJlcXVlc3QpIHtcbiAgICBjb25zdCBzdHJlYW0gPSByZWFkZXIuX293bmVyUmVhZGFibGVTdHJlYW07XG4gICAgc3RyZWFtLl9kaXN0dXJiZWQgPSB0cnVlO1xuICAgIGlmIChzdHJlYW0uX3N0YXRlID09PSAnY2xvc2VkJykge1xuICAgICAgICByZWFkUmVxdWVzdC5fY2xvc2VTdGVwcygpO1xuICAgIH1cbiAgICBlbHNlIGlmIChzdHJlYW0uX3N0YXRlID09PSAnZXJyb3JlZCcpIHtcbiAgICAgICAgcmVhZFJlcXVlc3QuX2Vycm9yU3RlcHMoc3RyZWFtLl9zdG9yZWRFcnJvcik7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBzdHJlYW0uX3JlYWRhYmxlU3RyZWFtQ29udHJvbGxlcltQdWxsU3RlcHNdKHJlYWRSZXF1ZXN0KTtcbiAgICB9XG59XG4vLyBIZWxwZXIgZnVuY3Rpb25zIGZvciB0aGUgUmVhZGFibGVTdHJlYW1EZWZhdWx0UmVhZGVyLlxuZnVuY3Rpb24gZGVmYXVsdFJlYWRlckJyYW5kQ2hlY2tFeGNlcHRpb24obmFtZSkge1xuICAgIHJldHVybiBuZXcgVHlwZUVycm9yKGBSZWFkYWJsZVN0cmVhbURlZmF1bHRSZWFkZXIucHJvdG90eXBlLiR7bmFtZX0gY2FuIG9ubHkgYmUgdXNlZCBvbiBhIFJlYWRhYmxlU3RyZWFtRGVmYXVsdFJlYWRlcmApO1xufVxuXG4vLy8gPHJlZmVyZW5jZSBsaWI9XCJlczIwMTguYXN5bmNpdGVyYWJsZVwiIC8+XG4vKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZW1wdHktZnVuY3Rpb24gKi9cbmNvbnN0IEFzeW5jSXRlcmF0b3JQcm90b3R5cGUgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YoT2JqZWN0LmdldFByb3RvdHlwZU9mKGFzeW5jIGZ1bmN0aW9uKiAoKSB7IH0pLnByb3RvdHlwZSk7XG5cbi8vLyA8cmVmZXJlbmNlIGxpYj1cImVzMjAxOC5hc3luY2l0ZXJhYmxlXCIgLz5cbmNsYXNzIFJlYWRhYmxlU3RyZWFtQXN5bmNJdGVyYXRvckltcGwge1xuICAgIGNvbnN0cnVjdG9yKHJlYWRlciwgcHJldmVudENhbmNlbCkge1xuICAgICAgICB0aGlzLl9vbmdvaW5nUHJvbWlzZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5faXNGaW5pc2hlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9yZWFkZXIgPSByZWFkZXI7XG4gICAgICAgIHRoaXMuX3ByZXZlbnRDYW5jZWwgPSBwcmV2ZW50Q2FuY2VsO1xuICAgIH1cbiAgICBuZXh0KCkge1xuICAgICAgICBjb25zdCBuZXh0U3RlcHMgPSAoKSA9PiB0aGlzLl9uZXh0U3RlcHMoKTtcbiAgICAgICAgdGhpcy5fb25nb2luZ1Byb21pc2UgPSB0aGlzLl9vbmdvaW5nUHJvbWlzZSA/XG4gICAgICAgICAgICB0cmFuc2Zvcm1Qcm9taXNlV2l0aCh0aGlzLl9vbmdvaW5nUHJvbWlzZSwgbmV4dFN0ZXBzLCBuZXh0U3RlcHMpIDpcbiAgICAgICAgICAgIG5leHRTdGVwcygpO1xuICAgICAgICByZXR1cm4gdGhpcy5fb25nb2luZ1Byb21pc2U7XG4gICAgfVxuICAgIHJldHVybih2YWx1ZSkge1xuICAgICAgICBjb25zdCByZXR1cm5TdGVwcyA9ICgpID0+IHRoaXMuX3JldHVyblN0ZXBzKHZhbHVlKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX29uZ29pbmdQcm9taXNlID9cbiAgICAgICAgICAgIHRyYW5zZm9ybVByb21pc2VXaXRoKHRoaXMuX29uZ29pbmdQcm9taXNlLCByZXR1cm5TdGVwcywgcmV0dXJuU3RlcHMpIDpcbiAgICAgICAgICAgIHJldHVyblN0ZXBzKCk7XG4gICAgfVxuICAgIF9uZXh0U3RlcHMoKSB7XG4gICAgICAgIGlmICh0aGlzLl9pc0ZpbmlzaGVkKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHsgdmFsdWU6IHVuZGVmaW5lZCwgZG9uZTogdHJ1ZSB9KTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByZWFkZXIgPSB0aGlzLl9yZWFkZXI7XG4gICAgICAgIGlmIChyZWFkZXIuX293bmVyUmVhZGFibGVTdHJlYW0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIHByb21pc2VSZWplY3RlZFdpdGgocmVhZGVyTG9ja0V4Y2VwdGlvbignaXRlcmF0ZScpKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgcmVzb2x2ZVByb21pc2U7XG4gICAgICAgIGxldCByZWplY3RQcm9taXNlO1xuICAgICAgICBjb25zdCBwcm9taXNlID0gbmV3UHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICByZXNvbHZlUHJvbWlzZSA9IHJlc29sdmU7XG4gICAgICAgICAgICByZWplY3RQcm9taXNlID0gcmVqZWN0O1xuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgcmVhZFJlcXVlc3QgPSB7XG4gICAgICAgICAgICBfY2h1bmtTdGVwczogY2h1bmsgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX29uZ29pbmdQcm9taXNlID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIC8vIFRoaXMgbmVlZHMgdG8gYmUgZGVsYXllZCBieSBvbmUgbWljcm90YXNrLCBvdGhlcndpc2Ugd2Ugc3RvcCBwdWxsaW5nIHRvbyBlYXJseSB3aGljaCBicmVha3MgYSB0ZXN0LlxuICAgICAgICAgICAgICAgIC8vIEZJWE1FIElzIHRoaXMgYSBidWcgaW4gdGhlIHNwZWNpZmljYXRpb24sIG9yIGluIHRoZSB0ZXN0P1xuICAgICAgICAgICAgICAgIHF1ZXVlTWljcm90YXNrKCgpID0+IHJlc29sdmVQcm9taXNlKHsgdmFsdWU6IGNodW5rLCBkb25lOiBmYWxzZSB9KSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX2Nsb3NlU3RlcHM6ICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9vbmdvaW5nUHJvbWlzZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB0aGlzLl9pc0ZpbmlzaGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBSZWFkYWJsZVN0cmVhbVJlYWRlckdlbmVyaWNSZWxlYXNlKHJlYWRlcik7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZVByb21pc2UoeyB2YWx1ZTogdW5kZWZpbmVkLCBkb25lOiB0cnVlIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9lcnJvclN0ZXBzOiByZWFzb24gPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX29uZ29pbmdQcm9taXNlID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIHRoaXMuX2lzRmluaXNoZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIFJlYWRhYmxlU3RyZWFtUmVhZGVyR2VuZXJpY1JlbGVhc2UocmVhZGVyKTtcbiAgICAgICAgICAgICAgICByZWplY3RQcm9taXNlKHJlYXNvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIFJlYWRhYmxlU3RyZWFtRGVmYXVsdFJlYWRlclJlYWQocmVhZGVyLCByZWFkUmVxdWVzdCk7XG4gICAgICAgIHJldHVybiBwcm9taXNlO1xuICAgIH1cbiAgICBfcmV0dXJuU3RlcHModmFsdWUpIHtcbiAgICAgICAgaWYgKHRoaXMuX2lzRmluaXNoZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoeyB2YWx1ZSwgZG9uZTogdHJ1ZSB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9pc0ZpbmlzaGVkID0gdHJ1ZTtcbiAgICAgICAgY29uc3QgcmVhZGVyID0gdGhpcy5fcmVhZGVyO1xuICAgICAgICBpZiAocmVhZGVyLl9vd25lclJlYWRhYmxlU3RyZWFtID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBwcm9taXNlUmVqZWN0ZWRXaXRoKHJlYWRlckxvY2tFeGNlcHRpb24oJ2ZpbmlzaCBpdGVyYXRpbmcnKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLl9wcmV2ZW50Q2FuY2VsKSB7XG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBSZWFkYWJsZVN0cmVhbVJlYWRlckdlbmVyaWNDYW5jZWwocmVhZGVyLCB2YWx1ZSk7XG4gICAgICAgICAgICBSZWFkYWJsZVN0cmVhbVJlYWRlckdlbmVyaWNSZWxlYXNlKHJlYWRlcik7XG4gICAgICAgICAgICByZXR1cm4gdHJhbnNmb3JtUHJvbWlzZVdpdGgocmVzdWx0LCAoKSA9PiAoeyB2YWx1ZSwgZG9uZTogdHJ1ZSB9KSk7XG4gICAgICAgIH1cbiAgICAgICAgUmVhZGFibGVTdHJlYW1SZWFkZXJHZW5lcmljUmVsZWFzZShyZWFkZXIpO1xuICAgICAgICByZXR1cm4gcHJvbWlzZVJlc29sdmVkV2l0aCh7IHZhbHVlLCBkb25lOiB0cnVlIH0pO1xuICAgIH1cbn1cbmNvbnN0IFJlYWRhYmxlU3RyZWFtQXN5bmNJdGVyYXRvclByb3RvdHlwZSA9IHtcbiAgICBuZXh0KCkge1xuICAgICAgICBpZiAoIUlzUmVhZGFibGVTdHJlYW1Bc3luY0l0ZXJhdG9yKHRoaXMpKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJvbWlzZVJlamVjdGVkV2l0aChzdHJlYW1Bc3luY0l0ZXJhdG9yQnJhbmRDaGVja0V4Y2VwdGlvbignbmV4dCcpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fYXN5bmNJdGVyYXRvckltcGwubmV4dCgpO1xuICAgIH0sXG4gICAgcmV0dXJuKHZhbHVlKSB7XG4gICAgICAgIGlmICghSXNSZWFkYWJsZVN0cmVhbUFzeW5jSXRlcmF0b3IodGhpcykpIHtcbiAgICAgICAgICAgIHJldHVybiBwcm9taXNlUmVqZWN0ZWRXaXRoKHN0cmVhbUFzeW5jSXRlcmF0b3JCcmFuZENoZWNrRXhjZXB0aW9uKCdyZXR1cm4nKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2FzeW5jSXRlcmF0b3JJbXBsLnJldHVybih2YWx1ZSk7XG4gICAgfVxufTtcbmlmIChBc3luY0l0ZXJhdG9yUHJvdG90eXBlICE9PSB1bmRlZmluZWQpIHtcbiAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YoUmVhZGFibGVTdHJlYW1Bc3luY0l0ZXJhdG9yUHJvdG90eXBlLCBBc3luY0l0ZXJhdG9yUHJvdG90eXBlKTtcbn1cbi8vIEFic3RyYWN0IG9wZXJhdGlvbnMgZm9yIHRoZSBSZWFkYWJsZVN0cmVhbS5cbmZ1bmN0aW9uIEFjcXVpcmVSZWFkYWJsZVN0cmVhbUFzeW5jSXRlcmF0b3Ioc3RyZWFtLCBwcmV2ZW50Q2FuY2VsKSB7XG4gICAgY29uc3QgcmVhZGVyID0gQWNxdWlyZVJlYWRhYmxlU3RyZWFtRGVmYXVsdFJlYWRlcihzdHJlYW0pO1xuICAgIGNvbnN0IGltcGwgPSBuZXcgUmVhZGFibGVTdHJlYW1Bc3luY0l0ZXJhdG9ySW1wbChyZWFkZXIsIHByZXZlbnRDYW5jZWwpO1xuICAgIGNvbnN0IGl0ZXJhdG9yID0gT2JqZWN0LmNyZWF0ZShSZWFkYWJsZVN0cmVhbUFzeW5jSXRlcmF0b3JQcm90b3R5cGUpO1xuICAgIGl0ZXJhdG9yLl9hc3luY0l0ZXJhdG9ySW1wbCA9IGltcGw7XG4gICAgcmV0dXJuIGl0ZXJhdG9yO1xufVxuZnVuY3Rpb24gSXNSZWFkYWJsZVN0cmVhbUFzeW5jSXRlcmF0b3IoeCkge1xuICAgIGlmICghdHlwZUlzT2JqZWN0KHgpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoeCwgJ19hc3luY0l0ZXJhdG9ySW1wbCcpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gbm9pbnNwZWN0aW9uIFN1c3BpY2lvdXNUeXBlT2ZHdWFyZFxuICAgICAgICByZXR1cm4geC5fYXN5bmNJdGVyYXRvckltcGwgaW5zdGFuY2VvZlxuICAgICAgICAgICAgUmVhZGFibGVTdHJlYW1Bc3luY0l0ZXJhdG9ySW1wbDtcbiAgICB9XG4gICAgY2F0Y2ggKF9hKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG4vLyBIZWxwZXIgZnVuY3Rpb25zIGZvciB0aGUgUmVhZGFibGVTdHJlYW0uXG5mdW5jdGlvbiBzdHJlYW1Bc3luY0l0ZXJhdG9yQnJhbmRDaGVja0V4Y2VwdGlvbihuYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBUeXBlRXJyb3IoYFJlYWRhYmxlU3RyZWFtQXN5bmNJdGVyYXRvci4ke25hbWV9IGNhbiBvbmx5IGJlIHVzZWQgb24gYSBSZWFkYWJsZVN0ZWFtQXN5bmNJdGVyYXRvcmApO1xufVxuXG4vLy8gPHJlZmVyZW5jZSBsaWI9XCJlczIwMTUuY29yZVwiIC8+XG4vLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9OdW1iZXIvaXNOYU4jUG9seWZpbGxcbmNvbnN0IE51bWJlcklzTmFOID0gTnVtYmVyLmlzTmFOIHx8IGZ1bmN0aW9uICh4KSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXNlbGYtY29tcGFyZVxuICAgIHJldHVybiB4ICE9PSB4O1xufTtcblxuZnVuY3Rpb24gQ3JlYXRlQXJyYXlGcm9tTGlzdChlbGVtZW50cykge1xuICAgIC8vIFdlIHVzZSBhcnJheXMgdG8gcmVwcmVzZW50IGxpc3RzLCBzbyB0aGlzIGlzIGJhc2ljYWxseSBhIG5vLW9wLlxuICAgIC8vIERvIGEgc2xpY2UgdGhvdWdoIGp1c3QgaW4gY2FzZSB3ZSBoYXBwZW4gdG8gZGVwZW5kIG9uIHRoZSB1bmlxdWUtbmVzcy5cbiAgICByZXR1cm4gZWxlbWVudHMuc2xpY2UoKTtcbn1cbmZ1bmN0aW9uIENvcHlEYXRhQmxvY2tCeXRlcyhkZXN0LCBkZXN0T2Zmc2V0LCBzcmMsIHNyY09mZnNldCwgbikge1xuICAgIG5ldyBVaW50OEFycmF5KGRlc3QpLnNldChuZXcgVWludDhBcnJheShzcmMsIHNyY09mZnNldCwgbiksIGRlc3RPZmZzZXQpO1xufVxuLy8gTm90IGltcGxlbWVudGVkIGNvcnJlY3RseVxuZnVuY3Rpb24gVHJhbnNmZXJBcnJheUJ1ZmZlcihPKSB7XG4gICAgcmV0dXJuIE87XG59XG4vLyBOb3QgaW1wbGVtZW50ZWQgY29ycmVjdGx5XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzXG5mdW5jdGlvbiBJc0RldGFjaGVkQnVmZmVyKE8pIHtcbiAgICByZXR1cm4gZmFsc2U7XG59XG5mdW5jdGlvbiBBcnJheUJ1ZmZlclNsaWNlKGJ1ZmZlciwgYmVnaW4sIGVuZCkge1xuICAgIC8vIEFycmF5QnVmZmVyLnByb3RvdHlwZS5zbGljZSBpcyBub3QgYXZhaWxhYmxlIG9uIElFMTBcbiAgICAvLyBodHRwczovL3d3dy5jYW5pdXNlLmNvbS9tZG4tamF2YXNjcmlwdF9idWlsdGluc19hcnJheWJ1ZmZlcl9zbGljZVxuICAgIGlmIChidWZmZXIuc2xpY2UpIHtcbiAgICAgICAgcmV0dXJuIGJ1ZmZlci5zbGljZShiZWdpbiwgZW5kKTtcbiAgICB9XG4gICAgY29uc3QgbGVuZ3RoID0gZW5kIC0gYmVnaW47XG4gICAgY29uc3Qgc2xpY2UgPSBuZXcgQXJyYXlCdWZmZXIobGVuZ3RoKTtcbiAgICBDb3B5RGF0YUJsb2NrQnl0ZXMoc2xpY2UsIDAsIGJ1ZmZlciwgYmVnaW4sIGxlbmd0aCk7XG4gICAgcmV0dXJuIHNsaWNlO1xufVxuXG5mdW5jdGlvbiBJc05vbk5lZ2F0aXZlTnVtYmVyKHYpIHtcbiAgICBpZiAodHlwZW9mIHYgIT09ICdudW1iZXInKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKE51bWJlcklzTmFOKHYpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKHYgPCAwKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG59XG5mdW5jdGlvbiBDbG9uZUFzVWludDhBcnJheShPKSB7XG4gICAgY29uc3QgYnVmZmVyID0gQXJyYXlCdWZmZXJTbGljZShPLmJ1ZmZlciwgTy5ieXRlT2Zmc2V0LCBPLmJ5dGVPZmZzZXQgKyBPLmJ5dGVMZW5ndGgpO1xuICAgIHJldHVybiBuZXcgVWludDhBcnJheShidWZmZXIpO1xufVxuXG5mdW5jdGlvbiBEZXF1ZXVlVmFsdWUoY29udGFpbmVyKSB7XG4gICAgY29uc3QgcGFpciA9IGNvbnRhaW5lci5fcXVldWUuc2hpZnQoKTtcbiAgICBjb250YWluZXIuX3F1ZXVlVG90YWxTaXplIC09IHBhaXIuc2l6ZTtcbiAgICBpZiAoY29udGFpbmVyLl9xdWV1ZVRvdGFsU2l6ZSA8IDApIHtcbiAgICAgICAgY29udGFpbmVyLl9xdWV1ZVRvdGFsU2l6ZSA9IDA7XG4gICAgfVxuICAgIHJldHVybiBwYWlyLnZhbHVlO1xufVxuZnVuY3Rpb24gRW5xdWV1ZVZhbHVlV2l0aFNpemUoY29udGFpbmVyLCB2YWx1ZSwgc2l6ZSkge1xuICAgIGlmICghSXNOb25OZWdhdGl2ZU51bWJlcihzaXplKSB8fCBzaXplID09PSBJbmZpbml0eSkge1xuICAgICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignU2l6ZSBtdXN0IGJlIGEgZmluaXRlLCBub24tTmFOLCBub24tbmVnYXRpdmUgbnVtYmVyLicpO1xuICAgIH1cbiAgICBjb250YWluZXIuX3F1ZXVlLnB1c2goeyB2YWx1ZSwgc2l6ZSB9KTtcbiAgICBjb250YWluZXIuX3F1ZXVlVG90YWxTaXplICs9IHNpemU7XG59XG5mdW5jdGlvbiBQZWVrUXVldWVWYWx1ZShjb250YWluZXIpIHtcbiAgICBjb25zdCBwYWlyID0gY29udGFpbmVyLl9xdWV1ZS5wZWVrKCk7XG4gICAgcmV0dXJuIHBhaXIudmFsdWU7XG59XG5mdW5jdGlvbiBSZXNldFF1ZXVlKGNvbnRhaW5lcikge1xuICAgIGNvbnRhaW5lci5fcXVldWUgPSBuZXcgU2ltcGxlUXVldWUoKTtcbiAgICBjb250YWluZXIuX3F1ZXVlVG90YWxTaXplID0gMDtcbn1cblxuLyoqXG4gKiBBIHB1bGwtaW50byByZXF1ZXN0IGluIGEge0BsaW5rIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJ9LlxuICpcbiAqIEBwdWJsaWNcbiAqL1xuY2xhc3MgUmVhZGFibGVTdHJlYW1CWU9CUmVxdWVzdCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0lsbGVnYWwgY29uc3RydWN0b3InKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgdmlldyBmb3Igd3JpdGluZyBpbiB0bywgb3IgYG51bGxgIGlmIHRoZSBCWU9CIHJlcXVlc3QgaGFzIGFscmVhZHkgYmVlbiByZXNwb25kZWQgdG8uXG4gICAgICovXG4gICAgZ2V0IHZpZXcoKSB7XG4gICAgICAgIGlmICghSXNSZWFkYWJsZVN0cmVhbUJZT0JSZXF1ZXN0KHRoaXMpKSB7XG4gICAgICAgICAgICB0aHJvdyBieW9iUmVxdWVzdEJyYW5kQ2hlY2tFeGNlcHRpb24oJ3ZpZXcnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fdmlldztcbiAgICB9XG4gICAgcmVzcG9uZChieXRlc1dyaXR0ZW4pIHtcbiAgICAgICAgaWYgKCFJc1JlYWRhYmxlU3RyZWFtQllPQlJlcXVlc3QodGhpcykpIHtcbiAgICAgICAgICAgIHRocm93IGJ5b2JSZXF1ZXN0QnJhbmRDaGVja0V4Y2VwdGlvbigncmVzcG9uZCcpO1xuICAgICAgICB9XG4gICAgICAgIGFzc2VydFJlcXVpcmVkQXJndW1lbnQoYnl0ZXNXcml0dGVuLCAxLCAncmVzcG9uZCcpO1xuICAgICAgICBieXRlc1dyaXR0ZW4gPSBjb252ZXJ0VW5zaWduZWRMb25nTG9uZ1dpdGhFbmZvcmNlUmFuZ2UoYnl0ZXNXcml0dGVuLCAnRmlyc3QgcGFyYW1ldGVyJyk7XG4gICAgICAgIGlmICh0aGlzLl9hc3NvY2lhdGVkUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGlzIEJZT0IgcmVxdWVzdCBoYXMgYmVlbiBpbnZhbGlkYXRlZCcpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChJc0RldGFjaGVkQnVmZmVyKHRoaXMuX3ZpZXcuYnVmZmVyKSkgO1xuICAgICAgICBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyUmVzcG9uZCh0aGlzLl9hc3NvY2lhdGVkUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlciwgYnl0ZXNXcml0dGVuKTtcbiAgICB9XG4gICAgcmVzcG9uZFdpdGhOZXdWaWV3KHZpZXcpIHtcbiAgICAgICAgaWYgKCFJc1JlYWRhYmxlU3RyZWFtQllPQlJlcXVlc3QodGhpcykpIHtcbiAgICAgICAgICAgIHRocm93IGJ5b2JSZXF1ZXN0QnJhbmRDaGVja0V4Y2VwdGlvbigncmVzcG9uZFdpdGhOZXdWaWV3Jyk7XG4gICAgICAgIH1cbiAgICAgICAgYXNzZXJ0UmVxdWlyZWRBcmd1bWVudCh2aWV3LCAxLCAncmVzcG9uZFdpdGhOZXdWaWV3Jyk7XG4gICAgICAgIGlmICghQXJyYXlCdWZmZXIuaXNWaWV3KHZpZXcpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdZb3UgY2FuIG9ubHkgcmVzcG9uZCB3aXRoIGFycmF5IGJ1ZmZlciB2aWV3cycpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9hc3NvY2lhdGVkUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGlzIEJZT0IgcmVxdWVzdCBoYXMgYmVlbiBpbnZhbGlkYXRlZCcpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChJc0RldGFjaGVkQnVmZmVyKHZpZXcuYnVmZmVyKSkgO1xuICAgICAgICBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyUmVzcG9uZFdpdGhOZXdWaWV3KHRoaXMuX2Fzc29jaWF0ZWRSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyLCB2aWV3KTtcbiAgICB9XG59XG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyhSZWFkYWJsZVN0cmVhbUJZT0JSZXF1ZXN0LnByb3RvdHlwZSwge1xuICAgIHJlc3BvbmQ6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxuICAgIHJlc3BvbmRXaXRoTmV3VmlldzogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG4gICAgdmlldzogeyBlbnVtZXJhYmxlOiB0cnVlIH1cbn0pO1xuaWYgKHR5cGVvZiBTeW1ib2xQb2x5ZmlsbC50b1N0cmluZ1RhZyA9PT0gJ3N5bWJvbCcpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoUmVhZGFibGVTdHJlYW1CWU9CUmVxdWVzdC5wcm90b3R5cGUsIFN5bWJvbFBvbHlmaWxsLnRvU3RyaW5nVGFnLCB7XG4gICAgICAgIHZhbHVlOiAnUmVhZGFibGVTdHJlYW1CWU9CUmVxdWVzdCcsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xufVxuLyoqXG4gKiBBbGxvd3MgY29udHJvbCBvZiBhIHtAbGluayBSZWFkYWJsZVN0cmVhbSB8IHJlYWRhYmxlIGJ5dGUgc3RyZWFtfSdzIHN0YXRlIGFuZCBpbnRlcm5hbCBxdWV1ZS5cbiAqXG4gKiBAcHVibGljXG4gKi9cbmNsYXNzIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbGxlZ2FsIGNvbnN0cnVjdG9yJyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGN1cnJlbnQgQllPQiBwdWxsIHJlcXVlc3QsIG9yIGBudWxsYCBpZiB0aGVyZSBpc24ndCBvbmUuXG4gICAgICovXG4gICAgZ2V0IGJ5b2JSZXF1ZXN0KCkge1xuICAgICAgICBpZiAoIUlzUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlcih0aGlzKSkge1xuICAgICAgICAgICAgdGhyb3cgYnl0ZVN0cmVhbUNvbnRyb2xsZXJCcmFuZENoZWNrRXhjZXB0aW9uKCdieW9iUmVxdWVzdCcpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyR2V0QllPQlJlcXVlc3QodGhpcyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGRlc2lyZWQgc2l6ZSB0byBmaWxsIHRoZSBjb250cm9sbGVkIHN0cmVhbSdzIGludGVybmFsIHF1ZXVlLiBJdCBjYW4gYmUgbmVnYXRpdmUsIGlmIHRoZSBxdWV1ZSBpc1xuICAgICAqIG92ZXItZnVsbC4gQW4gdW5kZXJseWluZyBieXRlIHNvdXJjZSBvdWdodCB0byB1c2UgdGhpcyBpbmZvcm1hdGlvbiB0byBkZXRlcm1pbmUgd2hlbiBhbmQgaG93IHRvIGFwcGx5IGJhY2twcmVzc3VyZS5cbiAgICAgKi9cbiAgICBnZXQgZGVzaXJlZFNpemUoKSB7XG4gICAgICAgIGlmICghSXNSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyKHRoaXMpKSB7XG4gICAgICAgICAgICB0aHJvdyBieXRlU3RyZWFtQ29udHJvbGxlckJyYW5kQ2hlY2tFeGNlcHRpb24oJ2Rlc2lyZWRTaXplJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJHZXREZXNpcmVkU2l6ZSh0aGlzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2xvc2VzIHRoZSBjb250cm9sbGVkIHJlYWRhYmxlIHN0cmVhbS4gQ29uc3VtZXJzIHdpbGwgc3RpbGwgYmUgYWJsZSB0byByZWFkIGFueSBwcmV2aW91c2x5LWVucXVldWVkIGNodW5rcyBmcm9tXG4gICAgICogdGhlIHN0cmVhbSwgYnV0IG9uY2UgdGhvc2UgYXJlIHJlYWQsIHRoZSBzdHJlYW0gd2lsbCBiZWNvbWUgY2xvc2VkLlxuICAgICAqL1xuICAgIGNsb3NlKCkge1xuICAgICAgICBpZiAoIUlzUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlcih0aGlzKSkge1xuICAgICAgICAgICAgdGhyb3cgYnl0ZVN0cmVhbUNvbnRyb2xsZXJCcmFuZENoZWNrRXhjZXB0aW9uKCdjbG9zZScpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9jbG9zZVJlcXVlc3RlZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIHN0cmVhbSBoYXMgYWxyZWFkeSBiZWVuIGNsb3NlZDsgZG8gbm90IGNsb3NlIGl0IGFnYWluIScpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHN0YXRlID0gdGhpcy5fY29udHJvbGxlZFJlYWRhYmxlQnl0ZVN0cmVhbS5fc3RhdGU7XG4gICAgICAgIGlmIChzdGF0ZSAhPT0gJ3JlYWRhYmxlJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgVGhlIHN0cmVhbSAoaW4gJHtzdGF0ZX0gc3RhdGUpIGlzIG5vdCBpbiB0aGUgcmVhZGFibGUgc3RhdGUgYW5kIGNhbm5vdCBiZSBjbG9zZWRgKTtcbiAgICAgICAgfVxuICAgICAgICBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyQ2xvc2UodGhpcyk7XG4gICAgfVxuICAgIGVucXVldWUoY2h1bmspIHtcbiAgICAgICAgaWYgKCFJc1JlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXIodGhpcykpIHtcbiAgICAgICAgICAgIHRocm93IGJ5dGVTdHJlYW1Db250cm9sbGVyQnJhbmRDaGVja0V4Y2VwdGlvbignZW5xdWV1ZScpO1xuICAgICAgICB9XG4gICAgICAgIGFzc2VydFJlcXVpcmVkQXJndW1lbnQoY2h1bmssIDEsICdlbnF1ZXVlJyk7XG4gICAgICAgIGlmICghQXJyYXlCdWZmZXIuaXNWaWV3KGNodW5rKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignY2h1bmsgbXVzdCBiZSBhbiBhcnJheSBidWZmZXIgdmlldycpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjaHVuay5ieXRlTGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdjaHVuayBtdXN0IGhhdmUgbm9uLXplcm8gYnl0ZUxlbmd0aCcpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjaHVuay5idWZmZXIuYnl0ZUxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgY2h1bmsncyBidWZmZXIgbXVzdCBoYXZlIG5vbi16ZXJvIGJ5dGVMZW5ndGhgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fY2xvc2VSZXF1ZXN0ZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3N0cmVhbSBpcyBjbG9zZWQgb3IgZHJhaW5pbmcnKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzdGF0ZSA9IHRoaXMuX2NvbnRyb2xsZWRSZWFkYWJsZUJ5dGVTdHJlYW0uX3N0YXRlO1xuICAgICAgICBpZiAoc3RhdGUgIT09ICdyZWFkYWJsZScpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYFRoZSBzdHJlYW0gKGluICR7c3RhdGV9IHN0YXRlKSBpcyBub3QgaW4gdGhlIHJlYWRhYmxlIHN0YXRlIGFuZCBjYW5ub3QgYmUgZW5xdWV1ZWQgdG9gKTtcbiAgICAgICAgfVxuICAgICAgICBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyRW5xdWV1ZSh0aGlzLCBjaHVuayk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEVycm9ycyB0aGUgY29udHJvbGxlZCByZWFkYWJsZSBzdHJlYW0sIG1ha2luZyBhbGwgZnV0dXJlIGludGVyYWN0aW9ucyB3aXRoIGl0IGZhaWwgd2l0aCB0aGUgZ2l2ZW4gZXJyb3IgYGVgLlxuICAgICAqL1xuICAgIGVycm9yKGUgPSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKCFJc1JlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXIodGhpcykpIHtcbiAgICAgICAgICAgIHRocm93IGJ5dGVTdHJlYW1Db250cm9sbGVyQnJhbmRDaGVja0V4Y2VwdGlvbignZXJyb3InKTtcbiAgICAgICAgfVxuICAgICAgICBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyRXJyb3IodGhpcywgZSk7XG4gICAgfVxuICAgIC8qKiBAaW50ZXJuYWwgKi9cbiAgICBbQ2FuY2VsU3RlcHNdKHJlYXNvbikge1xuICAgICAgICBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyQ2xlYXJQZW5kaW5nUHVsbEludG9zKHRoaXMpO1xuICAgICAgICBSZXNldFF1ZXVlKHRoaXMpO1xuICAgICAgICBjb25zdCByZXN1bHQgPSB0aGlzLl9jYW5jZWxBbGdvcml0aG0ocmVhc29uKTtcbiAgICAgICAgUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckNsZWFyQWxnb3JpdGhtcyh0aGlzKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgLyoqIEBpbnRlcm5hbCAqL1xuICAgIFtQdWxsU3RlcHNdKHJlYWRSZXF1ZXN0KSB7XG4gICAgICAgIGNvbnN0IHN0cmVhbSA9IHRoaXMuX2NvbnRyb2xsZWRSZWFkYWJsZUJ5dGVTdHJlYW07XG4gICAgICAgIGlmICh0aGlzLl9xdWV1ZVRvdGFsU2l6ZSA+IDApIHtcbiAgICAgICAgICAgIGNvbnN0IGVudHJ5ID0gdGhpcy5fcXVldWUuc2hpZnQoKTtcbiAgICAgICAgICAgIHRoaXMuX3F1ZXVlVG90YWxTaXplIC09IGVudHJ5LmJ5dGVMZW5ndGg7XG4gICAgICAgICAgICBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVySGFuZGxlUXVldWVEcmFpbih0aGlzKTtcbiAgICAgICAgICAgIGNvbnN0IHZpZXcgPSBuZXcgVWludDhBcnJheShlbnRyeS5idWZmZXIsIGVudHJ5LmJ5dGVPZmZzZXQsIGVudHJ5LmJ5dGVMZW5ndGgpO1xuICAgICAgICAgICAgcmVhZFJlcXVlc3QuX2NodW5rU3RlcHModmlldyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYXV0b0FsbG9jYXRlQ2h1bmtTaXplID0gdGhpcy5fYXV0b0FsbG9jYXRlQ2h1bmtTaXplO1xuICAgICAgICBpZiAoYXV0b0FsbG9jYXRlQ2h1bmtTaXplICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGxldCBidWZmZXI7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGJ1ZmZlciA9IG5ldyBBcnJheUJ1ZmZlcihhdXRvQWxsb2NhdGVDaHVua1NpemUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGJ1ZmZlckUpIHtcbiAgICAgICAgICAgICAgICByZWFkUmVxdWVzdC5fZXJyb3JTdGVwcyhidWZmZXJFKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBwdWxsSW50b0Rlc2NyaXB0b3IgPSB7XG4gICAgICAgICAgICAgICAgYnVmZmVyLFxuICAgICAgICAgICAgICAgIGJ1ZmZlckJ5dGVMZW5ndGg6IGF1dG9BbGxvY2F0ZUNodW5rU2l6ZSxcbiAgICAgICAgICAgICAgICBieXRlT2Zmc2V0OiAwLFxuICAgICAgICAgICAgICAgIGJ5dGVMZW5ndGg6IGF1dG9BbGxvY2F0ZUNodW5rU2l6ZSxcbiAgICAgICAgICAgICAgICBieXRlc0ZpbGxlZDogMCxcbiAgICAgICAgICAgICAgICBlbGVtZW50U2l6ZTogMSxcbiAgICAgICAgICAgICAgICB2aWV3Q29uc3RydWN0b3I6IFVpbnQ4QXJyYXksXG4gICAgICAgICAgICAgICAgcmVhZGVyVHlwZTogJ2RlZmF1bHQnXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy5fcGVuZGluZ1B1bGxJbnRvcy5wdXNoKHB1bGxJbnRvRGVzY3JpcHRvcik7XG4gICAgICAgIH1cbiAgICAgICAgUmVhZGFibGVTdHJlYW1BZGRSZWFkUmVxdWVzdChzdHJlYW0sIHJlYWRSZXF1ZXN0KTtcbiAgICAgICAgUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckNhbGxQdWxsSWZOZWVkZWQodGhpcyk7XG4gICAgfVxufVxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlci5wcm90b3R5cGUsIHtcbiAgICBjbG9zZTogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG4gICAgZW5xdWV1ZTogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG4gICAgZXJyb3I6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxuICAgIGJ5b2JSZXF1ZXN0OiB7IGVudW1lcmFibGU6IHRydWUgfSxcbiAgICBkZXNpcmVkU2l6ZTogeyBlbnVtZXJhYmxlOiB0cnVlIH1cbn0pO1xuaWYgKHR5cGVvZiBTeW1ib2xQb2x5ZmlsbC50b1N0cmluZ1RhZyA9PT0gJ3N5bWJvbCcpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlci5wcm90b3R5cGUsIFN5bWJvbFBvbHlmaWxsLnRvU3RyaW5nVGFnLCB7XG4gICAgICAgIHZhbHVlOiAnUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlcicsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xufVxuLy8gQWJzdHJhY3Qgb3BlcmF0aW9ucyBmb3IgdGhlIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXIuXG5mdW5jdGlvbiBJc1JlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXIoeCkge1xuICAgIGlmICghdHlwZUlzT2JqZWN0KHgpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoeCwgJ19jb250cm9sbGVkUmVhZGFibGVCeXRlU3RyZWFtJykpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4geCBpbnN0YW5jZW9mIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXI7XG59XG5mdW5jdGlvbiBJc1JlYWRhYmxlU3RyZWFtQllPQlJlcXVlc3QoeCkge1xuICAgIGlmICghdHlwZUlzT2JqZWN0KHgpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoeCwgJ19hc3NvY2lhdGVkUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlcicpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHggaW5zdGFuY2VvZiBSZWFkYWJsZVN0cmVhbUJZT0JSZXF1ZXN0O1xufVxuZnVuY3Rpb24gUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckNhbGxQdWxsSWZOZWVkZWQoY29udHJvbGxlcikge1xuICAgIGNvbnN0IHNob3VsZFB1bGwgPSBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyU2hvdWxkQ2FsbFB1bGwoY29udHJvbGxlcik7XG4gICAgaWYgKCFzaG91bGRQdWxsKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGNvbnRyb2xsZXIuX3B1bGxpbmcpIHtcbiAgICAgICAgY29udHJvbGxlci5fcHVsbEFnYWluID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb250cm9sbGVyLl9wdWxsaW5nID0gdHJ1ZTtcbiAgICAvLyBUT0RPOiBUZXN0IGNvbnRyb2xsZXIgYXJndW1lbnRcbiAgICBjb25zdCBwdWxsUHJvbWlzZSA9IGNvbnRyb2xsZXIuX3B1bGxBbGdvcml0aG0oKTtcbiAgICB1cG9uUHJvbWlzZShwdWxsUHJvbWlzZSwgKCkgPT4ge1xuICAgICAgICBjb250cm9sbGVyLl9wdWxsaW5nID0gZmFsc2U7XG4gICAgICAgIGlmIChjb250cm9sbGVyLl9wdWxsQWdhaW4pIHtcbiAgICAgICAgICAgIGNvbnRyb2xsZXIuX3B1bGxBZ2FpbiA9IGZhbHNlO1xuICAgICAgICAgICAgUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckNhbGxQdWxsSWZOZWVkZWQoY29udHJvbGxlcik7XG4gICAgICAgIH1cbiAgICB9LCBlID0+IHtcbiAgICAgICAgUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckVycm9yKGNvbnRyb2xsZXIsIGUpO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckNsZWFyUGVuZGluZ1B1bGxJbnRvcyhjb250cm9sbGVyKSB7XG4gICAgUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckludmFsaWRhdGVCWU9CUmVxdWVzdChjb250cm9sbGVyKTtcbiAgICBjb250cm9sbGVyLl9wZW5kaW5nUHVsbEludG9zID0gbmV3IFNpbXBsZVF1ZXVlKCk7XG59XG5mdW5jdGlvbiBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyQ29tbWl0UHVsbEludG9EZXNjcmlwdG9yKHN0cmVhbSwgcHVsbEludG9EZXNjcmlwdG9yKSB7XG4gICAgbGV0IGRvbmUgPSBmYWxzZTtcbiAgICBpZiAoc3RyZWFtLl9zdGF0ZSA9PT0gJ2Nsb3NlZCcpIHtcbiAgICAgICAgZG9uZSA9IHRydWU7XG4gICAgfVxuICAgIGNvbnN0IGZpbGxlZFZpZXcgPSBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyQ29udmVydFB1bGxJbnRvRGVzY3JpcHRvcihwdWxsSW50b0Rlc2NyaXB0b3IpO1xuICAgIGlmIChwdWxsSW50b0Rlc2NyaXB0b3IucmVhZGVyVHlwZSA9PT0gJ2RlZmF1bHQnKSB7XG4gICAgICAgIFJlYWRhYmxlU3RyZWFtRnVsZmlsbFJlYWRSZXF1ZXN0KHN0cmVhbSwgZmlsbGVkVmlldywgZG9uZSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBSZWFkYWJsZVN0cmVhbUZ1bGZpbGxSZWFkSW50b1JlcXVlc3Qoc3RyZWFtLCBmaWxsZWRWaWV3LCBkb25lKTtcbiAgICB9XG59XG5mdW5jdGlvbiBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyQ29udmVydFB1bGxJbnRvRGVzY3JpcHRvcihwdWxsSW50b0Rlc2NyaXB0b3IpIHtcbiAgICBjb25zdCBieXRlc0ZpbGxlZCA9IHB1bGxJbnRvRGVzY3JpcHRvci5ieXRlc0ZpbGxlZDtcbiAgICBjb25zdCBlbGVtZW50U2l6ZSA9IHB1bGxJbnRvRGVzY3JpcHRvci5lbGVtZW50U2l6ZTtcbiAgICByZXR1cm4gbmV3IHB1bGxJbnRvRGVzY3JpcHRvci52aWV3Q29uc3RydWN0b3IocHVsbEludG9EZXNjcmlwdG9yLmJ1ZmZlciwgcHVsbEludG9EZXNjcmlwdG9yLmJ5dGVPZmZzZXQsIGJ5dGVzRmlsbGVkIC8gZWxlbWVudFNpemUpO1xufVxuZnVuY3Rpb24gUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckVucXVldWVDaHVua1RvUXVldWUoY29udHJvbGxlciwgYnVmZmVyLCBieXRlT2Zmc2V0LCBieXRlTGVuZ3RoKSB7XG4gICAgY29udHJvbGxlci5fcXVldWUucHVzaCh7IGJ1ZmZlciwgYnl0ZU9mZnNldCwgYnl0ZUxlbmd0aCB9KTtcbiAgICBjb250cm9sbGVyLl9xdWV1ZVRvdGFsU2l6ZSArPSBieXRlTGVuZ3RoO1xufVxuZnVuY3Rpb24gUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckZpbGxQdWxsSW50b0Rlc2NyaXB0b3JGcm9tUXVldWUoY29udHJvbGxlciwgcHVsbEludG9EZXNjcmlwdG9yKSB7XG4gICAgY29uc3QgZWxlbWVudFNpemUgPSBwdWxsSW50b0Rlc2NyaXB0b3IuZWxlbWVudFNpemU7XG4gICAgY29uc3QgY3VycmVudEFsaWduZWRCeXRlcyA9IHB1bGxJbnRvRGVzY3JpcHRvci5ieXRlc0ZpbGxlZCAtIHB1bGxJbnRvRGVzY3JpcHRvci5ieXRlc0ZpbGxlZCAlIGVsZW1lbnRTaXplO1xuICAgIGNvbnN0IG1heEJ5dGVzVG9Db3B5ID0gTWF0aC5taW4oY29udHJvbGxlci5fcXVldWVUb3RhbFNpemUsIHB1bGxJbnRvRGVzY3JpcHRvci5ieXRlTGVuZ3RoIC0gcHVsbEludG9EZXNjcmlwdG9yLmJ5dGVzRmlsbGVkKTtcbiAgICBjb25zdCBtYXhCeXRlc0ZpbGxlZCA9IHB1bGxJbnRvRGVzY3JpcHRvci5ieXRlc0ZpbGxlZCArIG1heEJ5dGVzVG9Db3B5O1xuICAgIGNvbnN0IG1heEFsaWduZWRCeXRlcyA9IG1heEJ5dGVzRmlsbGVkIC0gbWF4Qnl0ZXNGaWxsZWQgJSBlbGVtZW50U2l6ZTtcbiAgICBsZXQgdG90YWxCeXRlc1RvQ29weVJlbWFpbmluZyA9IG1heEJ5dGVzVG9Db3B5O1xuICAgIGxldCByZWFkeSA9IGZhbHNlO1xuICAgIGlmIChtYXhBbGlnbmVkQnl0ZXMgPiBjdXJyZW50QWxpZ25lZEJ5dGVzKSB7XG4gICAgICAgIHRvdGFsQnl0ZXNUb0NvcHlSZW1haW5pbmcgPSBtYXhBbGlnbmVkQnl0ZXMgLSBwdWxsSW50b0Rlc2NyaXB0b3IuYnl0ZXNGaWxsZWQ7XG4gICAgICAgIHJlYWR5ID0gdHJ1ZTtcbiAgICB9XG4gICAgY29uc3QgcXVldWUgPSBjb250cm9sbGVyLl9xdWV1ZTtcbiAgICB3aGlsZSAodG90YWxCeXRlc1RvQ29weVJlbWFpbmluZyA+IDApIHtcbiAgICAgICAgY29uc3QgaGVhZE9mUXVldWUgPSBxdWV1ZS5wZWVrKCk7XG4gICAgICAgIGNvbnN0IGJ5dGVzVG9Db3B5ID0gTWF0aC5taW4odG90YWxCeXRlc1RvQ29weVJlbWFpbmluZywgaGVhZE9mUXVldWUuYnl0ZUxlbmd0aCk7XG4gICAgICAgIGNvbnN0IGRlc3RTdGFydCA9IHB1bGxJbnRvRGVzY3JpcHRvci5ieXRlT2Zmc2V0ICsgcHVsbEludG9EZXNjcmlwdG9yLmJ5dGVzRmlsbGVkO1xuICAgICAgICBDb3B5RGF0YUJsb2NrQnl0ZXMocHVsbEludG9EZXNjcmlwdG9yLmJ1ZmZlciwgZGVzdFN0YXJ0LCBoZWFkT2ZRdWV1ZS5idWZmZXIsIGhlYWRPZlF1ZXVlLmJ5dGVPZmZzZXQsIGJ5dGVzVG9Db3B5KTtcbiAgICAgICAgaWYgKGhlYWRPZlF1ZXVlLmJ5dGVMZW5ndGggPT09IGJ5dGVzVG9Db3B5KSB7XG4gICAgICAgICAgICBxdWV1ZS5zaGlmdCgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaGVhZE9mUXVldWUuYnl0ZU9mZnNldCArPSBieXRlc1RvQ29weTtcbiAgICAgICAgICAgIGhlYWRPZlF1ZXVlLmJ5dGVMZW5ndGggLT0gYnl0ZXNUb0NvcHk7XG4gICAgICAgIH1cbiAgICAgICAgY29udHJvbGxlci5fcXVldWVUb3RhbFNpemUgLT0gYnl0ZXNUb0NvcHk7XG4gICAgICAgIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJGaWxsSGVhZFB1bGxJbnRvRGVzY3JpcHRvcihjb250cm9sbGVyLCBieXRlc1RvQ29weSwgcHVsbEludG9EZXNjcmlwdG9yKTtcbiAgICAgICAgdG90YWxCeXRlc1RvQ29weVJlbWFpbmluZyAtPSBieXRlc1RvQ29weTtcbiAgICB9XG4gICAgcmV0dXJuIHJlYWR5O1xufVxuZnVuY3Rpb24gUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckZpbGxIZWFkUHVsbEludG9EZXNjcmlwdG9yKGNvbnRyb2xsZXIsIHNpemUsIHB1bGxJbnRvRGVzY3JpcHRvcikge1xuICAgIHB1bGxJbnRvRGVzY3JpcHRvci5ieXRlc0ZpbGxlZCArPSBzaXplO1xufVxuZnVuY3Rpb24gUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckhhbmRsZVF1ZXVlRHJhaW4oY29udHJvbGxlcikge1xuICAgIGlmIChjb250cm9sbGVyLl9xdWV1ZVRvdGFsU2l6ZSA9PT0gMCAmJiBjb250cm9sbGVyLl9jbG9zZVJlcXVlc3RlZCkge1xuICAgICAgICBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyQ2xlYXJBbGdvcml0aG1zKGNvbnRyb2xsZXIpO1xuICAgICAgICBSZWFkYWJsZVN0cmVhbUNsb3NlKGNvbnRyb2xsZXIuX2NvbnRyb2xsZWRSZWFkYWJsZUJ5dGVTdHJlYW0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckNhbGxQdWxsSWZOZWVkZWQoY29udHJvbGxlcik7XG4gICAgfVxufVxuZnVuY3Rpb24gUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckludmFsaWRhdGVCWU9CUmVxdWVzdChjb250cm9sbGVyKSB7XG4gICAgaWYgKGNvbnRyb2xsZXIuX2J5b2JSZXF1ZXN0ID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29udHJvbGxlci5fYnlvYlJlcXVlc3QuX2Fzc29jaWF0ZWRSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyID0gdW5kZWZpbmVkO1xuICAgIGNvbnRyb2xsZXIuX2J5b2JSZXF1ZXN0Ll92aWV3ID0gbnVsbDtcbiAgICBjb250cm9sbGVyLl9ieW9iUmVxdWVzdCA9IG51bGw7XG59XG5mdW5jdGlvbiBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyUHJvY2Vzc1B1bGxJbnRvRGVzY3JpcHRvcnNVc2luZ1F1ZXVlKGNvbnRyb2xsZXIpIHtcbiAgICB3aGlsZSAoY29udHJvbGxlci5fcGVuZGluZ1B1bGxJbnRvcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGlmIChjb250cm9sbGVyLl9xdWV1ZVRvdGFsU2l6ZSA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHB1bGxJbnRvRGVzY3JpcHRvciA9IGNvbnRyb2xsZXIuX3BlbmRpbmdQdWxsSW50b3MucGVlaygpO1xuICAgICAgICBpZiAoUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckZpbGxQdWxsSW50b0Rlc2NyaXB0b3JGcm9tUXVldWUoY29udHJvbGxlciwgcHVsbEludG9EZXNjcmlwdG9yKSkge1xuICAgICAgICAgICAgUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlclNoaWZ0UGVuZGluZ1B1bGxJbnRvKGNvbnRyb2xsZXIpO1xuICAgICAgICAgICAgUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckNvbW1pdFB1bGxJbnRvRGVzY3JpcHRvcihjb250cm9sbGVyLl9jb250cm9sbGVkUmVhZGFibGVCeXRlU3RyZWFtLCBwdWxsSW50b0Rlc2NyaXB0b3IpO1xuICAgICAgICB9XG4gICAgfVxufVxuZnVuY3Rpb24gUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlclB1bGxJbnRvKGNvbnRyb2xsZXIsIHZpZXcsIHJlYWRJbnRvUmVxdWVzdCkge1xuICAgIGNvbnN0IHN0cmVhbSA9IGNvbnRyb2xsZXIuX2NvbnRyb2xsZWRSZWFkYWJsZUJ5dGVTdHJlYW07XG4gICAgbGV0IGVsZW1lbnRTaXplID0gMTtcbiAgICBpZiAodmlldy5jb25zdHJ1Y3RvciAhPT0gRGF0YVZpZXcpIHtcbiAgICAgICAgZWxlbWVudFNpemUgPSB2aWV3LmNvbnN0cnVjdG9yLkJZVEVTX1BFUl9FTEVNRU5UO1xuICAgIH1cbiAgICBjb25zdCBjdG9yID0gdmlldy5jb25zdHJ1Y3RvcjtcbiAgICAvLyB0cnkge1xuICAgIGNvbnN0IGJ1ZmZlciA9IFRyYW5zZmVyQXJyYXlCdWZmZXIodmlldy5idWZmZXIpO1xuICAgIC8vIH0gY2F0Y2ggKGUpIHtcbiAgICAvLyAgIHJlYWRJbnRvUmVxdWVzdC5fZXJyb3JTdGVwcyhlKTtcbiAgICAvLyAgIHJldHVybjtcbiAgICAvLyB9XG4gICAgY29uc3QgcHVsbEludG9EZXNjcmlwdG9yID0ge1xuICAgICAgICBidWZmZXIsXG4gICAgICAgIGJ1ZmZlckJ5dGVMZW5ndGg6IGJ1ZmZlci5ieXRlTGVuZ3RoLFxuICAgICAgICBieXRlT2Zmc2V0OiB2aWV3LmJ5dGVPZmZzZXQsXG4gICAgICAgIGJ5dGVMZW5ndGg6IHZpZXcuYnl0ZUxlbmd0aCxcbiAgICAgICAgYnl0ZXNGaWxsZWQ6IDAsXG4gICAgICAgIGVsZW1lbnRTaXplLFxuICAgICAgICB2aWV3Q29uc3RydWN0b3I6IGN0b3IsXG4gICAgICAgIHJlYWRlclR5cGU6ICdieW9iJ1xuICAgIH07XG4gICAgaWYgKGNvbnRyb2xsZXIuX3BlbmRpbmdQdWxsSW50b3MubGVuZ3RoID4gMCkge1xuICAgICAgICBjb250cm9sbGVyLl9wZW5kaW5nUHVsbEludG9zLnB1c2gocHVsbEludG9EZXNjcmlwdG9yKTtcbiAgICAgICAgLy8gTm8gUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckNhbGxQdWxsSWZOZWVkZWQoKSBjYWxsIHNpbmNlOlxuICAgICAgICAvLyAtIE5vIGNoYW5nZSBoYXBwZW5zIG9uIGRlc2lyZWRTaXplXG4gICAgICAgIC8vIC0gVGhlIHNvdXJjZSBoYXMgYWxyZWFkeSBiZWVuIG5vdGlmaWVkIG9mIHRoYXQgdGhlcmUncyBhdCBsZWFzdCAxIHBlbmRpbmcgcmVhZCh2aWV3KVxuICAgICAgICBSZWFkYWJsZVN0cmVhbUFkZFJlYWRJbnRvUmVxdWVzdChzdHJlYW0sIHJlYWRJbnRvUmVxdWVzdCk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHN0cmVhbS5fc3RhdGUgPT09ICdjbG9zZWQnKSB7XG4gICAgICAgIGNvbnN0IGVtcHR5VmlldyA9IG5ldyBjdG9yKHB1bGxJbnRvRGVzY3JpcHRvci5idWZmZXIsIHB1bGxJbnRvRGVzY3JpcHRvci5ieXRlT2Zmc2V0LCAwKTtcbiAgICAgICAgcmVhZEludG9SZXF1ZXN0Ll9jbG9zZVN0ZXBzKGVtcHR5Vmlldyk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGNvbnRyb2xsZXIuX3F1ZXVlVG90YWxTaXplID4gMCkge1xuICAgICAgICBpZiAoUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckZpbGxQdWxsSW50b0Rlc2NyaXB0b3JGcm9tUXVldWUoY29udHJvbGxlciwgcHVsbEludG9EZXNjcmlwdG9yKSkge1xuICAgICAgICAgICAgY29uc3QgZmlsbGVkVmlldyA9IFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJDb252ZXJ0UHVsbEludG9EZXNjcmlwdG9yKHB1bGxJbnRvRGVzY3JpcHRvcik7XG4gICAgICAgICAgICBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVySGFuZGxlUXVldWVEcmFpbihjb250cm9sbGVyKTtcbiAgICAgICAgICAgIHJlYWRJbnRvUmVxdWVzdC5fY2h1bmtTdGVwcyhmaWxsZWRWaWV3KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29udHJvbGxlci5fY2xvc2VSZXF1ZXN0ZWQpIHtcbiAgICAgICAgICAgIGNvbnN0IGUgPSBuZXcgVHlwZUVycm9yKCdJbnN1ZmZpY2llbnQgYnl0ZXMgdG8gZmlsbCBlbGVtZW50cyBpbiB0aGUgZ2l2ZW4gYnVmZmVyJyk7XG4gICAgICAgICAgICBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyRXJyb3IoY29udHJvbGxlciwgZSk7XG4gICAgICAgICAgICByZWFkSW50b1JlcXVlc3QuX2Vycm9yU3RlcHMoZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICB9XG4gICAgY29udHJvbGxlci5fcGVuZGluZ1B1bGxJbnRvcy5wdXNoKHB1bGxJbnRvRGVzY3JpcHRvcik7XG4gICAgUmVhZGFibGVTdHJlYW1BZGRSZWFkSW50b1JlcXVlc3Qoc3RyZWFtLCByZWFkSW50b1JlcXVlc3QpO1xuICAgIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJDYWxsUHVsbElmTmVlZGVkKGNvbnRyb2xsZXIpO1xufVxuZnVuY3Rpb24gUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlclJlc3BvbmRJbkNsb3NlZFN0YXRlKGNvbnRyb2xsZXIsIGZpcnN0RGVzY3JpcHRvcikge1xuICAgIGNvbnN0IHN0cmVhbSA9IGNvbnRyb2xsZXIuX2NvbnRyb2xsZWRSZWFkYWJsZUJ5dGVTdHJlYW07XG4gICAgaWYgKFJlYWRhYmxlU3RyZWFtSGFzQllPQlJlYWRlcihzdHJlYW0pKSB7XG4gICAgICAgIHdoaWxlIChSZWFkYWJsZVN0cmVhbUdldE51bVJlYWRJbnRvUmVxdWVzdHMoc3RyZWFtKSA+IDApIHtcbiAgICAgICAgICAgIGNvbnN0IHB1bGxJbnRvRGVzY3JpcHRvciA9IFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJTaGlmdFBlbmRpbmdQdWxsSW50byhjb250cm9sbGVyKTtcbiAgICAgICAgICAgIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJDb21taXRQdWxsSW50b0Rlc2NyaXB0b3Ioc3RyZWFtLCBwdWxsSW50b0Rlc2NyaXB0b3IpO1xuICAgICAgICB9XG4gICAgfVxufVxuZnVuY3Rpb24gUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlclJlc3BvbmRJblJlYWRhYmxlU3RhdGUoY29udHJvbGxlciwgYnl0ZXNXcml0dGVuLCBwdWxsSW50b0Rlc2NyaXB0b3IpIHtcbiAgICBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyRmlsbEhlYWRQdWxsSW50b0Rlc2NyaXB0b3IoY29udHJvbGxlciwgYnl0ZXNXcml0dGVuLCBwdWxsSW50b0Rlc2NyaXB0b3IpO1xuICAgIGlmIChwdWxsSW50b0Rlc2NyaXB0b3IuYnl0ZXNGaWxsZWQgPCBwdWxsSW50b0Rlc2NyaXB0b3IuZWxlbWVudFNpemUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyU2hpZnRQZW5kaW5nUHVsbEludG8oY29udHJvbGxlcik7XG4gICAgY29uc3QgcmVtYWluZGVyU2l6ZSA9IHB1bGxJbnRvRGVzY3JpcHRvci5ieXRlc0ZpbGxlZCAlIHB1bGxJbnRvRGVzY3JpcHRvci5lbGVtZW50U2l6ZTtcbiAgICBpZiAocmVtYWluZGVyU2l6ZSA+IDApIHtcbiAgICAgICAgY29uc3QgZW5kID0gcHVsbEludG9EZXNjcmlwdG9yLmJ5dGVPZmZzZXQgKyBwdWxsSW50b0Rlc2NyaXB0b3IuYnl0ZXNGaWxsZWQ7XG4gICAgICAgIGNvbnN0IHJlbWFpbmRlciA9IEFycmF5QnVmZmVyU2xpY2UocHVsbEludG9EZXNjcmlwdG9yLmJ1ZmZlciwgZW5kIC0gcmVtYWluZGVyU2l6ZSwgZW5kKTtcbiAgICAgICAgUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckVucXVldWVDaHVua1RvUXVldWUoY29udHJvbGxlciwgcmVtYWluZGVyLCAwLCByZW1haW5kZXIuYnl0ZUxlbmd0aCk7XG4gICAgfVxuICAgIHB1bGxJbnRvRGVzY3JpcHRvci5ieXRlc0ZpbGxlZCAtPSByZW1haW5kZXJTaXplO1xuICAgIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJDb21taXRQdWxsSW50b0Rlc2NyaXB0b3IoY29udHJvbGxlci5fY29udHJvbGxlZFJlYWRhYmxlQnl0ZVN0cmVhbSwgcHVsbEludG9EZXNjcmlwdG9yKTtcbiAgICBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyUHJvY2Vzc1B1bGxJbnRvRGVzY3JpcHRvcnNVc2luZ1F1ZXVlKGNvbnRyb2xsZXIpO1xufVxuZnVuY3Rpb24gUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlclJlc3BvbmRJbnRlcm5hbChjb250cm9sbGVyLCBieXRlc1dyaXR0ZW4pIHtcbiAgICBjb25zdCBmaXJzdERlc2NyaXB0b3IgPSBjb250cm9sbGVyLl9wZW5kaW5nUHVsbEludG9zLnBlZWsoKTtcbiAgICBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVySW52YWxpZGF0ZUJZT0JSZXF1ZXN0KGNvbnRyb2xsZXIpO1xuICAgIGNvbnN0IHN0YXRlID0gY29udHJvbGxlci5fY29udHJvbGxlZFJlYWRhYmxlQnl0ZVN0cmVhbS5fc3RhdGU7XG4gICAgaWYgKHN0YXRlID09PSAnY2xvc2VkJykge1xuICAgICAgICBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyUmVzcG9uZEluQ2xvc2VkU3RhdGUoY29udHJvbGxlcik7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyUmVzcG9uZEluUmVhZGFibGVTdGF0ZShjb250cm9sbGVyLCBieXRlc1dyaXR0ZW4sIGZpcnN0RGVzY3JpcHRvcik7XG4gICAgfVxuICAgIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJDYWxsUHVsbElmTmVlZGVkKGNvbnRyb2xsZXIpO1xufVxuZnVuY3Rpb24gUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlclNoaWZ0UGVuZGluZ1B1bGxJbnRvKGNvbnRyb2xsZXIpIHtcbiAgICBjb25zdCBkZXNjcmlwdG9yID0gY29udHJvbGxlci5fcGVuZGluZ1B1bGxJbnRvcy5zaGlmdCgpO1xuICAgIHJldHVybiBkZXNjcmlwdG9yO1xufVxuZnVuY3Rpb24gUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlclNob3VsZENhbGxQdWxsKGNvbnRyb2xsZXIpIHtcbiAgICBjb25zdCBzdHJlYW0gPSBjb250cm9sbGVyLl9jb250cm9sbGVkUmVhZGFibGVCeXRlU3RyZWFtO1xuICAgIGlmIChzdHJlYW0uX3N0YXRlICE9PSAncmVhZGFibGUnKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKGNvbnRyb2xsZXIuX2Nsb3NlUmVxdWVzdGVkKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKCFjb250cm9sbGVyLl9zdGFydGVkKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKFJlYWRhYmxlU3RyZWFtSGFzRGVmYXVsdFJlYWRlcihzdHJlYW0pICYmIFJlYWRhYmxlU3RyZWFtR2V0TnVtUmVhZFJlcXVlc3RzKHN0cmVhbSkgPiAwKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBpZiAoUmVhZGFibGVTdHJlYW1IYXNCWU9CUmVhZGVyKHN0cmVhbSkgJiYgUmVhZGFibGVTdHJlYW1HZXROdW1SZWFkSW50b1JlcXVlc3RzKHN0cmVhbSkgPiAwKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBjb25zdCBkZXNpcmVkU2l6ZSA9IFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJHZXREZXNpcmVkU2l6ZShjb250cm9sbGVyKTtcbiAgICBpZiAoZGVzaXJlZFNpemUgPiAwKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59XG5mdW5jdGlvbiBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyQ2xlYXJBbGdvcml0aG1zKGNvbnRyb2xsZXIpIHtcbiAgICBjb250cm9sbGVyLl9wdWxsQWxnb3JpdGhtID0gdW5kZWZpbmVkO1xuICAgIGNvbnRyb2xsZXIuX2NhbmNlbEFsZ29yaXRobSA9IHVuZGVmaW5lZDtcbn1cbi8vIEEgY2xpZW50IG9mIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXIgbWF5IHVzZSB0aGVzZSBmdW5jdGlvbnMgZGlyZWN0bHkgdG8gYnlwYXNzIHN0YXRlIGNoZWNrLlxuZnVuY3Rpb24gUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckNsb3NlKGNvbnRyb2xsZXIpIHtcbiAgICBjb25zdCBzdHJlYW0gPSBjb250cm9sbGVyLl9jb250cm9sbGVkUmVhZGFibGVCeXRlU3RyZWFtO1xuICAgIGlmIChjb250cm9sbGVyLl9jbG9zZVJlcXVlc3RlZCB8fCBzdHJlYW0uX3N0YXRlICE9PSAncmVhZGFibGUnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGNvbnRyb2xsZXIuX3F1ZXVlVG90YWxTaXplID4gMCkge1xuICAgICAgICBjb250cm9sbGVyLl9jbG9zZVJlcXVlc3RlZCA9IHRydWU7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGNvbnRyb2xsZXIuX3BlbmRpbmdQdWxsSW50b3MubGVuZ3RoID4gMCkge1xuICAgICAgICBjb25zdCBmaXJzdFBlbmRpbmdQdWxsSW50byA9IGNvbnRyb2xsZXIuX3BlbmRpbmdQdWxsSW50b3MucGVlaygpO1xuICAgICAgICBpZiAoZmlyc3RQZW5kaW5nUHVsbEludG8uYnl0ZXNGaWxsZWQgPiAwKSB7XG4gICAgICAgICAgICBjb25zdCBlID0gbmV3IFR5cGVFcnJvcignSW5zdWZmaWNpZW50IGJ5dGVzIHRvIGZpbGwgZWxlbWVudHMgaW4gdGhlIGdpdmVuIGJ1ZmZlcicpO1xuICAgICAgICAgICAgUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckVycm9yKGNvbnRyb2xsZXIsIGUpO1xuICAgICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyQ2xlYXJBbGdvcml0aG1zKGNvbnRyb2xsZXIpO1xuICAgIFJlYWRhYmxlU3RyZWFtQ2xvc2Uoc3RyZWFtKTtcbn1cbmZ1bmN0aW9uIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJFbnF1ZXVlKGNvbnRyb2xsZXIsIGNodW5rKSB7XG4gICAgY29uc3Qgc3RyZWFtID0gY29udHJvbGxlci5fY29udHJvbGxlZFJlYWRhYmxlQnl0ZVN0cmVhbTtcbiAgICBpZiAoY29udHJvbGxlci5fY2xvc2VSZXF1ZXN0ZWQgfHwgc3RyZWFtLl9zdGF0ZSAhPT0gJ3JlYWRhYmxlJykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGJ1ZmZlciA9IGNodW5rLmJ1ZmZlcjtcbiAgICBjb25zdCBieXRlT2Zmc2V0ID0gY2h1bmsuYnl0ZU9mZnNldDtcbiAgICBjb25zdCBieXRlTGVuZ3RoID0gY2h1bmsuYnl0ZUxlbmd0aDtcbiAgICBjb25zdCB0cmFuc2ZlcnJlZEJ1ZmZlciA9IFRyYW5zZmVyQXJyYXlCdWZmZXIoYnVmZmVyKTtcbiAgICBpZiAoY29udHJvbGxlci5fcGVuZGluZ1B1bGxJbnRvcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNvbnN0IGZpcnN0UGVuZGluZ1B1bGxJbnRvID0gY29udHJvbGxlci5fcGVuZGluZ1B1bGxJbnRvcy5wZWVrKCk7XG4gICAgICAgIGlmIChJc0RldGFjaGVkQnVmZmVyKGZpcnN0UGVuZGluZ1B1bGxJbnRvLmJ1ZmZlcikpIDtcbiAgICAgICAgZmlyc3RQZW5kaW5nUHVsbEludG8uYnVmZmVyID0gVHJhbnNmZXJBcnJheUJ1ZmZlcihmaXJzdFBlbmRpbmdQdWxsSW50by5idWZmZXIpO1xuICAgIH1cbiAgICBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVySW52YWxpZGF0ZUJZT0JSZXF1ZXN0KGNvbnRyb2xsZXIpO1xuICAgIGlmIChSZWFkYWJsZVN0cmVhbUhhc0RlZmF1bHRSZWFkZXIoc3RyZWFtKSkge1xuICAgICAgICBpZiAoUmVhZGFibGVTdHJlYW1HZXROdW1SZWFkUmVxdWVzdHMoc3RyZWFtKSA9PT0gMCkge1xuICAgICAgICAgICAgUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckVucXVldWVDaHVua1RvUXVldWUoY29udHJvbGxlciwgdHJhbnNmZXJyZWRCdWZmZXIsIGJ5dGVPZmZzZXQsIGJ5dGVMZW5ndGgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKGNvbnRyb2xsZXIuX3BlbmRpbmdQdWxsSW50b3MubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJTaGlmdFBlbmRpbmdQdWxsSW50byhjb250cm9sbGVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHRyYW5zZmVycmVkVmlldyA9IG5ldyBVaW50OEFycmF5KHRyYW5zZmVycmVkQnVmZmVyLCBieXRlT2Zmc2V0LCBieXRlTGVuZ3RoKTtcbiAgICAgICAgICAgIFJlYWRhYmxlU3RyZWFtRnVsZmlsbFJlYWRSZXF1ZXN0KHN0cmVhbSwgdHJhbnNmZXJyZWRWaWV3LCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoUmVhZGFibGVTdHJlYW1IYXNCWU9CUmVhZGVyKHN0cmVhbSkpIHtcbiAgICAgICAgLy8gVE9ETzogSWRlYWxseSBpbiB0aGlzIGJyYW5jaCBkZXRhY2hpbmcgc2hvdWxkIGhhcHBlbiBvbmx5IGlmIHRoZSBidWZmZXIgaXMgbm90IGNvbnN1bWVkIGZ1bGx5LlxuICAgICAgICBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyRW5xdWV1ZUNodW5rVG9RdWV1ZShjb250cm9sbGVyLCB0cmFuc2ZlcnJlZEJ1ZmZlciwgYnl0ZU9mZnNldCwgYnl0ZUxlbmd0aCk7XG4gICAgICAgIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJQcm9jZXNzUHVsbEludG9EZXNjcmlwdG9yc1VzaW5nUXVldWUoY29udHJvbGxlcik7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyRW5xdWV1ZUNodW5rVG9RdWV1ZShjb250cm9sbGVyLCB0cmFuc2ZlcnJlZEJ1ZmZlciwgYnl0ZU9mZnNldCwgYnl0ZUxlbmd0aCk7XG4gICAgfVxuICAgIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJDYWxsUHVsbElmTmVlZGVkKGNvbnRyb2xsZXIpO1xufVxuZnVuY3Rpb24gUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckVycm9yKGNvbnRyb2xsZXIsIGUpIHtcbiAgICBjb25zdCBzdHJlYW0gPSBjb250cm9sbGVyLl9jb250cm9sbGVkUmVhZGFibGVCeXRlU3RyZWFtO1xuICAgIGlmIChzdHJlYW0uX3N0YXRlICE9PSAncmVhZGFibGUnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckNsZWFyUGVuZGluZ1B1bGxJbnRvcyhjb250cm9sbGVyKTtcbiAgICBSZXNldFF1ZXVlKGNvbnRyb2xsZXIpO1xuICAgIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJDbGVhckFsZ29yaXRobXMoY29udHJvbGxlcik7XG4gICAgUmVhZGFibGVTdHJlYW1FcnJvcihzdHJlYW0sIGUpO1xufVxuZnVuY3Rpb24gUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckdldEJZT0JSZXF1ZXN0KGNvbnRyb2xsZXIpIHtcbiAgICBpZiAoY29udHJvbGxlci5fYnlvYlJlcXVlc3QgPT09IG51bGwgJiYgY29udHJvbGxlci5fcGVuZGluZ1B1bGxJbnRvcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNvbnN0IGZpcnN0RGVzY3JpcHRvciA9IGNvbnRyb2xsZXIuX3BlbmRpbmdQdWxsSW50b3MucGVlaygpO1xuICAgICAgICBjb25zdCB2aWV3ID0gbmV3IFVpbnQ4QXJyYXkoZmlyc3REZXNjcmlwdG9yLmJ1ZmZlciwgZmlyc3REZXNjcmlwdG9yLmJ5dGVPZmZzZXQgKyBmaXJzdERlc2NyaXB0b3IuYnl0ZXNGaWxsZWQsIGZpcnN0RGVzY3JpcHRvci5ieXRlTGVuZ3RoIC0gZmlyc3REZXNjcmlwdG9yLmJ5dGVzRmlsbGVkKTtcbiAgICAgICAgY29uc3QgYnlvYlJlcXVlc3QgPSBPYmplY3QuY3JlYXRlKFJlYWRhYmxlU3RyZWFtQllPQlJlcXVlc3QucHJvdG90eXBlKTtcbiAgICAgICAgU2V0VXBSZWFkYWJsZVN0cmVhbUJZT0JSZXF1ZXN0KGJ5b2JSZXF1ZXN0LCBjb250cm9sbGVyLCB2aWV3KTtcbiAgICAgICAgY29udHJvbGxlci5fYnlvYlJlcXVlc3QgPSBieW9iUmVxdWVzdDtcbiAgICB9XG4gICAgcmV0dXJuIGNvbnRyb2xsZXIuX2J5b2JSZXF1ZXN0O1xufVxuZnVuY3Rpb24gUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckdldERlc2lyZWRTaXplKGNvbnRyb2xsZXIpIHtcbiAgICBjb25zdCBzdGF0ZSA9IGNvbnRyb2xsZXIuX2NvbnRyb2xsZWRSZWFkYWJsZUJ5dGVTdHJlYW0uX3N0YXRlO1xuICAgIGlmIChzdGF0ZSA9PT0gJ2Vycm9yZWQnKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBpZiAoc3RhdGUgPT09ICdjbG9zZWQnKSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICByZXR1cm4gY29udHJvbGxlci5fc3RyYXRlZ3lIV00gLSBjb250cm9sbGVyLl9xdWV1ZVRvdGFsU2l6ZTtcbn1cbmZ1bmN0aW9uIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJSZXNwb25kKGNvbnRyb2xsZXIsIGJ5dGVzV3JpdHRlbikge1xuICAgIGNvbnN0IGZpcnN0RGVzY3JpcHRvciA9IGNvbnRyb2xsZXIuX3BlbmRpbmdQdWxsSW50b3MucGVlaygpO1xuICAgIGNvbnN0IHN0YXRlID0gY29udHJvbGxlci5fY29udHJvbGxlZFJlYWRhYmxlQnl0ZVN0cmVhbS5fc3RhdGU7XG4gICAgaWYgKHN0YXRlID09PSAnY2xvc2VkJykge1xuICAgICAgICBpZiAoYnl0ZXNXcml0dGVuICE9PSAwKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdieXRlc1dyaXR0ZW4gbXVzdCBiZSAwIHdoZW4gY2FsbGluZyByZXNwb25kKCkgb24gYSBjbG9zZWQgc3RyZWFtJyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGlmIChieXRlc1dyaXR0ZW4gPT09IDApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2J5dGVzV3JpdHRlbiBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAwIHdoZW4gY2FsbGluZyByZXNwb25kKCkgb24gYSByZWFkYWJsZSBzdHJlYW0nKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZmlyc3REZXNjcmlwdG9yLmJ5dGVzRmlsbGVkICsgYnl0ZXNXcml0dGVuID4gZmlyc3REZXNjcmlwdG9yLmJ5dGVMZW5ndGgpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdieXRlc1dyaXR0ZW4gb3V0IG9mIHJhbmdlJyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZmlyc3REZXNjcmlwdG9yLmJ1ZmZlciA9IFRyYW5zZmVyQXJyYXlCdWZmZXIoZmlyc3REZXNjcmlwdG9yLmJ1ZmZlcik7XG4gICAgUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlclJlc3BvbmRJbnRlcm5hbChjb250cm9sbGVyLCBieXRlc1dyaXR0ZW4pO1xufVxuZnVuY3Rpb24gUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlclJlc3BvbmRXaXRoTmV3Vmlldyhjb250cm9sbGVyLCB2aWV3KSB7XG4gICAgY29uc3QgZmlyc3REZXNjcmlwdG9yID0gY29udHJvbGxlci5fcGVuZGluZ1B1bGxJbnRvcy5wZWVrKCk7XG4gICAgY29uc3Qgc3RhdGUgPSBjb250cm9sbGVyLl9jb250cm9sbGVkUmVhZGFibGVCeXRlU3RyZWFtLl9zdGF0ZTtcbiAgICBpZiAoc3RhdGUgPT09ICdjbG9zZWQnKSB7XG4gICAgICAgIGlmICh2aWV3LmJ5dGVMZW5ndGggIT09IDApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSB2aWV3XFwncyBsZW5ndGggbXVzdCBiZSAwIHdoZW4gY2FsbGluZyByZXNwb25kV2l0aE5ld1ZpZXcoKSBvbiBhIGNsb3NlZCBzdHJlYW0nKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgaWYgKHZpZXcuYnl0ZUxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIHZpZXdcXCdzIGxlbmd0aCBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAwIHdoZW4gY2FsbGluZyByZXNwb25kV2l0aE5ld1ZpZXcoKSBvbiBhIHJlYWRhYmxlIHN0cmVhbScpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChmaXJzdERlc2NyaXB0b3IuYnl0ZU9mZnNldCArIGZpcnN0RGVzY3JpcHRvci5ieXRlc0ZpbGxlZCAhPT0gdmlldy5ieXRlT2Zmc2V0KSB7XG4gICAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdUaGUgcmVnaW9uIHNwZWNpZmllZCBieSB2aWV3IGRvZXMgbm90IG1hdGNoIGJ5b2JSZXF1ZXN0Jyk7XG4gICAgfVxuICAgIGlmIChmaXJzdERlc2NyaXB0b3IuYnVmZmVyQnl0ZUxlbmd0aCAhPT0gdmlldy5idWZmZXIuYnl0ZUxlbmd0aCkge1xuICAgICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignVGhlIGJ1ZmZlciBvZiB2aWV3IGhhcyBkaWZmZXJlbnQgY2FwYWNpdHkgdGhhbiBieW9iUmVxdWVzdCcpO1xuICAgIH1cbiAgICBpZiAoZmlyc3REZXNjcmlwdG9yLmJ5dGVzRmlsbGVkICsgdmlldy5ieXRlTGVuZ3RoID4gZmlyc3REZXNjcmlwdG9yLmJ5dGVMZW5ndGgpIHtcbiAgICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1RoZSByZWdpb24gc3BlY2lmaWVkIGJ5IHZpZXcgaXMgbGFyZ2VyIHRoYW4gYnlvYlJlcXVlc3QnKTtcbiAgICB9XG4gICAgY29uc3Qgdmlld0J5dGVMZW5ndGggPSB2aWV3LmJ5dGVMZW5ndGg7XG4gICAgZmlyc3REZXNjcmlwdG9yLmJ1ZmZlciA9IFRyYW5zZmVyQXJyYXlCdWZmZXIodmlldy5idWZmZXIpO1xuICAgIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJSZXNwb25kSW50ZXJuYWwoY29udHJvbGxlciwgdmlld0J5dGVMZW5ndGgpO1xufVxuZnVuY3Rpb24gU2V0VXBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyKHN0cmVhbSwgY29udHJvbGxlciwgc3RhcnRBbGdvcml0aG0sIHB1bGxBbGdvcml0aG0sIGNhbmNlbEFsZ29yaXRobSwgaGlnaFdhdGVyTWFyaywgYXV0b0FsbG9jYXRlQ2h1bmtTaXplKSB7XG4gICAgY29udHJvbGxlci5fY29udHJvbGxlZFJlYWRhYmxlQnl0ZVN0cmVhbSA9IHN0cmVhbTtcbiAgICBjb250cm9sbGVyLl9wdWxsQWdhaW4gPSBmYWxzZTtcbiAgICBjb250cm9sbGVyLl9wdWxsaW5nID0gZmFsc2U7XG4gICAgY29udHJvbGxlci5fYnlvYlJlcXVlc3QgPSBudWxsO1xuICAgIC8vIE5lZWQgdG8gc2V0IHRoZSBzbG90cyBzbyB0aGF0IHRoZSBhc3NlcnQgZG9lc24ndCBmaXJlLiBJbiB0aGUgc3BlYyB0aGUgc2xvdHMgYWxyZWFkeSBleGlzdCBpbXBsaWNpdGx5LlxuICAgIGNvbnRyb2xsZXIuX3F1ZXVlID0gY29udHJvbGxlci5fcXVldWVUb3RhbFNpemUgPSB1bmRlZmluZWQ7XG4gICAgUmVzZXRRdWV1ZShjb250cm9sbGVyKTtcbiAgICBjb250cm9sbGVyLl9jbG9zZVJlcXVlc3RlZCA9IGZhbHNlO1xuICAgIGNvbnRyb2xsZXIuX3N0YXJ0ZWQgPSBmYWxzZTtcbiAgICBjb250cm9sbGVyLl9zdHJhdGVneUhXTSA9IGhpZ2hXYXRlck1hcms7XG4gICAgY29udHJvbGxlci5fcHVsbEFsZ29yaXRobSA9IHB1bGxBbGdvcml0aG07XG4gICAgY29udHJvbGxlci5fY2FuY2VsQWxnb3JpdGhtID0gY2FuY2VsQWxnb3JpdGhtO1xuICAgIGNvbnRyb2xsZXIuX2F1dG9BbGxvY2F0ZUNodW5rU2l6ZSA9IGF1dG9BbGxvY2F0ZUNodW5rU2l6ZTtcbiAgICBjb250cm9sbGVyLl9wZW5kaW5nUHVsbEludG9zID0gbmV3IFNpbXBsZVF1ZXVlKCk7XG4gICAgc3RyZWFtLl9yZWFkYWJsZVN0cmVhbUNvbnRyb2xsZXIgPSBjb250cm9sbGVyO1xuICAgIGNvbnN0IHN0YXJ0UmVzdWx0ID0gc3RhcnRBbGdvcml0aG0oKTtcbiAgICB1cG9uUHJvbWlzZShwcm9taXNlUmVzb2x2ZWRXaXRoKHN0YXJ0UmVzdWx0KSwgKCkgPT4ge1xuICAgICAgICBjb250cm9sbGVyLl9zdGFydGVkID0gdHJ1ZTtcbiAgICAgICAgUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckNhbGxQdWxsSWZOZWVkZWQoY29udHJvbGxlcik7XG4gICAgfSwgciA9PiB7XG4gICAgICAgIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJFcnJvcihjb250cm9sbGVyLCByKTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIFNldFVwUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckZyb21VbmRlcmx5aW5nU291cmNlKHN0cmVhbSwgdW5kZXJseWluZ0J5dGVTb3VyY2UsIGhpZ2hXYXRlck1hcmspIHtcbiAgICBjb25zdCBjb250cm9sbGVyID0gT2JqZWN0LmNyZWF0ZShSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyLnByb3RvdHlwZSk7XG4gICAgbGV0IHN0YXJ0QWxnb3JpdGhtID0gKCkgPT4gdW5kZWZpbmVkO1xuICAgIGxldCBwdWxsQWxnb3JpdGhtID0gKCkgPT4gcHJvbWlzZVJlc29sdmVkV2l0aCh1bmRlZmluZWQpO1xuICAgIGxldCBjYW5jZWxBbGdvcml0aG0gPSAoKSA9PiBwcm9taXNlUmVzb2x2ZWRXaXRoKHVuZGVmaW5lZCk7XG4gICAgaWYgKHVuZGVybHlpbmdCeXRlU291cmNlLnN0YXJ0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgc3RhcnRBbGdvcml0aG0gPSAoKSA9PiB1bmRlcmx5aW5nQnl0ZVNvdXJjZS5zdGFydChjb250cm9sbGVyKTtcbiAgICB9XG4gICAgaWYgKHVuZGVybHlpbmdCeXRlU291cmNlLnB1bGwgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBwdWxsQWxnb3JpdGhtID0gKCkgPT4gdW5kZXJseWluZ0J5dGVTb3VyY2UucHVsbChjb250cm9sbGVyKTtcbiAgICB9XG4gICAgaWYgKHVuZGVybHlpbmdCeXRlU291cmNlLmNhbmNlbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNhbmNlbEFsZ29yaXRobSA9IHJlYXNvbiA9PiB1bmRlcmx5aW5nQnl0ZVNvdXJjZS5jYW5jZWwocmVhc29uKTtcbiAgICB9XG4gICAgY29uc3QgYXV0b0FsbG9jYXRlQ2h1bmtTaXplID0gdW5kZXJseWluZ0J5dGVTb3VyY2UuYXV0b0FsbG9jYXRlQ2h1bmtTaXplO1xuICAgIGlmIChhdXRvQWxsb2NhdGVDaHVua1NpemUgPT09IDApIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignYXV0b0FsbG9jYXRlQ2h1bmtTaXplIG11c3QgYmUgZ3JlYXRlciB0aGFuIDAnKTtcbiAgICB9XG4gICAgU2V0VXBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyKHN0cmVhbSwgY29udHJvbGxlciwgc3RhcnRBbGdvcml0aG0sIHB1bGxBbGdvcml0aG0sIGNhbmNlbEFsZ29yaXRobSwgaGlnaFdhdGVyTWFyaywgYXV0b0FsbG9jYXRlQ2h1bmtTaXplKTtcbn1cbmZ1bmN0aW9uIFNldFVwUmVhZGFibGVTdHJlYW1CWU9CUmVxdWVzdChyZXF1ZXN0LCBjb250cm9sbGVyLCB2aWV3KSB7XG4gICAgcmVxdWVzdC5fYXNzb2NpYXRlZFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXIgPSBjb250cm9sbGVyO1xuICAgIHJlcXVlc3QuX3ZpZXcgPSB2aWV3O1xufVxuLy8gSGVscGVyIGZ1bmN0aW9ucyBmb3IgdGhlIFJlYWRhYmxlU3RyZWFtQllPQlJlcXVlc3QuXG5mdW5jdGlvbiBieW9iUmVxdWVzdEJyYW5kQ2hlY2tFeGNlcHRpb24obmFtZSkge1xuICAgIHJldHVybiBuZXcgVHlwZUVycm9yKGBSZWFkYWJsZVN0cmVhbUJZT0JSZXF1ZXN0LnByb3RvdHlwZS4ke25hbWV9IGNhbiBvbmx5IGJlIHVzZWQgb24gYSBSZWFkYWJsZVN0cmVhbUJZT0JSZXF1ZXN0YCk7XG59XG4vLyBIZWxwZXIgZnVuY3Rpb25zIGZvciB0aGUgUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlci5cbmZ1bmN0aW9uIGJ5dGVTdHJlYW1Db250cm9sbGVyQnJhbmRDaGVja0V4Y2VwdGlvbihuYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBUeXBlRXJyb3IoYFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXIucHJvdG90eXBlLiR7bmFtZX0gY2FuIG9ubHkgYmUgdXNlZCBvbiBhIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJgKTtcbn1cblxuLy8gQWJzdHJhY3Qgb3BlcmF0aW9ucyBmb3IgdGhlIFJlYWRhYmxlU3RyZWFtLlxuZnVuY3Rpb24gQWNxdWlyZVJlYWRhYmxlU3RyZWFtQllPQlJlYWRlcihzdHJlYW0pIHtcbiAgICByZXR1cm4gbmV3IFJlYWRhYmxlU3RyZWFtQllPQlJlYWRlcihzdHJlYW0pO1xufVxuLy8gUmVhZGFibGVTdHJlYW0gQVBJIGV4cG9zZWQgZm9yIGNvbnRyb2xsZXJzLlxuZnVuY3Rpb24gUmVhZGFibGVTdHJlYW1BZGRSZWFkSW50b1JlcXVlc3Qoc3RyZWFtLCByZWFkSW50b1JlcXVlc3QpIHtcbiAgICBzdHJlYW0uX3JlYWRlci5fcmVhZEludG9SZXF1ZXN0cy5wdXNoKHJlYWRJbnRvUmVxdWVzdCk7XG59XG5mdW5jdGlvbiBSZWFkYWJsZVN0cmVhbUZ1bGZpbGxSZWFkSW50b1JlcXVlc3Qoc3RyZWFtLCBjaHVuaywgZG9uZSkge1xuICAgIGNvbnN0IHJlYWRlciA9IHN0cmVhbS5fcmVhZGVyO1xuICAgIGNvbnN0IHJlYWRJbnRvUmVxdWVzdCA9IHJlYWRlci5fcmVhZEludG9SZXF1ZXN0cy5zaGlmdCgpO1xuICAgIGlmIChkb25lKSB7XG4gICAgICAgIHJlYWRJbnRvUmVxdWVzdC5fY2xvc2VTdGVwcyhjaHVuayk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZWFkSW50b1JlcXVlc3QuX2NodW5rU3RlcHMoY2h1bmspO1xuICAgIH1cbn1cbmZ1bmN0aW9uIFJlYWRhYmxlU3RyZWFtR2V0TnVtUmVhZEludG9SZXF1ZXN0cyhzdHJlYW0pIHtcbiAgICByZXR1cm4gc3RyZWFtLl9yZWFkZXIuX3JlYWRJbnRvUmVxdWVzdHMubGVuZ3RoO1xufVxuZnVuY3Rpb24gUmVhZGFibGVTdHJlYW1IYXNCWU9CUmVhZGVyKHN0cmVhbSkge1xuICAgIGNvbnN0IHJlYWRlciA9IHN0cmVhbS5fcmVhZGVyO1xuICAgIGlmIChyZWFkZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmICghSXNSZWFkYWJsZVN0cmVhbUJZT0JSZWFkZXIocmVhZGVyKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xufVxuLyoqXG4gKiBBIEJZT0IgcmVhZGVyIHZlbmRlZCBieSBhIHtAbGluayBSZWFkYWJsZVN0cmVhbX0uXG4gKlxuICogQHB1YmxpY1xuICovXG5jbGFzcyBSZWFkYWJsZVN0cmVhbUJZT0JSZWFkZXIge1xuICAgIGNvbnN0cnVjdG9yKHN0cmVhbSkge1xuICAgICAgICBhc3NlcnRSZXF1aXJlZEFyZ3VtZW50KHN0cmVhbSwgMSwgJ1JlYWRhYmxlU3RyZWFtQllPQlJlYWRlcicpO1xuICAgICAgICBhc3NlcnRSZWFkYWJsZVN0cmVhbShzdHJlYW0sICdGaXJzdCBwYXJhbWV0ZXInKTtcbiAgICAgICAgaWYgKElzUmVhZGFibGVTdHJlYW1Mb2NrZWQoc3RyZWFtKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhpcyBzdHJlYW0gaGFzIGFscmVhZHkgYmVlbiBsb2NrZWQgZm9yIGV4Y2x1c2l2ZSByZWFkaW5nIGJ5IGFub3RoZXIgcmVhZGVyJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFJc1JlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXIoc3RyZWFtLl9yZWFkYWJsZVN0cmVhbUNvbnRyb2xsZXIpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY29uc3RydWN0IGEgUmVhZGFibGVTdHJlYW1CWU9CUmVhZGVyIGZvciBhIHN0cmVhbSBub3QgY29uc3RydWN0ZWQgd2l0aCBhIGJ5dGUgJyArXG4gICAgICAgICAgICAgICAgJ3NvdXJjZScpO1xuICAgICAgICB9XG4gICAgICAgIFJlYWRhYmxlU3RyZWFtUmVhZGVyR2VuZXJpY0luaXRpYWxpemUodGhpcywgc3RyZWFtKTtcbiAgICAgICAgdGhpcy5fcmVhZEludG9SZXF1ZXN0cyA9IG5ldyBTaW1wbGVRdWV1ZSgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgcHJvbWlzZSB0aGF0IHdpbGwgYmUgZnVsZmlsbGVkIHdoZW4gdGhlIHN0cmVhbSBiZWNvbWVzIGNsb3NlZCwgb3IgcmVqZWN0ZWQgaWYgdGhlIHN0cmVhbSBldmVyIGVycm9ycyBvclxuICAgICAqIHRoZSByZWFkZXIncyBsb2NrIGlzIHJlbGVhc2VkIGJlZm9yZSB0aGUgc3RyZWFtIGZpbmlzaGVzIGNsb3NpbmcuXG4gICAgICovXG4gICAgZ2V0IGNsb3NlZCgpIHtcbiAgICAgICAgaWYgKCFJc1JlYWRhYmxlU3RyZWFtQllPQlJlYWRlcih0aGlzKSkge1xuICAgICAgICAgICAgcmV0dXJuIHByb21pc2VSZWplY3RlZFdpdGgoYnlvYlJlYWRlckJyYW5kQ2hlY2tFeGNlcHRpb24oJ2Nsb3NlZCcpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fY2xvc2VkUHJvbWlzZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSWYgdGhlIHJlYWRlciBpcyBhY3RpdmUsIGJlaGF2ZXMgdGhlIHNhbWUgYXMge0BsaW5rIFJlYWRhYmxlU3RyZWFtLmNhbmNlbCB8IHN0cmVhbS5jYW5jZWwocmVhc29uKX0uXG4gICAgICovXG4gICAgY2FuY2VsKHJlYXNvbiA9IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAoIUlzUmVhZGFibGVTdHJlYW1CWU9CUmVhZGVyKHRoaXMpKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJvbWlzZVJlamVjdGVkV2l0aChieW9iUmVhZGVyQnJhbmRDaGVja0V4Y2VwdGlvbignY2FuY2VsJykpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9vd25lclJlYWRhYmxlU3RyZWFtID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBwcm9taXNlUmVqZWN0ZWRXaXRoKHJlYWRlckxvY2tFeGNlcHRpb24oJ2NhbmNlbCcpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUmVhZGFibGVTdHJlYW1SZWFkZXJHZW5lcmljQ2FuY2VsKHRoaXMsIHJlYXNvbik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEF0dGVtcHRzIHRvIHJlYWRzIGJ5dGVzIGludG8gdmlldywgYW5kIHJldHVybnMgYSBwcm9taXNlIHJlc29sdmVkIHdpdGggdGhlIHJlc3VsdC5cbiAgICAgKlxuICAgICAqIElmIHJlYWRpbmcgYSBjaHVuayBjYXVzZXMgdGhlIHF1ZXVlIHRvIGJlY29tZSBlbXB0eSwgbW9yZSBkYXRhIHdpbGwgYmUgcHVsbGVkIGZyb20gdGhlIHVuZGVybHlpbmcgc291cmNlLlxuICAgICAqL1xuICAgIHJlYWQodmlldykge1xuICAgICAgICBpZiAoIUlzUmVhZGFibGVTdHJlYW1CWU9CUmVhZGVyKHRoaXMpKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJvbWlzZVJlamVjdGVkV2l0aChieW9iUmVhZGVyQnJhbmRDaGVja0V4Y2VwdGlvbigncmVhZCcpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIUFycmF5QnVmZmVyLmlzVmlldyh2aWV3KSkge1xuICAgICAgICAgICAgcmV0dXJuIHByb21pc2VSZWplY3RlZFdpdGgobmV3IFR5cGVFcnJvcigndmlldyBtdXN0IGJlIGFuIGFycmF5IGJ1ZmZlciB2aWV3JykpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh2aWV3LmJ5dGVMZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBwcm9taXNlUmVqZWN0ZWRXaXRoKG5ldyBUeXBlRXJyb3IoJ3ZpZXcgbXVzdCBoYXZlIG5vbi16ZXJvIGJ5dGVMZW5ndGgnKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHZpZXcuYnVmZmVyLmJ5dGVMZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBwcm9taXNlUmVqZWN0ZWRXaXRoKG5ldyBUeXBlRXJyb3IoYHZpZXcncyBidWZmZXIgbXVzdCBoYXZlIG5vbi16ZXJvIGJ5dGVMZW5ndGhgKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKElzRGV0YWNoZWRCdWZmZXIodmlldy5idWZmZXIpKSA7XG4gICAgICAgIGlmICh0aGlzLl9vd25lclJlYWRhYmxlU3RyZWFtID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBwcm9taXNlUmVqZWN0ZWRXaXRoKHJlYWRlckxvY2tFeGNlcHRpb24oJ3JlYWQgZnJvbScpKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgcmVzb2x2ZVByb21pc2U7XG4gICAgICAgIGxldCByZWplY3RQcm9taXNlO1xuICAgICAgICBjb25zdCBwcm9taXNlID0gbmV3UHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICByZXNvbHZlUHJvbWlzZSA9IHJlc29sdmU7XG4gICAgICAgICAgICByZWplY3RQcm9taXNlID0gcmVqZWN0O1xuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgcmVhZEludG9SZXF1ZXN0ID0ge1xuICAgICAgICAgICAgX2NodW5rU3RlcHM6IGNodW5rID0+IHJlc29sdmVQcm9taXNlKHsgdmFsdWU6IGNodW5rLCBkb25lOiBmYWxzZSB9KSxcbiAgICAgICAgICAgIF9jbG9zZVN0ZXBzOiBjaHVuayA9PiByZXNvbHZlUHJvbWlzZSh7IHZhbHVlOiBjaHVuaywgZG9uZTogdHJ1ZSB9KSxcbiAgICAgICAgICAgIF9lcnJvclN0ZXBzOiBlID0+IHJlamVjdFByb21pc2UoZSlcbiAgICAgICAgfTtcbiAgICAgICAgUmVhZGFibGVTdHJlYW1CWU9CUmVhZGVyUmVhZCh0aGlzLCB2aWV3LCByZWFkSW50b1JlcXVlc3QpO1xuICAgICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVsZWFzZXMgdGhlIHJlYWRlcidzIGxvY2sgb24gdGhlIGNvcnJlc3BvbmRpbmcgc3RyZWFtLiBBZnRlciB0aGUgbG9jayBpcyByZWxlYXNlZCwgdGhlIHJlYWRlciBpcyBubyBsb25nZXIgYWN0aXZlLlxuICAgICAqIElmIHRoZSBhc3NvY2lhdGVkIHN0cmVhbSBpcyBlcnJvcmVkIHdoZW4gdGhlIGxvY2sgaXMgcmVsZWFzZWQsIHRoZSByZWFkZXIgd2lsbCBhcHBlYXIgZXJyb3JlZCBpbiB0aGUgc2FtZSB3YXlcbiAgICAgKiBmcm9tIG5vdyBvbjsgb3RoZXJ3aXNlLCB0aGUgcmVhZGVyIHdpbGwgYXBwZWFyIGNsb3NlZC5cbiAgICAgKlxuICAgICAqIEEgcmVhZGVyJ3MgbG9jayBjYW5ub3QgYmUgcmVsZWFzZWQgd2hpbGUgaXQgc3RpbGwgaGFzIGEgcGVuZGluZyByZWFkIHJlcXVlc3QsIGkuZS4sIGlmIGEgcHJvbWlzZSByZXR1cm5lZCBieVxuICAgICAqIHRoZSByZWFkZXIncyB7QGxpbmsgUmVhZGFibGVTdHJlYW1CWU9CUmVhZGVyLnJlYWQgfCByZWFkKCl9IG1ldGhvZCBoYXMgbm90IHlldCBiZWVuIHNldHRsZWQuIEF0dGVtcHRpbmcgdG9cbiAgICAgKiBkbyBzbyB3aWxsIHRocm93IGEgYFR5cGVFcnJvcmAgYW5kIGxlYXZlIHRoZSByZWFkZXIgbG9ja2VkIHRvIHRoZSBzdHJlYW0uXG4gICAgICovXG4gICAgcmVsZWFzZUxvY2soKSB7XG4gICAgICAgIGlmICghSXNSZWFkYWJsZVN0cmVhbUJZT0JSZWFkZXIodGhpcykpIHtcbiAgICAgICAgICAgIHRocm93IGJ5b2JSZWFkZXJCcmFuZENoZWNrRXhjZXB0aW9uKCdyZWxlYXNlTG9jaycpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9vd25lclJlYWRhYmxlU3RyZWFtID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fcmVhZEludG9SZXF1ZXN0cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUcmllZCB0byByZWxlYXNlIGEgcmVhZGVyIGxvY2sgd2hlbiB0aGF0IHJlYWRlciBoYXMgcGVuZGluZyByZWFkKCkgY2FsbHMgdW4tc2V0dGxlZCcpO1xuICAgICAgICB9XG4gICAgICAgIFJlYWRhYmxlU3RyZWFtUmVhZGVyR2VuZXJpY1JlbGVhc2UodGhpcyk7XG4gICAgfVxufVxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoUmVhZGFibGVTdHJlYW1CWU9CUmVhZGVyLnByb3RvdHlwZSwge1xuICAgIGNhbmNlbDogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG4gICAgcmVhZDogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG4gICAgcmVsZWFzZUxvY2s6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxuICAgIGNsb3NlZDogeyBlbnVtZXJhYmxlOiB0cnVlIH1cbn0pO1xuaWYgKHR5cGVvZiBTeW1ib2xQb2x5ZmlsbC50b1N0cmluZ1RhZyA9PT0gJ3N5bWJvbCcpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoUmVhZGFibGVTdHJlYW1CWU9CUmVhZGVyLnByb3RvdHlwZSwgU3ltYm9sUG9seWZpbGwudG9TdHJpbmdUYWcsIHtcbiAgICAgICAgdmFsdWU6ICdSZWFkYWJsZVN0cmVhbUJZT0JSZWFkZXInLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbn1cbi8vIEFic3RyYWN0IG9wZXJhdGlvbnMgZm9yIHRoZSByZWFkZXJzLlxuZnVuY3Rpb24gSXNSZWFkYWJsZVN0cmVhbUJZT0JSZWFkZXIoeCkge1xuICAgIGlmICghdHlwZUlzT2JqZWN0KHgpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoeCwgJ19yZWFkSW50b1JlcXVlc3RzJykpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4geCBpbnN0YW5jZW9mIFJlYWRhYmxlU3RyZWFtQllPQlJlYWRlcjtcbn1cbmZ1bmN0aW9uIFJlYWRhYmxlU3RyZWFtQllPQlJlYWRlclJlYWQocmVhZGVyLCB2aWV3LCByZWFkSW50b1JlcXVlc3QpIHtcbiAgICBjb25zdCBzdHJlYW0gPSByZWFkZXIuX293bmVyUmVhZGFibGVTdHJlYW07XG4gICAgc3RyZWFtLl9kaXN0dXJiZWQgPSB0cnVlO1xuICAgIGlmIChzdHJlYW0uX3N0YXRlID09PSAnZXJyb3JlZCcpIHtcbiAgICAgICAgcmVhZEludG9SZXF1ZXN0Ll9lcnJvclN0ZXBzKHN0cmVhbS5fc3RvcmVkRXJyb3IpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlclB1bGxJbnRvKHN0cmVhbS5fcmVhZGFibGVTdHJlYW1Db250cm9sbGVyLCB2aWV3LCByZWFkSW50b1JlcXVlc3QpO1xuICAgIH1cbn1cbi8vIEhlbHBlciBmdW5jdGlvbnMgZm9yIHRoZSBSZWFkYWJsZVN0cmVhbUJZT0JSZWFkZXIuXG5mdW5jdGlvbiBieW9iUmVhZGVyQnJhbmRDaGVja0V4Y2VwdGlvbihuYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBUeXBlRXJyb3IoYFJlYWRhYmxlU3RyZWFtQllPQlJlYWRlci5wcm90b3R5cGUuJHtuYW1lfSBjYW4gb25seSBiZSB1c2VkIG9uIGEgUmVhZGFibGVTdHJlYW1CWU9CUmVhZGVyYCk7XG59XG5cbmZ1bmN0aW9uIEV4dHJhY3RIaWdoV2F0ZXJNYXJrKHN0cmF0ZWd5LCBkZWZhdWx0SFdNKSB7XG4gICAgY29uc3QgeyBoaWdoV2F0ZXJNYXJrIH0gPSBzdHJhdGVneTtcbiAgICBpZiAoaGlnaFdhdGVyTWFyayA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBkZWZhdWx0SFdNO1xuICAgIH1cbiAgICBpZiAoTnVtYmVySXNOYU4oaGlnaFdhdGVyTWFyaykgfHwgaGlnaFdhdGVyTWFyayA8IDApIHtcbiAgICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0ludmFsaWQgaGlnaFdhdGVyTWFyaycpO1xuICAgIH1cbiAgICByZXR1cm4gaGlnaFdhdGVyTWFyaztcbn1cbmZ1bmN0aW9uIEV4dHJhY3RTaXplQWxnb3JpdGhtKHN0cmF0ZWd5KSB7XG4gICAgY29uc3QgeyBzaXplIH0gPSBzdHJhdGVneTtcbiAgICBpZiAoIXNpemUpIHtcbiAgICAgICAgcmV0dXJuICgpID0+IDE7XG4gICAgfVxuICAgIHJldHVybiBzaXplO1xufVxuXG5mdW5jdGlvbiBjb252ZXJ0UXVldWluZ1N0cmF0ZWd5KGluaXQsIGNvbnRleHQpIHtcbiAgICBhc3NlcnREaWN0aW9uYXJ5KGluaXQsIGNvbnRleHQpO1xuICAgIGNvbnN0IGhpZ2hXYXRlck1hcmsgPSBpbml0ID09PSBudWxsIHx8IGluaXQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGluaXQuaGlnaFdhdGVyTWFyaztcbiAgICBjb25zdCBzaXplID0gaW5pdCA9PT0gbnVsbCB8fCBpbml0ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBpbml0LnNpemU7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgaGlnaFdhdGVyTWFyazogaGlnaFdhdGVyTWFyayA9PT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkIDogY29udmVydFVucmVzdHJpY3RlZERvdWJsZShoaWdoV2F0ZXJNYXJrKSxcbiAgICAgICAgc2l6ZTogc2l6ZSA9PT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkIDogY29udmVydFF1ZXVpbmdTdHJhdGVneVNpemUoc2l6ZSwgYCR7Y29udGV4dH0gaGFzIG1lbWJlciAnc2l6ZScgdGhhdGApXG4gICAgfTtcbn1cbmZ1bmN0aW9uIGNvbnZlcnRRdWV1aW5nU3RyYXRlZ3lTaXplKGZuLCBjb250ZXh0KSB7XG4gICAgYXNzZXJ0RnVuY3Rpb24oZm4sIGNvbnRleHQpO1xuICAgIHJldHVybiBjaHVuayA9PiBjb252ZXJ0VW5yZXN0cmljdGVkRG91YmxlKGZuKGNodW5rKSk7XG59XG5cbmZ1bmN0aW9uIGNvbnZlcnRVbmRlcmx5aW5nU2luayhvcmlnaW5hbCwgY29udGV4dCkge1xuICAgIGFzc2VydERpY3Rpb25hcnkob3JpZ2luYWwsIGNvbnRleHQpO1xuICAgIGNvbnN0IGFib3J0ID0gb3JpZ2luYWwgPT09IG51bGwgfHwgb3JpZ2luYWwgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9yaWdpbmFsLmFib3J0O1xuICAgIGNvbnN0IGNsb3NlID0gb3JpZ2luYWwgPT09IG51bGwgfHwgb3JpZ2luYWwgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9yaWdpbmFsLmNsb3NlO1xuICAgIGNvbnN0IHN0YXJ0ID0gb3JpZ2luYWwgPT09IG51bGwgfHwgb3JpZ2luYWwgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9yaWdpbmFsLnN0YXJ0O1xuICAgIGNvbnN0IHR5cGUgPSBvcmlnaW5hbCA9PT0gbnVsbCB8fCBvcmlnaW5hbCA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3JpZ2luYWwudHlwZTtcbiAgICBjb25zdCB3cml0ZSA9IG9yaWdpbmFsID09PSBudWxsIHx8IG9yaWdpbmFsID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcmlnaW5hbC53cml0ZTtcbiAgICByZXR1cm4ge1xuICAgICAgICBhYm9ydDogYWJvcnQgPT09IHVuZGVmaW5lZCA/XG4gICAgICAgICAgICB1bmRlZmluZWQgOlxuICAgICAgICAgICAgY29udmVydFVuZGVybHlpbmdTaW5rQWJvcnRDYWxsYmFjayhhYm9ydCwgb3JpZ2luYWwsIGAke2NvbnRleHR9IGhhcyBtZW1iZXIgJ2Fib3J0JyB0aGF0YCksXG4gICAgICAgIGNsb3NlOiBjbG9zZSA9PT0gdW5kZWZpbmVkID9cbiAgICAgICAgICAgIHVuZGVmaW5lZCA6XG4gICAgICAgICAgICBjb252ZXJ0VW5kZXJseWluZ1NpbmtDbG9zZUNhbGxiYWNrKGNsb3NlLCBvcmlnaW5hbCwgYCR7Y29udGV4dH0gaGFzIG1lbWJlciAnY2xvc2UnIHRoYXRgKSxcbiAgICAgICAgc3RhcnQ6IHN0YXJ0ID09PSB1bmRlZmluZWQgP1xuICAgICAgICAgICAgdW5kZWZpbmVkIDpcbiAgICAgICAgICAgIGNvbnZlcnRVbmRlcmx5aW5nU2lua1N0YXJ0Q2FsbGJhY2soc3RhcnQsIG9yaWdpbmFsLCBgJHtjb250ZXh0fSBoYXMgbWVtYmVyICdzdGFydCcgdGhhdGApLFxuICAgICAgICB3cml0ZTogd3JpdGUgPT09IHVuZGVmaW5lZCA/XG4gICAgICAgICAgICB1bmRlZmluZWQgOlxuICAgICAgICAgICAgY29udmVydFVuZGVybHlpbmdTaW5rV3JpdGVDYWxsYmFjayh3cml0ZSwgb3JpZ2luYWwsIGAke2NvbnRleHR9IGhhcyBtZW1iZXIgJ3dyaXRlJyB0aGF0YCksXG4gICAgICAgIHR5cGVcbiAgICB9O1xufVxuZnVuY3Rpb24gY29udmVydFVuZGVybHlpbmdTaW5rQWJvcnRDYWxsYmFjayhmbiwgb3JpZ2luYWwsIGNvbnRleHQpIHtcbiAgICBhc3NlcnRGdW5jdGlvbihmbiwgY29udGV4dCk7XG4gICAgcmV0dXJuIChyZWFzb24pID0+IHByb21pc2VDYWxsKGZuLCBvcmlnaW5hbCwgW3JlYXNvbl0pO1xufVxuZnVuY3Rpb24gY29udmVydFVuZGVybHlpbmdTaW5rQ2xvc2VDYWxsYmFjayhmbiwgb3JpZ2luYWwsIGNvbnRleHQpIHtcbiAgICBhc3NlcnRGdW5jdGlvbihmbiwgY29udGV4dCk7XG4gICAgcmV0dXJuICgpID0+IHByb21pc2VDYWxsKGZuLCBvcmlnaW5hbCwgW10pO1xufVxuZnVuY3Rpb24gY29udmVydFVuZGVybHlpbmdTaW5rU3RhcnRDYWxsYmFjayhmbiwgb3JpZ2luYWwsIGNvbnRleHQpIHtcbiAgICBhc3NlcnRGdW5jdGlvbihmbiwgY29udGV4dCk7XG4gICAgcmV0dXJuIChjb250cm9sbGVyKSA9PiByZWZsZWN0Q2FsbChmbiwgb3JpZ2luYWwsIFtjb250cm9sbGVyXSk7XG59XG5mdW5jdGlvbiBjb252ZXJ0VW5kZXJseWluZ1NpbmtXcml0ZUNhbGxiYWNrKGZuLCBvcmlnaW5hbCwgY29udGV4dCkge1xuICAgIGFzc2VydEZ1bmN0aW9uKGZuLCBjb250ZXh0KTtcbiAgICByZXR1cm4gKGNodW5rLCBjb250cm9sbGVyKSA9PiBwcm9taXNlQ2FsbChmbiwgb3JpZ2luYWwsIFtjaHVuaywgY29udHJvbGxlcl0pO1xufVxuXG5mdW5jdGlvbiBhc3NlcnRXcml0YWJsZVN0cmVhbSh4LCBjb250ZXh0KSB7XG4gICAgaWYgKCFJc1dyaXRhYmxlU3RyZWFtKHgpKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYCR7Y29udGV4dH0gaXMgbm90IGEgV3JpdGFibGVTdHJlYW0uYCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBpc0Fib3J0U2lnbmFsKHZhbHVlKSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ29iamVjdCcgfHwgdmFsdWUgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICByZXR1cm4gdHlwZW9mIHZhbHVlLmFib3J0ZWQgPT09ICdib29sZWFuJztcbiAgICB9XG4gICAgY2F0Y2ggKF9hKSB7XG4gICAgICAgIC8vIEFib3J0U2lnbmFsLnByb3RvdHlwZS5hYm9ydGVkIHRocm93cyBpZiBpdHMgYnJhbmQgY2hlY2sgZmFpbHNcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cbmNvbnN0IHN1cHBvcnRzQWJvcnRDb250cm9sbGVyID0gdHlwZW9mIEFib3J0Q29udHJvbGxlciA9PT0gJ2Z1bmN0aW9uJztcbi8qKlxuICogQ29uc3RydWN0IGEgbmV3IEFib3J0Q29udHJvbGxlciwgaWYgc3VwcG9ydGVkIGJ5IHRoZSBwbGF0Zm9ybS5cbiAqXG4gKiBAaW50ZXJuYWxcbiAqL1xuZnVuY3Rpb24gY3JlYXRlQWJvcnRDb250cm9sbGVyKCkge1xuICAgIGlmIChzdXBwb3J0c0Fib3J0Q29udHJvbGxlcikge1xuICAgICAgICByZXR1cm4gbmV3IEFib3J0Q29udHJvbGxlcigpO1xuICAgIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xufVxuXG4vKipcbiAqIEEgd3JpdGFibGUgc3RyZWFtIHJlcHJlc2VudHMgYSBkZXN0aW5hdGlvbiBmb3IgZGF0YSwgaW50byB3aGljaCB5b3UgY2FuIHdyaXRlLlxuICpcbiAqIEBwdWJsaWNcbiAqL1xuY2xhc3MgV3JpdGFibGVTdHJlYW0ge1xuICAgIGNvbnN0cnVjdG9yKHJhd1VuZGVybHlpbmdTaW5rID0ge30sIHJhd1N0cmF0ZWd5ID0ge30pIHtcbiAgICAgICAgaWYgKHJhd1VuZGVybHlpbmdTaW5rID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJhd1VuZGVybHlpbmdTaW5rID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGFzc2VydE9iamVjdChyYXdVbmRlcmx5aW5nU2luaywgJ0ZpcnN0IHBhcmFtZXRlcicpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHN0cmF0ZWd5ID0gY29udmVydFF1ZXVpbmdTdHJhdGVneShyYXdTdHJhdGVneSwgJ1NlY29uZCBwYXJhbWV0ZXInKTtcbiAgICAgICAgY29uc3QgdW5kZXJseWluZ1NpbmsgPSBjb252ZXJ0VW5kZXJseWluZ1NpbmsocmF3VW5kZXJseWluZ1NpbmssICdGaXJzdCBwYXJhbWV0ZXInKTtcbiAgICAgICAgSW5pdGlhbGl6ZVdyaXRhYmxlU3RyZWFtKHRoaXMpO1xuICAgICAgICBjb25zdCB0eXBlID0gdW5kZXJseWluZ1NpbmsudHlwZTtcbiAgICAgICAgaWYgKHR5cGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0ludmFsaWQgdHlwZSBpcyBzcGVjaWZpZWQnKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzaXplQWxnb3JpdGhtID0gRXh0cmFjdFNpemVBbGdvcml0aG0oc3RyYXRlZ3kpO1xuICAgICAgICBjb25zdCBoaWdoV2F0ZXJNYXJrID0gRXh0cmFjdEhpZ2hXYXRlck1hcmsoc3RyYXRlZ3ksIDEpO1xuICAgICAgICBTZXRVcFdyaXRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJGcm9tVW5kZXJseWluZ1NpbmsodGhpcywgdW5kZXJseWluZ1NpbmssIGhpZ2hXYXRlck1hcmssIHNpemVBbGdvcml0aG0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHdoZXRoZXIgb3Igbm90IHRoZSB3cml0YWJsZSBzdHJlYW0gaXMgbG9ja2VkIHRvIGEgd3JpdGVyLlxuICAgICAqL1xuICAgIGdldCBsb2NrZWQoKSB7XG4gICAgICAgIGlmICghSXNXcml0YWJsZVN0cmVhbSh0aGlzKSkge1xuICAgICAgICAgICAgdGhyb3cgc3RyZWFtQnJhbmRDaGVja0V4Y2VwdGlvbiQyKCdsb2NrZWQnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gSXNXcml0YWJsZVN0cmVhbUxvY2tlZCh0aGlzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWJvcnRzIHRoZSBzdHJlYW0sIHNpZ25hbGluZyB0aGF0IHRoZSBwcm9kdWNlciBjYW4gbm8gbG9uZ2VyIHN1Y2Nlc3NmdWxseSB3cml0ZSB0byB0aGUgc3RyZWFtIGFuZCBpdCBpcyB0byBiZVxuICAgICAqIGltbWVkaWF0ZWx5IG1vdmVkIHRvIGFuIGVycm9yZWQgc3RhdGUsIHdpdGggYW55IHF1ZXVlZC11cCB3cml0ZXMgZGlzY2FyZGVkLiBUaGlzIHdpbGwgYWxzbyBleGVjdXRlIGFueSBhYm9ydFxuICAgICAqIG1lY2hhbmlzbSBvZiB0aGUgdW5kZXJseWluZyBzaW5rLlxuICAgICAqXG4gICAgICogVGhlIHJldHVybmVkIHByb21pc2Ugd2lsbCBmdWxmaWxsIGlmIHRoZSBzdHJlYW0gc2h1dHMgZG93biBzdWNjZXNzZnVsbHksIG9yIHJlamVjdCBpZiB0aGUgdW5kZXJseWluZyBzaW5rIHNpZ25hbGVkXG4gICAgICogdGhhdCB0aGVyZSB3YXMgYW4gZXJyb3IgZG9pbmcgc28uIEFkZGl0aW9uYWxseSwgaXQgd2lsbCByZWplY3Qgd2l0aCBhIGBUeXBlRXJyb3JgICh3aXRob3V0IGF0dGVtcHRpbmcgdG8gY2FuY2VsXG4gICAgICogdGhlIHN0cmVhbSkgaWYgdGhlIHN0cmVhbSBpcyBjdXJyZW50bHkgbG9ja2VkLlxuICAgICAqL1xuICAgIGFib3J0KHJlYXNvbiA9IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAoIUlzV3JpdGFibGVTdHJlYW0odGhpcykpIHtcbiAgICAgICAgICAgIHJldHVybiBwcm9taXNlUmVqZWN0ZWRXaXRoKHN0cmVhbUJyYW5kQ2hlY2tFeGNlcHRpb24kMignYWJvcnQnKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKElzV3JpdGFibGVTdHJlYW1Mb2NrZWQodGhpcykpIHtcbiAgICAgICAgICAgIHJldHVybiBwcm9taXNlUmVqZWN0ZWRXaXRoKG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBhYm9ydCBhIHN0cmVhbSB0aGF0IGFscmVhZHkgaGFzIGEgd3JpdGVyJykpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBXcml0YWJsZVN0cmVhbUFib3J0KHRoaXMsIHJlYXNvbik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENsb3NlcyB0aGUgc3RyZWFtLiBUaGUgdW5kZXJseWluZyBzaW5rIHdpbGwgZmluaXNoIHByb2Nlc3NpbmcgYW55IHByZXZpb3VzbHktd3JpdHRlbiBjaHVua3MsIGJlZm9yZSBpbnZva2luZyBpdHNcbiAgICAgKiBjbG9zZSBiZWhhdmlvci4gRHVyaW5nIHRoaXMgdGltZSBhbnkgZnVydGhlciBhdHRlbXB0cyB0byB3cml0ZSB3aWxsIGZhaWwgKHdpdGhvdXQgZXJyb3JpbmcgdGhlIHN0cmVhbSkuXG4gICAgICpcbiAgICAgKiBUaGUgbWV0aG9kIHJldHVybnMgYSBwcm9taXNlIHRoYXQgd2lsbCBmdWxmaWxsIGlmIGFsbCByZW1haW5pbmcgY2h1bmtzIGFyZSBzdWNjZXNzZnVsbHkgd3JpdHRlbiBhbmQgdGhlIHN0cmVhbVxuICAgICAqIHN1Y2Nlc3NmdWxseSBjbG9zZXMsIG9yIHJlamVjdHMgaWYgYW4gZXJyb3IgaXMgZW5jb3VudGVyZWQgZHVyaW5nIHRoaXMgcHJvY2Vzcy4gQWRkaXRpb25hbGx5LCBpdCB3aWxsIHJlamVjdCB3aXRoXG4gICAgICogYSBgVHlwZUVycm9yYCAod2l0aG91dCBhdHRlbXB0aW5nIHRvIGNhbmNlbCB0aGUgc3RyZWFtKSBpZiB0aGUgc3RyZWFtIGlzIGN1cnJlbnRseSBsb2NrZWQuXG4gICAgICovXG4gICAgY2xvc2UoKSB7XG4gICAgICAgIGlmICghSXNXcml0YWJsZVN0cmVhbSh0aGlzKSkge1xuICAgICAgICAgICAgcmV0dXJuIHByb21pc2VSZWplY3RlZFdpdGgoc3RyZWFtQnJhbmRDaGVja0V4Y2VwdGlvbiQyKCdjbG9zZScpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoSXNXcml0YWJsZVN0cmVhbUxvY2tlZCh0aGlzKSkge1xuICAgICAgICAgICAgcmV0dXJuIHByb21pc2VSZWplY3RlZFdpdGgobmV3IFR5cGVFcnJvcignQ2Fubm90IGNsb3NlIGEgc3RyZWFtIHRoYXQgYWxyZWFkeSBoYXMgYSB3cml0ZXInKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFdyaXRhYmxlU3RyZWFtQ2xvc2VRdWV1ZWRPckluRmxpZ2h0KHRoaXMpKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJvbWlzZVJlamVjdGVkV2l0aChuZXcgVHlwZUVycm9yKCdDYW5ub3QgY2xvc2UgYW4gYWxyZWFkeS1jbG9zaW5nIHN0cmVhbScpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gV3JpdGFibGVTdHJlYW1DbG9zZSh0aGlzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIHtAbGluayBXcml0YWJsZVN0cmVhbURlZmF1bHRXcml0ZXIgfCB3cml0ZXJ9IGFuZCBsb2NrcyB0aGUgc3RyZWFtIHRvIHRoZSBuZXcgd3JpdGVyLiBXaGlsZSB0aGUgc3RyZWFtXG4gICAgICogaXMgbG9ja2VkLCBubyBvdGhlciB3cml0ZXIgY2FuIGJlIGFjcXVpcmVkIHVudGlsIHRoaXMgb25lIGlzIHJlbGVhc2VkLlxuICAgICAqXG4gICAgICogVGhpcyBmdW5jdGlvbmFsaXR5IGlzIGVzcGVjaWFsbHkgdXNlZnVsIGZvciBjcmVhdGluZyBhYnN0cmFjdGlvbnMgdGhhdCBkZXNpcmUgdGhlIGFiaWxpdHkgdG8gd3JpdGUgdG8gYSBzdHJlYW1cbiAgICAgKiB3aXRob3V0IGludGVycnVwdGlvbiBvciBpbnRlcmxlYXZpbmcuIEJ5IGdldHRpbmcgYSB3cml0ZXIgZm9yIHRoZSBzdHJlYW0sIHlvdSBjYW4gZW5zdXJlIG5vYm9keSBlbHNlIGNhbiB3cml0ZSBhdFxuICAgICAqIHRoZSBzYW1lIHRpbWUsIHdoaWNoIHdvdWxkIGNhdXNlIHRoZSByZXN1bHRpbmcgd3JpdHRlbiBkYXRhIHRvIGJlIHVucHJlZGljdGFibGUgYW5kIHByb2JhYmx5IHVzZWxlc3MuXG4gICAgICovXG4gICAgZ2V0V3JpdGVyKCkge1xuICAgICAgICBpZiAoIUlzV3JpdGFibGVTdHJlYW0odGhpcykpIHtcbiAgICAgICAgICAgIHRocm93IHN0cmVhbUJyYW5kQ2hlY2tFeGNlcHRpb24kMignZ2V0V3JpdGVyJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIEFjcXVpcmVXcml0YWJsZVN0cmVhbURlZmF1bHRXcml0ZXIodGhpcyk7XG4gICAgfVxufVxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoV3JpdGFibGVTdHJlYW0ucHJvdG90eXBlLCB7XG4gICAgYWJvcnQ6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxuICAgIGNsb3NlOiB7IGVudW1lcmFibGU6IHRydWUgfSxcbiAgICBnZXRXcml0ZXI6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxuICAgIGxvY2tlZDogeyBlbnVtZXJhYmxlOiB0cnVlIH1cbn0pO1xuaWYgKHR5cGVvZiBTeW1ib2xQb2x5ZmlsbC50b1N0cmluZ1RhZyA9PT0gJ3N5bWJvbCcpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoV3JpdGFibGVTdHJlYW0ucHJvdG90eXBlLCBTeW1ib2xQb2x5ZmlsbC50b1N0cmluZ1RhZywge1xuICAgICAgICB2YWx1ZTogJ1dyaXRhYmxlU3RyZWFtJyxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG59XG4vLyBBYnN0cmFjdCBvcGVyYXRpb25zIGZvciB0aGUgV3JpdGFibGVTdHJlYW0uXG5mdW5jdGlvbiBBY3F1aXJlV3JpdGFibGVTdHJlYW1EZWZhdWx0V3JpdGVyKHN0cmVhbSkge1xuICAgIHJldHVybiBuZXcgV3JpdGFibGVTdHJlYW1EZWZhdWx0V3JpdGVyKHN0cmVhbSk7XG59XG4vLyBUaHJvd3MgaWYgYW5kIG9ubHkgaWYgc3RhcnRBbGdvcml0aG0gdGhyb3dzLlxuZnVuY3Rpb24gQ3JlYXRlV3JpdGFibGVTdHJlYW0oc3RhcnRBbGdvcml0aG0sIHdyaXRlQWxnb3JpdGhtLCBjbG9zZUFsZ29yaXRobSwgYWJvcnRBbGdvcml0aG0sIGhpZ2hXYXRlck1hcmsgPSAxLCBzaXplQWxnb3JpdGhtID0gKCkgPT4gMSkge1xuICAgIGNvbnN0IHN0cmVhbSA9IE9iamVjdC5jcmVhdGUoV3JpdGFibGVTdHJlYW0ucHJvdG90eXBlKTtcbiAgICBJbml0aWFsaXplV3JpdGFibGVTdHJlYW0oc3RyZWFtKTtcbiAgICBjb25zdCBjb250cm9sbGVyID0gT2JqZWN0LmNyZWF0ZShXcml0YWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyLnByb3RvdHlwZSk7XG4gICAgU2V0VXBXcml0YWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyKHN0cmVhbSwgY29udHJvbGxlciwgc3RhcnRBbGdvcml0aG0sIHdyaXRlQWxnb3JpdGhtLCBjbG9zZUFsZ29yaXRobSwgYWJvcnRBbGdvcml0aG0sIGhpZ2hXYXRlck1hcmssIHNpemVBbGdvcml0aG0pO1xuICAgIHJldHVybiBzdHJlYW07XG59XG5mdW5jdGlvbiBJbml0aWFsaXplV3JpdGFibGVTdHJlYW0oc3RyZWFtKSB7XG4gICAgc3RyZWFtLl9zdGF0ZSA9ICd3cml0YWJsZSc7XG4gICAgLy8gVGhlIGVycm9yIHRoYXQgd2lsbCBiZSByZXBvcnRlZCBieSBuZXcgbWV0aG9kIGNhbGxzIG9uY2UgdGhlIHN0YXRlIGJlY29tZXMgZXJyb3JlZC4gT25seSBzZXQgd2hlbiBbW3N0YXRlXV0gaXNcbiAgICAvLyAnZXJyb3JpbmcnIG9yICdlcnJvcmVkJy4gTWF5IGJlIHNldCB0byBhbiB1bmRlZmluZWQgdmFsdWUuXG4gICAgc3RyZWFtLl9zdG9yZWRFcnJvciA9IHVuZGVmaW5lZDtcbiAgICBzdHJlYW0uX3dyaXRlciA9IHVuZGVmaW5lZDtcbiAgICAvLyBJbml0aWFsaXplIHRvIHVuZGVmaW5lZCBmaXJzdCBiZWNhdXNlIHRoZSBjb25zdHJ1Y3RvciBvZiB0aGUgY29udHJvbGxlciBjaGVja3MgdGhpc1xuICAgIC8vIHZhcmlhYmxlIHRvIHZhbGlkYXRlIHRoZSBjYWxsZXIuXG4gICAgc3RyZWFtLl93cml0YWJsZVN0cmVhbUNvbnRyb2xsZXIgPSB1bmRlZmluZWQ7XG4gICAgLy8gVGhpcyBxdWV1ZSBpcyBwbGFjZWQgaGVyZSBpbnN0ZWFkIG9mIHRoZSB3cml0ZXIgY2xhc3MgaW4gb3JkZXIgdG8gYWxsb3cgZm9yIHBhc3NpbmcgYSB3cml0ZXIgdG8gdGhlIG5leHQgZGF0YVxuICAgIC8vIHByb2R1Y2VyIHdpdGhvdXQgd2FpdGluZyBmb3IgdGhlIHF1ZXVlZCB3cml0ZXMgdG8gZmluaXNoLlxuICAgIHN0cmVhbS5fd3JpdGVSZXF1ZXN0cyA9IG5ldyBTaW1wbGVRdWV1ZSgpO1xuICAgIC8vIFdyaXRlIHJlcXVlc3RzIGFyZSByZW1vdmVkIGZyb20gX3dyaXRlUmVxdWVzdHMgd2hlbiB3cml0ZSgpIGlzIGNhbGxlZCBvbiB0aGUgdW5kZXJseWluZyBzaW5rLiBUaGlzIHByZXZlbnRzXG4gICAgLy8gdGhlbSBmcm9tIGJlaW5nIGVycm9uZW91c2x5IHJlamVjdGVkIG9uIGVycm9yLiBJZiBhIHdyaXRlKCkgY2FsbCBpcyBpbi1mbGlnaHQsIHRoZSByZXF1ZXN0IGlzIHN0b3JlZCBoZXJlLlxuICAgIHN0cmVhbS5faW5GbGlnaHRXcml0ZVJlcXVlc3QgPSB1bmRlZmluZWQ7XG4gICAgLy8gVGhlIHByb21pc2UgdGhhdCB3YXMgcmV0dXJuZWQgZnJvbSB3cml0ZXIuY2xvc2UoKS4gU3RvcmVkIGhlcmUgYmVjYXVzZSBpdCBtYXkgYmUgZnVsZmlsbGVkIGFmdGVyIHRoZSB3cml0ZXJcbiAgICAvLyBoYXMgYmVlbiBkZXRhY2hlZC5cbiAgICBzdHJlYW0uX2Nsb3NlUmVxdWVzdCA9IHVuZGVmaW5lZDtcbiAgICAvLyBDbG9zZSByZXF1ZXN0IGlzIHJlbW92ZWQgZnJvbSBfY2xvc2VSZXF1ZXN0IHdoZW4gY2xvc2UoKSBpcyBjYWxsZWQgb24gdGhlIHVuZGVybHlpbmcgc2luay4gVGhpcyBwcmV2ZW50cyBpdFxuICAgIC8vIGZyb20gYmVpbmcgZXJyb25lb3VzbHkgcmVqZWN0ZWQgb24gZXJyb3IuIElmIGEgY2xvc2UoKSBjYWxsIGlzIGluLWZsaWdodCwgdGhlIHJlcXVlc3QgaXMgc3RvcmVkIGhlcmUuXG4gICAgc3RyZWFtLl9pbkZsaWdodENsb3NlUmVxdWVzdCA9IHVuZGVmaW5lZDtcbiAgICAvLyBUaGUgcHJvbWlzZSB0aGF0IHdhcyByZXR1cm5lZCBmcm9tIHdyaXRlci5hYm9ydCgpLiBUaGlzIG1heSBhbHNvIGJlIGZ1bGZpbGxlZCBhZnRlciB0aGUgd3JpdGVyIGhhcyBkZXRhY2hlZC5cbiAgICBzdHJlYW0uX3BlbmRpbmdBYm9ydFJlcXVlc3QgPSB1bmRlZmluZWQ7XG4gICAgLy8gVGhlIGJhY2twcmVzc3VyZSBzaWduYWwgc2V0IGJ5IHRoZSBjb250cm9sbGVyLlxuICAgIHN0cmVhbS5fYmFja3ByZXNzdXJlID0gZmFsc2U7XG59XG5mdW5jdGlvbiBJc1dyaXRhYmxlU3RyZWFtKHgpIHtcbiAgICBpZiAoIXR5cGVJc09iamVjdCh4KSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHgsICdfd3JpdGFibGVTdHJlYW1Db250cm9sbGVyJykpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4geCBpbnN0YW5jZW9mIFdyaXRhYmxlU3RyZWFtO1xufVxuZnVuY3Rpb24gSXNXcml0YWJsZVN0cmVhbUxvY2tlZChzdHJlYW0pIHtcbiAgICBpZiAoc3RyZWFtLl93cml0ZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xufVxuZnVuY3Rpb24gV3JpdGFibGVTdHJlYW1BYm9ydChzdHJlYW0sIHJlYXNvbikge1xuICAgIHZhciBfYTtcbiAgICBpZiAoc3RyZWFtLl9zdGF0ZSA9PT0gJ2Nsb3NlZCcgfHwgc3RyZWFtLl9zdGF0ZSA9PT0gJ2Vycm9yZWQnKSB7XG4gICAgICAgIHJldHVybiBwcm9taXNlUmVzb2x2ZWRXaXRoKHVuZGVmaW5lZCk7XG4gICAgfVxuICAgIHN0cmVhbS5fd3JpdGFibGVTdHJlYW1Db250cm9sbGVyLl9hYm9ydFJlYXNvbiA9IHJlYXNvbjtcbiAgICAoX2EgPSBzdHJlYW0uX3dyaXRhYmxlU3RyZWFtQ29udHJvbGxlci5fYWJvcnRDb250cm9sbGVyKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuYWJvcnQoKTtcbiAgICAvLyBUeXBlU2NyaXB0IG5hcnJvd3MgdGhlIHR5cGUgb2YgYHN0cmVhbS5fc3RhdGVgIGRvd24gdG8gJ3dyaXRhYmxlJyB8ICdlcnJvcmluZycsXG4gICAgLy8gYnV0IGl0IGRvZXNuJ3Qga25vdyB0aGF0IHNpZ25hbGluZyBhYm9ydCBydW5zIGF1dGhvciBjb2RlIHRoYXQgbWlnaHQgaGF2ZSBjaGFuZ2VkIHRoZSBzdGF0ZS5cbiAgICAvLyBXaWRlbiB0aGUgdHlwZSBhZ2FpbiBieSBjYXN0aW5nIHRvIFdyaXRhYmxlU3RyZWFtU3RhdGUuXG4gICAgY29uc3Qgc3RhdGUgPSBzdHJlYW0uX3N0YXRlO1xuICAgIGlmIChzdGF0ZSA9PT0gJ2Nsb3NlZCcgfHwgc3RhdGUgPT09ICdlcnJvcmVkJykge1xuICAgICAgICByZXR1cm4gcHJvbWlzZVJlc29sdmVkV2l0aCh1bmRlZmluZWQpO1xuICAgIH1cbiAgICBpZiAoc3RyZWFtLl9wZW5kaW5nQWJvcnRSZXF1ZXN0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIHN0cmVhbS5fcGVuZGluZ0Fib3J0UmVxdWVzdC5fcHJvbWlzZTtcbiAgICB9XG4gICAgbGV0IHdhc0FscmVhZHlFcnJvcmluZyA9IGZhbHNlO1xuICAgIGlmIChzdGF0ZSA9PT0gJ2Vycm9yaW5nJykge1xuICAgICAgICB3YXNBbHJlYWR5RXJyb3JpbmcgPSB0cnVlO1xuICAgICAgICAvLyByZWFzb24gd2lsbCBub3QgYmUgdXNlZCwgc28gZG9uJ3Qga2VlcCBhIHJlZmVyZW5jZSB0byBpdC5cbiAgICAgICAgcmVhc29uID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBjb25zdCBwcm9taXNlID0gbmV3UHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIHN0cmVhbS5fcGVuZGluZ0Fib3J0UmVxdWVzdCA9IHtcbiAgICAgICAgICAgIF9wcm9taXNlOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBfcmVzb2x2ZTogcmVzb2x2ZSxcbiAgICAgICAgICAgIF9yZWplY3Q6IHJlamVjdCxcbiAgICAgICAgICAgIF9yZWFzb246IHJlYXNvbixcbiAgICAgICAgICAgIF93YXNBbHJlYWR5RXJyb3Jpbmc6IHdhc0FscmVhZHlFcnJvcmluZ1xuICAgICAgICB9O1xuICAgIH0pO1xuICAgIHN0cmVhbS5fcGVuZGluZ0Fib3J0UmVxdWVzdC5fcHJvbWlzZSA9IHByb21pc2U7XG4gICAgaWYgKCF3YXNBbHJlYWR5RXJyb3JpbmcpIHtcbiAgICAgICAgV3JpdGFibGVTdHJlYW1TdGFydEVycm9yaW5nKHN0cmVhbSwgcmVhc29uKTtcbiAgICB9XG4gICAgcmV0dXJuIHByb21pc2U7XG59XG5mdW5jdGlvbiBXcml0YWJsZVN0cmVhbUNsb3NlKHN0cmVhbSkge1xuICAgIGNvbnN0IHN0YXRlID0gc3RyZWFtLl9zdGF0ZTtcbiAgICBpZiAoc3RhdGUgPT09ICdjbG9zZWQnIHx8IHN0YXRlID09PSAnZXJyb3JlZCcpIHtcbiAgICAgICAgcmV0dXJuIHByb21pc2VSZWplY3RlZFdpdGgobmV3IFR5cGVFcnJvcihgVGhlIHN0cmVhbSAoaW4gJHtzdGF0ZX0gc3RhdGUpIGlzIG5vdCBpbiB0aGUgd3JpdGFibGUgc3RhdGUgYW5kIGNhbm5vdCBiZSBjbG9zZWRgKSk7XG4gICAgfVxuICAgIGNvbnN0IHByb21pc2UgPSBuZXdQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgY29uc3QgY2xvc2VSZXF1ZXN0ID0ge1xuICAgICAgICAgICAgX3Jlc29sdmU6IHJlc29sdmUsXG4gICAgICAgICAgICBfcmVqZWN0OiByZWplY3RcbiAgICAgICAgfTtcbiAgICAgICAgc3RyZWFtLl9jbG9zZVJlcXVlc3QgPSBjbG9zZVJlcXVlc3Q7XG4gICAgfSk7XG4gICAgY29uc3Qgd3JpdGVyID0gc3RyZWFtLl93cml0ZXI7XG4gICAgaWYgKHdyaXRlciAhPT0gdW5kZWZpbmVkICYmIHN0cmVhbS5fYmFja3ByZXNzdXJlICYmIHN0YXRlID09PSAnd3JpdGFibGUnKSB7XG4gICAgICAgIGRlZmF1bHRXcml0ZXJSZWFkeVByb21pc2VSZXNvbHZlKHdyaXRlcik7XG4gICAgfVxuICAgIFdyaXRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJDbG9zZShzdHJlYW0uX3dyaXRhYmxlU3RyZWFtQ29udHJvbGxlcik7XG4gICAgcmV0dXJuIHByb21pc2U7XG59XG4vLyBXcml0YWJsZVN0cmVhbSBBUEkgZXhwb3NlZCBmb3IgY29udHJvbGxlcnMuXG5mdW5jdGlvbiBXcml0YWJsZVN0cmVhbUFkZFdyaXRlUmVxdWVzdChzdHJlYW0pIHtcbiAgICBjb25zdCBwcm9taXNlID0gbmV3UHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGNvbnN0IHdyaXRlUmVxdWVzdCA9IHtcbiAgICAgICAgICAgIF9yZXNvbHZlOiByZXNvbHZlLFxuICAgICAgICAgICAgX3JlamVjdDogcmVqZWN0XG4gICAgICAgIH07XG4gICAgICAgIHN0cmVhbS5fd3JpdGVSZXF1ZXN0cy5wdXNoKHdyaXRlUmVxdWVzdCk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHByb21pc2U7XG59XG5mdW5jdGlvbiBXcml0YWJsZVN0cmVhbURlYWxXaXRoUmVqZWN0aW9uKHN0cmVhbSwgZXJyb3IpIHtcbiAgICBjb25zdCBzdGF0ZSA9IHN0cmVhbS5fc3RhdGU7XG4gICAgaWYgKHN0YXRlID09PSAnd3JpdGFibGUnKSB7XG4gICAgICAgIFdyaXRhYmxlU3RyZWFtU3RhcnRFcnJvcmluZyhzdHJlYW0sIGVycm9yKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBXcml0YWJsZVN0cmVhbUZpbmlzaEVycm9yaW5nKHN0cmVhbSk7XG59XG5mdW5jdGlvbiBXcml0YWJsZVN0cmVhbVN0YXJ0RXJyb3Jpbmcoc3RyZWFtLCByZWFzb24pIHtcbiAgICBjb25zdCBjb250cm9sbGVyID0gc3RyZWFtLl93cml0YWJsZVN0cmVhbUNvbnRyb2xsZXI7XG4gICAgc3RyZWFtLl9zdGF0ZSA9ICdlcnJvcmluZyc7XG4gICAgc3RyZWFtLl9zdG9yZWRFcnJvciA9IHJlYXNvbjtcbiAgICBjb25zdCB3cml0ZXIgPSBzdHJlYW0uX3dyaXRlcjtcbiAgICBpZiAod3JpdGVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgV3JpdGFibGVTdHJlYW1EZWZhdWx0V3JpdGVyRW5zdXJlUmVhZHlQcm9taXNlUmVqZWN0ZWQod3JpdGVyLCByZWFzb24pO1xuICAgIH1cbiAgICBpZiAoIVdyaXRhYmxlU3RyZWFtSGFzT3BlcmF0aW9uTWFya2VkSW5GbGlnaHQoc3RyZWFtKSAmJiBjb250cm9sbGVyLl9zdGFydGVkKSB7XG4gICAgICAgIFdyaXRhYmxlU3RyZWFtRmluaXNoRXJyb3Jpbmcoc3RyZWFtKTtcbiAgICB9XG59XG5mdW5jdGlvbiBXcml0YWJsZVN0cmVhbUZpbmlzaEVycm9yaW5nKHN0cmVhbSkge1xuICAgIHN0cmVhbS5fc3RhdGUgPSAnZXJyb3JlZCc7XG4gICAgc3RyZWFtLl93cml0YWJsZVN0cmVhbUNvbnRyb2xsZXJbRXJyb3JTdGVwc10oKTtcbiAgICBjb25zdCBzdG9yZWRFcnJvciA9IHN0cmVhbS5fc3RvcmVkRXJyb3I7XG4gICAgc3RyZWFtLl93cml0ZVJlcXVlc3RzLmZvckVhY2god3JpdGVSZXF1ZXN0ID0+IHtcbiAgICAgICAgd3JpdGVSZXF1ZXN0Ll9yZWplY3Qoc3RvcmVkRXJyb3IpO1xuICAgIH0pO1xuICAgIHN0cmVhbS5fd3JpdGVSZXF1ZXN0cyA9IG5ldyBTaW1wbGVRdWV1ZSgpO1xuICAgIGlmIChzdHJlYW0uX3BlbmRpbmdBYm9ydFJlcXVlc3QgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBXcml0YWJsZVN0cmVhbVJlamVjdENsb3NlQW5kQ2xvc2VkUHJvbWlzZUlmTmVlZGVkKHN0cmVhbSk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgYWJvcnRSZXF1ZXN0ID0gc3RyZWFtLl9wZW5kaW5nQWJvcnRSZXF1ZXN0O1xuICAgIHN0cmVhbS5fcGVuZGluZ0Fib3J0UmVxdWVzdCA9IHVuZGVmaW5lZDtcbiAgICBpZiAoYWJvcnRSZXF1ZXN0Ll93YXNBbHJlYWR5RXJyb3JpbmcpIHtcbiAgICAgICAgYWJvcnRSZXF1ZXN0Ll9yZWplY3Qoc3RvcmVkRXJyb3IpO1xuICAgICAgICBXcml0YWJsZVN0cmVhbVJlamVjdENsb3NlQW5kQ2xvc2VkUHJvbWlzZUlmTmVlZGVkKHN0cmVhbSk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgcHJvbWlzZSA9IHN0cmVhbS5fd3JpdGFibGVTdHJlYW1Db250cm9sbGVyW0Fib3J0U3RlcHNdKGFib3J0UmVxdWVzdC5fcmVhc29uKTtcbiAgICB1cG9uUHJvbWlzZShwcm9taXNlLCAoKSA9PiB7XG4gICAgICAgIGFib3J0UmVxdWVzdC5fcmVzb2x2ZSgpO1xuICAgICAgICBXcml0YWJsZVN0cmVhbVJlamVjdENsb3NlQW5kQ2xvc2VkUHJvbWlzZUlmTmVlZGVkKHN0cmVhbSk7XG4gICAgfSwgKHJlYXNvbikgPT4ge1xuICAgICAgICBhYm9ydFJlcXVlc3QuX3JlamVjdChyZWFzb24pO1xuICAgICAgICBXcml0YWJsZVN0cmVhbVJlamVjdENsb3NlQW5kQ2xvc2VkUHJvbWlzZUlmTmVlZGVkKHN0cmVhbSk7XG4gICAgfSk7XG59XG5mdW5jdGlvbiBXcml0YWJsZVN0cmVhbUZpbmlzaEluRmxpZ2h0V3JpdGUoc3RyZWFtKSB7XG4gICAgc3RyZWFtLl9pbkZsaWdodFdyaXRlUmVxdWVzdC5fcmVzb2x2ZSh1bmRlZmluZWQpO1xuICAgIHN0cmVhbS5faW5GbGlnaHRXcml0ZVJlcXVlc3QgPSB1bmRlZmluZWQ7XG59XG5mdW5jdGlvbiBXcml0YWJsZVN0cmVhbUZpbmlzaEluRmxpZ2h0V3JpdGVXaXRoRXJyb3Ioc3RyZWFtLCBlcnJvcikge1xuICAgIHN0cmVhbS5faW5GbGlnaHRXcml0ZVJlcXVlc3QuX3JlamVjdChlcnJvcik7XG4gICAgc3RyZWFtLl9pbkZsaWdodFdyaXRlUmVxdWVzdCA9IHVuZGVmaW5lZDtcbiAgICBXcml0YWJsZVN0cmVhbURlYWxXaXRoUmVqZWN0aW9uKHN0cmVhbSwgZXJyb3IpO1xufVxuZnVuY3Rpb24gV3JpdGFibGVTdHJlYW1GaW5pc2hJbkZsaWdodENsb3NlKHN0cmVhbSkge1xuICAgIHN0cmVhbS5faW5GbGlnaHRDbG9zZVJlcXVlc3QuX3Jlc29sdmUodW5kZWZpbmVkKTtcbiAgICBzdHJlYW0uX2luRmxpZ2h0Q2xvc2VSZXF1ZXN0ID0gdW5kZWZpbmVkO1xuICAgIGNvbnN0IHN0YXRlID0gc3RyZWFtLl9zdGF0ZTtcbiAgICBpZiAoc3RhdGUgPT09ICdlcnJvcmluZycpIHtcbiAgICAgICAgLy8gVGhlIGVycm9yIHdhcyB0b28gbGF0ZSB0byBkbyBhbnl0aGluZywgc28gaXQgaXMgaWdub3JlZC5cbiAgICAgICAgc3RyZWFtLl9zdG9yZWRFcnJvciA9IHVuZGVmaW5lZDtcbiAgICAgICAgaWYgKHN0cmVhbS5fcGVuZGluZ0Fib3J0UmVxdWVzdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBzdHJlYW0uX3BlbmRpbmdBYm9ydFJlcXVlc3QuX3Jlc29sdmUoKTtcbiAgICAgICAgICAgIHN0cmVhbS5fcGVuZGluZ0Fib3J0UmVxdWVzdCA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzdHJlYW0uX3N0YXRlID0gJ2Nsb3NlZCc7XG4gICAgY29uc3Qgd3JpdGVyID0gc3RyZWFtLl93cml0ZXI7XG4gICAgaWYgKHdyaXRlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGRlZmF1bHRXcml0ZXJDbG9zZWRQcm9taXNlUmVzb2x2ZSh3cml0ZXIpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIFdyaXRhYmxlU3RyZWFtRmluaXNoSW5GbGlnaHRDbG9zZVdpdGhFcnJvcihzdHJlYW0sIGVycm9yKSB7XG4gICAgc3RyZWFtLl9pbkZsaWdodENsb3NlUmVxdWVzdC5fcmVqZWN0KGVycm9yKTtcbiAgICBzdHJlYW0uX2luRmxpZ2h0Q2xvc2VSZXF1ZXN0ID0gdW5kZWZpbmVkO1xuICAgIC8vIE5ldmVyIGV4ZWN1dGUgc2luayBhYm9ydCgpIGFmdGVyIHNpbmsgY2xvc2UoKS5cbiAgICBpZiAoc3RyZWFtLl9wZW5kaW5nQWJvcnRSZXF1ZXN0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgc3RyZWFtLl9wZW5kaW5nQWJvcnRSZXF1ZXN0Ll9yZWplY3QoZXJyb3IpO1xuICAgICAgICBzdHJlYW0uX3BlbmRpbmdBYm9ydFJlcXVlc3QgPSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIFdyaXRhYmxlU3RyZWFtRGVhbFdpdGhSZWplY3Rpb24oc3RyZWFtLCBlcnJvcik7XG59XG4vLyBUT0RPKHJpY2VhKTogRml4IGFscGhhYmV0aWNhbCBvcmRlci5cbmZ1bmN0aW9uIFdyaXRhYmxlU3RyZWFtQ2xvc2VRdWV1ZWRPckluRmxpZ2h0KHN0cmVhbSkge1xuICAgIGlmIChzdHJlYW0uX2Nsb3NlUmVxdWVzdCA9PT0gdW5kZWZpbmVkICYmIHN0cmVhbS5faW5GbGlnaHRDbG9zZVJlcXVlc3QgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xufVxuZnVuY3Rpb24gV3JpdGFibGVTdHJlYW1IYXNPcGVyYXRpb25NYXJrZWRJbkZsaWdodChzdHJlYW0pIHtcbiAgICBpZiAoc3RyZWFtLl9pbkZsaWdodFdyaXRlUmVxdWVzdCA9PT0gdW5kZWZpbmVkICYmIHN0cmVhbS5faW5GbGlnaHRDbG9zZVJlcXVlc3QgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xufVxuZnVuY3Rpb24gV3JpdGFibGVTdHJlYW1NYXJrQ2xvc2VSZXF1ZXN0SW5GbGlnaHQoc3RyZWFtKSB7XG4gICAgc3RyZWFtLl9pbkZsaWdodENsb3NlUmVxdWVzdCA9IHN0cmVhbS5fY2xvc2VSZXF1ZXN0O1xuICAgIHN0cmVhbS5fY2xvc2VSZXF1ZXN0ID0gdW5kZWZpbmVkO1xufVxuZnVuY3Rpb24gV3JpdGFibGVTdHJlYW1NYXJrRmlyc3RXcml0ZVJlcXVlc3RJbkZsaWdodChzdHJlYW0pIHtcbiAgICBzdHJlYW0uX2luRmxpZ2h0V3JpdGVSZXF1ZXN0ID0gc3RyZWFtLl93cml0ZVJlcXVlc3RzLnNoaWZ0KCk7XG59XG5mdW5jdGlvbiBXcml0YWJsZVN0cmVhbVJlamVjdENsb3NlQW5kQ2xvc2VkUHJvbWlzZUlmTmVlZGVkKHN0cmVhbSkge1xuICAgIGlmIChzdHJlYW0uX2Nsb3NlUmVxdWVzdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHN0cmVhbS5fY2xvc2VSZXF1ZXN0Ll9yZWplY3Qoc3RyZWFtLl9zdG9yZWRFcnJvcik7XG4gICAgICAgIHN0cmVhbS5fY2xvc2VSZXF1ZXN0ID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBjb25zdCB3cml0ZXIgPSBzdHJlYW0uX3dyaXRlcjtcbiAgICBpZiAod3JpdGVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgZGVmYXVsdFdyaXRlckNsb3NlZFByb21pc2VSZWplY3Qod3JpdGVyLCBzdHJlYW0uX3N0b3JlZEVycm9yKTtcbiAgICB9XG59XG5mdW5jdGlvbiBXcml0YWJsZVN0cmVhbVVwZGF0ZUJhY2twcmVzc3VyZShzdHJlYW0sIGJhY2twcmVzc3VyZSkge1xuICAgIGNvbnN0IHdyaXRlciA9IHN0cmVhbS5fd3JpdGVyO1xuICAgIGlmICh3cml0ZXIgIT09IHVuZGVmaW5lZCAmJiBiYWNrcHJlc3N1cmUgIT09IHN0cmVhbS5fYmFja3ByZXNzdXJlKSB7XG4gICAgICAgIGlmIChiYWNrcHJlc3N1cmUpIHtcbiAgICAgICAgICAgIGRlZmF1bHRXcml0ZXJSZWFkeVByb21pc2VSZXNldCh3cml0ZXIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZGVmYXVsdFdyaXRlclJlYWR5UHJvbWlzZVJlc29sdmUod3JpdGVyKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzdHJlYW0uX2JhY2twcmVzc3VyZSA9IGJhY2twcmVzc3VyZTtcbn1cbi8qKlxuICogQSBkZWZhdWx0IHdyaXRlciB2ZW5kZWQgYnkgYSB7QGxpbmsgV3JpdGFibGVTdHJlYW19LlxuICpcbiAqIEBwdWJsaWNcbiAqL1xuY2xhc3MgV3JpdGFibGVTdHJlYW1EZWZhdWx0V3JpdGVyIHtcbiAgICBjb25zdHJ1Y3RvcihzdHJlYW0pIHtcbiAgICAgICAgYXNzZXJ0UmVxdWlyZWRBcmd1bWVudChzdHJlYW0sIDEsICdXcml0YWJsZVN0cmVhbURlZmF1bHRXcml0ZXInKTtcbiAgICAgICAgYXNzZXJ0V3JpdGFibGVTdHJlYW0oc3RyZWFtLCAnRmlyc3QgcGFyYW1ldGVyJyk7XG4gICAgICAgIGlmIChJc1dyaXRhYmxlU3RyZWFtTG9ja2VkKHN0cmVhbSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoaXMgc3RyZWFtIGhhcyBhbHJlYWR5IGJlZW4gbG9ja2VkIGZvciBleGNsdXNpdmUgd3JpdGluZyBieSBhbm90aGVyIHdyaXRlcicpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX293bmVyV3JpdGFibGVTdHJlYW0gPSBzdHJlYW07XG4gICAgICAgIHN0cmVhbS5fd3JpdGVyID0gdGhpcztcbiAgICAgICAgY29uc3Qgc3RhdGUgPSBzdHJlYW0uX3N0YXRlO1xuICAgICAgICBpZiAoc3RhdGUgPT09ICd3cml0YWJsZScpIHtcbiAgICAgICAgICAgIGlmICghV3JpdGFibGVTdHJlYW1DbG9zZVF1ZXVlZE9ySW5GbGlnaHQoc3RyZWFtKSAmJiBzdHJlYW0uX2JhY2twcmVzc3VyZSkge1xuICAgICAgICAgICAgICAgIGRlZmF1bHRXcml0ZXJSZWFkeVByb21pc2VJbml0aWFsaXplKHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdFdyaXRlclJlYWR5UHJvbWlzZUluaXRpYWxpemVBc1Jlc29sdmVkKHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGVmYXVsdFdyaXRlckNsb3NlZFByb21pc2VJbml0aWFsaXplKHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHN0YXRlID09PSAnZXJyb3JpbmcnKSB7XG4gICAgICAgICAgICBkZWZhdWx0V3JpdGVyUmVhZHlQcm9taXNlSW5pdGlhbGl6ZUFzUmVqZWN0ZWQodGhpcywgc3RyZWFtLl9zdG9yZWRFcnJvcik7XG4gICAgICAgICAgICBkZWZhdWx0V3JpdGVyQ2xvc2VkUHJvbWlzZUluaXRpYWxpemUodGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoc3RhdGUgPT09ICdjbG9zZWQnKSB7XG4gICAgICAgICAgICBkZWZhdWx0V3JpdGVyUmVhZHlQcm9taXNlSW5pdGlhbGl6ZUFzUmVzb2x2ZWQodGhpcyk7XG4gICAgICAgICAgICBkZWZhdWx0V3JpdGVyQ2xvc2VkUHJvbWlzZUluaXRpYWxpemVBc1Jlc29sdmVkKHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc3Qgc3RvcmVkRXJyb3IgPSBzdHJlYW0uX3N0b3JlZEVycm9yO1xuICAgICAgICAgICAgZGVmYXVsdFdyaXRlclJlYWR5UHJvbWlzZUluaXRpYWxpemVBc1JlamVjdGVkKHRoaXMsIHN0b3JlZEVycm9yKTtcbiAgICAgICAgICAgIGRlZmF1bHRXcml0ZXJDbG9zZWRQcm9taXNlSW5pdGlhbGl6ZUFzUmVqZWN0ZWQodGhpcywgc3RvcmVkRXJyb3IpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBwcm9taXNlIHRoYXQgd2lsbCBiZSBmdWxmaWxsZWQgd2hlbiB0aGUgc3RyZWFtIGJlY29tZXMgY2xvc2VkLCBvciByZWplY3RlZCBpZiB0aGUgc3RyZWFtIGV2ZXIgZXJyb3JzIG9yXG4gICAgICogdGhlIHdyaXRlcuKAmXMgbG9jayBpcyByZWxlYXNlZCBiZWZvcmUgdGhlIHN0cmVhbSBmaW5pc2hlcyBjbG9zaW5nLlxuICAgICAqL1xuICAgIGdldCBjbG9zZWQoKSB7XG4gICAgICAgIGlmICghSXNXcml0YWJsZVN0cmVhbURlZmF1bHRXcml0ZXIodGhpcykpIHtcbiAgICAgICAgICAgIHJldHVybiBwcm9taXNlUmVqZWN0ZWRXaXRoKGRlZmF1bHRXcml0ZXJCcmFuZENoZWNrRXhjZXB0aW9uKCdjbG9zZWQnKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2Nsb3NlZFByb21pc2U7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGRlc2lyZWQgc2l6ZSB0byBmaWxsIHRoZSBzdHJlYW3igJlzIGludGVybmFsIHF1ZXVlLiBJdCBjYW4gYmUgbmVnYXRpdmUsIGlmIHRoZSBxdWV1ZSBpcyBvdmVyLWZ1bGwuXG4gICAgICogQSBwcm9kdWNlciBjYW4gdXNlIHRoaXMgaW5mb3JtYXRpb24gdG8gZGV0ZXJtaW5lIHRoZSByaWdodCBhbW91bnQgb2YgZGF0YSB0byB3cml0ZS5cbiAgICAgKlxuICAgICAqIEl0IHdpbGwgYmUgYG51bGxgIGlmIHRoZSBzdHJlYW0gY2Fubm90IGJlIHN1Y2Nlc3NmdWxseSB3cml0dGVuIHRvIChkdWUgdG8gZWl0aGVyIGJlaW5nIGVycm9yZWQsIG9yIGhhdmluZyBhbiBhYm9ydFxuICAgICAqIHF1ZXVlZCB1cCkuIEl0IHdpbGwgcmV0dXJuIHplcm8gaWYgdGhlIHN0cmVhbSBpcyBjbG9zZWQuIEFuZCB0aGUgZ2V0dGVyIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGludm9rZWQgd2hlblxuICAgICAqIHRoZSB3cml0ZXLigJlzIGxvY2sgaXMgcmVsZWFzZWQuXG4gICAgICovXG4gICAgZ2V0IGRlc2lyZWRTaXplKCkge1xuICAgICAgICBpZiAoIUlzV3JpdGFibGVTdHJlYW1EZWZhdWx0V3JpdGVyKHRoaXMpKSB7XG4gICAgICAgICAgICB0aHJvdyBkZWZhdWx0V3JpdGVyQnJhbmRDaGVja0V4Y2VwdGlvbignZGVzaXJlZFNpemUnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fb3duZXJXcml0YWJsZVN0cmVhbSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBkZWZhdWx0V3JpdGVyTG9ja0V4Y2VwdGlvbignZGVzaXJlZFNpemUnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gV3JpdGFibGVTdHJlYW1EZWZhdWx0V3JpdGVyR2V0RGVzaXJlZFNpemUodGhpcyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBwcm9taXNlIHRoYXQgd2lsbCBiZSBmdWxmaWxsZWQgd2hlbiB0aGUgZGVzaXJlZCBzaXplIHRvIGZpbGwgdGhlIHN0cmVhbeKAmXMgaW50ZXJuYWwgcXVldWUgdHJhbnNpdGlvbnNcbiAgICAgKiBmcm9tIG5vbi1wb3NpdGl2ZSB0byBwb3NpdGl2ZSwgc2lnbmFsaW5nIHRoYXQgaXQgaXMgbm8gbG9uZ2VyIGFwcGx5aW5nIGJhY2twcmVzc3VyZS4gT25jZSB0aGUgZGVzaXJlZCBzaXplIGRpcHNcbiAgICAgKiBiYWNrIHRvIHplcm8gb3IgYmVsb3csIHRoZSBnZXR0ZXIgd2lsbCByZXR1cm4gYSBuZXcgcHJvbWlzZSB0aGF0IHN0YXlzIHBlbmRpbmcgdW50aWwgdGhlIG5leHQgdHJhbnNpdGlvbi5cbiAgICAgKlxuICAgICAqIElmIHRoZSBzdHJlYW0gYmVjb21lcyBlcnJvcmVkIG9yIGFib3J0ZWQsIG9yIHRoZSB3cml0ZXLigJlzIGxvY2sgaXMgcmVsZWFzZWQsIHRoZSByZXR1cm5lZCBwcm9taXNlIHdpbGwgYmVjb21lXG4gICAgICogcmVqZWN0ZWQuXG4gICAgICovXG4gICAgZ2V0IHJlYWR5KCkge1xuICAgICAgICBpZiAoIUlzV3JpdGFibGVTdHJlYW1EZWZhdWx0V3JpdGVyKHRoaXMpKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJvbWlzZVJlamVjdGVkV2l0aChkZWZhdWx0V3JpdGVyQnJhbmRDaGVja0V4Y2VwdGlvbigncmVhZHknKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlYWR5UHJvbWlzZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSWYgdGhlIHJlYWRlciBpcyBhY3RpdmUsIGJlaGF2ZXMgdGhlIHNhbWUgYXMge0BsaW5rIFdyaXRhYmxlU3RyZWFtLmFib3J0IHwgc3RyZWFtLmFib3J0KHJlYXNvbil9LlxuICAgICAqL1xuICAgIGFib3J0KHJlYXNvbiA9IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAoIUlzV3JpdGFibGVTdHJlYW1EZWZhdWx0V3JpdGVyKHRoaXMpKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJvbWlzZVJlamVjdGVkV2l0aChkZWZhdWx0V3JpdGVyQnJhbmRDaGVja0V4Y2VwdGlvbignYWJvcnQnKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX293bmVyV3JpdGFibGVTdHJlYW0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIHByb21pc2VSZWplY3RlZFdpdGgoZGVmYXVsdFdyaXRlckxvY2tFeGNlcHRpb24oJ2Fib3J0JykpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBXcml0YWJsZVN0cmVhbURlZmF1bHRXcml0ZXJBYm9ydCh0aGlzLCByZWFzb24pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBJZiB0aGUgcmVhZGVyIGlzIGFjdGl2ZSwgYmVoYXZlcyB0aGUgc2FtZSBhcyB7QGxpbmsgV3JpdGFibGVTdHJlYW0uY2xvc2UgfCBzdHJlYW0uY2xvc2UoKX0uXG4gICAgICovXG4gICAgY2xvc2UoKSB7XG4gICAgICAgIGlmICghSXNXcml0YWJsZVN0cmVhbURlZmF1bHRXcml0ZXIodGhpcykpIHtcbiAgICAgICAgICAgIHJldHVybiBwcm9taXNlUmVqZWN0ZWRXaXRoKGRlZmF1bHRXcml0ZXJCcmFuZENoZWNrRXhjZXB0aW9uKCdjbG9zZScpKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzdHJlYW0gPSB0aGlzLl9vd25lcldyaXRhYmxlU3RyZWFtO1xuICAgICAgICBpZiAoc3RyZWFtID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBwcm9taXNlUmVqZWN0ZWRXaXRoKGRlZmF1bHRXcml0ZXJMb2NrRXhjZXB0aW9uKCdjbG9zZScpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoV3JpdGFibGVTdHJlYW1DbG9zZVF1ZXVlZE9ySW5GbGlnaHQoc3RyZWFtKSkge1xuICAgICAgICAgICAgcmV0dXJuIHByb21pc2VSZWplY3RlZFdpdGgobmV3IFR5cGVFcnJvcignQ2Fubm90IGNsb3NlIGFuIGFscmVhZHktY2xvc2luZyBzdHJlYW0nKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFdyaXRhYmxlU3RyZWFtRGVmYXVsdFdyaXRlckNsb3NlKHRoaXMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZWxlYXNlcyB0aGUgd3JpdGVy4oCZcyBsb2NrIG9uIHRoZSBjb3JyZXNwb25kaW5nIHN0cmVhbS4gQWZ0ZXIgdGhlIGxvY2sgaXMgcmVsZWFzZWQsIHRoZSB3cml0ZXIgaXMgbm8gbG9uZ2VyIGFjdGl2ZS5cbiAgICAgKiBJZiB0aGUgYXNzb2NpYXRlZCBzdHJlYW0gaXMgZXJyb3JlZCB3aGVuIHRoZSBsb2NrIGlzIHJlbGVhc2VkLCB0aGUgd3JpdGVyIHdpbGwgYXBwZWFyIGVycm9yZWQgaW4gdGhlIHNhbWUgd2F5IGZyb21cbiAgICAgKiBub3cgb247IG90aGVyd2lzZSwgdGhlIHdyaXRlciB3aWxsIGFwcGVhciBjbG9zZWQuXG4gICAgICpcbiAgICAgKiBOb3RlIHRoYXQgdGhlIGxvY2sgY2FuIHN0aWxsIGJlIHJlbGVhc2VkIGV2ZW4gaWYgc29tZSBvbmdvaW5nIHdyaXRlcyBoYXZlIG5vdCB5ZXQgZmluaXNoZWQgKGkuZS4gZXZlbiBpZiB0aGVcbiAgICAgKiBwcm9taXNlcyByZXR1cm5lZCBmcm9tIHByZXZpb3VzIGNhbGxzIHRvIHtAbGluayBXcml0YWJsZVN0cmVhbURlZmF1bHRXcml0ZXIud3JpdGUgfCB3cml0ZSgpfSBoYXZlIG5vdCB5ZXQgc2V0dGxlZCkuXG4gICAgICogSXTigJlzIG5vdCBuZWNlc3NhcnkgdG8gaG9sZCB0aGUgbG9jayBvbiB0aGUgd3JpdGVyIGZvciB0aGUgZHVyYXRpb24gb2YgdGhlIHdyaXRlOyB0aGUgbG9jayBpbnN0ZWFkIHNpbXBseSBwcmV2ZW50c1xuICAgICAqIG90aGVyIHByb2R1Y2VycyBmcm9tIHdyaXRpbmcgaW4gYW4gaW50ZXJsZWF2ZWQgbWFubmVyLlxuICAgICAqL1xuICAgIHJlbGVhc2VMb2NrKCkge1xuICAgICAgICBpZiAoIUlzV3JpdGFibGVTdHJlYW1EZWZhdWx0V3JpdGVyKHRoaXMpKSB7XG4gICAgICAgICAgICB0aHJvdyBkZWZhdWx0V3JpdGVyQnJhbmRDaGVja0V4Y2VwdGlvbigncmVsZWFzZUxvY2snKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzdHJlYW0gPSB0aGlzLl9vd25lcldyaXRhYmxlU3RyZWFtO1xuICAgICAgICBpZiAoc3RyZWFtID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBXcml0YWJsZVN0cmVhbURlZmF1bHRXcml0ZXJSZWxlYXNlKHRoaXMpO1xuICAgIH1cbiAgICB3cml0ZShjaHVuayA9IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAoIUlzV3JpdGFibGVTdHJlYW1EZWZhdWx0V3JpdGVyKHRoaXMpKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJvbWlzZVJlamVjdGVkV2l0aChkZWZhdWx0V3JpdGVyQnJhbmRDaGVja0V4Y2VwdGlvbignd3JpdGUnKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX293bmVyV3JpdGFibGVTdHJlYW0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIHByb21pc2VSZWplY3RlZFdpdGgoZGVmYXVsdFdyaXRlckxvY2tFeGNlcHRpb24oJ3dyaXRlIHRvJykpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBXcml0YWJsZVN0cmVhbURlZmF1bHRXcml0ZXJXcml0ZSh0aGlzLCBjaHVuayk7XG4gICAgfVxufVxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoV3JpdGFibGVTdHJlYW1EZWZhdWx0V3JpdGVyLnByb3RvdHlwZSwge1xuICAgIGFib3J0OiB7IGVudW1lcmFibGU6IHRydWUgfSxcbiAgICBjbG9zZTogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG4gICAgcmVsZWFzZUxvY2s6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxuICAgIHdyaXRlOiB7IGVudW1lcmFibGU6IHRydWUgfSxcbiAgICBjbG9zZWQ6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxuICAgIGRlc2lyZWRTaXplOiB7IGVudW1lcmFibGU6IHRydWUgfSxcbiAgICByZWFkeTogeyBlbnVtZXJhYmxlOiB0cnVlIH1cbn0pO1xuaWYgKHR5cGVvZiBTeW1ib2xQb2x5ZmlsbC50b1N0cmluZ1RhZyA9PT0gJ3N5bWJvbCcpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoV3JpdGFibGVTdHJlYW1EZWZhdWx0V3JpdGVyLnByb3RvdHlwZSwgU3ltYm9sUG9seWZpbGwudG9TdHJpbmdUYWcsIHtcbiAgICAgICAgdmFsdWU6ICdXcml0YWJsZVN0cmVhbURlZmF1bHRXcml0ZXInLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbn1cbi8vIEFic3RyYWN0IG9wZXJhdGlvbnMgZm9yIHRoZSBXcml0YWJsZVN0cmVhbURlZmF1bHRXcml0ZXIuXG5mdW5jdGlvbiBJc1dyaXRhYmxlU3RyZWFtRGVmYXVsdFdyaXRlcih4KSB7XG4gICAgaWYgKCF0eXBlSXNPYmplY3QoeCkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh4LCAnX293bmVyV3JpdGFibGVTdHJlYW0nKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB4IGluc3RhbmNlb2YgV3JpdGFibGVTdHJlYW1EZWZhdWx0V3JpdGVyO1xufVxuLy8gQSBjbGllbnQgb2YgV3JpdGFibGVTdHJlYW1EZWZhdWx0V3JpdGVyIG1heSB1c2UgdGhlc2UgZnVuY3Rpb25zIGRpcmVjdGx5IHRvIGJ5cGFzcyBzdGF0ZSBjaGVjay5cbmZ1bmN0aW9uIFdyaXRhYmxlU3RyZWFtRGVmYXVsdFdyaXRlckFib3J0KHdyaXRlciwgcmVhc29uKSB7XG4gICAgY29uc3Qgc3RyZWFtID0gd3JpdGVyLl9vd25lcldyaXRhYmxlU3RyZWFtO1xuICAgIHJldHVybiBXcml0YWJsZVN0cmVhbUFib3J0KHN0cmVhbSwgcmVhc29uKTtcbn1cbmZ1bmN0aW9uIFdyaXRhYmxlU3RyZWFtRGVmYXVsdFdyaXRlckNsb3NlKHdyaXRlcikge1xuICAgIGNvbnN0IHN0cmVhbSA9IHdyaXRlci5fb3duZXJXcml0YWJsZVN0cmVhbTtcbiAgICByZXR1cm4gV3JpdGFibGVTdHJlYW1DbG9zZShzdHJlYW0pO1xufVxuZnVuY3Rpb24gV3JpdGFibGVTdHJlYW1EZWZhdWx0V3JpdGVyQ2xvc2VXaXRoRXJyb3JQcm9wYWdhdGlvbih3cml0ZXIpIHtcbiAgICBjb25zdCBzdHJlYW0gPSB3cml0ZXIuX293bmVyV3JpdGFibGVTdHJlYW07XG4gICAgY29uc3Qgc3RhdGUgPSBzdHJlYW0uX3N0YXRlO1xuICAgIGlmIChXcml0YWJsZVN0cmVhbUNsb3NlUXVldWVkT3JJbkZsaWdodChzdHJlYW0pIHx8IHN0YXRlID09PSAnY2xvc2VkJykge1xuICAgICAgICByZXR1cm4gcHJvbWlzZVJlc29sdmVkV2l0aCh1bmRlZmluZWQpO1xuICAgIH1cbiAgICBpZiAoc3RhdGUgPT09ICdlcnJvcmVkJykge1xuICAgICAgICByZXR1cm4gcHJvbWlzZVJlamVjdGVkV2l0aChzdHJlYW0uX3N0b3JlZEVycm9yKTtcbiAgICB9XG4gICAgcmV0dXJuIFdyaXRhYmxlU3RyZWFtRGVmYXVsdFdyaXRlckNsb3NlKHdyaXRlcik7XG59XG5mdW5jdGlvbiBXcml0YWJsZVN0cmVhbURlZmF1bHRXcml0ZXJFbnN1cmVDbG9zZWRQcm9taXNlUmVqZWN0ZWQod3JpdGVyLCBlcnJvcikge1xuICAgIGlmICh3cml0ZXIuX2Nsb3NlZFByb21pc2VTdGF0ZSA9PT0gJ3BlbmRpbmcnKSB7XG4gICAgICAgIGRlZmF1bHRXcml0ZXJDbG9zZWRQcm9taXNlUmVqZWN0KHdyaXRlciwgZXJyb3IpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgZGVmYXVsdFdyaXRlckNsb3NlZFByb21pc2VSZXNldFRvUmVqZWN0ZWQod3JpdGVyLCBlcnJvcik7XG4gICAgfVxufVxuZnVuY3Rpb24gV3JpdGFibGVTdHJlYW1EZWZhdWx0V3JpdGVyRW5zdXJlUmVhZHlQcm9taXNlUmVqZWN0ZWQod3JpdGVyLCBlcnJvcikge1xuICAgIGlmICh3cml0ZXIuX3JlYWR5UHJvbWlzZVN0YXRlID09PSAncGVuZGluZycpIHtcbiAgICAgICAgZGVmYXVsdFdyaXRlclJlYWR5UHJvbWlzZVJlamVjdCh3cml0ZXIsIGVycm9yKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGRlZmF1bHRXcml0ZXJSZWFkeVByb21pc2VSZXNldFRvUmVqZWN0ZWQod3JpdGVyLCBlcnJvcik7XG4gICAgfVxufVxuZnVuY3Rpb24gV3JpdGFibGVTdHJlYW1EZWZhdWx0V3JpdGVyR2V0RGVzaXJlZFNpemUod3JpdGVyKSB7XG4gICAgY29uc3Qgc3RyZWFtID0gd3JpdGVyLl9vd25lcldyaXRhYmxlU3RyZWFtO1xuICAgIGNvbnN0IHN0YXRlID0gc3RyZWFtLl9zdGF0ZTtcbiAgICBpZiAoc3RhdGUgPT09ICdlcnJvcmVkJyB8fCBzdGF0ZSA9PT0gJ2Vycm9yaW5nJykge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgaWYgKHN0YXRlID09PSAnY2xvc2VkJykge1xuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgcmV0dXJuIFdyaXRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJHZXREZXNpcmVkU2l6ZShzdHJlYW0uX3dyaXRhYmxlU3RyZWFtQ29udHJvbGxlcik7XG59XG5mdW5jdGlvbiBXcml0YWJsZVN0cmVhbURlZmF1bHRXcml0ZXJSZWxlYXNlKHdyaXRlcikge1xuICAgIGNvbnN0IHN0cmVhbSA9IHdyaXRlci5fb3duZXJXcml0YWJsZVN0cmVhbTtcbiAgICBjb25zdCByZWxlYXNlZEVycm9yID0gbmV3IFR5cGVFcnJvcihgV3JpdGVyIHdhcyByZWxlYXNlZCBhbmQgY2FuIG5vIGxvbmdlciBiZSB1c2VkIHRvIG1vbml0b3IgdGhlIHN0cmVhbSdzIGNsb3NlZG5lc3NgKTtcbiAgICBXcml0YWJsZVN0cmVhbURlZmF1bHRXcml0ZXJFbnN1cmVSZWFkeVByb21pc2VSZWplY3RlZCh3cml0ZXIsIHJlbGVhc2VkRXJyb3IpO1xuICAgIC8vIFRoZSBzdGF0ZSB0cmFuc2l0aW9ucyB0byBcImVycm9yZWRcIiBiZWZvcmUgdGhlIHNpbmsgYWJvcnQoKSBtZXRob2QgcnVucywgYnV0IHRoZSB3cml0ZXIuY2xvc2VkIHByb21pc2UgaXMgbm90XG4gICAgLy8gcmVqZWN0ZWQgdW50aWwgYWZ0ZXJ3YXJkcy4gVGhpcyBtZWFucyB0aGF0IHNpbXBseSB0ZXN0aW5nIHN0YXRlIHdpbGwgbm90IHdvcmsuXG4gICAgV3JpdGFibGVTdHJlYW1EZWZhdWx0V3JpdGVyRW5zdXJlQ2xvc2VkUHJvbWlzZVJlamVjdGVkKHdyaXRlciwgcmVsZWFzZWRFcnJvcik7XG4gICAgc3RyZWFtLl93cml0ZXIgPSB1bmRlZmluZWQ7XG4gICAgd3JpdGVyLl9vd25lcldyaXRhYmxlU3RyZWFtID0gdW5kZWZpbmVkO1xufVxuZnVuY3Rpb24gV3JpdGFibGVTdHJlYW1EZWZhdWx0V3JpdGVyV3JpdGUod3JpdGVyLCBjaHVuaykge1xuICAgIGNvbnN0IHN0cmVhbSA9IHdyaXRlci5fb3duZXJXcml0YWJsZVN0cmVhbTtcbiAgICBjb25zdCBjb250cm9sbGVyID0gc3RyZWFtLl93cml0YWJsZVN0cmVhbUNvbnRyb2xsZXI7XG4gICAgY29uc3QgY2h1bmtTaXplID0gV3JpdGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckdldENodW5rU2l6ZShjb250cm9sbGVyLCBjaHVuayk7XG4gICAgaWYgKHN0cmVhbSAhPT0gd3JpdGVyLl9vd25lcldyaXRhYmxlU3RyZWFtKSB7XG4gICAgICAgIHJldHVybiBwcm9taXNlUmVqZWN0ZWRXaXRoKGRlZmF1bHRXcml0ZXJMb2NrRXhjZXB0aW9uKCd3cml0ZSB0bycpKTtcbiAgICB9XG4gICAgY29uc3Qgc3RhdGUgPSBzdHJlYW0uX3N0YXRlO1xuICAgIGlmIChzdGF0ZSA9PT0gJ2Vycm9yZWQnKSB7XG4gICAgICAgIHJldHVybiBwcm9taXNlUmVqZWN0ZWRXaXRoKHN0cmVhbS5fc3RvcmVkRXJyb3IpO1xuICAgIH1cbiAgICBpZiAoV3JpdGFibGVTdHJlYW1DbG9zZVF1ZXVlZE9ySW5GbGlnaHQoc3RyZWFtKSB8fCBzdGF0ZSA9PT0gJ2Nsb3NlZCcpIHtcbiAgICAgICAgcmV0dXJuIHByb21pc2VSZWplY3RlZFdpdGgobmV3IFR5cGVFcnJvcignVGhlIHN0cmVhbSBpcyBjbG9zaW5nIG9yIGNsb3NlZCBhbmQgY2Fubm90IGJlIHdyaXR0ZW4gdG8nKSk7XG4gICAgfVxuICAgIGlmIChzdGF0ZSA9PT0gJ2Vycm9yaW5nJykge1xuICAgICAgICByZXR1cm4gcHJvbWlzZVJlamVjdGVkV2l0aChzdHJlYW0uX3N0b3JlZEVycm9yKTtcbiAgICB9XG4gICAgY29uc3QgcHJvbWlzZSA9IFdyaXRhYmxlU3RyZWFtQWRkV3JpdGVSZXF1ZXN0KHN0cmVhbSk7XG4gICAgV3JpdGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlcldyaXRlKGNvbnRyb2xsZXIsIGNodW5rLCBjaHVua1NpemUpO1xuICAgIHJldHVybiBwcm9taXNlO1xufVxuY29uc3QgY2xvc2VTZW50aW5lbCA9IHt9O1xuLyoqXG4gKiBBbGxvd3MgY29udHJvbCBvZiBhIHtAbGluayBXcml0YWJsZVN0cmVhbSB8IHdyaXRhYmxlIHN0cmVhbX0ncyBzdGF0ZSBhbmQgaW50ZXJuYWwgcXVldWUuXG4gKlxuICogQHB1YmxpY1xuICovXG5jbGFzcyBXcml0YWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSWxsZWdhbCBjb25zdHJ1Y3RvcicpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgcmVhc29uIHdoaWNoIHdhcyBwYXNzZWQgdG8gYFdyaXRhYmxlU3RyZWFtLmFib3J0KHJlYXNvbilgIHdoZW4gdGhlIHN0cmVhbSB3YXMgYWJvcnRlZC5cbiAgICAgKlxuICAgICAqIEBkZXByZWNhdGVkXG4gICAgICogIFRoaXMgcHJvcGVydHkgaGFzIGJlZW4gcmVtb3ZlZCBmcm9tIHRoZSBzcGVjaWZpY2F0aW9uLCBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3doYXR3Zy9zdHJlYW1zL3B1bGwvMTE3Ny5cbiAgICAgKiAgVXNlIHtAbGluayBXcml0YWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyLnNpZ25hbH0ncyBgcmVhc29uYCBpbnN0ZWFkLlxuICAgICAqL1xuICAgIGdldCBhYm9ydFJlYXNvbigpIHtcbiAgICAgICAgaWYgKCFJc1dyaXRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXIodGhpcykpIHtcbiAgICAgICAgICAgIHRocm93IGRlZmF1bHRDb250cm9sbGVyQnJhbmRDaGVja0V4Y2VwdGlvbiQyKCdhYm9ydFJlYXNvbicpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9hYm9ydFJlYXNvbjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQW4gYEFib3J0U2lnbmFsYCB0aGF0IGNhbiBiZSB1c2VkIHRvIGFib3J0IHRoZSBwZW5kaW5nIHdyaXRlIG9yIGNsb3NlIG9wZXJhdGlvbiB3aGVuIHRoZSBzdHJlYW0gaXMgYWJvcnRlZC5cbiAgICAgKi9cbiAgICBnZXQgc2lnbmFsKCkge1xuICAgICAgICBpZiAoIUlzV3JpdGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlcih0aGlzKSkge1xuICAgICAgICAgICAgdGhyb3cgZGVmYXVsdENvbnRyb2xsZXJCcmFuZENoZWNrRXhjZXB0aW9uJDIoJ3NpZ25hbCcpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9hYm9ydENvbnRyb2xsZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgLy8gT2xkZXIgYnJvd3NlcnMgb3Igb2xkZXIgTm9kZSB2ZXJzaW9ucyBtYXkgbm90IHN1cHBvcnQgYEFib3J0Q29udHJvbGxlcmAgb3IgYEFib3J0U2lnbmFsYC5cbiAgICAgICAgICAgIC8vIFdlIGRvbid0IHdhbnQgdG8gYnVuZGxlIGFuZCBzaGlwIGFuIGBBYm9ydENvbnRyb2xsZXJgIHBvbHlmaWxsIHRvZ2V0aGVyIHdpdGggb3VyIHBvbHlmaWxsLFxuICAgICAgICAgICAgLy8gc28gaW5zdGVhZCB3ZSBvbmx5IGltcGxlbWVudCBzdXBwb3J0IGZvciBgc2lnbmFsYCBpZiB3ZSBmaW5kIGEgZ2xvYmFsIGBBYm9ydENvbnRyb2xsZXJgIGNvbnN0cnVjdG9yLlxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignV3JpdGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlci5wcm90b3R5cGUuc2lnbmFsIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fYWJvcnRDb250cm9sbGVyLnNpZ25hbDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2xvc2VzIHRoZSBjb250cm9sbGVkIHdyaXRhYmxlIHN0cmVhbSwgbWFraW5nIGFsbCBmdXR1cmUgaW50ZXJhY3Rpb25zIHdpdGggaXQgZmFpbCB3aXRoIHRoZSBnaXZlbiBlcnJvciBgZWAuXG4gICAgICpcbiAgICAgKiBUaGlzIG1ldGhvZCBpcyByYXJlbHkgdXNlZCwgc2luY2UgdXN1YWxseSBpdCBzdWZmaWNlcyB0byByZXR1cm4gYSByZWplY3RlZCBwcm9taXNlIGZyb20gb25lIG9mIHRoZSB1bmRlcmx5aW5nXG4gICAgICogc2luaydzIG1ldGhvZHMuIEhvd2V2ZXIsIGl0IGNhbiBiZSB1c2VmdWwgZm9yIHN1ZGRlbmx5IHNodXR0aW5nIGRvd24gYSBzdHJlYW0gaW4gcmVzcG9uc2UgdG8gYW4gZXZlbnQgb3V0c2lkZSB0aGVcbiAgICAgKiBub3JtYWwgbGlmZWN5Y2xlIG9mIGludGVyYWN0aW9ucyB3aXRoIHRoZSB1bmRlcmx5aW5nIHNpbmsuXG4gICAgICovXG4gICAgZXJyb3IoZSA9IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAoIUlzV3JpdGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlcih0aGlzKSkge1xuICAgICAgICAgICAgdGhyb3cgZGVmYXVsdENvbnRyb2xsZXJCcmFuZENoZWNrRXhjZXB0aW9uJDIoJ2Vycm9yJyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc3RhdGUgPSB0aGlzLl9jb250cm9sbGVkV3JpdGFibGVTdHJlYW0uX3N0YXRlO1xuICAgICAgICBpZiAoc3RhdGUgIT09ICd3cml0YWJsZScpIHtcbiAgICAgICAgICAgIC8vIFRoZSBzdHJlYW0gaXMgY2xvc2VkLCBlcnJvcmVkIG9yIHdpbGwgYmUgc29vbi4gVGhlIHNpbmsgY2FuJ3QgZG8gYW55dGhpbmcgdXNlZnVsIGlmIGl0IGdldHMgYW4gZXJyb3IgaGVyZSwgc29cbiAgICAgICAgICAgIC8vIGp1c3QgdHJlYXQgaXQgYXMgYSBuby1vcC5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBXcml0YWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyRXJyb3IodGhpcywgZSk7XG4gICAgfVxuICAgIC8qKiBAaW50ZXJuYWwgKi9cbiAgICBbQWJvcnRTdGVwc10ocmVhc29uKSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuX2Fib3J0QWxnb3JpdGhtKHJlYXNvbik7XG4gICAgICAgIFdyaXRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJDbGVhckFsZ29yaXRobXModGhpcyk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIC8qKiBAaW50ZXJuYWwgKi9cbiAgICBbRXJyb3JTdGVwc10oKSB7XG4gICAgICAgIFJlc2V0UXVldWUodGhpcyk7XG4gICAgfVxufVxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoV3JpdGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlci5wcm90b3R5cGUsIHtcbiAgICBhYm9ydFJlYXNvbjogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG4gICAgc2lnbmFsOiB7IGVudW1lcmFibGU6IHRydWUgfSxcbiAgICBlcnJvcjogeyBlbnVtZXJhYmxlOiB0cnVlIH1cbn0pO1xuaWYgKHR5cGVvZiBTeW1ib2xQb2x5ZmlsbC50b1N0cmluZ1RhZyA9PT0gJ3N5bWJvbCcpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoV3JpdGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlci5wcm90b3R5cGUsIFN5bWJvbFBvbHlmaWxsLnRvU3RyaW5nVGFnLCB7XG4gICAgICAgIHZhbHVlOiAnV3JpdGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlcicsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xufVxuLy8gQWJzdHJhY3Qgb3BlcmF0aW9ucyBpbXBsZW1lbnRpbmcgaW50ZXJmYWNlIHJlcXVpcmVkIGJ5IHRoZSBXcml0YWJsZVN0cmVhbS5cbmZ1bmN0aW9uIElzV3JpdGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlcih4KSB7XG4gICAgaWYgKCF0eXBlSXNPYmplY3QoeCkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh4LCAnX2NvbnRyb2xsZWRXcml0YWJsZVN0cmVhbScpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHggaW5zdGFuY2VvZiBXcml0YWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyO1xufVxuZnVuY3Rpb24gU2V0VXBXcml0YWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyKHN0cmVhbSwgY29udHJvbGxlciwgc3RhcnRBbGdvcml0aG0sIHdyaXRlQWxnb3JpdGhtLCBjbG9zZUFsZ29yaXRobSwgYWJvcnRBbGdvcml0aG0sIGhpZ2hXYXRlck1hcmssIHNpemVBbGdvcml0aG0pIHtcbiAgICBjb250cm9sbGVyLl9jb250cm9sbGVkV3JpdGFibGVTdHJlYW0gPSBzdHJlYW07XG4gICAgc3RyZWFtLl93cml0YWJsZVN0cmVhbUNvbnRyb2xsZXIgPSBjb250cm9sbGVyO1xuICAgIC8vIE5lZWQgdG8gc2V0IHRoZSBzbG90cyBzbyB0aGF0IHRoZSBhc3NlcnQgZG9lc24ndCBmaXJlLiBJbiB0aGUgc3BlYyB0aGUgc2xvdHMgYWxyZWFkeSBleGlzdCBpbXBsaWNpdGx5LlxuICAgIGNvbnRyb2xsZXIuX3F1ZXVlID0gdW5kZWZpbmVkO1xuICAgIGNvbnRyb2xsZXIuX3F1ZXVlVG90YWxTaXplID0gdW5kZWZpbmVkO1xuICAgIFJlc2V0UXVldWUoY29udHJvbGxlcik7XG4gICAgY29udHJvbGxlci5fYWJvcnRSZWFzb24gPSB1bmRlZmluZWQ7XG4gICAgY29udHJvbGxlci5fYWJvcnRDb250cm9sbGVyID0gY3JlYXRlQWJvcnRDb250cm9sbGVyKCk7XG4gICAgY29udHJvbGxlci5fc3RhcnRlZCA9IGZhbHNlO1xuICAgIGNvbnRyb2xsZXIuX3N0cmF0ZWd5U2l6ZUFsZ29yaXRobSA9IHNpemVBbGdvcml0aG07XG4gICAgY29udHJvbGxlci5fc3RyYXRlZ3lIV00gPSBoaWdoV2F0ZXJNYXJrO1xuICAgIGNvbnRyb2xsZXIuX3dyaXRlQWxnb3JpdGhtID0gd3JpdGVBbGdvcml0aG07XG4gICAgY29udHJvbGxlci5fY2xvc2VBbGdvcml0aG0gPSBjbG9zZUFsZ29yaXRobTtcbiAgICBjb250cm9sbGVyLl9hYm9ydEFsZ29yaXRobSA9IGFib3J0QWxnb3JpdGhtO1xuICAgIGNvbnN0IGJhY2twcmVzc3VyZSA9IFdyaXRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJHZXRCYWNrcHJlc3N1cmUoY29udHJvbGxlcik7XG4gICAgV3JpdGFibGVTdHJlYW1VcGRhdGVCYWNrcHJlc3N1cmUoc3RyZWFtLCBiYWNrcHJlc3N1cmUpO1xuICAgIGNvbnN0IHN0YXJ0UmVzdWx0ID0gc3RhcnRBbGdvcml0aG0oKTtcbiAgICBjb25zdCBzdGFydFByb21pc2UgPSBwcm9taXNlUmVzb2x2ZWRXaXRoKHN0YXJ0UmVzdWx0KTtcbiAgICB1cG9uUHJvbWlzZShzdGFydFByb21pc2UsICgpID0+IHtcbiAgICAgICAgY29udHJvbGxlci5fc3RhcnRlZCA9IHRydWU7XG4gICAgICAgIFdyaXRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJBZHZhbmNlUXVldWVJZk5lZWRlZChjb250cm9sbGVyKTtcbiAgICB9LCByID0+IHtcbiAgICAgICAgY29udHJvbGxlci5fc3RhcnRlZCA9IHRydWU7XG4gICAgICAgIFdyaXRhYmxlU3RyZWFtRGVhbFdpdGhSZWplY3Rpb24oc3RyZWFtLCByKTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIFNldFVwV3JpdGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckZyb21VbmRlcmx5aW5nU2luayhzdHJlYW0sIHVuZGVybHlpbmdTaW5rLCBoaWdoV2F0ZXJNYXJrLCBzaXplQWxnb3JpdGhtKSB7XG4gICAgY29uc3QgY29udHJvbGxlciA9IE9iamVjdC5jcmVhdGUoV3JpdGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlci5wcm90b3R5cGUpO1xuICAgIGxldCBzdGFydEFsZ29yaXRobSA9ICgpID0+IHVuZGVmaW5lZDtcbiAgICBsZXQgd3JpdGVBbGdvcml0aG0gPSAoKSA9PiBwcm9taXNlUmVzb2x2ZWRXaXRoKHVuZGVmaW5lZCk7XG4gICAgbGV0IGNsb3NlQWxnb3JpdGhtID0gKCkgPT4gcHJvbWlzZVJlc29sdmVkV2l0aCh1bmRlZmluZWQpO1xuICAgIGxldCBhYm9ydEFsZ29yaXRobSA9ICgpID0+IHByb21pc2VSZXNvbHZlZFdpdGgodW5kZWZpbmVkKTtcbiAgICBpZiAodW5kZXJseWluZ1Npbmsuc3RhcnQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBzdGFydEFsZ29yaXRobSA9ICgpID0+IHVuZGVybHlpbmdTaW5rLnN0YXJ0KGNvbnRyb2xsZXIpO1xuICAgIH1cbiAgICBpZiAodW5kZXJseWluZ1Npbmsud3JpdGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB3cml0ZUFsZ29yaXRobSA9IGNodW5rID0+IHVuZGVybHlpbmdTaW5rLndyaXRlKGNodW5rLCBjb250cm9sbGVyKTtcbiAgICB9XG4gICAgaWYgKHVuZGVybHlpbmdTaW5rLmNsb3NlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY2xvc2VBbGdvcml0aG0gPSAoKSA9PiB1bmRlcmx5aW5nU2luay5jbG9zZSgpO1xuICAgIH1cbiAgICBpZiAodW5kZXJseWluZ1NpbmsuYWJvcnQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBhYm9ydEFsZ29yaXRobSA9IHJlYXNvbiA9PiB1bmRlcmx5aW5nU2luay5hYm9ydChyZWFzb24pO1xuICAgIH1cbiAgICBTZXRVcFdyaXRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXIoc3RyZWFtLCBjb250cm9sbGVyLCBzdGFydEFsZ29yaXRobSwgd3JpdGVBbGdvcml0aG0sIGNsb3NlQWxnb3JpdGhtLCBhYm9ydEFsZ29yaXRobSwgaGlnaFdhdGVyTWFyaywgc2l6ZUFsZ29yaXRobSk7XG59XG4vLyBDbGVhckFsZ29yaXRobXMgbWF5IGJlIGNhbGxlZCB0d2ljZS4gRXJyb3JpbmcgdGhlIHNhbWUgc3RyZWFtIGluIG11bHRpcGxlIHdheXMgd2lsbCBvZnRlbiByZXN1bHQgaW4gcmVkdW5kYW50IGNhbGxzLlxuZnVuY3Rpb24gV3JpdGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckNsZWFyQWxnb3JpdGhtcyhjb250cm9sbGVyKSB7XG4gICAgY29udHJvbGxlci5fd3JpdGVBbGdvcml0aG0gPSB1bmRlZmluZWQ7XG4gICAgY29udHJvbGxlci5fY2xvc2VBbGdvcml0aG0gPSB1bmRlZmluZWQ7XG4gICAgY29udHJvbGxlci5fYWJvcnRBbGdvcml0aG0gPSB1bmRlZmluZWQ7XG4gICAgY29udHJvbGxlci5fc3RyYXRlZ3lTaXplQWxnb3JpdGhtID0gdW5kZWZpbmVkO1xufVxuZnVuY3Rpb24gV3JpdGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckNsb3NlKGNvbnRyb2xsZXIpIHtcbiAgICBFbnF1ZXVlVmFsdWVXaXRoU2l6ZShjb250cm9sbGVyLCBjbG9zZVNlbnRpbmVsLCAwKTtcbiAgICBXcml0YWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyQWR2YW5jZVF1ZXVlSWZOZWVkZWQoY29udHJvbGxlcik7XG59XG5mdW5jdGlvbiBXcml0YWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyR2V0Q2h1bmtTaXplKGNvbnRyb2xsZXIsIGNodW5rKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIGNvbnRyb2xsZXIuX3N0cmF0ZWd5U2l6ZUFsZ29yaXRobShjaHVuayk7XG4gICAgfVxuICAgIGNhdGNoIChjaHVua1NpemVFKSB7XG4gICAgICAgIFdyaXRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJFcnJvcklmTmVlZGVkKGNvbnRyb2xsZXIsIGNodW5rU2l6ZUUpO1xuICAgICAgICByZXR1cm4gMTtcbiAgICB9XG59XG5mdW5jdGlvbiBXcml0YWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyR2V0RGVzaXJlZFNpemUoY29udHJvbGxlcikge1xuICAgIHJldHVybiBjb250cm9sbGVyLl9zdHJhdGVneUhXTSAtIGNvbnRyb2xsZXIuX3F1ZXVlVG90YWxTaXplO1xufVxuZnVuY3Rpb24gV3JpdGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlcldyaXRlKGNvbnRyb2xsZXIsIGNodW5rLCBjaHVua1NpemUpIHtcbiAgICB0cnkge1xuICAgICAgICBFbnF1ZXVlVmFsdWVXaXRoU2l6ZShjb250cm9sbGVyLCBjaHVuaywgY2h1bmtTaXplKTtcbiAgICB9XG4gICAgY2F0Y2ggKGVucXVldWVFKSB7XG4gICAgICAgIFdyaXRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJFcnJvcklmTmVlZGVkKGNvbnRyb2xsZXIsIGVucXVldWVFKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBzdHJlYW0gPSBjb250cm9sbGVyLl9jb250cm9sbGVkV3JpdGFibGVTdHJlYW07XG4gICAgaWYgKCFXcml0YWJsZVN0cmVhbUNsb3NlUXVldWVkT3JJbkZsaWdodChzdHJlYW0pICYmIHN0cmVhbS5fc3RhdGUgPT09ICd3cml0YWJsZScpIHtcbiAgICAgICAgY29uc3QgYmFja3ByZXNzdXJlID0gV3JpdGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckdldEJhY2twcmVzc3VyZShjb250cm9sbGVyKTtcbiAgICAgICAgV3JpdGFibGVTdHJlYW1VcGRhdGVCYWNrcHJlc3N1cmUoc3RyZWFtLCBiYWNrcHJlc3N1cmUpO1xuICAgIH1cbiAgICBXcml0YWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyQWR2YW5jZVF1ZXVlSWZOZWVkZWQoY29udHJvbGxlcik7XG59XG4vLyBBYnN0cmFjdCBvcGVyYXRpb25zIGZvciB0aGUgV3JpdGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlci5cbmZ1bmN0aW9uIFdyaXRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJBZHZhbmNlUXVldWVJZk5lZWRlZChjb250cm9sbGVyKSB7XG4gICAgY29uc3Qgc3RyZWFtID0gY29udHJvbGxlci5fY29udHJvbGxlZFdyaXRhYmxlU3RyZWFtO1xuICAgIGlmICghY29udHJvbGxlci5fc3RhcnRlZCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChzdHJlYW0uX2luRmxpZ2h0V3JpdGVSZXF1ZXN0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBzdGF0ZSA9IHN0cmVhbS5fc3RhdGU7XG4gICAgaWYgKHN0YXRlID09PSAnZXJyb3JpbmcnKSB7XG4gICAgICAgIFdyaXRhYmxlU3RyZWFtRmluaXNoRXJyb3Jpbmcoc3RyZWFtKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoY29udHJvbGxlci5fcXVldWUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgdmFsdWUgPSBQZWVrUXVldWVWYWx1ZShjb250cm9sbGVyKTtcbiAgICBpZiAodmFsdWUgPT09IGNsb3NlU2VudGluZWwpIHtcbiAgICAgICAgV3JpdGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlclByb2Nlc3NDbG9zZShjb250cm9sbGVyKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIFdyaXRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJQcm9jZXNzV3JpdGUoY29udHJvbGxlciwgdmFsdWUpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIFdyaXRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJFcnJvcklmTmVlZGVkKGNvbnRyb2xsZXIsIGVycm9yKSB7XG4gICAgaWYgKGNvbnRyb2xsZXIuX2NvbnRyb2xsZWRXcml0YWJsZVN0cmVhbS5fc3RhdGUgPT09ICd3cml0YWJsZScpIHtcbiAgICAgICAgV3JpdGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckVycm9yKGNvbnRyb2xsZXIsIGVycm9yKTtcbiAgICB9XG59XG5mdW5jdGlvbiBXcml0YWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyUHJvY2Vzc0Nsb3NlKGNvbnRyb2xsZXIpIHtcbiAgICBjb25zdCBzdHJlYW0gPSBjb250cm9sbGVyLl9jb250cm9sbGVkV3JpdGFibGVTdHJlYW07XG4gICAgV3JpdGFibGVTdHJlYW1NYXJrQ2xvc2VSZXF1ZXN0SW5GbGlnaHQoc3RyZWFtKTtcbiAgICBEZXF1ZXVlVmFsdWUoY29udHJvbGxlcik7XG4gICAgY29uc3Qgc2lua0Nsb3NlUHJvbWlzZSA9IGNvbnRyb2xsZXIuX2Nsb3NlQWxnb3JpdGhtKCk7XG4gICAgV3JpdGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckNsZWFyQWxnb3JpdGhtcyhjb250cm9sbGVyKTtcbiAgICB1cG9uUHJvbWlzZShzaW5rQ2xvc2VQcm9taXNlLCAoKSA9PiB7XG4gICAgICAgIFdyaXRhYmxlU3RyZWFtRmluaXNoSW5GbGlnaHRDbG9zZShzdHJlYW0pO1xuICAgIH0sIHJlYXNvbiA9PiB7XG4gICAgICAgIFdyaXRhYmxlU3RyZWFtRmluaXNoSW5GbGlnaHRDbG9zZVdpdGhFcnJvcihzdHJlYW0sIHJlYXNvbik7XG4gICAgfSk7XG59XG5mdW5jdGlvbiBXcml0YWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyUHJvY2Vzc1dyaXRlKGNvbnRyb2xsZXIsIGNodW5rKSB7XG4gICAgY29uc3Qgc3RyZWFtID0gY29udHJvbGxlci5fY29udHJvbGxlZFdyaXRhYmxlU3RyZWFtO1xuICAgIFdyaXRhYmxlU3RyZWFtTWFya0ZpcnN0V3JpdGVSZXF1ZXN0SW5GbGlnaHQoc3RyZWFtKTtcbiAgICBjb25zdCBzaW5rV3JpdGVQcm9taXNlID0gY29udHJvbGxlci5fd3JpdGVBbGdvcml0aG0oY2h1bmspO1xuICAgIHVwb25Qcm9taXNlKHNpbmtXcml0ZVByb21pc2UsICgpID0+IHtcbiAgICAgICAgV3JpdGFibGVTdHJlYW1GaW5pc2hJbkZsaWdodFdyaXRlKHN0cmVhbSk7XG4gICAgICAgIGNvbnN0IHN0YXRlID0gc3RyZWFtLl9zdGF0ZTtcbiAgICAgICAgRGVxdWV1ZVZhbHVlKGNvbnRyb2xsZXIpO1xuICAgICAgICBpZiAoIVdyaXRhYmxlU3RyZWFtQ2xvc2VRdWV1ZWRPckluRmxpZ2h0KHN0cmVhbSkgJiYgc3RhdGUgPT09ICd3cml0YWJsZScpIHtcbiAgICAgICAgICAgIGNvbnN0IGJhY2twcmVzc3VyZSA9IFdyaXRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJHZXRCYWNrcHJlc3N1cmUoY29udHJvbGxlcik7XG4gICAgICAgICAgICBXcml0YWJsZVN0cmVhbVVwZGF0ZUJhY2twcmVzc3VyZShzdHJlYW0sIGJhY2twcmVzc3VyZSk7XG4gICAgICAgIH1cbiAgICAgICAgV3JpdGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckFkdmFuY2VRdWV1ZUlmTmVlZGVkKGNvbnRyb2xsZXIpO1xuICAgIH0sIHJlYXNvbiA9PiB7XG4gICAgICAgIGlmIChzdHJlYW0uX3N0YXRlID09PSAnd3JpdGFibGUnKSB7XG4gICAgICAgICAgICBXcml0YWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyQ2xlYXJBbGdvcml0aG1zKGNvbnRyb2xsZXIpO1xuICAgICAgICB9XG4gICAgICAgIFdyaXRhYmxlU3RyZWFtRmluaXNoSW5GbGlnaHRXcml0ZVdpdGhFcnJvcihzdHJlYW0sIHJlYXNvbik7XG4gICAgfSk7XG59XG5mdW5jdGlvbiBXcml0YWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyR2V0QmFja3ByZXNzdXJlKGNvbnRyb2xsZXIpIHtcbiAgICBjb25zdCBkZXNpcmVkU2l6ZSA9IFdyaXRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJHZXREZXNpcmVkU2l6ZShjb250cm9sbGVyKTtcbiAgICByZXR1cm4gZGVzaXJlZFNpemUgPD0gMDtcbn1cbi8vIEEgY2xpZW50IG9mIFdyaXRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXIgbWF5IHVzZSB0aGVzZSBmdW5jdGlvbnMgZGlyZWN0bHkgdG8gYnlwYXNzIHN0YXRlIGNoZWNrLlxuZnVuY3Rpb24gV3JpdGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckVycm9yKGNvbnRyb2xsZXIsIGVycm9yKSB7XG4gICAgY29uc3Qgc3RyZWFtID0gY29udHJvbGxlci5fY29udHJvbGxlZFdyaXRhYmxlU3RyZWFtO1xuICAgIFdyaXRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJDbGVhckFsZ29yaXRobXMoY29udHJvbGxlcik7XG4gICAgV3JpdGFibGVTdHJlYW1TdGFydEVycm9yaW5nKHN0cmVhbSwgZXJyb3IpO1xufVxuLy8gSGVscGVyIGZ1bmN0aW9ucyBmb3IgdGhlIFdyaXRhYmxlU3RyZWFtLlxuZnVuY3Rpb24gc3RyZWFtQnJhbmRDaGVja0V4Y2VwdGlvbiQyKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IFR5cGVFcnJvcihgV3JpdGFibGVTdHJlYW0ucHJvdG90eXBlLiR7bmFtZX0gY2FuIG9ubHkgYmUgdXNlZCBvbiBhIFdyaXRhYmxlU3RyZWFtYCk7XG59XG4vLyBIZWxwZXIgZnVuY3Rpb25zIGZvciB0aGUgV3JpdGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlci5cbmZ1bmN0aW9uIGRlZmF1bHRDb250cm9sbGVyQnJhbmRDaGVja0V4Y2VwdGlvbiQyKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IFR5cGVFcnJvcihgV3JpdGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlci5wcm90b3R5cGUuJHtuYW1lfSBjYW4gb25seSBiZSB1c2VkIG9uIGEgV3JpdGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlcmApO1xufVxuLy8gSGVscGVyIGZ1bmN0aW9ucyBmb3IgdGhlIFdyaXRhYmxlU3RyZWFtRGVmYXVsdFdyaXRlci5cbmZ1bmN0aW9uIGRlZmF1bHRXcml0ZXJCcmFuZENoZWNrRXhjZXB0aW9uKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IFR5cGVFcnJvcihgV3JpdGFibGVTdHJlYW1EZWZhdWx0V3JpdGVyLnByb3RvdHlwZS4ke25hbWV9IGNhbiBvbmx5IGJlIHVzZWQgb24gYSBXcml0YWJsZVN0cmVhbURlZmF1bHRXcml0ZXJgKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRXcml0ZXJMb2NrRXhjZXB0aW9uKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IFR5cGVFcnJvcignQ2Fubm90ICcgKyBuYW1lICsgJyBhIHN0cmVhbSB1c2luZyBhIHJlbGVhc2VkIHdyaXRlcicpO1xufVxuZnVuY3Rpb24gZGVmYXVsdFdyaXRlckNsb3NlZFByb21pc2VJbml0aWFsaXplKHdyaXRlcikge1xuICAgIHdyaXRlci5fY2xvc2VkUHJvbWlzZSA9IG5ld1Byb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICB3cml0ZXIuX2Nsb3NlZFByb21pc2VfcmVzb2x2ZSA9IHJlc29sdmU7XG4gICAgICAgIHdyaXRlci5fY2xvc2VkUHJvbWlzZV9yZWplY3QgPSByZWplY3Q7XG4gICAgICAgIHdyaXRlci5fY2xvc2VkUHJvbWlzZVN0YXRlID0gJ3BlbmRpbmcnO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gZGVmYXVsdFdyaXRlckNsb3NlZFByb21pc2VJbml0aWFsaXplQXNSZWplY3RlZCh3cml0ZXIsIHJlYXNvbikge1xuICAgIGRlZmF1bHRXcml0ZXJDbG9zZWRQcm9taXNlSW5pdGlhbGl6ZSh3cml0ZXIpO1xuICAgIGRlZmF1bHRXcml0ZXJDbG9zZWRQcm9taXNlUmVqZWN0KHdyaXRlciwgcmVhc29uKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRXcml0ZXJDbG9zZWRQcm9taXNlSW5pdGlhbGl6ZUFzUmVzb2x2ZWQod3JpdGVyKSB7XG4gICAgZGVmYXVsdFdyaXRlckNsb3NlZFByb21pc2VJbml0aWFsaXplKHdyaXRlcik7XG4gICAgZGVmYXVsdFdyaXRlckNsb3NlZFByb21pc2VSZXNvbHZlKHdyaXRlcik7XG59XG5mdW5jdGlvbiBkZWZhdWx0V3JpdGVyQ2xvc2VkUHJvbWlzZVJlamVjdCh3cml0ZXIsIHJlYXNvbikge1xuICAgIGlmICh3cml0ZXIuX2Nsb3NlZFByb21pc2VfcmVqZWN0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBzZXRQcm9taXNlSXNIYW5kbGVkVG9UcnVlKHdyaXRlci5fY2xvc2VkUHJvbWlzZSk7XG4gICAgd3JpdGVyLl9jbG9zZWRQcm9taXNlX3JlamVjdChyZWFzb24pO1xuICAgIHdyaXRlci5fY2xvc2VkUHJvbWlzZV9yZXNvbHZlID0gdW5kZWZpbmVkO1xuICAgIHdyaXRlci5fY2xvc2VkUHJvbWlzZV9yZWplY3QgPSB1bmRlZmluZWQ7XG4gICAgd3JpdGVyLl9jbG9zZWRQcm9taXNlU3RhdGUgPSAncmVqZWN0ZWQnO1xufVxuZnVuY3Rpb24gZGVmYXVsdFdyaXRlckNsb3NlZFByb21pc2VSZXNldFRvUmVqZWN0ZWQod3JpdGVyLCByZWFzb24pIHtcbiAgICBkZWZhdWx0V3JpdGVyQ2xvc2VkUHJvbWlzZUluaXRpYWxpemVBc1JlamVjdGVkKHdyaXRlciwgcmVhc29uKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRXcml0ZXJDbG9zZWRQcm9taXNlUmVzb2x2ZSh3cml0ZXIpIHtcbiAgICBpZiAod3JpdGVyLl9jbG9zZWRQcm9taXNlX3Jlc29sdmUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHdyaXRlci5fY2xvc2VkUHJvbWlzZV9yZXNvbHZlKHVuZGVmaW5lZCk7XG4gICAgd3JpdGVyLl9jbG9zZWRQcm9taXNlX3Jlc29sdmUgPSB1bmRlZmluZWQ7XG4gICAgd3JpdGVyLl9jbG9zZWRQcm9taXNlX3JlamVjdCA9IHVuZGVmaW5lZDtcbiAgICB3cml0ZXIuX2Nsb3NlZFByb21pc2VTdGF0ZSA9ICdyZXNvbHZlZCc7XG59XG5mdW5jdGlvbiBkZWZhdWx0V3JpdGVyUmVhZHlQcm9taXNlSW5pdGlhbGl6ZSh3cml0ZXIpIHtcbiAgICB3cml0ZXIuX3JlYWR5UHJvbWlzZSA9IG5ld1Byb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICB3cml0ZXIuX3JlYWR5UHJvbWlzZV9yZXNvbHZlID0gcmVzb2x2ZTtcbiAgICAgICAgd3JpdGVyLl9yZWFkeVByb21pc2VfcmVqZWN0ID0gcmVqZWN0O1xuICAgIH0pO1xuICAgIHdyaXRlci5fcmVhZHlQcm9taXNlU3RhdGUgPSAncGVuZGluZyc7XG59XG5mdW5jdGlvbiBkZWZhdWx0V3JpdGVyUmVhZHlQcm9taXNlSW5pdGlhbGl6ZUFzUmVqZWN0ZWQod3JpdGVyLCByZWFzb24pIHtcbiAgICBkZWZhdWx0V3JpdGVyUmVhZHlQcm9taXNlSW5pdGlhbGl6ZSh3cml0ZXIpO1xuICAgIGRlZmF1bHRXcml0ZXJSZWFkeVByb21pc2VSZWplY3Qod3JpdGVyLCByZWFzb24pO1xufVxuZnVuY3Rpb24gZGVmYXVsdFdyaXRlclJlYWR5UHJvbWlzZUluaXRpYWxpemVBc1Jlc29sdmVkKHdyaXRlcikge1xuICAgIGRlZmF1bHRXcml0ZXJSZWFkeVByb21pc2VJbml0aWFsaXplKHdyaXRlcik7XG4gICAgZGVmYXVsdFdyaXRlclJlYWR5UHJvbWlzZVJlc29sdmUod3JpdGVyKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRXcml0ZXJSZWFkeVByb21pc2VSZWplY3Qod3JpdGVyLCByZWFzb24pIHtcbiAgICBpZiAod3JpdGVyLl9yZWFkeVByb21pc2VfcmVqZWN0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBzZXRQcm9taXNlSXNIYW5kbGVkVG9UcnVlKHdyaXRlci5fcmVhZHlQcm9taXNlKTtcbiAgICB3cml0ZXIuX3JlYWR5UHJvbWlzZV9yZWplY3QocmVhc29uKTtcbiAgICB3cml0ZXIuX3JlYWR5UHJvbWlzZV9yZXNvbHZlID0gdW5kZWZpbmVkO1xuICAgIHdyaXRlci5fcmVhZHlQcm9taXNlX3JlamVjdCA9IHVuZGVmaW5lZDtcbiAgICB3cml0ZXIuX3JlYWR5UHJvbWlzZVN0YXRlID0gJ3JlamVjdGVkJztcbn1cbmZ1bmN0aW9uIGRlZmF1bHRXcml0ZXJSZWFkeVByb21pc2VSZXNldCh3cml0ZXIpIHtcbiAgICBkZWZhdWx0V3JpdGVyUmVhZHlQcm9taXNlSW5pdGlhbGl6ZSh3cml0ZXIpO1xufVxuZnVuY3Rpb24gZGVmYXVsdFdyaXRlclJlYWR5UHJvbWlzZVJlc2V0VG9SZWplY3RlZCh3cml0ZXIsIHJlYXNvbikge1xuICAgIGRlZmF1bHRXcml0ZXJSZWFkeVByb21pc2VJbml0aWFsaXplQXNSZWplY3RlZCh3cml0ZXIsIHJlYXNvbik7XG59XG5mdW5jdGlvbiBkZWZhdWx0V3JpdGVyUmVhZHlQcm9taXNlUmVzb2x2ZSh3cml0ZXIpIHtcbiAgICBpZiAod3JpdGVyLl9yZWFkeVByb21pc2VfcmVzb2x2ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgd3JpdGVyLl9yZWFkeVByb21pc2VfcmVzb2x2ZSh1bmRlZmluZWQpO1xuICAgIHdyaXRlci5fcmVhZHlQcm9taXNlX3Jlc29sdmUgPSB1bmRlZmluZWQ7XG4gICAgd3JpdGVyLl9yZWFkeVByb21pc2VfcmVqZWN0ID0gdW5kZWZpbmVkO1xuICAgIHdyaXRlci5fcmVhZHlQcm9taXNlU3RhdGUgPSAnZnVsZmlsbGVkJztcbn1cblxuLy8vIDxyZWZlcmVuY2UgbGliPVwiZG9tXCIgLz5cbmNvbnN0IE5hdGl2ZURPTUV4Y2VwdGlvbiA9IHR5cGVvZiBET01FeGNlcHRpb24gIT09ICd1bmRlZmluZWQnID8gRE9NRXhjZXB0aW9uIDogdW5kZWZpbmVkO1xuXG4vLy8gPHJlZmVyZW5jZSB0eXBlcz1cIm5vZGVcIiAvPlxuZnVuY3Rpb24gaXNET01FeGNlcHRpb25Db25zdHJ1Y3RvcihjdG9yKSB7XG4gICAgaWYgKCEodHlwZW9mIGN0b3IgPT09ICdmdW5jdGlvbicgfHwgdHlwZW9mIGN0b3IgPT09ICdvYmplY3QnKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIG5ldyBjdG9yKCk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBjYXRjaCAoX2EpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGNyZWF0ZURPTUV4Y2VwdGlvblBvbHlmaWxsKCkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zaGFkb3dcbiAgICBjb25zdCBjdG9yID0gZnVuY3Rpb24gRE9NRXhjZXB0aW9uKG1lc3NhZ2UsIG5hbWUpIHtcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZSB8fCAnJztcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZSB8fCAnRXJyb3InO1xuICAgICAgICBpZiAoRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UpIHtcbiAgICAgICAgICAgIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKHRoaXMsIHRoaXMuY29uc3RydWN0b3IpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBjdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoRXJyb3IucHJvdG90eXBlKTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3Rvci5wcm90b3R5cGUsICdjb25zdHJ1Y3RvcicsIHsgdmFsdWU6IGN0b3IsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSk7XG4gICAgcmV0dXJuIGN0b3I7XG59XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVkZWNsYXJlXG5jb25zdCBET01FeGNlcHRpb24kMSA9IGlzRE9NRXhjZXB0aW9uQ29uc3RydWN0b3IoTmF0aXZlRE9NRXhjZXB0aW9uKSA/IE5hdGl2ZURPTUV4Y2VwdGlvbiA6IGNyZWF0ZURPTUV4Y2VwdGlvblBvbHlmaWxsKCk7XG5cbmZ1bmN0aW9uIFJlYWRhYmxlU3RyZWFtUGlwZVRvKHNvdXJjZSwgZGVzdCwgcHJldmVudENsb3NlLCBwcmV2ZW50QWJvcnQsIHByZXZlbnRDYW5jZWwsIHNpZ25hbCkge1xuICAgIGNvbnN0IHJlYWRlciA9IEFjcXVpcmVSZWFkYWJsZVN0cmVhbURlZmF1bHRSZWFkZXIoc291cmNlKTtcbiAgICBjb25zdCB3cml0ZXIgPSBBY3F1aXJlV3JpdGFibGVTdHJlYW1EZWZhdWx0V3JpdGVyKGRlc3QpO1xuICAgIHNvdXJjZS5fZGlzdHVyYmVkID0gdHJ1ZTtcbiAgICBsZXQgc2h1dHRpbmdEb3duID0gZmFsc2U7XG4gICAgLy8gVGhpcyBpcyB1c2VkIHRvIGtlZXAgdHJhY2sgb2YgdGhlIHNwZWMncyByZXF1aXJlbWVudCB0aGF0IHdlIHdhaXQgZm9yIG9uZ29pbmcgd3JpdGVzIGR1cmluZyBzaHV0ZG93bi5cbiAgICBsZXQgY3VycmVudFdyaXRlID0gcHJvbWlzZVJlc29sdmVkV2l0aCh1bmRlZmluZWQpO1xuICAgIHJldHVybiBuZXdQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgbGV0IGFib3J0QWxnb3JpdGhtO1xuICAgICAgICBpZiAoc2lnbmFsICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGFib3J0QWxnb3JpdGhtID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGVycm9yID0gbmV3IERPTUV4Y2VwdGlvbiQxKCdBYm9ydGVkJywgJ0Fib3J0RXJyb3InKTtcbiAgICAgICAgICAgICAgICBjb25zdCBhY3Rpb25zID0gW107XG4gICAgICAgICAgICAgICAgaWYgKCFwcmV2ZW50QWJvcnQpIHtcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9ucy5wdXNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkZXN0Ll9zdGF0ZSA9PT0gJ3dyaXRhYmxlJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBXcml0YWJsZVN0cmVhbUFib3J0KGRlc3QsIGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwcm9taXNlUmVzb2x2ZWRXaXRoKHVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIXByZXZlbnRDYW5jZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9ucy5wdXNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzb3VyY2UuX3N0YXRlID09PSAncmVhZGFibGUnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFJlYWRhYmxlU3RyZWFtQ2FuY2VsKHNvdXJjZSwgZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByb21pc2VSZXNvbHZlZFdpdGgodW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNodXRkb3duV2l0aEFjdGlvbigoKSA9PiBQcm9taXNlLmFsbChhY3Rpb25zLm1hcChhY3Rpb24gPT4gYWN0aW9uKCkpKSwgdHJ1ZSwgZXJyb3IpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmIChzaWduYWwuYWJvcnRlZCkge1xuICAgICAgICAgICAgICAgIGFib3J0QWxnb3JpdGhtKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2lnbmFsLmFkZEV2ZW50TGlzdGVuZXIoJ2Fib3J0JywgYWJvcnRBbGdvcml0aG0pO1xuICAgICAgICB9XG4gICAgICAgIC8vIFVzaW5nIHJlYWRlciBhbmQgd3JpdGVyLCByZWFkIGFsbCBjaHVua3MgZnJvbSB0aGlzIGFuZCB3cml0ZSB0aGVtIHRvIGRlc3RcbiAgICAgICAgLy8gLSBCYWNrcHJlc3N1cmUgbXVzdCBiZSBlbmZvcmNlZFxuICAgICAgICAvLyAtIFNodXRkb3duIG11c3Qgc3RvcCBhbGwgYWN0aXZpdHlcbiAgICAgICAgZnVuY3Rpb24gcGlwZUxvb3AoKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3UHJvbWlzZSgocmVzb2x2ZUxvb3AsIHJlamVjdExvb3ApID0+IHtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBuZXh0KGRvbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRvbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmVMb29wKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBVc2UgYFBlcmZvcm1Qcm9taXNlVGhlbmAgaW5zdGVhZCBvZiBgdXBvblByb21pc2VgIHRvIGF2b2lkXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBhZGRpbmcgdW5uZWNlc3NhcnkgYC5jYXRjaChyZXRocm93QXNzZXJ0aW9uRXJyb3JSZWplY3Rpb24pYCBoYW5kbGVyc1xuICAgICAgICAgICAgICAgICAgICAgICAgUGVyZm9ybVByb21pc2VUaGVuKHBpcGVTdGVwKCksIG5leHQsIHJlamVjdExvb3ApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG5leHQoZmFsc2UpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gcGlwZVN0ZXAoKSB7XG4gICAgICAgICAgICBpZiAoc2h1dHRpbmdEb3duKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb21pc2VSZXNvbHZlZFdpdGgodHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gUGVyZm9ybVByb21pc2VUaGVuKHdyaXRlci5fcmVhZHlQcm9taXNlLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ld1Byb21pc2UoKHJlc29sdmVSZWFkLCByZWplY3RSZWFkKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIFJlYWRhYmxlU3RyZWFtRGVmYXVsdFJlYWRlclJlYWQocmVhZGVyLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfY2h1bmtTdGVwczogY2h1bmsgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRXcml0ZSA9IFBlcmZvcm1Qcm9taXNlVGhlbihXcml0YWJsZVN0cmVhbURlZmF1bHRXcml0ZXJXcml0ZSh3cml0ZXIsIGNodW5rKSwgdW5kZWZpbmVkLCBub29wKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlUmVhZChmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgX2Nsb3NlU3RlcHM6ICgpID0+IHJlc29sdmVSZWFkKHRydWUpLFxuICAgICAgICAgICAgICAgICAgICAgICAgX2Vycm9yU3RlcHM6IHJlamVjdFJlYWRcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICAvLyBFcnJvcnMgbXVzdCBiZSBwcm9wYWdhdGVkIGZvcndhcmRcbiAgICAgICAgaXNPckJlY29tZXNFcnJvcmVkKHNvdXJjZSwgcmVhZGVyLl9jbG9zZWRQcm9taXNlLCBzdG9yZWRFcnJvciA9PiB7XG4gICAgICAgICAgICBpZiAoIXByZXZlbnRBYm9ydCkge1xuICAgICAgICAgICAgICAgIHNodXRkb3duV2l0aEFjdGlvbigoKSA9PiBXcml0YWJsZVN0cmVhbUFib3J0KGRlc3QsIHN0b3JlZEVycm9yKSwgdHJ1ZSwgc3RvcmVkRXJyb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgc2h1dGRvd24odHJ1ZSwgc3RvcmVkRXJyb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgLy8gRXJyb3JzIG11c3QgYmUgcHJvcGFnYXRlZCBiYWNrd2FyZFxuICAgICAgICBpc09yQmVjb21lc0Vycm9yZWQoZGVzdCwgd3JpdGVyLl9jbG9zZWRQcm9taXNlLCBzdG9yZWRFcnJvciA9PiB7XG4gICAgICAgICAgICBpZiAoIXByZXZlbnRDYW5jZWwpIHtcbiAgICAgICAgICAgICAgICBzaHV0ZG93bldpdGhBY3Rpb24oKCkgPT4gUmVhZGFibGVTdHJlYW1DYW5jZWwoc291cmNlLCBzdG9yZWRFcnJvciksIHRydWUsIHN0b3JlZEVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHNodXRkb3duKHRydWUsIHN0b3JlZEVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIC8vIENsb3NpbmcgbXVzdCBiZSBwcm9wYWdhdGVkIGZvcndhcmRcbiAgICAgICAgaXNPckJlY29tZXNDbG9zZWQoc291cmNlLCByZWFkZXIuX2Nsb3NlZFByb21pc2UsICgpID0+IHtcbiAgICAgICAgICAgIGlmICghcHJldmVudENsb3NlKSB7XG4gICAgICAgICAgICAgICAgc2h1dGRvd25XaXRoQWN0aW9uKCgpID0+IFdyaXRhYmxlU3RyZWFtRGVmYXVsdFdyaXRlckNsb3NlV2l0aEVycm9yUHJvcGFnYXRpb24od3JpdGVyKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBzaHV0ZG93bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgLy8gQ2xvc2luZyBtdXN0IGJlIHByb3BhZ2F0ZWQgYmFja3dhcmRcbiAgICAgICAgaWYgKFdyaXRhYmxlU3RyZWFtQ2xvc2VRdWV1ZWRPckluRmxpZ2h0KGRlc3QpIHx8IGRlc3QuX3N0YXRlID09PSAnY2xvc2VkJykge1xuICAgICAgICAgICAgY29uc3QgZGVzdENsb3NlZCA9IG5ldyBUeXBlRXJyb3IoJ3RoZSBkZXN0aW5hdGlvbiB3cml0YWJsZSBzdHJlYW0gY2xvc2VkIGJlZm9yZSBhbGwgZGF0YSBjb3VsZCBiZSBwaXBlZCB0byBpdCcpO1xuICAgICAgICAgICAgaWYgKCFwcmV2ZW50Q2FuY2VsKSB7XG4gICAgICAgICAgICAgICAgc2h1dGRvd25XaXRoQWN0aW9uKCgpID0+IFJlYWRhYmxlU3RyZWFtQ2FuY2VsKHNvdXJjZSwgZGVzdENsb3NlZCksIHRydWUsIGRlc3RDbG9zZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgc2h1dGRvd24odHJ1ZSwgZGVzdENsb3NlZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgc2V0UHJvbWlzZUlzSGFuZGxlZFRvVHJ1ZShwaXBlTG9vcCgpKTtcbiAgICAgICAgZnVuY3Rpb24gd2FpdEZvcldyaXRlc1RvRmluaXNoKCkge1xuICAgICAgICAgICAgLy8gQW5vdGhlciB3cml0ZSBtYXkgaGF2ZSBzdGFydGVkIHdoaWxlIHdlIHdlcmUgd2FpdGluZyBvbiB0aGlzIGN1cnJlbnRXcml0ZSwgc28gd2UgaGF2ZSB0byBiZSBzdXJlIHRvIHdhaXRcbiAgICAgICAgICAgIC8vIGZvciB0aGF0IHRvby5cbiAgICAgICAgICAgIGNvbnN0IG9sZEN1cnJlbnRXcml0ZSA9IGN1cnJlbnRXcml0ZTtcbiAgICAgICAgICAgIHJldHVybiBQZXJmb3JtUHJvbWlzZVRoZW4oY3VycmVudFdyaXRlLCAoKSA9PiBvbGRDdXJyZW50V3JpdGUgIT09IGN1cnJlbnRXcml0ZSA/IHdhaXRGb3JXcml0ZXNUb0ZpbmlzaCgpIDogdW5kZWZpbmVkKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBpc09yQmVjb21lc0Vycm9yZWQoc3RyZWFtLCBwcm9taXNlLCBhY3Rpb24pIHtcbiAgICAgICAgICAgIGlmIChzdHJlYW0uX3N0YXRlID09PSAnZXJyb3JlZCcpIHtcbiAgICAgICAgICAgICAgICBhY3Rpb24oc3RyZWFtLl9zdG9yZWRFcnJvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB1cG9uUmVqZWN0aW9uKHByb21pc2UsIGFjdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gaXNPckJlY29tZXNDbG9zZWQoc3RyZWFtLCBwcm9taXNlLCBhY3Rpb24pIHtcbiAgICAgICAgICAgIGlmIChzdHJlYW0uX3N0YXRlID09PSAnY2xvc2VkJykge1xuICAgICAgICAgICAgICAgIGFjdGlvbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdXBvbkZ1bGZpbGxtZW50KHByb21pc2UsIGFjdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gc2h1dGRvd25XaXRoQWN0aW9uKGFjdGlvbiwgb3JpZ2luYWxJc0Vycm9yLCBvcmlnaW5hbEVycm9yKSB7XG4gICAgICAgICAgICBpZiAoc2h1dHRpbmdEb3duKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2h1dHRpbmdEb3duID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmIChkZXN0Ll9zdGF0ZSA9PT0gJ3dyaXRhYmxlJyAmJiAhV3JpdGFibGVTdHJlYW1DbG9zZVF1ZXVlZE9ySW5GbGlnaHQoZGVzdCkpIHtcbiAgICAgICAgICAgICAgICB1cG9uRnVsZmlsbG1lbnQod2FpdEZvcldyaXRlc1RvRmluaXNoKCksIGRvVGhlUmVzdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBkb1RoZVJlc3QoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZ1bmN0aW9uIGRvVGhlUmVzdCgpIHtcbiAgICAgICAgICAgICAgICB1cG9uUHJvbWlzZShhY3Rpb24oKSwgKCkgPT4gZmluYWxpemUob3JpZ2luYWxJc0Vycm9yLCBvcmlnaW5hbEVycm9yKSwgbmV3RXJyb3IgPT4gZmluYWxpemUodHJ1ZSwgbmV3RXJyb3IpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBzaHV0ZG93bihpc0Vycm9yLCBlcnJvcikge1xuICAgICAgICAgICAgaWYgKHNodXR0aW5nRG93bikge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNodXR0aW5nRG93biA9IHRydWU7XG4gICAgICAgICAgICBpZiAoZGVzdC5fc3RhdGUgPT09ICd3cml0YWJsZScgJiYgIVdyaXRhYmxlU3RyZWFtQ2xvc2VRdWV1ZWRPckluRmxpZ2h0KGRlc3QpKSB7XG4gICAgICAgICAgICAgICAgdXBvbkZ1bGZpbGxtZW50KHdhaXRGb3JXcml0ZXNUb0ZpbmlzaCgpLCAoKSA9PiBmaW5hbGl6ZShpc0Vycm9yLCBlcnJvcikpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZmluYWxpemUoaXNFcnJvciwgZXJyb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGZpbmFsaXplKGlzRXJyb3IsIGVycm9yKSB7XG4gICAgICAgICAgICBXcml0YWJsZVN0cmVhbURlZmF1bHRXcml0ZXJSZWxlYXNlKHdyaXRlcik7XG4gICAgICAgICAgICBSZWFkYWJsZVN0cmVhbVJlYWRlckdlbmVyaWNSZWxlYXNlKHJlYWRlcik7XG4gICAgICAgICAgICBpZiAoc2lnbmFsICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBzaWduYWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignYWJvcnQnLCBhYm9ydEFsZ29yaXRobSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaXNFcnJvcikge1xuICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHVuZGVmaW5lZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuLyoqXG4gKiBBbGxvd3MgY29udHJvbCBvZiBhIHtAbGluayBSZWFkYWJsZVN0cmVhbSB8IHJlYWRhYmxlIHN0cmVhbX0ncyBzdGF0ZSBhbmQgaW50ZXJuYWwgcXVldWUuXG4gKlxuICogQHB1YmxpY1xuICovXG5jbGFzcyBSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSWxsZWdhbCBjb25zdHJ1Y3RvcicpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBkZXNpcmVkIHNpemUgdG8gZmlsbCB0aGUgY29udHJvbGxlZCBzdHJlYW0ncyBpbnRlcm5hbCBxdWV1ZS4gSXQgY2FuIGJlIG5lZ2F0aXZlLCBpZiB0aGUgcXVldWUgaXNcbiAgICAgKiBvdmVyLWZ1bGwuIEFuIHVuZGVybHlpbmcgc291cmNlIG91Z2h0IHRvIHVzZSB0aGlzIGluZm9ybWF0aW9uIHRvIGRldGVybWluZSB3aGVuIGFuZCBob3cgdG8gYXBwbHkgYmFja3ByZXNzdXJlLlxuICAgICAqL1xuICAgIGdldCBkZXNpcmVkU2l6ZSgpIHtcbiAgICAgICAgaWYgKCFJc1JlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXIodGhpcykpIHtcbiAgICAgICAgICAgIHRocm93IGRlZmF1bHRDb250cm9sbGVyQnJhbmRDaGVja0V4Y2VwdGlvbiQxKCdkZXNpcmVkU2l6ZScpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyR2V0RGVzaXJlZFNpemUodGhpcyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENsb3NlcyB0aGUgY29udHJvbGxlZCByZWFkYWJsZSBzdHJlYW0uIENvbnN1bWVycyB3aWxsIHN0aWxsIGJlIGFibGUgdG8gcmVhZCBhbnkgcHJldmlvdXNseS1lbnF1ZXVlZCBjaHVua3MgZnJvbVxuICAgICAqIHRoZSBzdHJlYW0sIGJ1dCBvbmNlIHRob3NlIGFyZSByZWFkLCB0aGUgc3RyZWFtIHdpbGwgYmVjb21lIGNsb3NlZC5cbiAgICAgKi9cbiAgICBjbG9zZSgpIHtcbiAgICAgICAgaWYgKCFJc1JlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXIodGhpcykpIHtcbiAgICAgICAgICAgIHRocm93IGRlZmF1bHRDb250cm9sbGVyQnJhbmRDaGVja0V4Y2VwdGlvbiQxKCdjbG9zZScpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckNhbkNsb3NlT3JFbnF1ZXVlKHRoaXMpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgc3RyZWFtIGlzIG5vdCBpbiBhIHN0YXRlIHRoYXQgcGVybWl0cyBjbG9zZScpO1xuICAgICAgICB9XG4gICAgICAgIFJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJDbG9zZSh0aGlzKTtcbiAgICB9XG4gICAgZW5xdWV1ZShjaHVuayA9IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAoIUlzUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlcih0aGlzKSkge1xuICAgICAgICAgICAgdGhyb3cgZGVmYXVsdENvbnRyb2xsZXJCcmFuZENoZWNrRXhjZXB0aW9uJDEoJ2VucXVldWUnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIVJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJDYW5DbG9zZU9yRW5xdWV1ZSh0aGlzKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIHN0cmVhbSBpcyBub3QgaW4gYSBzdGF0ZSB0aGF0IHBlcm1pdHMgZW5xdWV1ZScpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyRW5xdWV1ZSh0aGlzLCBjaHVuayk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEVycm9ycyB0aGUgY29udHJvbGxlZCByZWFkYWJsZSBzdHJlYW0sIG1ha2luZyBhbGwgZnV0dXJlIGludGVyYWN0aW9ucyB3aXRoIGl0IGZhaWwgd2l0aCB0aGUgZ2l2ZW4gZXJyb3IgYGVgLlxuICAgICAqL1xuICAgIGVycm9yKGUgPSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKCFJc1JlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXIodGhpcykpIHtcbiAgICAgICAgICAgIHRocm93IGRlZmF1bHRDb250cm9sbGVyQnJhbmRDaGVja0V4Y2VwdGlvbiQxKCdlcnJvcicpO1xuICAgICAgICB9XG4gICAgICAgIFJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJFcnJvcih0aGlzLCBlKTtcbiAgICB9XG4gICAgLyoqIEBpbnRlcm5hbCAqL1xuICAgIFtDYW5jZWxTdGVwc10ocmVhc29uKSB7XG4gICAgICAgIFJlc2V0UXVldWUodGhpcyk7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuX2NhbmNlbEFsZ29yaXRobShyZWFzb24pO1xuICAgICAgICBSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyQ2xlYXJBbGdvcml0aG1zKHRoaXMpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICAvKiogQGludGVybmFsICovXG4gICAgW1B1bGxTdGVwc10ocmVhZFJlcXVlc3QpIHtcbiAgICAgICAgY29uc3Qgc3RyZWFtID0gdGhpcy5fY29udHJvbGxlZFJlYWRhYmxlU3RyZWFtO1xuICAgICAgICBpZiAodGhpcy5fcXVldWUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY29uc3QgY2h1bmsgPSBEZXF1ZXVlVmFsdWUodGhpcyk7XG4gICAgICAgICAgICBpZiAodGhpcy5fY2xvc2VSZXF1ZXN0ZWQgJiYgdGhpcy5fcXVldWUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckNsZWFyQWxnb3JpdGhtcyh0aGlzKTtcbiAgICAgICAgICAgICAgICBSZWFkYWJsZVN0cmVhbUNsb3NlKHN0cmVhbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyQ2FsbFB1bGxJZk5lZWRlZCh0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlYWRSZXF1ZXN0Ll9jaHVua1N0ZXBzKGNodW5rKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIFJlYWRhYmxlU3RyZWFtQWRkUmVhZFJlcXVlc3Qoc3RyZWFtLCByZWFkUmVxdWVzdCk7XG4gICAgICAgICAgICBSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyQ2FsbFB1bGxJZk5lZWRlZCh0aGlzKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKFJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXIucHJvdG90eXBlLCB7XG4gICAgY2xvc2U6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxuICAgIGVucXVldWU6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxuICAgIGVycm9yOiB7IGVudW1lcmFibGU6IHRydWUgfSxcbiAgICBkZXNpcmVkU2l6ZTogeyBlbnVtZXJhYmxlOiB0cnVlIH1cbn0pO1xuaWYgKHR5cGVvZiBTeW1ib2xQb2x5ZmlsbC50b1N0cmluZ1RhZyA9PT0gJ3N5bWJvbCcpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlci5wcm90b3R5cGUsIFN5bWJvbFBvbHlmaWxsLnRvU3RyaW5nVGFnLCB7XG4gICAgICAgIHZhbHVlOiAnUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlcicsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xufVxuLy8gQWJzdHJhY3Qgb3BlcmF0aW9ucyBmb3IgdGhlIFJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXIuXG5mdW5jdGlvbiBJc1JlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXIoeCkge1xuICAgIGlmICghdHlwZUlzT2JqZWN0KHgpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoeCwgJ19jb250cm9sbGVkUmVhZGFibGVTdHJlYW0nKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB4IGluc3RhbmNlb2YgUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlcjtcbn1cbmZ1bmN0aW9uIFJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJDYWxsUHVsbElmTmVlZGVkKGNvbnRyb2xsZXIpIHtcbiAgICBjb25zdCBzaG91bGRQdWxsID0gUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlclNob3VsZENhbGxQdWxsKGNvbnRyb2xsZXIpO1xuICAgIGlmICghc2hvdWxkUHVsbCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChjb250cm9sbGVyLl9wdWxsaW5nKSB7XG4gICAgICAgIGNvbnRyb2xsZXIuX3B1bGxBZ2FpbiA9IHRydWU7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29udHJvbGxlci5fcHVsbGluZyA9IHRydWU7XG4gICAgY29uc3QgcHVsbFByb21pc2UgPSBjb250cm9sbGVyLl9wdWxsQWxnb3JpdGhtKCk7XG4gICAgdXBvblByb21pc2UocHVsbFByb21pc2UsICgpID0+IHtcbiAgICAgICAgY29udHJvbGxlci5fcHVsbGluZyA9IGZhbHNlO1xuICAgICAgICBpZiAoY29udHJvbGxlci5fcHVsbEFnYWluKSB7XG4gICAgICAgICAgICBjb250cm9sbGVyLl9wdWxsQWdhaW4gPSBmYWxzZTtcbiAgICAgICAgICAgIFJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJDYWxsUHVsbElmTmVlZGVkKGNvbnRyb2xsZXIpO1xuICAgICAgICB9XG4gICAgfSwgZSA9PiB7XG4gICAgICAgIFJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJFcnJvcihjb250cm9sbGVyLCBlKTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIFJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJTaG91bGRDYWxsUHVsbChjb250cm9sbGVyKSB7XG4gICAgY29uc3Qgc3RyZWFtID0gY29udHJvbGxlci5fY29udHJvbGxlZFJlYWRhYmxlU3RyZWFtO1xuICAgIGlmICghUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckNhbkNsb3NlT3JFbnF1ZXVlKGNvbnRyb2xsZXIpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKCFjb250cm9sbGVyLl9zdGFydGVkKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKElzUmVhZGFibGVTdHJlYW1Mb2NrZWQoc3RyZWFtKSAmJiBSZWFkYWJsZVN0cmVhbUdldE51bVJlYWRSZXF1ZXN0cyhzdHJlYW0pID4gMCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgY29uc3QgZGVzaXJlZFNpemUgPSBSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyR2V0RGVzaXJlZFNpemUoY29udHJvbGxlcik7XG4gICAgaWYgKGRlc2lyZWRTaXplID4gMCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuZnVuY3Rpb24gUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckNsZWFyQWxnb3JpdGhtcyhjb250cm9sbGVyKSB7XG4gICAgY29udHJvbGxlci5fcHVsbEFsZ29yaXRobSA9IHVuZGVmaW5lZDtcbiAgICBjb250cm9sbGVyLl9jYW5jZWxBbGdvcml0aG0gPSB1bmRlZmluZWQ7XG4gICAgY29udHJvbGxlci5fc3RyYXRlZ3lTaXplQWxnb3JpdGhtID0gdW5kZWZpbmVkO1xufVxuLy8gQSBjbGllbnQgb2YgUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlciBtYXkgdXNlIHRoZXNlIGZ1bmN0aW9ucyBkaXJlY3RseSB0byBieXBhc3Mgc3RhdGUgY2hlY2suXG5mdW5jdGlvbiBSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyQ2xvc2UoY29udHJvbGxlcikge1xuICAgIGlmICghUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckNhbkNsb3NlT3JFbnF1ZXVlKGNvbnRyb2xsZXIpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3Qgc3RyZWFtID0gY29udHJvbGxlci5fY29udHJvbGxlZFJlYWRhYmxlU3RyZWFtO1xuICAgIGNvbnRyb2xsZXIuX2Nsb3NlUmVxdWVzdGVkID0gdHJ1ZTtcbiAgICBpZiAoY29udHJvbGxlci5fcXVldWUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIFJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJDbGVhckFsZ29yaXRobXMoY29udHJvbGxlcik7XG4gICAgICAgIFJlYWRhYmxlU3RyZWFtQ2xvc2Uoc3RyZWFtKTtcbiAgICB9XG59XG5mdW5jdGlvbiBSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyRW5xdWV1ZShjb250cm9sbGVyLCBjaHVuaykge1xuICAgIGlmICghUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckNhbkNsb3NlT3JFbnF1ZXVlKGNvbnRyb2xsZXIpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3Qgc3RyZWFtID0gY29udHJvbGxlci5fY29udHJvbGxlZFJlYWRhYmxlU3RyZWFtO1xuICAgIGlmIChJc1JlYWRhYmxlU3RyZWFtTG9ja2VkKHN0cmVhbSkgJiYgUmVhZGFibGVTdHJlYW1HZXROdW1SZWFkUmVxdWVzdHMoc3RyZWFtKSA+IDApIHtcbiAgICAgICAgUmVhZGFibGVTdHJlYW1GdWxmaWxsUmVhZFJlcXVlc3Qoc3RyZWFtLCBjaHVuaywgZmFsc2UpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgbGV0IGNodW5rU2l6ZTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNodW5rU2l6ZSA9IGNvbnRyb2xsZXIuX3N0cmF0ZWd5U2l6ZUFsZ29yaXRobShjaHVuayk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGNodW5rU2l6ZUUpIHtcbiAgICAgICAgICAgIFJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJFcnJvcihjb250cm9sbGVyLCBjaHVua1NpemVFKTtcbiAgICAgICAgICAgIHRocm93IGNodW5rU2l6ZUU7XG4gICAgICAgIH1cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIEVucXVldWVWYWx1ZVdpdGhTaXplKGNvbnRyb2xsZXIsIGNodW5rLCBjaHVua1NpemUpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlbnF1ZXVlRSkge1xuICAgICAgICAgICAgUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckVycm9yKGNvbnRyb2xsZXIsIGVucXVldWVFKTtcbiAgICAgICAgICAgIHRocm93IGVucXVldWVFO1xuICAgICAgICB9XG4gICAgfVxuICAgIFJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJDYWxsUHVsbElmTmVlZGVkKGNvbnRyb2xsZXIpO1xufVxuZnVuY3Rpb24gUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckVycm9yKGNvbnRyb2xsZXIsIGUpIHtcbiAgICBjb25zdCBzdHJlYW0gPSBjb250cm9sbGVyLl9jb250cm9sbGVkUmVhZGFibGVTdHJlYW07XG4gICAgaWYgKHN0cmVhbS5fc3RhdGUgIT09ICdyZWFkYWJsZScpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBSZXNldFF1ZXVlKGNvbnRyb2xsZXIpO1xuICAgIFJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJDbGVhckFsZ29yaXRobXMoY29udHJvbGxlcik7XG4gICAgUmVhZGFibGVTdHJlYW1FcnJvcihzdHJlYW0sIGUpO1xufVxuZnVuY3Rpb24gUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckdldERlc2lyZWRTaXplKGNvbnRyb2xsZXIpIHtcbiAgICBjb25zdCBzdGF0ZSA9IGNvbnRyb2xsZXIuX2NvbnRyb2xsZWRSZWFkYWJsZVN0cmVhbS5fc3RhdGU7XG4gICAgaWYgKHN0YXRlID09PSAnZXJyb3JlZCcpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGlmIChzdGF0ZSA9PT0gJ2Nsb3NlZCcpIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICAgIHJldHVybiBjb250cm9sbGVyLl9zdHJhdGVneUhXTSAtIGNvbnRyb2xsZXIuX3F1ZXVlVG90YWxTaXplO1xufVxuLy8gVGhpcyBpcyB1c2VkIGluIHRoZSBpbXBsZW1lbnRhdGlvbiBvZiBUcmFuc2Zvcm1TdHJlYW0uXG5mdW5jdGlvbiBSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVySGFzQmFja3ByZXNzdXJlKGNvbnRyb2xsZXIpIHtcbiAgICBpZiAoUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlclNob3VsZENhbGxQdWxsKGNvbnRyb2xsZXIpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG59XG5mdW5jdGlvbiBSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyQ2FuQ2xvc2VPckVucXVldWUoY29udHJvbGxlcikge1xuICAgIGNvbnN0IHN0YXRlID0gY29udHJvbGxlci5fY29udHJvbGxlZFJlYWRhYmxlU3RyZWFtLl9zdGF0ZTtcbiAgICBpZiAoIWNvbnRyb2xsZXIuX2Nsb3NlUmVxdWVzdGVkICYmIHN0YXRlID09PSAncmVhZGFibGUnKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59XG5mdW5jdGlvbiBTZXRVcFJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXIoc3RyZWFtLCBjb250cm9sbGVyLCBzdGFydEFsZ29yaXRobSwgcHVsbEFsZ29yaXRobSwgY2FuY2VsQWxnb3JpdGhtLCBoaWdoV2F0ZXJNYXJrLCBzaXplQWxnb3JpdGhtKSB7XG4gICAgY29udHJvbGxlci5fY29udHJvbGxlZFJlYWRhYmxlU3RyZWFtID0gc3RyZWFtO1xuICAgIGNvbnRyb2xsZXIuX3F1ZXVlID0gdW5kZWZpbmVkO1xuICAgIGNvbnRyb2xsZXIuX3F1ZXVlVG90YWxTaXplID0gdW5kZWZpbmVkO1xuICAgIFJlc2V0UXVldWUoY29udHJvbGxlcik7XG4gICAgY29udHJvbGxlci5fc3RhcnRlZCA9IGZhbHNlO1xuICAgIGNvbnRyb2xsZXIuX2Nsb3NlUmVxdWVzdGVkID0gZmFsc2U7XG4gICAgY29udHJvbGxlci5fcHVsbEFnYWluID0gZmFsc2U7XG4gICAgY29udHJvbGxlci5fcHVsbGluZyA9IGZhbHNlO1xuICAgIGNvbnRyb2xsZXIuX3N0cmF0ZWd5U2l6ZUFsZ29yaXRobSA9IHNpemVBbGdvcml0aG07XG4gICAgY29udHJvbGxlci5fc3RyYXRlZ3lIV00gPSBoaWdoV2F0ZXJNYXJrO1xuICAgIGNvbnRyb2xsZXIuX3B1bGxBbGdvcml0aG0gPSBwdWxsQWxnb3JpdGhtO1xuICAgIGNvbnRyb2xsZXIuX2NhbmNlbEFsZ29yaXRobSA9IGNhbmNlbEFsZ29yaXRobTtcbiAgICBzdHJlYW0uX3JlYWRhYmxlU3RyZWFtQ29udHJvbGxlciA9IGNvbnRyb2xsZXI7XG4gICAgY29uc3Qgc3RhcnRSZXN1bHQgPSBzdGFydEFsZ29yaXRobSgpO1xuICAgIHVwb25Qcm9taXNlKHByb21pc2VSZXNvbHZlZFdpdGgoc3RhcnRSZXN1bHQpLCAoKSA9PiB7XG4gICAgICAgIGNvbnRyb2xsZXIuX3N0YXJ0ZWQgPSB0cnVlO1xuICAgICAgICBSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyQ2FsbFB1bGxJZk5lZWRlZChjb250cm9sbGVyKTtcbiAgICB9LCByID0+IHtcbiAgICAgICAgUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckVycm9yKGNvbnRyb2xsZXIsIHIpO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gU2V0VXBSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyRnJvbVVuZGVybHlpbmdTb3VyY2Uoc3RyZWFtLCB1bmRlcmx5aW5nU291cmNlLCBoaWdoV2F0ZXJNYXJrLCBzaXplQWxnb3JpdGhtKSB7XG4gICAgY29uc3QgY29udHJvbGxlciA9IE9iamVjdC5jcmVhdGUoUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlci5wcm90b3R5cGUpO1xuICAgIGxldCBzdGFydEFsZ29yaXRobSA9ICgpID0+IHVuZGVmaW5lZDtcbiAgICBsZXQgcHVsbEFsZ29yaXRobSA9ICgpID0+IHByb21pc2VSZXNvbHZlZFdpdGgodW5kZWZpbmVkKTtcbiAgICBsZXQgY2FuY2VsQWxnb3JpdGhtID0gKCkgPT4gcHJvbWlzZVJlc29sdmVkV2l0aCh1bmRlZmluZWQpO1xuICAgIGlmICh1bmRlcmx5aW5nU291cmNlLnN0YXJ0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgc3RhcnRBbGdvcml0aG0gPSAoKSA9PiB1bmRlcmx5aW5nU291cmNlLnN0YXJ0KGNvbnRyb2xsZXIpO1xuICAgIH1cbiAgICBpZiAodW5kZXJseWluZ1NvdXJjZS5wdWxsICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcHVsbEFsZ29yaXRobSA9ICgpID0+IHVuZGVybHlpbmdTb3VyY2UucHVsbChjb250cm9sbGVyKTtcbiAgICB9XG4gICAgaWYgKHVuZGVybHlpbmdTb3VyY2UuY2FuY2VsICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY2FuY2VsQWxnb3JpdGhtID0gcmVhc29uID0+IHVuZGVybHlpbmdTb3VyY2UuY2FuY2VsKHJlYXNvbik7XG4gICAgfVxuICAgIFNldFVwUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlcihzdHJlYW0sIGNvbnRyb2xsZXIsIHN0YXJ0QWxnb3JpdGhtLCBwdWxsQWxnb3JpdGhtLCBjYW5jZWxBbGdvcml0aG0sIGhpZ2hXYXRlck1hcmssIHNpemVBbGdvcml0aG0pO1xufVxuLy8gSGVscGVyIGZ1bmN0aW9ucyBmb3IgdGhlIFJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXIuXG5mdW5jdGlvbiBkZWZhdWx0Q29udHJvbGxlckJyYW5kQ2hlY2tFeGNlcHRpb24kMShuYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBUeXBlRXJyb3IoYFJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXIucHJvdG90eXBlLiR7bmFtZX0gY2FuIG9ubHkgYmUgdXNlZCBvbiBhIFJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJgKTtcbn1cblxuZnVuY3Rpb24gUmVhZGFibGVTdHJlYW1UZWUoc3RyZWFtLCBjbG9uZUZvckJyYW5jaDIpIHtcbiAgICBpZiAoSXNSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyKHN0cmVhbS5fcmVhZGFibGVTdHJlYW1Db250cm9sbGVyKSkge1xuICAgICAgICByZXR1cm4gUmVhZGFibGVCeXRlU3RyZWFtVGVlKHN0cmVhbSk7XG4gICAgfVxuICAgIHJldHVybiBSZWFkYWJsZVN0cmVhbURlZmF1bHRUZWUoc3RyZWFtKTtcbn1cbmZ1bmN0aW9uIFJlYWRhYmxlU3RyZWFtRGVmYXVsdFRlZShzdHJlYW0sIGNsb25lRm9yQnJhbmNoMikge1xuICAgIGNvbnN0IHJlYWRlciA9IEFjcXVpcmVSZWFkYWJsZVN0cmVhbURlZmF1bHRSZWFkZXIoc3RyZWFtKTtcbiAgICBsZXQgcmVhZGluZyA9IGZhbHNlO1xuICAgIGxldCByZWFkQWdhaW4gPSBmYWxzZTtcbiAgICBsZXQgY2FuY2VsZWQxID0gZmFsc2U7XG4gICAgbGV0IGNhbmNlbGVkMiA9IGZhbHNlO1xuICAgIGxldCByZWFzb24xO1xuICAgIGxldCByZWFzb24yO1xuICAgIGxldCBicmFuY2gxO1xuICAgIGxldCBicmFuY2gyO1xuICAgIGxldCByZXNvbHZlQ2FuY2VsUHJvbWlzZTtcbiAgICBjb25zdCBjYW5jZWxQcm9taXNlID0gbmV3UHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgcmVzb2x2ZUNhbmNlbFByb21pc2UgPSByZXNvbHZlO1xuICAgIH0pO1xuICAgIGZ1bmN0aW9uIHB1bGxBbGdvcml0aG0oKSB7XG4gICAgICAgIGlmIChyZWFkaW5nKSB7XG4gICAgICAgICAgICByZWFkQWdhaW4gPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIHByb21pc2VSZXNvbHZlZFdpdGgodW5kZWZpbmVkKTtcbiAgICAgICAgfVxuICAgICAgICByZWFkaW5nID0gdHJ1ZTtcbiAgICAgICAgY29uc3QgcmVhZFJlcXVlc3QgPSB7XG4gICAgICAgICAgICBfY2h1bmtTdGVwczogY2h1bmsgPT4ge1xuICAgICAgICAgICAgICAgIC8vIFRoaXMgbmVlZHMgdG8gYmUgZGVsYXllZCBhIG1pY3JvdGFzayBiZWNhdXNlIGl0IHRha2VzIGF0IGxlYXN0IGEgbWljcm90YXNrIHRvIGRldGVjdCBlcnJvcnMgKHVzaW5nXG4gICAgICAgICAgICAgICAgLy8gcmVhZGVyLl9jbG9zZWRQcm9taXNlIGJlbG93KSwgYW5kIHdlIHdhbnQgZXJyb3JzIGluIHN0cmVhbSB0byBlcnJvciBib3RoIGJyYW5jaGVzIGltbWVkaWF0ZWx5LiBXZSBjYW5ub3QgbGV0XG4gICAgICAgICAgICAgICAgLy8gc3VjY2Vzc2Z1bCBzeW5jaHJvbm91c2x5LWF2YWlsYWJsZSByZWFkcyBnZXQgYWhlYWQgb2YgYXN5bmNocm9ub3VzbHktYXZhaWxhYmxlIGVycm9ycy5cbiAgICAgICAgICAgICAgICBxdWV1ZU1pY3JvdGFzaygoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlYWRBZ2FpbiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjaHVuazEgPSBjaHVuaztcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2h1bmsyID0gY2h1bms7XG4gICAgICAgICAgICAgICAgICAgIC8vIFRoZXJlIGlzIG5vIHdheSB0byBhY2Nlc3MgdGhlIGNsb25pbmcgY29kZSByaWdodCBub3cgaW4gdGhlIHJlZmVyZW5jZSBpbXBsZW1lbnRhdGlvbi5cbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgd2UgYWRkIG9uZSB0aGVuIHdlJ2xsIG5lZWQgYW4gaW1wbGVtZW50YXRpb24gZm9yIHNlcmlhbGl6YWJsZSBvYmplY3RzLlxuICAgICAgICAgICAgICAgICAgICAvLyBpZiAoIWNhbmNlbGVkMiAmJiBjbG9uZUZvckJyYW5jaDIpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gICBjaHVuazIgPSBTdHJ1Y3R1cmVkRGVzZXJpYWxpemUoU3RydWN0dXJlZFNlcmlhbGl6ZShjaHVuazIpKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgICAgICBpZiAoIWNhbmNlbGVkMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckVucXVldWUoYnJhbmNoMS5fcmVhZGFibGVTdHJlYW1Db250cm9sbGVyLCBjaHVuazEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICghY2FuY2VsZWQyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyRW5xdWV1ZShicmFuY2gyLl9yZWFkYWJsZVN0cmVhbUNvbnRyb2xsZXIsIGNodW5rMik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmVhZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVhZEFnYWluKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwdWxsQWxnb3JpdGhtKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfY2xvc2VTdGVwczogKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJlYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpZiAoIWNhbmNlbGVkMSkge1xuICAgICAgICAgICAgICAgICAgICBSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyQ2xvc2UoYnJhbmNoMS5fcmVhZGFibGVTdHJlYW1Db250cm9sbGVyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCFjYW5jZWxlZDIpIHtcbiAgICAgICAgICAgICAgICAgICAgUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckNsb3NlKGJyYW5jaDIuX3JlYWRhYmxlU3RyZWFtQ29udHJvbGxlcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghY2FuY2VsZWQxIHx8ICFjYW5jZWxlZDIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZUNhbmNlbFByb21pc2UodW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX2Vycm9yU3RlcHM6ICgpID0+IHtcbiAgICAgICAgICAgICAgICByZWFkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIFJlYWRhYmxlU3RyZWFtRGVmYXVsdFJlYWRlclJlYWQocmVhZGVyLCByZWFkUmVxdWVzdCk7XG4gICAgICAgIHJldHVybiBwcm9taXNlUmVzb2x2ZWRXaXRoKHVuZGVmaW5lZCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNhbmNlbDFBbGdvcml0aG0ocmVhc29uKSB7XG4gICAgICAgIGNhbmNlbGVkMSA9IHRydWU7XG4gICAgICAgIHJlYXNvbjEgPSByZWFzb247XG4gICAgICAgIGlmIChjYW5jZWxlZDIpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbXBvc2l0ZVJlYXNvbiA9IENyZWF0ZUFycmF5RnJvbUxpc3QoW3JlYXNvbjEsIHJlYXNvbjJdKTtcbiAgICAgICAgICAgIGNvbnN0IGNhbmNlbFJlc3VsdCA9IFJlYWRhYmxlU3RyZWFtQ2FuY2VsKHN0cmVhbSwgY29tcG9zaXRlUmVhc29uKTtcbiAgICAgICAgICAgIHJlc29sdmVDYW5jZWxQcm9taXNlKGNhbmNlbFJlc3VsdCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNhbmNlbFByb21pc2U7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNhbmNlbDJBbGdvcml0aG0ocmVhc29uKSB7XG4gICAgICAgIGNhbmNlbGVkMiA9IHRydWU7XG4gICAgICAgIHJlYXNvbjIgPSByZWFzb247XG4gICAgICAgIGlmIChjYW5jZWxlZDEpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbXBvc2l0ZVJlYXNvbiA9IENyZWF0ZUFycmF5RnJvbUxpc3QoW3JlYXNvbjEsIHJlYXNvbjJdKTtcbiAgICAgICAgICAgIGNvbnN0IGNhbmNlbFJlc3VsdCA9IFJlYWRhYmxlU3RyZWFtQ2FuY2VsKHN0cmVhbSwgY29tcG9zaXRlUmVhc29uKTtcbiAgICAgICAgICAgIHJlc29sdmVDYW5jZWxQcm9taXNlKGNhbmNlbFJlc3VsdCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNhbmNlbFByb21pc2U7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHN0YXJ0QWxnb3JpdGhtKCkge1xuICAgICAgICAvLyBkbyBub3RoaW5nXG4gICAgfVxuICAgIGJyYW5jaDEgPSBDcmVhdGVSZWFkYWJsZVN0cmVhbShzdGFydEFsZ29yaXRobSwgcHVsbEFsZ29yaXRobSwgY2FuY2VsMUFsZ29yaXRobSk7XG4gICAgYnJhbmNoMiA9IENyZWF0ZVJlYWRhYmxlU3RyZWFtKHN0YXJ0QWxnb3JpdGhtLCBwdWxsQWxnb3JpdGhtLCBjYW5jZWwyQWxnb3JpdGhtKTtcbiAgICB1cG9uUmVqZWN0aW9uKHJlYWRlci5fY2xvc2VkUHJvbWlzZSwgKHIpID0+IHtcbiAgICAgICAgUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckVycm9yKGJyYW5jaDEuX3JlYWRhYmxlU3RyZWFtQ29udHJvbGxlciwgcik7XG4gICAgICAgIFJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJFcnJvcihicmFuY2gyLl9yZWFkYWJsZVN0cmVhbUNvbnRyb2xsZXIsIHIpO1xuICAgICAgICBpZiAoIWNhbmNlbGVkMSB8fCAhY2FuY2VsZWQyKSB7XG4gICAgICAgICAgICByZXNvbHZlQ2FuY2VsUHJvbWlzZSh1bmRlZmluZWQpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIFticmFuY2gxLCBicmFuY2gyXTtcbn1cbmZ1bmN0aW9uIFJlYWRhYmxlQnl0ZVN0cmVhbVRlZShzdHJlYW0pIHtcbiAgICBsZXQgcmVhZGVyID0gQWNxdWlyZVJlYWRhYmxlU3RyZWFtRGVmYXVsdFJlYWRlcihzdHJlYW0pO1xuICAgIGxldCByZWFkaW5nID0gZmFsc2U7XG4gICAgbGV0IHJlYWRBZ2FpbkZvckJyYW5jaDEgPSBmYWxzZTtcbiAgICBsZXQgcmVhZEFnYWluRm9yQnJhbmNoMiA9IGZhbHNlO1xuICAgIGxldCBjYW5jZWxlZDEgPSBmYWxzZTtcbiAgICBsZXQgY2FuY2VsZWQyID0gZmFsc2U7XG4gICAgbGV0IHJlYXNvbjE7XG4gICAgbGV0IHJlYXNvbjI7XG4gICAgbGV0IGJyYW5jaDE7XG4gICAgbGV0IGJyYW5jaDI7XG4gICAgbGV0IHJlc29sdmVDYW5jZWxQcm9taXNlO1xuICAgIGNvbnN0IGNhbmNlbFByb21pc2UgPSBuZXdQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICByZXNvbHZlQ2FuY2VsUHJvbWlzZSA9IHJlc29sdmU7XG4gICAgfSk7XG4gICAgZnVuY3Rpb24gZm9yd2FyZFJlYWRlckVycm9yKHRoaXNSZWFkZXIpIHtcbiAgICAgICAgdXBvblJlamVjdGlvbih0aGlzUmVhZGVyLl9jbG9zZWRQcm9taXNlLCByID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzUmVhZGVyICE9PSByZWFkZXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyRXJyb3IoYnJhbmNoMS5fcmVhZGFibGVTdHJlYW1Db250cm9sbGVyLCByKTtcbiAgICAgICAgICAgIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJFcnJvcihicmFuY2gyLl9yZWFkYWJsZVN0cmVhbUNvbnRyb2xsZXIsIHIpO1xuICAgICAgICAgICAgaWYgKCFjYW5jZWxlZDEgfHwgIWNhbmNlbGVkMikge1xuICAgICAgICAgICAgICAgIHJlc29sdmVDYW5jZWxQcm9taXNlKHVuZGVmaW5lZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBmdW5jdGlvbiBwdWxsV2l0aERlZmF1bHRSZWFkZXIoKSB7XG4gICAgICAgIGlmIChJc1JlYWRhYmxlU3RyZWFtQllPQlJlYWRlcihyZWFkZXIpKSB7XG4gICAgICAgICAgICBSZWFkYWJsZVN0cmVhbVJlYWRlckdlbmVyaWNSZWxlYXNlKHJlYWRlcik7XG4gICAgICAgICAgICByZWFkZXIgPSBBY3F1aXJlUmVhZGFibGVTdHJlYW1EZWZhdWx0UmVhZGVyKHN0cmVhbSk7XG4gICAgICAgICAgICBmb3J3YXJkUmVhZGVyRXJyb3IocmVhZGVyKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByZWFkUmVxdWVzdCA9IHtcbiAgICAgICAgICAgIF9jaHVua1N0ZXBzOiBjaHVuayA9PiB7XG4gICAgICAgICAgICAgICAgLy8gVGhpcyBuZWVkcyB0byBiZSBkZWxheWVkIGEgbWljcm90YXNrIGJlY2F1c2UgaXQgdGFrZXMgYXQgbGVhc3QgYSBtaWNyb3Rhc2sgdG8gZGV0ZWN0IGVycm9ycyAodXNpbmdcbiAgICAgICAgICAgICAgICAvLyByZWFkZXIuX2Nsb3NlZFByb21pc2UgYmVsb3cpLCBhbmQgd2Ugd2FudCBlcnJvcnMgaW4gc3RyZWFtIHRvIGVycm9yIGJvdGggYnJhbmNoZXMgaW1tZWRpYXRlbHkuIFdlIGNhbm5vdCBsZXRcbiAgICAgICAgICAgICAgICAvLyBzdWNjZXNzZnVsIHN5bmNocm9ub3VzbHktYXZhaWxhYmxlIHJlYWRzIGdldCBhaGVhZCBvZiBhc3luY2hyb25vdXNseS1hdmFpbGFibGUgZXJyb3JzLlxuICAgICAgICAgICAgICAgIHF1ZXVlTWljcm90YXNrKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVhZEFnYWluRm9yQnJhbmNoMSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICByZWFkQWdhaW5Gb3JCcmFuY2gyID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNodW5rMSA9IGNodW5rO1xuICAgICAgICAgICAgICAgICAgICBsZXQgY2h1bmsyID0gY2h1bms7XG4gICAgICAgICAgICAgICAgICAgIGlmICghY2FuY2VsZWQxICYmICFjYW5jZWxlZDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2h1bmsyID0gQ2xvbmVBc1VpbnQ4QXJyYXkoY2h1bmspO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGNsb25lRSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJFcnJvcihicmFuY2gxLl9yZWFkYWJsZVN0cmVhbUNvbnRyb2xsZXIsIGNsb25lRSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckVycm9yKGJyYW5jaDIuX3JlYWRhYmxlU3RyZWFtQ29udHJvbGxlciwgY2xvbmVFKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlQ2FuY2VsUHJvbWlzZShSZWFkYWJsZVN0cmVhbUNhbmNlbChzdHJlYW0sIGNsb25lRSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoIWNhbmNlbGVkMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckVucXVldWUoYnJhbmNoMS5fcmVhZGFibGVTdHJlYW1Db250cm9sbGVyLCBjaHVuazEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICghY2FuY2VsZWQyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyRW5xdWV1ZShicmFuY2gyLl9yZWFkYWJsZVN0cmVhbUNvbnRyb2xsZXIsIGNodW5rMik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmVhZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVhZEFnYWluRm9yQnJhbmNoMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHVsbDFBbGdvcml0aG0oKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChyZWFkQWdhaW5Gb3JCcmFuY2gyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwdWxsMkFsZ29yaXRobSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX2Nsb3NlU3RlcHM6ICgpID0+IHtcbiAgICAgICAgICAgICAgICByZWFkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgaWYgKCFjYW5jZWxlZDEpIHtcbiAgICAgICAgICAgICAgICAgICAgUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckNsb3NlKGJyYW5jaDEuX3JlYWRhYmxlU3RyZWFtQ29udHJvbGxlcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghY2FuY2VsZWQyKSB7XG4gICAgICAgICAgICAgICAgICAgIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJDbG9zZShicmFuY2gyLl9yZWFkYWJsZVN0cmVhbUNvbnRyb2xsZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoYnJhbmNoMS5fcmVhZGFibGVTdHJlYW1Db250cm9sbGVyLl9wZW5kaW5nUHVsbEludG9zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlclJlc3BvbmQoYnJhbmNoMS5fcmVhZGFibGVTdHJlYW1Db250cm9sbGVyLCAwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGJyYW5jaDIuX3JlYWRhYmxlU3RyZWFtQ29udHJvbGxlci5fcGVuZGluZ1B1bGxJbnRvcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJSZXNwb25kKGJyYW5jaDIuX3JlYWRhYmxlU3RyZWFtQ29udHJvbGxlciwgMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghY2FuY2VsZWQxIHx8ICFjYW5jZWxlZDIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZUNhbmNlbFByb21pc2UodW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX2Vycm9yU3RlcHM6ICgpID0+IHtcbiAgICAgICAgICAgICAgICByZWFkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIFJlYWRhYmxlU3RyZWFtRGVmYXVsdFJlYWRlclJlYWQocmVhZGVyLCByZWFkUmVxdWVzdCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHB1bGxXaXRoQllPQlJlYWRlcih2aWV3LCBmb3JCcmFuY2gyKSB7XG4gICAgICAgIGlmIChJc1JlYWRhYmxlU3RyZWFtRGVmYXVsdFJlYWRlcihyZWFkZXIpKSB7XG4gICAgICAgICAgICBSZWFkYWJsZVN0cmVhbVJlYWRlckdlbmVyaWNSZWxlYXNlKHJlYWRlcik7XG4gICAgICAgICAgICByZWFkZXIgPSBBY3F1aXJlUmVhZGFibGVTdHJlYW1CWU9CUmVhZGVyKHN0cmVhbSk7XG4gICAgICAgICAgICBmb3J3YXJkUmVhZGVyRXJyb3IocmVhZGVyKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBieW9iQnJhbmNoID0gZm9yQnJhbmNoMiA/IGJyYW5jaDIgOiBicmFuY2gxO1xuICAgICAgICBjb25zdCBvdGhlckJyYW5jaCA9IGZvckJyYW5jaDIgPyBicmFuY2gxIDogYnJhbmNoMjtcbiAgICAgICAgY29uc3QgcmVhZEludG9SZXF1ZXN0ID0ge1xuICAgICAgICAgICAgX2NodW5rU3RlcHM6IGNodW5rID0+IHtcbiAgICAgICAgICAgICAgICAvLyBUaGlzIG5lZWRzIHRvIGJlIGRlbGF5ZWQgYSBtaWNyb3Rhc2sgYmVjYXVzZSBpdCB0YWtlcyBhdCBsZWFzdCBhIG1pY3JvdGFzayB0byBkZXRlY3QgZXJyb3JzICh1c2luZ1xuICAgICAgICAgICAgICAgIC8vIHJlYWRlci5fY2xvc2VkUHJvbWlzZSBiZWxvdyksIGFuZCB3ZSB3YW50IGVycm9ycyBpbiBzdHJlYW0gdG8gZXJyb3IgYm90aCBicmFuY2hlcyBpbW1lZGlhdGVseS4gV2UgY2Fubm90IGxldFxuICAgICAgICAgICAgICAgIC8vIHN1Y2Nlc3NmdWwgc3luY2hyb25vdXNseS1hdmFpbGFibGUgcmVhZHMgZ2V0IGFoZWFkIG9mIGFzeW5jaHJvbm91c2x5LWF2YWlsYWJsZSBlcnJvcnMuXG4gICAgICAgICAgICAgICAgcXVldWVNaWNyb3Rhc2soKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZWFkQWdhaW5Gb3JCcmFuY2gxID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHJlYWRBZ2FpbkZvckJyYW5jaDIgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYnlvYkNhbmNlbGVkID0gZm9yQnJhbmNoMiA/IGNhbmNlbGVkMiA6IGNhbmNlbGVkMTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb3RoZXJDYW5jZWxlZCA9IGZvckJyYW5jaDIgPyBjYW5jZWxlZDEgOiBjYW5jZWxlZDI7XG4gICAgICAgICAgICAgICAgICAgIGlmICghb3RoZXJDYW5jZWxlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNsb25lZENodW5rO1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9uZWRDaHVuayA9IENsb25lQXNVaW50OEFycmF5KGNodW5rKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhdGNoIChjbG9uZUUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyRXJyb3IoYnlvYkJyYW5jaC5fcmVhZGFibGVTdHJlYW1Db250cm9sbGVyLCBjbG9uZUUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJFcnJvcihvdGhlckJyYW5jaC5fcmVhZGFibGVTdHJlYW1Db250cm9sbGVyLCBjbG9uZUUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmVDYW5jZWxQcm9taXNlKFJlYWRhYmxlU3RyZWFtQ2FuY2VsKHN0cmVhbSwgY2xvbmVFKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFieW9iQ2FuY2VsZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyUmVzcG9uZFdpdGhOZXdWaWV3KGJ5b2JCcmFuY2guX3JlYWRhYmxlU3RyZWFtQ29udHJvbGxlciwgY2h1bmspO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckVucXVldWUob3RoZXJCcmFuY2guX3JlYWRhYmxlU3RyZWFtQ29udHJvbGxlciwgY2xvbmVkQ2h1bmspO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKCFieW9iQ2FuY2VsZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJSZXNwb25kV2l0aE5ld1ZpZXcoYnlvYkJyYW5jaC5fcmVhZGFibGVTdHJlYW1Db250cm9sbGVyLCBjaHVuayk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmVhZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVhZEFnYWluRm9yQnJhbmNoMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHVsbDFBbGdvcml0aG0oKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChyZWFkQWdhaW5Gb3JCcmFuY2gyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwdWxsMkFsZ29yaXRobSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX2Nsb3NlU3RlcHM6IGNodW5rID0+IHtcbiAgICAgICAgICAgICAgICByZWFkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgY29uc3QgYnlvYkNhbmNlbGVkID0gZm9yQnJhbmNoMiA/IGNhbmNlbGVkMiA6IGNhbmNlbGVkMTtcbiAgICAgICAgICAgICAgICBjb25zdCBvdGhlckNhbmNlbGVkID0gZm9yQnJhbmNoMiA/IGNhbmNlbGVkMSA6IGNhbmNlbGVkMjtcbiAgICAgICAgICAgICAgICBpZiAoIWJ5b2JDYW5jZWxlZCkge1xuICAgICAgICAgICAgICAgICAgICBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyQ2xvc2UoYnlvYkJyYW5jaC5fcmVhZGFibGVTdHJlYW1Db250cm9sbGVyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCFvdGhlckNhbmNlbGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJDbG9zZShvdGhlckJyYW5jaC5fcmVhZGFibGVTdHJlYW1Db250cm9sbGVyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGNodW5rICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFieW9iQ2FuY2VsZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJSZXNwb25kV2l0aE5ld1ZpZXcoYnlvYkJyYW5jaC5fcmVhZGFibGVTdHJlYW1Db250cm9sbGVyLCBjaHVuayk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFvdGhlckNhbmNlbGVkICYmIG90aGVyQnJhbmNoLl9yZWFkYWJsZVN0cmVhbUNvbnRyb2xsZXIuX3BlbmRpbmdQdWxsSW50b3MubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlclJlc3BvbmQob3RoZXJCcmFuY2guX3JlYWRhYmxlU3RyZWFtQ29udHJvbGxlciwgMCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCFieW9iQ2FuY2VsZWQgfHwgIW90aGVyQ2FuY2VsZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZUNhbmNlbFByb21pc2UodW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX2Vycm9yU3RlcHM6ICgpID0+IHtcbiAgICAgICAgICAgICAgICByZWFkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIFJlYWRhYmxlU3RyZWFtQllPQlJlYWRlclJlYWQocmVhZGVyLCB2aWV3LCByZWFkSW50b1JlcXVlc3QpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBwdWxsMUFsZ29yaXRobSgpIHtcbiAgICAgICAgaWYgKHJlYWRpbmcpIHtcbiAgICAgICAgICAgIHJlYWRBZ2FpbkZvckJyYW5jaDEgPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIHByb21pc2VSZXNvbHZlZFdpdGgodW5kZWZpbmVkKTtcbiAgICAgICAgfVxuICAgICAgICByZWFkaW5nID0gdHJ1ZTtcbiAgICAgICAgY29uc3QgYnlvYlJlcXVlc3QgPSBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyR2V0QllPQlJlcXVlc3QoYnJhbmNoMS5fcmVhZGFibGVTdHJlYW1Db250cm9sbGVyKTtcbiAgICAgICAgaWYgKGJ5b2JSZXF1ZXN0ID09PSBudWxsKSB7XG4gICAgICAgICAgICBwdWxsV2l0aERlZmF1bHRSZWFkZXIoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHB1bGxXaXRoQllPQlJlYWRlcihieW9iUmVxdWVzdC5fdmlldywgZmFsc2UpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwcm9taXNlUmVzb2x2ZWRXaXRoKHVuZGVmaW5lZCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHB1bGwyQWxnb3JpdGhtKCkge1xuICAgICAgICBpZiAocmVhZGluZykge1xuICAgICAgICAgICAgcmVhZEFnYWluRm9yQnJhbmNoMiA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4gcHJvbWlzZVJlc29sdmVkV2l0aCh1bmRlZmluZWQpO1xuICAgICAgICB9XG4gICAgICAgIHJlYWRpbmcgPSB0cnVlO1xuICAgICAgICBjb25zdCBieW9iUmVxdWVzdCA9IFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJHZXRCWU9CUmVxdWVzdChicmFuY2gyLl9yZWFkYWJsZVN0cmVhbUNvbnRyb2xsZXIpO1xuICAgICAgICBpZiAoYnlvYlJlcXVlc3QgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHB1bGxXaXRoRGVmYXVsdFJlYWRlcigpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcHVsbFdpdGhCWU9CUmVhZGVyKGJ5b2JSZXF1ZXN0Ll92aWV3LCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcHJvbWlzZVJlc29sdmVkV2l0aCh1bmRlZmluZWQpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjYW5jZWwxQWxnb3JpdGhtKHJlYXNvbikge1xuICAgICAgICBjYW5jZWxlZDEgPSB0cnVlO1xuICAgICAgICByZWFzb24xID0gcmVhc29uO1xuICAgICAgICBpZiAoY2FuY2VsZWQyKSB7XG4gICAgICAgICAgICBjb25zdCBjb21wb3NpdGVSZWFzb24gPSBDcmVhdGVBcnJheUZyb21MaXN0KFtyZWFzb24xLCByZWFzb24yXSk7XG4gICAgICAgICAgICBjb25zdCBjYW5jZWxSZXN1bHQgPSBSZWFkYWJsZVN0cmVhbUNhbmNlbChzdHJlYW0sIGNvbXBvc2l0ZVJlYXNvbik7XG4gICAgICAgICAgICByZXNvbHZlQ2FuY2VsUHJvbWlzZShjYW5jZWxSZXN1bHQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjYW5jZWxQcm9taXNlO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjYW5jZWwyQWxnb3JpdGhtKHJlYXNvbikge1xuICAgICAgICBjYW5jZWxlZDIgPSB0cnVlO1xuICAgICAgICByZWFzb24yID0gcmVhc29uO1xuICAgICAgICBpZiAoY2FuY2VsZWQxKSB7XG4gICAgICAgICAgICBjb25zdCBjb21wb3NpdGVSZWFzb24gPSBDcmVhdGVBcnJheUZyb21MaXN0KFtyZWFzb24xLCByZWFzb24yXSk7XG4gICAgICAgICAgICBjb25zdCBjYW5jZWxSZXN1bHQgPSBSZWFkYWJsZVN0cmVhbUNhbmNlbChzdHJlYW0sIGNvbXBvc2l0ZVJlYXNvbik7XG4gICAgICAgICAgICByZXNvbHZlQ2FuY2VsUHJvbWlzZShjYW5jZWxSZXN1bHQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjYW5jZWxQcm9taXNlO1xuICAgIH1cbiAgICBmdW5jdGlvbiBzdGFydEFsZ29yaXRobSgpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBicmFuY2gxID0gQ3JlYXRlUmVhZGFibGVCeXRlU3RyZWFtKHN0YXJ0QWxnb3JpdGhtLCBwdWxsMUFsZ29yaXRobSwgY2FuY2VsMUFsZ29yaXRobSk7XG4gICAgYnJhbmNoMiA9IENyZWF0ZVJlYWRhYmxlQnl0ZVN0cmVhbShzdGFydEFsZ29yaXRobSwgcHVsbDJBbGdvcml0aG0sIGNhbmNlbDJBbGdvcml0aG0pO1xuICAgIGZvcndhcmRSZWFkZXJFcnJvcihyZWFkZXIpO1xuICAgIHJldHVybiBbYnJhbmNoMSwgYnJhbmNoMl07XG59XG5cbmZ1bmN0aW9uIGNvbnZlcnRVbmRlcmx5aW5nRGVmYXVsdE9yQnl0ZVNvdXJjZShzb3VyY2UsIGNvbnRleHQpIHtcbiAgICBhc3NlcnREaWN0aW9uYXJ5KHNvdXJjZSwgY29udGV4dCk7XG4gICAgY29uc3Qgb3JpZ2luYWwgPSBzb3VyY2U7XG4gICAgY29uc3QgYXV0b0FsbG9jYXRlQ2h1bmtTaXplID0gb3JpZ2luYWwgPT09IG51bGwgfHwgb3JpZ2luYWwgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9yaWdpbmFsLmF1dG9BbGxvY2F0ZUNodW5rU2l6ZTtcbiAgICBjb25zdCBjYW5jZWwgPSBvcmlnaW5hbCA9PT0gbnVsbCB8fCBvcmlnaW5hbCA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3JpZ2luYWwuY2FuY2VsO1xuICAgIGNvbnN0IHB1bGwgPSBvcmlnaW5hbCA9PT0gbnVsbCB8fCBvcmlnaW5hbCA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3JpZ2luYWwucHVsbDtcbiAgICBjb25zdCBzdGFydCA9IG9yaWdpbmFsID09PSBudWxsIHx8IG9yaWdpbmFsID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcmlnaW5hbC5zdGFydDtcbiAgICBjb25zdCB0eXBlID0gb3JpZ2luYWwgPT09IG51bGwgfHwgb3JpZ2luYWwgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9yaWdpbmFsLnR5cGU7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgYXV0b0FsbG9jYXRlQ2h1bmtTaXplOiBhdXRvQWxsb2NhdGVDaHVua1NpemUgPT09IHVuZGVmaW5lZCA/XG4gICAgICAgICAgICB1bmRlZmluZWQgOlxuICAgICAgICAgICAgY29udmVydFVuc2lnbmVkTG9uZ0xvbmdXaXRoRW5mb3JjZVJhbmdlKGF1dG9BbGxvY2F0ZUNodW5rU2l6ZSwgYCR7Y29udGV4dH0gaGFzIG1lbWJlciAnYXV0b0FsbG9jYXRlQ2h1bmtTaXplJyB0aGF0YCksXG4gICAgICAgIGNhbmNlbDogY2FuY2VsID09PSB1bmRlZmluZWQgP1xuICAgICAgICAgICAgdW5kZWZpbmVkIDpcbiAgICAgICAgICAgIGNvbnZlcnRVbmRlcmx5aW5nU291cmNlQ2FuY2VsQ2FsbGJhY2soY2FuY2VsLCBvcmlnaW5hbCwgYCR7Y29udGV4dH0gaGFzIG1lbWJlciAnY2FuY2VsJyB0aGF0YCksXG4gICAgICAgIHB1bGw6IHB1bGwgPT09IHVuZGVmaW5lZCA/XG4gICAgICAgICAgICB1bmRlZmluZWQgOlxuICAgICAgICAgICAgY29udmVydFVuZGVybHlpbmdTb3VyY2VQdWxsQ2FsbGJhY2socHVsbCwgb3JpZ2luYWwsIGAke2NvbnRleHR9IGhhcyBtZW1iZXIgJ3B1bGwnIHRoYXRgKSxcbiAgICAgICAgc3RhcnQ6IHN0YXJ0ID09PSB1bmRlZmluZWQgP1xuICAgICAgICAgICAgdW5kZWZpbmVkIDpcbiAgICAgICAgICAgIGNvbnZlcnRVbmRlcmx5aW5nU291cmNlU3RhcnRDYWxsYmFjayhzdGFydCwgb3JpZ2luYWwsIGAke2NvbnRleHR9IGhhcyBtZW1iZXIgJ3N0YXJ0JyB0aGF0YCksXG4gICAgICAgIHR5cGU6IHR5cGUgPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IGNvbnZlcnRSZWFkYWJsZVN0cmVhbVR5cGUodHlwZSwgYCR7Y29udGV4dH0gaGFzIG1lbWJlciAndHlwZScgdGhhdGApXG4gICAgfTtcbn1cbmZ1bmN0aW9uIGNvbnZlcnRVbmRlcmx5aW5nU291cmNlQ2FuY2VsQ2FsbGJhY2soZm4sIG9yaWdpbmFsLCBjb250ZXh0KSB7XG4gICAgYXNzZXJ0RnVuY3Rpb24oZm4sIGNvbnRleHQpO1xuICAgIHJldHVybiAocmVhc29uKSA9PiBwcm9taXNlQ2FsbChmbiwgb3JpZ2luYWwsIFtyZWFzb25dKTtcbn1cbmZ1bmN0aW9uIGNvbnZlcnRVbmRlcmx5aW5nU291cmNlUHVsbENhbGxiYWNrKGZuLCBvcmlnaW5hbCwgY29udGV4dCkge1xuICAgIGFzc2VydEZ1bmN0aW9uKGZuLCBjb250ZXh0KTtcbiAgICByZXR1cm4gKGNvbnRyb2xsZXIpID0+IHByb21pc2VDYWxsKGZuLCBvcmlnaW5hbCwgW2NvbnRyb2xsZXJdKTtcbn1cbmZ1bmN0aW9uIGNvbnZlcnRVbmRlcmx5aW5nU291cmNlU3RhcnRDYWxsYmFjayhmbiwgb3JpZ2luYWwsIGNvbnRleHQpIHtcbiAgICBhc3NlcnRGdW5jdGlvbihmbiwgY29udGV4dCk7XG4gICAgcmV0dXJuIChjb250cm9sbGVyKSA9PiByZWZsZWN0Q2FsbChmbiwgb3JpZ2luYWwsIFtjb250cm9sbGVyXSk7XG59XG5mdW5jdGlvbiBjb252ZXJ0UmVhZGFibGVTdHJlYW1UeXBlKHR5cGUsIGNvbnRleHQpIHtcbiAgICB0eXBlID0gYCR7dHlwZX1gO1xuICAgIGlmICh0eXBlICE9PSAnYnl0ZXMnKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYCR7Y29udGV4dH0gJyR7dHlwZX0nIGlzIG5vdCBhIHZhbGlkIGVudW1lcmF0aW9uIHZhbHVlIGZvciBSZWFkYWJsZVN0cmVhbVR5cGVgKTtcbiAgICB9XG4gICAgcmV0dXJuIHR5cGU7XG59XG5cbmZ1bmN0aW9uIGNvbnZlcnRSZWFkZXJPcHRpb25zKG9wdGlvbnMsIGNvbnRleHQpIHtcbiAgICBhc3NlcnREaWN0aW9uYXJ5KG9wdGlvbnMsIGNvbnRleHQpO1xuICAgIGNvbnN0IG1vZGUgPSBvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMubW9kZTtcbiAgICByZXR1cm4ge1xuICAgICAgICBtb2RlOiBtb2RlID09PSB1bmRlZmluZWQgPyB1bmRlZmluZWQgOiBjb252ZXJ0UmVhZGFibGVTdHJlYW1SZWFkZXJNb2RlKG1vZGUsIGAke2NvbnRleHR9IGhhcyBtZW1iZXIgJ21vZGUnIHRoYXRgKVxuICAgIH07XG59XG5mdW5jdGlvbiBjb252ZXJ0UmVhZGFibGVTdHJlYW1SZWFkZXJNb2RlKG1vZGUsIGNvbnRleHQpIHtcbiAgICBtb2RlID0gYCR7bW9kZX1gO1xuICAgIGlmIChtb2RlICE9PSAnYnlvYicpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgJHtjb250ZXh0fSAnJHttb2RlfScgaXMgbm90IGEgdmFsaWQgZW51bWVyYXRpb24gdmFsdWUgZm9yIFJlYWRhYmxlU3RyZWFtUmVhZGVyTW9kZWApO1xuICAgIH1cbiAgICByZXR1cm4gbW9kZTtcbn1cblxuZnVuY3Rpb24gY29udmVydEl0ZXJhdG9yT3B0aW9ucyhvcHRpb25zLCBjb250ZXh0KSB7XG4gICAgYXNzZXJ0RGljdGlvbmFyeShvcHRpb25zLCBjb250ZXh0KTtcbiAgICBjb25zdCBwcmV2ZW50Q2FuY2VsID0gb3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLnByZXZlbnRDYW5jZWw7XG4gICAgcmV0dXJuIHsgcHJldmVudENhbmNlbDogQm9vbGVhbihwcmV2ZW50Q2FuY2VsKSB9O1xufVxuXG5mdW5jdGlvbiBjb252ZXJ0UGlwZU9wdGlvbnMob3B0aW9ucywgY29udGV4dCkge1xuICAgIGFzc2VydERpY3Rpb25hcnkob3B0aW9ucywgY29udGV4dCk7XG4gICAgY29uc3QgcHJldmVudEFib3J0ID0gb3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLnByZXZlbnRBYm9ydDtcbiAgICBjb25zdCBwcmV2ZW50Q2FuY2VsID0gb3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLnByZXZlbnRDYW5jZWw7XG4gICAgY29uc3QgcHJldmVudENsb3NlID0gb3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLnByZXZlbnRDbG9zZTtcbiAgICBjb25zdCBzaWduYWwgPSBvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMuc2lnbmFsO1xuICAgIGlmIChzaWduYWwgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBhc3NlcnRBYm9ydFNpZ25hbChzaWduYWwsIGAke2NvbnRleHR9IGhhcyBtZW1iZXIgJ3NpZ25hbCcgdGhhdGApO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICBwcmV2ZW50QWJvcnQ6IEJvb2xlYW4ocHJldmVudEFib3J0KSxcbiAgICAgICAgcHJldmVudENhbmNlbDogQm9vbGVhbihwcmV2ZW50Q2FuY2VsKSxcbiAgICAgICAgcHJldmVudENsb3NlOiBCb29sZWFuKHByZXZlbnRDbG9zZSksXG4gICAgICAgIHNpZ25hbFxuICAgIH07XG59XG5mdW5jdGlvbiBhc3NlcnRBYm9ydFNpZ25hbChzaWduYWwsIGNvbnRleHQpIHtcbiAgICBpZiAoIWlzQWJvcnRTaWduYWwoc2lnbmFsKSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGAke2NvbnRleHR9IGlzIG5vdCBhbiBBYm9ydFNpZ25hbC5gKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGNvbnZlcnRSZWFkYWJsZVdyaXRhYmxlUGFpcihwYWlyLCBjb250ZXh0KSB7XG4gICAgYXNzZXJ0RGljdGlvbmFyeShwYWlyLCBjb250ZXh0KTtcbiAgICBjb25zdCByZWFkYWJsZSA9IHBhaXIgPT09IG51bGwgfHwgcGFpciA9PT0gdm9pZCAwID8gdm9pZCAwIDogcGFpci5yZWFkYWJsZTtcbiAgICBhc3NlcnRSZXF1aXJlZEZpZWxkKHJlYWRhYmxlLCAncmVhZGFibGUnLCAnUmVhZGFibGVXcml0YWJsZVBhaXInKTtcbiAgICBhc3NlcnRSZWFkYWJsZVN0cmVhbShyZWFkYWJsZSwgYCR7Y29udGV4dH0gaGFzIG1lbWJlciAncmVhZGFibGUnIHRoYXRgKTtcbiAgICBjb25zdCB3cml0YWJsZSA9IHBhaXIgPT09IG51bGwgfHwgcGFpciA9PT0gdm9pZCAwID8gdm9pZCAwIDogcGFpci53cml0YWJsZTtcbiAgICBhc3NlcnRSZXF1aXJlZEZpZWxkKHdyaXRhYmxlLCAnd3JpdGFibGUnLCAnUmVhZGFibGVXcml0YWJsZVBhaXInKTtcbiAgICBhc3NlcnRXcml0YWJsZVN0cmVhbSh3cml0YWJsZSwgYCR7Y29udGV4dH0gaGFzIG1lbWJlciAnd3JpdGFibGUnIHRoYXRgKTtcbiAgICByZXR1cm4geyByZWFkYWJsZSwgd3JpdGFibGUgfTtcbn1cblxuLyoqXG4gKiBBIHJlYWRhYmxlIHN0cmVhbSByZXByZXNlbnRzIGEgc291cmNlIG9mIGRhdGEsIGZyb20gd2hpY2ggeW91IGNhbiByZWFkLlxuICpcbiAqIEBwdWJsaWNcbiAqL1xuY2xhc3MgUmVhZGFibGVTdHJlYW0ge1xuICAgIGNvbnN0cnVjdG9yKHJhd1VuZGVybHlpbmdTb3VyY2UgPSB7fSwgcmF3U3RyYXRlZ3kgPSB7fSkge1xuICAgICAgICBpZiAocmF3VW5kZXJseWluZ1NvdXJjZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByYXdVbmRlcmx5aW5nU291cmNlID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGFzc2VydE9iamVjdChyYXdVbmRlcmx5aW5nU291cmNlLCAnRmlyc3QgcGFyYW1ldGVyJyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc3RyYXRlZ3kgPSBjb252ZXJ0UXVldWluZ1N0cmF0ZWd5KHJhd1N0cmF0ZWd5LCAnU2Vjb25kIHBhcmFtZXRlcicpO1xuICAgICAgICBjb25zdCB1bmRlcmx5aW5nU291cmNlID0gY29udmVydFVuZGVybHlpbmdEZWZhdWx0T3JCeXRlU291cmNlKHJhd1VuZGVybHlpbmdTb3VyY2UsICdGaXJzdCBwYXJhbWV0ZXInKTtcbiAgICAgICAgSW5pdGlhbGl6ZVJlYWRhYmxlU3RyZWFtKHRoaXMpO1xuICAgICAgICBpZiAodW5kZXJseWluZ1NvdXJjZS50eXBlID09PSAnYnl0ZXMnKSB7XG4gICAgICAgICAgICBpZiAoc3RyYXRlZ3kuc2l6ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1RoZSBzdHJhdGVneSBmb3IgYSBieXRlIHN0cmVhbSBjYW5ub3QgaGF2ZSBhIHNpemUgZnVuY3Rpb24nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGhpZ2hXYXRlck1hcmsgPSBFeHRyYWN0SGlnaFdhdGVyTWFyayhzdHJhdGVneSwgMCk7XG4gICAgICAgICAgICBTZXRVcFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJGcm9tVW5kZXJseWluZ1NvdXJjZSh0aGlzLCB1bmRlcmx5aW5nU291cmNlLCBoaWdoV2F0ZXJNYXJrKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHNpemVBbGdvcml0aG0gPSBFeHRyYWN0U2l6ZUFsZ29yaXRobShzdHJhdGVneSk7XG4gICAgICAgICAgICBjb25zdCBoaWdoV2F0ZXJNYXJrID0gRXh0cmFjdEhpZ2hXYXRlck1hcmsoc3RyYXRlZ3ksIDEpO1xuICAgICAgICAgICAgU2V0VXBSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyRnJvbVVuZGVybHlpbmdTb3VyY2UodGhpcywgdW5kZXJseWluZ1NvdXJjZSwgaGlnaFdhdGVyTWFyaywgc2l6ZUFsZ29yaXRobSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogV2hldGhlciBvciBub3QgdGhlIHJlYWRhYmxlIHN0cmVhbSBpcyBsb2NrZWQgdG8gYSB7QGxpbmsgUmVhZGFibGVTdHJlYW1EZWZhdWx0UmVhZGVyIHwgcmVhZGVyfS5cbiAgICAgKi9cbiAgICBnZXQgbG9ja2VkKCkge1xuICAgICAgICBpZiAoIUlzUmVhZGFibGVTdHJlYW0odGhpcykpIHtcbiAgICAgICAgICAgIHRocm93IHN0cmVhbUJyYW5kQ2hlY2tFeGNlcHRpb24kMSgnbG9ja2VkJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIElzUmVhZGFibGVTdHJlYW1Mb2NrZWQodGhpcyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbmNlbHMgdGhlIHN0cmVhbSwgc2lnbmFsaW5nIGEgbG9zcyBvZiBpbnRlcmVzdCBpbiB0aGUgc3RyZWFtIGJ5IGEgY29uc3VtZXIuXG4gICAgICpcbiAgICAgKiBUaGUgc3VwcGxpZWQgYHJlYXNvbmAgYXJndW1lbnQgd2lsbCBiZSBnaXZlbiB0byB0aGUgdW5kZXJseWluZyBzb3VyY2UncyB7QGxpbmsgVW5kZXJseWluZ1NvdXJjZS5jYW5jZWwgfCBjYW5jZWwoKX1cbiAgICAgKiBtZXRob2QsIHdoaWNoIG1pZ2h0IG9yIG1pZ2h0IG5vdCB1c2UgaXQuXG4gICAgICovXG4gICAgY2FuY2VsKHJlYXNvbiA9IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAoIUlzUmVhZGFibGVTdHJlYW0odGhpcykpIHtcbiAgICAgICAgICAgIHJldHVybiBwcm9taXNlUmVqZWN0ZWRXaXRoKHN0cmVhbUJyYW5kQ2hlY2tFeGNlcHRpb24kMSgnY2FuY2VsJykpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChJc1JlYWRhYmxlU3RyZWFtTG9ja2VkKHRoaXMpKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJvbWlzZVJlamVjdGVkV2l0aChuZXcgVHlwZUVycm9yKCdDYW5ub3QgY2FuY2VsIGEgc3RyZWFtIHRoYXQgYWxyZWFkeSBoYXMgYSByZWFkZXInKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFJlYWRhYmxlU3RyZWFtQ2FuY2VsKHRoaXMsIHJlYXNvbik7XG4gICAgfVxuICAgIGdldFJlYWRlcihyYXdPcHRpb25zID0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmICghSXNSZWFkYWJsZVN0cmVhbSh0aGlzKSkge1xuICAgICAgICAgICAgdGhyb3cgc3RyZWFtQnJhbmRDaGVja0V4Y2VwdGlvbiQxKCdnZXRSZWFkZXInKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBvcHRpb25zID0gY29udmVydFJlYWRlck9wdGlvbnMocmF3T3B0aW9ucywgJ0ZpcnN0IHBhcmFtZXRlcicpO1xuICAgICAgICBpZiAob3B0aW9ucy5tb2RlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBBY3F1aXJlUmVhZGFibGVTdHJlYW1EZWZhdWx0UmVhZGVyKHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBBY3F1aXJlUmVhZGFibGVTdHJlYW1CWU9CUmVhZGVyKHRoaXMpO1xuICAgIH1cbiAgICBwaXBlVGhyb3VnaChyYXdUcmFuc2Zvcm0sIHJhd09wdGlvbnMgPSB7fSkge1xuICAgICAgICBpZiAoIUlzUmVhZGFibGVTdHJlYW0odGhpcykpIHtcbiAgICAgICAgICAgIHRocm93IHN0cmVhbUJyYW5kQ2hlY2tFeGNlcHRpb24kMSgncGlwZVRocm91Z2gnKTtcbiAgICAgICAgfVxuICAgICAgICBhc3NlcnRSZXF1aXJlZEFyZ3VtZW50KHJhd1RyYW5zZm9ybSwgMSwgJ3BpcGVUaHJvdWdoJyk7XG4gICAgICAgIGNvbnN0IHRyYW5zZm9ybSA9IGNvbnZlcnRSZWFkYWJsZVdyaXRhYmxlUGFpcihyYXdUcmFuc2Zvcm0sICdGaXJzdCBwYXJhbWV0ZXInKTtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IGNvbnZlcnRQaXBlT3B0aW9ucyhyYXdPcHRpb25zLCAnU2Vjb25kIHBhcmFtZXRlcicpO1xuICAgICAgICBpZiAoSXNSZWFkYWJsZVN0cmVhbUxvY2tlZCh0aGlzKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignUmVhZGFibGVTdHJlYW0ucHJvdG90eXBlLnBpcGVUaHJvdWdoIGNhbm5vdCBiZSB1c2VkIG9uIGEgbG9ja2VkIFJlYWRhYmxlU3RyZWFtJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKElzV3JpdGFibGVTdHJlYW1Mb2NrZWQodHJhbnNmb3JtLndyaXRhYmxlKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignUmVhZGFibGVTdHJlYW0ucHJvdG90eXBlLnBpcGVUaHJvdWdoIGNhbm5vdCBiZSB1c2VkIG9uIGEgbG9ja2VkIFdyaXRhYmxlU3RyZWFtJyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcHJvbWlzZSA9IFJlYWRhYmxlU3RyZWFtUGlwZVRvKHRoaXMsIHRyYW5zZm9ybS53cml0YWJsZSwgb3B0aW9ucy5wcmV2ZW50Q2xvc2UsIG9wdGlvbnMucHJldmVudEFib3J0LCBvcHRpb25zLnByZXZlbnRDYW5jZWwsIG9wdGlvbnMuc2lnbmFsKTtcbiAgICAgICAgc2V0UHJvbWlzZUlzSGFuZGxlZFRvVHJ1ZShwcm9taXNlKTtcbiAgICAgICAgcmV0dXJuIHRyYW5zZm9ybS5yZWFkYWJsZTtcbiAgICB9XG4gICAgcGlwZVRvKGRlc3RpbmF0aW9uLCByYXdPcHRpb25zID0ge30pIHtcbiAgICAgICAgaWYgKCFJc1JlYWRhYmxlU3RyZWFtKHRoaXMpKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJvbWlzZVJlamVjdGVkV2l0aChzdHJlYW1CcmFuZENoZWNrRXhjZXB0aW9uJDEoJ3BpcGVUbycpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGVzdGluYXRpb24gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIHByb21pc2VSZWplY3RlZFdpdGgoYFBhcmFtZXRlciAxIGlzIHJlcXVpcmVkIGluICdwaXBlVG8nLmApO1xuICAgICAgICB9XG4gICAgICAgIGlmICghSXNXcml0YWJsZVN0cmVhbShkZXN0aW5hdGlvbikpIHtcbiAgICAgICAgICAgIHJldHVybiBwcm9taXNlUmVqZWN0ZWRXaXRoKG5ldyBUeXBlRXJyb3IoYFJlYWRhYmxlU3RyZWFtLnByb3RvdHlwZS5waXBlVG8ncyBmaXJzdCBhcmd1bWVudCBtdXN0IGJlIGEgV3JpdGFibGVTdHJlYW1gKSk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IG9wdGlvbnM7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBvcHRpb25zID0gY29udmVydFBpcGVPcHRpb25zKHJhd09wdGlvbnMsICdTZWNvbmQgcGFyYW1ldGVyJyk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHJldHVybiBwcm9taXNlUmVqZWN0ZWRXaXRoKGUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChJc1JlYWRhYmxlU3RyZWFtTG9ja2VkKHRoaXMpKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJvbWlzZVJlamVjdGVkV2l0aChuZXcgVHlwZUVycm9yKCdSZWFkYWJsZVN0cmVhbS5wcm90b3R5cGUucGlwZVRvIGNhbm5vdCBiZSB1c2VkIG9uIGEgbG9ja2VkIFJlYWRhYmxlU3RyZWFtJykpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChJc1dyaXRhYmxlU3RyZWFtTG9ja2VkKGRlc3RpbmF0aW9uKSkge1xuICAgICAgICAgICAgcmV0dXJuIHByb21pc2VSZWplY3RlZFdpdGgobmV3IFR5cGVFcnJvcignUmVhZGFibGVTdHJlYW0ucHJvdG90eXBlLnBpcGVUbyBjYW5ub3QgYmUgdXNlZCBvbiBhIGxvY2tlZCBXcml0YWJsZVN0cmVhbScpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUmVhZGFibGVTdHJlYW1QaXBlVG8odGhpcywgZGVzdGluYXRpb24sIG9wdGlvbnMucHJldmVudENsb3NlLCBvcHRpb25zLnByZXZlbnRBYm9ydCwgb3B0aW9ucy5wcmV2ZW50Q2FuY2VsLCBvcHRpb25zLnNpZ25hbCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRlZXMgdGhpcyByZWFkYWJsZSBzdHJlYW0sIHJldHVybmluZyBhIHR3by1lbGVtZW50IGFycmF5IGNvbnRhaW5pbmcgdGhlIHR3byByZXN1bHRpbmcgYnJhbmNoZXMgYXNcbiAgICAgKiBuZXcge0BsaW5rIFJlYWRhYmxlU3RyZWFtfSBpbnN0YW5jZXMuXG4gICAgICpcbiAgICAgKiBUZWVpbmcgYSBzdHJlYW0gd2lsbCBsb2NrIGl0LCBwcmV2ZW50aW5nIGFueSBvdGhlciBjb25zdW1lciBmcm9tIGFjcXVpcmluZyBhIHJlYWRlci5cbiAgICAgKiBUbyBjYW5jZWwgdGhlIHN0cmVhbSwgY2FuY2VsIGJvdGggb2YgdGhlIHJlc3VsdGluZyBicmFuY2hlczsgYSBjb21wb3NpdGUgY2FuY2VsbGF0aW9uIHJlYXNvbiB3aWxsIHRoZW4gYmVcbiAgICAgKiBwcm9wYWdhdGVkIHRvIHRoZSBzdHJlYW0ncyB1bmRlcmx5aW5nIHNvdXJjZS5cbiAgICAgKlxuICAgICAqIE5vdGUgdGhhdCB0aGUgY2h1bmtzIHNlZW4gaW4gZWFjaCBicmFuY2ggd2lsbCBiZSB0aGUgc2FtZSBvYmplY3QuIElmIHRoZSBjaHVua3MgYXJlIG5vdCBpbW11dGFibGUsXG4gICAgICogdGhpcyBjb3VsZCBhbGxvdyBpbnRlcmZlcmVuY2UgYmV0d2VlbiB0aGUgdHdvIGJyYW5jaGVzLlxuICAgICAqL1xuICAgIHRlZSgpIHtcbiAgICAgICAgaWYgKCFJc1JlYWRhYmxlU3RyZWFtKHRoaXMpKSB7XG4gICAgICAgICAgICB0aHJvdyBzdHJlYW1CcmFuZENoZWNrRXhjZXB0aW9uJDEoJ3RlZScpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGJyYW5jaGVzID0gUmVhZGFibGVTdHJlYW1UZWUodGhpcyk7XG4gICAgICAgIHJldHVybiBDcmVhdGVBcnJheUZyb21MaXN0KGJyYW5jaGVzKTtcbiAgICB9XG4gICAgdmFsdWVzKHJhd09wdGlvbnMgPSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKCFJc1JlYWRhYmxlU3RyZWFtKHRoaXMpKSB7XG4gICAgICAgICAgICB0aHJvdyBzdHJlYW1CcmFuZENoZWNrRXhjZXB0aW9uJDEoJ3ZhbHVlcycpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSBjb252ZXJ0SXRlcmF0b3JPcHRpb25zKHJhd09wdGlvbnMsICdGaXJzdCBwYXJhbWV0ZXInKTtcbiAgICAgICAgcmV0dXJuIEFjcXVpcmVSZWFkYWJsZVN0cmVhbUFzeW5jSXRlcmF0b3IodGhpcywgb3B0aW9ucy5wcmV2ZW50Q2FuY2VsKTtcbiAgICB9XG59XG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyhSZWFkYWJsZVN0cmVhbS5wcm90b3R5cGUsIHtcbiAgICBjYW5jZWw6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxuICAgIGdldFJlYWRlcjogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG4gICAgcGlwZVRocm91Z2g6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxuICAgIHBpcGVUbzogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG4gICAgdGVlOiB7IGVudW1lcmFibGU6IHRydWUgfSxcbiAgICB2YWx1ZXM6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxuICAgIGxvY2tlZDogeyBlbnVtZXJhYmxlOiB0cnVlIH1cbn0pO1xuaWYgKHR5cGVvZiBTeW1ib2xQb2x5ZmlsbC50b1N0cmluZ1RhZyA9PT0gJ3N5bWJvbCcpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoUmVhZGFibGVTdHJlYW0ucHJvdG90eXBlLCBTeW1ib2xQb2x5ZmlsbC50b1N0cmluZ1RhZywge1xuICAgICAgICB2YWx1ZTogJ1JlYWRhYmxlU3RyZWFtJyxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG59XG5pZiAodHlwZW9mIFN5bWJvbFBvbHlmaWxsLmFzeW5jSXRlcmF0b3IgPT09ICdzeW1ib2wnKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFJlYWRhYmxlU3RyZWFtLnByb3RvdHlwZSwgU3ltYm9sUG9seWZpbGwuYXN5bmNJdGVyYXRvciwge1xuICAgICAgICB2YWx1ZTogUmVhZGFibGVTdHJlYW0ucHJvdG90eXBlLnZhbHVlcyxcbiAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xufVxuLy8gQWJzdHJhY3Qgb3BlcmF0aW9ucyBmb3IgdGhlIFJlYWRhYmxlU3RyZWFtLlxuLy8gVGhyb3dzIGlmIGFuZCBvbmx5IGlmIHN0YXJ0QWxnb3JpdGhtIHRocm93cy5cbmZ1bmN0aW9uIENyZWF0ZVJlYWRhYmxlU3RyZWFtKHN0YXJ0QWxnb3JpdGhtLCBwdWxsQWxnb3JpdGhtLCBjYW5jZWxBbGdvcml0aG0sIGhpZ2hXYXRlck1hcmsgPSAxLCBzaXplQWxnb3JpdGhtID0gKCkgPT4gMSkge1xuICAgIGNvbnN0IHN0cmVhbSA9IE9iamVjdC5jcmVhdGUoUmVhZGFibGVTdHJlYW0ucHJvdG90eXBlKTtcbiAgICBJbml0aWFsaXplUmVhZGFibGVTdHJlYW0oc3RyZWFtKTtcbiAgICBjb25zdCBjb250cm9sbGVyID0gT2JqZWN0LmNyZWF0ZShSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyLnByb3RvdHlwZSk7XG4gICAgU2V0VXBSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyKHN0cmVhbSwgY29udHJvbGxlciwgc3RhcnRBbGdvcml0aG0sIHB1bGxBbGdvcml0aG0sIGNhbmNlbEFsZ29yaXRobSwgaGlnaFdhdGVyTWFyaywgc2l6ZUFsZ29yaXRobSk7XG4gICAgcmV0dXJuIHN0cmVhbTtcbn1cbi8vIFRocm93cyBpZiBhbmQgb25seSBpZiBzdGFydEFsZ29yaXRobSB0aHJvd3MuXG5mdW5jdGlvbiBDcmVhdGVSZWFkYWJsZUJ5dGVTdHJlYW0oc3RhcnRBbGdvcml0aG0sIHB1bGxBbGdvcml0aG0sIGNhbmNlbEFsZ29yaXRobSkge1xuICAgIGNvbnN0IHN0cmVhbSA9IE9iamVjdC5jcmVhdGUoUmVhZGFibGVTdHJlYW0ucHJvdG90eXBlKTtcbiAgICBJbml0aWFsaXplUmVhZGFibGVTdHJlYW0oc3RyZWFtKTtcbiAgICBjb25zdCBjb250cm9sbGVyID0gT2JqZWN0LmNyZWF0ZShSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyLnByb3RvdHlwZSk7XG4gICAgU2V0VXBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyKHN0cmVhbSwgY29udHJvbGxlciwgc3RhcnRBbGdvcml0aG0sIHB1bGxBbGdvcml0aG0sIGNhbmNlbEFsZ29yaXRobSwgMCwgdW5kZWZpbmVkKTtcbiAgICByZXR1cm4gc3RyZWFtO1xufVxuZnVuY3Rpb24gSW5pdGlhbGl6ZVJlYWRhYmxlU3RyZWFtKHN0cmVhbSkge1xuICAgIHN0cmVhbS5fc3RhdGUgPSAncmVhZGFibGUnO1xuICAgIHN0cmVhbS5fcmVhZGVyID0gdW5kZWZpbmVkO1xuICAgIHN0cmVhbS5fc3RvcmVkRXJyb3IgPSB1bmRlZmluZWQ7XG4gICAgc3RyZWFtLl9kaXN0dXJiZWQgPSBmYWxzZTtcbn1cbmZ1bmN0aW9uIElzUmVhZGFibGVTdHJlYW0oeCkge1xuICAgIGlmICghdHlwZUlzT2JqZWN0KHgpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoeCwgJ19yZWFkYWJsZVN0cmVhbUNvbnRyb2xsZXInKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB4IGluc3RhbmNlb2YgUmVhZGFibGVTdHJlYW07XG59XG5mdW5jdGlvbiBJc1JlYWRhYmxlU3RyZWFtTG9ja2VkKHN0cmVhbSkge1xuICAgIGlmIChzdHJlYW0uX3JlYWRlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG59XG4vLyBSZWFkYWJsZVN0cmVhbSBBUEkgZXhwb3NlZCBmb3IgY29udHJvbGxlcnMuXG5mdW5jdGlvbiBSZWFkYWJsZVN0cmVhbUNhbmNlbChzdHJlYW0sIHJlYXNvbikge1xuICAgIHN0cmVhbS5fZGlzdHVyYmVkID0gdHJ1ZTtcbiAgICBpZiAoc3RyZWFtLl9zdGF0ZSA9PT0gJ2Nsb3NlZCcpIHtcbiAgICAgICAgcmV0dXJuIHByb21pc2VSZXNvbHZlZFdpdGgodW5kZWZpbmVkKTtcbiAgICB9XG4gICAgaWYgKHN0cmVhbS5fc3RhdGUgPT09ICdlcnJvcmVkJykge1xuICAgICAgICByZXR1cm4gcHJvbWlzZVJlamVjdGVkV2l0aChzdHJlYW0uX3N0b3JlZEVycm9yKTtcbiAgICB9XG4gICAgUmVhZGFibGVTdHJlYW1DbG9zZShzdHJlYW0pO1xuICAgIGNvbnN0IHJlYWRlciA9IHN0cmVhbS5fcmVhZGVyO1xuICAgIGlmIChyZWFkZXIgIT09IHVuZGVmaW5lZCAmJiBJc1JlYWRhYmxlU3RyZWFtQllPQlJlYWRlcihyZWFkZXIpKSB7XG4gICAgICAgIHJlYWRlci5fcmVhZEludG9SZXF1ZXN0cy5mb3JFYWNoKHJlYWRJbnRvUmVxdWVzdCA9PiB7XG4gICAgICAgICAgICByZWFkSW50b1JlcXVlc3QuX2Nsb3NlU3RlcHModW5kZWZpbmVkKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJlYWRlci5fcmVhZEludG9SZXF1ZXN0cyA9IG5ldyBTaW1wbGVRdWV1ZSgpO1xuICAgIH1cbiAgICBjb25zdCBzb3VyY2VDYW5jZWxQcm9taXNlID0gc3RyZWFtLl9yZWFkYWJsZVN0cmVhbUNvbnRyb2xsZXJbQ2FuY2VsU3RlcHNdKHJlYXNvbik7XG4gICAgcmV0dXJuIHRyYW5zZm9ybVByb21pc2VXaXRoKHNvdXJjZUNhbmNlbFByb21pc2UsIG5vb3ApO1xufVxuZnVuY3Rpb24gUmVhZGFibGVTdHJlYW1DbG9zZShzdHJlYW0pIHtcbiAgICBzdHJlYW0uX3N0YXRlID0gJ2Nsb3NlZCc7XG4gICAgY29uc3QgcmVhZGVyID0gc3RyZWFtLl9yZWFkZXI7XG4gICAgaWYgKHJlYWRlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZGVmYXVsdFJlYWRlckNsb3NlZFByb21pc2VSZXNvbHZlKHJlYWRlcik7XG4gICAgaWYgKElzUmVhZGFibGVTdHJlYW1EZWZhdWx0UmVhZGVyKHJlYWRlcikpIHtcbiAgICAgICAgcmVhZGVyLl9yZWFkUmVxdWVzdHMuZm9yRWFjaChyZWFkUmVxdWVzdCA9PiB7XG4gICAgICAgICAgICByZWFkUmVxdWVzdC5fY2xvc2VTdGVwcygpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmVhZGVyLl9yZWFkUmVxdWVzdHMgPSBuZXcgU2ltcGxlUXVldWUoKTtcbiAgICB9XG59XG5mdW5jdGlvbiBSZWFkYWJsZVN0cmVhbUVycm9yKHN0cmVhbSwgZSkge1xuICAgIHN0cmVhbS5fc3RhdGUgPSAnZXJyb3JlZCc7XG4gICAgc3RyZWFtLl9zdG9yZWRFcnJvciA9IGU7XG4gICAgY29uc3QgcmVhZGVyID0gc3RyZWFtLl9yZWFkZXI7XG4gICAgaWYgKHJlYWRlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZGVmYXVsdFJlYWRlckNsb3NlZFByb21pc2VSZWplY3QocmVhZGVyLCBlKTtcbiAgICBpZiAoSXNSZWFkYWJsZVN0cmVhbURlZmF1bHRSZWFkZXIocmVhZGVyKSkge1xuICAgICAgICByZWFkZXIuX3JlYWRSZXF1ZXN0cy5mb3JFYWNoKHJlYWRSZXF1ZXN0ID0+IHtcbiAgICAgICAgICAgIHJlYWRSZXF1ZXN0Ll9lcnJvclN0ZXBzKGUpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmVhZGVyLl9yZWFkUmVxdWVzdHMgPSBuZXcgU2ltcGxlUXVldWUoKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJlYWRlci5fcmVhZEludG9SZXF1ZXN0cy5mb3JFYWNoKHJlYWRJbnRvUmVxdWVzdCA9PiB7XG4gICAgICAgICAgICByZWFkSW50b1JlcXVlc3QuX2Vycm9yU3RlcHMoZSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZWFkZXIuX3JlYWRJbnRvUmVxdWVzdHMgPSBuZXcgU2ltcGxlUXVldWUoKTtcbiAgICB9XG59XG4vLyBIZWxwZXIgZnVuY3Rpb25zIGZvciB0aGUgUmVhZGFibGVTdHJlYW0uXG5mdW5jdGlvbiBzdHJlYW1CcmFuZENoZWNrRXhjZXB0aW9uJDEobmFtZSkge1xuICAgIHJldHVybiBuZXcgVHlwZUVycm9yKGBSZWFkYWJsZVN0cmVhbS5wcm90b3R5cGUuJHtuYW1lfSBjYW4gb25seSBiZSB1c2VkIG9uIGEgUmVhZGFibGVTdHJlYW1gKTtcbn1cblxuZnVuY3Rpb24gY29udmVydFF1ZXVpbmdTdHJhdGVneUluaXQoaW5pdCwgY29udGV4dCkge1xuICAgIGFzc2VydERpY3Rpb25hcnkoaW5pdCwgY29udGV4dCk7XG4gICAgY29uc3QgaGlnaFdhdGVyTWFyayA9IGluaXQgPT09IG51bGwgfHwgaW5pdCA9PT0gdm9pZCAwID8gdm9pZCAwIDogaW5pdC5oaWdoV2F0ZXJNYXJrO1xuICAgIGFzc2VydFJlcXVpcmVkRmllbGQoaGlnaFdhdGVyTWFyaywgJ2hpZ2hXYXRlck1hcmsnLCAnUXVldWluZ1N0cmF0ZWd5SW5pdCcpO1xuICAgIHJldHVybiB7XG4gICAgICAgIGhpZ2hXYXRlck1hcms6IGNvbnZlcnRVbnJlc3RyaWN0ZWREb3VibGUoaGlnaFdhdGVyTWFyaylcbiAgICB9O1xufVxuXG4vLyBUaGUgc2l6ZSBmdW5jdGlvbiBtdXN0IG5vdCBoYXZlIGEgcHJvdG90eXBlIHByb3BlcnR5IG5vciBiZSBhIGNvbnN0cnVjdG9yXG5jb25zdCBieXRlTGVuZ3RoU2l6ZUZ1bmN0aW9uID0gKGNodW5rKSA9PiB7XG4gICAgcmV0dXJuIGNodW5rLmJ5dGVMZW5ndGg7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGJ5dGVMZW5ndGhTaXplRnVuY3Rpb24sICduYW1lJywge1xuICAgIHZhbHVlOiAnc2l6ZScsXG4gICAgY29uZmlndXJhYmxlOiB0cnVlXG59KTtcbi8qKlxuICogQSBxdWV1aW5nIHN0cmF0ZWd5IHRoYXQgY291bnRzIHRoZSBudW1iZXIgb2YgYnl0ZXMgaW4gZWFjaCBjaHVuay5cbiAqXG4gKiBAcHVibGljXG4gKi9cbmNsYXNzIEJ5dGVMZW5ndGhRdWV1aW5nU3RyYXRlZ3kge1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgYXNzZXJ0UmVxdWlyZWRBcmd1bWVudChvcHRpb25zLCAxLCAnQnl0ZUxlbmd0aFF1ZXVpbmdTdHJhdGVneScpO1xuICAgICAgICBvcHRpb25zID0gY29udmVydFF1ZXVpbmdTdHJhdGVneUluaXQob3B0aW9ucywgJ0ZpcnN0IHBhcmFtZXRlcicpO1xuICAgICAgICB0aGlzLl9ieXRlTGVuZ3RoUXVldWluZ1N0cmF0ZWd5SGlnaFdhdGVyTWFyayA9IG9wdGlvbnMuaGlnaFdhdGVyTWFyaztcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgaGlnaCB3YXRlciBtYXJrIHByb3ZpZGVkIHRvIHRoZSBjb25zdHJ1Y3Rvci5cbiAgICAgKi9cbiAgICBnZXQgaGlnaFdhdGVyTWFyaygpIHtcbiAgICAgICAgaWYgKCFJc0J5dGVMZW5ndGhRdWV1aW5nU3RyYXRlZ3kodGhpcykpIHtcbiAgICAgICAgICAgIHRocm93IGJ5dGVMZW5ndGhCcmFuZENoZWNrRXhjZXB0aW9uKCdoaWdoV2F0ZXJNYXJrJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2J5dGVMZW5ndGhRdWV1aW5nU3RyYXRlZ3lIaWdoV2F0ZXJNYXJrO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBNZWFzdXJlcyB0aGUgc2l6ZSBvZiBgY2h1bmtgIGJ5IHJldHVybmluZyB0aGUgdmFsdWUgb2YgaXRzIGBieXRlTGVuZ3RoYCBwcm9wZXJ0eS5cbiAgICAgKi9cbiAgICBnZXQgc2l6ZSgpIHtcbiAgICAgICAgaWYgKCFJc0J5dGVMZW5ndGhRdWV1aW5nU3RyYXRlZ3kodGhpcykpIHtcbiAgICAgICAgICAgIHRocm93IGJ5dGVMZW5ndGhCcmFuZENoZWNrRXhjZXB0aW9uKCdzaXplJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJ5dGVMZW5ndGhTaXplRnVuY3Rpb247XG4gICAgfVxufVxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoQnl0ZUxlbmd0aFF1ZXVpbmdTdHJhdGVneS5wcm90b3R5cGUsIHtcbiAgICBoaWdoV2F0ZXJNYXJrOiB7IGVudW1lcmFibGU6IHRydWUgfSxcbiAgICBzaXplOiB7IGVudW1lcmFibGU6IHRydWUgfVxufSk7XG5pZiAodHlwZW9mIFN5bWJvbFBvbHlmaWxsLnRvU3RyaW5nVGFnID09PSAnc3ltYm9sJykge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShCeXRlTGVuZ3RoUXVldWluZ1N0cmF0ZWd5LnByb3RvdHlwZSwgU3ltYm9sUG9seWZpbGwudG9TdHJpbmdUYWcsIHtcbiAgICAgICAgdmFsdWU6ICdCeXRlTGVuZ3RoUXVldWluZ1N0cmF0ZWd5JyxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG59XG4vLyBIZWxwZXIgZnVuY3Rpb25zIGZvciB0aGUgQnl0ZUxlbmd0aFF1ZXVpbmdTdHJhdGVneS5cbmZ1bmN0aW9uIGJ5dGVMZW5ndGhCcmFuZENoZWNrRXhjZXB0aW9uKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IFR5cGVFcnJvcihgQnl0ZUxlbmd0aFF1ZXVpbmdTdHJhdGVneS5wcm90b3R5cGUuJHtuYW1lfSBjYW4gb25seSBiZSB1c2VkIG9uIGEgQnl0ZUxlbmd0aFF1ZXVpbmdTdHJhdGVneWApO1xufVxuZnVuY3Rpb24gSXNCeXRlTGVuZ3RoUXVldWluZ1N0cmF0ZWd5KHgpIHtcbiAgICBpZiAoIXR5cGVJc09iamVjdCh4KSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHgsICdfYnl0ZUxlbmd0aFF1ZXVpbmdTdHJhdGVneUhpZ2hXYXRlck1hcmsnKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB4IGluc3RhbmNlb2YgQnl0ZUxlbmd0aFF1ZXVpbmdTdHJhdGVneTtcbn1cblxuLy8gVGhlIHNpemUgZnVuY3Rpb24gbXVzdCBub3QgaGF2ZSBhIHByb3RvdHlwZSBwcm9wZXJ0eSBub3IgYmUgYSBjb25zdHJ1Y3RvclxuY29uc3QgY291bnRTaXplRnVuY3Rpb24gPSAoKSA9PiB7XG4gICAgcmV0dXJuIDE7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvdW50U2l6ZUZ1bmN0aW9uLCAnbmFtZScsIHtcbiAgICB2YWx1ZTogJ3NpemUnLFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxufSk7XG4vKipcbiAqIEEgcXVldWluZyBzdHJhdGVneSB0aGF0IGNvdW50cyB0aGUgbnVtYmVyIG9mIGNodW5rcy5cbiAqXG4gKiBAcHVibGljXG4gKi9cbmNsYXNzIENvdW50UXVldWluZ1N0cmF0ZWd5IHtcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgIGFzc2VydFJlcXVpcmVkQXJndW1lbnQob3B0aW9ucywgMSwgJ0NvdW50UXVldWluZ1N0cmF0ZWd5Jyk7XG4gICAgICAgIG9wdGlvbnMgPSBjb252ZXJ0UXVldWluZ1N0cmF0ZWd5SW5pdChvcHRpb25zLCAnRmlyc3QgcGFyYW1ldGVyJyk7XG4gICAgICAgIHRoaXMuX2NvdW50UXVldWluZ1N0cmF0ZWd5SGlnaFdhdGVyTWFyayA9IG9wdGlvbnMuaGlnaFdhdGVyTWFyaztcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgaGlnaCB3YXRlciBtYXJrIHByb3ZpZGVkIHRvIHRoZSBjb25zdHJ1Y3Rvci5cbiAgICAgKi9cbiAgICBnZXQgaGlnaFdhdGVyTWFyaygpIHtcbiAgICAgICAgaWYgKCFJc0NvdW50UXVldWluZ1N0cmF0ZWd5KHRoaXMpKSB7XG4gICAgICAgICAgICB0aHJvdyBjb3VudEJyYW5kQ2hlY2tFeGNlcHRpb24oJ2hpZ2hXYXRlck1hcmsnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fY291bnRRdWV1aW5nU3RyYXRlZ3lIaWdoV2F0ZXJNYXJrO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBNZWFzdXJlcyB0aGUgc2l6ZSBvZiBgY2h1bmtgIGJ5IGFsd2F5cyByZXR1cm5pbmcgMS5cbiAgICAgKiBUaGlzIGVuc3VyZXMgdGhhdCB0aGUgdG90YWwgcXVldWUgc2l6ZSBpcyBhIGNvdW50IG9mIHRoZSBudW1iZXIgb2YgY2h1bmtzIGluIHRoZSBxdWV1ZS5cbiAgICAgKi9cbiAgICBnZXQgc2l6ZSgpIHtcbiAgICAgICAgaWYgKCFJc0NvdW50UXVldWluZ1N0cmF0ZWd5KHRoaXMpKSB7XG4gICAgICAgICAgICB0aHJvdyBjb3VudEJyYW5kQ2hlY2tFeGNlcHRpb24oJ3NpemUnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY291bnRTaXplRnVuY3Rpb247XG4gICAgfVxufVxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoQ291bnRRdWV1aW5nU3RyYXRlZ3kucHJvdG90eXBlLCB7XG4gICAgaGlnaFdhdGVyTWFyazogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG4gICAgc2l6ZTogeyBlbnVtZXJhYmxlOiB0cnVlIH1cbn0pO1xuaWYgKHR5cGVvZiBTeW1ib2xQb2x5ZmlsbC50b1N0cmluZ1RhZyA9PT0gJ3N5bWJvbCcpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ291bnRRdWV1aW5nU3RyYXRlZ3kucHJvdG90eXBlLCBTeW1ib2xQb2x5ZmlsbC50b1N0cmluZ1RhZywge1xuICAgICAgICB2YWx1ZTogJ0NvdW50UXVldWluZ1N0cmF0ZWd5JyxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG59XG4vLyBIZWxwZXIgZnVuY3Rpb25zIGZvciB0aGUgQ291bnRRdWV1aW5nU3RyYXRlZ3kuXG5mdW5jdGlvbiBjb3VudEJyYW5kQ2hlY2tFeGNlcHRpb24obmFtZSkge1xuICAgIHJldHVybiBuZXcgVHlwZUVycm9yKGBDb3VudFF1ZXVpbmdTdHJhdGVneS5wcm90b3R5cGUuJHtuYW1lfSBjYW4gb25seSBiZSB1c2VkIG9uIGEgQ291bnRRdWV1aW5nU3RyYXRlZ3lgKTtcbn1cbmZ1bmN0aW9uIElzQ291bnRRdWV1aW5nU3RyYXRlZ3koeCkge1xuICAgIGlmICghdHlwZUlzT2JqZWN0KHgpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoeCwgJ19jb3VudFF1ZXVpbmdTdHJhdGVneUhpZ2hXYXRlck1hcmsnKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB4IGluc3RhbmNlb2YgQ291bnRRdWV1aW5nU3RyYXRlZ3k7XG59XG5cbmZ1bmN0aW9uIGNvbnZlcnRUcmFuc2Zvcm1lcihvcmlnaW5hbCwgY29udGV4dCkge1xuICAgIGFzc2VydERpY3Rpb25hcnkob3JpZ2luYWwsIGNvbnRleHQpO1xuICAgIGNvbnN0IGZsdXNoID0gb3JpZ2luYWwgPT09IG51bGwgfHwgb3JpZ2luYWwgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9yaWdpbmFsLmZsdXNoO1xuICAgIGNvbnN0IHJlYWRhYmxlVHlwZSA9IG9yaWdpbmFsID09PSBudWxsIHx8IG9yaWdpbmFsID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcmlnaW5hbC5yZWFkYWJsZVR5cGU7XG4gICAgY29uc3Qgc3RhcnQgPSBvcmlnaW5hbCA9PT0gbnVsbCB8fCBvcmlnaW5hbCA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3JpZ2luYWwuc3RhcnQ7XG4gICAgY29uc3QgdHJhbnNmb3JtID0gb3JpZ2luYWwgPT09IG51bGwgfHwgb3JpZ2luYWwgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9yaWdpbmFsLnRyYW5zZm9ybTtcbiAgICBjb25zdCB3cml0YWJsZVR5cGUgPSBvcmlnaW5hbCA9PT0gbnVsbCB8fCBvcmlnaW5hbCA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3JpZ2luYWwud3JpdGFibGVUeXBlO1xuICAgIHJldHVybiB7XG4gICAgICAgIGZsdXNoOiBmbHVzaCA9PT0gdW5kZWZpbmVkID9cbiAgICAgICAgICAgIHVuZGVmaW5lZCA6XG4gICAgICAgICAgICBjb252ZXJ0VHJhbnNmb3JtZXJGbHVzaENhbGxiYWNrKGZsdXNoLCBvcmlnaW5hbCwgYCR7Y29udGV4dH0gaGFzIG1lbWJlciAnZmx1c2gnIHRoYXRgKSxcbiAgICAgICAgcmVhZGFibGVUeXBlLFxuICAgICAgICBzdGFydDogc3RhcnQgPT09IHVuZGVmaW5lZCA/XG4gICAgICAgICAgICB1bmRlZmluZWQgOlxuICAgICAgICAgICAgY29udmVydFRyYW5zZm9ybWVyU3RhcnRDYWxsYmFjayhzdGFydCwgb3JpZ2luYWwsIGAke2NvbnRleHR9IGhhcyBtZW1iZXIgJ3N0YXJ0JyB0aGF0YCksXG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNmb3JtID09PSB1bmRlZmluZWQgP1xuICAgICAgICAgICAgdW5kZWZpbmVkIDpcbiAgICAgICAgICAgIGNvbnZlcnRUcmFuc2Zvcm1lclRyYW5zZm9ybUNhbGxiYWNrKHRyYW5zZm9ybSwgb3JpZ2luYWwsIGAke2NvbnRleHR9IGhhcyBtZW1iZXIgJ3RyYW5zZm9ybScgdGhhdGApLFxuICAgICAgICB3cml0YWJsZVR5cGVcbiAgICB9O1xufVxuZnVuY3Rpb24gY29udmVydFRyYW5zZm9ybWVyRmx1c2hDYWxsYmFjayhmbiwgb3JpZ2luYWwsIGNvbnRleHQpIHtcbiAgICBhc3NlcnRGdW5jdGlvbihmbiwgY29udGV4dCk7XG4gICAgcmV0dXJuIChjb250cm9sbGVyKSA9PiBwcm9taXNlQ2FsbChmbiwgb3JpZ2luYWwsIFtjb250cm9sbGVyXSk7XG59XG5mdW5jdGlvbiBjb252ZXJ0VHJhbnNmb3JtZXJTdGFydENhbGxiYWNrKGZuLCBvcmlnaW5hbCwgY29udGV4dCkge1xuICAgIGFzc2VydEZ1bmN0aW9uKGZuLCBjb250ZXh0KTtcbiAgICByZXR1cm4gKGNvbnRyb2xsZXIpID0+IHJlZmxlY3RDYWxsKGZuLCBvcmlnaW5hbCwgW2NvbnRyb2xsZXJdKTtcbn1cbmZ1bmN0aW9uIGNvbnZlcnRUcmFuc2Zvcm1lclRyYW5zZm9ybUNhbGxiYWNrKGZuLCBvcmlnaW5hbCwgY29udGV4dCkge1xuICAgIGFzc2VydEZ1bmN0aW9uKGZuLCBjb250ZXh0KTtcbiAgICByZXR1cm4gKGNodW5rLCBjb250cm9sbGVyKSA9PiBwcm9taXNlQ2FsbChmbiwgb3JpZ2luYWwsIFtjaHVuaywgY29udHJvbGxlcl0pO1xufVxuXG4vLyBDbGFzcyBUcmFuc2Zvcm1TdHJlYW1cbi8qKlxuICogQSB0cmFuc2Zvcm0gc3RyZWFtIGNvbnNpc3RzIG9mIGEgcGFpciBvZiBzdHJlYW1zOiBhIHtAbGluayBXcml0YWJsZVN0cmVhbSB8IHdyaXRhYmxlIHN0cmVhbX0sXG4gKiBrbm93biBhcyBpdHMgd3JpdGFibGUgc2lkZSwgYW5kIGEge0BsaW5rIFJlYWRhYmxlU3RyZWFtIHwgcmVhZGFibGUgc3RyZWFtfSwga25vd24gYXMgaXRzIHJlYWRhYmxlIHNpZGUuXG4gKiBJbiBhIG1hbm5lciBzcGVjaWZpYyB0byB0aGUgdHJhbnNmb3JtIHN0cmVhbSBpbiBxdWVzdGlvbiwgd3JpdGVzIHRvIHRoZSB3cml0YWJsZSBzaWRlIHJlc3VsdCBpbiBuZXcgZGF0YSBiZWluZ1xuICogbWFkZSBhdmFpbGFibGUgZm9yIHJlYWRpbmcgZnJvbSB0aGUgcmVhZGFibGUgc2lkZS5cbiAqXG4gKiBAcHVibGljXG4gKi9cbmNsYXNzIFRyYW5zZm9ybVN0cmVhbSB7XG4gICAgY29uc3RydWN0b3IocmF3VHJhbnNmb3JtZXIgPSB7fSwgcmF3V3JpdGFibGVTdHJhdGVneSA9IHt9LCByYXdSZWFkYWJsZVN0cmF0ZWd5ID0ge30pIHtcbiAgICAgICAgaWYgKHJhd1RyYW5zZm9ybWVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJhd1RyYW5zZm9ybWVyID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB3cml0YWJsZVN0cmF0ZWd5ID0gY29udmVydFF1ZXVpbmdTdHJhdGVneShyYXdXcml0YWJsZVN0cmF0ZWd5LCAnU2Vjb25kIHBhcmFtZXRlcicpO1xuICAgICAgICBjb25zdCByZWFkYWJsZVN0cmF0ZWd5ID0gY29udmVydFF1ZXVpbmdTdHJhdGVneShyYXdSZWFkYWJsZVN0cmF0ZWd5LCAnVGhpcmQgcGFyYW1ldGVyJyk7XG4gICAgICAgIGNvbnN0IHRyYW5zZm9ybWVyID0gY29udmVydFRyYW5zZm9ybWVyKHJhd1RyYW5zZm9ybWVyLCAnRmlyc3QgcGFyYW1ldGVyJyk7XG4gICAgICAgIGlmICh0cmFuc2Zvcm1lci5yZWFkYWJsZVR5cGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0ludmFsaWQgcmVhZGFibGVUeXBlIHNwZWNpZmllZCcpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0cmFuc2Zvcm1lci53cml0YWJsZVR5cGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0ludmFsaWQgd3JpdGFibGVUeXBlIHNwZWNpZmllZCcpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJlYWRhYmxlSGlnaFdhdGVyTWFyayA9IEV4dHJhY3RIaWdoV2F0ZXJNYXJrKHJlYWRhYmxlU3RyYXRlZ3ksIDApO1xuICAgICAgICBjb25zdCByZWFkYWJsZVNpemVBbGdvcml0aG0gPSBFeHRyYWN0U2l6ZUFsZ29yaXRobShyZWFkYWJsZVN0cmF0ZWd5KTtcbiAgICAgICAgY29uc3Qgd3JpdGFibGVIaWdoV2F0ZXJNYXJrID0gRXh0cmFjdEhpZ2hXYXRlck1hcmsod3JpdGFibGVTdHJhdGVneSwgMSk7XG4gICAgICAgIGNvbnN0IHdyaXRhYmxlU2l6ZUFsZ29yaXRobSA9IEV4dHJhY3RTaXplQWxnb3JpdGhtKHdyaXRhYmxlU3RyYXRlZ3kpO1xuICAgICAgICBsZXQgc3RhcnRQcm9taXNlX3Jlc29sdmU7XG4gICAgICAgIGNvbnN0IHN0YXJ0UHJvbWlzZSA9IG5ld1Byb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgICAgICBzdGFydFByb21pc2VfcmVzb2x2ZSA9IHJlc29sdmU7XG4gICAgICAgIH0pO1xuICAgICAgICBJbml0aWFsaXplVHJhbnNmb3JtU3RyZWFtKHRoaXMsIHN0YXJ0UHJvbWlzZSwgd3JpdGFibGVIaWdoV2F0ZXJNYXJrLCB3cml0YWJsZVNpemVBbGdvcml0aG0sIHJlYWRhYmxlSGlnaFdhdGVyTWFyaywgcmVhZGFibGVTaXplQWxnb3JpdGhtKTtcbiAgICAgICAgU2V0VXBUcmFuc2Zvcm1TdHJlYW1EZWZhdWx0Q29udHJvbGxlckZyb21UcmFuc2Zvcm1lcih0aGlzLCB0cmFuc2Zvcm1lcik7XG4gICAgICAgIGlmICh0cmFuc2Zvcm1lci5zdGFydCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBzdGFydFByb21pc2VfcmVzb2x2ZSh0cmFuc2Zvcm1lci5zdGFydCh0aGlzLl90cmFuc2Zvcm1TdHJlYW1Db250cm9sbGVyKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBzdGFydFByb21pc2VfcmVzb2x2ZSh1bmRlZmluZWQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSByZWFkYWJsZSBzaWRlIG9mIHRoZSB0cmFuc2Zvcm0gc3RyZWFtLlxuICAgICAqL1xuICAgIGdldCByZWFkYWJsZSgpIHtcbiAgICAgICAgaWYgKCFJc1RyYW5zZm9ybVN0cmVhbSh0aGlzKSkge1xuICAgICAgICAgICAgdGhyb3cgc3RyZWFtQnJhbmRDaGVja0V4Y2VwdGlvbigncmVhZGFibGUnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fcmVhZGFibGU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSB3cml0YWJsZSBzaWRlIG9mIHRoZSB0cmFuc2Zvcm0gc3RyZWFtLlxuICAgICAqL1xuICAgIGdldCB3cml0YWJsZSgpIHtcbiAgICAgICAgaWYgKCFJc1RyYW5zZm9ybVN0cmVhbSh0aGlzKSkge1xuICAgICAgICAgICAgdGhyb3cgc3RyZWFtQnJhbmRDaGVja0V4Y2VwdGlvbignd3JpdGFibGUnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fd3JpdGFibGU7XG4gICAgfVxufVxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoVHJhbnNmb3JtU3RyZWFtLnByb3RvdHlwZSwge1xuICAgIHJlYWRhYmxlOiB7IGVudW1lcmFibGU6IHRydWUgfSxcbiAgICB3cml0YWJsZTogeyBlbnVtZXJhYmxlOiB0cnVlIH1cbn0pO1xuaWYgKHR5cGVvZiBTeW1ib2xQb2x5ZmlsbC50b1N0cmluZ1RhZyA9PT0gJ3N5bWJvbCcpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVHJhbnNmb3JtU3RyZWFtLnByb3RvdHlwZSwgU3ltYm9sUG9seWZpbGwudG9TdHJpbmdUYWcsIHtcbiAgICAgICAgdmFsdWU6ICdUcmFuc2Zvcm1TdHJlYW0nLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIEluaXRpYWxpemVUcmFuc2Zvcm1TdHJlYW0oc3RyZWFtLCBzdGFydFByb21pc2UsIHdyaXRhYmxlSGlnaFdhdGVyTWFyaywgd3JpdGFibGVTaXplQWxnb3JpdGhtLCByZWFkYWJsZUhpZ2hXYXRlck1hcmssIHJlYWRhYmxlU2l6ZUFsZ29yaXRobSkge1xuICAgIGZ1bmN0aW9uIHN0YXJ0QWxnb3JpdGhtKCkge1xuICAgICAgICByZXR1cm4gc3RhcnRQcm9taXNlO1xuICAgIH1cbiAgICBmdW5jdGlvbiB3cml0ZUFsZ29yaXRobShjaHVuaykge1xuICAgICAgICByZXR1cm4gVHJhbnNmb3JtU3RyZWFtRGVmYXVsdFNpbmtXcml0ZUFsZ29yaXRobShzdHJlYW0sIGNodW5rKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gYWJvcnRBbGdvcml0aG0ocmVhc29uKSB7XG4gICAgICAgIHJldHVybiBUcmFuc2Zvcm1TdHJlYW1EZWZhdWx0U2lua0Fib3J0QWxnb3JpdGhtKHN0cmVhbSwgcmVhc29uKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gY2xvc2VBbGdvcml0aG0oKSB7XG4gICAgICAgIHJldHVybiBUcmFuc2Zvcm1TdHJlYW1EZWZhdWx0U2lua0Nsb3NlQWxnb3JpdGhtKHN0cmVhbSk7XG4gICAgfVxuICAgIHN0cmVhbS5fd3JpdGFibGUgPSBDcmVhdGVXcml0YWJsZVN0cmVhbShzdGFydEFsZ29yaXRobSwgd3JpdGVBbGdvcml0aG0sIGNsb3NlQWxnb3JpdGhtLCBhYm9ydEFsZ29yaXRobSwgd3JpdGFibGVIaWdoV2F0ZXJNYXJrLCB3cml0YWJsZVNpemVBbGdvcml0aG0pO1xuICAgIGZ1bmN0aW9uIHB1bGxBbGdvcml0aG0oKSB7XG4gICAgICAgIHJldHVybiBUcmFuc2Zvcm1TdHJlYW1EZWZhdWx0U291cmNlUHVsbEFsZ29yaXRobShzdHJlYW0pO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjYW5jZWxBbGdvcml0aG0ocmVhc29uKSB7XG4gICAgICAgIFRyYW5zZm9ybVN0cmVhbUVycm9yV3JpdGFibGVBbmRVbmJsb2NrV3JpdGUoc3RyZWFtLCByZWFzb24pO1xuICAgICAgICByZXR1cm4gcHJvbWlzZVJlc29sdmVkV2l0aCh1bmRlZmluZWQpO1xuICAgIH1cbiAgICBzdHJlYW0uX3JlYWRhYmxlID0gQ3JlYXRlUmVhZGFibGVTdHJlYW0oc3RhcnRBbGdvcml0aG0sIHB1bGxBbGdvcml0aG0sIGNhbmNlbEFsZ29yaXRobSwgcmVhZGFibGVIaWdoV2F0ZXJNYXJrLCByZWFkYWJsZVNpemVBbGdvcml0aG0pO1xuICAgIC8vIFRoZSBbW2JhY2twcmVzc3VyZV1dIHNsb3QgaXMgc2V0IHRvIHVuZGVmaW5lZCBzbyB0aGF0IGl0IGNhbiBiZSBpbml0aWFsaXNlZCBieSBUcmFuc2Zvcm1TdHJlYW1TZXRCYWNrcHJlc3N1cmUuXG4gICAgc3RyZWFtLl9iYWNrcHJlc3N1cmUgPSB1bmRlZmluZWQ7XG4gICAgc3RyZWFtLl9iYWNrcHJlc3N1cmVDaGFuZ2VQcm9taXNlID0gdW5kZWZpbmVkO1xuICAgIHN0cmVhbS5fYmFja3ByZXNzdXJlQ2hhbmdlUHJvbWlzZV9yZXNvbHZlID0gdW5kZWZpbmVkO1xuICAgIFRyYW5zZm9ybVN0cmVhbVNldEJhY2twcmVzc3VyZShzdHJlYW0sIHRydWUpO1xuICAgIHN0cmVhbS5fdHJhbnNmb3JtU3RyZWFtQ29udHJvbGxlciA9IHVuZGVmaW5lZDtcbn1cbmZ1bmN0aW9uIElzVHJhbnNmb3JtU3RyZWFtKHgpIHtcbiAgICBpZiAoIXR5cGVJc09iamVjdCh4KSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHgsICdfdHJhbnNmb3JtU3RyZWFtQ29udHJvbGxlcicpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHggaW5zdGFuY2VvZiBUcmFuc2Zvcm1TdHJlYW07XG59XG4vLyBUaGlzIGlzIGEgbm8tb3AgaWYgYm90aCBzaWRlcyBhcmUgYWxyZWFkeSBlcnJvcmVkLlxuZnVuY3Rpb24gVHJhbnNmb3JtU3RyZWFtRXJyb3Ioc3RyZWFtLCBlKSB7XG4gICAgUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckVycm9yKHN0cmVhbS5fcmVhZGFibGUuX3JlYWRhYmxlU3RyZWFtQ29udHJvbGxlciwgZSk7XG4gICAgVHJhbnNmb3JtU3RyZWFtRXJyb3JXcml0YWJsZUFuZFVuYmxvY2tXcml0ZShzdHJlYW0sIGUpO1xufVxuZnVuY3Rpb24gVHJhbnNmb3JtU3RyZWFtRXJyb3JXcml0YWJsZUFuZFVuYmxvY2tXcml0ZShzdHJlYW0sIGUpIHtcbiAgICBUcmFuc2Zvcm1TdHJlYW1EZWZhdWx0Q29udHJvbGxlckNsZWFyQWxnb3JpdGhtcyhzdHJlYW0uX3RyYW5zZm9ybVN0cmVhbUNvbnRyb2xsZXIpO1xuICAgIFdyaXRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJFcnJvcklmTmVlZGVkKHN0cmVhbS5fd3JpdGFibGUuX3dyaXRhYmxlU3RyZWFtQ29udHJvbGxlciwgZSk7XG4gICAgaWYgKHN0cmVhbS5fYmFja3ByZXNzdXJlKSB7XG4gICAgICAgIC8vIFByZXRlbmQgdGhhdCBwdWxsKCkgd2FzIGNhbGxlZCB0byBwZXJtaXQgYW55IHBlbmRpbmcgd3JpdGUoKSBjYWxscyB0byBjb21wbGV0ZS4gVHJhbnNmb3JtU3RyZWFtU2V0QmFja3ByZXNzdXJlKClcbiAgICAgICAgLy8gY2Fubm90IGJlIGNhbGxlZCBmcm9tIGVucXVldWUoKSBvciBwdWxsKCkgb25jZSB0aGUgUmVhZGFibGVTdHJlYW0gaXMgZXJyb3JlZCwgc28gdGhpcyB3aWxsIHdpbGwgYmUgdGhlIGZpbmFsIHRpbWVcbiAgICAgICAgLy8gX2JhY2twcmVzc3VyZSBpcyBzZXQuXG4gICAgICAgIFRyYW5zZm9ybVN0cmVhbVNldEJhY2twcmVzc3VyZShzdHJlYW0sIGZhbHNlKTtcbiAgICB9XG59XG5mdW5jdGlvbiBUcmFuc2Zvcm1TdHJlYW1TZXRCYWNrcHJlc3N1cmUoc3RyZWFtLCBiYWNrcHJlc3N1cmUpIHtcbiAgICAvLyBQYXNzZXMgYWxzbyB3aGVuIGNhbGxlZCBkdXJpbmcgY29uc3RydWN0aW9uLlxuICAgIGlmIChzdHJlYW0uX2JhY2twcmVzc3VyZUNoYW5nZVByb21pc2UgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBzdHJlYW0uX2JhY2twcmVzc3VyZUNoYW5nZVByb21pc2VfcmVzb2x2ZSgpO1xuICAgIH1cbiAgICBzdHJlYW0uX2JhY2twcmVzc3VyZUNoYW5nZVByb21pc2UgPSBuZXdQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICBzdHJlYW0uX2JhY2twcmVzc3VyZUNoYW5nZVByb21pc2VfcmVzb2x2ZSA9IHJlc29sdmU7XG4gICAgfSk7XG4gICAgc3RyZWFtLl9iYWNrcHJlc3N1cmUgPSBiYWNrcHJlc3N1cmU7XG59XG4vLyBDbGFzcyBUcmFuc2Zvcm1TdHJlYW1EZWZhdWx0Q29udHJvbGxlclxuLyoqXG4gKiBBbGxvd3MgY29udHJvbCBvZiB0aGUge0BsaW5rIFJlYWRhYmxlU3RyZWFtfSBhbmQge0BsaW5rIFdyaXRhYmxlU3RyZWFtfSBvZiB0aGUgYXNzb2NpYXRlZCB7QGxpbmsgVHJhbnNmb3JtU3RyZWFtfS5cbiAqXG4gKiBAcHVibGljXG4gKi9cbmNsYXNzIFRyYW5zZm9ybVN0cmVhbURlZmF1bHRDb250cm9sbGVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSWxsZWdhbCBjb25zdHJ1Y3RvcicpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBkZXNpcmVkIHNpemUgdG8gZmlsbCB0aGUgcmVhZGFibGUgc2lkZeKAmXMgaW50ZXJuYWwgcXVldWUuIEl0IGNhbiBiZSBuZWdhdGl2ZSwgaWYgdGhlIHF1ZXVlIGlzIG92ZXItZnVsbC5cbiAgICAgKi9cbiAgICBnZXQgZGVzaXJlZFNpemUoKSB7XG4gICAgICAgIGlmICghSXNUcmFuc2Zvcm1TdHJlYW1EZWZhdWx0Q29udHJvbGxlcih0aGlzKSkge1xuICAgICAgICAgICAgdGhyb3cgZGVmYXVsdENvbnRyb2xsZXJCcmFuZENoZWNrRXhjZXB0aW9uKCdkZXNpcmVkU2l6ZScpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJlYWRhYmxlQ29udHJvbGxlciA9IHRoaXMuX2NvbnRyb2xsZWRUcmFuc2Zvcm1TdHJlYW0uX3JlYWRhYmxlLl9yZWFkYWJsZVN0cmVhbUNvbnRyb2xsZXI7XG4gICAgICAgIHJldHVybiBSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyR2V0RGVzaXJlZFNpemUocmVhZGFibGVDb250cm9sbGVyKTtcbiAgICB9XG4gICAgZW5xdWV1ZShjaHVuayA9IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAoIUlzVHJhbnNmb3JtU3RyZWFtRGVmYXVsdENvbnRyb2xsZXIodGhpcykpIHtcbiAgICAgICAgICAgIHRocm93IGRlZmF1bHRDb250cm9sbGVyQnJhbmRDaGVja0V4Y2VwdGlvbignZW5xdWV1ZScpO1xuICAgICAgICB9XG4gICAgICAgIFRyYW5zZm9ybVN0cmVhbURlZmF1bHRDb250cm9sbGVyRW5xdWV1ZSh0aGlzLCBjaHVuayk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEVycm9ycyBib3RoIHRoZSByZWFkYWJsZSBzaWRlIGFuZCB0aGUgd3JpdGFibGUgc2lkZSBvZiB0aGUgY29udHJvbGxlZCB0cmFuc2Zvcm0gc3RyZWFtLCBtYWtpbmcgYWxsIGZ1dHVyZVxuICAgICAqIGludGVyYWN0aW9ucyB3aXRoIGl0IGZhaWwgd2l0aCB0aGUgZ2l2ZW4gZXJyb3IgYGVgLiBBbnkgY2h1bmtzIHF1ZXVlZCBmb3IgdHJhbnNmb3JtYXRpb24gd2lsbCBiZSBkaXNjYXJkZWQuXG4gICAgICovXG4gICAgZXJyb3IocmVhc29uID0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmICghSXNUcmFuc2Zvcm1TdHJlYW1EZWZhdWx0Q29udHJvbGxlcih0aGlzKSkge1xuICAgICAgICAgICAgdGhyb3cgZGVmYXVsdENvbnRyb2xsZXJCcmFuZENoZWNrRXhjZXB0aW9uKCdlcnJvcicpO1xuICAgICAgICB9XG4gICAgICAgIFRyYW5zZm9ybVN0cmVhbURlZmF1bHRDb250cm9sbGVyRXJyb3IodGhpcywgcmVhc29uKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2xvc2VzIHRoZSByZWFkYWJsZSBzaWRlIGFuZCBlcnJvcnMgdGhlIHdyaXRhYmxlIHNpZGUgb2YgdGhlIGNvbnRyb2xsZWQgdHJhbnNmb3JtIHN0cmVhbS4gVGhpcyBpcyB1c2VmdWwgd2hlbiB0aGVcbiAgICAgKiB0cmFuc2Zvcm1lciBvbmx5IG5lZWRzIHRvIGNvbnN1bWUgYSBwb3J0aW9uIG9mIHRoZSBjaHVua3Mgd3JpdHRlbiB0byB0aGUgd3JpdGFibGUgc2lkZS5cbiAgICAgKi9cbiAgICB0ZXJtaW5hdGUoKSB7XG4gICAgICAgIGlmICghSXNUcmFuc2Zvcm1TdHJlYW1EZWZhdWx0Q29udHJvbGxlcih0aGlzKSkge1xuICAgICAgICAgICAgdGhyb3cgZGVmYXVsdENvbnRyb2xsZXJCcmFuZENoZWNrRXhjZXB0aW9uKCd0ZXJtaW5hdGUnKTtcbiAgICAgICAgfVxuICAgICAgICBUcmFuc2Zvcm1TdHJlYW1EZWZhdWx0Q29udHJvbGxlclRlcm1pbmF0ZSh0aGlzKTtcbiAgICB9XG59XG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyhUcmFuc2Zvcm1TdHJlYW1EZWZhdWx0Q29udHJvbGxlci5wcm90b3R5cGUsIHtcbiAgICBlbnF1ZXVlOiB7IGVudW1lcmFibGU6IHRydWUgfSxcbiAgICBlcnJvcjogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG4gICAgdGVybWluYXRlOiB7IGVudW1lcmFibGU6IHRydWUgfSxcbiAgICBkZXNpcmVkU2l6ZTogeyBlbnVtZXJhYmxlOiB0cnVlIH1cbn0pO1xuaWYgKHR5cGVvZiBTeW1ib2xQb2x5ZmlsbC50b1N0cmluZ1RhZyA9PT0gJ3N5bWJvbCcpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVHJhbnNmb3JtU3RyZWFtRGVmYXVsdENvbnRyb2xsZXIucHJvdG90eXBlLCBTeW1ib2xQb2x5ZmlsbC50b1N0cmluZ1RhZywge1xuICAgICAgICB2YWx1ZTogJ1RyYW5zZm9ybVN0cmVhbURlZmF1bHRDb250cm9sbGVyJyxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG59XG4vLyBUcmFuc2Zvcm0gU3RyZWFtIERlZmF1bHQgQ29udHJvbGxlciBBYnN0cmFjdCBPcGVyYXRpb25zXG5mdW5jdGlvbiBJc1RyYW5zZm9ybVN0cmVhbURlZmF1bHRDb250cm9sbGVyKHgpIHtcbiAgICBpZiAoIXR5cGVJc09iamVjdCh4KSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHgsICdfY29udHJvbGxlZFRyYW5zZm9ybVN0cmVhbScpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHggaW5zdGFuY2VvZiBUcmFuc2Zvcm1TdHJlYW1EZWZhdWx0Q29udHJvbGxlcjtcbn1cbmZ1bmN0aW9uIFNldFVwVHJhbnNmb3JtU3RyZWFtRGVmYXVsdENvbnRyb2xsZXIoc3RyZWFtLCBjb250cm9sbGVyLCB0cmFuc2Zvcm1BbGdvcml0aG0sIGZsdXNoQWxnb3JpdGhtKSB7XG4gICAgY29udHJvbGxlci5fY29udHJvbGxlZFRyYW5zZm9ybVN0cmVhbSA9IHN0cmVhbTtcbiAgICBzdHJlYW0uX3RyYW5zZm9ybVN0cmVhbUNvbnRyb2xsZXIgPSBjb250cm9sbGVyO1xuICAgIGNvbnRyb2xsZXIuX3RyYW5zZm9ybUFsZ29yaXRobSA9IHRyYW5zZm9ybUFsZ29yaXRobTtcbiAgICBjb250cm9sbGVyLl9mbHVzaEFsZ29yaXRobSA9IGZsdXNoQWxnb3JpdGhtO1xufVxuZnVuY3Rpb24gU2V0VXBUcmFuc2Zvcm1TdHJlYW1EZWZhdWx0Q29udHJvbGxlckZyb21UcmFuc2Zvcm1lcihzdHJlYW0sIHRyYW5zZm9ybWVyKSB7XG4gICAgY29uc3QgY29udHJvbGxlciA9IE9iamVjdC5jcmVhdGUoVHJhbnNmb3JtU3RyZWFtRGVmYXVsdENvbnRyb2xsZXIucHJvdG90eXBlKTtcbiAgICBsZXQgdHJhbnNmb3JtQWxnb3JpdGhtID0gKGNodW5rKSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBUcmFuc2Zvcm1TdHJlYW1EZWZhdWx0Q29udHJvbGxlckVucXVldWUoY29udHJvbGxlciwgY2h1bmspO1xuICAgICAgICAgICAgcmV0dXJuIHByb21pc2VSZXNvbHZlZFdpdGgodW5kZWZpbmVkKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAodHJhbnNmb3JtUmVzdWx0RSkge1xuICAgICAgICAgICAgcmV0dXJuIHByb21pc2VSZWplY3RlZFdpdGgodHJhbnNmb3JtUmVzdWx0RSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGxldCBmbHVzaEFsZ29yaXRobSA9ICgpID0+IHByb21pc2VSZXNvbHZlZFdpdGgodW5kZWZpbmVkKTtcbiAgICBpZiAodHJhbnNmb3JtZXIudHJhbnNmb3JtICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdHJhbnNmb3JtQWxnb3JpdGhtID0gY2h1bmsgPT4gdHJhbnNmb3JtZXIudHJhbnNmb3JtKGNodW5rLCBjb250cm9sbGVyKTtcbiAgICB9XG4gICAgaWYgKHRyYW5zZm9ybWVyLmZsdXNoICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgZmx1c2hBbGdvcml0aG0gPSAoKSA9PiB0cmFuc2Zvcm1lci5mbHVzaChjb250cm9sbGVyKTtcbiAgICB9XG4gICAgU2V0VXBUcmFuc2Zvcm1TdHJlYW1EZWZhdWx0Q29udHJvbGxlcihzdHJlYW0sIGNvbnRyb2xsZXIsIHRyYW5zZm9ybUFsZ29yaXRobSwgZmx1c2hBbGdvcml0aG0pO1xufVxuZnVuY3Rpb24gVHJhbnNmb3JtU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJDbGVhckFsZ29yaXRobXMoY29udHJvbGxlcikge1xuICAgIGNvbnRyb2xsZXIuX3RyYW5zZm9ybUFsZ29yaXRobSA9IHVuZGVmaW5lZDtcbiAgICBjb250cm9sbGVyLl9mbHVzaEFsZ29yaXRobSA9IHVuZGVmaW5lZDtcbn1cbmZ1bmN0aW9uIFRyYW5zZm9ybVN0cmVhbURlZmF1bHRDb250cm9sbGVyRW5xdWV1ZShjb250cm9sbGVyLCBjaHVuaykge1xuICAgIGNvbnN0IHN0cmVhbSA9IGNvbnRyb2xsZXIuX2NvbnRyb2xsZWRUcmFuc2Zvcm1TdHJlYW07XG4gICAgY29uc3QgcmVhZGFibGVDb250cm9sbGVyID0gc3RyZWFtLl9yZWFkYWJsZS5fcmVhZGFibGVTdHJlYW1Db250cm9sbGVyO1xuICAgIGlmICghUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckNhbkNsb3NlT3JFbnF1ZXVlKHJlYWRhYmxlQ29udHJvbGxlcikpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignUmVhZGFibGUgc2lkZSBpcyBub3QgaW4gYSBzdGF0ZSB0aGF0IHBlcm1pdHMgZW5xdWV1ZScpO1xuICAgIH1cbiAgICAvLyBXZSB0aHJvdHRsZSB0cmFuc2Zvcm0gaW52b2NhdGlvbnMgYmFzZWQgb24gdGhlIGJhY2twcmVzc3VyZSBvZiB0aGUgUmVhZGFibGVTdHJlYW0sIGJ1dCB3ZSBzdGlsbFxuICAgIC8vIGFjY2VwdCBUcmFuc2Zvcm1TdHJlYW1EZWZhdWx0Q29udHJvbGxlckVucXVldWUoKSBjYWxscy5cbiAgICB0cnkge1xuICAgICAgICBSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyRW5xdWV1ZShyZWFkYWJsZUNvbnRyb2xsZXIsIGNodW5rKTtcbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gVGhpcyBoYXBwZW5zIHdoZW4gcmVhZGFibGVTdHJhdGVneS5zaXplKCkgdGhyb3dzLlxuICAgICAgICBUcmFuc2Zvcm1TdHJlYW1FcnJvcldyaXRhYmxlQW5kVW5ibG9ja1dyaXRlKHN0cmVhbSwgZSk7XG4gICAgICAgIHRocm93IHN0cmVhbS5fcmVhZGFibGUuX3N0b3JlZEVycm9yO1xuICAgIH1cbiAgICBjb25zdCBiYWNrcHJlc3N1cmUgPSBSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVySGFzQmFja3ByZXNzdXJlKHJlYWRhYmxlQ29udHJvbGxlcik7XG4gICAgaWYgKGJhY2twcmVzc3VyZSAhPT0gc3RyZWFtLl9iYWNrcHJlc3N1cmUpIHtcbiAgICAgICAgVHJhbnNmb3JtU3RyZWFtU2V0QmFja3ByZXNzdXJlKHN0cmVhbSwgdHJ1ZSk7XG4gICAgfVxufVxuZnVuY3Rpb24gVHJhbnNmb3JtU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJFcnJvcihjb250cm9sbGVyLCBlKSB7XG4gICAgVHJhbnNmb3JtU3RyZWFtRXJyb3IoY29udHJvbGxlci5fY29udHJvbGxlZFRyYW5zZm9ybVN0cmVhbSwgZSk7XG59XG5mdW5jdGlvbiBUcmFuc2Zvcm1TdHJlYW1EZWZhdWx0Q29udHJvbGxlclBlcmZvcm1UcmFuc2Zvcm0oY29udHJvbGxlciwgY2h1bmspIHtcbiAgICBjb25zdCB0cmFuc2Zvcm1Qcm9taXNlID0gY29udHJvbGxlci5fdHJhbnNmb3JtQWxnb3JpdGhtKGNodW5rKTtcbiAgICByZXR1cm4gdHJhbnNmb3JtUHJvbWlzZVdpdGgodHJhbnNmb3JtUHJvbWlzZSwgdW5kZWZpbmVkLCByID0+IHtcbiAgICAgICAgVHJhbnNmb3JtU3RyZWFtRXJyb3IoY29udHJvbGxlci5fY29udHJvbGxlZFRyYW5zZm9ybVN0cmVhbSwgcik7XG4gICAgICAgIHRocm93IHI7XG4gICAgfSk7XG59XG5mdW5jdGlvbiBUcmFuc2Zvcm1TdHJlYW1EZWZhdWx0Q29udHJvbGxlclRlcm1pbmF0ZShjb250cm9sbGVyKSB7XG4gICAgY29uc3Qgc3RyZWFtID0gY29udHJvbGxlci5fY29udHJvbGxlZFRyYW5zZm9ybVN0cmVhbTtcbiAgICBjb25zdCByZWFkYWJsZUNvbnRyb2xsZXIgPSBzdHJlYW0uX3JlYWRhYmxlLl9yZWFkYWJsZVN0cmVhbUNvbnRyb2xsZXI7XG4gICAgUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckNsb3NlKHJlYWRhYmxlQ29udHJvbGxlcik7XG4gICAgY29uc3QgZXJyb3IgPSBuZXcgVHlwZUVycm9yKCdUcmFuc2Zvcm1TdHJlYW0gdGVybWluYXRlZCcpO1xuICAgIFRyYW5zZm9ybVN0cmVhbUVycm9yV3JpdGFibGVBbmRVbmJsb2NrV3JpdGUoc3RyZWFtLCBlcnJvcik7XG59XG4vLyBUcmFuc2Zvcm1TdHJlYW1EZWZhdWx0U2luayBBbGdvcml0aG1zXG5mdW5jdGlvbiBUcmFuc2Zvcm1TdHJlYW1EZWZhdWx0U2lua1dyaXRlQWxnb3JpdGhtKHN0cmVhbSwgY2h1bmspIHtcbiAgICBjb25zdCBjb250cm9sbGVyID0gc3RyZWFtLl90cmFuc2Zvcm1TdHJlYW1Db250cm9sbGVyO1xuICAgIGlmIChzdHJlYW0uX2JhY2twcmVzc3VyZSkge1xuICAgICAgICBjb25zdCBiYWNrcHJlc3N1cmVDaGFuZ2VQcm9taXNlID0gc3RyZWFtLl9iYWNrcHJlc3N1cmVDaGFuZ2VQcm9taXNlO1xuICAgICAgICByZXR1cm4gdHJhbnNmb3JtUHJvbWlzZVdpdGgoYmFja3ByZXNzdXJlQ2hhbmdlUHJvbWlzZSwgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgd3JpdGFibGUgPSBzdHJlYW0uX3dyaXRhYmxlO1xuICAgICAgICAgICAgY29uc3Qgc3RhdGUgPSB3cml0YWJsZS5fc3RhdGU7XG4gICAgICAgICAgICBpZiAoc3RhdGUgPT09ICdlcnJvcmluZycpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyB3cml0YWJsZS5fc3RvcmVkRXJyb3I7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gVHJhbnNmb3JtU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJQZXJmb3JtVHJhbnNmb3JtKGNvbnRyb2xsZXIsIGNodW5rKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBUcmFuc2Zvcm1TdHJlYW1EZWZhdWx0Q29udHJvbGxlclBlcmZvcm1UcmFuc2Zvcm0oY29udHJvbGxlciwgY2h1bmspO1xufVxuZnVuY3Rpb24gVHJhbnNmb3JtU3RyZWFtRGVmYXVsdFNpbmtBYm9ydEFsZ29yaXRobShzdHJlYW0sIHJlYXNvbikge1xuICAgIC8vIGFib3J0KCkgaXMgbm90IGNhbGxlZCBzeW5jaHJvbm91c2x5LCBzbyBpdCBpcyBwb3NzaWJsZSBmb3IgYWJvcnQoKSB0byBiZSBjYWxsZWQgd2hlbiB0aGUgc3RyZWFtIGlzIGFscmVhZHlcbiAgICAvLyBlcnJvcmVkLlxuICAgIFRyYW5zZm9ybVN0cmVhbUVycm9yKHN0cmVhbSwgcmVhc29uKTtcbiAgICByZXR1cm4gcHJvbWlzZVJlc29sdmVkV2l0aCh1bmRlZmluZWQpO1xufVxuZnVuY3Rpb24gVHJhbnNmb3JtU3RyZWFtRGVmYXVsdFNpbmtDbG9zZUFsZ29yaXRobShzdHJlYW0pIHtcbiAgICAvLyBzdHJlYW0uX3JlYWRhYmxlIGNhbm5vdCBjaGFuZ2UgYWZ0ZXIgY29uc3RydWN0aW9uLCBzbyBjYWNoaW5nIGl0IGFjcm9zcyBhIGNhbGwgdG8gdXNlciBjb2RlIGlzIHNhZmUuXG4gICAgY29uc3QgcmVhZGFibGUgPSBzdHJlYW0uX3JlYWRhYmxlO1xuICAgIGNvbnN0IGNvbnRyb2xsZXIgPSBzdHJlYW0uX3RyYW5zZm9ybVN0cmVhbUNvbnRyb2xsZXI7XG4gICAgY29uc3QgZmx1c2hQcm9taXNlID0gY29udHJvbGxlci5fZmx1c2hBbGdvcml0aG0oKTtcbiAgICBUcmFuc2Zvcm1TdHJlYW1EZWZhdWx0Q29udHJvbGxlckNsZWFyQWxnb3JpdGhtcyhjb250cm9sbGVyKTtcbiAgICAvLyBSZXR1cm4gYSBwcm9taXNlIHRoYXQgaXMgZnVsZmlsbGVkIHdpdGggdW5kZWZpbmVkIG9uIHN1Y2Nlc3MuXG4gICAgcmV0dXJuIHRyYW5zZm9ybVByb21pc2VXaXRoKGZsdXNoUHJvbWlzZSwgKCkgPT4ge1xuICAgICAgICBpZiAocmVhZGFibGUuX3N0YXRlID09PSAnZXJyb3JlZCcpIHtcbiAgICAgICAgICAgIHRocm93IHJlYWRhYmxlLl9zdG9yZWRFcnJvcjtcbiAgICAgICAgfVxuICAgICAgICBSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyQ2xvc2UocmVhZGFibGUuX3JlYWRhYmxlU3RyZWFtQ29udHJvbGxlcik7XG4gICAgfSwgciA9PiB7XG4gICAgICAgIFRyYW5zZm9ybVN0cmVhbUVycm9yKHN0cmVhbSwgcik7XG4gICAgICAgIHRocm93IHJlYWRhYmxlLl9zdG9yZWRFcnJvcjtcbiAgICB9KTtcbn1cbi8vIFRyYW5zZm9ybVN0cmVhbURlZmF1bHRTb3VyY2UgQWxnb3JpdGhtc1xuZnVuY3Rpb24gVHJhbnNmb3JtU3RyZWFtRGVmYXVsdFNvdXJjZVB1bGxBbGdvcml0aG0oc3RyZWFtKSB7XG4gICAgLy8gSW52YXJpYW50LiBFbmZvcmNlZCBieSB0aGUgcHJvbWlzZXMgcmV0dXJuZWQgYnkgc3RhcnQoKSBhbmQgcHVsbCgpLlxuICAgIFRyYW5zZm9ybVN0cmVhbVNldEJhY2twcmVzc3VyZShzdHJlYW0sIGZhbHNlKTtcbiAgICAvLyBQcmV2ZW50IHRoZSBuZXh0IHB1bGwoKSBjYWxsIHVudGlsIHRoZXJlIGlzIGJhY2twcmVzc3VyZS5cbiAgICByZXR1cm4gc3RyZWFtLl9iYWNrcHJlc3N1cmVDaGFuZ2VQcm9taXNlO1xufVxuLy8gSGVscGVyIGZ1bmN0aW9ucyBmb3IgdGhlIFRyYW5zZm9ybVN0cmVhbURlZmF1bHRDb250cm9sbGVyLlxuZnVuY3Rpb24gZGVmYXVsdENvbnRyb2xsZXJCcmFuZENoZWNrRXhjZXB0aW9uKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IFR5cGVFcnJvcihgVHJhbnNmb3JtU3RyZWFtRGVmYXVsdENvbnRyb2xsZXIucHJvdG90eXBlLiR7bmFtZX0gY2FuIG9ubHkgYmUgdXNlZCBvbiBhIFRyYW5zZm9ybVN0cmVhbURlZmF1bHRDb250cm9sbGVyYCk7XG59XG4vLyBIZWxwZXIgZnVuY3Rpb25zIGZvciB0aGUgVHJhbnNmb3JtU3RyZWFtLlxuZnVuY3Rpb24gc3RyZWFtQnJhbmRDaGVja0V4Y2VwdGlvbihuYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBUeXBlRXJyb3IoYFRyYW5zZm9ybVN0cmVhbS5wcm90b3R5cGUuJHtuYW1lfSBjYW4gb25seSBiZSB1c2VkIG9uIGEgVHJhbnNmb3JtU3RyZWFtYCk7XG59XG5cbmV4cG9ydCB7IEJ5dGVMZW5ndGhRdWV1aW5nU3RyYXRlZ3ksIENvdW50UXVldWluZ1N0cmF0ZWd5LCBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyLCBSZWFkYWJsZVN0cmVhbSwgUmVhZGFibGVTdHJlYW1CWU9CUmVhZGVyLCBSZWFkYWJsZVN0cmVhbUJZT0JSZXF1ZXN0LCBSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyLCBSZWFkYWJsZVN0cmVhbURlZmF1bHRSZWFkZXIsIFRyYW5zZm9ybVN0cmVhbSwgVHJhbnNmb3JtU3RyZWFtRGVmYXVsdENvbnRyb2xsZXIsIFdyaXRhYmxlU3RyZWFtLCBXcml0YWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyLCBXcml0YWJsZVN0cmVhbURlZmF1bHRXcml0ZXIgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXBvbnlmaWxsLmVzMjAxOC5tanMubWFwXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHRsb2FkZWQ6IGZhbHNlLFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcblx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5ubWQgPSAobW9kdWxlKSA9PiB7XG5cdG1vZHVsZS5wYXRocyA9IFtdO1xuXHRpZiAoIW1vZHVsZS5jaGlsZHJlbikgbW9kdWxlLmNoaWxkcmVuID0gW107XG5cdHJldHVybiBtb2R1bGU7XG59OyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vbGliL2luZGV4LnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbIm9wdGlvbnMiLCJmb3JtRGF0YSIsImNvbmZpZyIsIl9fYXNzaWduIiwidXJsIiwidXNlcm5hbWUiLCJFcnJvciIsImtleSIsInJlcXVlc3QiLCJyZXF1ZXN0XzEiLCJtYWlsTGlzdHNNZW1iZXJzIiwibWFpbExpc3RNZW1iZXJzXzEiLCJkb21haW5DcmVkZW50aWFsc0NsaWVudCIsImRvbWFpbnNDcmVkZW50aWFsc18xIiwiZG9tYWluVGVtcGxhdGVzQ2xpZW50IiwiZG9tYWluc1RlbXBsYXRlc18xIiwiZG9tYWluVGFnc0NsaWVudCIsImRvbWFpbnNUYWdzXzEiLCJtdWx0aXBsZVZhbGlkYXRpb25DbGllbnQiLCJtdWx0aXBsZVZhbGlkYXRpb25fMSIsImRvbWFpbnMiLCJkb21haW5zXzEiLCJ3ZWJob29rcyIsIndlYmhvb2tzXzEiLCJldmVudHMiLCJldmVudHNfMSIsInN0YXRzIiwic3RhdHNfMSIsInN1cHByZXNzaW9ucyIsInN1cHByZXNzaW9uc18xIiwibWVzc2FnZXMiLCJtZXNzYWdlc18xIiwicm91dGVzIiwicm91dGVzXzEiLCJpcHMiLCJpcHNfMSIsImlwX3Bvb2xzIiwiaXBfcG9vbHNfMSIsImxpc3RzIiwibGlzdHNfMSIsInZhbGlkYXRlIiwidmFsaWRhdGVfMSIsImRhdGEiLCJyZWNlaXZpbmciLCJzZW5kaW5nIiwibmFtZSIsInJlcXVpcmVfdGxzIiwic2tpcF92ZXJpZmljYXRpb24iLCJzdGF0ZSIsIndpbGRjYXJkIiwic3BhbV9hY3Rpb24iLCJjcmVhdGVkX2F0Iiwic210cF9wYXNzd29yZCIsInNtdHBfbG9naW4iLCJ0eXBlIiwicmVjZWl2aW5nX2Ruc19yZWNvcmRzIiwic2VuZGluZ19kbnNfcmVjb3JkcyIsImV4cG9ydHMiLCJkb21haW5DcmVkZW50aWFscyIsImRvbWFpblRlbXBsYXRlcyIsImRvbWFpblRhZ3MiLCJEb21haW5DbGllbnQiLCJyZXNwb25zZSIsImJvZHkiLCJpdGVtcyIsIm1hcCIsIml0ZW0iLCJEb21haW4iLCJkb21haW4iLCJ0cmFja2luZyIsInF1ZXJ5IiwiZ2V0IiwidGhlbiIsInJlcyIsIl9wYXJzZURvbWFpbkxpc3QiLCJfcGFyc2VEb21haW4iLCJwb3N0T2JqIiwiZm9yY2VfZGtpbV9hdXRob3JpdHkiLCJ0b1N0cmluZyIsInBvc3RXaXRoRkQiLCJwdXQiLCJkZWxldGUiLCJfcGFyc2VNZXNzYWdlIiwiY29ubmVjdGlvbiIsIl9wYXJzZVRyYWNraW5nU2V0dGluZ3MiLCJhY3RpdmUiLCJlcnJvcl8xIiwic3RhdHVzIiwic3RhdHVzVGV4dCIsIm1lc3NhZ2UiLCJwdXRXaXRoRkQiLCJfcGFyc2VUcmFja2luZ1VwZGF0ZSIsIl9hIiwiaXAiLCJwb29sX2lkIiwicmVwbGFjZW1lbnQiLCJzZWFyY2hQYXJhbXMiLCJzZWxmIiwiZGtpbVNlbGVjdG9yIiwid2ViUHJlZml4IiwiYmFzZVJvdXRlIiwiRG9tYWluQ3JlZGVudGlhbHNDbGllbnQiLCJ0b3RhbENvdW50IiwidG90YWxfY291bnQiLCJyZXN1bHQiLCJzcGVjIiwiX3BhcnNlRG9tYWluQ3JlZGVudGlhbHNMaXN0IiwiY29uY2F0IiwiX3BhcnNlTWVzc2FnZVJlc3BvbnNlIiwiY3JlZGVudGlhbHNMb2dpbiIsIl9wYXJzZURlbGV0ZWRSZXNwb25zZSIsInRhZ0luZm8iLCJ0YWciLCJkZXNjcmlwdGlvbiIsIkRhdGUiLCJ0YWdTdGF0aXN0aWNJbmZvIiwic3RhcnQiLCJlbmQiLCJyZXNvbHV0aW9uIiwic3RhdCIsInRpbWUiLCJEb21haW5UYWdzQ2xpZW50IiwicGFnZXMiLCJPYmplY3QiLCJlbnRyaWVzIiwicGFnaW5nIiwicmVkdWNlIiwiYWNjIiwiZW50cmllIiwiaWQiLCJEb21haW5UYWciLCJfcGFyc2VQYWdlTGlua3MiLCJEb21haW5UYWdTdGF0aXN0aWMiLCJfcGFyc2VEb21haW5UYWdzTGlzdCIsIl9wYXJzZVRhZ1N0YXRpc3RpYyIsImRvbWFpblRlbXBsYXRlRnJvbUFQSSIsImNyZWF0ZWRBdCIsImNyZWF0ZWRCeSIsInZlcnNpb24iLCJ2ZXJzaW9ucyIsImxlbmd0aCIsIkRvbWFpblRlbXBsYXRlc0NsaWVudCIsIkRvbWFpblRlbXBsYXRlSXRlbSIsInRlbXBsYXRlIiwidGVtcGxhdGVOYW1lIiwidGVtcGxhdGVWZXJzaW9uIiwiZCIsInBhcnNlTGlzdCIsInBhcnNlQ3JlYXRpb25SZXNwb25zZSIsInBhcnNlTXV0YXRpb25SZXNwb25zZSIsInBhcnNlTm90aWZpY2F0aW9uUmVzcG9uc2UiLCJwYXJzZUNyZWF0aW9uVmVyc2lvblJlc3BvbnNlIiwicGFyc2VNdXRhdGVUZW1wbGF0ZVZlcnNpb25SZXNwb25zZSIsInBhcnNlTGlzdFRlbXBsYXRlVmVyc2lvbnMiLCJfX2V4dGVuZHMiLCJfYiIsImJvZHlNZXNzYWdlIiwiZXJyb3IiLCJfc3VwZXIiLCJfdGhpcyIsInN0YWNrIiwiZGV0YWlscyIsIkV2ZW50Q2xpZW50Iiwic3BsaXQiLCJwb3AiLCJudW1iZXIiLCJfcGFyc2VQYWdlTnVtYmVyIiwicGFpciIsIl9wYXJzZVBhZ2UiLCJxdWVyeUNvcHkiLCJwYWdlIiwiX3BhcnNlRXZlbnRMaXN0IiwiRm9ybURhdGFDb25zdHJ1Y3RvciIsIkZvcm1EYXRhQnVpbGRlciIsImtleXMiLCJmaWx0ZXIiLCJmb3JtRGF0YUFjYyIsImZpbGVLZXlzIiwiaW5jbHVkZXMiLCJhZGRGaWxlc1RvRkQiLCJhZGRNaW1lRGF0YVRvRkQiLCJhZGRDb21tb25Qcm9wZXJ0eVRvRkQiLCJmb3JtRGF0YUluc3RhbmNlIiwiZ2V0SGVhZGVycyIsInVuZGVmaW5lZCIsImlzU3RyZWFtIiwiY29udGVudFR5cGUiLCJrbm93bkxlbmd0aCIsImZpbGVuYW1lIiwiaXNOb2RlRm9ybURhdGEiLCJCdWZmZXIiLCJpc0J1ZmZlciIsImFwcGVuZCIsInByb3BlcnR5TmFtZSIsInZhbHVlIiwiYXBwZW5kRmlsZVRvRkQiLCJvcmlnaW5hbEtleSIsIm9iaiIsImlzU3RyZWFtRGF0YSIsIm9iakRhdGEiLCJnZXRBdHRhY2htZW50T3B0aW9ucyIsIkFycmF5IiwiaXNBcnJheSIsImZvckVhY2giLCJwaXBlIiwiRm9ybURhdGEiLCJNYWlsZ3VuIiwiY2xpZW50XzEiLCJTdXBwcmVzc2lvbk1vZGVscyIsIklwUG9vbHNDbGllbnQiLCJwYXJzZUlwUG9vbHNSZXNwb25zZSIsInBvb2xJZCIsInBhdGNoV2l0aEZEIiwiSXBzQ2xpZW50IiwicGFyc2VJcHNSZXNwb25zZSIsIm1lbWJlcnMiLCJMaXN0c0NsaWVudCIsInZhbGlkYXRpb25SZXN1bHQiLCJtYWlsTGlzdEFkZHJlc3MiLCJsaXN0IiwicG9zdCIsInBhcnNlVmFsaWRhdGlvblJlc3VsdCIsIk1haWxMaXN0c01lbWJlcnMiLCJuZXdEYXRhIiwidmFycyIsIkpTT04iLCJzdHJpbmdpZnkiLCJzdWJzY3JpYmVkIiwibWFpbExpc3RNZW1iZXJBZGRyZXNzIiwibWVtYmVyIiwicmVxRGF0YSIsImNoZWNrQW5kVXBkYXRlRGF0YSIsInVwc2VydCIsIk1lc3NhZ2VzQ2xpZW50IiwiX3BhcnNlUmVzcG9uc2UiLCJNdWx0aXBsZVZhbGlkYXRpb25DbGllbnQiLCJoYW5kbGVSZXNwb25zZSIsImxpc3RJZCIsInJlc3BvbnNlU3RhdHVzQ29kZSIsIm11bHRpcGxlVmFsaWRhdGlvbkRhdGEiLCJtdWx0aXBsZVZhbGlkYXRpb25GaWxlIiwiZmlsZSIsInRpbWVvdXQiLCJoZWFkZXJzIiwiZm9ybURhdGFCdWlsZGVyIiwiZm9ybURhdGFCdWlsZGVyXzEiLCJSZXF1ZXN0IiwibWV0aG9kIiwib25DYWxsT3B0aW9ucyIsImJhc2ljIiwiYmFzZTY0IiwiZW5jb2RlIiwib25DYWxsSGVhZGVycyIsIkF1dGhvcml6YXRpb24iLCJwYXJhbXMiLCJnZXRPd25Qcm9wZXJ0eU5hbWVzIiwidG9Mb2NhbGVVcHBlckNhc2UiLCJ0aHJvd0h0dHBFcnJvcnMiLCJvayIsImdldFJlc3BvbnNlQm9keSIsInJlc18xIiwicmVzcG9uc2VTdHJpbmciLCJ0ZXh0IiwianNvbkJvZHkiLCJwYXJzZSIsImFkZERlZmF1bHRIZWFkZXJzIiwicmVxdWVzdE9wdGlvbnMiLCJjb21tYW5kIiwiY3JlYXRlRm9ybURhdGEiLCJSb3V0ZXNDbGllbnQiLCJyb3V0ZSIsIlN0YXRzQ2xpZW50IiwiYXJyYXlXaXRoUGFpcnMiLCJjdXJyZW50UGFpciIsInJlcGVhdGVkUHJvcGVydHkiLCJwdXNoIiwiU3RhdHMiLCJwcmVwYXJlU2VhcmNoUGFyYW1zIiwiX3BhcnNlU3RhdHMiLCJjcmVhdGVPcHRpb25zIiwiU3VwcmVzc2lvbnNfMSIsIkJPVU5DRVMiLCJhZGRyZXNzIiwiY29kZSIsIlN1cHByZXNzaW9uIiwiQ09NUExBSU5UUyIsIlVOU1VCU0NSSUJFUyIsInRhZ3MiLCJXSElURUxJU1RTIiwicmVhc29uIiwibW9kZWxzIiwiTWFwIiwic2V0IiwiQm91bmNlIiwiQ29tcGxhaW50IiwiVW5zdWJzY3JpYmUiLCJXaGl0ZUxpc3QiLCJTdXBwcmVzc2lvbkNsaWVudCIsInBhZ2VVcmwiLCJwYXJzZWRVcmwiLCJVUkwiLCJoYXMiLCJNb2RlbCIsInByZXBhcmVSZXNwb25zZSIsImNoZWNrVHlwZSIsIm1vZGVsIiwiX3BhcnNlTGlzdCIsImVuY29kZVVSSUNvbXBvbmVudCIsIl9wYXJzZUl0ZW0iLCJwb3N0RGF0YSIsImNyZWF0ZVdoaXRlTGlzdCIsIm1vZHVsZSIsIm11bHRpcGxlVmFsaWRhdGlvbiIsIlZhbGlkYXRlQ2xpZW50IiwiV2ViaG9va0NsaWVudCIsIndlYmhvb2tSZXNwb25zZSIsIndlYmhvb2siLCJ1cmxzIiwiV2ViaG9vayIsIl9wYXJzZVdlYmhvb2tMaXN0IiwiX3BhcnNlV2ViaG9va1dpdGhJRCIsInRlc3QiLCJfcGFyc2VXZWJob29rVGVzdCJdLCJzb3VyY2VSb290IjoiIn0=