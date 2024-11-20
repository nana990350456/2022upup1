<template>
  <div>
    mock数据
    {{ res }}
    <el-progress
      type="dashboard"
      :percentage="50"
      :stroke-width="26"
      :text-inside="false"
      :format="format"
    ></el-progress>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'JjjjMockData',

  data() {
    return {
      res: null
    }
  },

  mounted() {
    this.init()
  },

  methods: {
    format(percentage) {
      return percentage === 100 ? '已完成' : `${percentage}%`
    },
    init() {
      axios
        .post('/data/list')
        .then((res) => {
          console.log(res)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-progress__text {
  display: block;
  font-size: 20px;
  color: #1f2d3d;
}
</style>
