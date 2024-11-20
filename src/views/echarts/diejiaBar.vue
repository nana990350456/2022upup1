<template>
  <div>
    <div ref="echartsRef" id="diejiaBar" class="echarts-box"></div>
  </div>
</template>

<script>
import { prpdSketchVoList } from './prpd'
export default {
  name: 'diejiaBar',

  data() {
    return {
      MyEcharts: null,
      dialogVisible: false
      // dataBJ: [
      //   [88.2, 200, 190],
      //   [242.9, 200.15, 11],
      //   [37.49, 459.05, 53],
      //   [192.24, 448.28, 26][
      //     // [(347.01, 450.41, 69)],
      //     (140.6, 476.82, 186)
      //   ],
      //   [295.08, 479.08, 133],
      //   [89.68, 481.36, 4],
      //   [244.35, 479.08, 111],
      //   [38.98, 456.87, 134],
      //   [193.63, 450.41, 180],
      //   [348.26, 444.04, 16],
      //   [142.86, 465.63, 93],
      //   [297.54, 450.41, 95],
      //   [92.19, 454.71, 44],
      //   [246.28, 472.31, 48],
      //   [40.98, 439.84, 141],
      //   [196.13, 479.08, 119],
      //   [350.77, 479.08, 60],
      //   [145.39, 467.85, 180],
      //   [300.01, 446.15, 139],
      //   [94.62, 456.87, 200],
      //   [249.25, 461.23, 83],
      //   [43.91, 488.27, 199],
      //   [198.51, 459.05, 112],
      //   [353.16, 474.56, 178],
      //   [147.79, 490.59, 188],
      //   [302.44, 452.55, 155],
      //   [97.06, 490.59, 12],
      //   [251.64, 467.85, 32],
      //   [46.27, 467.85, 9],
      //   [200.9, 479.08, 6],
      //   [355.65, 425.47, 115],
      //   [149.81, 456.87, 7],
      //   [304.43, 476.82, 103],
      //   [99.07, 444.04, 37],
      //   [253.68, 456.87, 200],
      //   [48.32, 476.82, 186],
      //   [202.97, 454.71, 182],
      //   [357.55, 456.87, 169],
      //   [152.21, 439.84, 13],
      //   [306.85, 476.82, 23],
      //   [101.5, 441.94, 94],
      //   [256.11, 465.63, 119],
      //   [50.66, 461.23, 166],
      //   [205.28, 474.56, 23],
      //   [359.93, 450.41, 181],
      //   [154.57, 459.05, 78],
      //   [309.2, 452.55, 74],
      //   [103.85, 467.85, 145],
      //   [258.45, 459.05, 105],
      //   [53.07, 431.57, 85],
      //   [207.68, 446.15, 110],
      //   [2.31, 459.05, 94],
      //   [156.94, 456.87, 84],
      //   [311.69, 465.63, 100],
      //   [106.33, 483.66, 200],
      //   [260.97, 450.41, 59],
      //   [55.61, 459.05, 17],
      //   [210.26, 467.85, 24],
      //   [4.91, 454.71, 12],
      //   [159.51, 479.08, 186],
      //   [314.09, 479.08, 24],
      //   [108.69, 470.07, 122],
      //   [263.34, 444.04, 138],
      //   [58.0, 437.76, 58],
      //   [212.61, 461.23, 123],
      //   [7.24, 459.05, 140],
      //   [161.87, 446.15, 15],
      //   [316.49, 446.15, 75],
      //   [111.12, 470.07, 75],
      //   [265.71, 463.42, 167],
      //   [60.36, 470.07, 98],
      //   [215.0, 444.04, 85],
      //   [9.62, 446.15, 188],
      //   [164.23, 456.87, 63],
      //   [318.88, 472.31, 137],
      //   [113.48, 485.96, 5],
      //   [268.14, 435.69, 42],
      //   [62.75, 474.56, 22],
      //   [217.35, 476.82, 12],
      //   [12.0, 446.15, 1],
      //   [166.63, 463.42, 130],
      //   [321.28, 472.31, 61],
      //   [115.93, 476.82, 2],
      //   [270.53, 463.42, 117],
      //   [65.18, 467.85, 52],
      //   [219.82, 441.94, 4],
      //   [14.45, 441.94, 89],
      //   [169.05, 476.82, 5],
      //   [323.68, 437.76, 174],
      //   [118.32, 465.63, 55],
      //   [272.93, 459.05, 52],
      //   [67.58, 444.04, 130],
      //   [222.2, 476.82, 136],
      //   [16.83, 448.28, 67],
      //   [171.45, 472.31, 182],
      //   [326.07, 481.36, 30],
      //   [120.62, 476.82, 44],
      //   [275.26, 456.87, 180],
      //   [69.9, 476.82, 1],
      //   [224.51, 479.08, 27],
      //   [19.16, 450.41, 94],
      //   [173.81, 446.15, 129],
      //   [328.45, 467.85, 10],
      //   [123.07, 433.62, 117],
      //   [277.67, 459.05, 146],
      //   [72.27, 467.85, 106],
      //   [226.9, 463.42, 93],
      //   [21.54, 456.87, 124],
      //   [176.18, 467.85, 21],
      //   [330.8, 452.55, 32],
      //   [125.39, 450.41, 190],
      //   [280.02, 415.49, 138],
      //   [74.62, 200, 88],
      //   [229.28, 200, 178]
      // ]
    }
  },
  computed: {
    dataBJ() {
      return prpdSketchVoList.map((item) => {
        return [item.pulseSignalTimes, item.xvalue, item.yvalue]
      })
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
        backgroundColor: '#132A7F',
        color: ['#dd4444', '#fec42c', '#80F1BE'],
        legend: {
          show: false
        },

        grid: {
          left: '10%',
          right: '20%',
          top: '10%',
          bottom: '10%'
        },
        tooltip: {
          backgroundColor: '#1B2D56',
          borderColor: '#2BD8FB',
          textStyle: {
            color: '#fff'
          },
          formatter: function (param) {
            var value = param.value
            // prettier-ignore
            return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px;">'
                + '</div>'
                + '幅值' + '：' + value[1] + '<br>'
                + '频次' + '：' + value[2] + '<br>';
          }
        },
        xAxis: {
          show: false,
          type: 'value',
          nameGap: 16,
          nameTextStyle: {
            fontSize: 16
          },
          min: 0,
          max: 360,
          splitLine: {
            show: false
          },
          axisLabel: {
            color: '#fff'
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#fff'
            }
          }
        },
        yAxis: {
          type: 'value',
          name: '幅值',
          nameLocation: 'end',
          nameGap: 20,
          nameTextStyle: {
            fontSize: 16
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            color: '#fff'
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#fff'
            }
          }
        },
        visualMap: [
          {
            left: 'right',
            top: '10%',
            dimension: 2,
            itemHeight: 100,
            calculable: true,
            text: ['频次'],
            textStyle: {
              color: '#fff'
            },
            inRange: {
              colorLightness: [0.9, 0.5],
              color: 'blue'
            },
            outOfRange: {
              color: ['rgba(255,255,255,0.4)']
            },
            controller: {
              inRange: {
                color: ['blue']
              },
              outOfRange: {
                color: ['#999']
              }
            }
          }
        ],
        series: [
          {
            name: '东钱湖',
            type: 'scatter',
            animation: false,
            symbolSize: 1,
            data: this.dataBJ
          }
        ]
      }

      this.MyEcharts.setOption(option)
      // this.MyEcharts.off('click')
      // this.MyEcharts.on('click', (params) => {
      //   console.log(params, 'echarts点击参数')

      //   debugger
      // })
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
