<template>
  <div class="svgBox">
    <SVGCom :currentSvgData="currentSvgData1" />
    <SVGCom :currentSvgData="currentSvgData2" />

    <button @click="highlightCircle">Highlight Circle</button>
  </div>
</template>

<script>
import SVGCom from './SVGCom.vue'
export default {
  name: 'JjjjSvgtu',
  components: {
    SVGCom
  },
  data() {
    return {
      currentSvgData1: {
        d: 'M 10 50 L 40 20 L 300 20',
        id: 'id111',
        top: '0px'
      },
      currentSvgData2: {
        d: 'M 10 30 L 40 20 L 300 20 L330 40 L360 40',
        id: 'id22',
        top: '20px'
      }
    }
  },

  mounted() {},

  methods: {
    highlightCircle() {
      var circle1 = document.getElementById('id22')
      var circle2 = document.getElementById('id111')
      circle1.style.stroke = 'yellow'
      circle2.style.stroke = 'yellow'
    }
  }
}
</script>
<style lang="scss">
.svgBox {
  width: 500px;
  height: 500px;
  border: 1px solid green;
  position: relative;

  button {
    margin: 400px;
  }
}
</style>
