import layout from '@/layout'
export const FileList = [
  {
    path: '/file',
    name: 'file',
    component: layout,
    children: [
      {
        path: '/file/filePageOne',
        name: 'filePageOne',
        component: () => import('@/views/file/FilePageOne.vue'),
        meta: { title: '文件1' }
      }
    ]
  }
]
