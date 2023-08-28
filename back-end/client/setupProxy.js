//http-proxy-middleware 1.x.x 이상
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use( 
        createProxyMiddleware("/api", {
            target: "http://localhost:8080",
            changeOrigin: true,
            headers: {
                "Connection": "keep-alive"
            },
        })
    );
};

// module.exports = function(app) {
//     app.use(proxy('/api', {
//         target: 'http://127.0.0.1:8080/',
//         headers: {
//             "Connection": "keep-alive"
//         },
//     }));
// };