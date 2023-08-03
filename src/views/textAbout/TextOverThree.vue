<template>
  <div class="container">
    <!-- 三行显示省略号 -->
    <div class="list" v-for="(item, index) in dataList" :key="index">
      <TextOverFlowThree :showContent="item.text"></TextOverFlowThree>
    </div>
    <MyCollapse :collLists="collLists" />
  </div>
</template>

<script>
import MyCollapse from './my-collapse.vue'
export default {
  components: {
    MyCollapse
  },
  data() {
    return {
      collLists: [
        {
          name: '标题1',
          content:
            '与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；'
        },
        {
          name: '标题2',
          content:
            '控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；'
        },
        {
          name: '标题3',
          content:
            '清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；'
        },
        {
          name: '标题4',
          content:
            '用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；'
        }
      ],
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
