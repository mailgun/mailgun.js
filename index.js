'use strict';

require('es6-promise').polyfill();

var Client = require('./lib/client');
var version = require('./package.json').version;

module.exports = {
  VERSION: version,
  client: function(options) {
    return new Client(options);
  }
};
