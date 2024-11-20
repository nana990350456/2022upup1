<template>
  <div class="hello">
    <!-- 上面表格 -->
    <!-- <span class="title"> 颜色变量</span> -->
    <el-table
      ref="tableRef"
      class="topTable"
      :data="table.list"
      row-key="id"
      border
      show-summary
      style="width: 80%"
      highlight-current-row
      @row-click="rowClick"
      @row-contextmenu="rightClick"
    >
      <el-table-column type="index" width="50"> </el-table-column>
      <el-table-column
        v-for="(item, i) in tableInfo"
        :key="i"
        :prop="tableInfo1111[i].key"
        :label="item.value"
        :width="item.width"
      >
        <template slot-scope="scope" slot="header">
          <span v-if="item.key === 'data3'">
            {{ item.key }}
            <el-tooltip
              :aa="scope"
              class="item"
              effect="dark"
              content="这里指定悬浮提示文字内容"
              placement="top-start"
            >
              <i
                class="el-icon-warning"
                style="color:#409eff; margin-left:5px;'"
              >
              </i>
            </el-tooltip>
          </span>
          <span v-else>{{ item.key }}</span>
        </template>
        <template v-slot="scope">
          <span>
            {{ scope.row[tableInfo1111[i].key] }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="300" fixed="right">
        <template v-slot="{ row }">
          <el-button @click="edit(row)">编辑</el-button>
          <el-button @click="deleteClick(row)">删除</el-button>
          <el-button @click="detailsClick(row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 右键菜单 -->
    <!-- 右键菜单 -->
    <div id="menu" class="menuDiv">
      <ul class="menuUl">
        <li
          v-for="(item, index) in menus"
          :key="index"
          @click.stop="infoClick(index)"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
    <p>底部表格</p>
    <el-table
      ref="tableBottomRef"
      :data="tableBottom.listBottom"
      :span-method="arraySpanMethod"
      style="width: 100%"
      @row-click="rowTable2"
    >
      <el-table-column type="index" :index="indexMethod" width="50">
      </el-table-column>
      <template v-for="(item, i) in tableInfo2">
        <el-table-column
          :key="i"
          :prop="item.key"
          :label="item.value"
          :width="item.width"
          border
        >
          <template v-slot="{ row }">
            <span>{{ row[item.key] }}</span>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <Dialog :showDialog.sync="showDialog" />
    <!-- echarts -->
    <!-- <div ref="containerRef" style="width:70%;height:376px;float: left"></div> -->
  </div>
</template>

<script>
import Sortable from 'sortablejs'
import { tableInfo, tableInfo2, tableInfo1111 } from '@/views/drap/js/table1.js'
import Dialog from './dialog.vue'
// import styles from '@/styles/variables.module.scss'
export default {
  name: 'HelloWorld',
  components: {
    Dialog
  },
  props: {
    msg: String
  },
  data() {
    return {
      input:
        '1111111111111111111111111111111111<br>111111111请输入内容请输入内容请输入内容请输入内容请输入内容',
      tableInfo1111,
      //右键菜单
      menus: [
        { name: '查看', operType: 1 },
        { name: '新增', operType: 2 },
        { name: '删除', operType: 3 },
        { name: '修改', operType: 4 }
      ],
      tableInfo,
      tableInfo2,
      table: {
        list: []
      },
      tableBottom: {
        listBottom: []
      },
      datas1: [
        {
          id: '1',
          data1: 11111,
          data2: 22222,
          data3: 33333,
          data4: 44444,
          data5: 55555,
          data6: '10%'
        },
        {
          id: '11',
          data1: 22222,
          data2: 22222,
          data3: 33333,
          data4: 44444,
          data5: 55555,
          data6: '10%'
        },
        {
          id: '111',
          data1: 33333,
          data2: 22222,
          data3: 33333,
          data4: 44444,
          data5: 55555,
          data6: '10%'
        },
        {
          id: '1111',
          data1: 44444,
          data2: 22222,
          data3: 33333,
          data4: 44444,
          data5: 55555,
          data6: '10%'
        },
        {
          id: '11111',
          data1: 55555,
          data2: 22222,
          data3: 33333,
          data4: 44444,
          data5: 55555,
          data6: '10%'
        },
        {
          id: '111111',
          data1: 66666,
          data2: 22222,
          data3: 33333,
          data4: 44444,
          data5: 55555,
          data6: '10%'
        },
        {
          id: '11111111',
          data1: 66666,
          data2: 22222,
          data3: 33333,
          data4: 44444,
          data5: 55555,
          data6: '10%'
        },
        {
          id: '1111111122',
          data1: 66666,
          data2: 22222,
          data3: 33333,
          data4: 44444,
          data5: 55555,
          data6: '10%'
        },
        {
          id: '11111111222333',
          data1: 66666,
          data2: 22222,
          data3: 33333,
          data4: 44444,
          data5: 55555,
          data6: '10%'
        },
        {
          id: '11111111222333444',
          data1: 66666,
          data2: 22222,
          data3: 33333,
          data4: 44444,
          data5: 55555,
          data6: '10%'
        }
      ],
      datas2: [
        {
          data1: '重点隐患治理',
          data2: 111111,
          data3: 333331,
          data4: 444441,
          data5: 555551,
          data6: 666661
        },
        {
          data1: 22222233333,
          data2: 111111,
          data3: 333331,
          data4: 444441,
          data5: 555551,
          data6: 666661
        },
        {
          data1: 111111,
          data2: 111111,
          data3: 333331,
          data4: 444441,
          data5: 555551,
          data6: 666661
        },
        {
          data1: 111111,
          data2: 222221,
          data3: 333331,
          data4: 444441,
          data5: 555551,
          data6: 666661
        },
        {
          data1: 111111,
          data2: 222221,
          data3: 333331,
          data4: 444441,
          data5: 555551,
          data6: 666661
        },
        {
          data1: '合计',
          data2: '',
          data3: 1111113,
          data4: 444441,
          data5: 555551,
          data6: 666661
        }
      ],
      datas3: [
        {
          data1: 111112,
          data2: 222222,
          data3: 333332,
          data4: 444442,
          data5: 555552,
          data6: 666662
        },
        {
          data1: 111112,
          data2: 222222,
          data3: 333332,
          data4: 444442,
          data5: 555552,
          data6: 666662
        },
        {
          data1: 111112,
          data2: 222222,
          data3: 333332,
          data4: 444442,
          data5: 555552,
          data6: 666662
        },
        {
          data1: 111112,
          data2: 222222,
          data3: 333332,
          data4: 444442,
          data5: 555552,
          data6: 666662
        },
        {
          data1: 111112,
          data2: 222222,
          data3: 333332,
          data4: 444442,
          data5: 555552,
          data6: 666662
        },
        {
          data1: 111112,
          data2: 222222,
          data3: 333332,
          data4: 444442,
          data5: 555552,
          data6: 666662
        }
      ],
      showDialog: false,
      tableVal: '11111',
      cur: 0, // 默认选中第一个值
      radio: '1',
      color: 'red'
      // styles
    }
  },
  computed: {
    cssVars() {
      return {
        '--color': this.color
      }
    }
    // $style() {
    //   return styles // 返回样式对象
    // }
  },
  created() {
    this.table.list = this.datas1
    this.tableBottom.listBottom = this.datas2
  },
  mounted() {
    this.infinitScroll()
    // 阻止默认行为
    document.body.ondrop = function (event) {
      event.preventDefault()
      event.stopPropagation()
    }
    this.columnDrop()

    // console.log(styles, 'styles')

    //  this.getEchart1()
  },
  //     mounted(){
  // this.$nextTick(function(){
  //   console.log(this.table.list[0]);
  //   this.$refs.tableRef.setCurrentRow(this.table.list[1])
  // })
  //     },
  watch: {
    'table.list': function () {
      this.$nextTick(function () {
        this.$refs.tableRef.setCurrentRow(this.table.list[0])
        this.rowClick(this.table.list[0])
      })
    }
  },
  methods: {
    //列拖拽
    columnDrop() {
      const wrapperTr = document.querySelector('.el-table__header-wrapper tr')
      this.sortable = Sortable.create(wrapperTr, {
        animation: 180,
        delay: 0,
        onEnd: (evt) => {
          const oldItem = this.tableInfo1111[evt.oldIndex - 1]
          this.tableInfo1111.splice(evt.oldIndex - 1, 1)
          this.tableInfo1111.splice(evt.newIndex - 1, 0, oldItem)
        }
      })
    },
    infinitScroll() {
      // 拿到表格挂载后的真实DOM
      const table = this.$refs.tableRef
      // 拿到表格中承载数据的div元素
      const divData = table.bodyWrapper
      console.log(divData, 'divData')
      divData.onmouseover = function () {
        clearInterval(t)
      } //鼠标移入，停止滚动
      divData.onmouseout = function () {
        start()
      } //鼠标移出，继续滚动

      // 拿到元素后，对元素进行定时增加距离顶部距离，实现滚动效果(此配置为每100毫秒移动1像素)
      let t
      function start() {
        // 数据少于表格高度停止滚动
        if (divData.clientHeight >= divData.scrollHeight) {
          return
        }
        t = setInterval(() => {
          // 元素自增距离顶部1像素
          divData.scrollTop += 1
          // 判断元素是否滚动到底部(可视高度+距离顶部=整个高度)
          if (
            divData.clientHeight + divData.scrollTop ==
            divData.scrollHeight
          ) {
            // 重置table距离顶部距离
            divData.scrollTop = 0
          }
        }, 100)
      }
      start()
    },
    mmm() {},
    deleteClick(row, index) {
      // console.log(row);
      this.datas1.splice(index, 1)
      this.$message.success('删除成功')
    },
    // table的右键点击当前行事件
    rightClick(row, column, event) {
      let menu = document.querySelector('#menu')
      //阻止元素发生默认的行为
      event.preventDefault()
      // 根据事件对象中鼠标点击的位置，进行定位
      menu.style.left = event.pageX + 10 + 'px'
      menu.style.top = event.pageY - 30 + 'px'
      // 改变自定义菜单的隐藏与显示
      menu.style.display = 'block'
      menu.style.zIndex = 1000
    },
    // table的左键点击当前行事件
    clickRow(row, column, event) {
      let menu = document.querySelector('#menu')
      menu.style.display = 'none'
    },
    // 自定义菜单的点击事件
    infoClick(index) {
      switch (index) {
        case 0:
          alert('查看')
          break
        case 1:
          alert('新增')
          break
        case 2:
          this.deleteClick()
          break
        case 3:
          console.log('修改')
          this.edit()
          break

        default:
          break
      }
      let menu = document.querySelector('#menu')
      menu.style.display = 'none'
    },

    edit(row, index) {
      this.showDialog = true
      // console.log(row,'267');
      // console.log(index,'268');
    },

    rowClick(row) {
      console.log(row.data1)
      if (this.tableVal == row.data1) {
        return
      } else {
        this.tableVal = row.data1
      }

      switch (row.data1) {
        case 11111:
          this.tableBottom.listBottom = this.datas2
          break
        case 22222:
          this.tableBottom.listBottom = this.datas3
          break
        case 33333:
          this.tableBottom.listBottom = this.datas2
          break
        case 44444:
          this.tableBottom.listBottom = this.datas3
          break
        case 55555:
          this.tableBottom.listBottom = this.datas2
          break
        case 66666:
          this.tableBottom.listBottom = this.datas3
          break
        default:
          break
      }
    },
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (this.tableVal != '11111') return
      if (rowIndex === 5) {
        if (columnIndex == 0) {
          return {
            rowspan: 1,
            colspan: 4
          }
        } else if (columnIndex == 1 || columnIndex == 3 || columnIndex == 2) {
          return [0, 0]
        }
      }
      if (columnIndex == 1) {
        if (rowIndex == 0) {
          return {
            rowspan: 5,
            colspan: 1
          }
        } else if (rowIndex < 5) {
          return {
            rowspan: 1,
            colspan: 0
          }
        }
      }
    },
    indexMethod(index) {
      console.log(this.tableVal, 'this.tableVal')
      return index === 5 && this.tableVal == '11111' ? '合并' : index + 1
    },
    rowTable2(row) {
      console.log(row)
    }
  },
  destroyed() {
    console.log('table销毁')
  }
}
</script>
<style scoped lang="scss">
// @import '~@/styles/variables.module.scss';
.hello {
  position: relative;
}
.lottie {
  position: absolute;
  left: 50%;
}
.controller {
  position: absolute;
  width: 24px;
  height: 12px;
  z-index: 100;
  bottom: 20px;
  top: 47%;
  left: 38.5%;
  margin-left: -12px;
  -webkit-animation: bounce-down 1.6s linear infinite;
  animation: bounce-down 1.6s linear infinite;
}
/deep/.el-table .el-table__cell {
  text-align: center;
}
/* .table6 {
  margin-left: 232px;
} */
.tilte {
  display: flex;
  justify-content: space-between;
  list-style: none;
  width: 300px;
  margin: auto;
}
// .column {
//   background: url(../assets/logo.png);
// }
.menuDiv {
  display: none;
  position: absolute;

  .menuUl {
    height: auto;
    width: auto;
    font-size: 14px;
    text-align: left;
    border-radius: 3px;
    border: none;
    background-color: #c4c4c4;
    color: #fff;
    list-style: none;
    padding: 0 10px;

    li {
      width: 140px;
      height: 35px;
      line-height: 35px;
      cursor: pointer;
      border-bottom: 1px solid rgba(255, 255, 255, 0.47);

      &:hover {
        // background-color: rgb(26, 117, 158);
        color: rgb(54, 138, 175);
      }
    }
  }
}
/deep/.topTable.el-table {
  height: 386px;
}
// 去掉fixed="right"固定列表，导致出现的hover效果
/deep/.el-table .el-table__body tr.hover-row > td {
  background-color: transparent !important;
}
/deep/.el-tablle--enable-row-hover .el-table__body tr:hover > td {
  background-color: transparent !important;
}
::v-deep.title {
  color: $primary-color;
  display: block;
  width: 100px;
  height: 100px;
  @include gradient-background(red, green);
  color: var(--npcolor) !important;
}

/* el-table 宽度自适应 低版本浏览器，表格宽度自适应 */
.elTable {
  width: 100%;
}
.elTable/deep/ .el-table__header-wrapper table,
.elTable/deep/ .el-table__body-wrapper table {
  width: 100% !important;
}
.elTable /deep/ .el-table__body,
.elTable /deep/ .el-table__footer,
.elTable /deep/ .el-table__header {
  table-layout: auto;
}
.elTable /deep/ .el-table__empty-block,
.elTable/deep/ .el-table__body {
  width: 100% !important;
}
</style>
