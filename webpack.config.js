"use strict";

const path = require('path');

module.exports = {
  entry: {
    index: './_js/index.js',
  },
  output: {
    path: path.resolve(__dirname, './assets'),
    filename: '[name].js'
  }
};
