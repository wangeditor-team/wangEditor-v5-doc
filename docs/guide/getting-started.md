# 快速开始

## 定义 html 结构

编辑器和工具栏是强制分离的，所以要定义两个 div 。

```html
<div id="toolbar-container"></div>
<div id="editor-container"></div>
```

## 创建编辑器和工具栏

PS：安装 wangEditor 参考[这里](/guide/installation.html)。

```js
import * as wangEditor from 'wangEditor'
// CDN: const wangEditor = window.wangEditor

const editorConfig = {}
editorConfig.placeholder = '请输入内容'
editorConfig.onChange = (editor) => {
    // 当编辑器选区、内容变化时，即触发
    console.log('content', editor.children)
}

// 创建编辑器
const editor = wangEditor.createEditor({
  textareaSelector: '#editor-container',
  config: editorConfig,
  content: [], // 默认内容，下文有解释
  mode: 'default' // 或者 'simple' ，下文有解释
})
// 创建工具栏
const toolbar = wangEditor.createToolbar({
  editor,
  toolbarSelector: '#toolbar-container',
  mode: 'default' // 或者 'simple' ，下文有解释
})
```

这样就创建出了一个最基本的编辑器。

![](/image/editor.png)

::: tip
1. 工具栏并不是强制的，如不需要，可以不创建。这并不影响编辑器的使用。
2. 工具栏的菜单是可以配置的，可参考[配置](/guide/toolbar-config.html)。
3. 其他 editor config 可参考[配置](/guide/editor-config.html)。
:::

## content

创建编辑器时，传入的默认内容。即编辑器创建完成后，立马显示这些内容。

但是这里要遵循一定的数据格式规范，具体可参考 [节点数据结构](/guide/node-define.html) 。

```js
[
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
]
```

:::tip
content 只能是上述 json 格式，**不支持 html**<br>
所以，**在保存编辑器内容时，一定要保存 `editor.children` ，方便再次编辑内容**<br>
是否要存储 html 视情况而定，参考[这里](/guide/display.html)
:::

## mode

编辑器内置了两种模式（区别可参考 [demo](/demo.html)）
- `default` 默认模式 - 集成了 wangEditor 所有功能
- `simple` 简洁模式 - 仅有部分常见功能，但更加简洁易用

::: tip
无论使用哪一种模式，都不会影响其他的配置和功能。
:::

## 使用 textarea

editor changed 后，同步内容到 textarea 即可

```js
editorConfig.onChange = (editor) => {
    const content = editor.children
    const contentStr = JSON.stringify(content)
    document.getElementById('textarea-1').innerHTML = contentStr
}
```

## 宽度和高度

宽度都是自适应的，默认会 100% 宽度。

编辑器的高度，wangEditor 会默认设置 `min-height: 300px;` 给一个最小高度。其他的需要你自己定义。

```html
<div id="toolbar-container"></div>
<div id="editor-container" style="height: 600px;"></div>
```

## z-index

wangEditor 没有针对 z-index 做配置，需要你自己定义。

```html
<div id="toolbar-container" style="z-index: 101;"></div>
<div id="editor-container" style="z-index: 100;"></div>
```

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
import * as wangEditor from 'wangEditor'
// CDN: const wangEditor = window.wangEditor

// 创建编辑器1
const editor1 = wangEditor.createEditor({
  textareaSelector: '#editor-container-1',
  config: editorConfig,
  content: [],
  mode: 'default'
})
// 创建工具栏1
const toolbar1 = wangEditor.createToolbar({
  editor1,
  toolbarSelector: '#toolbar-container-1',
  mode: 'default'
})

// 创建编辑器2
const editor2 = wangEditor.createEditor({
  textareaSelector: '#editor-container-2',
  config: editorConfig,
  content: [],
  mode: 'simple'
})
// 创建工具栏2
const toolbar2 = wangEditor.createToolbar({
  editor2,
  toolbarSelector: '#toolbar-container-2',
  mode: 'simple'
})
```