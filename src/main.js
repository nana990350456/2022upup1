import Vue from 'vue'
import App from './App.vue'
import router from "./router/index.js" //引入你新建的router文件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 公共less文件
import '@/assets/common/index.less'

//引入自定义指令
import './utils/drag'

// 引入echarts
import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts

// dataV轮播图
// 将自动注册所有组件为全局组件
import dataV from '@jiaminghi/data-view'
Vue.use(dataV)

Vue.config.productionTip = false
Vue.use(ElementUI);
new Vue({

  render: h => h(App),
  router,
}).$mount('#app')
