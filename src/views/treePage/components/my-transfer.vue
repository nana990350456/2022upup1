<template>
  <div>
    <el-transfer
      filterable
      :filter-method="filterMethod"
      filter-placeholder="请输入城市拼音"
      v-model="value"
      :data="data"
    >
    </el-transfer>
    <div ref="file"></div>
  </div>
</template>

<script>
// var docx = require('docx-preview')

export default {
  name: 'MyTransfer',
  data() {
    return {
      data: [
        {
          label: '上海',
          key: 111,
          pinyin: 'shanghai'
        },
        {
          label: '北京',
          key: 1,
          pinyin: 'beijing'
        },
        {
          label: '广州',
          key: 2,
          pinyin: 'guangzhou'
        },
        {
          label: '深圳',
          key: 3,
          pinyin: 'shenzhen'
        },
        {
          label: '南京',
          key: 4,
          pinyin: 'nanjing'
        },
        {
          label: '西安',
          key: 5,
          pinyin: 'xian'
        },
        {
          label: '成都',
          key: 6,
          pinyin: 'chengdu'
        }
      ],
      value: [],
      filterMethod(query, item) {
        return item.pinyin.indexOf(query) > -1
      }
    }
  },
  watch: {
    value: {
      handler(val, oldval) {
        debugger
      }
    }
  },
  mounted() {
    console.log(this.data, 'kkkkkkkkk')
    this.data.forEach((item) => {})
  }
}
</script>
