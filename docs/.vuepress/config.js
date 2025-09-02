const { viteBundler, defaultTheme } = require('vuepress')
const { searchPlugin } = require('@vuepress/plugin-search')

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
            `,
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

    // top banner ad
    [
      'script',
      {},
      `
      setTimeout(function() {
        const header = document.querySelector('header');
        if (header == null) return;
        header.style.top = '25px';
        const ad = document.createElement('div');
        ad.style.backgroundColor = 'oklch(97.3% .071 103.193)';
        ad.style.color = '#333';
        ad.style.height = '25px';
        ad.style.position = 'fixed';
        ad.style.top = '0';
        ad.style.left = '0';
        ad.style.width = '100%';
        ad.style.zIndex = '9999';
        ad.style.lineHeight = '25px';
        ad.style.fontSize = '13px';

        const adContent = document.createElement('div');
        // adContent.innerHTML = '前端学 Node 全栈和 AI 开发，可加入【划水AI】项目研发小组。双越老师开发，复杂项目，真实上线，持续维护升级。在此进入有优惠 &gt;&gt;';
        adContent.innerHTML = '跟着 双越老师 开发一个 AI Agent 智能体项目，复杂业务 真实上线，专为前端人员设计，9月预报名早鸟价最大优惠 &gt;&gt;';
        adContent.style.width = '80%';
        adContent.style.textAlign = 'center';
        adContent.style.margin = '0 auto';
        adContent.style.cursor = 'pointer';
        adContent.addEventListener('click', function() {
          // window.open('https://www.huashuiai.com/join?from=wangeditor', '_blank');
          window.open('https://www.huashuiai.com/pub/ai-agent-camp', '_blank');
        });

        const adClose = document.createElement('div');
        adClose.innerHTML = 'x';
        adClose.style.width = '16px';
        adClose.style.textAlign = 'center';
        adClose.style.position = 'absolute';
        adClose.style.right = '8px';
        adClose.style.top = '0';
        adClose.style.cursor = 'pointer';
        adClose.addEventListener('click', function(event) {
          event.stopPropagation();
          ad.parentNode.removeChild(ad);
          header.style.top = '0';
        });

        ad.appendChild(adContent);
        ad.appendChild(adClose);
        header.parentNode.insertBefore(ad, header);
      }, 1000);
      `,
    ],
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
          {
            text: 'Demo 示例',
            link: 'https://www.wangeditor.com/demo/index.html',
          },
          { text: '插件', link: '/v5/plugins.md' },
          {
            text: 'Github',
            link: 'https://github.com/wangeditor-team/wangEditor',
          },
          { text: 'v4 版本', link: 'https://www.wangeditor.com/v4/' },
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
            ],
          },
          {
            text: '配置和 API',
            children: [
              '/v5/toolbar-config.md',
              '/v5/editor-config.md',
              '/v5/menu-config.md',
              '/v5/API.md',
            ],
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
            ],
          },
          {
            text: '资源',
            children: ['/v5/video-course.md'],
          },
        ],
      },
      '/en/': {
        lang: 'en',
        selectLanguageName: 'English',
        description:
          'Open source web rich text editor, run right out of the box, config simply.',

        navbar: [
          { text: 'Guide', link: '/en/v5/' },
          {
            text: 'Demo',
            link: 'https://www.wangeditor.com/demo/index.html?lang=en',
          },
          { text: 'Plugins', link: '/en/v5/plugins.md' },
          {
            text: 'Github',
            link: 'https://github.com/wangeditor-team/wangEditor',
          },
          { text: 'v4', link: 'https://www.wangeditor.com/v4-en/' },
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
            ],
          },
          {
            text: 'Config and API',
            children: [
              '/en/v5/toolbar-config.md',
              '/en/v5/editor-config.md',
              '/en/v5/menu-config.md',
              '/en/v5/API.md',
            ],
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
            ],
          },
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
      }),
    ],
  ],
}
