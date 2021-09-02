/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const { merge } = require('webpack-merge');

const TerserPlugin = require('terser-webpack-plugin');
const baseConfig = require('./webpack.config.js');

module.exports = (env) => {
  const outputDir = 'dist';

  return merge(baseConfig(env), {
    mode: 'production',
    output: {
      path: path.resolve('./', outputDir),
    },
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
};
