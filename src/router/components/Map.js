import layout from '@/layout'
export const MapList = [
  {
    path: '/',
    name: 'map测试',
    component: layout,
    meta: {
      title: '其它',
      icon: 'image'
    },
    children: [
      {
        path: '/map',
        name: 'map',
        component: () => import('@/views/test/map/MapContainer.vue'),
        meta: { title: 'map测试' }
      },
      {
        path: '/wendu',
        name: 'wendu',
        component: () => import('@/views/test/wendu/WenDu.vue'),
        meta: { title: 'canvas测试' }
      },
      {
        path: '/wendu1',
        name: 'wendu1',
        component: () => import('@/views/test/wendu/WenDu1.vue'),
        meta: { title: 'canvas测试2' }
      },
      {
        path: '/wendu2',
        name: 'wendu2',
        component: () => import('@/views/test/wendu/WenDu2.vue'),
        meta: { title: 'canvas测试3' }
      },
      {
        path: '/wendu3',
        name: 'wendu3',
        component: () => import('@/views/test/wendu/WenDu3.vue'),
        meta: { title: 'canvas测试3' }
      },

    ]
  }
]
