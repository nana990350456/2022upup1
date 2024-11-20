<template>
  <div>
    <div ref="echartsRef" class="echarts-box"></div>
  </div>
</template>

<script>
export default {
  name: 'diejiaBar',

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
        backgroundColor: '#fff',
        tooltip: {
          trigger: 'axis'
        },

        grid: {
          left: '6%',
          right: '6%',
          bottom: '5%',
          top: '14%',
          containLabel: true
        },
        legend: {
          icon: 'rect',
          right: 'center',
          top: 13,
          itemWidth: 20,
          itemHeight: 10,
          textStyle: {
            color: '#555'
          },
          data: ['缓行', '拥堵', '严重拥堵']
        },
        xAxis: {
          type: 'category',
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
          axisLabel: {
            //坐标轴字体颜色
            textStyle: {
              color: '#9eaaba'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#e5e5e5'
            }
          },
          axisTick: {
            //y轴刻度线
            show: false
          },
          splitLine: {
            //网格
            show: false
          }
        },
        yAxis: {
          name: '单位:个',
          nameTextStyle: {
            padding: [15, 20, 15, 0] //间距分别是 上 右 下 左
          },
          type: 'value',
          axisLabel: {
            //坐标轴字体颜色
            textStyle: {
              color: '#9eaaba'
            }
          },
          axisLine: {
            show: false
          },
          axisTick: {
            //y轴刻度线
            show: false
          },
          splitLine: {
            //网格
            show: true,
            lineStyle: {
              color: '#dadde4',
              type: 'dashed'
            }
          }
        },
        series: [
          {
            name: '缓行',
            type: 'bar',
            stack: '策略变更',
            barWidth: '40%', //柱子宽度
            itemStyle: {
              //柱子颜色
              normal: {
                color: '#febc5d'
                // borderColor: "#fff",
                // borderWidth: 1,
              }
            },
            data: [232, 193, 240, 214, 239, 223, 0]
          },
          {
            name: '拥堵',
            type: 'bar',
            stack: '策略变更',
            barWidth: '40%', //柱子宽度
            itemStyle: {
              //柱子颜色
              normal: {
                color: '#ff7659'
                // borderColor: "#fff",
                // borderWidth: 1,
              }
            },
            data: [320, 332, 301, 334, 390, 330, 0]
          },
          {
            name: '严重拥堵',
            type: 'bar',
            stack: '策略变更',
            barWidth: '40%', //柱子宽度
            itemStyle: {
              //柱子颜色
              normal: {
                color: '#d11b1b'
                // borderColor: "#fff",
                // borderWidth: 1,
              }
            },
            data: [60, 82, 51, 94, 100, 68, 0]
          },
          {
            name: '综合',
            type: 'bar',
            stack: '策略变更',
            label: {
              show: true,
              position: 'top',
              formatter: (p) => {
                let arr1 = [232, 193, 240, 214, 239, 223, 0]
                let arr2 = [320, 332, 301, 334, 390, 330, 0]
                let arr3 = [60, 82, 51, 94, 100, 68, 0]
                return arr1[p.dataIndex] + arr2[p.dataIndex] + arr3[p.dataIndex]
              }
            },
            emphasis: {
              focus: 'series'
            },
            data: [0, 0, 0, 0, 0, 0, 0]
          }
        ]
      }

      this.MyEcharts.setOption(option)
      this.MyEcharts.off('click')
      this.MyEcharts.on('click', (params) => {
        console.log(params, 'echarts点击参数')

        debugger
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
