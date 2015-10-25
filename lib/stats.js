'use strict';

var map = require('lodash.map');
var urljoin = require('url-join');

class Stats {
  constructor(data) {
    this.start = new Date(data.start);
    this.end = new Date(data.end);
    this.resolution = data.resolution;
    this.stats = map(data.stats, function(stat) {
      stat.time = new Date(stat.time);
      return stat;
    });
  }
}

class StatsClient {
  constructor(request) {
    this.request = request;
  }

  _parseStats(response) {
    return new Stats(response.body);
  }

  getDomain(domain, query) {
    return this.request.get(urljoin('/v3', domain, 'stats/total'), query)
      .then(this._parseStats);
  }

  getAccount(query) {
    return this.request.get('/v3/stats/total', query)
      .then(this._parseStats);
  }
}

module.exports = StatsClient;
