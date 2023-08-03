<template>
  <div id="app">
    <el-button
      v-if="$route.name !== 'navHome'"
      type="success"
      class="nav"
      @click="toJumpNav"
      >页面导航</el-button
    >
    <!-- 一级路由挂在 -->
    <router-view></router-view>
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <!-- <TableRow /> -->
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import TableRow from './components/tableRow.vue'

export default {
  name: 'App',
  components: {
    // HelloWorld,
    // TableRow
  },
  data() {
    return {}
  },
  mounted() {},
  methods: {
    toJumpNav() {
      this.$router.push({
        name: 'navHome'
      })
    }
  }
}
</script>

<style scoped>
.nav {
  position: absolute;
  right: 30px;
  top: 16px;
  cursor: pointer;
}
</style>
