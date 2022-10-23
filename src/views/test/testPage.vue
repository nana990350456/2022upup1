<template>
    <div>
      <!-- 购物车 -->
      <!-- <CarPage /> -->
      <!-- 树结构 -->
      <!-- <Tree /> -->
      <!-- <M1 />
    <p>------</p>
      <M2 /> -->
      <!-- 轮播图 -->
      <!-- <Carousel /> -->
      <!-- 弹框 -->
        <el-button type="primary" @click="dialogVisible = true">点击弹框</el-button>
        <el-dialog
        :close-on-click-modal="false"
        v-dialogDrag
  title="提示"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">
  <span>这是一段信息这是一段信息</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>
      <Dialog />
    </div>
</template>

<script>
// 组件中引用购物车
// import CarPage from './components/carPage'
// 树结构
// import Tree from "./components/tree";
// 混入
// import M1 from './components/mixins/m1.vue'
// import M2 from './components/mixins/m2.vue'
// dataV轮播图
// import Carousel from "./components/carousel";
// 弹框
import Dialog from "./components/dialog";
export default {
    name: 'JjjjTestPage',
    components:{
        // CarPage,
        // Tree,
        // M1,
        // M2,
        // Carousel,
        Dialog
    },

    data() {
      return {
dialogVisible: false
      }
    },

    mounted() {
        
    },

    methods: {
        handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
    },
};
</script>

<style lang="scss" scoped>

</style>