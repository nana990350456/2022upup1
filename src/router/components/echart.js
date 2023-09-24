import layout from '@/layout'
export const EchartsList = [
  {
    path: '/',
    name: 'echarts',
    component: layout,
    meta: {
      title: '其它',
      icon: 'image'
    },
    children: [
      {
        path: '/echarts',
        name: 'echarts',
        component: () => import('@/views/echarts/echartsPage.vue'),
        meta: { title: 'echarts' }
      }
    ]
  }
]
