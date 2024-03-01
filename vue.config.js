const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionPlugin = require('compression-webpack-plugin');  

function resolve(dir) {
  return path.join(__dirname, dir)
}

console.log(process.env.NODE_ENV, 'env')
// 执行npm时读取package.json文件对应的指令值内容
 let	PENLE = process.env.npm_lifecycle_event
 let pliuginsBuildShow=PENLE && PENLE.includes('build')
 let plugins =[]
 if (pliuginsBuildShow) {
  plugins=[  
    new CompressionPlugin({  
      algorithm: 'gzip', // 使用gzip压缩  
      test: /\.js$|\.html$|\.css$/, // 匹配需要压缩的文件类型，支持正则表达式  
      // threshold: 1024, // 仅处理大于该大小的文件，单位为字节  
      deleteOriginalAssets: true, //  删除源文件,否则打包带有原js文件,两个同名文件一个js一个g
      threshold: 10240,
      minRatio: 0.8 // 压缩率达到该比例时进行压缩  
    }) ,
    new BundleAnalyzerPlugin(), 
  ]
 }
const  config = {
  lintOnSave: false,
  // publicPath: process.env.NODE_ENV === 'production' ? '/dist/' : '/',
  publicPath: process.env.NODE_ENV === 'production' ? '/2022upup1/' : '/',
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
    plugins,
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
module.exports = config
