import layout from '@/layout'
export const TabChangeList = [
  {
    path: '/',
    name: 'tab切换',
    component: layout,
    meta: {
      title: '其它',
      icon: 'image'
    },
    children: [
      {
        path: 'tab',
        name: 'tab',
        component: () => import('@/views/tabPage/tabPage.vue'),
        meta: { title: 'tab栏' }
      },
      {
        path: 'tab1',
        name: 'tab1',
        component: () => import('@/views/tabPage/iframe1.vue'),
        meta: { title: 'tab1栏' }
      }
    ]
  }
]
