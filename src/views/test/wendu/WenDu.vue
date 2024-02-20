<template>
  <div class="main">
    <div class="box800">
      <img
        class="tomImg"
        @click="imgClick"
        src="~@/assets/img/tom.jpeg"
        alt=""
      />
      <canvas
        ref="canvas"
        id="canvas"
        width="400"
        height="400"
        @click.stop="canvasClick"
      >
        你的浏览器不支持canvas
      </canvas>
      <div ref="bgBoxRef">
        <p>色值是{{ colorRgba }}</p>
        <p>{{ lnglat }}</p>
        <p>温度{{ temperature }}</p>
      </div>
    </div>
    <div class="imageUtil">
      <div>
        <img src="@/assets/img/点.png" alt="" />
      </div>
      <div>
        <img src="@/assets/img/线.png" alt="" />
      </div>
      <div>
        <img src="@/assets/img/面.png" alt="" />
      </div>
      <div>
        <img src="@/assets/img/旋转.png" alt="" />
      </div>
      <div>
        <img src="@/assets/img/删除2.png" alt="" />
      </div>
    </div>
    <el-slider
      v-model="sliderValue"
      vertical
      range
      show-stops
      max="55"
      min="0"
      height="300"
      :format-tooltip="tooltipFunciton"
    >
    </el-slider>
    <el-row :gutter="14">
      <el-col :span="2">
        <div
          style="
            font-size: 16px;
            color: #d5fff9;
            vertical-align: center;
            font-family: 'sourcehansans';
            text-align: left;
            line-height: 36px;
          "
        >
          {{ minTemp }}℃
        </div>
      </el-col>
      <el-col :span="8">
        <template>
          <div class="block">
            <el-slider
              height="20"
              v-model="tempValue"
              range
              show-stops
              :max="maxTemp"
              :min="minTemp"
              :format-tooltip="tooltipFunciton"
              @change="sliderChange('image_div1')"
            >
            </el-slider>
          </div>
        </template>
      </el-col>
      <el-col :offset="1" :span="2">
        <div
          style="
            font-size: 16px;
            color: #d5fff9;
            vertical-align: center;
            font-family: 'sourcehansans';
            text-align: left;
            line-height: 36px;
          "
        >
          <template> {{ maxTemp }}℃ </template>
        </div>
      </el-col>
      <el-col :span="2">
        <el-popover
          placement="right"
          width="400"
          v-model="showPopover1"
          trigger="click"
        >
          <el-form ref="imageForm" label-width="115px" style="height: 30px">
            <el-row
              style="margin-top: -12px; margin-left: -12px; margin-right: -12px"
            >
              <div
                style="
                  height: 25px;
                  width: 100%;
                  background: url(../css/images/综合判别头.png);
                  background-size: 100% 100%;
                  color: #d5fff9;
                  vertical-align: center;
                  font-size: 16px;
                "
              >
                <el-col :offset="1" :span="4"> 其他信息 </el-col>
                <el-col :offset="18" :span="1">
                  <i
                    class="el-icon-close"
                    @click="closePopover('showPopover1')"
                  ></i>
                </el-col>
              </div>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item
                  label="检测单位:"
                  style="
                    padding-right: 20px;
                    margin-bottom: 10px;
                    margin-top: 10px;
                  "
                >
                  <el-input v-model="imageForm.jcdw"> </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item
                  label="变电站:"
                  style="padding-right: 20px; margin-bottom: 10px"
                >
                  <el-input v-model="imageForm.bdzmc"> </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item
                  label="设备名称:"
                  style="padding-right: 20px; margin-bottom: 10px"
                >
                  <el-input v-model="imageForm.sbmc"> </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="环境温度(℃):" style="margin-bottom: 10px">
                  <el-input v-model="imageForm.hjwd"> </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="环境湿度(%):"
                  style="
                    padding-right: 20px;
                    margin-bottom: 10px;
                    padding-left: 0px;
                  "
                >
                  <el-input v-model="imageForm.hjsd"> </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-form-item
                label="负荷电流(A):"
                style="padding-right: 20px; margin-bottom: 10px"
              >
                <el-input v-model="imageForm.fhll"> </el-input>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item
                label="运行电压(kV):"
                style="padding-right: 20px; margin-bottom: 10px"
              >
                <el-input v-model="imageForm.yxdy"> </el-input>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item
                label="负荷(kW):"
                style="padding-right: 20px; margin-bottom: 10px"
              >
                <el-input v-model="imageForm.fh"> </el-input>
              </el-form-item>
            </el-row>
          </el-form>
          <el-button type="info" icon="el-icon-more-outline" slot="reference"
            >其他信息</el-button
          >
        </el-popover>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'JjjjWenDu',

  data() {
    return {
      sliderValue: [0, 50],
      lnglat: '点击的坐标是',
      colorRgba: '',
      cxt: null,
      x: '',
      y: '',
      temperature: ''
    }
  },

  mounted() {
    this.newImage('添加水印')
  },

  methods: {
    tooltipFunciton(v) {
      return v + '℃'
    },
    sliderChange(div_id) {
      if (
        div_id == 'image_div1' ||
        div_id == 'image_div3' ||
        div_id == 'image_div4'
      ) {
        let zrList = new Array()

        let cvs = $("canvas[data-zr-dom-id='zr_0']")
        let myCanvas
        for (let i = 0; i < cvs.length; i++) {
          if (cvs[i].parentNode.parentNode.id == div_id) {
            myCanvas = $("canvas[data-zr-dom-id='zr_0']")[i]
            ctx = myCanvas.getContext('2d')
          }
        }
        // let myCanvas = $("canvas[data-zr-dom-id='zr_0']")[0];
        // let ctx = myCanvas.getContext("2d");
        let cover2 = new ColorConventer()
        let colorArray = cover2.conventColor(
          this.tempValue[1],
          this.tempValue[0],
          this.imageForm.iRData,
          650
        )
        for (let i = 0; i < colorArray.length; i++) {
          try {
            if (colorArray[i]) {
              ctx.fillStyle = colorArray[i].toRgb()
            }
          } catch (e) {}
          ctx.fillRect(this.pointArray[i][0], this.pointArray[i][1], 1, 1)
        }
        let imageData = myCanvas.toDataURL('image/jpg')
        this.zr = null
        $('#' + div_id).attr(
          'style',
          'height:' +
            this.imageForm.height +
            'px;width:' +
            this.imageForm.width +
            'px;'
        )

        this.zr = zrender.init(document.getElementById(div_id))
        zrList.push(this.zr)
        // this.zr2 = zrender.init(document.getElementById("compare_div2"));
        let imgPig
        imgPig = new zrender.Image({
          style: {
            image: imageData,
            x: 0,
            y: 0,
            width: this.imageForm.width,
            height: this.imageForm.height
          }
          // rotation: rotationPI,
          // origin:[x,y]
        })
        this.zr.add(imgPig)
        this.addEvent1(zrList)
      } else if (div_id == 'image_div2') {
        let zrList = new Array()
        let myCanvas1 = $("canvas[data-zr-dom-id='zr_0']")[0]
        let ctx1 = myCanvas1.getContext('2d')
        let cover1 = new ColorConventer()
        let colorArray1 = cover1.conventColor(
          this.tempValue[1],
          this.tempValue[0],
          this.imageForm.iRData,
          650
        )
        for (let i = 0; i < colorArray1.length; i++) {
          try {
            if (colorArray1[i]) {
              ctx1.fillStyle = colorArray1[i].toRgb()
            }
          } catch (e) {}
          ctx1.fillRect(this.pointArray[i][0], this.pointArray[i][1], 1, 1)
        }
        let imageData1 = myCanvas1.toDataURL('image/jpg')
        $('#' + div_id).attr(
          'style',
          'height:' +
            this.imageForm.height +
            'px;width:' +
            this.imageForm.width +
            'px;'
        )
        this.zr = null
        setTimeout(() => {
          this.zr = zrender.init(document.getElementById(div_id))
          let imgPig1 = new zrender.Image({
            style: {
              image: imageData1,
              x: 0,
              y: 0,
              width: this.imageForm.width,
              height: this.imageForm.height
            }
            // rotation: rotationPI,
            // origin:[x,y]
          })
          this.zr.add(imgPig1)
          zrList.push(this.zr)
        }, 30)

        //有相对比较法
        if (this.imageForm.compareMaxTemp) {
          let myCanvas2 = $("canvas[data-zr-dom-id='zr_0']")[1]
          let ctx2 = myCanvas2.getContext('2d')
          let cover2 = new ColorConventer()
          let colorArray2 = cover2.conventColor(
            this.tempValue[1],
            this.tempValue[0],
            this.imageForm.compareTempArray.iRData,
            650
          )
          for (let i = 0; i < colorArray2.length; i++) {
            try {
              if (colorArray2[i]) {
                ctx2.fillStyle = colorArray2[i].toRgb()
              }
            } catch (e) {}
            ctx2.fillRect(this.pointArray[i][0], this.pointArray[i][1], 1, 1)
          }
          let imageData2 = myCanvas2.toDataURL('image/jpg')
          this.zr2 = null
          $('#compare_div2').attr(
            'style',
            'height:' +
              this.imageForm.height +
              'px;width:' +
              this.imageForm.width +
              'px;'
          )
          setTimeout(() => {
            this.zr2 = zrender.init(document.getElementById('compare_div2'))
            let imgPig2 = new zrender.Image({
              style: {
                image: imageData2,
                x: 0,
                y: 0,
                width: this.imageForm.width,
                height: this.imageForm.height
              }
              // rotation: rotationPI,
              // origin:[x,y]
            })
            this.zr2.add(imgPig2)
            zrList.push(this.zr2)
          }, 30)
        }
        setTimeout(() => {
          this.addEvent1(zrList)
        }, 150)
      }
    },
    canvasClick(e) {
      const x = e.layerX
      const y = e.layerY

      const imageData = this.cxt.getImageData(x - 400, y, 1, 1)
      console.log(imageData)
      const data = imageData.data

      this.colorRgba =
        'rgba(' +
        data[0] +
        ',' +
        data[1] +
        ',' +
        data[2] +
        ',' +
        data[3] / 255 +
        ')'
      this.$refs.bgBoxRef.style.background = this.colorRgba
      let highTemp = 45
      let lowTemp = 0
      this.temperature =
        (((highTemp - lowTemp) / 255) * data[0] + lowTemp).toFixed(2) + '℃'
    },
    newImage(text) {
      // 生成图片
      var imageBox = document.querySelector('.tomImg')
      var canvas = document.getElementById('canvas')
      this.cxt = canvas.getContext('2d', { willReadFrequently: true })
      var img = new Image()
      img.src = require('@/assets/img/tom.jpeg')
      // 图片加载完成，才可处理
      img.onload = () => {
        // 画图(这里画布与图片等宽高)
        this.cxt.drawImage(img, 0, 0)
        // // 设置字体大小
        // this.cxt.font = '36px Microsoft YaHei'
        // // 更改字号后，必须重置对齐方式，否则居中麻烦。设置文本的垂直对齐方式
        // this.cxt.textBaseline = 'middle'
        // this.cxt.textAlign = 'center'
        // // 距离左边的位置
        var left = canvas.width / 2
        // // 距离上边的位置 (图片高-文字距离图片底部的距离)
        var top = canvas.height * 0.14
        // // 文字颜色
        // this.cxt.fillStyle = '#ffffff'
        // 文字在画布的位置
        this.cxt.fillText(text, left, top)
        // imageBox.src = canvas.toDataURL('image/jpg')
        // this.cropImage() // 调用裁剪图像的方法进行范围裁剪操作
        // this.flag = 1
      }
    },
    cropImage() {
      const canvas = this.$refs.canvas
      const ctx = canvas.getContext('2d')
      const x = canvas.width / 2 - 50 // 裁剪区域的起始坐标（可以根据需要调整）
      const y = canvas.height / 2 - 50 // 裁剪区域的起始坐标（可以根据需要调整）
      const width = 100 // 裁剪区域的宽度（可以根据需要调整）
      const height = 100 // 裁剪区域的高度（可以根据需要调整）
      const croppedImage = ctx.getImageData(x, y, width, height) // 获取裁剪区域的数据
      // 绘制一个填充矩形
      ctx.fillStyle = 'red' // 设置填充颜色为红色
      ctx.fillRect(x, y, width, height) // 绘制填充矩形，与裁剪区域相同的位置和大小
      // 将裁剪区域的数据绘制到Canvas上显示裁剪后的图像范围（可选）
      // ctx.putImageData(croppedImage, x, y)
      // 处理裁剪后的图像数据（例如发送到后端服务器）或进行其他操作（根据需求添加逻辑）
    },
    imgClick(e) {
      console.log(e)
      const img = document.querySelector('.tomImg')
      const rect = img.getBoundingClientRect()
      this.x = rect.x
      this.y = rect.y
      const offsetX = e.offsetX
      const offsetY = e.offsetY
      // console.log(img.offsetLeft, img.offsetTop, img.offsetParent)
      console.log(e.clientX, e.clientY)
      console.log(e.pageX, e.pageY)
      this.lnglat = `点击的坐标是[${offsetX},${offsetY}]`
    }
  }
}
</script>

<style lang="scss" scoped>
.box800 {
  // margin-top: 80vh;
  text-align: center;
  position: relative;
  width: 800px;
  height: 500px;
  border: 1px solid #446d9c;
  box-shadow: 5px 5px 5px 5px #6684a7;
  .tomImg {
    width: 400px;
    height: 400px;
  }
}
.page-change-arrows {
  width: 200px;
  box-sizing: border-box;

  .el-slider__runway {
    background-color: #4894ff;
  }

  .el-slider__bar {
    background-color: #bfc6d9;
  }

  .el-slider__button {
    width: 54px;
    height: 32px;
    background-image: url(~@/assets/img/tom.jpeg);
    background-size: 100% 100%;
    border-radius: 9px;
    border: none;

    &.hover {
      transform: scale(1);
    }
  }
}
.imageUtil {
  border-radius: 5px;
  margin-left: 12px;
  width: 80px;
  height: 500px;
  background-image: linear-gradient(to bottom, #5177be, #fff);
}
.main {
  display: flex;
}
.imageUtil {
  > div {
    padding: 12px 20px;
    > img {
      border: 1px solid #ccc;
      width: 40px;
      height: 40px;
    }
  }
}
</style>
