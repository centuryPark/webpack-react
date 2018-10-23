const Koa = require('koa');
const proxy = require('http-proxy-middleware');
const path = require('path');
const serve = require('koa-static');
const fs = require('fs');
const history = require('./middleware/koa2-connect-history-api-fallback');
const app = new Koa();

const main = serve(path.join(__dirname, '/../') + '/dist/');

// cookieDomainRewrite 必须为域名，否则set-cookies 不能成功写入cookies
const HOST = 'zaojiu.tv';

app.use(history({
  verbose: true //打出转发日志
}));

app.use(main);

app.use(async (ctx, next) => {
  if(ctx.url.startsWith('/api')) {
    ctx.respond = false;
    return proxy({
      // 代理跨域目标接口
      target: 'https://io.zaojiu.com',
      changeOrigin: true,

      // 修改响应头信息，实现跨域并允许带cookie
      onProxyRes: function(proxyRes, req, res) {
        res.setHeader('Access-Control-Allow-Origin', HOST);
        res.setHeader('Access-Control-Allow-Credentials', 'true');
      },

      // 修改响应信息中的cookie域名
      cookieDomainRewrite: HOST,  // 可以为false，表示不修改
      /*pathRewrite: {
        '^/v1' : '/mobile/v1'
      }*/
    })(ctx.req, ctx.res, next)
  }
  return next()
});

app.listen(9000, () => {
    console.info(`==> 🍺  koa server running at localhost: 9000`);
});
