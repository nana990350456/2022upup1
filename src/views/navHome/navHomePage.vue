<template>
  <div class="navPage">
    <el-button type="primary" @click="$router.go(-1)" class="back"
      >返回</el-button
    >
  </div>
</template>

<script>
export default {
  name: 'JjjjNavHomePage',

  data() {
    return {}
  },

  mounted() {},

  methods: {}
}
</script>

<style lang="scss" scoped>
.navPage {
  width: 100vw;
  height: 100vh;
  background-color: rgba(240, 240, 173, 0.3);
  .back {
    position: absolute;
    right: 20px;
    top: 10px;
  }
}
</style>
