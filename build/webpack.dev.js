const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const DEV_WEB_HOST = 'zaojiu.tv';

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  module: {
    rules: [
      // 开发环境不提取css
      {
        test: /\.scss$/,
        // loader处理顺序从下往上
        use: [
          {
            loader: 'style-loader', // 将 JS 字符串生成为 style 节点
          },
          {
            loader: 'css-loader', // 将 CSS 转化成 CommonJS 模块
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              config: {
                path: 'postcss.config.js',  // 项目根目录创建此文件
              },
            },
          },
          {
            loader: 'sass-loader', // 将 Sass 编译成 CSS
          },
        ],
      },
    ],
  },
  plugins: [
    // 开发环境，使用模块的路径，而不是数字标识符构建hash，使未更改的模块，hash不变
    new webpack.HashedModuleIdsPlugin(),
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
      context: '/api/live/',
      target: 'https://io.zaojiu.com',  // 代理跨域目标接口
      // pathRewrite: {'^/api' : ''}
      changeOrigin: true,
      secure: false,  // 当代理某些https服务报错时用
      cookieDomainRewrite: DEV_WEB_HOST,  // 可以为false，表示不修改
      noInfo: true,
      onProxyRes(proxyRes, req, res) {
        const cookies = proxyRes.headers['set-cookie'];
        const cookieRegex = /Path=/i;
        // 修改cookie Path
        if (cookies) {
          const newCookie = cookies.map((cookie) => {
            if (cookieRegex.test(cookie)) {
              return cookie.replace(cookieRegex, 'Path=');
            }
            return cookie;
          });
          // 修改cookie path
          delete proxyRes.headers['set-cookie'];
          proxyRes.headers['set-cookie'] = newCookie; // cookies中如果带有Secure，则http下Chrome中set-cookies不会成功
          proxyRes.headers['Access-Control-Allow-Origin'] = DEV_WEB_HOST;
          proxyRes.headers['Access-Control-Allow-Credentials'] = 'true';
        }
      },
    },
    {
      context: '/api/my/',
      target: 'http://127.0.0.1:3308',  // 代理跨域目标接口 https://io.zaojiu.com
      pathRewrite: { '^/api/my': '/api' },
      changeOrigin: true,
      // secure: false,  // 当代理某些https服务报错时用
      // cookieDomainRewrite: DEV_WEB_HOST,  // 可以为false，表示不修改
      // noInfo: true,
      onProxyRes(proxyRes, req, res) {
        /* let cookies = proxyRes.headers['set-cookie'];
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
          } */
      },
    },
    ],
  },
});
