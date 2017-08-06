/* eslint-env node */
const path    = require('path');
const webpack = require('webpack');
const config  = require('./gulp.config.js');

const webpackConfig = {
  resolve: {
    modules: [
      path.resolve(__dirname, 'static/javascripts'),
      'node_modules'
    ],
    extensions: ['.js']
  },
  entry: './static/javascripts/index.js',
  output: {
    path: path.resolve(__dirname, 'static/javascripts'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            ['env', {
              targets: {
                browsers: ["Last 2 versions", "IE 11"],
              },
            }],
          ],
        },
      },
    ],
  },
};

if (config.optimize) {
  webpackConfig.plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
    }),
  ];
} else {
  webpackConfig.devtool = 'cheap-module-source-map';
}

module.exports = webpackConfig;
