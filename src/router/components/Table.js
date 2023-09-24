import layout from '@/layout'
export const TableList = [
  {
    path: '/',
    name: '表格table',
    component: layout,
    meta: {
      title: '其它',
      icon: 'image'
    },
    children: [
      {
        path: '/table',
        name: 'table',
        component: () => import('@/views/table/tablePage.vue'),
        meta: { title: '表格table' }
      }
    ]
  }
]
