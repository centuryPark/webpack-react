const HOST = 'zaojiu.tv'; // cookieDomainRewrite 必须为域名，否则set-cookies 不能成功写入cookies
const proxyConfig = {
  '/api/live/': {
    target: 'https://io.zaojiu.com', // 代理跨域目标接口
    secure: false,
    changeOrigin: true,
    noInfo: true,
    // 修改响应信息中的cookie域名
    cookieDomainRewrite: HOST, // 可以为false，表示不修改
    // pathRewrite: {'^/api' : ''}
    // 修改响应头信息，实现跨域并允许带cookie
    onProxyRes(proxyRes) {
      // res.setHeader('Access-Control-Allow-Origin', 'zaojiu.tv');
      // res.setHeader('Access-Control-Allow-Credentials', 'true');
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
        proxyRes.headers['Access-Control-Allow-Origin'] = HOST;
        proxyRes.headers['Access-Control-Allow-Credentials'] = 'true';
      }
    },
  },
  '/api/my/': {
    target: 'http://127.0.0.1:3308', // 代理跨域目标接口
    changeOrigin: true,
    pathRewrite: { '^/api/my': '/api' },
    /* pathRewrite: {
      '^/v1' : '/mobile/v1'
    } */
  },
};

module.exports = proxyConfig;
