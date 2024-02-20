<template>
  <div>
    <h3>1.jiaminghi/data-view插件滚动测试2</h3>
    <dv-scroll-board
      :config="config"
      style="width: 500px; height: 220px; margin-top: 30px"
    />
    <h3>2.vue-seamless-scroll插件滚动(滚动最后一页有空白，暂时无法解决)</h3>
    <vue-seamless-scroll
      :data="listData"
      :class-option="classOption"
      class="warp"
      @ScrollEnd="ScrollEnd"
      ref="vueScrollRef"
    >
      <ul class="item">
        <li v-for="(item, index) in listData" :key="index">
          <span class="title" v-text="item.title"></span>
          <span class="date" v-text="item.date"></span>
        </li>
      </ul>
    </vue-seamless-scroll>

    <h3>3.自己手动写页面滚动</h3>
    <ScrollPlug class="box" :speed="0.5">
      <div class="list">
        <div class="item" v-for="item in list" :key="item.xh">
          <span>{{ item.xh }}</span
          ><span>{{ item.label }}</span>
        </div>
      </div>
    </ScrollPlug>
  </div>
</template>

<script>
import VueSeamlessScroll from 'vue-seamless-scroll'
import ScrollPlug from './components/scrollPlug.vue' //手写无缝滚动
export default {
  name: 'ScrollPage',
  provide: {
    provideName: '祖孙传值'
  },
  components: {
    VueSeamlessScroll,
    ScrollPlug
  },

  data() {
    return {
      config: {
        data: [
          ['行1列1', '行1列2', '行1列3'],
          ['行2列1', '行2列2', '行2列3'],
          ['行3列1', '行3列2', '行3列3'],
          ['行4列1', '行4列2', '行4列3'],
          ['行5列1', '行5列2', '行5列3'],
          ['行6列1', '行6列2', '行6列3'],
          ['行7列1', '行7列2', '行7列3'],
          ['行8列1', '行8列2', '行8列3'],
          ['行9列1', '行9列2', '行9列3'],
          ['行10列1', '行10列2', '行10列3']
        ]
      },
      listData: [
        {
          title: '无缝滚动第一行无缝滚动第一行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第二行无缝滚动第二行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第二行无缝滚动第二行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第二行无缝滚动第二行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第二行无缝滚动第二行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第二行无缝滚动第二行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第二行无缝滚动第二行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第二行无缝滚动第二行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第三行无缝滚动第三行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第四行无缝滚动第四行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第五行无缝滚动第五行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第六行无缝滚动第六行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第七行无缝滚动第七行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第八行无缝滚动第八行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第九行无缝滚动第九行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第一行无缝滚动第一行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第二行无缝滚动第二行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第二行无缝滚动第二行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第二行无缝滚动第二行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第二行无缝滚动第二行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第二行无缝滚动第二行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第二行无缝滚动第二行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第二行无缝滚动第二行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第三行无缝滚动第三行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第四行无缝滚动第四行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第五行无缝滚动第五行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第六行无缝滚动第六行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第七行无缝滚动第七行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第八行无缝滚动第八行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第九行无缝滚动第九行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第一行无缝滚动第一行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第二行无缝滚动第二行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第二行无缝滚动第二行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第二行无缝滚动第二行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第二行无缝滚动第二行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第二行无缝滚动第二行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第二行无缝滚动第二行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第二行无缝滚动第二行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第三行无缝滚动第三行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第四行无缝滚动第四行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第五行无缝滚动第五行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第六行无缝滚动第六行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第七行无缝滚动第七行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第八行无缝滚动第八行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第九行无缝滚动第九行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第一行无缝滚动第一行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第二行无缝滚动第二行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第二行无缝滚动第二行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第二行无缝滚动第二行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第二行无缝滚动第二行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第二行无缝滚动第二行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第二行无缝滚动第二行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第二行无缝滚动第二行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第三行无缝滚动第三行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第四行无缝滚动第四行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第五行无缝滚动第五行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第六行无缝滚动第六行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第七行无缝滚动第七行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第八行无缝滚动第八行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第九行无缝滚动第九行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第一行无缝滚动第一行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第二行无缝滚动第二行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第二行无缝滚动第二行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第二行无缝滚动第二行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第二行无缝滚动第二行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第二行无缝滚动第二行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第二行无缝滚动第二行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第二行无缝滚动第二行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第三行无缝滚动第三行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第四行无缝滚动第四行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第五行无缝滚动第五行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第六行无缝滚动第六行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第七行无缝滚动第七行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第八行无缝滚动第八行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第九行无缝滚动第九行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第一行无缝滚动第一行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第二行无缝滚动第二行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第二行无缝滚动第二行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第二行无缝滚动第二行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第二行无缝滚动第二行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第二行无缝滚动第二行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第二行无缝滚动第二行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第二行无缝滚动第二行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第三行无缝滚动第三行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第四行无缝滚动第四行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第五行无缝滚动第五行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第六行无缝滚动第六行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第七行无缝滚动第七行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第八行无缝滚动第八行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第九行无缝滚动第九行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第一行无缝滚动第一行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第二行无缝滚动第二行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第二行无缝滚动第二行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第二行无缝滚动第二行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第二行无缝滚动第二行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第二行无缝滚动第二行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第二行无缝滚动第二行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第二行无缝滚动第二行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第三行无缝滚动第三行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第四行无缝滚动第四行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第五行无缝滚动第五行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第六行无缝滚动第六行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第七行无缝滚动第七行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第八行无缝滚动第八行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第九行无缝滚动第九行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第一行无缝滚动第一行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第二行无缝滚动第二行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第二行无缝滚动第二行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第二行无缝滚动第二行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第二行无缝滚动第二行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第二行无缝滚动第二行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第二行无缝滚动第二行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第二行无缝滚动第二行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第三行无缝滚动第三行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第四行无缝滚动第四行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第五行无缝滚动第五行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第六行无缝滚动第六行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第七行无缝滚动第七行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第八行无缝滚动第八行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第九行无缝滚动第九行',
          date: '2017-12-16'
        }
      ],
      list: new Array(10)
        .fill(1)
        .map((s, i) => ({ xh: i + 1, label: 'hello wrold' }))
    }
  },
  computed: {
    classOption() {
      return {
        step: 0.2, //数值越大速度滚动越快
        limitMoveNum: this.listData.length, //开始无缝滚动的数据量
        hoverStop: true, //是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, //开启数据实时监控刷新dom
        singleHeight: 0, //单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, //单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000 //单步运动停止的时间(默认值1000ms)
      }
    }
  },

  mounted() {
    console.log(this.$children, '子组件')
  },

  methods: {
    ScrollEnd() {
      this.$refs.vueScrollRef.clearTime() //停止滚动
      this.$refs.vueScrollRef.reset()
    }
  }
}
</script>

<style lang="scss" scoped>
.warp {
  height: 200px !important;
  width: 360px;
  overflow: auto;
  ul {
    list-style: none;
    padding: 0;
    margin: 0 auto;
    li,
    a {
      display: block;
      height: 30px;
      line-height: 30px;
      display: flex;
      justify-content: space-between;
      font-size: 15px;
    }
  }
}
.box {
  width: 400px;
  height: 180px;
  overflow: auto;
}
.list {
  padding: 0 10px;
  width: 300px;
  .item {
    display: flex;
    justify-content: space-between;
    padding: 5px 0;
    cursor: pointer;
    &:hover {
      background-color: #95a5a6;
    }
  }
}
</style>
