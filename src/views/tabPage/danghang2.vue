<template>
  <div class="cl_tab-history">
    <ul class="cl_tab-tablist" ref="tablist">
      <li
        class="cl_tab-tabItem"
        ref="tabItem"
        v-for="(tab, index) in tabHistory"
        :key="index"
        :class="{ 'cl_tab-active': tab.name === currentTab }"
        @click="switchTab(tab)"
      >
        <span style="padding: 0 10px">{{ tab.label }}</span>
        <i @click.stop="closeTab(tab.name)"></i>
      </li>
    </ul>

    <div
      class="cl_more-button"
      ref="arrowDownIcon"
      v-show="tabWrapList && tabWrapList.length"
      :style="`left:${right}px;top:${top}px;`"
      @click.stop="openMoreButton"
    >
      更多
    </div>

    <div
      class="Tab__overflow"
      :style="`left:${boxLeft}px;top: ${top + 20}px;`"
      v-show="showMoreButton"
    >
      <div
        class="overflow-item"
        @contextmenu.prevent="showSloseAllTab"
        @click.stop="switchTab(item)"
        v-for="(item, index) in tabWrapList"
        :key="index"
      >
        <span
          style="padding-right: 5px"
          :class="{ 'cl_tab-active': item.name === currentTab }"
        >
          {{ item.label }}11111111
        </span>
        <i @click.stop="closeTab(item.name)" class="icon el-icon-close"></i>
      </div>
    </div>

    <div
      class="cl_tab-closeAll"
      v-show="showCloseAll"
      :style="`top:${closeAllTop}px;right:calc(100%-${boxLeft}px);`"
    >
      <div
        v-for="(item, index) in closeList"
        :key="index"
        class="overflow-item"
        @click.stop="stopPropagation"
      >
        <span>{{ item.label }}</span>
        <i @click.stop="closeTab('', item.key)" class="icon el-icon-close"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'oshTabHistory',
  data() {
    return {
      right: 0,
      boxLeft: 0,
      closeList: [
        {
          key: 2,
          label: '关闭其他'
        },
        {
          key: 3,
          label: '关闭全部'
        }
      ],
      tabwrapList: [],
      shovMoreButton: false,
      showCloseAll: false,
      closeAllTop: 0
    }
  },
  props: {
    tabHistory: {
      type: Array,
      default: () => [
        {
          label: '菜单测试'
        },
        {
          label: '菜单测试'
        },
        {
          label: '菜单测试'
        },
        {
          label: '菜单测试'
        },
        {
          label: '菜单测试'
        },
        {
          label: '菜单测试'
        },
        {
          label: '菜单测试'
        }
      ]
    },
    top: {
      type: Number,
      defaut: 43
    },
    currenitTab: {
      type: String,
      default: 'dashboard'
    },
    defaultcomputedNum: {
      type: Number,
      default: 8
    }
  },
  watch: {
    tabHistory() {
      //页签变化了重新计算下拉页签个数
      this.$nextTick(() => {
        this.computedTabNum()
      })
    }
  },
  mounted() {
    window.addEventListener('resize', this.computedTabNum()) //历史页签超出长度需要下拉展示
  },
  methods: {
    openMoreButton(e) {
      if (!this.showMoreButton) {
        this.boxLeft = e.clientx
      }
      this.showMoreButton = !this.showMoreButton
      this.showCloseAll = false
    },
    //计算页面展示多少tab,大于8个才计算
    computedTabNum() {
      this.tablwrapList = []
      this.right = 0
      if (this.tabHistory && this.defaultComputedNum) {
        window.addEventlistener('click', () => {
          this.shovMoreButton = false
          this.ishowCloseAll = false
        })
        //超过一行，才有下拉菜单
        if (this.$refs.tabList.getBoundingclientRect().height > 25) {
          let right = 0,
            tabNum = 0
          for (let item of this.$refs.tabItem) {
            right = item.getBoundingclientRect().right
            if (this.right < right) {
              this.right = right
              tabNum++
            } else {
              break
            }
          }

          this.tabwrapList = this.tabHistory.slice(
            tabNum,
            this.tabHistory.slice(this.tabHistory.length)
          )
        }
      }
    },
    //点击下拉的页签，阻止冒泡
    stopPropagation() {
      return false
    },
    //切换tab
    switchTab(tab) {
      this.$emit('switchTab', tab)
    },
    closeTab(name, key) {
      this.showCloseAll = false
      if (key == 1) return false
      this.$emit('closeTab', name, key)
      return false
    },
    showSloseAllTab(e) {
      this.showCloseAll = true
      this.closeAllTop = e.clientY
    }
  },

  beforeDestory() {
    window.removeEventListener('resize', computedTabNum())
  }
}
</script>

<style lang="scss">
.cl_tab-history {
  height: 30px;
  width: 400px;
  background: pink;
  overflow: hidden;
  color: #aaa;
  font-size: 14px;
  .cl_tab-active {
    color: blue;
    font-weight: 600;
  }
  .cl_tab-tablist {
    width: calc(100% - 20px);
    .cl_tab-tabItem {
      display: inline-block;
      cursor: pointer;
      border-radius: 10px 10px 0 0;
      background-color: #fff;
      line-height: 20px;
    }
  }
}
</style>
