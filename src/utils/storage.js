// 判断是否是对象的方法
function isObject(target) {
    return null !== target && typeof target === 'object'
  }
  
  // 存储数据
export const setStorage = (key, value)=> {
    // value 是基本数据类型的话，可以直接进行存储
    // 如果 value 是引用的类型的话，需要将 value 转成字符串的形式
    // if(null !== value && typeof value === 'object') {
    //     value = JSON.stringify(value)
    // }
    if (isObject(value)) {
      value = JSON.stringify(value)
    }
    localStorage.setItem(key, value)
  }
  
  // 获取数据
 export const getStorage=(key)=> {
    // 需要将获取到的值，转回去
    const data = localStorage.getItem(key)
    // data 此时是一个字符串
    // 'cc' '{ "name": "cc" }'
    // 如何判断 data 是一个普通的字符串，还是一个json格式的字符串？
    // try catch 是一个程序运行的捕错机制
    try {
      return JSON.parse(data)
    } catch (error) {
      return data
    }
  }