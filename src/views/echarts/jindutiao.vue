<template>
  <div>
    <div ref="echartsRef" class="echarts-box"></div>
  </div>
</template>

<script>
import { echartsData } from './echarts'
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
      let yLabel = ['总装']
      let yData = [5000]
      var total = 10000 // 数据总数
      // let option = {
      //   title: {
      //     show: true,
      //     text: ['{a|图表111}', '{b|单位：人}'].join('   '), // 主副标题
      //     left: 'center',
      //     textStyle: {
      //       rich: {
      //         a: {
      //           fontSize: 18,
      //           fontWeight: 'bolder'
      //         },
      //         b: {
      //           fontSize: 12,
      //           fontWeight: 'normal'
      //         }
      //       }
      //     }
      //   },
      //   backgroundColor: '#071347',
      //   xAxis: {
      //     max: total,
      //     splitLine: {
      //       show: false
      //     },
      //     axisLine: {
      //       show: false
      //     },
      //     axisLabel: {
      //       show: false
      //     },
      //     axisTick: {
      //       show: false
      //     }
      //   },
      //   grid: {
      //     left: 80,
      //     top: 20, // 设置条形图的边距
      //     right: 80,
      //     bottom: 20
      //   },
      //   yAxis: [
      //     {
      //       type: 'category',
      //       inverse: true,
      //       axisLabel: {
      //         show: false,
      //         margin: 15,
      //         textStyle: {
      //           color: '#fff',
      //           fontSize: '14'
      //         }
      //       },
      //       splitLine: {
      //         show: false
      //       },
      //       axisTick: {
      //         show: false
      //       },
      //       axisLine: {
      //         show: false
      //       },
      //       data: yLabel
      //     },
      //     {
      //       type: 'category',
      //       inverse: true,
      //       axisTick: 'none',
      //       axisLine: 'none',
      //       show: true,
      //       // axisLabel: {
      //       //     textStyle: {
      //       //         color: '#fff',
      //       //         fontSize: '14',
      //       //     },
      //       // },
      //       axisLabel: {
      //         formatter: function (value, i) {
      //           // .toFixed(2)
      //           const arr = [`{b|${(value / total) * 100}%}`, `{a|${value}}`]
      //           return arr.join('')
      //         },
      //         rich: {
      //           a: {
      //             fontSize: 14,
      //             color: '#FFF',
      //             align: 'center'
      //           },
      //           b: {
      //             fontSize: 14,
      //             width: 70,
      //             padding: [0, 0, 0, -70],
      //             color: '#4FA5CB',
      //             align: 'right'
      //           }
      //         }
      //       }
      //       // data: yData,
      //     }
      //   ],
      //   series: [
      //     {
      //       // 内
      //       type: 'bar',
      //       barWidth: 12,
      //       legendHoverLink: false,
      //       silent: true,
      //       itemStyle: {
      //         normal: {
      //           color: function (params) {
      //             let color = {
      //               type: 'linear',
      //               x: 1,
      //               y: 0,
      //               x2: 0,
      //               y2: 0,
      //               colorStops: [
      //                 {
      //                   offset: 0,
      //                   color: '#25e7df' // 0% 处的颜色
      //                 },
      //                 {
      //                   offset: 1,
      //                   color: '#25e7df20' // 100% 处的颜色
      //                 }
      //               ]
      //             }

      //             return color
      //           }
      //         }
      //       },
      //       label: {
      //         show: false,
      //         position: 'right',
      //         // distance: 20,
      //         fontSize: 14,
      //         color: '#4FA5CB',
      //         formatter: '{c}%'
      //       },
      //       data: yData,
      //       z: 1,
      //       animationEasing: 'elasticOut'
      //     },
      //     {
      //       // 分隔
      //       type: 'pictorialBar',
      //       itemStyle: {
      //         normal: {
      //           color: '#061348'
      //         }
      //       },
      //       symbolRepeat: 'fixed',
      //       symbolMargin: 10,
      //       symbol: 'rect',
      //       symbolClip: true,
      //       symbolSize: [1, 12],
      //       symbolPosition: 'center',
      //       symbolOffset: [1, -2],
      //       symbolBoundingData: this.total,
      //       data: yData,
      //       z: 2,
      //       animationEasing: 'elasticOut'
      //     },
      //     {
      //       name: '外框',
      //       type: 'bar',
      //       barGap: '-135%', // 设置外框粗细
      //       data: [
      //         total,
      //         total,
      //         total,
      //         total,
      //         total,
      //         total,
      //         total,
      //         total,
      //         total,
      //         total,
      //         total,
      //         total,
      //         total,
      //         total,
      //         total,
      //         total,
      //         total,
      //         total,
      //         total,
      //         total
      //       ],
      //       barWidth: 20,
      //       itemStyle: {
      //         normal: {
      //           color: 'transparent', // 填充色
      //           barBorderColor: 'rgba(87,205,254,.47)', // 边框色
      //           barBorderWidth: 1, // 边框宽度
      //           // barBorderRadius: 0, //圆角半径
      //           label: {
      //             // 标签显示位置
      //             show: false,
      //             position: 'top' // insideTop 或者横向的 insideLeft
      //           }
      //         }
      //       },
      //       z: 0
      //     }
      //   ]
      // }
      let option = {
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: echartsData.pointList.map((item) => item.x)
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: echartsData.pointList.map((item) => item.data),
            type: 'line'
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
