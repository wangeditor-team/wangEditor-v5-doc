# 快速开始

## 创建编辑器

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
// const wangEditor = window.wangEditor // 全局变量
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
  content: [], // 默认内容，下文有解释
  mode: 'default' // 或者 'simple' ，下文有解释
})
// 创建工具栏
const toolbar = createToolbar({
  editor,
  selector: '#toolbar-container',
  mode: 'default' // 或者 'simple' ，下文有解释
})
```

这样就创建出了一个最基本的编辑器。

![](/v5/image/editor.png)

::: tip
1. 工具栏并不是强制的，如不需要，可以不创建。这并不影响编辑器的使用。
2. 工具栏的菜单是可以配置的，可参考[配置](/v5/guide/toolbar-config.html)。
3. 其他 editor config 可参考[配置](/v5/guide/editor-config.html)。
:::

### content 初始化内容

创建编辑器时，传入的默认内容。即编辑器创建完成后，立马显示这些内容。

但是这里要遵循一定的数据格式规范，具体可参考 [节点数据结构](/v5/guide/node-define.html) 。

```js
createEditor({
  content: [
      // 一个标题
      {
          type: 'header1',
          children: [
              { text: '标题A' }
          ]
      },
      // 一行文字
      {
          type: 'paragraph',
          children: [
              { text: 'hello world ~~~ ' }
          ]
      }
  ],
  // content: [] // 即空内容

  // 其他属性
})
```

PS：上述代码在 Typescript 环境下可能报错，请参考[用于 Typescript](/v5/guide/for-ts.html)。

:::tip
content 只能是上述 json 格式，**不支持 html**（原因可参考[这里](https://github.com/wangeditor-team/wangEditor-v5/issues/233)）<br>
所以，**在保存编辑器内容时，一定要保存 `editor.children` ，方便再次编辑内容**<br>
是否要存储 html 视情况而定，参考[这里](/v5/guide/display.html)
:::

### mode 模式

编辑器内置了两种模式（区别可参考 [demo](https://www.wangeditor.com/demo/zh-CN/index.html)）
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

![](/v5/image/yuque.png)

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
  content: [],
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
  content: [],
  mode: 'simple'
})
// 创建工具栏2
const toolbar2 = createToolbar({
  editor: editor2,
  selector: '#toolbar-container-2',
  mode: 'simple'
})
```