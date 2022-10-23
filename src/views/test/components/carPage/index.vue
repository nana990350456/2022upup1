<template>
  <div>
     
    <div style="margin: 7px auto; width: 200px">
      <button @click="addGoods">新增商品</button>
    </div>
    <ul>
      <li
        v-for="item in goodsList"
        :key="item.id"
        class="goods-box"
        :style="{ 'pointer-events': item.isEffective ? 'auto' : ' none' }"
      >
        <input type="checkbox" v-model="item.selected" />
        <img :src="item.picture" alt="" />
        <div class="goods-title">
          <h4>{{ item.name }}</h4>
          <p>{{ item.attrsText }}</p>
        </div>

        <div class="price">
          <span>{{ item.nowPrice }}</span>
          <div>
            <button @click="cutNum(item)" :disabled="item.count === 1">
              -
            </button>
            <input type="num" class="num" v-model="item.count" />
            <button @click="addNum(item)">+</button>
          </div>
          <div><span>￥</span>{{ item.count * item.nowPrice }}</div>
        </div>
        <p class="disabled-goods" v-if="!item.isEffective">失效商品</p>
        <!-- 操作 -->
        <div>
          <button @click="delGoods(item)">删除</button>
          <button @click="edit(item)">修改</button>
        </div>
      </li>
    </ul>
   
    <!-- 底部操作栏 -->
    <div class="footer">
      <div>
        <input type="checkbox" v-model="Allchecked" />
        <span>全选</span>
      </div>
      <div class="pay">
        <p>共计{{ allNum }}件商品，已选择{{ checkNum }}件，</p>
        <p>
          商品总价：<span>￥</span><span>{{ AllPrice }}</span>
        </p>
        <button @click="pay">下单结算</button>
      </div>
    </div>
  </div>
</template>

<script>
// import { getList, delGoodsById } from '@/api/common.js'
export default {
  name: 'CarIndex',

  data() {
    return {
      goodsList: [
        {
          attrsText: '颜色:白粉/紫 尺码:22 ',
          count: 1,
          discount: null,
          id: '1',
          isCollect: false,
          isEffective: true,
          name: '新款LOGO印花时尚学步叫叫鞋',
          nowOriginalPrice: '259.00',
          nowPrice: '259.00',
          picture:
            'https://yanxuan-item.nosdn.127.net/841d7669e6cc23cb249f47d8d39fc17c.jpg',
          postFee: 3,
          price: '259.00',
          selected: true,
          skuId: '300485161',
          specs: [],
          stock: 9834
        },
        {
          attrsText: '颜色:白粉/紫 尺码:22 ',
          count: 1,
          discount: null,
          id: '2',
          isCollect: false,
          isEffective: true,
          name: '新款LOGO印花时尚学步叫叫鞋',
          nowOriginalPrice: '259.00',
          nowPrice: '259.00',
          picture:
            'https://yanxuan-item.nosdn.127.net/841d7669e6cc23cb249f47d8d39fc17c.jpg',
          postFee: 3,
          price: '259.00',
          selected: true,
          skuId: '300485161',
          specs: [],
          stock: 9834
        },
        {
          attrsText: '颜色:白粉/紫 尺码:22 ',
          count: 1,
          discount: null,
          id: '3',
          isCollect: false,
          isEffective: true,
          name: '新款LOGO印花时尚学步叫叫鞋',
          nowOriginalPrice: '259.00',
          nowPrice: '259.00',
          picture:
            'https://yanxuan-item.nosdn.127.net/841d7669e6cc23cb249f47d8d39fc17c.jpg',
          postFee: 3,
          price: '259.00',
          selected: true,
          skuId: '300485161',
          specs: [],
          stock: 9834
        }
      ]
    }
  },
  created() {
    // this.loadList()
  },
  computed: {
    Allchecked: {
      get() {
        return this.goodsList.every((item) => item.selected)
      },
      set(val) {
        this.goodsList.forEach((item) => (item.selected = val))
      }
    },
    AllPrice() {
      //   const newList= this.goodsList.filter(item=>item.isEffective)
      //   console.log(newList);
      //  const allprice=  newList.reduce((sum,curr)=>{
      //   return sum+curr.count* parseInt(curr.price)
      //   },0)
      //   console.log(allprice);
      //  return allprice
      return this.goodsList
        .filter((item) => item.isEffective && item.selected)
        .reduce((sum, curr) => sum + curr.count * curr.price, 0)
    },
    allNum() {
      return this.goodsList.reduce((sum, curr) => sum + curr.count, 0)
    },
    checkNum() {
      return this.goodsList
        .filter((item) => item.selected)
        .reduce((sum, curr) => sum + curr.count, 0)
    }
  },
  methods: {
    // async loadList() {
    //   const res = await getList()
    //   this.goodsList = res.data.result
    //   console.log(res.data.result, 'res')
    // },
    // 加加
    async addNum(item) {
      this.goodsList.forEach((obj) => {
        obj.id === item.id ? obj.count++ : obj.count
      })
    },
    // 减减
    cutNum(item) {
      console.log('减')
      this.goodsList.forEach((obj) => {
        obj.id === item.id && obj.count > 1 ? obj.count-- : obj.count
      })
    },
    // 删除
    delGoods(item) {
      const index = this.goodsList.findIndex((obj) => obj.id === item.id)
      const res = window.confirm('您是否要删除吗')
      if (res) {
        this.goodsList[index].isEffective = false
        this.goodsList[index].selected = false
        this.goodsList[index].count = 1
        // this.goodsList.splice(index,1)
      }
    },
    // 新增商品
    addGoods() {},
    //修改
    edit(item) {
      console.log(item)
    },
    // 结算
    pay(){
  // console.log(11111);
  // 判断是否有选中的
  // console.log(this.checkNum);
  if(!this.checkNum)return alert('请先选中商品再结算')
  // console.log('跳转到地址页，未登录的话跳转到登录页面');
  this.$router.push('table')
    }
  }
}
</script>

<style lang="less" scoped>
ul {
  li {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-around;
    border: 1px solid green;
    list-style: none;
    height: 200px;
    width: 1000px;
    input {
      margin: 0 20px;
    }
    img {
      height: 200px;
    }
    .goods-title {
      width: 250px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-left: 10px;
      h4 {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    .price {
      width: 200px;
      justify-content: space-between;
      display: flex;
    }
    .num {
      width: 20px;
      margin: 0 -1px;
    }
    .disabled-goods {
      position: absolute;
      right: 16px;
      top: 10px;
      border: 1px solid red;
    }
  }
}
.footer {
  box-sizing: border-box;
  width: 1000px;
  border: 1px solid green;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 40px;
  padding: 0 30px;
  .pay {
    display: flex;
    align-items: center;
    button {
      margin-left: 10px;
    }
  }
}
</style>
