"use strict";

const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    index: './_js/index.js',
  },
  output: {
    path: path.resolve(__dirname, './assets'),
    filename: '[name].js'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'common.js',
      minChunks: 2,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'babel-loader',
          options: { presets: ['es2015', 'react'] },
        }]
      }
    ]
  }
};
