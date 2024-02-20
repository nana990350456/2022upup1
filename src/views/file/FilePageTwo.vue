<template>
  <div>
    <div class="dragUpload">
      <el-upload
        :limit="7"
        ref="enclosureUpload"
        :file-list="fileList"
        accept=".xlsx, .xls, .pdf, .jpg, .jpeg, .gif, .png, .doc, .docx"
        :headers="tokens"
        :multiple="true"
        :show-file-list="false"
        :auto-upload="false"
        :on-change="handleFileChange"
        :on-success="enclosureHandleSuccess"
        :on-exceed="handleExceed"
        :before-upload="handlebeforeUpload"
      >
        <el-button type="info" size="small" class="btn" @click="uploadmore">
          批量导入
        </el-button>
      </el-upload>

      <!-- 
       因为有了 debounce() 也可以不用 点击上传，debounce()自动 上传

        <el-button
        type="primary"
        :loading="uploadLoading"
        :disabled="uploadLoading"
        size="small"
        class="comfirm"
        @click="submitUpload"
        v-if="fileList.length"
      >
        确定上传
      </el-button>

      <div v-if="enclosureList.length" class="upload_idlist">
        <span>附件id列表:</span>
        <ul>
          <li v-for="item in enclosureList" :key="item">
            <i class="del_idlist" @click="delIdlist(item)">×</i>
            <span>{{ item }}</span>
          </li>
        </ul>

        <div class="aglingComfirm">
          <el-button type="primary" size="small" class="btn" @click="resetsubmitUpload">
            重新上传 ( 已有{{ enclosureList.length }}条数据 )
          </el-button>
          <el-button type="info" size="small" class="btn" @click="delUploadList">
            清除已上传数据
          </el-button>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import { uploadFile, uploadApi } from '@/api/xxxxxx' //api 请求

export default {
  data() {
    return {
      tokens: {
        Authorization: localStorage.getItem('token')
      },
      uploadLoading: false,
      fileList: [],
      enclosureList: [],
      exportLoading: false,
      timer: null
    }
  },

  mounted() {},

  methods: {
    uploadmore(v) {
      console.log('批量导入', v)
    },

    // 过滤重复
    filterRepetition(arr) {
      let arr1 = [] //存id
      let newArr = [] //存新数组
      for (let i in arr) {
        if (arr1.indexOf(arr[i].name) == -1) {
          arr1.push(arr[i].name)
          newArr.push(arr[i])
        }
      }
      return newArr
    },

    handlebeforeUpload(file, fileList) {
      console.log('上传前', file, fileList)
    },

    // 修改 存放要上传的文件列表
    handleFileChange(file, fileList) {
      let arr = this.filterRepetition(fileList)
      if (arr.length !== fileList.length) {
        this.$message('上传重复文件，已过滤重复文件')
      }

      this.fileList = arr

      // 上传文件后，自动把文件传给后台，这里做了一个防抖，等待500ms后在传给后台
      this.debounce(this.submitUpload, 500)
    },

    // element上传多个文件时，会把每个文件做个单独请求
    // 这里的方法是请求最后一次
    debounce(fn, waits) {
      if (this.timer) {
        clearTimeout(this.timer)
        this.timer = null
      }

      this.timer = setTimeout(() => {
        fn.apply(this, arguments) // 把参数传进去
      }, waits)
    },

    // 确定
    async submitUpload() {
      if (this.fileList.length === 0) {
        this.$message.success('请上传文件')
        return
      }

      this.uploadLoading = true
      let formData = new FormData() //  用FormData存放上传文件
      this.fileList.forEach((file) => {
        formData.append('file', file.raw) // file.raw
      })

      // 确定上传 把在上传列表里的文件 合并到formData里面传给后台
      let res = await uploadApi(formData)
      console.log('结果;', res)

      if (res.isSuccess) {
        this.$message.success('上传成功')
        res.result = res.result || []
        this.fileList = []
        this.enclosureList = []
        let arr = Object.prototype.toString.call(res.result)
        if (arr === '[object Array]') {
          this.enclosureList = res.result || []
        }
        console.log('结果：', arr)
      }

      this.uploadLoading = false
    },

    // 移除文件
    async delIdlist(val) {
      let flag = await this.$confirm(`确定移除吗？`)
      if (flag === 'confirm') {
        this.enclosureList = this.enclosureList.filter((res) => res !== val)
      }
    },

    // 重新上传
    resetsubmitUpload() {
      this.enclosureList = []
      this.fileList = []
    },

    // 清除记录
    async delUploadList() {
      let flag = await this.$confirm(`确定清除所有附件ID吗？`)
      if (flag === 'confirm') {
        this.enclosureList = []
        this.fileList = []
      }
    },

    // 取消
    approveCancel() {
      this.fileList = []
      this.approve_dialog = false
    },

    // 删除时的钩子
    onFileRemove(file, fileList) {
      console.log('删除时钩子-fileList', fileList)
      this.fileList = fileList
    },
    // 删除之前钩子
    beforeFileRemove(file, fileList) {
      let flag = this.$confirm(`确定移除 ${file.name}？`)
      return flag
    },

    // 上传成功
    enclosureHandleSuccess(response, file, fileListile) {
      console.log('上传成功:', response, file, fileListile)
      this.uploadLoading = false
    },

    // 上传失败
    enclosureHandleError(err, file, fileList) {
      this.$message({
        showClose: true,
        message: err,
        type: 'error'
      })
      this.uploadLoading = false
    },

    // 上传文件之前
    beforeUpload(file) {},

    // 导入
    handleExceed(files, fileList) {
      console.log('导入', files, fileList)
      this.$message.warning(
        `限制选择7个文件，本次选择了 ${files.length} 个文件`
      )
    }
  }
}
</script>

<style lang="scss" scoped></style>
