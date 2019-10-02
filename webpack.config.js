/* eslint-env node */
const path    = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

module.exports = {
  mode: process.env.NODE_ENV,
  resolve: {
    modules: [
      path.resolve(__dirname, 'assets/javascripts'),
      path.resolve(__dirname, 'assets'),
      'node_modules'
    ],
    extensions: ['.js'],
  },
  entry: './assets/javascripts/index.js',
  output: {
    path: path.resolve(__dirname, 'assets/static'),
    filename: '[name].js',
    publicPath: '/static/'
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new SpriteLoaderPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        exclude: /node_modules\/(?!dom7|swiper|accounting-js)/,
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                require('autoprefixer')(),
                require('cssnano')(),
              ],
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(svg|png|jpe?g|gif|webp|woff|woff2|eot|ttf|otf)$/,
        exclude: path.resolve(__dirname, 'assets/icons'),
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
            },
          },
        ],
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
  devServer: {
    proxy: {
      '**': {
        target: 'http://localhost:5000',
      },
    },
    public: 'mois-vegane.lo:3000',
    host: '0.0.0.0',
    port: 3000,
    compress: true,
    // Polling is required inside Vagrant boxes
    watchOptions: {
      poll: true,
    },
    overlay: true,
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
};
