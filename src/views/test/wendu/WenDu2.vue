<template>
  <div class="mainBox">
    <div class="imageUtil">
      <div>
        <img src="@/assets/img/点.png" alt="" @click="stateChange('point')" />
      </div>
      <div>
        <img src="@/assets/img/线.png" alt="" @click="stateChange('beeline')" />
      </div>
      <div>
        <img
          src="@/assets/img/面.png"
          alt=""
          @click="stateChange('rectangle')"
        />
      </div>
      <div>
        <img src="@/assets/img/旋转.png" alt="" @click="clearCanvas('reset')" />
      </div>
      <div>
        <img src="@/assets/img/删除2.png" alt="" @click="clearCanvas" />
      </div>
      <div style="color: #fff; curson: point" @click="stateChange('clear')">
        选中清除
      </div>
    </div>
    <div class="canvas-div">
      <canvas
        id="myCanvas"
        :height="canvasSize.height"
        :width="canvasSize.width"
        :style="{
          top: canvasPosition.y + 'px',
          left: canvasPosition.x + 'px',
          '-webkit-filter': 'grayscale(' + shading + '%)'
        }"
        @mousedown="handleMousedown"
        @mousemove="handleMouseMove"
        @mouseup="handleMouseEnd"
        @contextmenu="handleContextMenu"
      ></canvas>
    </div>

    <el-slider
      v-model="tempValue"
      vertical
      range
      show-stops
      :max="55"
      :min="0"
      height="300"
      :format-tooltip="tooltipFunciton"
      @change="sliderChange"
    >
    </el-slider>
    <div class="temTxt">
      <div>{{ tempValue[1] }}℃</div>
      <div>{{ tempValue[0] }}℃</div>
    </div>
    <PieEcharts v-if="echartShow" :echartsData="echartsData" />
  </div>
</template>

