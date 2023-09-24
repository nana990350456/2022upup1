import layout from '@/layout'
export const TestList = [
	{
		path: '/',
		name: 'test测试',
		component: layout,
		meta: {
			title: "其它",
			icon: "image",
		},
		children: [
			{path: '/test', 
         name:'test',
           component: () => import('@/views/test/testPage.vue'),
         meta: { title: 'test测试' }
},
		]
	},
]