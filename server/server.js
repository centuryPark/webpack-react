const Koa = require('koa');
const proxy = require('http-proxy-middleware');
const path = require('path');
const serve = require('koa-static');
const history = require('./middleware/koa2-connect-history-api-fallback');
const proxyConfig = require('./proxyConfig');

const app = new Koa();
const main = serve(`${path.join(__dirname, '/../')}/dist/`);

app.use(history({
  verbose: true, // 打出转发日志
}));

app.use(main);

app.use(async (ctx, next) => {
  const proxyKeys = Object.keys(proxyConfig);
  if (proxyKeys.length === 0) {
    return next();
  }
  proxyKeys.forEach((key) => {
    if (ctx.url.startsWith(key)) {
      ctx.respond = false;
      return proxy(proxyConfig[key])(ctx.req, ctx.res, next);
    }
  });
  return next();
});

app.listen(9000, () => {
  console.info('==> 🍺  koa server running at localhost: 9000');
});
