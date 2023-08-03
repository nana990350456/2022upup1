<template>
  <el-card class="boxInfo">
    外部传入的消息:{{ message }}
    <el-button type="primary" @click="btn">改变外面边框色</el-button>
  </el-card>
</template>

<script>
export default {
  name: 'JjjjIndex',
  props: {
    message: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  },

  mounted() {},

  methods: {
    btn() {
      // let colors = [
      //   'rgba(255, 0, 0, 0.5)',
      //   'rgba(0, 255, 0, 0.5)',
      //   'rgba(0, 0, 255, 0.5)',
      //   'rgba(255, 255, 0, 0.5)',
      //   'rgba(255, 0, 255, 0.5)',
      //   'rgba(0, 255, 255, 0.5)'
      // ]
      // let index = Math.floor(Math.random() * colors.length)
      // console.log(colors[index], '4444444')
      const r = Math.floor(Math.random() * 256)
      const g = Math.floor(Math.random() * 256)
      const b = Math.floor(Math.random() * 256)
      console.log(`rgb(${r},${g},${b})`)
      this.changColor(`rgb(${r},${g},${b})`)
    }
  }
}
</script>

<style lang="scss" scoped>
.boxInfo {
  width: 90%;
  height: 90%;
  background: rgba(0, 0, 0, 0.2);
}
</style>
