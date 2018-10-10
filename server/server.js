const Koa = require('koa');
const app = new Koa();
const path = require('path');
const serve = require('koa-static');

const main = serve(path.join(__dirname, '/../') + '/dist/');

app.use(main);
app.listen(9000, () => {
    console.info(`==> 🍺  koa server running at localhost: 9000`);
});
