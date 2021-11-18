const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.config');

const nodeConf = merge(commonConfig, {
  target: 'node',
  output: {
    filename: 'mailgun.node.js'
  },
  watchOptions: {
    aggregateTimeout: 300,
    poll: 5000,
    ignored: ['../**/dist/*', '**/node_modules']
  }
});

const webConf = merge(commonConfig, {
  target: 'web',
  output: {
    filename: 'mailgun.web.js'
  },
  watchOptions: {
    aggregateTimeout: 300,
    poll: 5000,
    ignored: ['../**/dist/*', '**/node_modules']
  }
});

module.exports = [nodeConf, webConf];
