<template>
  <section>
    <div class="toMarkdown">
      <h1>生成markdown</h1>
      <!-- <div v-html="htmlContent"></div> -->
      <div>{{ markdownContent }}</div>
    </div>
    <div class="toHtml">
      <h1>转换成html</h1>
      <div v-html="parsedMarkdownContent"></div>
    </div>
  </section>
</template>

<script>
import { htmlToMarkdown } from './markdownService.js'
import { marked } from 'marked'
import markdownIt from 'markdown-it'

export default {
  data() {
    return {
      htmlContent: '<h1> Hello, World!</h1><p>This is a test.</p>',
      markdownContent: '',
      parsedMarkdownContent: ''
    }
  },
  created() {
    this.convertHtmlToMarkdown()
  },
  methods: {
    convertHtmlToMarkdown() {
      this.markdownContent = htmlToMarkdown(this.htmlContent)
      const markdownText = `
综合以上诊断，该设备存在的异常及可能原因为：

- **状态数据诊断异常**，表现为：铁芯夹件的全电流超出上上限，为499.74(mA)。可能原因为：铁心夹件区域存在多点环流过热，这通常是由于制造阶段未按图纸或工艺施工，导致夹件等金属结构件之间绝缘不良，或是铁心硅钢片残片遗留造成的漆膜破损和环流过热。

- **局放诊断异常**，表现为：难以判断该换流变压器是否存在内部放电，建议跟踪观察并开展带电检测试验。可能原因为：局部放电可能由导线焊接缺陷引发，如焊接处存在毛刺或异物，在运行过程中可能存在偶发性放电。此外，铁轭底部绝缘过热也可能导致局部放电，这可能是由于铁轭长期运行松动，铁心硅钢片间产生间隙，引发级间小环流，导致局部过热。

以上原因分析基于相似案例及检修手册，请结合具体情况进一步分析和处理。**AI诊断码为：黄码**

`
      const md = new markdownIt()
      // this.parsedMarkdownContent = marked.parse(markdownText)
      this.parsedMarkdownContent = md.render(markdownText)
    }
  }
}
</script>
<style lang="scss" scoped>
/* 添加一些样式 */
section {
  display: flex;
  column-gap: 30px;
}
.toMarkdown,
.toHtml {
  width: 500px;
  height: 500px;
  border: 1px solid #67c23a;
  padding: 20px;
}
</style>
