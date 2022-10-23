<template>
  <el-dialog title="标题" width="40%" :visible="showDialog" @close='Close'>
    <el-form
      ref="formDataRef"
      :model="formData"
      :rules="rulesFrom"
      label-width="80px"
    >
      <el-form-item label="机构名称" prop="name">
        <el-input v-model="formData.name" />
      </el-form-item>
    </el-form>
    <el-row slot="footer" type="flex" justify="center">
      <el-button @click="Close">取 消</el-button>
      <el-button type="primary" @click="btnOk">确 定</el-button>
    </el-row>
  </el-dialog>
</template>

<script>
export default {
  name: 'JjjjDialog22',
  props:{
    showDialog:{
        type:Boolean,
        default:false
    }
  },

  data() {
    return {
      formData: {
        name: ''
      },
      rulesFrom: {
        name: [
          {
            required: true,
            message: '必填',
            trigger: 'blur'
          },
          {
            pattern: /^[^$:%*!~^&\\/]+$/,
            message: '不允许输入特殊符号',
            trigger: 'blur'
          }
        ]
      }
    }
  },

  mounted() {
  
  },

  methods: {
    // 根据id获取学科详情
    async getSubjectById (id) {
      const { data } = await getSubjectById(id)
      this.formData = data
    },
    // 新增编辑学科
    async btnOk () {
      try {
        // 验证表单
        await this.$refs.formDataRef.validate()
        // 判断是新增还是编辑
        if (this.formData.id) {
        // 编辑
          await editSubjectById(this.formData)
        } else {formDataRef
          await addSubject(this.formData)
        }
        //  通知父组件更新列表
        this.$emit('updateSubject')
        this.$message.success(this.showTitle + '学科成功')
        this.$emit('update:show-dialog', false)
      } catch (error) {
        console.log(error)
      }
    },
    Close () {
      this.$refs.formDataRef.resetFields()
      this.formData = {
        subjectName: '',
        isFrontDisplay: 0
      }
      this.$emit('update:showDialog', false)
    }
  }
}
</script>

<style lang="scss" scoped></style>
