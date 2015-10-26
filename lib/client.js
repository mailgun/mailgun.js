'use strict';

var merge = require('lodash.merge');
var defaults = require('lodash.defaults');

var Request = require('./request');

var DomainClient = require('./domains');
var EventClient = require('./events');
var StatsClient = require('./stats');
var SuppressionClient = require('./suppressions');
var WebhookClient = require('./webhooks');
var MessagesClient = require('./messages');
var RoutesClient = require('./routes');
var ValidateClient = require('./validate');
var ParseClient = require('./parse');

class Client {
  constructor(options) {
    options = options || {};
    let config = merge({}, options);

    config = defaults(config, { url: 'https://api.mailgun.net' });

    if (!config.username) {
      throw new Error('Parameter "username" is required');
    } else if (!config.key) {
      throw new Error('Parameter "key" is required');
    }

    this.request = new Request(config);

    this.domains = new DomainClient(this.request);
    this.webhooks = new WebhookClient(this.request);
    this.events = new EventClient(this.request);
    this.stats = new StatsClient(this.request);
    this.suppressions = new SuppressionClient(this.request);
    this.messages = new MessagesClient(this.request);
    this.routes = new RoutesClient(this.request);

    if (config.public_key) {
      config.key = config.public_key;

      this.public_request = new Request(config);
      this.validate = new ValidateClient(this.public_request);
      this.parse = new ParseClient(this.public_request);
    }
  }
}

module.exports = Client;
