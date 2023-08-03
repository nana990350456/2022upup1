<template>
  <div class="wrap">
    <div :class="textOver && !btnFold ? 'inner over' : 'inner'" ref="divRef">
      <span class="content" ref="spanRef">{{ showContent }}</span>
    </div>
    <span class="btn" v-if="textOver" @click="btnFold = !btnFold">{{
      btnFold ? '收起' : '展开'
    }}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      textOver: false, //文本是否超出3行
      btnFold: false //按钮默认显示展开
    }
  },
  props: {
    showContent: {
      type: String,
      default: ''
    }
  },
  created() {
    this.$nextTick(() => {
      // 判断文本是否超过3行
      if (this.$refs.divRef) {
        let descHeight = window
          .getComputedStyle(this.$refs.divRef)
          .height.replace('px', '')
        console.log('descHeight:' + descHeight)
        if (descHeight > 60) {
          this.textOver = true
        } else {
          this.textOver = false
        }
      }
    })
  },
  mounted() {},
  methods: {}
}
</script>

<style scoped>
.wrap {
  padding-bottom: 30px;
}
.over {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
.btn {
  font-size: 14px;
  color: rgb(75, 75, 216);
  float: right;
  cursor: pointer;
  margin-top: 10px;
}
</style>
