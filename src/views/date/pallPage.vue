<template>
  <div>
    <el-button @click="btnGetAll">点击获取promise.all看console</el-button>
    <!-- <NbButton></NbButton> -->
    <nb-button></nb-button>
    <p>user模块的数量是count:{{ userCount }}</p>
    <p>通过getters计算求的和是sum:{{ sum }}</p>
    <button @click="addCount">增加</button>
    <button @click="loseCount">减少</button>
    <p>
      <button @click="lineBusBtn">点击通知用的事件总线</button>
    </p>
    <div
      ref="OffsetDivRef"
      class="OffsetDiv"
      @contextmenu.prevent="showContextMenu"
    >
      <p>盒子的高度</p>
    </div>
    <el-button ref="btnHeightRef"
      >elementui的button获取高度的的时候需要加$el</el-button
    >
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'JjjjPallPage',

  data() {
    return {}
  },
  mounted() {
    console.log(this.$refs.OffsetDivRef.offsetHeight) //获取元素的高度=clientHeight+border
    console.log(this.$refs.OffsetDivRef.clientWidth) //获取元素的宽度
    //  因为用了组件，获取高度的时候需要加$el
    console.log(this.$refs.btnHeightRef.$el.clientHeight) //clientHeight=高度+内边距
    // this.loadAllDatalList()
  },
  computed: {
    ...mapGetters(['userCount', 'sum'])
  },
  methods: {
    // 右键菜单，原生方法
    showContextMenu() {
      alert('gggggggggg')
    },
    lineBusBtn() {
      this.$bus.$emit('hello', '名字是张三', 666, 888, 999)
    },
    // ...mapMutations({
    //   addCount: 'user/addCount',
    //   loseCount: 'user/loseCount'
    // }),
    ...mapMutations('user', ['addCount', 'loseCount']),
    // 当有请求的数据一起得到结果
    // 获取图片列表
    getImgList() {
      // 模拟请求
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({ ImgList: [] })
        }, 1000)
      })
    },
    // 获取歌单信息列表
    getPlaylist() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({ Playlist: [] })
        }, 2000)
      })
    },
    // 获取分类列表
    getCategoryList() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({ CategoryList: [] })
        }, 3000)
      })
    },
    // 获取总的promise.all
    async loadAllDatalList() {
      let all = await Promise.all([
        this.getImgList(),
        this.getPlaylist(),
        this.getCategoryList()
      ]).catch((error) => {
        console.log(error)
      })
      console.log(all)
    },
    btnGetAll() {
      //点击获取
      this.loadAllDatalList()
    }
  }
}
</script>

<style lang="less" scoped>
.OffsetDiv {
  background-color: lightgreen;
  width: 300px;
  height: 200px;
  border-right: 1px solid pink;
}
</style>
