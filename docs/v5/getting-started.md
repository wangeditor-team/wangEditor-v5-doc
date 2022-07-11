[![极客时间学习卡](/image/ad/geek-ad.png "极客时间学习卡")](https://time.geekbang.org/activity/promo?page_name=page_418)

# 快速开始

如果你想用于 Vue React ，请先阅读本文，然后看[这里](./for-frame.md)。

快速了解可查看[视频教程](/v5/video-course.html)。

## 创建空白编辑器

### 定义 html 结构

编辑器和工具栏是强制分离的，所以要定义两个 div 。

```html
<div id="toolbar-container"></div>
<div id="editor-container"></div>
```

### 创建编辑器和工具栏

注意，安装 wangEditor 参考[这里](/v5/installation.html)。

引入 wangEditor

```js
// npm 安装
import '@wangeditor/editor/dist/css/style.css'
import { createEditor, createToolbar, IEditorConfig, IDomEditor } from '@wangeditor/editor'

// CDN 引入 css 和 js
// const { createEditor, createToolbar } = window.wangEditor
```

创建编辑器

```ts
//【注意】下面使用的 typescript 语法。如用 javascript 语法，把类型去掉即可。

// 编辑器配置
const editorConfig: Partial<IEditorConfig> = {}
editorConfig.placeholder = '请输入内容'
editorConfig.onChange = (editor: IDomEditor) => {
    // 当编辑器选区、内容变化时，即触发
    console.log('content', editor.children)
    console.log('html', editor.getHtml())
}

// 工具栏配置
const toolbarConfig: Partial<IToolbarConfig> = {}

// 创建编辑器
const editor = createEditor({
  selector: '#editor-container',
  config: editorConfig,
  mode: 'default' // 或 'simple' 参考下文
})
// 创建工具栏
const toolbar = createToolbar({
  editor,
  selector: '#toolbar-container',
  config: toolbarConfig,
  mode: 'default' // 或 'simple' 参考下文
})
```

这样就创建出了一个最基本的编辑器。

![](/image/editor.png)

::: tip
1. 工具栏并不是强制的，如不需要，可以不创建。这并不影响编辑器的使用。
2. 工具栏的菜单是可以配置的，可参考[配置](/v5/toolbar-config.html)。
3. 其他 editor config 可参考[配置](/v5/editor-config.html)。
:::

### mode 模式

编辑器内置了两种模式（区别可参考 [demo](https://www.wangeditor.com/demo/index.html)）
- `default` 默认模式 - 集成了 wangEditor 所有功能
- `simple` 简洁模式 - 仅有部分常见功能，但更加简洁易用

::: tip
无论使用哪一种模式，都不会影响其他的配置和功能。
:::

## 使用 textarea

editor changed 后，同步内容到 textarea 即可

```html
<textarea id="textarea-1"></textarea>
<textarea id="textarea-2"></textarea>
```

```js
editorConfig.onChange = (editor: IDomEditor) => {
    const content = editor.children
    const contentStr = JSON.stringify(content)
    document.getElementById('textarea-1').value = contentStr

    const html = editor.getHtml()
    document.getElementById('textarea-2').value = html
}
```

## 尺寸和样式

### 宽度和高度

宽度都是自适应的，默认会 100% 宽度。

编辑器的高度，wangEditor 会默认设置 `min-height: 300px;` 给一个最小高度。其他的需要你自己定义。

```html
<div id="toolbar-container"></div>
<div id="editor-container" style="height: 600px;"></div>
```

### z-index

wangEditor 没有针对 z-index 做配置，需要你自己定义。

```html
<div id="toolbar-container" style="z-index: 101;"></div>
<div id="editor-container" style="z-index: 100;"></div>
```

### 全屏

wangEditor 工具栏内置了“全屏”菜单，但使用它需要有一个条件：**`toolbar-container` 和 `editor-container` 必须有同一个父元素**。

```html
<style>
  .full-screen-container {
    z-index: 100; /* 如有需要，可以自定义 z-index */
  }
</style>

<div class="full-screen-container">
  <div id="toolbar-container"> <!-- 用于创建工具栏 --> </div>
  <div id="editor-container"> <!-- 用于创建编辑器 --> </div>
</div>
```

如果你的 html 结构无法做到上述要求，或者不想用全屏功能，可以通过[工具栏配置](/v5/toolbar-config.html) `{ excludeKeys: 'fullScreen' }` 来隐藏全屏菜单。

### 其他

- 可以自定义 `toolbar-container` 的样式和行为，实现工具栏 fixed 到顶部
- 可以自定义 html 实现腾讯文档、语雀文档的效果，参考 [demo](https://www.wangeditor.com/demo/like-qq-doc.html)
- 其他自行探索

![](/image/yuque.png)

## 一个页面多个编辑器

wangEditor 支持多个编辑器共存，正常创建即可

```xml
<div>
  <div id="toolbar-container-1"></div>
  <div id="editor-container-1"></div>
</div>

<hr>

<div>
  <div id="toolbar-container-2"></div>
  <div id="editor-container-2"></div>
</div>
```

```js
// 创建编辑器1
const editor1 = createEditor({
  selector: '#editor-container-1',
  mode: 'default'
})
// 创建工具栏1
const toolbar1 = createToolbar({
  editor: editor1,
  selector: '#toolbar-container-1',
  mode: 'default'
})

// 创建编辑器2
const editor2 = createEditor({
  selector: '#editor-container-2',
  mode: 'simple'
})
// 创建工具栏2
const toolbar2 = createToolbar({
  editor: editor2,
  selector: '#toolbar-container-2',
  mode: 'simple'
})
```