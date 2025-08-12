const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/glb', 
    createProxyMiddleware({
      target: 'http://3.35.186.32:8000',
      changeOrigin: true,
      secure: false,
      pathRewrite: { '^/glb': '' },
    })
  );
};
