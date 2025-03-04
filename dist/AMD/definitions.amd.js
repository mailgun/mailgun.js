// mailgun.js v12.0.0 Copyright (c) 2025 Mailgun and contributors
define(['exports'], (function (exports) { 'use strict';

    var Resolution;
    (function (Resolution) {
        Resolution["HOUR"] = "hour";
        Resolution["DAY"] = "day";
        Resolution["MONTH"] = "month";
    })(Resolution || (Resolution = {}));
    var SuppressionModels;
    (function (SuppressionModels) {
        SuppressionModels["BOUNCES"] = "bounces";
        SuppressionModels["COMPLAINTS"] = "complaints";
        SuppressionModels["UNSUBSCRIBES"] = "unsubscribes";
        SuppressionModels["WHITELISTS"] = "whitelists";
    })(SuppressionModels || (SuppressionModels = {}));
    var WebhooksIds;
    (function (WebhooksIds) {
        WebhooksIds["CLICKED"] = "clicked";
        WebhooksIds["COMPLAINED"] = "complained";
        WebhooksIds["DELIVERED"] = "delivered";
        WebhooksIds["OPENED"] = "opened";
        WebhooksIds["PERMANENT_FAIL"] = "permanent_fail";
        WebhooksIds["TEMPORARY_FAIL"] = "temporary_fail";
        WebhooksIds["UNSUBSCRIBED"] = "unsubscribe";
    })(WebhooksIds || (WebhooksIds = {}));
    var YesNo;
    (function (YesNo) {
        YesNo["YES"] = "yes";
        YesNo["NO"] = "no";
    })(YesNo || (YesNo = {}));

    var index$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        get Resolution () { return Resolution; },
        get SuppressionModels () { return SuppressionModels; },
        get WebhooksIds () { return WebhooksIds; },
        get YesNo () { return YesNo; }
    });

    var index = /*#__PURE__*/Object.freeze({
        __proto__: null
    });

    exports.Enums = index$1;
    exports.Interfaces = index;

}));
