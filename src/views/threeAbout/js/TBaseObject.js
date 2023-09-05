
import { BoxGeometry, Mesh, MeshStandardMaterial } from "three"

export const allBaseObject = []  // 返回所有基础模型
// 创建立方体
export const box = new Mesh(
    new BoxGeometry(20, 20, 20),  // 设置立方体的大小
    new MeshStandardMaterial({   // 设置材质
      color: 'rgb(100, 238, 144)',  // 设置材质的颜色\
      roughness: 0 ,  // 粗糙度（0 最光滑，1 最粗糙）
      metalness: 0.5,   // 金属度 （1 最像金属，0 最不想金属）
    })
  )

  box.name = 'box'  // 设置模型 name
  box.position.set(5, 5, 5)  // 设置模型位置
  box.position.x = 5
  box.position.y = 5
  box.position.z = 5
  
  
  box.sheshimoxingshuju = {
    name: 'box',
    user: '我是ed.'
  }
  
  box.userData = {
    name: '我是ed.'
  }
  window.box =box
  console.log(box,'kkkkkk');
  allBaseObject.push(box)  // 添加到模型数组