export default [
    {
        name: "数据爬取",
        subActive: "0",
        children: [{
                name: "定制爬取",
                path: "custom",
                index: "0",
                icon: "iconfont icon-jixiaofenxi",
            },
            {
                name: "选项爬取",
                path: "customCrawl",
                index: "0",
                icon: "iconfont icon-a-2fenleixuanxiang",
            },
            {
                name: "爬取方案",
                path: "crawScheme",
                index: "0",
                icon: "iconfont icon-chanpinfangan",
            },
        ],
    },
    {
        name: "智能检索",
        subActive: "0",
        children: [
            //
            {
                name: "云检索",
                index: "1",
                icon: "iconfont icon-cloud-search",
                children: [
                    //
                    {
                        name: "通用检索",
                        path: "generalSearch",
                        icon: "iconfont ",
                    },
                    {
                        name: "智能检索",
                        path: "intelSearch",
                        icon: "iconfont ",
                    },
                    {
                        name: "知识图谱",
                        path: "knowGraph",
                        icon: "iconfont ",
                    },
                ],
            },
            {
                name: "本地检索",
                path: "localSearch",
                index: "1",
                icon: "iconfont icon-bendi",
            },
        ],
    },
    {
        name: "财经字典",
        subActive: "0",
        children: [{
            name: "财经字典",
            path: "dictionary",
            index: "2",
            icon: "iconfont icon-shujuzidian1",
        }, ],
    },
    {
        name: "方案共享",
        subActive: "0",
        children: [
        //
            {
                name: "方案管理",
                path: "planManage",
                index: "3",
                icon: "iconfont icon-gongzifanganbiaopeizhi",
            },
            {
                name: "方案中心",
                path: "proCentre",
                index: "3",
                icon: "iconfont icon-fanganku",
            },
            {
                name: "校内方案",
                path: "schoolPro",
                index: "3",
                icon: "iconfont icon-xiaoneishehuizhiwu",
            },
        ],
    },
    // {
    //     name: "标注工具",
    //     subActive: "0",
    //     children: [{
    //         name: "因果事件标注",
    //         path: "lawOfCausality",
    //         index: "4",
    //         icon: "iconfont icon-fanganku",
    //     }],
    // },
    // {
    //   name: '智能选题',
    //   subActive: '0',
    //   children: [
    //     {
    //       name: '定向选题',
    //       path: 'dirSelectionTopic',
    //       icon: 'iconfont icon-dingxiangbao',
    //       index: '5'
    //     },
    //     {
    //       name: '随机选题',
    //       path: 'ranSelectionTopic',
    //       icon: 'iconfont icon-icon--',
    //       index: '5'
    //     }
    //   ]
    // },
]