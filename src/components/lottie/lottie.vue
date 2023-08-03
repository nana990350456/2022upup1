<template>
  <div>
    <div :id="id" :style="{ width, height }" />
  </div>
</template>

<script>
export default {
  name: 'LottiePage',
  props: {
    id: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: ''
    },
    height: {
      type: String,
      default: ''
    },
    src: {
      type: String,
      default: null
    }
  },

  data() {
    return {}
  },

  mounted() {
    this.$nextTick(() => {
      this.openAnimation()
    })
  },

  methods: {
    openAnimation() {
      this.$lottie.loadAnimation({
        container: document.getElementById(this.id), //当前需要渲染的DOM
        renderer: 'svg', //渲染方式，默认为svg,还可以渲染为html和canvas
        loop: true, //循环播放
        autoplay: true, //自动播放
        // animationData和path二选一
        animationData: this.src //本地动画
        //    path:''//网络json地址
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
