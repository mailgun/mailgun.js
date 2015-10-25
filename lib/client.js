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
  }
}

module.exports = Client;
