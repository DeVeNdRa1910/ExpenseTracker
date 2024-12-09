const { merge } = require('webpack-merge');
const common = require('./webpack.config.js');
module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
    port: 5500,
    open: true,
    hot: true,
    compress: true,
  },
});

