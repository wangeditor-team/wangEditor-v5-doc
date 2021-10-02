# Editor API

## Config API

### getConfig

Get all editor's default config.

```ts
editor.getConfig()
```

### getMenuConfig

Get one menu default config by key, see [Menu config](./menu-config.md).

```ts
editor.getMenuConfig(menuKey)
```

### getAllMenuKeys

Get all editor's embed menus keys.

```ts
editor.getAllMenuKeys()
```

### alert

Trigger editor's alert, you can config it by [customAlert](./menu-config.md).

```ts
editor.alert('错误信息', 'error')
```

## Content API

### handleTab

Define behavior when tap `tab` key.

```ts
editor.handleTab = () => editor.insertText('    ')
```

### getHtml

Get editor's content html format.

`editor.getHtml()` return a html string ，wrapped a `<div class="w-e-content-container">` to define your custom style.

```html
<div class="w-e-content-container">
    <h1>Header</h1>
    <p>text</p>
</div>
```

- If you unwanted html format, use `editor.getHtml({ withFormat: false })`
- If you want to change container div's class name, use `editor.getHtml({ containerClassName: 'your-custom-class' })`

### getText

Get editor's plain text.

```ts
const text = editor.getText()
```

### isEmpty

Determine whether the editor is empty (just has an empty paragraph)

```ts
editor.isEmpty()
```

:::tip
This method can only identify an empty paragraph. If you want more info, use `editor.getText()` or `editor.getHtml()`.
:::

### getSelectionText

```ts
editor.getSelectionText()
```

### getElemsByTypePrefix

Get all elements in editor by type prefix.

```ts
editor.getElemsByTypePrefix('header') // all header
editor.getElemsByTypePrefix('image') // all images
editor.getElemsByTypePrefix('link') // all links
```

### deleteBackward

```ts
editor.deleteBackward()
```

### deleteForward

```ts
editor.deleteForward()
```

### deleteFragment

Delete all selected content.

```ts
editor.deleteFragment()
```

### getFragment

Get selected content, JSON format.

```ts
editor.getFragment()
```

### insertBreak

```ts
editor.insertBreak()
```

### insertText

```ts
editor.insertText('xxx')
```

### clear

```ts
editor.clear()
```

### undo

```ts
editor.undo()
```

### redo

```ts
editor.redo()
```

## Node API

Please learn the editor [content node structure standard](./node-define.md) first.

### insertNode

Insert a node in selection.

```ts
const node = { type: 'paragraph', children: [{ text: 'simple text' }] }
editor.insertNode(node)
```

### insertNodes

Insert many nodes in selection.

```ts
import { SlateTransforms } from '@wangeditor/editor'

const node1 = { type: 'paragraph', children: [{ text: 'aaa' }] }
const node2 = { type: 'paragraph', children: [{ text: 'bbb' }] }
const nodeList = [node1, node2]

SlateTransforms.insertNodes(editor, nodeList)
```

### removeNodes

Remove all nodes in selection.

```ts
import { SlateTransforms } from '@wangeditor/editor'

SlateTransforms.removeNodes(editor)
```

### Get selected nodes

