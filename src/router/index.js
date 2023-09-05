import Vue from 'vue'
import VueRouter from 'vue-router'

import { TableList } from '@/router/components/Table.js' //表格
import { DateList } from '@/router/components/Date' //日期
import { MapList } from '@/router/components/Map' //地图
import { TabChangeList } from '@/router/components/TabChange' //tab栏切换
import { TestList } from '@/router/components/Test' //练习测试
import { TreeList } from '@/router/components/Tree' //树结构
import { EchartsList } from '@/router/components/echart'
import { SearchList } from '@/router/components/search'
import { TextList } from '@/router/components/TextAbout.js'
import { ImageList } from './components/ImageAbout.js'
// import { threeAbout } from './components/threeAbout.js'

Vue.use(VueRouter)

export const menuList = [
  ...DateList,
  ...MapList,
  ...TabChangeList,
  ...TestList,
  ...TableList,
  ...TreeList,
  ...EchartsList,
  ...SearchList,
  ...TextList,
  ...ImageList,
  // ...threeAbout
]
// 链接主页
let nav = {
  path: '/navHome',
  name: 'navHome',
  component: () => import('@/views/navHome/navHomePage.vue')
}

const routes = [...menuList, nav]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
