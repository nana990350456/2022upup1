 export const arrList=[
]

function  pointArrayFn(arr) {
    // 创建空白的二维数组
    let result = Array(640)
      .fill()
      .map(() => new Array(480))

    for (let i = 0; i < arr.length; i++) {
      const rowIndex = Math.floor(i / 480) // 当前元素所在的行索引
      const colIndex = i % 480 // 当前元素所在的列索引

      result[rowIndex][colIndex] = arr[i] // 将元素放入对应的位置
    }

    return result
  }

export const newArr = pointArrayFn(arrList)