"use strict";

const path = require('path');
const autoprefixer = require('autoprefixer');
const precss = require('precss');

module.exports = {
    entry: './client/src/main.js',
    output: {
        path: 'client/dist',
        filename: "main.js"
    },
    module: {
        loaders: [{
            test: /\.css$/,
            loader: "style!css!postcss"
        },
        {
            test: /\.js$/,
            loader: 'babel-loader',
            query: {
              presets: ['es2015', 'react']
            }
          }]
    },
    postcss: function() {
        return [precss, autoprefixer];
    }
};
