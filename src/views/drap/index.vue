<template>
  <div>
    <h1 @click="clickTable('table')">1.列表拖拽</h1>
    <h1 @click="clickTable('page')">1.页面拖拽</h1>
    <el-drawer
      :title="drawTitle"
      :visible.sync="drawer"
      direction="ttb"
      :before-close="handleClose"
    >
      <TableDrap v-if="showTableDrap == 'table'" />
      <PageDrap v-if="showTableDrap == 'page'"></PageDrap>
    </el-drawer>
  </div>
</template>

<script>
import TableDrap from '@/views/drap/components/TableDrap.vue'
import PageDrap from '@/views/drap/components/PageDrap.vue'
export default {
  name: 'DrapIndex',
  components: {
    TableDrap,
    PageDrap
  },
  data() {
    return {
      showTableDrap: false,
      drawer: false,
      drawTitle: ''
    }
  },

  mounted() {
    const res = this.getLinePoints(2, 1, 8, 4)
    console.log(res, '所有点')
  },

  methods: {
    handleClose(done) {
      // this.$confirm('确认关闭？').then((_) => {
      done() //关闭页面内置方法
      this.showTableDrap = ''
      // })
    },
    clickTable(tag) {
      this.drawTitle = '拖拽'
      this.showTableDrap = tag
      this.drawer = true
    },
    getLinePoints(x1, y1, x2, y2) {
      let points = []
      let dx = x2 - x1
      let dy = y2 - y1
      if (dx > 0 && dy >= 0) {
        let xl = parseInt(dy / dx)
        for (let i = x1; i <= x2; i++) {
          for (let j = y1; j < y2; j++) {
            if (i === x1 && j === y1) {
              points.push(i, j)
            } else {
              let currentXl = parseInt((j - y1) / (i - x1))
              if (xl == currentXl) {
                points.push(i, j)
              }
            }
          }
        }
      }

      return points
    },

    // 辗转相除法求最大公约数
    getGreatestCommonDivisor(a, b) {
      while (b !== 0) {
        const temp = b
        b = a % b
        a = temp
      }
      return a
    }
  }
}
</script>
<style scoped>
h1 {
  cursor: pointer;
  color: #6084bb;
}
</style>
