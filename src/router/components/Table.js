import layout from '@/layout'
export const TableList = [
  {
    path: '/',
    name: '拖拽drap',
    component: layout,
    meta: {
      title: '其它',
      icon: 'image'
    },
    children: [
      {
        path: '/drap',
        name: 'drap',
        component: () => import('@/views/drap/index.vue'),
        meta: { title: '拖拽drap' }
      }
    ]
  }
]
