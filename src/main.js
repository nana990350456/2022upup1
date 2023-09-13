import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js' //引入你新建的router文件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/assets/iconfont/iconfont.css'//Font class方式

import '@/assets/iconfont/iconfont.js'//Symbol方式

// 导入mockjs
import './mock/index.js'

// 公共less文件
import '@/assets/common/index.less'

//引入自定义指令
import './utils/drag'

// 引入echarts
import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts

// 引入lottie-web
import lottie from 'lottie-web'
Vue.prototype.$lottie = lottie

// dataV轮播图
// 将自动注册所有组件为全局组件
import dataV from '@jiaminghi/data-view'
Vue.use(dataV)

// 注册全局组件
import components from './components'
Vue.use(components)

// 引入vuex
import store from '@/store'
console.log(process.env.VUE_APP_SERVER_URL, 'envv')
console.log(process.env, 'en')
Vue.config.productionTip = false
Vue.use(ElementUI)
let sub=new Vue({
  store,
  beforeCreate() {
    //在初始化阶段前
    // 定义全局事件总线
    Vue.prototype.$bus = this
  },
  render: (h) => h(App),
  router
}).$mount('#app')
// 解决在乾坤框架下无法使用vuetool
if (window.__POWERED_BY_QIANKUN__ && process.env.NODE_ENV === 'development') {
  let subDiv = document.createElement('div')
subDiv.__vue__ = sub
document.body.appendChild(subDiv)

}
