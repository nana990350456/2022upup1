import api from '@/utils/request.js'
// 获得商品列表
export const getList=(params)=>{
    return api({
      method:'get',
      url:'/member/cart',
      params
    })
  };

  // 删除商品
  export const delGoodsById=(item)=>{
    return api({
      method:'put',
      url:`/member/cart/${item.id}`,
      item
    })
  }
