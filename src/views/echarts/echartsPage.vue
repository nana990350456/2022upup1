<template>
  <div style="width: 800px; height: 500px">
    11111222222
    <el-button type="primary" @click="exportEcharts">导出echarts图</el-button>
    <echartsPage3 ref="echarts3" style="width: 800px; height: 500px" />
  </div>
</template>

<script>
import echartsPage3 from './echartsPage3.vue'
// import echartsPage5 from './echartsPage5.vue'
export default {
  name: 'JjjjEchartsPage',
  components: {
    echartsPage3
    // echartsPage5
  },
  data() {
    return {}
  },

  mounted() {
    this.$nextTick(() => {
      this.$refs.echarts3.initEchartsBar()
    })
    this.maxFn()
  },

  methods: {
    exportEcharts() {
      let myChart = null
      myChart = this.$refs.echarts3.MyEcharts
      var img = new Image()
      img.src = myChart.getDataURL({
        type: 'png',
        pixelRatio: 1, //放大2倍
        backgroundColor: '#fff'
      })

      img.onload = function () {
        var canvas = document.createElement('canvas')
        canvas.width = img.width
        canvas.height = img.height
        var ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0)
        var dataURL = canvas.toDataURL('image/png')

        var a = document.createElement('a')
        // 创建一个单击事件
        var event = new MouseEvent('click')
        // 将a的download属性设置为我们想要下载的图片名称，若name不存在则使用‘下载图片名称’作为默认名称
        a.download = '图片.png' || '下载图片名称'
        // 将生成的URL设置为a.href属性
        a.href = dataURL
        // 触发a的单击事件
        a.dispatchEvent(event)
      }
    },
    maxFn() {
      let arr = ['0.8', '0.42', '0.56']
      let maxNum = Math.max(...arr)
      console.log(maxNum, 'maxNum')
    }
  }
}
</script>

<style lang="scss" scoped></style>
