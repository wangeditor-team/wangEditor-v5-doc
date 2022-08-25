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
- title: 踩过 4000+ 坑
  details: wangEditor 开源多年，有大量用户使用和反馈，我们已解决了太多的用户问题（详见 github issues）。
footer: Copyright © 2017-present wangeditor.com
---

<div
  style="opacity: 0.5; transition: opacity 0.5s; border: 1px solid #ccc; padding: 0 20px; border-radius: 10px; box-shadow: 0 2px 10px #0000001f;"
  onmouseover="this.style.opacity = '1.0';"
  onmouseout="this.style.opacity = '0.5';"
>

### wangEditor 作者 [慕课网 双越讲师](https://www.imooc.com/t/4427201) 亲授，前端面试全流程，5000+学员好评~

1. **简历** [1 小时带你写出亮眼的前端简历 - 免费学习！！！](https://www.imooc.com/learn/1329)
2. **基础** [1 天时间快速准备前端基础面试，构建前端基础知识体系](https://coding.imooc.com/class/400.html)
3. **框架** [前端框架面试题，聚焦 Vue3 React Webpack](https://coding.imooc.com/class/419.html)
4. **刷题** [2 周刷完 100 道前端优质面试真题，覆盖 9 大考察方向](https://coding.imooc.com/class/562.html)
5. **模拟面试** [前端面试模拟+复盘 ，揭秘面试官的内心世界](https://coding.imooc.com/class/596.html)

*也欢迎关注作者 抖音 “[王福朋的编程小屋](#关注作者抖音)” 和 [B 站频道](https://space.bilibili.com/697803545)*
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
- 加入 QQ 群 `657798566` ，**但请注意：**
  - 用户交流，请不要 `@群主` 解答问题！
  - 白嫖党、伸手党请绕行！
  - 说脏话、发广告，直接踢出！

### 关注作者抖音

![](/image/douyin.jpeg)