Use `SlateEditor.nodes` to get selected nodes, see `Editor.nodes` API in [Slate.js doc](https://docs.slatejs.org/).

```ts
import { SlateEditor, SlateElement, SlateNode } from '@wangeditor/editor'

const nodeEntries = SlateEditor.nodes(editor, {
    match: (node: SlateNode) => {
        if (SlateElement.isElement(node)) {
            if (node.type === 'paragraph') {
                return true // match paragraph
            }
        }
        return false
    },
    universal: true,
})

if (nodeEntries == null) {
    console.log('No selected paragraphs')
} else {
    for (let nodeEntry of nodeEntries) {
        const [node, path] = nodeEntry
        console.log('selected node', node)
        console.log('cur path', path)
    }
}
```

### setNodes

Set node props in selection

```ts
import { SlateTransforms } from '@wangeditor/editor'

SlateTransforms.setNodes(editor, {
  // @ts-ignore
  textAlign: 'right'
}, {
  mode: 'highest'
})
```

### getParentNode

```ts
const parentNode = editor.getParentNode(node) // return a node or null
```

### toDOMNode

Get DOM node by a slate node.

```ts
const elem = editor.toDOMNode(node) // return HTMLElement
```

### isInline

Inline's concept, see [Slate.js doc](https://docs.slatejs.org/concepts/02-nodes).

```ts
const inline = editor.isInline(node)
```

### isVoid

Void's concept, See [Slate.js doc](https://docs.slatejs.org/concepts/02-nodes).

```ts
const void = editor.isVoid(node)
```

### isText

Text's concept, See [Slate.js doc](https://docs.slatejs.org/concepts/02-nodes).

```ts
import { SlateText } from '@wangeditor/editor'

SlateText.isText(node) // true/false
```

### isElement

Element's concept, See [Slate.js doc](https://docs.slatejs.org/concepts/02-nodes).

```ts
import { SlateElement } from '@wangeditor/editor'

SlateElement.isElement(node) // true/false
```

### addMark

Mark is text style, like bold italic...

```ts
editor.addMark('bold', true)
editor.addMark('color', '#999')
```

### removeMark

```ts
editor.removeMark('bold') // cancel bold
```

### marks

Get selected text marks.

```ts
import { SlateEditor } from '@wangeditor/editor'

SlateEditor.marks(editor) // like { bold: true, color: "#595959" }
```

## DOM API

### id prop

Editor id, unique.

```ts
editor.id // like 'wangEditor-1'
```

### isFullScreen prop

```ts
editor.isFullScreen // true/false
```

### focus

```ts
editor.focus()
```

### blur

```ts
editor.blur()
```

### isFocused

```ts
editor.isFocused() // true/false
```

### updateView

Force update view and re-render DOM.

```ts
editor.updateView()
```

:::tip
`updateView` is an inner API, not recommended for users.
:::

### scrollToElem

Scroll to designated DOM element, like html anchor.<br>
You can use `toDOMNode` to get DOM element and it's id.

```ts
editor.scrollToElem(elemId)
```

### showProgressBar

```ts
editor.showProgressBar(progress) // progress is number 0-100
```

### hidePanelOrModal

Hide current panel dropList or modal.

```ts
editor.hidePanelOrModal()
```

### fullScreen

```ts
editor.fullScreen()
```

:::tip
Need to standard your html structure, see [Getting started](./getting-started.md).
:::

### unFullScreen

```ts
editor.unFullScreen()
```

### disable

```ts
editor.disable()
```

### isDisabled

```ts
editor.isDisabled() // true/false
```

### enable

```ts
editor.enable()
```

### destroy

Destroy the editor and it's toolbar.

```ts
editor.destroy()
```

:::tip
`destroy` can only remove the DOM element, remove global event binding.
:::

## selection API

You may see [Slate Location doc](https://docs.slatejs.org/concepts/03-locations) API first.

### selection prop

```ts
editor.selection // selection or null
```

selection's format like:

```json
{
  "anchor": { "path": [1,0], "offset":8 },
  "focus": { "path": [1,0], "offset":10 }
}
```

### select

Select a designated location.

```ts
const newSelection = {
  anchor: { path: [1,0], offset:8 },
  focus: { path: [1,0], offset:10 }
}
editor.select(newSelection)
```

### deselect

Cancel select.

```ts
editor.deselect()
```

### restoreSelection

Restore prev selection which is not null.

```ts
editor.restoreSelection()
```

### isSelectedAll

```ts
editor.isSelectedAll() // true/false
```

### getSelectionPosition

Get text selection position data (like `top` `left` `right` `bottom`), which is relative to editor DOM, not body.

```ts
editor.getSelectionPosition() // eg. { left: "80.15px", top: "116px" }
```

### getNodePosition

Get selected node position data (like `top` `left` `right` `bottom`), which is relative to editor DOM, not body.

```ts
editor.getNodePosition(node)
```

## Custom event

wangEditor use [event-emitter](https://www.npmjs.com/package/event-emitter) to extend custom events.

### on

```ts
editor.on('event-key', fn)
```

### off

```ts
editor.off('event-key', fn)
```

### once

```ts
editor.once('event-key', fn)
```

### emit

```ts
editor.emit('event-key')
```

## use Slate.js API

wangEditor is based on [slate.js](https://docs.slatejs.org/) but React. You may use Slate.js API to operate the editor.

### Transforms API

See [slate Transforms API](https://docs.slatejs.org/api/transforms) first.

You could get slate `Transforms` object from `@wangeditor/editor`, no need to install `slate`.

```ts
import { SlateTransforms } from '@wangeditor/editor'
```

### Node Editor API

See [slate Node API](https://docs.slatejs.org/api/nodes) first.

You could get slate Node objects from `@wangeditor/editor`, no need to install `slate`.

```ts
import { SlateEditor, SlateNode, SlateElement, SlateText } from '@wangeditor/editor'
```

### Location API

See [slate Location API](https://docs.slatejs.org/api/locations) first.

You could get slate Location objects from `@wangeditor/editor`, no need to install `slate`.

```ts
import { SlateLocation, SlatePath, SlatePoint, SlateRange } from '@wangeditor/editor'
```

