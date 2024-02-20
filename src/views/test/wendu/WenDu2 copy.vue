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
          src="@/assets/img/circle.png"
          alt=""
          @click="stateChange('circle')"
        />
      </div>
      <div>
        <img
          src="@/assets/img/面.png"
          alt=""
          @click="stateChange('rectangle')"
        />
      </div>
      <div>
        <img src="@/assets/img/morebian.png" alt="" @click="'polygon'" />
      </div>
      <div>
        <img src="@/assets/img/旋转.png" alt="" @click="routeCanvas" />
      </div>
      <div>
        <img src="@/assets/img/删除2.png" alt="" @click="clearCanvas" />
      </div>

      <div>
        <img src="@/assets/img/down.png" alt="" @click="downCanvas" />
      </div>
      <div style="color: #fff; curson: point" @click="selectClear">
        选中清除
      </div>
    </div>
    <div class="canvas-div">
      <!--画布-->
      <canvas id="myCanvasColor" height="300" width="12"> </canvas>
      <canvas
        id="myCanvas"
        :height="canvasSize.height"
        :width="canvasSize.width"
        :style="{
          cursor: isDrag ? 'grab' : 'default',
          top: canvasPosition.y + 'px',
          left: canvasPosition.x + 'px',
          '-webkit-filter': 'grayscale(' + shading + '%)'
        }"
        @mousedown="handleMousedown"
        @mousemove="handleMouseMove"
        @mouseup="handleMouseEnd"
        @mousewheel="handleMouseWheel"
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
    <!-- <div class="preveDiv"></div> -->
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
      shading: 0,
      isDrag: false,
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
      lineTemData: [],
      echartsData: [],
      echartShow: false
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
        this.currentBgImg = img //存下加载完成后的背景图
        await this.initCanvas(img) //图片加载完后初始化画布
        // await this.getDefectTips('11')
      })
      this.currentModel = {} //默认绘图模式
    },
    // 初始化画布
    async initCanvas(img) {
      let width = 0
      let height = 0
      // 按0.2比例缩放图片
      width = img.width
      height = img.height
      await (this.canvasSize = { height: height, width: width }) //通过图片尺寸设置画布尺寸
      this.imgSize = { height: height, width: width } //记录下图片原始尺寸
      ctx = document.getElementById('myCanvas').getContext('2d') //获取上下文
      await ctx.drawImage(img, 0, 0, width, height) //在canvas中绘制图片(图片、起始位置、绘图尺寸)
      let canvasDiv = document.getElementsByClassName('canvas-div')[0] // 画布外层元素
      //取父元素的宽度的一半，然后减去子元素宽度的一半。这通常用于居中一个子元素在父元素内部。
      this.canvasPosition = {
        x: canvasDiv.offsetWidth / 2 - width / 2,
        y: canvasDiv.offsetHeight / 2 - height / 2
      } //背景居中
    },
    downCanvas() {
      // 将canvas转换成base64的url
      let url = document.getElementById('myCanvas').toDataURL('image/png')
      // 把Canvas 转化为图片
      this.currentBgImg.src = url
      // 将base64转换为文件对象
      let arr = url.split(',')
      let mime = arr[0].match(/:(.*?);/)[1] // 此处得到的为文件类型
      let bstr = atob(arr[1]) // 此处将base64解码
      let n = bstr.length
      let u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      // 通过以下方式将以上变量生成文件对象，三个参数分别为文件内容、文件名、文件类型
      let file = new File([u8arr], 'filename', { type: mime })
      // 将文件对象通过a标签下载
      let aDom = document.createElement('a') // 创建一个 a 标签
      aDom.download = file.name // 设置文件名
      let href = URL.createObjectURL(file) // 将file对象转成 UTF-16 字符串
      aDom.href = href // 放入href
      document.body.appendChild(aDom) // 将a标签插入 body
      aDom.click() // 触发 a 标签的点击
      if (this.imgDom) {
        document.querySelector('.preveDiv img').src = href
      } else {
        this.imgDom = document.createElement('img') //创建img
        this.imgDom.src = href
        document.querySelector('.preveDiv').appendChild(this.imgDom)
      }

      this.imgDom.onload = () => {
        document.body.removeChild(aDom) // 移除刚才插入的 a 标签
        URL.revokeObjectURL(href) // 释放刚才生成的 UTF-16 字符串
      }
    },
    selectClear() {
      this.currentModel = {}
    },
    stateChange(type) {
      this.currentModel.model = type
    },
    // 获取图片上缺陷的坐标
    async getDefectTips() {
      this.tableData = [
        {
          x: 0,
          y: 0,
          x1: 0,
          y1: 0,
          markId: '11',
          firstLevel: '',
          secondary: '',
          describe: '描述',
          defectType: '0',
          virtualBox: true,
          data: '{"imgData":"20.90,30.90,200.90,80.1"}'
        }
      ]
      // 整理数据，画框
      let obj = {
        x: 0,
        y: 0,
        x1: 0,
        y1: 0,
        markId: '11',
        firstLevel: '',
        secondary: '',
        describe: '',
        defectType: '0',
        virtualBox: false
      }
      if (this.tableData.length) {
        for (let i = 0; i < this.tableData.length; i++) {
          let strObj = JSON.parse(this.tableData[i].data)
          let arr = strObj.imgData.split(',')
          let item1 = (Math.ceil(arr[0]) * 2) / 10
          let item2 = (Math.ceil(arr[1]) * 2) / 10
          let item3 = (Math.ceil(arr[2]) * 2) / 10
          let item4 = (Math.ceil(arr[3]) * 2) / 10
          obj = {
            x: item1 - item3 < 0 ? item1 : item3, //取小值
            y: item2 - item4 < 0 ? item2 : item4, //取小值
            x1: item3 - item1 > 0 ? item3 : item1, //取大值
            y1: item4 - item2 > 0 ? item4 : item2, //取大值
            markId: this.tableData[i].markId,
            firstLevel: this.tableData[i].firstLevel,
            secondary: this.tableData[i].secondary,
            describe: this.tableData[i].describe,
            defectType: this.tableData[i].defectType,
            virtualBox: this.tableData[i].virtualBox
          }
          this.drawRectangle(obj)
          // 判断markIdSel是否为空，如果有值且有相等的，则回显
        }
      }
    },
    //生成矩形数据
    drawRectangle(obj) {
      this.currentDrawData = {
        type: 'rectangle',
        color: 'red',
        data: [
          [obj.x, obj.y],
          [obj.x1, obj.y1]
        ],
        markId: obj.markId,
        firstLevel: obj.firstLevel,
        secondary: obj.secondary,
        describe: obj.describe,
        defectType: obj.defectType,
        virtualBox: obj.virtualBox
      }
      this.canvasData.push(this.currentDrawData)
      // 矩形绘制
      this.drawToArr()
    },
    clearCanvas() {
      ctx.clearRect(0, 0, this.canvasSize.width, this.canvasSize.height) //清除画布图形
      ctx.drawImage(
        this.currentBgImg,
        0,
        0,
        this.canvasSize.width,
        this.canvasSize.height
      ) //重绘背景
      this.canvasData = []
      this.currentDrawData = {}
      this.currentModel = {}
    },
    routeCanvas() {
      var width = 200
      var height = 200
      var x = (this.canvasSize.width - width) * 0.5 //形状放置在画布中心
      var y = (this.canvasSize.height - height) * 0.5 //形状放置在画布中心
      var cx = x + 0.5 * width // cx 形状中心
      var cy = y + 0.5 * height // cy 形状中心

      // //--清空之前的绘制
      // ctx.clearRect(0, 0, this.canvasSize.width, this.canvasSize.height)

      ctx.fillStyle = '#ff0000'
      ctx.fillRect(x, y, width, height) //没旋转之前的形状

      ctx.translate(cx, cy) //坐标圆点设置到形状中心
      ctx.rotate((Math.PI / 180) * 90) //旋转 45 度
      ctx.translate(-cx, -cy) //坐标圆点重置到 0,0

      ctx.drawImage(
        this.currentBgImg,
        0,
        0,
        this.canvasSize.width,
        this.canvasSize.height
      ) //重绘背景
    },
    //画矩形
    drawRectangleNew(e) {
      ctx.beginPath()
      ctx.strokeStyle = 'red'
      ctx.lineWidth = 2
      //绘制矩形边框
      ctx.strokeRect(
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
        // console.log(e)
        if (e.type == 'point') {
          ctx.beginPath()
          ctx.arc(
            e.data[0][0] * this.imgZoom,
            e.data[0][1] * this.imgZoom,
            10 * this.imgZoom,
            0 * this.imgZoom,
            2 * Math.PI
          )
          // ctx.fillStyle = e.color;
          ctx.strokeStyle = e.color
          // ctx.fill();
          ctx.stroke()
          // 直线
          // ctx.beginPath() //新建路径
          // ctx.moveTo(e.data[1][0] * this.imgZoom, e.data[1][1] * this.imgZoom) //直线起点 x
          // ctx.lineTo(e.data[2][0] * this.imgZoom, e.data[2][1] * this.imgZoom) //绘直线至(x,y)坐标
          // ctx.strokeStyle = e.color
          // ctx.stroke() //绘制线条
          // // 竖线
          // ctx.beginPath() //新建路径
          // ctx.moveTo(e.data[3][0] * this.imgZoom, e.data[3][1] * this.imgZoom) //直线起点 x
          // ctx.lineTo(e.data[4][0] * this.imgZoom, e.data[4][1] * this.imgZoom) //绘直线至(x,y)坐标
          // ctx.strokeStyle = e.color
          // ctx.stroke() //绘制线条
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
        //绘制多边形
        if (e.type == 'polygon') {
          ctx.beginPath()
          ctx.strokeStyle = e.color
          ctx.moveTo(e.data[0][0] * this.imgZoom, e.data[0][1] * this.imgZoom) //起始点
          //遍历多边形点列表连续绘制
          e.data.forEach((p) => {
            ctx.lineTo(p[0] * this.imgZoom, p[1] * this.imgZoom)
          })
          ctx.stroke()
        }
        //绘制圆形
        if (e.type == 'circle') {
          ctx.beginPath()
          ctx.arc(
            e.data[0][0] * this.imgZoom,
            e.data[0][1] * this.imgZoom,
            e.r * this.imgZoom,
            0,
            2 * Math.PI
          )
          ctx.strokeStyle = e.color
          ctx.stroke() //绘制线条
        }
      })
      //判断多边形临时列表是否有数据
      if (this.polygonTempList?.data && this.polygonTempList.data.length > 1) {
        ctx.beginPath()
        ctx.strokeStyle = this.polygonTempList.color
        ctx.moveTo(
          this.polygonTempList.data[0][0] * this.imgZoom,
          this.polygonTempList.data[0][1] * this.imgZoom
        ) //起始点
        //遍历多边形点列表连续绘制
        this.polygonTempList.data.forEach((p) => {
          ctx.lineTo(p[0] * this.imgZoom, p[1] * this.imgZoom)
        })
        //通过状态判断多边形是否闭合
        if (this.polygonTempList.isClose) {
          ctx.closePath() //闭合
        }
        ctx.stroke()
      }
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

    // 虚线矩形框
    drawDashRect(left, top, width, height, step = 5) {
      //x,y,width,height
      this.drawDashLine([left, top], [left + width, top], step) //上边框
      ctx.stroke() //通过线条来绘制图形轮廓
      this.drawDashLine([left + width, top], [left + width, top + height], step) //右边框
      ctx.stroke()
      this.drawDashLine(
        [left + width, top + height],
        [left, top + height],
        step
      ) //下边框
      ctx.stroke()
      this.drawDashLine([left, top + height], [left, top], step) //左边框
      ctx.stroke()
    },
    drawDashLine([x1, y1], [x2, y2], step = 5) {
      const x = x2 - x1,
        y = y2 - y1,
        count = Math.floor(Math.sqrt(x * x + y * y) / step), //平方根
        xv = x / count,
        yv = y / count
      ctx.beginPath() //新路径
      for (let i = 0; i < count; i++) {
        if (i % 2 === 0) {
          //偶数
          ctx.moveTo(x1, y1) //绘制直线 设置初始位置，参数为初始位置x和y的坐标点
        } else {
          //奇数
          ctx.lineTo(x1, y1) //绘制一条从初始位置到指定位置的直线，参数为指定位置x和y的坐标点
        }
        x1 += xv
        y1 += yv
      }
      ctx.lineTo(x2, y2)
    },
    //鼠标按下事件 判断是绘制开始选中
    handleMousedown(e) {
      // e.button  0->左  1->中滚轮     2-> 右
      // e.ctrlKey -> Ctrl 键是否被按下并保持住
      if (e.button == 0 && e.ctrlKey == true) {
        this.isDrag = true //左键按下并且按下ctrl键 ，打开拖拽
        let el = document.getElementById('myCanvas')
        this.dragStart = {
          x: el.offsetLeft - e.screenX,
          y: el.offsetTop - e.screenY
        } //记录下开始拖拽的偏移量
        return
      } else if (
        e.button == 0 &&
        JSON.stringify(this.currentModel) === '{}' &&
        e.ctrlKey == false
      ) {
        console.log(this.canvasData)
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
      if (e.button !== 2) {
        return // 左键绘图 右键才能绘图
      }
      e.preventDefault()
      //右键绘图
      this.isMouseDown = true // 打开鼠标状态
      //获取画布中鼠标开始点击位置
      this.canvasMouseStart = {
        x: e.offsetX,
        y: e.offsetY
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
      if (this.isDrag) {
        this.mouseDrag(e) //处理拖拽
        return
      }
      this.isMsg = true
      //获取屏幕中鼠标位置(显示实时坐标)
      this.mousePosition = {
        x: e.pageX,
        y: e.pageY
      }
      //获取画布中鼠标位置
      this.canvasMousePosition = {
        x: e.offsetX,
        y: e.offsetY
      }
      //判断是否超出边界
      if (e.offsetX < 0 || e.offsetY < 0 || e.offsetX == 0 || e.offsetY == 0) {
        this.isMsg = false
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
      //绘制圆形
      if (this.currentModel.model == 'circle') {
        this.drawCircle(e)
      }
    },
    //鼠标拖拽
    mouseDrag(e) {
      this.canvasPosition.x = e.screenX + this.dragStart.x //计算出画布位置
      this.canvasPosition.y = e.screenY + this.dragStart.y
    },
    handleContextMenu(event) {
      event.preventDefault() // 阻止默认右键菜单显示
    },
    // 红外 -- 画基准点
    drawPoint(e) {
      let offsetX = e.offsetX * this.imgZoom
      let offsetY = e.offsetY * this.imgZoom

      // 四个扇形
      // let num = 4
      // // 一份的弧度
      // let angle = (Math.PI * 2) / num
      // /*上一次绘制的结束弧度等于当前次的起始弧度*/
      // //var startAngle = 0;
      // for (let i = 0; i < num; i++) {
      //   let startAngle = i * angle
      //   let endAngle = (i + 1) * angle
      //   ctx.beginPath()
      //   if (i == 0) {
      //     ctx.moveTo(offsetX + 3, offsetY + 3)
      //     ctx.arc(offsetX + 3, offsetY + 3, 10, startAngle, endAngle)
      //     /*随机颜色*/
      //     ctx.strokeStyle = 'black'
      //     ctx.lineWidth = 2 // 边框宽度
      //     ctx.stroke()
      //   } else if (i == 1) {
      //     ctx.moveTo(offsetX - 3, offsetY + 3)
      //     ctx.arc(offsetX - 3, offsetY + 3, 10, startAngle, endAngle)
      //     /*随机颜色*/
      //     ctx.strokeStyle = 'black'
      //     ctx.lineWidth = 2 // 边框宽度
      //     ctx.stroke()
      //   } else if (i == 2) {
      //     ctx.moveTo(offsetX - 3, offsetY - 3)
      //     ctx.arc(offsetX - 3, offsetY - 3, 10, startAngle, endAngle)
      //     /*随机颜色*/
      //     ctx.strokeStyle = 'black'
      //     ctx.lineWidth = 2 // 边框宽度
      //     ctx.stroke()
      //   } else {
      //     ctx.moveTo(offsetX + 3, offsetY - 3)
      //     ctx.arc(offsetX + 3, offsetY - 3, 10, startAngle, endAngle)
      //     /*随机颜色*/
      //     ctx.strokeStyle = 'black'
      //     ctx.lineWidth = 2 // 边框宽度
      //     ctx.stroke()
      //   }
      // }
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
    drawCircle(e) {
      // 绘制一个圆弧
      ctx.beginPath() // 开启路径
      ctx.strokeStyle = 'rgb(0, 0, 0)'
      //  ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
      // x,y圆弧的圆心坐标,圆弧的半径,圆弧的起始弧度与x轴正方向的夹角,圆弧的终止弧度与x轴正方向的夹角,是否逆时针
      ctx.arc(
        e.offsetX,
        e.offsetY,
        Math.abs(e.offsetX - this.canvasMouseStart.x),
        0,
        Math.PI * 2,
        false
      )
      ctx.stroke()

      ctx.closePath() // 闭合路径
    },
    //鼠标松开 – 还原真实坐标，添加数据到总数居，多边形绘制
    //鼠标松开事件
    handleMouseEnd(e) {
      console.log(e, this.currentModel.model, '鼠标松开了')
      if (e.button == 0) {
        this.isDrag && (this.isDrag = false) //左键松开关闭拖拽
      }
      if (e.button !== 2) {
        return // 右键松开
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
        this.lineTemData = arr
        this.echartsOpen()
        this.lineTemData = []
        this.canvasData.push(this.currentDrawData) //添加当前绘图数据
      }
      //线模式、直线模式、圆形
      if (
        this.currentModel.model == 'line' ||
        this.currentModel.model == 'beeline' ||
        this.currentModel.model == 'circle'
      ) {
        // 坐标点去重
        let set = new Set(this.linePointData.map(JSON.stringify))
        this.linePointData = Array.from(set).map(JSON.parse)
        for (let i = 0; i < this.linePointData.length; i++) {
          this.lineTemData.push(
            this.newArr[this.linePointData[i][0]][this.linePointData[i][1]]
          )
        }
        this.echartsOpen()
        this.linePointData = []
        this.lineTemData = []
        this.currentDrawData.data &&
          this.currentDrawData.data.forEach((e) => {
            e[0] = e[0] / this.imgZoom //还原真实坐标
            e[1] = e[1] / this.imgZoom
          })
        this.currentModel.model == 'circle' &&
          (this.currentDrawData.r = this.currentDrawData.r / this.imgZoom) //圆形模式需要处理半径
        this.canvasData.push(this.currentDrawData) //添加当前绘图数据
      }
      //多边形模式的松开
      if (this.currentModel.model == 'polygon') {
        this.constructPolygonData(e) //构造多边形数据
        this.drawToArr() //多边形模式中每次鼠标松开后都需要重绘列表数据
        //更新多边形画线时起点位置
        this.canvasMouseStart = {
          x: e.offsetX / this.imgZoom, //还原真实坐标
          y: e.offsetY / this.imgZoom
        }
      }
      console.log(this.canvasData, '图形总数据')
      this.isMouseDown = false //关闭鼠标状态
      this.canvasMousePosition = {
        x: e.offsetX, //更新位置
        y: e.offsetY
      }
    },
    echartsOpen() {
      let max = Math.max.apply(Math, this.lineTemData)
      let min = Math.min.apply(Math, this.lineTemData)
      let difVal = Math.ceil(max - min)
      if (difVal > 20) {
        let arr = []
        for (let i = min; i < max + 1; i += 5) {
          let top = (i + 5).toFixed(1)
          let bottom = i > min ? (i + 0.1).toFixed(1) : i.toFixed(1)
          let yVal = this.comparisonValue(this.lineTemData, top, bottom)
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
          let yVal = this.comparisonValue(this.lineTemData, top, bottom)
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
          { value: this.lineTemData.length, name: `${min}-${max}℃` }
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
    },

    //放大缩小
    //鼠标滚动事件(wheelDelta值上滚为正->放大，下滚为负->缩小)
    async handleMouseWheel(e) {
      console.log('滚轮事件', e)
      let el = document.getElementById('myCanvas')
      let oldX = el.offsetLeft //旧位置
      let oldY = el.offsetTop
      await this.changeCanvas(e, oldX, oldY) //改变画布
      this.drawToArr() // 重绘列表数据
    },
    //滚动时改变画布
    changeCanvas(e, oldX, oldY) {
      let zoomSpeed = 0.2 //缩放速度
      e.wheelDelta > 0 && (zoomSpeed = 2 - zoomSpeed) // 判断放大与缩小
      let posX = e.offsetX //获取鼠标定点的位置（鼠标在图片上的位置）
      let posY = e.offsetY

      let oldImgZoom = this.imgZoom //记录下旧的图片缩放倍数
      this.imgZoom = this.imgZoom * zoomSpeed //更新缩放倍数
      let minZoom = 0.3 //最小缩放倍数
      let maxZoom = 3 //最大缩放倍数
      this.imgZoom > maxZoom && (this.imgZoom = maxZoom) //限制缩放倍数
      this.imgZoom < minZoom && (this.imgZoom = minZoom)

      this.imgZoom = Number(this.imgZoom.toFixed(2))

      zoomSpeed = this.imgZoom / oldImgZoom //更新缩放速度
      console.log(zoomSpeed, '滚动速度')
      //Math.round函数返回一个数字四舍五入后最接近的整数。
      let height = Math.round(this.imgSize.height * this.imgZoom) //计算画布新宽高(原始宽高乘缩放倍数)
      let width = Math.round(this.imgSize.width * this.imgZoom)

      let newX = oldX + Math.round(posX * (1 - zoomSpeed)) //计算画布新位置(旧位置加偏移量)
      let newY = oldY + Math.round(posY * (1 - zoomSpeed))
      console.log(newX, newY, '新位置')
      this.canvasSize = { height: height, width: width } //更新画布尺寸
      this.canvasPosition = { x: newX, y: newY } //更新画布位置
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
