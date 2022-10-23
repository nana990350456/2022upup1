<template>
  <div>
    <el-button @click="btnGetAll">点击获取promise.all看console</el-button>
  </div>
</template>

<script>
export default {
  name: 'JjjjPallPage',

  data() {
    return {}
  },
  mounted() {
    // this.loadAllDatalList()
  },
  methods: {
    // 当有请求的数据一起得到结果
    // 获取图片列表
    getImgList() {
      // 模拟请求
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({ImgList:[]})
        }, 1000)
      })
    },
    // 获取歌单信息列表
    getPlaylist() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({'Playlist':[]})
        }, 2000)
      })
    },
    // 获取分类列表
    getCategoryList() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({'CategoryList':[]})
        }, 3000)
      })
    },
    // 获取总的promise.all
   async loadAllDatalList() {
      let all =await Promise.all([
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

<style lang="scss" scoped></style>
