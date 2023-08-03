import layout from '@/layout'
export const TextList = [
  {
    path: '/',
    name: 'text相关',
    component: layout,
    meta: {
      title: '其它',
      icon: 'image'
    },
    children: [
      {
        path: 'text',
        name: 'text',
        component: () => import('@/views/textAbout/TextFold.vue'),
        meta: { title: '超出一行显示...' }
      },
      {
        path: 'textThree',
        name: 'textThree',
        component: () => import('@/views/textAbout/TextOverThree.vue'),
        meta: { title: '超出3行...并且折叠' }
      }
    ]
  }
]
