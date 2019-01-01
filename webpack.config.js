const webpack = require('webpack');
const path = require('path');

const clientConfig  = {
  entry: './client/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  }
}
    const serverConfig = {
        //...
        target: 'node',
    }
module.exports = clientConfig;