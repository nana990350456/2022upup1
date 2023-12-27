<template>
  <div>
    mock数据
    {{ res }}
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

<style lang="scss" scoped></style>
