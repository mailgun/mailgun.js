const path = require('path');
const { merge } = require('webpack-merge');

const baseConfig = require('./webpack.config.js');
const TerserPlugin = require('terser-webpack-plugin');

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
