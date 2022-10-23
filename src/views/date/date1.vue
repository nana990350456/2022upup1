<template>
  <div>
<div class="home">
    <!-- 在需要右键菜单的元素，绑定contextmenu事件 -->
    <div 
    	class="test" v-for="item in menus" :key="item" 
    	@contextmenu.prevent="openMenu($event,item)">{{item}}</div>
    	<!-- 右键菜单部分 -->
    <ul v-show="visible" :style="{left:left+'px',top:top+'px'}" class="contextmenu">
      <li @click="handleDelete">删除</li>
      <li @click="handleDownloadFile">下载</li>
      <li @click="handlePreviewFile">预览</li>
    </ul>
  </div>
<el-tree :data="nata" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
  </div>
</template>

<script>
export default {
    name: 'JjjjDate133',
    data() {
        return {
         menus:[1,2,3], // 模拟数据
      rightClickItem:'',
      visible: false, // 是否展示右键菜单
      top:0,
      left:0,
      nata: [{
          label: '一级 1',
          children: [{
            label: '二级 1-1',
            children: [{
              label: '三级 1-1-1'
            }]
          }]
        }, {
          label: '一级 2',
          children: [{
            label: '二级 2-1',
            children: [{
              label: '三级 2-1-1'
            }]
          }, {
            label: '二级 2-2',
            children: [{
              label: '三级 2-2-1'
            }]
          }]
        }, {
          label: '一级 3',
          children: [{
            label: '二级 3-1',
            children: [{
              label: '三级 3-1-1'
            }]
          }, {
            label: '二级 3-2',
            children: [{
              label: '三级 3-2-1'
            }]
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
        };
    },

    mounted() {
        
    },

    methods: {
         handleNodeClick(data) {
        console.log(data);
      },
          // 打开右键菜单
    openMenu(e,item){
      this.visible = true;
      this.top = e.pageY;
      this.left = e.pageX;
      this.rightClickItem = item;
    },
    // 关闭右键菜单
    closeMenu(){
      this.visible = false;
    },
	
    handleDelete(){
        console.log('删除');
    },
    handleDownloadFile(){
        console.log('下载');
    },
    handlePreviewFile(){
        console.log('预览');
    },
    },
    watch: {
     // 监听 visible，来触发关闭右键菜单，调用关闭菜单的方法
    visible(value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    }
  }

};
</script>

<style lang="less" scoped>
.home{
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 600px;
  .test{
    width: 80px;
    height: 60px;
    background-color: pink;
    text-align:center;
    font-size:32px;  
    color: green;
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
  }
  .contextmenu li {
    margin: 0;
    padding: 7px 16px;
    cursor: pointer;
  }
  .contextmenu li:hover {
    background: #eee;
  }
}

</style>