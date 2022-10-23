<template>
  <div class="hello">
<!-- 上面表格 -->
    <el-table
      ref="tableRef"
      :data="table.list"
      border
      style="width: 60%"
      highlight-current-row
      @row-click="rowClick"
       @row-contextmenu="rightClick"
    >
      <el-table-column type="index" width="50" fixed> </el-table-column>
      <template v-for="(item, i) in tableInfo">
        <el-table-column
          :key="i"
          :prop="item.key"
          :label="item.value"
          :width="item.width"
          :fixed="item.fixed"
        >
          <template v-slot="scope">
            <span>{{ scope.row[item.key] }}</span>
          </template>
        </el-table-column>
      </template>
        <el-table-column  label="操作" width="300">
						<template v-slot="{row}">
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
    <Dialog :showDialog.sync="showDialog"/>
    <!-- echarts -->
<!-- <div ref="containerRef" style="width:70%;height:376px;float: left"></div> -->
  </div>
</template>

<script>
import { tableInfo, tableInfo2 } from './table1.js'
import Dialog from "./dialog.vue";
export default {
  name: 'HelloWorld',
  components:{
    Dialog
  },
  props: {
    msg: String
  },
  data() {
    return {
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
      showDialog:false,
      tableVal: '11111',
      cur: 0, // 默认选中第一个值
      radio: '1'
    }
  },
  created() {
    this.table.list = this.datas1
    this.tableBottom.listBottom = this.datas2
    
  },
  mounted(){
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
    deleteClick(row,index){
      console.log(index);
        // console.log(row);
     this.datas1.splice(index,1)
    },
    // table的右键点击当前行事件
rightClick(row, column, event) {
  let menu = document.querySelector("#menu");
  //阻止元素发生默认的行为
  event.preventDefault();
  // 根据事件对象中鼠标点击的位置，进行定位
  menu.style.left = event.pageX + 10 + "px";
  menu.style.top = event.pageY - 30 + "px";
  // 改变自定义菜单的隐藏与显示
  menu.style.display = "block";
  menu.style.zIndex = 1000;
},
// table的左键点击当前行事件
    clickRow(row, column, event) {
      let menu = document.querySelector("#menu");
      menu.style.display = "none";
    },
// 自定义菜单的点击事件
infoClick(index) {
  switch (index) {
    case 0:
      console.log('查看');
      break;
       case 1:
      console.log('新增');
      break;
       case 2:
      console.log('删除');
      this.deleteClick()
      break;
       case 3:
      console.log('修改');
      this.edit()
      break;
      
  
    default:
      break;
  }
  let menu = document.querySelector("#menu");
  menu.style.display = "none";
  },

    edit(row,index){
      this.showDialog=true
      // console.log(row,'267');
      // console.log(index,'268');
    },
//       getEchart1() { 
//   const myChart = this.$echarts.init(this.$refs.containerRef)
//       const option = {
//   tooltip: {
//     trigger: 'axis',
//       itemStyle :{
//         norma:{
//           label:{
//             show:true,
//             fontSize:13,
//             fontWeight: 'normal',
//             marginTop:15,
//             position:'top',
//           }
//         }
//       },
//     axisPointer: {
//       type: 'shadow'
//     }
//   },
//    legend: {

//     bottom: 10,
//     left: 'center',
//     data: ['Baidu', 'Others']
  
//   },
//   grid: {
//     left: '3%',
//     right: '4%',
//     bottom: '8%',
//     containLabel: true
//   },
//   xAxis: [
//     {
//       type: 'category',
//       data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
//        axisLabel: {
//                     show:true,
//                        formatter:function(v){
//                       console.log(v);
//                       let arr=v.split('')
//                       let str=''
//                       // for (let i = 0, val; (val = arr[i++]); ) {
//                       //    str += val;
//                       //    if(!(i%2)){   //每隔两个字换行
//                       //     str+='\n'
//                       //    }
//                       //     }
//                          for (let i = 0; i<arr.length; i++ ) {
//                          str += arr[i];
//                          if(!(i%2)){   //每隔1个字换行
//                           str+='\n'
//                          }
//                           }

//                      return str
//                     }  
//                 },
//                 boundaryGap: ['0','20%']
//     }
//   ],
//   yAxis: [
//     {
//                 type: 'value',
//                 axisLabel: {
//                     show:true
//                 },
//                 boundaryGap: ['0','20%']
//             }
//   ],

//   series: [
//     {
//       name: 'Baidu',
//       type: 'bar',
//       barWidth: 30,
//       stack: 'Search Engine',
//       emphasis: {
//         focus: 'series'
//       },
//         label: {
//           show :true,
//           position: "top"
//       },
//       data: [620, 732, 701, 734, 1090, 1130, 1120]
//     },
//     {
//       name: 'Others',
//       type: 'bar',
//       stack: 'Search Engine',
//       emphasis: {
//         focus: 'series'
//       },
//       data: [62, 82, 91, 84, 109, 110, 120],
//             label: {
//           show : true,
//           position: "top"
//       },
//     }
//   ]
// };
// var selected = {};
// var isShow;
// for(var i = 0; i< option.series.length; i++){
// //初始化选择值
// selected[option.series[i].name] = true;
// isShow= false;
// //只显示最后一个label
// if(i == option.series.length -1){
// isShow= true;
// }
// option.series[i].label ={
// normal: {
// show: isShow,
// position: 'top',
// textStyle:{
// fontSize: '12px',
// //color:'#a1c9fa'
// }
// }
// };
// }
// var fun = function(obj){
// var showVal = 0;
// for(var key in selected){
// if(selected[key]){
// for(var i=0; i<option.series.length; i++){
// //只添加没有隐藏的列的数值
// if(key == option.series[i].name){
// showVal = option.series[i].data[obj.dataIndex];
// }
// }
// }
// }
// return showVal;
// }
//   myChart.on('click',  function(param) {
//             //param.name x轴值,param.data y轴值
//             console.log(param.name+":"+param.data)
//         });

// //最后一个label的formatter 绑定一个写好的函数
// option.series[option.series.length - 1].label.normal.formatter = fun;
//       option && myChart.setOption(option);
//     },

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
      if(this.tableVal!='11111') return
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
  console.log(this.tableVal,'this.tableVal');
   return index===5 && this.tableVal== '11111'  ?'合并' : index+1
      },
  rowTable2(row){
     console.log(row);
  },
  },
  destroyed(){
    console.log('table销毁');
  }
}
</script>
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
</style>
