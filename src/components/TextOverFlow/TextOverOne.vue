<script>
import { Tooltip } from 'element-ui'
export default {
  name: 'TextOverFlow',
  extends: Tooltip, // 组件继承
  props: {
    ...Tooltip.props,
    overflow: Boolean // 新增 props 属性
  },
  methods: {
    // 重写show方法
    show() {
      // 执行文字溢出判断逻辑
      if (this.overflow) {
        if (this.$el.scrollWidth <= this.$el.clientWidth) {
          return
        }
      }
      Tooltip.methods.show.call(this) //执行原版的逻辑，绑定当前实例的this
    }
  }
}
</script>
