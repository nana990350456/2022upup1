<template>
  <div>
    <!-- 日期 -->
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
            <el-date-picker
              v-model="chooseYear"
              type="year"
              placeholder="选择年"
            >
            </el-date-picker>
          </div>
        </div>
        <dir></dir>
      </div>
      <ul></ul>
    </div>
    <!-- 截图 -->

    <el-date-picker
      v-model="form.statisticsTime"
      type="daterange"
      value-format="yyyy-MM-dd"
      range-separator="~"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :picker-options="pickerOptions"
      prefix-icon="0"
    />
    <FilePageOne />
  </div>
</template>

<script>
import FilePageOne from '@/views/date/components/FilePageOne.vue'
export default {
  name: 'DateElement',
  components: {
    FilePageOne
  },
  data() {
    return {
      form: {
        statisticsTime: [new Date(), new Date()]
      },
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
      },
      //    : {
      //   // disabledDate是一个函数,参数是当前选中的日期值,这个函数需要返回一个Boolean值,
      //   disabledDate: (time) => {
      //     // 如果函数处理比较简单,可以直接在这里写逻辑方法
      //     // return time.getTime() < Date.now() - 8.64e7

      //     // 如果函数里处理的数据比较麻烦,也可以单独放在一个函数里,避免data数据太臃肿
      //     return this.dealDisabledDate(time)
      //   }
      // }, // 日期设置对象
      // 日期选择七天内,且当前时间后不能选择
      pickerOptions: {
        onPick: (time) => {
          if (time.minDate && !time.maxDate) {
            // 选择开始时间未选择结束时间
            this.timeOptionRange = time.minDate
          }
          if (time.maxDate) {
            // 选择结束时间
            this.timeOptionRange = null // 清除开始时间，表示已经完成选择
          }
        },
        disabledDate: (time) => {
          const now = new Date()
          const todayStart = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate()
          )
          const todayEnd = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate() + 1
          ) // 明天的开始时间

          if (!this.timeOptionRange) {
            // 没有选择开始时间时，只能选择今天及之前的日期
            return time.getTime() > todayEnd.getTime() // 今天及之前的日期都可以选择
          }

          // 已经选择了开始时间，限制选择范围为开始时间前后7天
          const start = this.timeOptionRange
          const end = new Date(start)
          end.setDate(start.getDate() + 7)

          // 确保今天始终可以选择
          if (
            time.getTime() >= todayStart.getTime() &&
            time.getTime() < todayEnd.getTime()
          ) {
            return false // 今天始终可以选择
          }

          return (
            time.getTime() < start.getTime() || time.getTime() > end.getTime()
          )
        }
      }
    }
  },
  created() {},

  mounted() {
    // this.initSSE()
    var arr = [
      { id: 1, name: '张三' },
      { id: 2, name: '李四' },
      { id: 3, name: '王五' }
    ]

    // 通过ID查询对应的对象
    console.log(
      arr.find((obj) => obj.id === 2),
      'ppppp'
    )
  },
  computed: {
    endTime() {
      return this.startTime.getTime() + 1000 * 60 * 60 * 24 * 7
    }
  },

  methods: {
    initSSE() {
      let evtSource = new EventSource('sse.php')
      let eventList = document.querySelector('ul')

      evtSource.onmessage = function (e) {
        console.log('接收消息')
        let newElement = document.createElement('li')

        newElement.textContent = 'message: ' + e.data
        eventList.appendChild(newElement)
      }
      ;(evtSource.onerror = function () {
        console.log('EventSource failed.')
      }),
        (evtSource.onopen = function () {
          console.log('Connection to server opened.')
        })
    }
  },
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
