<template>
  <ul class="collapse">
    <li class="item" v-for="(item, index) in collList" :key="index">
      <p @click="open(index)">
        <img src="/static/svg/tbm.svg" alt="" />
        <span>{{ item.name }}</span>
      </p>
      <div class="Content" ref="liCol">
        <p>{{ item.content }}</p>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  components: {},
  props: ['collLists'],
  data() {
    return {
      liColHeight: 0, // 折叠面板内容初始高度
      collList: this.collLists
    }
  },
  methods: {
    // 项目折叠面板动画效果实现
    open(i) {
      const liCol = this.$refs.liCol[i]
      let height = liCol.offsetHeight //获取要展开元素的高度
      if (height === this.liColHeight) {
        // 展开
        liCol.style.height = 'auto'
        height = liCol.offsetHeight
        liCol.style.height = this.liColHeight + 'px'

        let f = document.body.offsetHeightss // 必加
        liCol.style.height = height + 'px'
      } else {
        // 收缩
        liCol.style.height = this.liColHeight + 'px'
      }
    }
  },
  watch: {
    /* 监听传的值 */
    // collLists(newval, oldval) {
    //   /* 将变化的新值，赋予到要渲染的值 */
    //   this.collList = newval
    // }
  }
}
</script>

<style lang="scss" scoped>
.collapse {
  .item {
    .Content {
      height: 0px;
      overflow: hidden;
      transition: height 0.3s;
    }
  }
}
</style>
