// 引入
import Vue from 'vue'
import Vuex from 'vuex' //引入
import getters from './getters'
import user from './modules/user' //引入user模块
Vue.use(Vuex) //使用vuex

const store = new Vuex.Store({
    modules:{
        user  
    },
    getters
})
// 导出 ->在main.js中引入
export default store
