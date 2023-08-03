import layout from '@/layout'
export const SearchList = [
  {
    path: '/',
    name: '搜索',
    component: layout,
    meta: {
      title: '其它',
      icon: 'image'
    },
    children: [
      {
        path: 'search',
        name: 'search',
        component: () => import('@/views/Search/searchPage.vue'),
        meta: { title: 'test测试' }
      }
    ]
  }
]
