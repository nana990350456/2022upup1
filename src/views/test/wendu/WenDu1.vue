<template>
  <div class="board">
    <div class="tool" id="tool">
      <div class="box">
        <input
          id="color"
          type="color"
          style="margin-bottom: 10px"
          value="#000"
        />
        <div id="color-list" style="margin-bottom: 20px">
          <span color="#000000" style="background-color: #000000"></span>
          <span color="#FF0000" style="background-color: #ff0000"></span>
          <span color="#00FF00" style="background-color: #00ff00"></span>
          <span color="#0000FF" style="background-color: #0000ff"></span>
          <span color="#FFFF00" style="background-color: #ffff00"></span>
          <span
            color="#FFFFFF"
            style="background-color: #ffffff; border: 1px solid #eee"
          ></span>
        </div>
      </div>
      <div class="box">
        <svg
          id="rectangleMode"
          t="1688557260302"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2862"
          width="40"
          height="40"
          @click="rectangleMode"
        >
          <path
            d="M854.6176 1024v-114.2272H169.3824V1024H10.3552v-159.0016h114.1504V159.0272H10.3552V0h159.0272v114.688h685.2352V0h159.0272v159.0272H899.1872v705.9712h114.4576V1024zM179.6736 854.5024h664.3456V169.856H182.592z"
            fill="#333333"
            p-id="2863"
          ></path>
        </svg>
        <svg
          id="mouseMode"
          t="1688557289470"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="4712"
          width="40"
          height="40"
        >
          <path
            d="M811.008 768.170667v106.666666a106.666667 106.666667 0 0 1-106.666667 106.666667h-128a21.248 21.248 0 0 1-21.333333-21.333333V938.666667c0-75.52-43.306667-127.872-128.341333-127.872-84.224 0-128.085333 52.821333-128.085334 127.872v21.461333a21.333333 21.333333 0 0 1-21.333333 21.333333h-128a106.666667 106.666667 0 0 1-106.666667-106.709333l0.426667-128a21.333333 21.333333 0 0 1 21.333333-21.248h42.666667c58.752 0 106.410667-55.210667 106.410667-128 0-73.386667-47.36-128-106.410667-128H64.213333a21.333333 21.333333 0 0 1-21.333333-21.333333v-128a106.666667 106.666667 0 0 1 106.666667-106.666667h106.368V213.333333c0-97.066667 61.013333-170.538667 170.752-170.538666 107.008 0 171.392 75.434667 171.392 170.538666v0.128h106.837333a106.666667 106.666667 0 0 1 106.666667 106.666667v106.666667h20.778666c84.053333 0 149.077333 75.008 149.077334 170.666666 0 95.104-65.28 170.666667-149.077334 170.666667h-21.333333z m-42.666667-20.736v-0.597334a21.333333 21.333333 0 0 1 21.333334-21.333333h42.666666c58.752 0 106.410667-55.210667 106.410667-128 0-73.386667-47.36-128-106.410667-128h-42.666666a21.333333 21.333333 0 0 1-20.778667-26.325333V320.128a64 64 0 0 0-64-64h-126.890667a21.76 21.76 0 0 1-1.28 0 21.333333 21.333333 0 0 1-21.333333-21.333333V213.333333c0-72.917333-46.933333-127.872-128.725333-127.872-84.224 0-128.085333 52.821333-128.085334 127.872v21.461334a21.248 21.248 0 0 1-21.333333 21.333333H149.546667a64 64 0 0 0-64 64v106.666667h21.461333c84.053333 0 149.077333 75.008 149.077333 170.666666 0 95.104-65.28 170.666667-149.077333 170.666667h-21.418667l-0.341333 106.666667a64 64 0 0 0 64 64h106.666667V938.666667c0-97.066667 61.013333-170.538667 170.752-170.538667 110.592 0 171.008 73.002667 171.008 170.538667v0.170666h106.666666a64 64 0 0 0 64-64v-127.402666z"
            p-id="4713"
          ></path>
        </svg>

        <svg
          id="pathMode"
          t="1688713705657"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="5968"
          width="40"
          height="40"
        >
          <path
            d="M661.333333 128a128 128 0 0 1 82.773334 225.621333l56.832 117.482667a117.333333 117.333333 0 1 1-57.578667 27.882667l-56.832-117.461334a128.618667 128.618667 0 0 1-43.52 1.173334l-133.546667 266.368a128 128 0 1 1-182.186666 16.938666l-103.445334-137.514666a106.666667 106.666667 0 1 1 52.48-36.48l102.293334 135.978666a128.597333 128.597333 0 0 1 73.578666-6.784l131.861334-263.168A128 128 0 0 1 661.333333 128zM426.666667 688.490667a58.176 58.176 0 1 0 0 116.352 58.176 58.176 0 0 0 0-116.352zM821.333333 533.333333a53.333333 53.333333 0 1 0 0 106.666667 53.333333 53.333333 0 0 0 0-106.666667zM192 378.176a48.490667 48.490667 0 1 0 0 96.981333 48.490667 48.490667 0 0 0 0-96.981333z m469.333333-180.352a58.176 58.176 0 1 0 0 116.352 58.176 58.176 0 0 0 0-116.352z"
            fill="#000000"
            p-id="5969"
          ></path>
        </svg>
      </div>
      <div class="box" style="border: 0">
        <span class="btn" id="crop">存成主图</span>
        <span class="btn" id="crop2">存缩略图</span>
        <span class="btn" id="crop3">保存本地</span>
      </div>
      <canvas id="crop-show" width="200" height="200"></canvas>
      <img id="crop-img" style="none" />
    </div>
    <canvas id="myCanvas"></canvas>
    <div
      id="rectangle-board"
      @mousedown="reacMouseDown"
      draggable="false"
      style="display: none"
    >
      <div id="rectangle">
        <span id="top-left"></span>
        <span id="top-center"></span>
        <span id="top-right"></span>
        <span id="mid-left"></span>
        <span id="mid-right"></span>
        <span id="bottom-left"></span>
        <span id="bottom-center"></span>
        <span id="bottom-right"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'JjjjWenDu1',

  data() {
    return {
      ctx: null,
      scale: 0,
      maxWidth: 0,
      maxHeight: 0,
      pathClosed: false,
      drawPoints: [],
      croppMode: '',
      imgData: null,
      moveHander: null
    }
  },

  mounted() {
    this.initCanvas()
  },

  methods: {
    reacMouseDown() {
      debugger
    },
    rectangleMode() {
      debugger
      this.drawerRect(this.ctx, 200, 200, 200, 200)
      //绘制矩形 new
      // this.croppMode = 'rectangleMode'
      // document.querySelector('#rectangle-board').style.display = 'block'
      // document.querySelector('#rectangleMode').classList.add('active')
      // document.querySelector('#rectangle').style.top =
      //   document.documentElement.scrollTop +
      //   (window.innerHeight / 2 - 100) +
      //   'px'
      // document.querySelector('#rectangle').style.left =
      //   this.maxWidth / 2 - 100 + 'px'
      // document.querySelector('#rectangle').style.borderColor =
      //   document.querySelector('#color').value
      // document.querySelector('#rectangle').style.width = '200px'
      // document.querySelector('#rectangle').style.height = '200px'
      // document.querySelector('#mouseMode').classList.remove('active')
      // document.querySelector('#pathMode').classList.remove('active')
      // this.clearDraw()
    },
    clearDraw() {
      this.ctx.drawImage(
        this.imgData,
        0,
        0,
        this.imgData.width,
        this.imgData.height,
        0,
        0,
        this.imgData.width * this.scale,
        this.imgData.height * this.scale
      ) //绘制图片
    },
    // drawImageFn() {
    //   this.ctx.drawImage(image,0,0,canvas.width,canvas.height)
    // },
    drawerRect(ctx, left, top, w, h) {
      debugger
      ctx.strokeStyle = '#889385' // 画笔颜色
      ctx.lineWidth = '2' // 画笔粗细
      //ctx.save()
      ctx.beginPath()
      ctx.rect(left, top, w, h)
      ctx.stroke()
      ctx.restore()
      return {
        data: [left, top, w, h]
      }
    },
    initCanvas() {
      let canvas = document.getElementById('myCanvas')
      if (!canvas.getContext) {
        console.log('不支持canvas')
      }
      this.ctx = canvas.getContext('2d', { willReadFrequently: true })
      console.log(this.ctx, 'llllkkkjjj')
      //创建图片
      let img = new Image() // 创建一个<img>元素
      img.onload = () => {
        console.log(img.width)
        this.scale = Math.min(img.width, window.innerWidth - 300) / img.width
        canvas.width = img.width * this.scale
        canvas.height = img.height * this.scale
        this.maxWidth = img.width * this.scale
        this.maxHeight = img.height * this.scale
        document.querySelector('#rectangle-board').style.width =
          img.width * this.scale + 2 + 'px'
        document.querySelector('#rectangle-board').style.height =
          img.height * this.scale + 'px'
        console.log(this.ctx, 'llllkkkjjj')
        this.ctx.scale(1, 1)
        this.ctx.drawImage(
          img,
          0,
          0,
          img.width,
          img.height,
          0,
          0,
          img.width * this.scale,
          img.height * this.scale
        ) //绘制图片
      }
      img.src = require('@/assets/img/cesi.jpg') // 设置图片源地址
      this.imgData = img
    }
  }
}
</script>

