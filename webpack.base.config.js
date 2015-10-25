var webpack = require('webpack');
var pkg = require('./package.json');

module.exports = function(env) {
  var filename = '[name]';
  var outputDir = 'build';

  if (env === 'release') {
    outputDir = 'dist';
  }

  var config = {
    context: __dirname,
    entry: {
      mailgun: './index.js',
      'mailgun.min': './index.js'
    },
    output: {
      path: __dirname + '/' + outputDir,
      filename: filename + '.js',
      library: 'mailgun',
      libraryTarget: 'umd'
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        mangle: {
          screw_ie8: true
        },
        compress: {
          screw_ie8: true,
          warnings: false,
          sequences: true,
          dead_code: true,
          conditionals: true,
          booleans: true,
          unused: true,
          if_return: true,
          join_vars: true,
          drop_console: true
        },
        include: ['mailgun.min.js'],
        output: {comments: false}
      }),
      new webpack.BannerPlugin(pkg.name + ' v' + pkg.version),
      new webpack.NoErrorsPlugin()
    ],
    module: {
      preLoaders: [
        {
          test:    /\.js$/,
          exclude: /node_modules/,
          loader: 'jscs-loader'
        }
      ],
      loaders: [
        { test: /\.js$/, loader: 'babel', exclude: /(node_modules)/},
        { include: /\.json$/, loader: 'json', exclude: /(node_modules)/},
      ]
    },
    resolve: {
      extensions: ['', '.json', '.js']
    },
    devtool: 'source-map',
    jscs: {}
  };

  if (env === 'release') {
    config.jscs.failOnHint = true;
    config.plugins.push(new webpack.optimize.DedupePlugin());
  }

  return config;
};
