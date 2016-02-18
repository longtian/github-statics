/**
 * Created by yan on 16-2-18.
 */
var path = require('path');
module.exports = {
  entry: path.join(__dirname, 'app', 'entry.js'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.(js|jsx|es6)$/,
      loader: 'babel'
    }]
  }
}