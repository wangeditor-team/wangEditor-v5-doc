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

        sidebar: {
            '/guide/': [
                '/guide/README.md',
                '/guide/installation.md',
                '/guide/getting-started.md',
                '/guide/for-frame.md',
                '/guide/display.md',
                '/guide/toolbar-config.md',
                '/guide/editor-config.md',
                '/guide/API.md',
                '/guide/menu-config.md',
                '/guide/node-define.md',
                '/guide/development.md',
                '/guide/i18n.md'
            ]
        }
    },
}