<style lang="scss" scoped>
#color-list {
  display: flex;
  flex-wrap: wrap;
  padding: 1px;
}

#color-list span {
  cursor: pointer;
  display: block;
  width: 14px;
  height: 14px;
  margin: 4px 1px;
  box-sizing: border-box;
}

.board {
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

.board .tool {
  width: 60px;
  position: fixed;
  top: 100px;
  right: 60px;
}

.tool .box {
  padding: 5px;
  padding-left: 7px;
  width: 50px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
}

.tool .box .btn {
  display: block;
  width: 100%;
  height: 30px;
  line-height: 30px;
  border-radius: 4px;
  background: #1890ff;
  color: #fff;
  font-size: 12px;
  margin: 10px;
  width: 60px;
  text-align: center;
  margin-left: -5px;
  cursor: pointer;
}

.tool .box .btn:hover {
  background: #40a9ff;
}

.board .tool svg {
  margin-top: 10px;
  margin-left: 5px;
  font-weight: bold;
}

#crop-img {
  position: fixed;
  top: 60px;
  left: 10px;
  width: 200px;
  height: auto;
}

#crop-show {
  position: absolute;
  top: -2000px;
  left: -10000px;
}

.board .tool .active path {
  fill: blue;
}

#rectangle-board {
  position: absolute;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  overflow: hidden;
}

