// 注册全局公共组件

// 引入要注册的组件
// import Vue from 'vue'
import NbButton from './NBbutton'
import LottiePage from './lottie/lottie.vue'
import TextOverFlow from './TextOverFlow/TextOverOne.vue'
import TextOverFlowThree from './TextOverFlow/TextOverThree.vue'

// 要注册的组件
const components = [NbButton, LottiePage, TextOverFlow, TextOverFlowThree]

// export default {
//   install() {
//     //install是Vue.use的时候自动帮我们调用的
//     components.forEach((item) => {
//       //循环遍历组件
//       console.log(item)
//       Vue.component(item.name, item) //注册组件
//     })

//     // console.log('我正在全局注册组件'); //只有install才会执行
//   }
// }

// 注册公共组件的搜索链接
// https://blog.csdn.net/weixin_64252848/article/details/123987640
export default Vue=>{ //函数注册
      components.forEach((item) => {
      //循环遍历组件
      // console.log(item,'999999999')
      Vue.component(item.name, item) //注册组件
    })
}