<script>
import PieEcharts from './components/PieEcharts.vue'
import { arrList, newArr } from './cesiData'
let ctx = ''
import { ColorConventer } from './wendu'
export default {
  name: 'JjjjWenDu2',
  components: {
    PieEcharts
  },
  data() {
    return {
      arrList,
      newArr,
      tempValue: [4, 42],
      firstValue: [4, 42], //初始化温度
      shading: 0,
      imgSize: { height: '', width: '' }, //图片原始尺寸
      imgZoom: 1, //图片缩放倍数(默认一倍)
      canvasSize: { height: '', width: '' }, //画布尺寸
      canvasPosition: { x: '', y: '' }, //画布位置
      canvasMouseStart: { x: '', y: '' }, //画布中鼠标开始点击位置
      isMouseDown: false, //鼠标按下状态
      dragStart: { x: '', y: '' }, //开始拖拽的位置
      currentDrawData: {}, // 当前绘图数据
      currentBgImg: '', // 当前加载的背景图
      currentModel: {}, // 画图类型
      canvasData: [],
      tableData: [],
      imgDom: '',
      linePointData: [],
      rectanglePointData: [],
      temData: [],
      echartsData: [],
      echartShow: false,
      firsetImage: '' //初始化图片
    }
  },
  mounted() {
    this.getPhoto()
  },

  methods: {
    tooltipFunciton(v) {
      return v + '℃'
    },
    sliderChange() {
      let cover2 = new ColorConventer()
      let colorArray = cover2.conventColor(
        this.tempValue[1],
        this.tempValue[0],
        this.arrList,
        640
      )
      const pointData = this.pointArrayFn(this.arrList, 480)
      for (let i = 0; i < colorArray.length; i++) {
        try {
          if (colorArray[i]) {
            ctx.fillStyle = colorArray[i].toRgb()
          }
        } catch (e) {
          console.log(e)
        }
        ctx.fillRect(pointData[i][0], pointData[i][1], 1, 1)
      }
      let imageData = document.getElementById('myCanvas').toDataURL('image/jpg')

      this.loadBgImg(imageData).then((img) => {
        this.currentBgImg = img
      })
      this.canvasData = []
    },
    // 获取点位
    pointArrayFn(arr, width) {
      let result = []
      for (let i = 0; i < arr.length; i++) {
        let x = (i % width) + 1
        let y = Math.floor(i / width) + 1
        result[i] = [x, y]
      }
      return result
    },
    // 必须异步加载图片
    loadBgImg(markImg) {
      let img = new Image() //创建img标签
      img.src = markImg // 后台返回完成地址
      //   img.src = this.baseUrl + markImg // 需要手动添加服务器地址
      //   img.src = require('@/assets/img/cesi.jpg')
      return new Promise((resolve, reject) => {
        img.onload = () => {
          resolve(img) //返回标签
        }
        img.onerror = (err) => {
          reject(err)
        }
      })
    },
    // 获取所有的图片以及当前图片
    getPhoto() {
      this.imgZoom = 1
      //加载背景图片
      this.loadBgImg(require('@/assets/img/FLIR1057.jpg')).then(async (img) => {
        this.firsetImage = img
        this.currentBgImg = img //存下加载完成后的背景图
        await this.initCanvas(img) //图片加载完后初始化画布
      })
      this.currentModel = {} //默认绘图模式
    },
    // 初始化画布
    async initCanvas(img) {
      // 如果缩放要*缩放比例
      let width = img.width
      let height = img.height
      await (this.canvasSize = { height, width }) //通过图片尺寸设置画布尺寸
      this.imgSize = { height: height, width: width } //记录下图片原始尺寸
      ctx = document.getElementById('myCanvas').getContext('2d') //获取上下文
      await ctx.drawImage(img, 0, 0, width, height) //在canvas中绘制图片(图片、起始位置、绘图尺寸)
    },
    // 选中左侧按钮
    stateChange(type) {
      if (type === 'clear') {
        this.currentModel = {}
      } else {
        this.currentModel.model = type
      }
    },
    clearCanvas(flag) {
      ctx.clearRect(0, 0, this.canvasSize.width, this.canvasSize.height) //清除画布图形
      let img = flag === 'reset' ? this.firsetImage : this.currentBgImg
      this.tempValue =
        flag === 'reset'
          ? JSON.parse(JSON.stringify(this.firstValue))
          : this.tempValue
      ctx.drawImage(img, 0, 0, this.canvasSize.width, this.canvasSize.height) //重绘背景
      this.canvasData = []
      this.currentDrawData = {}
      this.currentModel = {}
      this.echartShow = false
    },
    //画矩形
    drawRectangleNew(e) {
      ctx.beginPath()
      ctx.strokeStyle = 'green'
      ctx.lineWidth = 2
      //绘制矩形边框
      ctx.strokeRect(
        //x,y,width,height
        this.canvasMouseStart.x,
        this.canvasMouseStart.y,
        e.offsetX - this.canvasMouseStart.x,
        e.offsetY - this.canvasMouseStart.y
      )
      //生成矩形数据
      this.currentDrawData = {
        type: 'rectangle',
        color: 'green',
        data: [
          [this.canvasMouseStart.x, this.canvasMouseStart.y],
          [e.offsetX, e.offsetY]
        ]
      }
    },
    //通过保存的大列表绘制图形
    async drawToArr() {
      ctx.clearRect(0, 0, this.canvasSize.width, this.canvasSize.height) //清除画布图形
      ctx.drawImage(
        this.currentBgImg,
        0,
        0,
        this.canvasSize.width,
        this.canvasSize.height
      ) //重绘背景
      //遍历大列表开始绘制
      await this.canvasData.forEach((e) => {
        //绘制点
        if (e.type == 'point') {
          ctx.beginPath()
          //直线
          ctx.beginPath() //新建路径
          ctx.moveTo(e.data[0][0] - 20, e.data[0][1]) //直线起点 x
          ctx.lineTo(e.data[0][0] + 20, e.data[0][1]) //绘直线至(x,y)坐标
          ctx.strokeStyle = e.color
          ctx.stroke() //绘制线条
          // 竖线
          ctx.beginPath() //新建路径
          ctx.moveTo(e.data[0][0], e.data[0][1] - 20) //直线起点 x
          ctx.lineTo(e.data[0][0], e.data[0][1] + 20) //绘直线至(x,y)坐标
          ctx.strokeStyle = e.color
          ctx.stroke() //绘制线条
          ctx.font = '14px serif'
          ctx.fillStyle = '#fff'
          let temStr = this.newArr[e.data[0][0]][e.data[0][1]] //填充文字
          ctx.fillText(temStr, e.data[0][0] + 4, e.data[0][1] + 12, 30)
        }
        //绘制直线
        if (e.type == 'beeline') {
          ctx.beginPath()
          ctx.moveTo(e.data[0][0] * this.imgZoom, e.data[0][1] * this.imgZoom)
          ctx.lineTo(e.data[1][0] * this.imgZoom, e.data[1][1] * this.imgZoom)
          ctx.strokeStyle = e.color
          ctx.stroke()
        }
        //绘制矩形
        if (e.type == 'rectangle') {
          ctx.beginPath()
          ctx.strokeStyle = e.color
          ctx.strokeRect(
            e.data[0][0] * this.imgZoom,
            e.data[0][1] * this.imgZoom,
            e.data[1][0] * this.imgZoom - e.data[0][0] * this.imgZoom,
            e.data[1][1] * this.imgZoom - e.data[0][1] * this.imgZoom
          ) //绘制矩形边框
        }
      })
    },
    //生成多边形数据
    constructPolygonData(e) {
      if (this.polygonTempList.data) {
        let oldPointX =
          this.polygonTempList.data[this.polygonTempList.data.length - 1][0]
        let oldPointY =
          this.polygonTempList.data[this.polygonTempList.data.length - 1][1]
        let newPointX = e.offsetX / this.imgZoom //计算出真实坐标
        let newPointY = e.offsetY / this.imgZoom
        //多边形需防止坐标重复
        if (oldPointX !== newPointX || oldPointY !== newPointY) {
          //非第一次松开直接push多边形点列表
          this.polygonTempList.data.push([newPointX, newPointY])
        }
      } else {
        //第一次松开则构造完整数据
        this.polygonTempList = {
          type: 'polygon',
          color: this.currentColor.color,
          data: [[e.offsetX / this.imgZoom, e.offsetY / this.imgZoom]]
        }
      }
    },
    //鼠标按下事件 判断是绘制开始选中
    handleMousedown(e) {
      // e.button  0->左  1->中滚轮     2-> 右
      // e.ctrlKey -> Ctrl 键是否被按下并保持住
      if (
        e.button == 0 &&
        JSON.stringify(this.currentModel) === '{}' &&
        e.ctrlKey == false
      ) {
        // 点击区域范围 是否有标注 待优化
        for (let index = 0; index < this.canvasData.length; index++) {
          if (this.canvasData[index].type == 'point') {
            // 点
            let dis = Math.sqrt(
              (e.offsetX - this.canvasData[index].data[0][0] * this.imgZoom) *
                (e.offsetX - this.canvasData[index].data[0][0] * this.imgZoom) +
                (e.offsetY - this.canvasData[index].data[0][1] * this.imgZoom) *
                  (e.offsetY - this.canvasData[index].data[0][1] * this.imgZoom)
            )
            if (dis <= 10 * this.imgZoom) {
              this.selectPoint(this.canvasData[index], index)
              return
            }
          } else if (this.canvasData[index].type == 'rectangle') {
            let { startX, endX, startY, endY } = this.isWidthRectangle(
              this.canvasData[index].data
            )
            if (
              e.offsetX >= startX && //大于x1
              e.offsetX <= endX &&
              e.offsetY >= startY && //大于y1
              e.offsetY <= endY
            ) {
              this.selectPoint(this.canvasData[index], index)
              return
            }
          } else if (this.canvasData[index].type == 'beeline') {
            // 直线
            // 判断点击点是否在直线容差范围内
            const isWithinToleranceRange = this.isWithinTolerance(
              this.canvasData[index].data[0][0] * this.imgZoom,
              this.canvasData[index].data[0][1] * this.imgZoom,
              this.canvasData[index].data[1][0] * this.imgZoom,
              this.canvasData[index].data[1][1] * this.imgZoom,
              e.offsetX,
              e.offsetY,
              2 // 容差值
            )
            if (isWithinToleranceRange) {
              // 点击点在直线容差范围内
              this.selectPoint(this.canvasData[index], index)
              return
            }
          }
        }
      }
      if (e.button == 0 && JSON.stringify(this.currentModel) !== '{}') {
        //左键绘图
        e.preventDefault()
        //右键绘图
        this.isMouseDown = true // 打开鼠标状态
        //获取画布中鼠标开始点击位置
        this.canvasMouseStart = {
          x: e.offsetX,
          y: e.offsetY
        }
      }
    },
    // 判断在不在矩形区域内
    isWidthRectangle(data) {
      let x1 = data[0][0]
      let y1 = data[0][1]
      let x2 = data[1][0]
      let y2 = data[1][1]
      let startX = Math.min(x1, x2)
      let endX = Math.max(x1, x2)
      let startY = Math.min(y1, y2)
      let endY = Math.max(y1, y2)
      return { startX, endX, startY, endY }
    },
    // 判断点击点是否在直线容差范围内 -- 5px
    isWithinTolerance(x1, y1, x2, y2, x, y, tolerance) {
      const distance = this.calculateDistanceToLine(x1, y1, x2, y2, x, y)
      return distance <= tolerance
    },
    calculateDistanceToLine(x1, y1, x2, y2, x, y) {
      const A = y2 - y1
      const B = x1 - x2
      const C = x2 * y1 - x1 * y2
      return Math.abs(A * x + B * y + C) / Math.sqrt(A * A + B * B)
    },
    // 选中标注清除
    selectPoint(item, index) {
      if (
        item.type == 'point' ||
        item.type == 'rectangle' ||
        item.type == 'beeline'
      ) {
        this.canvasData.splice(index, 1)
      }
      this.drawToArr()
    },
    //鼠标移动 – 绘制 鼠标移动事件
    async handleMouseMove(e) {
      //判断是否超出边界
      if (e.offsetX < 0 || e.offsetY < 0 || e.offsetX == 0 || e.offsetY == 0) {
        this.isMouseDown = false //关闭鼠标状态
      }
      //判断鼠标状态是否打开
      if (!this.isMouseDown) {
        return
      }
      await this.drawToArr() //重绘列表数据
      //绘制点
      if (this.currentModel.model == 'point') {
        return
      }
      //绘制直线
      if (this.currentModel.model == 'beeline') {
        this.drawBeeline(e)
      }
      //绘制矩形
      if (this.currentModel.model == 'rectangle') {
        this.drawRectangleNew(e)
      }
    },
    handleContextMenu(event) {
      event.preventDefault() // 阻止默认右键菜单显示
    },
    // 红外 -- 画基准点
    drawPoint(e) {
      let offsetX = e.offsetX * this.imgZoom
      let offsetY = e.offsetY * this.imgZoom
      // 直线
      ctx.beginPath() //新建路径
      ctx.moveTo(offsetX - 20, offsetY) //直线起点 x
      ctx.lineTo(offsetX + 20, offsetY) //绘直线至(x,y)坐标
      ctx.strokeStyle = 'green'
      ctx.stroke() //绘制线条
      // 竖线
      ctx.beginPath() //新建路径
      ctx.moveTo(offsetX, offsetY - 20) //直线起点 x
      ctx.lineTo(offsetX, offsetY + 20) //绘直线至(x,y)坐标
      ctx.strokeStyle = 'green'
      ctx.stroke() //绘制线条
      ctx.font = '14px serif'
      ctx.fillStyle = '#fff'

      let temStr = this.newArr[offsetX][offsetY]
      ctx.fillText(temStr, offsetX + 4, offsetY + 12, 30)
      this.currentDrawData = {
        type: 'point',
        color: 'green',
        data: [
          [this.canvasMouseStart.x, this.canvasMouseStart.y],
          [e.offsetX, e.offsetY]
        ]
      }
    },
    // 红外-- 画直线
    drawBeeline(e) {
      ctx.beginPath()
      ctx.strokeStyle = 'green'
      ctx.lineWidth = 2
      this.linePointData.push([e.offsetX, e.offsetY])
      ctx.moveTo(this.canvasMouseStart.x, this.canvasMouseStart.y) //画笔移动至(x,y)坐标
      ctx.lineTo(e.offsetX, e.offsetY) //绘直线至(x,y)坐标
      ctx.stroke()
      //生成直线绘图数据
      this.currentDrawData = {
        type: 'beeline',
        color: 'green',
        data: [
          [this.canvasMouseStart.x, this.canvasMouseStart.y],
          [e.offsetX, e.offsetY]
        ]
      }
    },
    //鼠标松开 – 还原真实坐标，添加数据到总数居，多边形绘制
    //鼠标松开事件
    handleMouseEnd(e) {
      console.log(e, this.currentModel.model, '鼠标松开了')
      if (e.button !== 0) {
        //不是左键松开不继续
        return //
      }
      //点模式的松开
      if (this.currentModel.model == 'point') {
        this.drawPoint(e) //用鼠标松开时的位置画点
        this.currentDrawData.data &&
          this.currentDrawData.data.forEach((e) => {
            e[0] = e[0] / this.imgZoom //将坐标数据还原至真实数据
            e[1] = e[1] / this.imgZoom
            // 添加 直/竖 坐标
          })
        this.canvasData.push(this.currentDrawData) //添加当前绘图数据至大列表
      }
      // 矩形
      if (this.currentModel.model == 'rectangle') {
        this.currentDrawData.data &&
          this.currentDrawData.data.forEach((e) => {
            e[0] = e[0] / this.imgZoom //还原真实坐标
            e[1] = e[1] / this.imgZoom
          })

        let { startX, endX, startY, endY } = this.isWidthRectangle(
          this.currentDrawData.data
        )
        // 获取矩形坐标之内所有数据
        let arr = []
        for (let i = startX; i <= endX; i++) {
          for (let j = startY; j < endY; j++) {
            arr.push(this.newArr[i][j])
          }
        }
        this.temData = arr
        this.echartsOpen()
        this.temData = []
        this.canvasData.push(this.currentDrawData) //添加当前绘图数据
      }
      //直线模式
      if (this.currentModel.model == 'beeline') {
        // 坐标点去重
        let set = new Set(this.linePointData.map(JSON.stringify))
        this.linePointData = Array.from(set).map(JSON.parse)
        for (let i = 0; i < this.linePointData.length; i++) {
          this.temData.push(
            this.newArr[this.linePointData[i][0]][this.linePointData[i][1]]
          )
        }
        this.echartsOpen()
        this.linePointData = []
        this.temData = []
        this.currentDrawData.data &&
          this.currentDrawData.data.forEach((e) => {
            e[0] = e[0] / this.imgZoom //还原真实坐标
            e[1] = e[1] / this.imgZoom
          })
        this.canvasData.push(this.currentDrawData) //添加当前绘图数据
      }
      console.log(this.canvasData, '图形总数据')
      this.isMouseDown = false //关闭鼠标状态
    },
    echartsOpen() {
      let max = Math.max.apply(Math, this.temData)
      let min = Math.min.apply(Math, this.temData)
      let difVal = Math.ceil(max - min)
      if (difVal > 20) {
        let arr = []
        for (let i = min; i < max + 1; i += 5) {
          let top = (i + 5).toFixed(1)
          let bottom = i > min ? (i + 0.1).toFixed(1) : i.toFixed(1)
          let yVal = this.comparisonValue(this.temData, top, bottom)
          if (yVal == 0) {
            continue
          }
          arr.push({
            name: `${bottom}~${top}℃`,
            value: yVal
          })
        }
        this.echartsData = arr
      } else if (difVal > 2 && difVal <= 20) {
        let arr = []
        for (let i = min; i < max + 1; i += 2) {
          let top = (i + 2).toFixed(1)
          let bottom = i > min ? (i + 0.1).toFixed(1) : i.toFixed(1)
          let yVal = this.comparisonValue(this.temData, top, bottom)
          if (yVal == 0) {
            continue
          }
          arr.push({
            name: `${bottom}~${top}℃`,
            value: yVal
          })
        }
        this.echartsData = arr
      } else {
        this.echartsData = [
          { value: this.temData.length, name: `${min}-${max}℃` }
        ]
      }
      this.echartShow = true
    },
    // 大于某一个值的数量
    comparisonValue(arr, top, bottom) {
      let count = 0 // 计数器初始化为0
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] >= bottom && arr[i] <= top) {
          count++
        }
      }
      return count
    }
  }
}
</script>

<style lang="scss" scoped>
.mainBox {
  display: flex;
  .preveDiv {
    width: 500px;
    height: 500px;
    border: 1px solid green;
  }
}
.canvas-div {
  position: relative;
  height: 640px;
  width: 480px;
  border: 1px solid green;
  #myCanvas {
    position: absolute;
  }
}
.imageUtil {
  margin: 0 6px;
  padding: 12px;
  width: 72px;
  background: #123263;
  text-align: center;
  img {
    cursor: pointer;
    width: 60px;
    height: 60px;
    border: 1px solid #fff;
  }
}
#myCanvasColor {
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 8px;
}
.temTxt {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 12px 0;
}
</style>
