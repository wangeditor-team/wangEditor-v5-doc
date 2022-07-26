# 快速开始

快速了解可查看[视频教程](/v5/video-course.html)。用于 Vue React 参考[这里](./for-frame.md)。

## 创建空白编辑器

可直接参考 [demo 示例](https://www.wangeditor.com/demo/)的网页源码。

### 引入 CSS 定义样式

可自定义编辑器、工具栏的尺寸、边框、`z-index` 等样式。

```html
<link href="https://unpkg.com/@wangeditor/editor@latest/dist/css/style.css" rel="stylesheet">
<style>
  #editor—wrapper {
    border: 1px solid #ccc;
    z-index: 100; /* 按需定义 */
  }
  #toolbar-container { border-bottom: 1px solid #ccc; }
  #editor-container { height: 500px; }
</style>
```

### 定义 HTML 结构

```html
<div id="editor—wrapper">
    <div id="toolbar-container"><!-- 工具栏 --></div>
    <div id="editor-container"><!-- 编辑器 --></div>
</div>
```

::: tip
- 如果想要“全屏”功能，则要求工具栏、编辑器 DOM 节点必须是同一层级
- 当然，工具栏、编辑器 DOM 节点也可自由组合，例如 [仿腾讯文档 demo](https://www.wangeditor.com/demo/like-qq-doc.html)
:::

### 引入 JS 创建编辑器

```html
<script src="https://unpkg.com/@wangeditor/editor@latest/dist/index.js"></script>
<script>
const { createEditor, createToolbar } = window.wangEditor

const editorConfig = {
    placeholder: 'Type here...',
    onChange(editor) {
      const html = editor.getHtml()
      console.log('editor content', html)
      // 也可以同步到 <textarea>
    }
}

const editor = createEditor({
    selector: '#editor-container',
    html: '<p><br></p>',
    config: editorConfig,
    mode: 'default', // or 'simple'
})

const toolbarConfig = {}

const toolbar = createToolbar({
    editor,
    selector: '#toolbar-container',
    config: toolbarConfig
    mode: 'default', // or 'simple'
})
</script>
```

::: tip
不同 `mode` 可参考 demo
- [mode: 'default'](https://www.wangeditor.com/demo/index.html) 默认模式 - 集成了 wangEditor 所有功能
- [mode: 'simple'](https://www.wangeditor.com/demo/simple-mode.html) 简洁模式 - 仅有部分常见功能，但更加简洁易用
:::

这样就创建出了一个最基本的编辑器。

![](/image/editor.png)

## 接下来

要实现一个完整的富文本编辑器功能，你可能还需要以下功能：

- [内容处理](./content.md) - 获取内容，**设置内容**，展示内容
- [工具栏配置](./toolbar-config.md) - 插入新菜单，屏蔽某个菜单等
- [编辑器配置](./editor-config.md) - 兼听各个**生命周期**，自定义**粘贴**
- [菜单配置](./menu-config.md) - 配置颜色、字体、字号、链接校验、**上传图片、上传视频**等
- [编辑器 API](./API.md) - 控制编辑器内容和选区
- [扩展新功能](./development.md) - 扩展菜单、元素、插件等
