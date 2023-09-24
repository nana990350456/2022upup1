import layout from '@/layout'
export const DateList = [
  {
    path: '/time',
    name: 'time',
    component: layout,
    children: [
      {
        path: '/time/data',
        name: 'date',
        component: () => import('@/views/date/dateElement.vue'),
        meta: { title: '日期' }
      },
      {
        path: '/time/scrollPage',
        name: 'scrollPage',
        component: () => import('@/views/date/scrollPage.vue'),
        meta: { title: '页面滚动' }
      },
      {
        path: '/time/pall',
        name: 'pall',
        component: () => import('@/views/date/pallPage.vue'),
        meta: { title: 'promise.all' }
      },
    ]
  }
]
