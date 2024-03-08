<template>
  <div>
    <h1>刮刮乐</h1>
    <div id="container">
      <canvas id="bottomCanvas" width="356" height="358"></canvas>
      <!-- 底层Canvas -->
      <canvas
        id="topCanvas"
        width="356"
        height="358"
        @mousedown="mousedown"
        @mouseup="isDown = false"
        @mousemove="mousemove"
      ></canvas>
      <!-- 上层Canvas -->
    </div>
  </div>
</template>

<script>
let bottomCtx = null
let topCtx = null
export default {
  name: 'JjjjWenDu3',

  data() {
    return {
      isDown: false
    }
  },

  mounted() {
    console.log(this.newArr, 'kkllljjj')
    this.loadImages()
  },

  methods: {
    loadImages() {
      let bottomCanvas = document.getElementById('bottomCanvas')
      let topCanvas = document.getElementById('topCanvas')
      bottomCtx = bottomCanvas.getContext('2d')
      topCtx = topCanvas.getContext('2d')

      // 清除画布
      bottomCtx.clearRect(0, 0, bottomCanvas.width, bottomCanvas.height)
      topCtx.clearRect(0, 0, topCanvas.width, topCanvas.height)

      // 加载底层图片
      var bottomImage = new Image()
      bottomImage.src = require('@/assets/beiying1.png')
      bottomImage.onload = function () {
        bottomCtx.drawImage(
          bottomImage,
          0,
          0,
          bottomCanvas.width,
          bottomCanvas.height
        )
      }

      // 重新加载并绘制上层图片
      var topImage = new Image()
      topImage.src = require('@/assets/top.png') // 确保这里的路径正确匹配你的图片路径和命名
      topImage.onload = function () {
        topCtx.globalCompositeOperation = 'source-over' // 重置合成操作为默认值
        topCtx.drawImage(topImage, 0, 0, topCanvas.width, topCanvas.height)
      }
    },
    mousedown() {
      this.isDown = true
      // 切换到“擦除”模式
      topCtx.globalCompositeOperation = 'destination-out'
    },
    mousemove(event) {
      if (!this.isDown) return
      var x = event.offsetX
      var y = event.offsetY
      // 绘制擦除效果
      topCtx.beginPath()
      topCtx.arc(x, y, 20, 0, Math.PI * 2, false) // 使用圆形笔触
      topCtx.fill()
      topCtx.closePath()
    }
  }
}
</script>

<style lang="scss" scoped>
#container {
  position: relative;
  width: 356px;
  height: 358px;
  canvas {
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>
