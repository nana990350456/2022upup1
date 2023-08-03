import layout from '@/layout'
export const ImageList = [
  {
    path: '/',
    name: 'image相关',
    component: layout,
    meta: {
      title: '其它',
      icon: 'image'
    },
    children: [
      {
        path: 'image',
        name: 'image',
        component: () => import('@/views/picAbout/imagePage.vue'),
        meta: { title: '图片相关' }
      }
      // {
      //   path: 'textThree',
      //   name: 'textThree',
      //   component: () => import('@/views/textAbout/TextOverThree.vue'),
      //   meta: { title: '超出3行...并且折叠' }
      // }
    ]
  }
]
