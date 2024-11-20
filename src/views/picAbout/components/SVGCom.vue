<template>
  <svg width="400" height="50" class="svg" :style="{ top: currentSvgData.top }">
    <path
      :id="currentSvgData.id"
      :d="currentSvgData.d"
      stroke="black"
      stroke-width="2"
      fill="none"
    />
  </svg>
</template>

<script>
export default {
  name: 'JjjjSvgtu11111',
  props: {
    currentSvgData: {
      type: Object,
      default: () => {
        return {
          d: 'M 10 50 L 40 20 L 300 20',
          id: 'id111',
          top: '20px'
        }
      }
    }
  },
  data() {
    return {}
  },

  mounted() {},

  methods: {}
}
</script>
<style lang="scss">
.svg {
  position: absolute;
}
</style>
