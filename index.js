const Client = require('./lib/client');
const version = require('./package.json').version;

module.exports = {
  VERSION: version,
  client(options) {
    return new Client(options);
  }
};
