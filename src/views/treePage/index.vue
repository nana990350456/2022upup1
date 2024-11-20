<template>
  <div>
    树形结构222
    <div class="block">
      <!-- 第一层 -->
      <el-tree
        :data="firstData"
        check-on-click-node
        show-checkbox
        node-key="id"
        :props="defaultProps"
        :expand-on-click-node="false"
        default-expand-all
      >
        <div slot-scope="{ data }" class="firstData">
          <span>{{ data.label }}</span>
          <span v-if="data.label == '关注测点'"></span>
          <div v-else>
            <i class="el-icon-delete"></i>
          </div>
        </div>
      </el-tree>
      <el-input
        placeholder="输入关键字进行过滤"
        class="search-input"
        v-model="filterText"
      >
      </el-input>
      <el-tree
        :data="data"
        show-checkbox
        node-key="id"
        ref="bottomTree"
        :props="defaultProps"
        :filter-node-method="filterNode"
        :default-checked-keys="checkedKeys"
        default-expand-all
        check-on-click-node
        @current-change="currentChangeFn"
        @check="checkBtn"
        :expand-on-click-node="false"
      >
        <div class="custom-tree-node" slot-scope="{ node, data }">
          <span>{{ data.label }}</span>
          <span v-if="data.label === '布控球'"
            ><i class="el-icon-plus" @click.stop="addBall"></i
          ></span>
          <span v-else>
            <i
              v-if="data.select"
              class="el-icon-star-on"
              @click="addFn(data)"
            ></i>
            <i v-else class="el-icon-star-off" @click="addFn(data)"></i>
            <i class="el-icon-delete" @click="remove2Fn(node, data)"></i>
          </span>
        </div>
      </el-tree>
    </div>
    <!-- 新增不控球弹窗 -->
    <div class="dialogBall" v-if="showDialog">
      <div>新增布控球</div>
      <div>
        <el-form
          ref="formRef"
          :model="form"
          :rules="formRules"
          label-width="100px"
        >
          <el-form-item label="不控球名称" prop="label">
            <el-input v-model="form.label"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div>
        <el-button @click="btnOk">确定</el-button>
        <el-button @click="closeFn">删除</el-button>
      </div>
    </div>
    <MyTransfer />
    <img src="@/assets/logo.png" alt="" />
    <input type="file" @change="filechange" />
    <button @click="check22222222">预览</button>
    <div
      ref="wordRef"
      style="width: 500px; height: 500px; background: pink"
    ></div>
    <!-- <VueOfficeDocx
      :src="docx"
      style="height: 100vh"
      @rendered="rendered"
      @error="errorHandler"
    /> -->
  </div>
</template>

<script>
//引入相关样式
// import '@vue-office/docx/lib/index.css'
import { renderAsync } from 'docx-preview'
// import VueOfficeDocx from '@vue-office/docx'
import MyTransfer from './components/my-transfer.vue'
let id = 1000

export default {
  name: 'treePage',
  components: {
    MyTransfer
    // VueOfficeDocx
  },
  data() {
    const CC = [
      {
        id: 1,
        label: '布控球',
        children: [
          {
            id: 4,
            label: '不控球1',
            select: false
          }
        ]
      }
    ]
    return {
      docx: '',
      filterText: '', //筛选
      checkedKeys: [1],
      // 不控球弹窗显示隐藏
      showDialog: false,
      firstData: [], //添加收藏的树的数据
      start: 'el-icon-star-off',
      dd: 'mm',
      data: JSON.parse(JSON.stringify(CC)),
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      //弹框
      form: {
        label: '',
        id: ''
      },
      formRules: {
        label: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ]
      },
      wordblob: {}
    }
  },
  watch: {
    filterText(val) {
      this.$refs.bottomTree.filter(val)
    }
  },
  created() {
    this.loadFirstData()
  },
  mounted() {
    console.log(this, 'this1')
    console.log(this.data, 'this3')
    console.log(this.dd, 'this4')
  },
  methods: {
    rendered() {
      //
    },
    errorHandler() {
      //
    },
    filechange(evt) {
      let file = evt.target.files
      console.log(file)
      this.wordblob = new Blob(file)
    },

    check22222222() {
      console.log(this.wordblob, '99999999')
      // console.log(renderAsync, 'cesi888888888')
      console.log(this.$refs.wordRef, 'cesi88888888888888888')
      this.$nextTick(() => {
        this.docx = this.wordblob
        //this.$forceUpdate()
      })
      renderAsync(this.wordblob, this.$refs.wordRef).then((res) => {
        console.log('res---->', res)
      })
    },
    // 筛选
    filterNode(value, data) {
      console.log(data)
      if (!value) return true
      console.log(data.label.indexOf(value))
      return data.label.indexOf(value) !== -1
    },
    currentChangeFn(node) {
      console.log(node, 'node')
      this.data.forEach((item) => {
        if (item.id === node.id) {
          item.select = node.select
        }
      })
      console.log(node, 'node2')
    },
    checkBtn() {
      // console.log(data, 'data')
    },
    // 第一个树节点
    loadFirstData() {
      this.firstData = [
        {
          id: '0',
          label: '关注测点',
          level: '1',
          children: [
            {
              id: 10,
              label: '关注测点1',
              select: true
            }
          ]
        }
      ]
    },
    // 添加
    addFn(data) {
      console.log(data, 'data11')
      // 选中
      data.select = !data.select
      if (data.select) {
        // 上面的关注测试，增加添加的数据
        this.firstData[0].children.push(data)
      } else {
        console.log('取消')
        const index = this.firstData[0].children.findIndex((item) => {
          return !item.select
        })
        this.firstData[0].children.splice(index, 1)
      }
    },
    // 不控球删除
    async remove2Fn(node, data) {
      try {
        await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示')
        let index = this.data[0].children.findIndex(
          (item) => item.id === data.id
        )
        this.data[0].children.splice(index, 1)
      } catch (error) {
        console.log(error)
      }
    },
    // 新增不控球
    addBall() {
      this.showDialog = true
    },
    // 添加不控球
    btnOk() {
      // console.log(this.form.label);
      this.data[0].children.push({ label: this.form.label, select: false })
      this.closeFn()
      this.showDialog = false
    },
    // 关闭弹框
    async closeFn() {
      await this.$refs.formRef.resetFields()
      this.form = {
        label: '',
        id: ''
      }
    }
  }
}
</script>

<style lang="less" scoped>
.el-tree {
  width: 25%;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.el-tree-node__expand-icon {
  color: pink;
}
.el-tree .el-tree-node .is-leaf + .el-checkbox .el-checkbox__inner {
  display: inline-block;
}
.el-tree .el-tree-node .el-checkbox .el-checkbox__inner {
  display: none;
}
.firstData {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 84%;
}
.dialogBall {
  position: absolute;
  left: 614px;
  top: 108px;
  width: 500px;
  height: 202px;
  background-color: #ccc;
}
/deep/.search-input {
  width: 25%;
  display: inherit;
  input {
    border: 1px dashed pink !important;
  }
}
</style>
