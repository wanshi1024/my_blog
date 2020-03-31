module.exports = {
    // publicPath: process.env.NODE_ENV === 'production' ? './' : '/',

    devServer: {
        open: false,
        host: 'localhost',
        port: 9999,
        // assetsSubDirectory: 'static',
        // assetsPublicPath: '../',
        // 设置代理
        // proxy: {
        //     "/api": {
        //         // target: "http://localhost:8888/", // 域名
        //         target: "http://123.56.23.25:8888",
        //         ws: true, // 是否启用websockets
        //         changeOrigin: true, //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        //         pathRewrite: {
        //             "^/api": "/api"
        //         }
        //     }
        // }
    }



};