#rectangle {
  position: absolute;
  top: 0;
  left: 0;
  border: 1px solid #333;
  width: 200px;
  height: 200px;
  outline: rgba(0, 0, 0, 0.5) 15000000px solid;
}

#rectangle span {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  border: 2px solid transparent;
  border-color: inherit;
  width: 6px;
  height: 6px;
  color: inherit;
  overflow: hidden;
}

#rectangle span::after {
  content: '■';
  width: 22px;
  height: 22px;
  position: absolute;
  top: -25px;
  left: -3px;
  /* background: #333; */
  display: block;
  color: #fff;
  font-size: 40px;
}

#rectangle #top-left {
  left: -6px;
  top: -6px;
  cursor: nwse-resize;
}

#rectangle #top-center {
  left: 50%;
  transform: translateX(-50%);
  top: -6px;
  cursor: n-resize;
}

#rectangle #top-right {
  right: -6px;
  top: -6px;
  cursor: nesw-resize;
}

#rectangle #mid-left {
  left: -6px;
  top: 50%;
  transform: translateY(-50%);
  cursor: e-resize;
}

#rectangle #mid-right {
  right: -6px;
  top: 50%;
  transform: translateY(-50%);
  cursor: e-resize;
}

#rectangle #bottom-left {
  left: -6px;
  bottom: -6px;
  cursor: nesw-resize;
}

#rectangle #bottom-center {
  left: 50%;
  bottom: -6px;
  transform: translateX(-50%);
  cursor: n-resize;
}

#rectangle #bottom-right {
  right: -6px;
  bottom: -6px;
  cursor: nwse-resize;
}
</style>
