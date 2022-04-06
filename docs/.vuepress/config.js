module.exports = {
    title: 'wangEditor',
    description: '开源 Web 富文本编辑器',
    head: [
        ['link', { rel: 'icon', href: '/favicon.ico' }]
    ],

    base: '/v5/',

    locales: {
        '/': {
            lang: 'zh-CN',
        },
        '/en/': {
            lang: 'en',
        },
    },

    themeConfig: {
        logo: '/image/logo.png',

        locales: {
            '/': {
                lang: 'zh-CN',
                selectLanguageName: '简体中文',

                navbar: [
                    { text: '指南', link: '/guide/' },
                    { text: 'Demo', link: 'https://www.wangeditor.com/demo/index.html' },
                    { text: '插件', link: '/guide/plugins.md' },
                    { text: 'Github', link: 'https://github.com/wangeditor-team/wangEditor' },
                ],

                sidebar: [
                    '/guide/README.md',
                    '/guide/installation.md',
                    {
                        text: '基础',
                        children: [
                            '/guide/getting-started.md',
                            '/guide/content.md',
                            '/guide/for-frame.md',
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
                            '/guide/theme.md',
                            '/guide/for-ts.md',
                            '/guide/plugins.md',
                        ]
                    }
                ],
            },
            '/en/': {
                lang: 'en',
                selectLanguageName: 'English',
                description: 'Open source web rich text editor',

                navbar: [
                    { text: 'Guide', link: '/en/guide/' },
                    { text: 'Demo', link: 'https://www.wangeditor.com/demo/index.html?lang=en' },
                    { text: 'Plugins', link: '/en/guide/plugins.md' },
                    { text: 'Github', link: 'https://github.com/wangeditor-team/wangEditor' },
                ],

                sidebar: [
                    '/en/guide/README.md',
                    '/en/guide/installation.md',
                    {
                        text: 'Basic',
                        children: [
                            '/en/guide/getting-started.md',
                            '/en/guide/content.md',
                            '/en/guide/for-frame.md',
                        ]
                    },
                    {
                        text: 'Config and API',
                        children: [
                            '/en/guide/toolbar-config.md',
                            '/en/guide/editor-config.md',
                            '/en/guide/menu-config.md',
                            '/en/guide/API.md',
                        ]
                    },
                    {
                        text: 'Advance',
                        children: [
                            '/en/guide/node-define.md',
                            '/en/guide/development.md',
                            '/en/guide/i18n.md',
                            '/en/guide/theme.md',
                            '/en/guide/for-ts.md',
                            '/en/guide/plugins.md',
                        ]
                    }
                ],
            },
        },
    },

    plugins: [
        [
            '@vuepress/plugin-search',
            {
                locales: {
                    '/': {
                        placeholder: '搜索',
                    },
                    '/en/': {
                        placeholder: 'Search',
                    },
                },
            },
        ],
    ],
}
