<template>
  <div style="width: 800px; height: 500px">
    <el-button type="primary" @click="exportEcharts">导出echarts图</el-button>
    <daochuEcharts ref="echarts3" />
    条形图
    <tiaoxingtu ref="tiaoxingtuRef" />
    叠加柱状图
    <diejiaBar ref="diejiaBarRef" />
    时间不一致
    <timeLine ref="timeLineRef" />
    <button @click="downImg">下载截图</button>
    <p>进度条</p>
    <jindutiao ref="jindutiaoRef" />
  </div>
</template>

<script>
import daochuEcharts from './daochuEcharts.vue'
import tiaoxingtu from './tiaoxingtu.vue'
import diejiaBar from './diejiaBar.vue'
import jindutiao from './jindutiao.vue'
import timeLine from './timeLine.vue'
// import echartsPage5 from './echartsPage5.vue'
import html2canvas from 'html2canvas'
export default {
  name: 'JjjjEchartsPage',
  components: {
    daochuEcharts,
    tiaoxingtu,
    diejiaBar,
    timeLine,
    jindutiao
    // echartsPage5
  },
  data() {
    return {}
  },

  mounted() {
    this.$nextTick(() => {
      this.$refs.echarts3.initEchartsBar()
      this.$refs.tiaoxingtuRef.initEchartsBar()
      this.$refs.diejiaBarRef.initEchartsBar()
      this.$refs.timeLineRef.initEchartsBar()
      this.$refs.jindutiaoRef.initEchartsBar()
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
    },
    downImg() {
      html2canvas(document.getElementById('diejiaBar'), {
        backgroundColor: null, //画出来的图片有白色的边框,不要可设置背景为透明色（null）
        useCORS: true, //支持图片跨域
        scale: 1 //设置放大的倍数
      }).then((canvas) => {
        //截图用img元素承装，显示在页面的上
        // let img = new Image()
        // img.src = canvas.toDataURL('image/jpeg') // toDataURL :图片格式转成 base64
        // document.getElementById('yyy').appendChild(img)

        //如果你需要下载截图，可以使用a标签进行下载
        let a = document.createElement('a')
        a.href = canvas.toDataURL('image/jpeg')
        a.download = 'pic'
        a.click()

        //如果需要将图传入后台
        let url = canvas.toDataURL('image/jpeg') //参数里存储的是图片的BASE64码
        console.log(url, 'url')
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
