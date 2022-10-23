
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  lintOnSave: false,
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  parallel: false,
  // devServer: {
  //   port: 8888,
  //   open: true,
  //   overlay: {
  //     warnings: false,
  //     errors: true
  //   },
  //   // 配置反向代理(面试)   反向代理执行过程：
  //   // axios访问地址中的 /api 转换为 target + /api：
  //   // proxy: {
  //   //   '/api': {
  //   //     target: 'http://ihrm.itheima.net', // 自动拼接/api
  //   //     // target: 'http://192.168.32.58:4000/',
  //   //     changeOrigin: true
  //   //   }
  //   // }
  //   // before: require('./mock/mock-server.js')
  // },
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
  }
}

