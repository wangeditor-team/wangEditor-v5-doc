const { viteBundler, defaultTheme } = require('vuepress');
const { searchPlugin } = require('@vuepress/plugin-search');

module.exports = {
    title: 'wangEditor',
    description: '开源 Web 富文本编辑器，开箱即用，配置简单',
    bundler: viteBundler(),
    head: [
        ['link', { rel: 'icon', href: '/favicon.ico' }],

        // 百度统计
        [
            'script',
            {},
            `
            var _hmt = _hmt || [];
            (function() {
              var hm = document.createElement("script");
              hm.src = "https://hm.baidu.com/hm.js?a25f260386e515f4eee3e0a6bb4166be";
              var s = document.getElementsByTagName("script")[0];
              s.parentNode.insertBefore(hm, s);
            })();
            `
        ],

        // // Google AdSense
        // [
        //     'script',
        //     {
        //         async: true,
        //         src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8334016716119444',
        //         crossorigin: 'anonymous'
        //     },
        // ]
    ],

    locales: {
        '/': {
            lang: 'zh-CN',
        },
        '/en/': {
            lang: 'en',
        },
    },

    theme: defaultTheme({
        logo: '/image/logo.png',

        locales: {
            '/': {
                lang: 'zh-CN',
                selectLanguageName: '简体中文',

                navbar: [
                    { text: '指南', link: '/v5/getting-started.md' },
                    { text: '视频教程', link: '/v5/video-course.md' },
                    { text: 'Demo 示例', link: 'https://www.wangeditor.com/demo/index.html' },
                    { text: '插件', link: '/v5/plugins.md' },
                    { text: '赞助💰', link: '/v5/sponsor.md' },
                    { text: 'Github', link: 'https://github.com/wangeditor-team/wangEditor' },
                    { text: 'v4 版本', link: 'https://www.wangeditor.com/v4/' }
                ],

                sidebar: [
                    '/v5/README.md',
                    '/v5/installation.md',
                    {
                        text: '基础',
                        children: [
                            '/v5/getting-started.md',
                            '/v5/for-frame.md',
                            '/v5/content.md',
                        ]
                    },
                    {
                        text: '配置和 API',
                        children: [
                            '/v5/toolbar-config.md',
                            '/v5/editor-config.md',
                            '/v5/menu-config.md',
                            '/v5/API.md',
                        ]
                    },
                    {
                        text: '高级',
                        children: [
                            '/v5/node-define.md',
                            '/v5/development.md',
                            '/v5/i18n.md',
                            '/v5/theme.md',
                            '/v5/for-ts.md',
                            '/v5/plugins.md',
                        ]
                    },
                    {
                        text: '资源',
                        children: [
                            '/v5/video-course.md'
                        ]
                    }
                ],
            },
            '/en/': {
                lang: 'en',
                selectLanguageName: 'English',
                description: 'Open source web rich text editor, run right out of the box, config simply.',

                navbar: [
                    { text: 'Guide', link: '/en/v5/' },
                    { text: 'Demo', link: 'https://www.wangeditor.com/demo/index.html?lang=en' },
                    { text: 'Plugins', link: '/en/v5/plugins.md' },
                    { text: 'Github', link: 'https://github.com/wangeditor-team/wangEditor' },
                    { text: 'v4', link: 'https://www.wangeditor.com/v4-en/' }
                ],

                sidebar: [
                    '/en/v5/README.md',
                    '/en/v5/installation.md',
                    {
                        text: 'Basic',
                        children: [
                            '/en/v5/getting-started.md',
                            '/en/v5/for-frame.md',
                            '/en/v5/content.md',
                        ]
                    },
                    {
                        text: 'Config and API',
                        children: [
                            '/en/v5/toolbar-config.md',
                            '/en/v5/editor-config.md',
                            '/en/v5/menu-config.md',
                            '/en/v5/API.md',
                        ]
                    },
                    {
                        text: 'Advance',
                        children: [
                            '/en/v5/node-define.md',
                            '/en/v5/development.md',
                            '/en/v5/i18n.md',
                            '/en/v5/theme.md',
                            '/en/v5/for-ts.md',
                            '/en/v5/plugins.md',
                        ]
                    }
                ],
            },
        },
    }),

    plugins: [
        [
            searchPlugin({
                locales: {
                    '/': {
                        placeholder: '搜索',
                    },
                    '/en/': {
                        placeholder: 'Search',
                    },
                },
            })
        ],
    ],
}
