const merge = require('webpack-merge');
const common = require('./webpack.common.js');


module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    contentBase: '../dist',
    compress: true, // 一切服务都启用gzip 压缩
    port: 9000
  }
})