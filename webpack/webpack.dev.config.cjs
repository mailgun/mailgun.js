const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.config.cjs');

const nodeConf = merge(commonConfig, {
  target: 'node',
  output: {
    filename: 'mailgun.node.js',
    library: {
      name: 'mailgun',
      type: 'umd',
      export: 'default',
    }
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
    filename: 'mailgun.web.js',
    library: {
      type: 'amd'
    }
  },
  watchOptions: {
    aggregateTimeout: 300,
    poll: 5000,
    ignored: ['../**/dist/*', '**/node_modules']
  }
});

module.exports = [nodeConf, webConf];
