import api from '@/utils/request.js'
// 获得商品列表
export const getList = (params) => {
  return api({
    method: 'get',
    url: '/member/cart',
    params
  })
}

// 删除商品
export const delGoodsById = (item) => {
  return api({
    method: 'put',
    url: `/member/cart/${item.id}`,
    item
  })
}
// 获取图书列表
export const getBookList = (params) => {
  return api({
    method: 'GET',
    url: 'http://123.57.109.30:3006/api/getbooks',
    params
  })
}
