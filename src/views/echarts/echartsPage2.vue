<template>
  <div>
    <div ref="echartsRef" class="echarts-box"></div>
    <!-- 弹框 -->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
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
    this.initEchartsBar()
  },

  methods: {
    handleClose() {
      this.$confirm('确认关闭？')
    },
    // 初始化柱状图
    initEchartsBar() {
      this.MyEcharts = this.$echarts.getInstanceByDom(this.$refs.echartsRef)
      if (!this.MyEcharts) {
        //判断有没有初始化
        // 如果不存在就进行初始化
        this.MyEcharts = this.$echarts.init(this.$refs.echartsRef)
      }
      this.MyEcharts.clear()
      const colors = ['#5470C6', '#91CC75', '#EE6666']
      const option = {
        color: colors,
        tooltip: {
          // trigger: 'axis',
          // axisPointer: {
          //   type: 'cross'
          // }
        },
        grid: {
          right: '5%'
        },
        // toolbox: {
        //   feature: {
        //     dataView: { show: true, readOnly: false },
        //     restore: { show: true },
        //     saveAsImage: { show: true }
        //   }
        // },
        legend: {
          data: ['Evaporation', 'Precipitation', 'Temperature']
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {
              alignWithLabel: true
            },
            // prettier-ignore
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: 'Evaporation',
            position: 'right',
            alignTicks: true,
            axisLine: {
              show: true,
              lineStyle: {
                color: colors[0]
              }
            },
            axisLabel: {
              formatter: '{value} ml'
            }
          },
          {
            type: 'value',
            name: 'Precipitation',
            position: 'right',
            alignTicks: true,
            offset: 80,
            axisLine: {
              show: true,
              lineStyle: {
                color: colors[1]
              }
            },
            axisLabel: {
              formatter: '{value} ml'
            }
          },
          {
            type: 'value',
            name: '温度',
            position: 'left',
            alignTicks: true,
            axisLine: {
              show: true,
              lineStyle: {
                color: colors[2]
              }
            },
            axisLabel: {
              formatter: '{value} °C'
            }
          }
        ],
        series: [
          {
            name: 'Evaporation',
            type: 'bar',
            data: [
              2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4,
              3.3
            ]
          },
          {
            name: 'Precipitation',
            type: 'bar',
            yAxisIndex: 1,
            data: [
              2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0,
              2.3
            ]
          },
          {
            name: 'Temperature',
            type: 'line',
            yAxisIndex: 2,
            data: [
              2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2
            ]
          }
        ]
      }
      this.MyEcharts.setOption(option)
      // 在渲染点击事件之前先清除点击事件，一定要加上否则会重复加载先前的点击事件
      this.MyEcharts.getZr().off('click'),
        //这是鼠标滑过事件,展示小手
        this.MyEcharts.getZr().on('mousemove', (param) => {
          var pointInPixel = [param.offsetX, param.offsetY]
          if (this.MyEcharts.containPixel('grid', pointInPixel)) {
            // 若鼠标滑过区域位置在当前图表范围内 鼠标设置为小手
            this.MyEcharts.getZr().setCursorStyle('pointer')
          } else {
            this.MyEcharts.getZr().setCursorStyle('default')
          }
        }),
        this.MyEcharts.getZr().on('click', (params) => {
          // 阴影点击事件
          var pointInPixel = [params.offsetX, params.offsetY]
          // 判断给定的点是否在指定的坐标系
          if (this.MyEcharts.containPixel('grid', pointInPixel)) {
            const xIndex = this.MyEcharts.convertFromPixel({ seriesIndex: 0 }, [
              params.offsetX,
              params.offsetY
            ])[0]
            // 打开弹框
            this.dialogVisible = true
          }
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
