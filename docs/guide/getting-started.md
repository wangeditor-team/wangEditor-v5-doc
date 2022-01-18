# 快速开始

如果你想用于 Vue React ，请先阅读本文，然后看[这里](./for-frame.md)。

## 创建空白编辑器

### 定义 html 结构

编辑器和工具栏是强制分离的，所以要定义两个 div 。

```html
<div id="toolbar-container"></div>
<div id="editor-container"></div>
```

### 创建编辑器和工具栏

注意，安装 wangEditor 参考[这里](/v5/guide/installation.html)。

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

const editorConfig: Partial<IEditorConfig> = {}
editorConfig.placeholder = '请输入内容'
editorConfig.onChange = (editor: IDomEditor) => {
    // 当编辑器选区、内容变化时，即触发
    console.log('content', editor.children)
    console.log('html', editor.getHtml())
}

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
  mode: 'default' // 或 'simple' 参考下文
})
```

这样就创建出了一个最基本的编辑器。

![](/image/editor.png)

::: tip
1. 工具栏并不是强制的，如不需要，可以不创建。这并不影响编辑器的使用。
2. 工具栏的菜单是可以配置的，可参考[配置](/v5/guide/toolbar-config.html)。
3. 其他 editor config 可参考[配置](/v5/guide/editor-config.html)。
:::

### mode 模式

编辑器内置了两种模式（区别可参考 [demo](https://www.wangeditor.com/demo/zh-CN/index.html)）
- `default` 默认模式 - 集成了 wangEditor 所有功能
- `simple` 简洁模式 - 仅有部分常见功能，但更加简洁易用

::: tip
无论使用哪一种模式，都不会影响其他的配置和功能。
:::

## 获取内容

### 获取 HTML 和 Text

使用 `editor.getHtml()` 获取 HTML 内容。使用 `editor.getText()` 获取纯文本内容。

### 获取 JSON

使用 `editor.children` 获取 JSON 内容。

JSON 格式可以转换为 HTML 和 Text 格式，支持浏览器和 nodejs 。
如果是在 nodejs 中，需要安装 `yarn add jsdom global-jsdom` ，并且引入 `require('global-jsdom/register')`。

```js
const editor = createEditor({ content }) // `content` 即为 JSON 内容
const html = editor.getHtml()
const text = editor.getText()
```

### 自定义样式

编辑器输出或者生成的 html 都是纯标签，直接输出显示看起来会和编辑器的不一样。<br>
所以，需要在显示时，对 html 增加一些样式。

以下是几个最常见的样式，作为参考。你可以再自己修改，也据此实现“多皮肤”功能。

```css
p, li, td, th, blockquote {
    white-space: pre-wrap; /* 显示空格 */
}

/* 表格 */
table {
    border-collapse: collapse;
}
table th,
table td {
    border: 1px solid #ccc;
    min-width: 50px;
    height: 20px;
    text-align: left;
}
table th {
    background-color: #f1f1f1;
    text-align: center
}

/* 代码块 */
pre>code {
    display: block;
    border: 1px solid hsl(0, 0%, 91%);
    border-radius: 4px 4px;
    text-indent: 0;
    background-color: #fafafa;
    padding: 10px;
    font-size: 14px;
}

/* 引用 */
blockquote {
    display: block;
    border-left: 8px solid #d0e5f2;
    padding: 10px 10px;
    margin: 10px 0;
    background-color: #f1f1f1;
}

/* 列表 */
ul, ol {
  margin: 10px 0 10px 20px;
}

/* 分割线 */
hr {
    display: block;
    width: 90%;
    margin: 20px auto;
    border: 0;
    height: 1px;
    background-color: #ccc;
}

img {
    max-width: 100%;
}
```

另外，代码高亮也需要自行处理，推荐使用 [Prism.js](https://prismjs.com/) ，因为编辑器内容内部也是基于 Prism.js 来实现的。

## 设置内容

创建编辑器时，传入的默认内容。即编辑器创建完成后，立马显示这些内容。

### 设置 HTML

<b style="color: red;">【注意】这里的 `html` 内容必须是 wangEditor 生成的 HTML 格式，不可以自己随意写</b>。HTML 格式非常灵活，wangEditor 无法兼容所有的 HTML 格式。

例如，wangEditor 可以识别 `<strong>hello</strong>` 为加粗，但无法识别 `<span style="font-weight: bold;">hello</span>` 等其他加粗方式。

```js
const editor = createEditor({
  html: '<p>hello <strong>world</strong></p>', // 从 editor.getHtml() 获取的 html 内容
  // 其他属性...
})
```

### 设置 Text

```js
// 1. 把 text 转换为 html
const text = '...' // text 内容
const html = text.split(/\n/).map(line => `<p>${line}</p>`).join('\n')

// 2. 设置 html
const editor = createEditor({
  html,
  // 其他属性...
})
```

### 设置 JSON

```js
const editor = createEditor({
  content: [...], // editor.children 获取的内容
  // 其他属性
})
```

::: tip
其他的内容处理，可参考 [API](./API.html)
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
    document.getElementById('textarea-1').innerHTML = contentStr

    const html = editor.getHtml()
    document.getElementById('textarea-2').innerHTML = html
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

如果你的 html 结构无法做到上述要求，或者不想用全屏功能，可以通过[工具栏配置](/v5/guide/toolbar-config.html) `{ excludeKeys: 'fullScreen' }` 来隐藏全屏菜单。

### 其他

- 可以自定义 `toolbar-container` 的样式和行为，实现工具栏 fixed 到顶部
- 可以自定义 html 实现腾讯文档、语雀文档的效果，参考 [demo](https://www.wangeditor.com/demo/zh-CN/like-qq-doc.html)
- 其他自行探索

![](/image/yuque.png)

## 一个页面多个编辑器

wangEditor 支持多个编辑器共存，正常创建即可

```html
<div id="toolbar-container-1"></div>
<div id="editor-container-1"></div>

<hr>

<div id="toolbar-container-2"></div>
<div id="editor-container-2"></div>
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