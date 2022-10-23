import layout from '@/layout'
export const TreeList = [
  {
    path: '/',
    name: 'Tree树',
    component: layout,
    meta: {
      title: '其它',
      icon: 'image'
    },
    children: [
      {
        path: 'tree',
        name: 'tree',
        component: () => import('@/views/treePage'),
        meta: { title: 'test测试' }
      }
    ]
  }
]
