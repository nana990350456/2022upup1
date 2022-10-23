import layout from '@/layout'
export const DateList = [
  {
    path: '/',
    name: 'date1测试',
    component: layout,
    meta: {
      title: '其它',
      icon: 'image'
    },
    children: [
      {
        path: 'date',
        name: 'date',
        component: () => import('@/views/date/date1.vue'),
        meta: { title: 'date1测试' }
      },
      {
        path: 'pall',
        name: 'pall',
        component: () => import('@/views/date/pallPage.vue'),
        meta: { title: 'promise.all' }
      },
    ]
  }
]
