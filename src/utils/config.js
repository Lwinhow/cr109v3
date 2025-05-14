/*
在package.json文件中通过 --mode 配置运行的指定模式后,process.env.NODE_ENV有如下三个值：
production 线上生产环境
development 本地开发环境
test 线上开发/测试环境 
PS: --mode只能指定如上三种环境变量值
*/
const path = window.location.hostname;
export default {
    development: {//开发环境
        baseUrl: '/api',//网站接口地址
        playerPath: path + ":8080",
        playerExampleId: '2462623268777',
        wsUrl: '',
    },
    test: {// 测试环境
        baseUrl: 'http://' + path + ':9001',//网站接口地址
        playerPath: "172.17.16.51:8080",
        playerExampleId: '2462623268777',
        wsUrl: '',
    },
    production: {// 生产环境
        baseUrl: 'http://' + path + ':9001',//网站接口地址
        playerPath: "hycvideo.tylin.com.cn",
        playerExampleId: '2543890567926',
        wsUrl: '',
    }
}