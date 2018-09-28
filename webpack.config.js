/* eslint-env node */
const path    = require('path');
const webpack = require('webpack');
const config  = require('./gulp.config.js');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

const webpackConfig = {
  resolve: {
    modules: [
      path.resolve(__dirname, 'assets/javascripts'),
      path.resolve(__dirname, 'assets'),
      'node_modules'
    ],
    extensions: ['.js']
  },
  entry: './assets/javascripts/index.js',
  output: {
    path: path.resolve(__dirname, 'assets/static'),
    filename: '[name].js',
  },
  plugins: [
    new SpriteLoaderPlugin(),
  ],
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
      {
        test: /\.svg$/,
        include: path.resolve('./assets/icons'),
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
              extract: true,
              spriteFilename: 'icons.svg',
              esModule: false,
            },
          },
          'svgo-loader',
        ],
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
