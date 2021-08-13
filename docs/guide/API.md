# 编辑器 API

## config 相关

### getConfig

获取编辑器所有配置

```js
editor.getConfig()
```

### getMenuConfig

获取单个 menu 的配置。menu 配置相关的可参考[这里](/guide/menu-config.html)。

```js
editor.getMenuConfig(menuKey)
```

### getAllMenuKeys

获取编辑器所有 menu 的 key

```js
editor.getAllMenuKeys()
```

### alert

编辑器 alert ，可通过 [customAlert](/guide/editor-config.html#customalert) 配置。

```js
editor.alert('错误信息', 'error')
```

## 内容处理

### handleTab

控制编辑器按 tab 键时，输入什么。默认如下

```js
editor.handleTab = () => editor.insertText('    ')
```

### getHtml

获取编辑器当前 html 。

`editor.getHtml()` 获取格式化的 html ，外面包裹一个 `<div class="w-e-content-container">` 用于自定义显示时的样式。

```html
<div class="w-e-content-container">
    <h1>一行标题</h1>
    <p>一行文字</p>
</div>
```

如果想要去掉格式化，可使用 `editor.getHtml({ withFormat: false })`

如果想要修改 `<div>` 的 `class` ，可使用 `editor.getHtml({ containerClassName: 'your-custom-class' })`

### getText

获取当前编辑器的纯文本内容

```js
const text = editor.getText()
```

### isEmpty

判断当前编辑器内容是否为空（只有一个空段落）

```js
editor.isEmpty()
```

:::tip
该方法只能识别**只有一个空段落**情况，其他情况（如有一个空标题、空表格）请使用 `editor.getText()` 来判断。
:::

### getSelectionText

获取选中的文本

```js
editor.getSelectionText()
```

### getElemsByTypePrefix

通过 type 前缀获取编辑器的 element 列表。

```js
editor.getElemsByTypePrefix('header') // 获取所有标题
editor.getElemsByTypePrefix('image') // 获取所有图片
editor.getElemsByTypePrefix('link') // 获取所有链接
// 其他
```

获取标题的返回的格式如：

```json
[
  {
    "id": "w-e-element-0",
    "type": "header1",
    "text": "标题1"
  },
  {
    "id": "w-e-element-19",
    "type": "header2",
    "text": "标题1-1"
  },
  {
    "id": "w-e-element-37",
    "type": "header3",
    "text": "标题1-1-1"
  }
]
```

### deleteBackward

向后删除，相当于按 backspace 键。

```js
editor.deleteBackward()
```

### deleteForward

向后删除，相当于按 delete 键（部分键盘没有这个键）

```js
editor.deleteForward()
```

### deleteFragment

删除选中的内容

```js
editor.deleteFragment()
```

### getFragment

获取选中的内容，json 格式

```js
editor.getFragment()
```

### insertBreak

在选区回车换行

```js
editor.insertBreak()
```

### insertText

在选区插入文本

```js
editor.insertText('xxx')
```

### undo

撤销

```js
editor.undo()
```

### redo

重做

```js
editor.redo()
```

## 节点操作

使用节点操作 API 前，请查看 [节点数据结构](/guide/node-define.html) 。

### insertNode

在选区插入一个节点

```js
const node = { type: 'paragraph', children: [{ text: 'simple text' }] }
editor.insertNode(node)
```

### insertNodes

在选区插入多个节点

```js
import { SlateTransforms } from '@wangeditor/editor-cattle'
// CDN：const SlateTransforms = window.wangEditor.SlateTransforms

const node1 = { type: 'paragraph', children: [{ text: 'aaa' }] }
const node2 = { type: 'paragraph', children: [{ text: 'bbb' }] }
const nodeList = [node1, node2]

SlateTransforms.insertNodes(editor, nodeList)
```

### removeNodes

删除选区所在的节点

```js
import { SlateTransforms } from '@wangeditor/editor-cattle'
// CDN：const SlateTransforms = window.wangEditor.SlateTransforms

SlateTransforms.removeNodes(editor)
```

### 获取选中节点

可使用 `SlateEditor.nodes` 获取选中的节点。

```js
import { SlateEditor } from '@wangeditor/editor-cattle'
// CDN：const SlateEditor = window.wangEditor.SlateEditor

const nodeEntries = SlateEditor.nodes(editor, {
  match: node => node.type === 'paragraph', // 匹配 paragraph
  universal: true,
})

if (nodeEntries == null) {
  console.log('当前未选中的 paragraph')
} else {
  const [node, path] = nodeEntries[0]
  console.log('选中了 paragraph 节点', node)
  console.log('节点 path 是', path)
}
```

### setNodes

设置选中节点的属性

```js
import { SlateTransforms } from '@wangeditor/editor-cattle'
// CDN：const SlateTransforms = window.wangEditor.SlateTransforms

SlateTransforms.setNodes(editor, { textAlign: 'left' }, {
  mode: 'highest' // 针对最高层级的节点
})
```

### getParentNode

获取一个节点的父节点

```js
const parentNode = editor.getParentNode(node) // 返回 node 或者 null
```

### toDOMNode

获取一个节点对应的 DOM 节点

```js
const elem = editor.toDOMNode(node) // 返回 HTMLElement
```

### isInline

判断一个节点是否是 inline

```js
const inline = editor.isInline(node)
```

### isVoid

判断一个节点是否是 void

```js
const void = editor.isVoid(node)
```

:::tip
void node 即没有子元素的节点（它本身就可以看作是一个特殊字符），例如 image video 。可参考 [html void element](https://www.w3.org/TR/2011/WD-html-markup-20110113/syntax.html#void-element) 定义。

你可以通过 `editor.isVoid` 自定义哪些元素是 void ，不过这详细学习 slate 。
:::

### isText

判断一个节点是否是 text

```js
import { SlateText } from '@wangeditor/editor-cattle'
// CDN：const SlateText = window.wangEditor.SlateText

SlateText.isText(node) // true/false
```

### isElement

判断一个节点是否是 elem

```js
import { SlateElement } from '@wangeditor/editor-cattle'
// CDN：const SlateElement = window.wangEditor.SlateElement

SlateElement.isElement(node) // true/false
```

### addMark

为选中的文本添加标记（文本样式）

```js
editor.addMark({
  bold: true,     // 加粗
  color: '#999'   // 文字颜色
})
```

### removeMark

对选中的文字，取消标记（文本样式）

```js
editor.removeMark('bold') // 取消加粗
```

### marks

获取选中文字的标记（文本样式）

```js
import { SlateEditor } from '@wangeditor/editor-cattle'
// CDN：const SlateEditor = window.wangEditor.SlateEditor

SlateEditor.marks(editor) // 例如 { bold: true, color: "#595959" }
```

## DOM 相关

### id 属性

获取编辑器 id

```js
editor.id // 如 'wangEditor-1'
```

### isFullScreen 属性

编辑器是否全屏

```js
editor.isFullScreen // true/false
```

### focus

聚焦到编辑器

```js
editor.focus()
```

### blur

失焦编辑器

```js
editor.blur()
```

### isFocused

判断当前编辑器是否聚焦？

```js
editor.isFocused() // true/false
```

### updateView

强制更新视图

```js
editor.updateView()
```

:::tip
updateView 是内部 API ，不建议用户使用。如要使用，也请勿频繁执行。
:::

### scrollToElem

滚动到指定元素，类似锚点。如滚动到某个标题的位置。

可根据 `toDOMNode` 获取 node 对应的 DOM 元素。

```js
editor.scrollToElem(elemId)
```

### showProgressBar

显示进度条，一般用于上传功能

```js
editor.showProgressBar(progress) // progress 为 0-100 的数字
```

### hidePanelOrModal

隐藏当前的弹框 （如插入链接） 和下拉列表（如设置标题、设置字体）

```js
editor.hidePanelOrModal()
```

### fullScreen

设置为全屏

```js
editor.fullScreen()
```

:::tip
全屏功能，有 html 结构的要求，请参考[这里](/guide/getting-started.html#全屏)
:::

### unFullScreen

取消全屏

```js
editor.unFullScreen()
```

### disable

禁用编辑器，设置为只读

```js
editor.disable()
```

### isDisabled

判断当前编辑器是否只读？

```js
editor.isDisabled() // true/false
```

### enable

取消禁用，取消只读

```js
editor.enable()
```

### destroy

销毁编辑器和工具栏

```js
editor.destroy()
```

:::tip
destroy 仅仅是移除编辑器、工具栏的 DOM 节点，全局绑定的事件等。<br>
自己定义的变量，如 `const editor = wangEditor.createEditor({...})` ，这个 `editor` 还需要自己来销毁。
:::

## selection 相关

selection 数据结构参考 [slate Location](https://docs.slatejs.org/concepts/03-locations) 。

### selection 属性

获取编辑器当前的选区。如果未选中，则返回 `null` 。

```js
editor.selection // selection 或 null
```

selection 数据结构如下：

```json
{
  "anchor": { "path": [1,0], "offset":8 },
  "focus": { "path": [1,0], "offset":10 }
}
```

### select

选中一个指定的选区。

```js
const newSelection = {
  anchor: { path: [1,0], offset:8 },
  focus: { path: [1,0], offset:10 }
}
editor.select(newSelection)
```

### deselect

取消选中

```js
editor.deselect()
```

### restoreSelection

恢复最近一次非 null 选区。如编辑器 blur 之后，再重新恢复选区。

```js
editor.restoreSelection()
```

### getSelectionPosition

获取选区的定位（相对于编辑区域，而非 body），**将视情况返回 `left` `right` `top` `bottom` 的其中几个**。

```js
editor.getSelectionPosition() // 例如 { left: "80.15px", top: "116px" }
```

### getNodePosition

获取某个节点的定位（相对于编辑区域，而非 body），**将视情况返回 `left` `right` `top` `bottom` 的其中几个**。

```js
editor.getNodePosition(node)
```

## 自定义事件

wangEditor 使用 [event-emitter](https://www.npmjs.com/package/event-emitter) 来做自定义事件。

### on

监听某个事件

```js
editor.on('event-key', fn)
```

### off

取消监听

```js
editor.off('event-key', fn)
```

### once

只监听一次

```js
editor.once('event-key', fn)
```

### emit

触发事件

```js
editor.emit('event-key')
```

## 使用 slate 解锁更多 API

> wangEditor 基于 [slate.js](https://docs.slatejs.org/)（但不依赖 React）开发

上文已列出了比较常用的 API ，但这并不是全部。 slate.js 还提供了更多 API ，可满足你的所有操作需求。

### Transforms API

参考 [slate Transforms API](https://docs.slatejs.org/api/transforms)

使用如下方式即可得到 slate Transforms 对象，不用再单独安装 slate 。

```js
import { SlateTransforms } from '@wangeditor/editor-cattle'
// CDN：const SlateTransforms = window.wangEditor.SlateTransforms
```

### Node Editor API

参考 [slate Node API](https://docs.slatejs.org/api/nodes)

使用如下方式即可得到 slate Node 相关对象，不用再单独安装 slate 。

```js
import { SlateEditor, SlateNode, SlateElement, SlateText } from '@wangeditor/editor-cattle'
// CDN：const SlateEditor = window.wangEditor.SlateEditor
// CDN：const SlateNode = window.wangEditor.SlateNode
// CDN：const SlateElement = window.wangEditor.SlateElement
// CDN：const SlateText = window.wangEditor.SlateText
```

### Location API

参考 [slate Location API](https://docs.slatejs.org/api/locations)

使用如下方式即可得到 slate Location 相关对象，不用再单独安装 slate 。

```js
import { SlateLocation, SlatePath, SlatePoint, SlateRange } from '@wangeditor/editor-cattle'
// CDN：const SlateLocation = window.wangEditor.SlateLocation
// CDN：const SlatePath = window.wangEditor.SlatePath
// CDN：const SlatePoint = window.wangEditor.SlatePoint
// CDN：const SlateRange = window.wangEditor.SlateRange
```

