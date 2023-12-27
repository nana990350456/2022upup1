<template>
  <div>
    <p>flat方法</p>
    <p>[1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]]</p>
    <p>值：{{ arr5Last }}</p>
    <h3>时间排序之前：</h3>
    <p>{{ this.firtData[0][0] || '-' }}</p>
    <p>{{ this.firtData[1][0] || '-' }}</p>
    <p>{{ this.firtData[2][0] || '-' }}</p>
    <h3>时间排序之后：</h3>
    <p>{{ this.msgData[0][0] || '-' }}</p>
    <p>{{ this.msgData[1][0] || '-' }}</p>
    <p>{{ this.msgData[2][0] || '-' }}</p>
  </div>
</template>

<script>
export default {
  name: 'JjjjFilePageTwo',

  data() {
    return {
      arr5Last: [],
      firtData: [
        [
          { id: '1', date: '2020-11-21  15:16:09' },
          { id: '2', date: '2020-11-22  10:11:06' },
          { id: '3', date: '2020-11-24  15:32:06' }
        ],
        [
          { id: '4', date: '2021-11-21  15:16:09' },
          { id: '5', date: '2021-11-22  10:11:06' },
          { id: '6', date: '2021-11-24  15:32:06' }
        ],
        []
      ],
      msgData: []
    }
  },

  mounted() {
    // this.cesi()
    // this.dier()
    this.timeDate()
  },

  methods: {
    timeDate() {
      let time1 = this.firtData[0][0] ? Date.parse(this.firtData[0][0].date) : 1
      let time2 = this.firtData[1][0] ? Date.parse(this.firtData[1][0].date) : 2
      let time3 = this.firtData[2][0] ? Date.parse(this.firtData[2][0].date) : 3
      let timeArr = [
        {
          id: 0,
          time: time1
        },
        {
          id: 1,
          time: time2
        },
        {
          id: 2,
          time: time3
        }
      ]

      timeArr.sort((a, b) => {
        //  b-a 就是后边的值减前边的值    降序
        return b.time - a.time
      })
      let lastArr = []
      for (let i = 0; i < timeArr.length; i++) {
        let index = timeArr[i].id
        lastArr.push(this.firtData[index])
      }
      this.msgData = lastArr
    },
    dier() {
      let arr = [
        {
          a: false,
          child: [
            {
              a: true,
              b: 2
            },
            {
              a: false,
              b: 3
            }
          ]
        },
        {
          a: true,
          child: [
            {
              a: true,
              b: 2,
              child: [
                {
                  a: true,
                  b: 4
                },
                {
                  a: false,
                  b: 4
                }
              ]
            },
            {
              a: true,
              b: 3
            }
          ]
        },
        {
          a: false,
          child: [
            {
              a: false,
              b: 2
            },
            {
              a: false,
              b: 3
            }
          ]
        }
      ]
      const menus = this.filterMenu(arr)
      console.log(menus, 'pppppppppppppppppp')
      let bbb = [1, 2, 3]
      bbb.splice(1, 0, [9, 8])
      console.log(bbb, 'llllllllllllll')
    },
    // 递归
    filterMenu(menuList) {
      return menuList
        .filter((item) => {
          return item.a == true
        })
        .map((item) => {
          item = Object.assign({}, item)
          if (item.child && item.child.length > 0) {
            item.child = this.filterMenu(item.child)
          }
          return item
        })
    },
    cesi() {
      let arr = [
        { id: 1, name: '张三', age: 20 },
        { id: 1, name: '张三', age: 20 },
        { id: 2, name: '李四', age: 20 },
        { id: 3, name: '马五', age: 20 }
      ]
      let forData = []
      for (let i = 0; i < arr.length; i++) {
        if (!forData.some((e) => e.id == arr[i].id)) forData.push(arr[i])
      }
      console.log('输出结果:', forData)

      //
      const arr1 = [1, 2, [3, 4]]
      arr1.flat() //不传默认第一层
      // [1, 2, 3, 4]

      const arr2 = [1, 2, [3, 4, [5, 6]]]
      arr2.flat()
      // [1, 2, 3, 4, [5, 6]]

      const arr3 = [1, 2, '', [3, 4, [5, 6]]]
      arr3.flat(2)
      // [1, 2, 3, 4, 5, 6] //当数组里面有空项的时候，会过滤掉空值

      const arr4 = [1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]]
      arr4.flat(Infinity) //相当于扁平化最深层次的数组
      // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      const arr5 = [1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]]
      this.arr5Last = this.digui(arr5)
      let nnn = Array(7).fill({ a: 1 }) //快速填充数组
    },
    digui(list) {
      return list.reduce((pre, item) => {
        return pre.concat(Array.isArray(item) ? this.digui(item) : item)
      }, [])
    }
  }
}
</script>

<style lang="scss" scoped></style>
