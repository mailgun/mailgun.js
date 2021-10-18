const webpack = require('webpack');
const path = require('path');
const pkg = require('../package.json');

const SRC_DIR = path.join(__dirname, '../');

const outputDir = 'dist';
const commonConfig = {
  mode: 'development',
  context: SRC_DIR,
  entry: {
    mailgun: path.join(SRC_DIR, 'index.ts'),
    'mailgun.min': path.join(SRC_DIR, 'index.ts')
  },
  output: {
    path: path.join(SRC_DIR, outputDir),
    filename: 'mailgun.js',
    library: 'mailgun',
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)?/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: `ts-loader?configFile=${path.join(SRC_DIR, 'tsconfig.webpack.json')}`
          }
        ],
        exclude: /(node_modules|test)/
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin(`${pkg.name} v${pkg.version}`)
  ],
  resolve: {
    extensions: ['.ts', '.js', '.json']
  },
  devtool: 'inline-source-map'
};

module.exports = commonConfig;
