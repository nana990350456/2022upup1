<template>
  <div class="text-over-tooltip">
    <el-tooltip
      :effect="effect"
      :disabled="isShowTooltip"
      :content="content"
      :placement="placement"
    >
      <div
        class="isEllipsis"
        :class="className"
        @mouseover="onMouseOver(refName)"
      >
        <span :ref="refName">{{ content }}</span>
      </div>
    </el-tooltip>
  </div>
</template>

<script>
export default {
  name: 'TextOverTooltip',
  props: {
    // 显示的文字内容
    content: String,
    // 设置父元素的样式：比如宽度字体等，需可以自己在组件内部配置样式比如字体大小20：fs20
    className: String,
    // 子元素标识（如在同一页面中调用多次组件，此参数不可重复）
    refName: String,
    // 默认提供的主题 dark/light
    effect: {
      type: String,
      default: () => {
        return 'light'
      }
    },
    // Tooltip 的出现位置top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end
    placement: {
      type: String,
      default: () => {
        return 'top'
      }
    }
  },
  data() {
    return {
      isShowTooltip: true // 是否需要禁止提示
    }
  },
  methods: {
    // 移入事件: 判断内容的宽度contentWidth是否大于父级的宽度
    onMouseOver(str) {
      let parentWidth = this.$refs[str].parentNode.offsetWidth
      let contentWidth = this.$refs[str].offsetWidth
      // 判断是否禁用tooltip功能
      this.isShowTooltip = contentWidth <= parentWidth
    }
  }
}
</script>

<style lang="scss" scoped>
.text-over-tooltip {
  /* 文字超出宽度显示省略号 单行*/
  .isEllipsis {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* 自定义样式 */
  .fs14 {
    width: 200px;
    font-size: 14px;
    font-weight: 600;
    color: #606266;
    line-height: 22px;
  }
}
</style>
