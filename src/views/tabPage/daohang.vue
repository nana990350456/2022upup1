<template>
  <div class="box">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo menuList"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item
        v-for="item in data"
        :key="item.id"
        class="menuItem"
        :index="item.id"
        >{{ item.text }}</el-menu-item
      >
      <el-submenu v-if="moreArr.length > 0" class="menuItem" index="99999">
        <template slot="title">更多</template>
        <el-menu-item v-for="i in moreArr" :key="i.id" :index="i.id">{{
          i.text
        }}</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: '1',
      data: [
        {
          id: '1',
          text: '处理中心'
        },
        {
          id: '2',
          text: '处理中心2ss'
        },
        {
          id: '3',
          text: '处理中心3'
        },
        {
          id: '4',
          text: '处理中心4'
        },
        {
          id: '5',
          text: '处理中心5'
        },
        {
          id: '6',
          text: '处理中心6'
        },
        {
          id: '7',
          text: '处理中心7'
        },
        {
          id: '8',
          text: '处理中心8'
        },
        {
          id: '9',
          text: '处理中心9'
        },
        {
          id: '10',
          text: '处理中心10'
        },
        {
          id: '11',
          text: '处理中心11'
        },
        {
          id: '12',
          text: '处理中心12'
        },
        {
          id: '13',
          text: '处理中心13'
        },
        {
          id: '14',
          text: '处理中心14'
        },
        {
          id: '15',
          text: '处理中心15'
        },
        {
          id: '16',
          text: '处理中心16'
        },
        {
          id: '17',
          text: '处理中心17'
        },
        {
          id: '18',
          text: '处理中心18'
        }
      ],
      newArr: [],
      existing: 0,
      moreArr: [],
      isb: false
    }
  },
  computed: {},
  mounted() {
    let newArr = JSON.parse(JSON.stringify(this.data))
    let menuitem = document.getElementsByClassName('menuItem')
    let widthArr = []
    for (let i = 0; i < menuitem.length; i++) {
      widthArr.push(menuitem[i].clientWidth)
    }
    this.isbeyond(widthArr)
    //更多的数组
    let arr = []
    if (this.existing != 0) {
      arr = newArr.splice(this.existing, newArr.length - 1)
    }
    this.moreArr = arr
    debugger
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    },
    sum(arr) {
      return arr.reduce(function (prev, curr, idx, arr) {
        return prev + curr
      })
    },
    isbeyond(widthArr) {
      let menu = document.getElementsByClassName('menuList')
      if (this.sum(widthArr) > menu[0].clientWidth) {
        this.isb = true
        let newArr = this.data.slice(0, this.data.length - 1)
        let newWidthArr = widthArr.slice(0, this.data.length - 1)
        this.data = newArr
        this.isbeyond(newWidthArr)
      } else {
        if (this.isb) {
          let newArr = this.data.slice(0, this.data.length - 1)
          let newWidthArr = widthArr.slice(0, this.data.length - 1)
          this.data = newArr
          this.existing = newWidthArr.length
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.box {
  background: #fff;
  width: 80%;
  margin: 0 auto;
}
</style>
