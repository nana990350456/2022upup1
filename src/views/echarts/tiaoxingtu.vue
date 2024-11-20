<template>
  <div>
    <div ref="echartsRef" class="echarts-box"></div>
  </div>
</template>

<script>
export default {
  name: 'echartsPage',

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

      let list = [
        { name: '第一名', value: 1 },
        { name: '第二名', value: 0.1 },
        { name: '第三名', value: 144 },
        { name: '第四名', value: 0.1 },
        { name: '第五名', value: 0.1 }
      ]
      let ranking1 = `data:image/png;base64,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`
      let yName = list.map((item) => item.name)
      let xData = list.map((item) => item.value)
      let barWidth = 12
      let max = 100
      let maxList = [max, max, max, max, max]
      let option = {
        grid: {
          left: '10%',
          right: '10%',
          top: '20%',
          bottom: '10%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'value',
            show: false,
            boundaryGap: true
          }
        ],
        yAxis: [
          {
            type: 'category',
            splitLine: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            inverse: true,
            data: list.map((item) => item.name),
            axisLabel: {
              formatter: (name, index) => {
                const id = index + 1
                if (id < 10) {
                  return `{left|${index}}`
                }
              },
              // formatter: function (params) { 多类名设置
              //     return '{a|' + params.name + '}{b| 数值为：' + params.value + '}';
              // },
              rich: {
                left: {
                  width: 10,
                  height: 30,
                  lineHeight: 30,
                  fontSize: 20,
                  align: 'center',
                  color: '#ffffff',
                  backgroundColor: {
                    image: ranking1
                  }
                },
                top: {
                  fontSize: 12,
                  color: '#000',
                  padding: [4, 0, 0, 8]
                }
              }
            }
          },
          {
            type: 'category',
            inverse: true,
            position: 'left',
            axisLabel: {
              inside: true,
              align: 'left',
              verticalAlign: 'bottom',
              padding: [0, 0, 13, 0],
              textStyle: {
                color: 'rgba(0, 0, 0, 0.85)',
                fontSize: '12',
                fontFamily: 'Source Han Sans CN-Regular'
              }
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            data: yName
          },
          {
            type: 'category',
            inverse: true,
            axisTick: 'none',
            axisLine: 'none',
            show: true,
            axisLabel: {
              textStyle: {
                color: '#606266',
                fontSize: 14
              },
              formatter: function (value) {
                return value + '分'
              }
            },
            data: xData
          }
        ],
        series: [
          {
            //内
            type: 'bar',
            barWidth,
            legendHoverLink: false,
            symbolRepeat: true,
            silent: true,
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 0,
                colorStops: [
                  {
                    offset: 0,
                    color: '#75ADFA' // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: '#56DDF5' // 100% 处的颜色
                  }
                ]
              }
            },
            data: list,
            z: 1,
            animationEasing: 'elasticOut'
          },
          {
            // 背景
            type: 'pictorialBar',
            animationDuration: 0,
            symbolRepeat: 'fixed',
            symbolMargin: 1,
            symbol: 'rect',
            symbolSize: [38, barWidth],
            symbolPosition: 'start',
            itemStyle: {
              normal: {
                color: '#D2E4FA'
              }
            },
            label: {
              normal: {
                show: false
              }
            },
            data: xData,
            z: 0,
            animationEasing: 'elasticOut'
          },
          {
            //分隔
            type: 'pictorialBar',
            itemStyle: {
              color: '#fff'
            },
            symbolRepeat: 'fixed',
            symbolMargin: 25,
            symbol: 'rect',
            symbolClip: true,
            symbolSize: [2, barWidth],
            symbolPosition: 'start',
            data: maxList,
            z: 2,
            animationEasing: 'elasticOut'
          }
        ]
      }

      this.MyEcharts.setOption(option)
      let that = this
      // 监听空白处的点击事件
      this.MyEcharts.getZr().off('click') //防止触发两次点击事件
      this.MyEcharts.getZr().on('click', function (event) {
        let pointGrid = that.MyEcharts.convertFromPixel({ seriesIndex: 0 }, [
          event.offsetX,
          event.offsetY
        ])
        console.log(pointGrid, 'kkkk')
      })
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
