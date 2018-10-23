const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const DEV_WEB_HOST = 'zaojiu.tv';

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
    host: '127.0.0.1',
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
      cookieDomainRewrite: DEV_WEB_HOST,  // 可以为false，表示不修改
      noInfo: true,
      onProxyRes: function (proxyRes, req, res) {
        let cookies = proxyRes.headers['set-cookie'];
        let cookieRegex = /Path=/i;
        //修改cookie Path
        if (cookies) {
          let newCookie = cookies.map(function (cookie) {
            if (cookieRegex.test(cookie)) {
              return cookie.replace(cookieRegex, 'Path=');
            }
            return cookie;
          });
          //修改cookie path
          delete proxyRes.headers['set-cookie'];
          proxyRes.headers['set-cookie'] = newCookie; // cookies中如果带有Secure，则http下Chrome中set-cookies不会成功
          proxyRes.headers['Access-Control-Allow-Origin'] = DEV_WEB_HOST;
          proxyRes.headers['Access-Control-Allow-Credentials'] = 'true';
        }
      }
    }],
  }
});
