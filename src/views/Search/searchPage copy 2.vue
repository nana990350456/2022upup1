<template>
  <div>
    <!-- 溢出隐藏 -->
    <TextOverTooltip
      refName="testName"
      className="fs14"
      placement="bottom"
      content="28、如果能够控制自己的悲欢离合，那未必是件好事；因为只有在雨后才会见到彩虹，如果冬天来了，春天还会远吗？如果黑暗来临，光明还会远吗？"
    >
    </TextOverTooltip>
    <div class="nn mm">mmmmmmmmmmmmm</div>
    <div class="father">
      <div class="left">111</div>
      <div class="right">222</div>
    </div>
    json动图
    <div
      style="
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 300px;
        height: 300px;
      "
    >
      <span class="trans">1050</span>
      <div style="position: absolute; top: 10px">
        <LottiePage
          id="searchPageId"
          width="200px"
          height="300px"
          :src="require('@/assets/lottie2.json')"
        />
      </div>
    </div>
  </div>
</template>

<script>
import TextOverTooltip from './TextOverTooltip'
export default {
  name: 'JjjjSearchPage',
  components: {
    TextOverTooltip
  },
  data() {
    return {}
  },

  mounted() {
    this.$nextTick(() => {
      const dd = document.querySelector('.nn.mm')
      console.log(dd, 'dd')
    })
    // 监听father盒子尺寸变化
    this.observeFather()
  },

  methods: {
    observeFather() {
      let fatherWidth = document.querySelector('.father')
      const resizeObserver = new ResizeObserver((entries) => {
        entries.forEach((entry) => {
          console.log('被监听元素content的宽高及位置', entry.contentRect)
          // bottom: 700 指top + height的值
          // height: 600 指元素本身的高度，不包含padding，border值
          // left: 100 指padding-left的值
          // right: 1143 指left + width的值
          // top: 100 指padidng-top的值
          // width: 1043  指元素本身的宽度，不包含padding，border值
          // x: 100
          // y: 100
          console.log('被监听元素的宽高', entry.borderBoxSize)
          // blockSize: 1000
          // inlineSize: 1443
          console.log('被监听元素content部分的宽高', entry.contentBoxSize)
          // blockSize: 600
          // inlineSize: 1043
          console.log('被监听元素', entry.target)
        })
      })
      resizeObserver.observe(fatherWidth)
    }
  }
}
</script>

<style lang="scss" scoped>
.father {
  width: 100%;
  height: 300px;
  background: red;
  display: flex;
  .left {
    flex: 1;
    background: lightgreen;
  }
  .right {
    flex: 2;
    background: lightblue;
  }
}
.trans {
  // width: 100px;
  // height: 100px;
  // background: pink;

  animation: move 2s linear infinite;
  @keyframes move {
    0% {
      transform: translateY(4px);
    }
    50% {
      transform: translateY(0px);
    }
    75% {
      transform: translateY(-4px);
    }
    100% {
      transform: translateY(0px);
    }
  }
}
</style>
