<template>
  <div>
    <el-button type="primary" @click="btnClick">截图</el-button>
    <div class="pic">
      <img :src="url" alt="" class="imgMark" />
    </div>
    <el-button @click="onAddFolder">上传文件夹</el-button>
  </div>
</template>

<script>
import ScreenShot from 'js-web-screen-shot'
export default {
  name: 'JjjjFilePageOne',

  data() {
    return {
      uploadlist: [],
      imageFilelist: [],
      url: localStorage.getItem('picUrl') || ''
    }
  },

  mounted() {},

  methods: {
    onAddFolder() {
      const input = document.createElement('input')
      // input["style"] = "background: rgba(255, 255, 255, 0);overflow: hidden;position: fixed;width: 1px;height: 1px;z-index: -1;opacity: 0;";
      input.type = 'file'
      input.setAttribute('allowdirs', 'true')
      input.setAttribute('directory', 'true')
      input.setAttribute('webkitdirectory', 'true')
      input.multiple = true
      document.querySelector('body').appendChild(input)
      // todo 这里增加了input标签，可以给它删掉
      input.click()
      const _this = this
      input.onchange = async function (e) {
        const formData = new FormData()
        const file = e.target['files']
        console.log(file, 'llkkkjjj')
        for (let i = 0; i < file.length; i++) {
          formData.append('files', file[i], file[i].webkitRelativePath)
        }
        const { msg } = await _this.$http.post('file/upload', formData)
        _this.$message.success(msg)
        // document.querySelector("body").removeChild(input);
      }
    },
    // 按钮点击时间方法，构建插件对象
    btnClick() {
      // 更多参数 和使用可以看它包里面的README.md文件
      const screenShotHandler = new ScreenShot({
        // 是否启用webrtc，值为boolean类型，值为false则使用html2canvas来截图
        enableWebRtc: false,
        // 层级级别，这个要比你页面上其他元素的z-index的值大，不然截不了
        level: 2001,
        completeCallback: this.callback, // 截图成功完成的回调
        closeCallback: this.closeFn // 截图取消的回调
      })
    },

    callback(base64data) {
      // 图片加载后触发回调
      //动态创建方式一
      // if (document.querySelector('.imgMark')) {
      //   document
      //     .querySelector('.pic')
      //     .removeChild(document.querySelector('.imgMark'))
      // }
      // const img = document.createElement('img')
      // img.className = 'imgMark'
      // img.src = base64data
      // localStorage.setItem('jietu', img.src)
      // document.querySelector('.pic').appendChild(img)
      //方式二
      let domImg = document.querySelector('.imgMark')
      localStorage.setItem('picUrl', base64data)
      const res = domImg.getAttribute('src')
      if (!res) {
        this.url = base64data
        // this.$forceUpdate()
        location.reload()
      }
    },

    convertImageToCanvas(image) {
      var canvas = document.createElement('canvas')
      canvas.width = image.width
      canvas.height = image.height
      canvas.getContext('2d').drawImage(image, 0, 0)
      return canvas
    },
    closeFn() {
      // 取消截图的回调
    }
  }
}
</script>

<style lang="scss" scoped>
.img {
  width: 80vh;
  height: 80vh;
  border: 2px solid #999;
}
.imgMark {
  width: 400px;
  height: 400px;
  border: 1px solid green;
}
</style>
<style>
.imgMark {
  width: 400px;
  height: 400px;
  border: 1px solid green;
}
</style>
