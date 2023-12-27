<template>
  <div class="menu-box">
    <div v-for="(item, ind) in list" :key="item.menuCode + ind">
      <div class="menu-level">
        <div class="menuName">{{ item.name }}</div>
        <MenuSonPageCeshi :list="item.children"></MenuSonPageCeshi>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MenuSonPageCeshi',
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  components: {
    MenuSonPageCeshi: () => import('./MenuSonPageCeshi')
  },
  data() {
    return {
      className: 'menu'
    }
  },
  mounted() {},

  methods: {}
}
</script>

<style lang="scss" scoped>
.menu-box {
  width: 400px;
  display: flex;
  border: 2px solid green;
  .menu-level {
    padding: 12px;
    position: relative;
  }
  .menu-box {
    display: none;
    border: 2px solid green;
    position: absolute;
    top: 100%;
    left: 0;
    padding: 12px;
    width: 200px;
  }
  .menu-box .menu-box {
    left: 100%;
    top: 0;
    position: absolute;
  }
  .menu-level:hover {
    background: pink;
  }
  .menu-level:hover > .menu-box {
    display: block;
  }
}
</style>
