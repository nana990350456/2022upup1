<template>
  <div>
    <!-- 图表 -->
    <!-- <div class="update-demo">
      <dv-percent-pond :config="config" style="width: 200px; height: 100px" />
    </div> -->

    <!-- 轮播图-->
    <dv-scroll-board :config="configData" 
    style="width: 500px; height: 220px" />
<div style="margin-top: 50px;">
      <button type="primary" @click="clickA">{{a}}</button>
<button type="primary" @click="clickB">{{b}}</button>
</div>
<!-- 不具有响应式 -->
<ul>
  <li v-for="(item,i) in obj" :key="i" @click="changeFn(i)" class="red">{{item.n}}</li>
</ul>
{{cc}}
  </div>
</template>

<script>
export default {
  name: 'carousIndex',

  data() {
    return {
        b: false,
        // 在return里面定义对象用object.freeze(object) 此时对象不可更改，不能往里面增加新的属性
        // obj:Object.freeze([{
        //   n:11
        // },
        // {
        //   n:22
        // },
        // {
        //   n:33
        // }]),
              obj:[{
          n:11
        },
        {
          n:22
        },
        {
          n:33
        }],
      config: {
        value: 66,
        lineDash: [10, 2]
      },
      //   轮播图数据
      configData: {
        header: ['列1', '列2', '列3'],
        data: [
          ['<div class="aaa"></div>', '行1列2', '行1列3'],
          ['<div class="aaa"></div>', '行2列2', '行2列3'],
          ['<div class="aaa"></div>', '行3列2', '行3列3'],
          ['<div class="aaa"></div>', '行4列2', '行4列3'],
        ],
        rowNum: 3
      }
    }
  },
 created(){
     this.cc=22

  // 在外面定义变量没有响应式，如果数据很多的时候，
    this.a = false
    // 请求回来的数据可以循环拼接，样式图标到数组，然后push到data
this.configData.data.push(['<div class="aaa"></div>', '行11列2', '行11列3'])
 },
  mounted() {
     this.getFn()
  },

  methods: {
     clickA() {
      this.a = !this.a
      console.log(this.a)
    },
    clickB() {
      this.b = !this.b
      console.log(this.b)
    },
    changeFn(i){
      this.obj[i].n++
    },
    getFn(){
      this.cc=33
    }

  },
   watch: {
    a(newVal) {//此时a不具有响应式，在data外面定义的变量
      console.log(newVal)
    },
    b(newVal) {
      console.log(newVal)
    }
  },

}
</script>

<style lang="less" scoped>
/deep/.dv-scroll-board {
    box-sizing: border-box;
//   width: 562px;
  height: 169px;
  .header{
    width: 562px;
    height: 50px;
  }
  .rows {
    width: 562px;
    .row-item {
         height: 50px;
    }
  }
}
/deep/.aaa {
  display: inline-block;
     width: 30px;
    height: 30px;
    margin: 22px;
  background: url('./bg.png') no-repeat center/80%;
  background-size: cover;
}
.red {
  display: flex;
   justify-content: center;
   align-items: center;
   width: 100px;
  height: 100px;
  border: 1px solid red;
}
</style>
