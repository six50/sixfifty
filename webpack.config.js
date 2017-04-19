"use strict";

const path = require('path');

module.exports = {
  entry: './_js/index.js',
  output: {
    path: path.resolve(__dirname, './assets'),
    filename: 'bundle.js'
  }
};
