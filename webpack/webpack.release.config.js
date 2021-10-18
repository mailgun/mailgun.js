/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */

const TerserPlugin = require('terser-webpack-plugin');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.common.config');

const productionConfig = merge(baseConfig, {
  mode: 'production',
  devtool: undefined,
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          keep_classnames: true,
        }
      }),
    ],
  },
});

const nodeConf = merge(productionConfig, {
  target: 'node',
  output: {
    filename: 'mailgun.node.js'
  }
});

const webConf = merge(productionConfig, {
  target: 'web',
  output: {
    filename: 'mailgun.web.js'
  }
});
module.exports = [nodeConf, webConf];
