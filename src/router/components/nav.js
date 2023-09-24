export const navList = [
  {
    path: '/',
    name: 'nav',
    children: [
      {
        path: '/tree',
        name: 'tree',
        component: () => import('@/views/treePage'),
        meta: { title: 'test测试' }
      }
    ]
  }
]
