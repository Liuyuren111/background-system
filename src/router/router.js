import HomeView from "@/views/HomeView";

export const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
        children: [
            // 数据爬取
            {
                path: '/custom',
                name: 'custom',
                component: () =>
                    import ('@/views/crawling/custom.vue'),
                meta: {
                    title: '选项爬取',
                }
            },
            {
                path: '/customCrawl',
                name: 'customCrawl',
                component: () =>
                    import ('@/views/crawling/customCrawl.vue'),
                meta: {
                    title: '选项爬取',
                }
            },
            {
                path: '/crawScheme',
                name: 'crawScheme',
                component: () =>
                    import ('@/views/crawling/crawScheme.vue'),
                meta: {
                    title: '爬取方案',
                }
            },
            // 智能检索
            {
                path: '/intelSearch',
                name: 'intelSearch',
                component: () =>
                    import ('@/views/no-page.vue'),
                meta: {
                    title: '智能检索',
                }
            },
            {
                path: '/generalSearch',
                name: 'generalSearch',
                component: () =>
                    import ('@/views/retrieval/generalSearch.vue'),
                meta: {
                    title: '通用检索',
                }
            },
            {
                path: '/knowGraph',
                name: 'knowGraph',
                component: () =>
                    import ('@/views/no-page.vue'),
                meta: {
                    title: '知识图谱',
                }
            },
            {
                path: '/localSearch',
                name: 'localSearch',
                component: () =>
                    import ('@/views/no-page.vue'),
                meta: {
                    title: '本地检索',
                }
            },
            // 财经字典
            {
                path: '/dictionary',
                name: 'dictionary',
                component: () =>
                    import ('@/views/dictionary/Dictionary.vue'),
                meta: {
                    title: '财经字典应用',
                }
            },
            // 方案共享
            {
                path: '/planManage',
                name: 'planManage',
                component: () =>
                    import ('@/views/plan/planManage.vue'),
                meta: {
                    title: '方案管理',
                }
            },
            {
                path: '/proCentre',
                name: 'proCentre',
                component: () =>
                    import ('@/views/no-page.vue'),
                meta: {
                    title: '方案中心',
                }
            },
            {
                path: '/schoolPro',
                name: 'schoolPro',
                component: () =>
                    import ('@/views/no-page.vue'),
                meta: {
                    title: '校内方案',
                }
            },
        ]
    },
    {
        path: '/about',
        name: 'about',
        component: () => import('../views/AboutView.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/Login.vue')
    },
    {
        path: '/reg',
        name: 'reg',
        component: () => import('@/views/login/Reg.vue')
    },
    {
        path: '/test',
        name: 'test',
        component: () => import('@/test.vue')
    },
]