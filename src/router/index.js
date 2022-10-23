import Vue from 'vue'
import VueRouter from 'vue-router'
import { TableList } from "@/router/components/Table.js";  //表格
import { DateList } from "@/router/components/Date";  //日期
import { MapList } from "@/router/components/Map";  //地图
import { TabChangeList } from "@/router/components/TabChange";  //tab栏切换
import { TestList } from "@/router/components/Test";  //练习测试
import { TreeList } from "@/router/components/Tree";  //树结构

Vue.use(VueRouter)


export const menuList = [
	...DateList, ...MapList, ...TabChangeList, ...TestList, ...TableList,...TreeList

]

const routes = [
	...menuList
]

const router = new VueRouter({
	routes
})

export default router
