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
        path: 'map',
        name: 'map',
        component: () => import('@/views/test/map/MapContainer.vue'),
        meta: { title: 'map测试' }
      }
    ]
  }
]
