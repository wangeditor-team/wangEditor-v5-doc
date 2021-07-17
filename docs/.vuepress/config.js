module.exports = {
    lang: 'zh-CN',
    title: 'wangEditor',
    description: 'Web 富文本编辑器',
    head: [
        ['link', { rel: 'icon', href: '/favicon.ico' }]
    ],

    themeConfig: {
        logo: '/image/logo.png',

        navbar: [
            { text: '指南', link: '/guide/' },
            { text: 'demo', link: '/demo.html' },
            { text: 'Github', link: 'https://github.com/wangeditor-team/wangEditor' },
        ],

        sidebar: [
            '/guide/README.md',
            '/guide/installation.md',
            {
                text: '基础',
                children: [
                    '/guide/getting-started.md',
                    '/guide/for-frame.md',
                    '/guide/display.md',
                ]
            },
            {
                text: '配置和 API',
                children: [
                    '/guide/toolbar-config.md',
                    '/guide/editor-config.md',
                    '/guide/menu-config.md',
                    '/guide/API.md',
                ]
            },
            {
                text: '高级',
                children: [
                    '/guide/node-define.md',
                    '/guide/development.md',
                    '/guide/i18n.md',
                ]
            }
        ],
    },
}
