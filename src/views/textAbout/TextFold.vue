<template>
  <div>
    <TextOverFlow :content="longText" overflow placement="top">
      <div class="textOne">
        <span>{{ longText }}</span>
      </div>
    </TextOverFlow>
    <div class="bg"></div>
    <el-button type="primary" @click="openCard"
      >使用构造器打开弹框Vue.extend</el-button
    >
    <el-button type="primary" @click="closeBtn">关闭</el-button>
    <div class="cardBox"></div>
  </div>
</template>

<script>
import CommonCardSmall from '@/components/commonCardSmall/index.vue'
import Vue from 'vue'
const CommonCardSmallTemp = Vue.extend(CommonCardSmall)
export default {
  name: 'JjjjTextFold',
  data() {
    return {
      longText: '为了更贴近原生 boolea',
      cardTemp: null
    }
  },

  mounted() {},

  methods: {
    closeBtn() {
      this.cardTemp.$destroy()
    },
    openCard() {
      const cardBoxDom = document.querySelector('.cardBox')
      const cardDom = document.createElement('div')
      cardDom.id = 'cardContainerId'
      cardBoxDom.appendChild(cardDom)

      // 创建卡片模板
      this.cardTemp = new CommonCardSmallTemp({
        propsData: {
          //传递的props
          message: 'Hello World'
        },
        methods: {
          changColor(val) {
            console.log(val, '得到的')
            const dom = document.querySelector('.cardBox')
            dom.style.borderColor = val || '#000'
            //模板里面可以调用这个函数
          }
        }
      })
      // 创建弹窗模板，并挂载到一个元素上。
      this.cardTemp.$mount('#cardContainerId')
    }
  }
}
</script>

<style lang="scss" scoped>
.textOne {
  width: 200px;
  background-color: pink;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.bg {
  width: 100px;
  height: 100px;
  background: url('~@/assets/logo.png');
}
.cardBox {
  margin: 20px;
  width: 500px;
  height: 300px;
  border: 10px dashed;
  border-color: lightblue;
}
</style>
