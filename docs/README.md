---
home: true
heroImage: null
heroText: wangEditor
tagline: 争做国内体验最好的开源 Web 富文本编辑器
actions:
  - text: 快速上手
    link: /guide/getting-started.html
    type: primary
  - text: demo 演示
    link: https://www.wangeditor.com/demo/zh-CN/
    type: secondary
features:
- title: 开源免费
  details: 基础版本将一直保持：源码开放，免费使用。欢迎去 github star 以及提交 issue。
- title: 简洁易用，功能强大
  details: 快速接入，配置简单，几行代码即可生成。集成了所有常见功能，无需二次开发。
- title: 无框架依赖
  details: 不依赖任何第三方框架，无论你使用 jQuery 、Vue 或者 React 等，都可轻松接入。
- title: 踩过 4000+ 坑
  details: wangEditor 开源多年，有大量用户使用和反馈，我们已解决了太多的用户问题（详见 github issues）。
- title: 及时反馈
  details: 欢迎加入 QQ 群，和其他成员、研发团队一起讨论问题。也欢迎提交 issue ，我们会及时回复。
- title: 团队作战
  details: 不是作者单兵作战，团队成员一起开发、测试、跟踪问题、社区答疑，保证更新的持续性和稳定性。
footer: Copyright © 2017-present wangeditor.com
---

### 使用简单

```js
import '@wangeditor/editor-cattle/dist/css/style.css'
import { createEditor, createToolbar } from '@wangeditor/editor-cattle'

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
- 暂不支持移动端（后续支持～）
- **不再支持 IE 浏览器**

### 交流

- 加入 QQ 群
- 提交 issue

### 团队

- a
- b
- c

申请加入团队（链接到 github 文档）
