const path = require('path');
const { merge } = require('webpack-merge');

const baseConfig = require('./webpack.config.js');

module.exports = (env) => {
  const outputDir = 'dist';

  return merge(baseConfig(env), {
    mode: 'production',
    output: {
      path: path.resolve('./', outputDir),
    },
    devtool: undefined
  });
};
