<template>
  <div class="container">
    <el-container class="main-container">
      <!-- 头部 -->
      <el-header>今天日期{{ currentTime }}</el-header>
      <!-- 主体 -->
      <el-container class="bottom-container">
        <!-- 侧边导航栏 -->
        <el-aside id="silderLeft" style="width: 210px">
          <siderbar />
          <div class="moveBtn" v-move></div>
        </el-aside>

        <!-- 内容区域 -->
        <el-main class="main-box">
          <!-- <keep-alive> -->
          <router-view />
          <!-- </keep-alive> -->
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import siderbar from './Sidebar'
export default {
  name: 'LayoutPage',
  components: { siderbar },
  props: {},
  directives: {
    move(el, bindings) {
      el.onmousedown = function (e) {
        let init = e.clientX
        let parent = document.getElementById('silderLeft')
        let initWidth = parent.offsetWidth
        document.onmousemove = function (e) {
          let end = e.clientX
          if (end > 800 || end < 200) {
            return
          }
          let newWidth = end - init + initWidth
          parent.style.width = newWidth + 'px'
        }
        document.onmouseup = function () {
          document.onmousemove = document.onmouseup = null
        }
      }
    }
  },
  data() {
    return {}
  },
  watch: {},
  computed: {
    currentTime() {
      return this.$dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  created() {},
  mounted() {},
  methods: {}
}
</script>
<style lang="less" scoped>
// 左侧菜单栏设置
/deep/.el-aside {
  position: relative;
  width: 100%;
  overflow-x: hidden;
  min-height: calc(100vh - 60px);
  background: #2e507d;
  color: rgb(255, 255, 255);
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  &::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    height: 10px;
    background: rgba(255, 255, 255, 0.6);
    box-shadow: 0px 0px 20px #fff;
  }
}

/deep/.el-container.is-vertical {
  -webkit-box-orient: vertical;
  height: 100%;
  overflow: hidden;
}
.container {
  width: 100%;
  height: 100%;
}
.bottom-container {
  height: calc(100% - 60px);
}
.el-header {
  height: 100px !important;
  background: url('@/assets/img/daohang.png') no-repeat;
  background-size: 100% 100%;
  color: rgb(255, 255, 255);
  text-align: center;
  line-height: 100px;
  font-size: 32px;
}

/deep/.el-main {
  background-color: #e9eef3;
  color: #333;
  // text-align: center;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
/* 拖动条 */
.moveBtn {
  height: 100%;
  width: 10px;
  /* opacity: 0; */
  position: absolute;
  right: 0px;
  top: 0;
  cursor: col-resize;
  background: rgba(255, 255, 255, 0.6);
  box-shadow: 0px 0px 10px #fff;
}
#silderLeft {
  position: relative;
}
</style>
