const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const proxyConfig = require('../server/proxyConfig');

const proxyKeys = Object.keys(proxyConfig);

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
    port: 9009,
    host: '127.0.0.1',
    overlay: true,
    historyApiFallback: {
      disableDotRule: true,
    },
    proxy: proxyKeys.map((item) => {
      return {
        context: item,
        ...proxyConfig[item],
      };
    }),
  },
});
