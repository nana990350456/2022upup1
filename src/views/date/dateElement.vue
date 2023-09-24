<template>
  <div>
    <div>
      <ul class="tilte">
        <li @click="cur = 0" :class="{ column: cur === 0 }">周计划</li>
        <li @click="cur = 1" :class="{ column: cur === 1 }">月计划</li>
        <li @click="cur = 2" :class="{ column: cur === 2 }">年计划</li>
      </ul>
      <!-- <div v-loading="true"></div> -->
      <div class="content">
        <div v-show="cur == 0">
          <div class="block">
            <el-date-picker
              class="pickerWeek"
              v-model="startTime"
              type="date"
              :picker-options="startPickerOptions"
              placeholder="选择周"
            >
            </el-date-picker>
            <el-date-picker
              class="pickerWeek"
              popper-class="rightEnd"
              v-model="endTime"
              type="date"
              :picker-options="endPickerOptions"
              placeholder="选择周"
            >
            </el-date-picker>
          </div>
        </div>
        <div v-show="cur == 1">
          <div class="block">
            <el-date-picker
              v-model="chooseMonth"
              type="month"
              placeholder="选择月"
            >
            </el-date-picker>
          </div>
        </div>
      </div>
    </div>
    <div v-show="cur == 2">
      <div class="container">
        <div class="block">
          <el-date-picker v-model="chooseYear" type="year" placeholder="选择年">
          </el-date-picker>
        </div>
      </div>
      <dir></dir>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DateElement',
  data() {
    return {
      header: ['列1', '列2', '列3'],
      cur: 0, // 默认选中第一个值
      data1: {
        id: '11111',
        name: '张三',
        type: 'tag1'
      },
      startTime: new Date(),
      // endTime: new Date().getTime() + 1000 * 60 * 60 * 24 * 7,
      chooseMonth: new Date(),
      chooseYear: new Date(),
      startPickerOptions: {
        disabledDate: (time) => {
          if (this.endTime) {
            return (
              time.getTime() > Date.now() + 1000 * 60 * 60 * 24 * 7 ||
              time.getTime() > this.endTime /*开始日期要在选择的结束日期之前*/
            )
          }
          return time.getTime() > Date.now() /*今天及之前，注意数字不一样*/
        }
      },
      endPickerOptions: {
        disabledDate: (time) => {
          if (this.startTime) {
            return (
              time.getTime() >
                this.startTime.getTime() + 1000 * 60 * 60 * 24 * 7 ||
              time.getTime() < new Date(this.startTime).getTime()
            )
          }
          return time.getTime() > Date.now() + 1000 * 60 * 60 * 24 * 7
        },
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date())
            }
          },
          {
            text: '昨天',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          },
          {
            text: '一周前',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          }
        ]
      }
      //    : {
      //   // disabledDate是一个函数,参数是当前选中的日期值,这个函数需要返回一个Boolean值,
      //   disabledDate: (time) => {
      //     // 如果函数处理比较简单,可以直接在这里写逻辑方法
      //     // return time.getTime() < Date.now() - 8.64e7

      //     // 如果函数里处理的数据比较麻烦,也可以单独放在一个函数里,避免data数据太臃肿
      //     return this.dealDisabledDate(time)
      //   }
      // }, // 日期设置对象
    }
  },
  created() {
    //  this.datatimestatus()
  },

  mounted() {},
  computed: {
    endTime() {
      return this.startTime.getTime() + 1000 * 60 * 60 * 24 * 7
    }
  },

  methods: {
    //     datatimestatus(){
    // this.pickerOptions.disabledDate = (time) => {
    // 	// 一天
    // 	let tempTime = 3600 * 1000 * 24
    // 	 return time.getTime() < new Date()-tempTime
    // }
    // }
  },

  //  // 单独处理时间的函数
  //   dealDisabledDate (time) {
  //     console.log(time,'time');
  //     // time.getTime是把选中的时间转化成自1970年1月1日 00:00:00 UTC到当前时间的毫秒数
  //     // Date.now()是把今天的时间转化成自1970年1月1日 00:00:00 UTC到当前时间的毫秒数,这样比较好比较
  //     // return的值,true是不可以操作选择,false可以操作选择,比如下面这个判断就只能选择今天之后的时间
  //     return time.getTime() > Date.now()

  //     // 这里减8.64e7的作用是,让今天的日期可以选择,如果不减的话,今天的日期就不可以选择,判断中写<= 也是没用的,一天的毫秒数就是8.64e7
  //     // return time.getTime() <= Date.now()
  //     // return time.getTime() < Date.now() - 8.64e7
  //   }
  // },
  destroyed() {
    console.log('tab销毁')
  }
}
</script>

<style lang="less" scoped>
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
.tilte {
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  list-style: none;
  width: 300px;
}
/deep/.el-date-editor {
  background-color: transparent !important;
  border-color: #2b5588;
  box-shadow: 1px 1px 5px 1px #428aea inset;
  transform: skewX(-30deg);
}
.column {
  background: url(@/assets/logo.png);
}

/deep/.el-input__inner {
  background-color: transparent !important;
  transform: skewX(30deg);
  border: 0;
  height: 30px;
  padding-left: 70px;
}
/deep/.el-input__prefix {
  left: 30px;
}

/deep/.el-popper {
  margin-top: 147px;
  margin-left: -50px;
}

/deep/.el-input__icon {
  //日历图标
  line-height: 30px;
  transform: skewX(30deg);
  color: #002450;
}
.iframePage {
  width: 1000px;
  height: 500px;
  background: lightblue;
}
</style>
