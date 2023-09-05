<template>
  <div class="index">
    <div class="select-file">
      <input id="input" type="file" />
    </div>
    <div class="file-preview">
      <VueOfficeDocx v-if="src" style="height: 100%" :src="src" />
    </div>
  </div>
</template>
<script>
import VueOfficeDocx from '@vue-office/docx'
import '@vue-office/docx/lib/index.css'
export default {
  data() {
    return {
      src: ''
    }
  },
  components: {
    VueOfficeDocx
  },
  mounted() {
    this.addInputEventListener()
  },
  methods: {
    /**
     * application/msword;charset=utf-8
     * application/pdf;charset=utf-8
     * application/vnd.ms-excel
     */
    addInputEventListener() {
      const input = document.querySelector('#input')
      input.addEventListener('input', (e) => {
        const fileBlob = e.target.files[0]

        // // 第一种方式（通过window.URL.createObjectURL将Blob文件流转为一个路径）
        // this.src = window.URL.createObjectURL(new Blob([fileBlob]))

        // 第二种方式（转为base64编码）
        // const fileReader = new FileReader()
        // fileReader.readAsDataURL(fileBlob)
        // fileReader.onload = e => {
        //   this.src = e.target.result
        // }

        // // 第三种方式（获取到buffer）
        fileBlob.arrayBuffer().then((buffer) => {
          this.src = buffer
        })
      })
    }
  }
}
</script>
<style scoped>
.index {
  width: 100%;
  height: 100%;
  padding: 15px;
  box-sizing: border-box;
}
.select-file {
  width: 100%;
  height: 35px;
  border-bottom: 1px dashed #ccc;
  margin-bottom: 15px;
}
.file-preview {
  width: 100%;
  height: 100%;
  border: 1px dashed #007acc;
}
</style>
