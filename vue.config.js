const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}
console.log(process.env.NODE_ENV, 'env')
module.exports = {
  lintOnSave: false,
  publicPath: process.env.NODE_ENV === 'production' ? '/dist/' : '/',
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
        '@': resolve('src'),
        'mammoth': 'mammoth/mammoth.browser'
      }
    }
  },
  // chainWebpack: (config) => {
  //   config.module
  //     .rule('css')
  //     .oneOf('normal')
  //     .use('css-loader')
  //     .tap((options) => {
  //       options.modules = { auto: true }
  //       return options
  //     })
  // }
  css: {
    extract: false,
    // requireModuleExtension: true,
    // requireModuleExtension: true,
    sourceMap: process.env.NODE_ENV === 'development',

    loaderOptions: {
      sass: {
        additionalData: `@import "~@/styles/variables.module.scss";`
      }
    }
  }
  //     scss: {
  //       // additionalData: `@import "~@/style/variables.module.scss";`
  //       additionalData(content, loaderContext) {
  //         const { resourcePath, rootContext } = loaderContext
  //         const relativePath = path.relative(rootContext, resourcePath)
  //         if (
  //           relativePath.replace(/\\/g, '/') !== 'src/styles/variables.scss'
  //         ) {
  //           return '@import "~@/styles/variables.scss";' + content
  //         }
  //         return content
  //       }
  //     }
  //   }
  // }
}
