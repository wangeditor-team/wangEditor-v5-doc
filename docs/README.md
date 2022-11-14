---
home: true
heroImage: null
heroText: wangEditor 5
tagline: 开源 Web 富文本编辑器，开箱即用，配置简单
actions:
  - text: 快速上手
    link: /v5/getting-started.html
    type: primary
  - text: demo 示例
    link: https://www.wangeditor.com/demo/index.html
    type: secondary
features:
- title: 简洁易用，功能强大
  details: 快速接入，配置简单，几行代码即可生成。集成了所有常见功能，无需二次开发。在 Vue React 也可以快速接入。
- title: 支持 JS Vue React
  details: 不依赖任何第三方框架，可用于 jQuery Vue React 等。wangEditor 提供了官方的 Vue React 组件。
- title: 踩过 5000+ 坑
  details: wangEditor 开源多年，有大量用户使用和反馈，我们已解决了太多的用户问题（详见 github issues）。
footer: Copyright © 2017-present wangeditor.com
---

<div
  style="opacity: 0.5; transition: opacity 0.5s; border: 1px solid #ccc; padding: 0 20px; border-radius: 10px; box-shadow: 0 2px 10px #0000001f;"
  onmouseover="this.style.opacity = '1.0';"
  onmouseout="this.style.opacity = '0.5';"
>

### wangEditor 作者 [慕课网 双越讲师](https://www.imooc.com/t/4427201) 亲授 [前端面试全家桶](https://coding.imooc.com/class/613.html) 全流程、体系化的前端面试解决方案

1. **全流程** 从知识点讲解，到面试题练习，再到真实面试过程演练
2. **体系化** 包含前端面试常考的内容，如 CSS JS Vue React 算法等
3. **讲师靠谱** 双越老师从 2017 年开始制作前端面试课，已服务 1w+ 学员

*也欢迎关注作者**抖音** [王福朋的编程小屋](#关注作者抖音) 和 [wangEditor B站频道](https://space.bilibili.com/697803545)*
</div>


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
- 加入 QQ 群 `651704125` ，**但请注意：**
  - 用户交流，请不要 `@群主` 解答问题！
  - 白嫖党、伸手党请绕行！
  - 说脏话、发广告，直接踢出！

### 关注作者抖音

![](/image/douyin.jpeg)
