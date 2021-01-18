const webpack = require('webpack');
const path = require('path');

const pkg = require('./package.json');

module.exports = () => {
  const outputDir = 'dist';

  return {
    mode: 'development',
    target: 'node',
    context: __dirname,
    entry: {
      mailgun: path.resolve(__dirname, './index.ts'),
      'mailgun.min': path.resolve(__dirname, './index.ts')
    },
    output: {
      path: path.resolve('./', outputDir),
      filename: 'mailgun.js',
      library: 'mailgun',
      libraryExport: 'default',
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
              loader: 'ts-loader?configFile=tsconfig.webpack.json',
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
};
