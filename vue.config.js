/* 更多配置参考：https://cli.vuejs.org/zh/guide/mode-and-env.html */
const {defineConfig} = require('@vue/cli-service');
//const webpack = require('webpack');
module.exports = defineConfig({
    transpileDependencies: true,
    publicPath: './', // 必须配置这个，否则打包后的文件无法使用
    //打包输出文件夹名称
    //outputDir: `dist/${process.env.NODE_ENV}`,
    outputDir: "dist",
    //放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
    assetsDir: 'static',
    pages: {
        index: {
            // page 的入口
            entry: 'src/main.js',
            // 当使用 title 选项时，template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: 'CROSS ISLAND LINE 109',
        },
    },
    lintOnSave: false,// 关闭eslint
    /* configureWebpack: (config) => {
        // 定义全局变量
        config.plugins.push(new webpack.ProvidePlugin({
            echarts: 'echarts'
        }));
    }, */
    devServer: {
        port: 9000,
        //open: true,// 是否自动打开项目
        proxy: { // 反向代理配置，解决前端本地跨域问题
            '/api': {
                target: 'http://127.0.0.1:8085',
                changeOrigin: true,
                ws: false,
                pathRewrite: {
                    '^/api': '',
                },
            },
        },
        client: {// 解决vue项目将决Uncaught runtime errors类型的错误报到浏览器上的问题
            overlay: false // 设为false则不将此类型的错误报到浏览器上
        }
    },
})
