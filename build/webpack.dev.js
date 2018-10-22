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
        port: 8080,
        host: '0.0.0.0',
        overlay: true,
        historyApiFallback: {
            disableDotRule: true,
        },
        proxy: [{
          context: '/api',
          target: 'https://io.zaojiu.com',  // 代理跨域目标接口
          // pathRewrite: {'^/api' : ''}
          changeOrigin: true,
          secure: false,  // 当代理某些https服务报错时用
          cookieDomainRewrite: 'http://0.0.0.0:8080'  // 可以为false，表示不修改
        }],
    }
});
