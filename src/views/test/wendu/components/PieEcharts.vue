<template>
  <div ref="pieChart" class="pieChart"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'PieEcharts',
  props: {
    echartsData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      myChart: null
    }
  },
  watch: {
    echartsData: {
      handler() {
        this.initEcharts()
      },
      deep: true
    }
  },

  mounted() {
    this.initEcharts()
  },

  methods: {
    initEcharts() {
      const chartContainer = this.$refs.pieChart
      if (!this.myChart) {
        this.myChart = echarts.init(chartContainer)
      }
      this.myChart.clear()
      let option = {
        title: {
          text: '温度测试图',
          subtext: '表面温度法',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            type: 'pie',
            radius: '50%',
            data: this.echartsData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      this.myChart.setOption(option)
    }
  }
}
</script>

<style lang="scss" scoped>
.pieChart {
  width: 480px;
  height: 640px;
}
</style>
