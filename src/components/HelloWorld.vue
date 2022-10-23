<template>
  <div class="hello">
    <!-- <lottie :options="defaultOptions" :height="400" :width="400" v-on:animCreated="handleAnimation"/>
    <div class="controller">
       nnn
    </div>
        <ul class="tilte">
        <li @click="cur=0" :class="{column:cur===0}">标题一</li>
        <li @click="cur=1" :class="{column:cur===1}">标题二</li>
        <li @click="cur=2" :class="{column:cur===2}">标题三</li>
      </ul>
      <div class="content">
        <div v-show="cur==0">内容一</div>
        <div v-show="cur==1">内容二</div>
        <div v-show="cur==2">内容三</div>
      </div> -->

    <el-table
      ref="tableRef"
      :data="table.list"
      style="width: 100%"
      highlight-current-row
      @row-click="rowClick"
    >
      <el-table-column type="index" width="50"> </el-table-column>
      <template v-for="(item, i) in tableInfo">
        <el-table-column
          :key="i"
          :prop="item.key"
          :label="item.value"
          :width="item.width"
        >
          <template v-slot="scope">
            <span>{{ scope.row[item.key] }}</span>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <p>-------------------------</p>
    <el-table
      ref="tableBottomRef"
      :data="tableBottom.listBottom"
      :span-method="tableVal == '11111' ? arraySpanMethod : arraySpanMethod1"
      style="width: 100%"
      @row-click="rowTable2"
    >
      <!-- <el-table-column label="序号" width="80">
        <template v-slot="scope">
          <span :class="{'table6':tableVal == '11111' && scope.$index  == 5}">{{
            tableVal == '11111' && scope.$index  == 5
              ? '合计11'
              : scope.$index + 1
          }}</span>
        </template>
      </el-table-column> -->
      <el-table-column type="index" :index="indexMethod" width="50"> </el-table-column>
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

    <el-radio v-model="radio" label="1">备选项</el-radio>
    <el-radio v-model="radio" label="2">备选项</el-radio>
  </div>
</template>

<script>
// import lottie from 'vue-lottie'
import * as animationData from '../assets/密集通道-球.json'
// import * as animationData from "../assets/重要警告-直流.json";
import { tableInfo, tableInfo2 } from '../views/table/table1.js'

export default {
  name: 'HelloWorld',
  // components: { lottie },
  props: {
    msg: String
  },
  data() {
    return {
      defaultOptions: { animationData: animationData },
      animationSpeed: 3,
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
          data1: 11111,
          data2: 22222,
          data3: 33333,
          data4: 44444,
          data5: 55555,
          data6: 66666
        },
        {
          data1: 22222,
          data2: 22222,
          data3: 33333,
          data4: 44444,
          data5: 55555,
          data6: 66666
        },
        {
          data1: 33333,
          data2: 22222,
          data3: 33333,
          data4: 44444,
          data5: 55555,
          data6: 66666
        },
        {
          data1: 44444,
          data2: 22222,
          data3: 33333,
          data4: 44444,
          data5: 55555,
          data6: 66666
        },
        {
          data1: 55555,
          data2: 22222,
          data3: 33333,
          data4: 44444,
          data5: 55555,
          data6: 66666
        },
        {
          data1: 66666,
          data2: 22222,
          data3: 33333,
          data4: 44444,
          data5: 55555,
          data6: 66666
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
      tableVal: '11111',
      cur: 0, // 默认选中第一个值
      radio: '1'
    }
  },
  created() {
    this.table.list = this.datas1
    this.tableBottom.listBottom = this.datas2
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
    arraySpanMethod1({ row, column, rowIndex, columnIndex }) {
      return
    },
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      console.log(row)
      console.log(column)
      console.log(rowIndex)
      console.log(columnIndex)
      if (rowIndex === 5) {
        if (
          columnIndex == 0
        ) {
          return {
            rowspan: 1,
            colspan: 4
          }
        }else if (columnIndex==1 || columnIndex==3 ||columnIndex==2){
          return [0,0]
        }
      }
      if(columnIndex==1){
        if(rowIndex ==0){
          return {
             rowspan: 5,
              colspan: 1
          }
        } else if(rowIndex<5) {
            return {
             rowspan: 1,
              colspan: 0
          }
        }
      }
    },
 indexMethod(index) {
   return index===5 ?'合并' : index+1
      },
  rowTable2(row){
     console.log(row);
  },
    handleAnimation: function (anim) {
      console.log(anim, 'anim')
      this.anim = anim
    },

    stop: function () {
      this.anim.stop()
    },

    play: function () {
      this.anim.play()
    },

    pause: function () {
      this.anim.pause()
    },

    onSpeedChange: function () {
      this.anim.setSpeed(this.animationSpeed)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
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
.column {
  background: url(../assets/logo.png);
}

@-webkit-keyframes bounce-down {
  25% {
    -webkit-transform: translateY(-4px);
  }
  50%,
  100% {
    -webkit-transform: translateY(0);
  }
  75% {
    -webkit-transform: translateY(4px);
  }
}

@keyframes bounce-down {
  25% {
    transform: translateY(-4px);
  }
  50%,
  100% {
    transform: translateY(0);
  }
  75% {
    transform: translateY(4px);
  }
}
</style>
