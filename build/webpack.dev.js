const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');


module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  plugins: [
    // 开发环境，使用模块的路径，而不是数字标识符构建hash，使未更改的模块，hash不变
    new webpack.HashedModuleIdsPlugin()
  ],
  devServer: {
    contentBase: '../dist',
    compress: true, // 一切服务都启用gzip 压缩
    port: 9000
  }
})