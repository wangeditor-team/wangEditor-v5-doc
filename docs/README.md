---
home: true
heroImage: null
heroText: wangEditor 5
tagline: 开源 Web 富文本编辑器，开箱即用，配置简单
actions:
  - text: 快速上手
    link: /v5/getting-started.html
    type: primary
  - text: demo 演示
    link: https://www.wangeditor.com/demo/index.html
    type: secondary
features:
- title: 简洁易用，功能强大
  details: 快速接入，配置简单，几行代码即可生成。集成了所有常见功能，无需二次开发。在 Vue React 也可以快速接入。
- title: 支持 JS Vue React
  details: 不依赖任何第三方框架，可用于 jQuery Vue React 等。wangEditor 提供了官方的 Vue React 组件。
- title: 踩过 4000+ 坑
  details: wangEditor 开源多年，有大量用户使用和反馈，我们已解决了太多的用户问题（详见 github issues）。
footer: Copyright © 2017-present wangeditor.com
---

[![极客时间学习卡](/image/ad/geek-ad.png "极客时间学习卡")](https://time.geekbang.org/activity/promo?page_name=page_418)

### 使用简单

10 行代码即可创建一个功能健全的富文本编辑器，可查看 [demo 示例](https://www.wangeditor.com/demo/index.html)。如用于 Vue React 可参考[这里](/v5/for-frame.html)。

![](/image/editor.png)

```js
import '@wangeditor/editor/dist/css/style.css'
import { createEditor, createToolbar } from '@wangeditor/editor'

// 创建编辑器
const editor = createEditor({
  selector: '#editor-container'
})
// 创建工具栏
const toolbar = createToolbar({
  editor,
  selector: '#toolbar-container'
})
```

### 兼容性

- 兼容主流的 PC 浏览器，如 Chrome Firefox Safari Edge 等
- 暂不支持移动端编辑（支持移动端查看）
- **不再支持 IE 浏览器**

### 遇到问题

- [常见问题汇总](https://github.com/wangeditor-team/wangEditor/issues/4524)
- [提交 issue 问题和建议](https://github.com/wangeditor-team/wangEditor/issues)
- 用户交流 QQ 群 `657798566`

### 捐赠

支持 wangEditor 开源工作 [https://opencollective.com/wangeditor](https://opencollective.com/wangeditor)

### 关注作者抖音

![](/image/douyin.jpeg)
