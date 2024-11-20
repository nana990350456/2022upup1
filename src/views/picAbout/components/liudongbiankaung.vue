<template>
  <div>
    流动边框
    <div class="imgBox" id="imgBox">
      <div class="img"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'JjjjLiudongbiankaung',

  data() {
    return {}
  },

  mounted() {},

  methods: {}
}
</script>
<style lang="scss">
.imgBox {
  width: 200px;
  height: 300px;

  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border-radius: 20px;
  margin: 100px auto;
  overflow: hidden;
  z-index: 0;
  .img {
    position: absolute;
    z-index: 3;
    width: 96%;
    height: 96%;
    border-radius: 20px;
    background: url('~@/assets/beiying1.png');
    background-size: 100% 100%;
  }
  &::before {
    content: '';
    position: absolute;
    width: 500px;
    height: 500px;
    background-image: conic-gradient(
      transparent,
      transparent,
      transparent,
      green
    );
    animation: rotates 4s linear infinite;
    border-radius: 20px;
  }
  &::after {
    content: '';
    position: absolute;
    width: 500px;
    height: 500px;
    background-image: conic-gradient(
      transparent,
      transparent,
      transparent,
      pink
    );
    animation: rotates 4s linear infinite;
    animation-delay: -2s;
    border-radius: 20px;
  }
}
@keyframes rotates {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
