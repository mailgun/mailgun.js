const commonConfig = require('./webpack.common.config');

const { merge } = require('webpack-merge');

const nodeConf = merge(commonConfig, {
  target: 'node',
  output: {
    filename: 'mailgun.node.js'
  }
});

const webConf = merge(commonConfig, {
  target: 'web',
  output: {
    filename: 'mailgun.web.js'
  }
});

module.exports = [nodeConf, webConf];
