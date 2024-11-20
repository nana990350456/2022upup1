<template>
  <div>
    <div ref="echartsRef" class="echarts-box"></div>
  </div>
</template>

<script>
export default {
  name: 'timeLine',

  data() {
    return {
      MyEcharts: null,
      dialogVisible: false
    }
  },

  mounted() {
    // this.initEchartsBar()
  },
  methods: {
    initEchartsBar() {
      this.MyEcharts = this.$echarts.getInstanceByDom(this.$refs.echartsRef)
      if (!this.MyEcharts) {
        //判断有没有初始化
        // 如果不存在就进行初始化
        this.MyEcharts = this.$echarts.init(this.$refs.echartsRef)
      }
      this.MyEcharts.clear()
      let option = {
        title: {
          show: true,
          text: '玩家卡顿频次',
          subtext: '单位：次（统计精度为0.5h）',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            animation: false,
            label: {
              backgroundColor: '#ccc',
              borderColor: '#aaa',
              borderWidth: 1,
              shadowBlur: 0,
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              color: '#222'
            }
          }
        },
        dataZoom: [
          {
            type: 'inside',
            start: 0,
            end: 100
          },
          {
            start: 0,
            xAxisIndex: [0],
            bottom: 50,
            end: 100,
            handleSize: '80%',
            handleStyle: {
              color: '#fff',
              shadowBlur: 3,
              shadowColor: 'rgba(0, 0, 0, 0.6)',
              shadowOffsetX: 2,
              shadowOffsetY: 2
            }
          }
        ],
        color: ['pink', '#2FC25B', '#FACC14'],
        legend: {
          bottom: 0,
          data: ['服务器8', '服务器9', '服务器10'],
          type: 'scroll'
        },
        grid: {
          left: 80,
          right: 60,
          bottom: 100
        },
        dataset: {
          source: []
        },
        xAxis: {
          type: 'time',
          max: '2020-06-10 07:00:00',
          min: '2020-06-10 00:00:00'
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '服务器8',
            type: 'line',
            symbol: 'none',
            data: [
              {
                value: ['2020-06-10 01:00:00', 7]
              },
              {
                value: ['2020-06-10 02:00:00', 5]
              },
              {
                value: ['2020-06-10 03:00:00', 14]
              },
              {
                value: ['2020-06-10 05:00:00', 5]
              },
              {
                value: ['2020-06-10 06:00:00', 50]
              },
              {
                value: ['2020-06-10 07:00:00', 40]
              }
            ]
          },
          {
            name: '服务器9',
            type: 'line',
            symbol: 'none',
            data: [
              {
                value: ['2020-06-10 00:01:24', 1]
              },
              {
                value: ['2020-06-10 01:11:11', null]
              },
              {
                value: ['2020-06-10 02:00:00', 1]
              },
              {
                value: ['2020-06-10 03:00:00', null]
              },
              {
                value: ['2020-06-10 04:00:00', 1]
              },
              {
                value: ['2020-06-10 05:00:00', 1]
              },
              {
                value: ['2020-06-10 06:00:00', 1]
              },
              {
                value: ['2020-06-10 07:00:00', 1]
              }
            ]
          },
          {
            name: '服务器10',
            type: 'line',
            symbol: 'none',
            data: [
              {
                value: ['2020-06-10 03:50:05', 1]
              },
              {
                value: ['2020-06-10 03:52:05', 5]
              },
              {
                value: ['2020-06-10 03:58:25', 6]
              },
              {
                value: ['2020-06-10 04:00:25', 30]
              },
              {
                value: ['2020-06-10 04:23:35', 20]
              }
            ]
          }
        ]
      }

      this.MyEcharts.setOption(option)
    }
  }
}
</script>

<style lang="less" scoped>
.echarts-box {
  width: 800px;
  height: 350px;
}
</style>
