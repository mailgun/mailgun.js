const webpack = require('webpack');
const path = require('path');
const pkg = require('./package.json');

module.exports = () => {
  const filename = '[name]';
  const outputDir = 'build';

  return {
    mode: 'development',
    context: __dirname,
    entry: {
      mailgun: './index.js',
      'mailgun.min': './index.js'
    },
    output: {
      path: path.resolve('./', outputDir),
      filename: `${filename}.js`,
      library: 'mailgun',
      libraryTarget: 'umd'
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }
      ]
    },
    plugins: [
      new webpack.BannerPlugin({ banner: `${pkg.name} v${pkg.version}`, raw: false, entryOnly: true })
    ],
    resolve: {
      extensions: ['.js', '.json'],
      fallback: {
        url: false,
        querystring: false
      }
    },
    devtool: 'source-map'
  };
};
