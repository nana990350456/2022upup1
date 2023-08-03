// 和本地存储相结合
import { setStorage, getStorage } from '@/utils/storage'

const user = {
  namespaced: true, //开启命名空间
  state: {
    count: getStorage('count') || 1,
    price: 20
  },
  mutations: {
    addCount(state) {
      state.count++
      setStorage('count', state.count)
    },
    loseCount(state) {
      state.count--
      setStorage('count', state.count)
    }
  },
  actions: {}
}
export default user
