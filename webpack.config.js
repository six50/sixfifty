"use strict";

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
    index: './_frontend/index.js',
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
    new ExtractTextPlugin("[name].css")
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
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: 'css-loader!sass-loader',
          fallback: 'style-loader'
        })
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', 'scss']
  },
  watchOptions: {
    ignored: /node_moudles/
  }
};
