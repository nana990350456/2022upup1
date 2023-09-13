<template>
  <div id="app">
    <div v-if="$route.name !== 'navHome'" class="nav" @click="toJumpNav">
      页面导航
    </div>
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
  width: 46px;
  height: 46px;
  background: #fff;
  text-align: center;
  border-radius: 30%;
  box-shadow: 0px 0px 15px #fff;
  color: #817f7f;
}
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
