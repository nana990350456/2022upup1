<template>
  <div>
    <el-menu
      text-color="#fff"
      background-color="transparent"
      active-background="#fff"
      active-text-color="#000"
      :default-active="$route.path"
      :unique-opened="true"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      router
    >
      <el-submenu v-for="item in menuList" :index="item.name" :key="item.name">
        <!-- 自定义字体和图表 -->
        <template slot="title">
          <!-- <i class="el-icon-menu"></i> -->
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-xuehua"></use>
          </svg>
          <!-- 绑定icon图标 -->
          <!-- <svg-icon :icon-class="item.meta.icon" class="titleicon" /> -->
          <span>{{ item.name }}</span>
        </template>
        <el-menu-item
          :index="child.path"
          v-for="child in item.children"
          :key="child.name"
        >
          <!-- <i class="el-icon-menu"></i> -->
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-xuehua"></use>
          </svg>
          <!-- <svg-icon :icon-class="item.meta.icon" class="titleicon" /> -->
          {{ child.meta.title }}
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import { menuList } from '@/router'
export default {
  name: 'SidebarPage',
  components: {},
  props: {},
  data() {
    return {
      menuList: menuList
    }
  },
  mounted() {
    console.log(menuList, 'menuList')
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
<style lang="less" scoped>
.icon {
  width: 1em;
  height: 1em;
  font-size: 20px;
  vertical-align: middle;
  fill: currentColor;
  overflow: hidden;
}
/deep/.el-menu {
  margin-top: 10px;
  width: 100%;
  .el-submenu__title {
    &:hover {
      background: rgba(255, 255, 255, 0.6) !important;
    }
  }
  .el-menu-item:hover {
    background: rgba(255, 255, 255, 0.6) !important;
  }
  .el-menu-item.is-active {
    background: rgba(255, 255, 255, 0.6) !important;
  }
}
// // 图标样式设置
// .titleicon {
// 	margin-right: 10px;
// 	color: #ffffff;
// }
// .menutitle {
// 	display: flex;
// }
// // 清除边框线
// .el-menu {
// 	border: none;
// }
// // 一级菜单标题 /
// .el-submenu /deep/ .el-submenu__title {
// 	// background-color: #e9eaec !important;
// 	font-weight: 700;
// 	// font-size: 16px;
// 	color: rgba(203, 255, 247, 1) !important;
// 	display: flex;
// }

// /*鼠标悬停el-menu样式 */
// ::v-deep .el-submenu:hover .el-submenu__title {
// 	background-color: transparent !important;
// 	color: #ebeef5;
// }

// // 选中二级菜单背景色
// /deep/.el-menu .el-menu--inline {
// 	background-color: #2da6ab !important;
// 	opacity: 0.7;
// 	color: rgba(253, 255, 255, 1) !important;
// }

// /* 鼠标悬停item项样式 */
// /deep/ .el-menu-item:hover {
// 	background-color: #2da6ab !important;
// 	color: #ebeef5 !important;
// }

// /* item项点击效果 */
// /deep/ .el-menu-item.is-active {
// 	background-color: rgba(161, 255, 205, 0.6) !important;
// 	color: #ffffff !important;
// 	font-weight: 700;
// }

// .aside-container {
// 	overflow-y: auto;
// }
</style>
