const path = require('path');
const DISTPATH = path.resolve(__dirname, '../dist');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
// const env = process.env.NODE_ENV;

// console.log(env);

const common = {
    entry: {
        app: './src/index.js',
    },
    output: {
        // 多入口输出，加hash，利用缓存，但是两次相同代码的build可能会产生不同的hash
        // 因为 webpack 在入口 chunk 中，包含了某些样板(boilerplate)，特别是 runtime 和 manifest 导致hash改变。
        // 输出可能会因当前的 webpack 版本而稍有差异。新版本不一定有和旧版本相同的 hash 问题，但我们需要提取模板，以防万一。
        pathinfo: true,
        filename: 'js/[name].[chunkhash].js',
        path: DISTPATH,
        publicPath: "/" // publicPath 总是以斜杠(/)开头和结尾。
    },
    module: {
        rules: [
            {
                test:/\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.scss$/,
                // loader处理顺序从下往上
                use: [
                    {
                        loader: "style-loader" // 将 JS 字符串生成为 style 节点
                    },
                    {
                        loader: "css-loader" // 将 CSS 转化成 CommonJS 模块
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            config: {
                                path: 'postcss.config.js'  // 项目根目录创建此文件
                            }
                        }
                    },
                    {
                        loader: "sass-loader" // 将 Sass 编译成 CSS
                    }
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                // url-loader内置了file-loader,不同的是，当文件小于1024字节时，会转换为base64编码
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: '8192'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        // 清除dist中的文件
        // new CleanWebpackPlugin(['dist']),
        // 生成包含js等各种依赖的html文件
        // TODO 其他特别配置
        new HtmlWebpackPlugin({
            template:'./src/index.html'
        }),
        // 这能把loadsh作为全局变量，使用时无需引入，$ jquery同理
        /* new webpack.ProvidePlugin({
          _: 'lodash',
          join: ['lodash', 'join']提取loadsh的join,使用join时都是调用的_.join,这能很好的与 tree shaking 配合，将 lodash 库中的其他没用到的部分去除。
        }) */
    ],
    // 处理重复模块代码，提取到单独的chunk,CommonsChunkPlugin 已经从 webpack v4（代号 legato）中移除。
    // 把库提取到vender中，使得浏览器能使用缓存
    optimization: {
        runtimeChunk: 'single', // 提取模版，runtime到单独的chunk
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    }
}

module.exports = common;
