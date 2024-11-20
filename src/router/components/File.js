import layout from '@/layout'
export const FileList = [
  {
    path: '/file',
    name: 'file',
    component: layout,
    children: [
      // {
      //   path: '/file/filePageTwo',
      //   name: 'filePageTwo',
      //   component: () => import('@/views/file/FilePageTwo.vue'),
      //   meta: { title: '数据测试' }
      // },
      {
        path: '/file/filePageTransfer',
        name: 'filePageTransfer',
        component: () => import('@/views/file/FilePageTransfer.vue'),
        meta: { title: '穿梭框' }
      },
      {
        path: '/file/filePageMenu',
        name: 'filePageMenu',
        component: () => import('@/views/file/filePageMenu.vue'),
        meta: { title: '菜单跳转' }
      },
      {
        path: '/file/filePageMenuDigui',
        name: 'filePageMenuDigui',
        component: () => import('@/views/file/filePageMenuDigui.vue'),
        meta: { title: '菜单跳转递归组件' }
      },
      {
        path: '/file/markDown',
        name: 'markDown',
        component: () => import('@/views/file/markDown.vue'),
        meta: { title: '生成markDown文档' }
      },


    ]
  }
]
