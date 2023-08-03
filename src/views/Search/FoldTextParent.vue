<template>
  <div class="container">
    <div class="list" v-for="(item, index) in dataList" :key="index">
      <FoldText :showContent="item.text"></FoldText>
    </div>
  </div>
</template>

<script>
import FoldText from './FoldText'
export default {
  components: {
    FoldText
  },
  data() {
    return {
      dataList: [
        {
          text: `这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字`
        },
        {
          text: '这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字'
        },
        {
          text: '这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字'
        },
        {
          text: '这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字'
        },
        {
          text: 'a little pig a little pig a little pig a little pig a little pig a little pig a little pig a little pig a little pig a little pig a little pig a little pig a little pig a little pig a little pig a little pig a little pig a little pig a little pig a little pig a little pig a little pig a little pig a little pig a little pig '
        },
        {
          text: 'a little pig a little pig a little piga little piga little piga little piga little pig a little pig a little pig a little pig a little pig a little pig a little pig a little pig a little pig a little pig a little pig a little pig a little pig a little pig a little pig a little pig a little pig a little pig a little pig a little pig a little pig a little pig a little pig a little pig '
        }
      ]
    }
  },
  created() {},
  methods: {}
}
</script>

<style scoped>
.container {
  padding: 40px;
}
.list {
  width: 500px;
  height: auto;
  border: 1px solid #ddd;
  border-radius: 5px;
  text-align: left;
  margin-bottom: 20px;
  padding: 8px;
}
</style>
