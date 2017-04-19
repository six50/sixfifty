"use strict";

const path = require('path');

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
  ]
};
