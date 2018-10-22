const Koa = require('koa');
const proxy = require('http-proxy-middleware');
const app = new Koa();
const path = require('path');
const serve = require('koa-static');
const fs = require('fs');

const main = serve(path.join(__dirname, '/../') + '/dist/');

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
        res.setHeader('Access-Control-Allow-Origin', 'http://0.0.0.0:9000');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
      },

      // 修改响应信息中的cookie域名
      cookieDomainRewrite: 'http://0.0.0.0:9000',  // 可以为false，表示不修改
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
