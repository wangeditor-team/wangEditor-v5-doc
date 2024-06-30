import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: 'wangEditor',
    description: '开源 Web 富文本编辑器，开箱即用，配置简单',
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

    themeConfig: {
        // logo: '/image/logo.png',
        i18nRouing: true,
        outline: "deep",
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: '指南', link: '/v5/getting-started.md' },
            { text: '视频教程', link: '/v5/video-course.md' },
            { text: 'Demo 示例', link: 'https://www.wangeditor.com/demo/index.html' },
            { text: '插件', link: '/v5/plugins.md' },
            { text: 'Github', link: 'https://github.com/wangeditor-team/wangEditor' },
            { text: 'v4 版本', link: 'https://www.wangeditor.com/v4/' }
        ],
        locales: {
            en: {
                label: 'Englisth',
                lang: 'en',
                link: '/en/'
            }
        },
        sidebar: [
            '/v5/README.md',
            '/v5/installation.md',
            {
                text: '基础',
                items: [
                    '/v5/getting-started.md',
                    '/v5/for-frame.md',
                    '/v5/content.md',
                ]
            },
            {
                text: '配置和 API',
                items: [
                    '/v5/toolbar-config.md',
                    '/v5/editor-config.md',
                    '/v5/menu-config.md',
                    '/v5/API.md',
                ]
            },
            {
                text: '高级',
                items: [
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
                items: [
                    '/v5/video-course.md'
                ]
            }
        ],

        socialLinks: [
            { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
        ]
    }
})
