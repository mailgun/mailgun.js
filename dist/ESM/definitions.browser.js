// mailgun.js v11.1.1 Copyright (c) 2025 Mailgun and contributors
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

export { index$1 as Enums, index as Interfaces };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmaW5pdGlvbnMuYnJvd3Nlci5qcyIsInNvdXJjZXMiOlsiLi4vLi4vbGliL0VudW1zL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCB2YXIgUmVzb2x1dGlvbjtcbihmdW5jdGlvbiAoUmVzb2x1dGlvbikge1xuICAgIFJlc29sdXRpb25bXCJIT1VSXCJdID0gXCJob3VyXCI7XG4gICAgUmVzb2x1dGlvbltcIkRBWVwiXSA9IFwiZGF5XCI7XG4gICAgUmVzb2x1dGlvbltcIk1PTlRIXCJdID0gXCJtb250aFwiO1xufSkoUmVzb2x1dGlvbiB8fCAoUmVzb2x1dGlvbiA9IHt9KSk7XG5leHBvcnQgdmFyIFN1cHByZXNzaW9uTW9kZWxzO1xuKGZ1bmN0aW9uIChTdXBwcmVzc2lvbk1vZGVscykge1xuICAgIFN1cHByZXNzaW9uTW9kZWxzW1wiQk9VTkNFU1wiXSA9IFwiYm91bmNlc1wiO1xuICAgIFN1cHByZXNzaW9uTW9kZWxzW1wiQ09NUExBSU5UU1wiXSA9IFwiY29tcGxhaW50c1wiO1xuICAgIFN1cHByZXNzaW9uTW9kZWxzW1wiVU5TVUJTQ1JJQkVTXCJdID0gXCJ1bnN1YnNjcmliZXNcIjtcbiAgICBTdXBwcmVzc2lvbk1vZGVsc1tcIldISVRFTElTVFNcIl0gPSBcIndoaXRlbGlzdHNcIjtcbn0pKFN1cHByZXNzaW9uTW9kZWxzIHx8IChTdXBwcmVzc2lvbk1vZGVscyA9IHt9KSk7XG5leHBvcnQgdmFyIFdlYmhvb2tzSWRzO1xuKGZ1bmN0aW9uIChXZWJob29rc0lkcykge1xuICAgIFdlYmhvb2tzSWRzW1wiQ0xJQ0tFRFwiXSA9IFwiY2xpY2tlZFwiO1xuICAgIFdlYmhvb2tzSWRzW1wiQ09NUExBSU5FRFwiXSA9IFwiY29tcGxhaW5lZFwiO1xuICAgIFdlYmhvb2tzSWRzW1wiREVMSVZFUkVEXCJdID0gXCJkZWxpdmVyZWRcIjtcbiAgICBXZWJob29rc0lkc1tcIk9QRU5FRFwiXSA9IFwib3BlbmVkXCI7XG4gICAgV2ViaG9va3NJZHNbXCJQRVJNQU5FTlRfRkFJTFwiXSA9IFwicGVybWFuZW50X2ZhaWxcIjtcbiAgICBXZWJob29rc0lkc1tcIlRFTVBPUkFSWV9GQUlMXCJdID0gXCJ0ZW1wb3JhcnlfZmFpbFwiO1xuICAgIFdlYmhvb2tzSWRzW1wiVU5TVUJTQ1JJQkVEXCJdID0gXCJ1bnN1YnNjcmliZVwiO1xufSkoV2ViaG9va3NJZHMgfHwgKFdlYmhvb2tzSWRzID0ge30pKTtcbmV4cG9ydCB2YXIgWWVzTm87XG4oZnVuY3Rpb24gKFllc05vKSB7XG4gICAgWWVzTm9bXCJZRVNcIl0gPSBcInllc1wiO1xuICAgIFllc05vW1wiTk9cIl0gPSBcIm5vXCI7XG59KShZZXNObyB8fCAoWWVzTm8gPSB7fSkpO1xuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBTyxJQUFJLFVBQVU7QUFDckIsQ0FBQyxVQUFVLFVBQVUsRUFBRTtBQUN2QixJQUFJLFVBQVUsQ0FBQyxNQUFNLENBQUMsR0FBRyxNQUFNO0FBQy9CLElBQUksVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUs7QUFDN0IsSUFBSSxVQUFVLENBQUMsT0FBTyxDQUFDLEdBQUcsT0FBTztBQUNqQyxDQUFDLEVBQUUsVUFBVSxLQUFLLFVBQVUsR0FBRyxFQUFFLENBQUMsQ0FBQztBQUM1QixJQUFJLGlCQUFpQjtBQUM1QixDQUFDLFVBQVUsaUJBQWlCLEVBQUU7QUFDOUIsSUFBSSxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsR0FBRyxTQUFTO0FBQzVDLElBQUksaUJBQWlCLENBQUMsWUFBWSxDQUFDLEdBQUcsWUFBWTtBQUNsRCxJQUFJLGlCQUFpQixDQUFDLGNBQWMsQ0FBQyxHQUFHLGNBQWM7QUFDdEQsSUFBSSxpQkFBaUIsQ0FBQyxZQUFZLENBQUMsR0FBRyxZQUFZO0FBQ2xELENBQUMsRUFBRSxpQkFBaUIsS0FBSyxpQkFBaUIsR0FBRyxFQUFFLENBQUMsQ0FBQztBQUMxQyxJQUFJLFdBQVc7QUFDdEIsQ0FBQyxVQUFVLFdBQVcsRUFBRTtBQUN4QixJQUFJLFdBQVcsQ0FBQyxTQUFTLENBQUMsR0FBRyxTQUFTO0FBQ3RDLElBQUksV0FBVyxDQUFDLFlBQVksQ0FBQyxHQUFHLFlBQVk7QUFDNUMsSUFBSSxXQUFXLENBQUMsV0FBVyxDQUFDLEdBQUcsV0FBVztBQUMxQyxJQUFJLFdBQVcsQ0FBQyxRQUFRLENBQUMsR0FBRyxRQUFRO0FBQ3BDLElBQUksV0FBVyxDQUFDLGdCQUFnQixDQUFDLEdBQUcsZ0JBQWdCO0FBQ3BELElBQUksV0FBVyxDQUFDLGdCQUFnQixDQUFDLEdBQUcsZ0JBQWdCO0FBQ3BELElBQUksV0FBVyxDQUFDLGNBQWMsQ0FBQyxHQUFHLGFBQWE7QUFDL0MsQ0FBQyxFQUFFLFdBQVcsS0FBSyxXQUFXLEdBQUcsRUFBRSxDQUFDLENBQUM7QUFDOUIsSUFBSSxLQUFLO0FBQ2hCLENBQUMsVUFBVSxLQUFLLEVBQUU7QUFDbEIsSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSztBQUN4QixJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJO0FBQ3RCLENBQUMsRUFBRSxLQUFLLEtBQUssS0FBSyxHQUFHLEVBQUUsQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7OyJ9
