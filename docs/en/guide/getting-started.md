# Getting Started

If you wanna to use wangEditor in Vue or React, please read this article first, then check [this article](./for-frame.md).

## Create Empty Editor

### Define Html Code

```html
<div id="toolbar-container">
    <!-- for toolbar -->
</div>

<div id="editor-container">
    <!-- for editor -->
</div>
```

### Create Editor and Toolbar

Import wangEditor

```js
// npm
import '@wangeditor/editor/dist/css/style.css'
import { createEditor, createToolbar, IEditorConfig, IDomEditor } from '@wangeditor/editor'

// CDN
// const { createEditor, createToolbar } = window.wangEditor
```

Create editor and toolbar

```ts
const editorConfig: Partial<IEditorConfig> = {}
editorConfig.placeholder = 'Type here please'
editorConfig.onChange = (editor: IDomEditor) => {
    // will be trigger when content or selection changed
    console.log('content', editor.children)
    console.log('html', editor.getHtml())
}

// create editor
const editor = createEditor({
  selector: '#editor-container',
  config: editorConfig,
  mode: 'default' // or 'simple'
})
// create toolbar
const toolbar = createToolbar({
  editor,
  selector: '#toolbar-container',
  mode: 'default' // or 'simple'
})
```

With the simple code above, you will create a basic editor.

![](/image/editor-en.png)

::: tip
1. The toolbar is not necessary
2. You can [config toolbar menus](./toolbar-config.md) manually
3. There are many [editor configs](./editor-config.md)
:::

### Mode

There are to modes, see [Demo](https://www.wangeditor.com/demo/en/).
- `default` mode, Integrate all wangEditor functions
- `simple` mode, Only basic functions, but terse

::: tip
No matter which mode is used, it does not affect function and config.
:::

## Use `<textarea>`

When editor content changed, sync to `<textarea>`.

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

## Size and Style

### Width and Height

Width is self-adaption, 100% by default.

Height is `min-height: 300px;` by default, you can change it manually.

```html
<div id="toolbar-container"></div>
<div id="editor-container" style="height: 600px;"></div>
```

### Z-Index

wangEditor do not set `z-index` ever, you can set it yourself.

```html
<div id="toolbar-container" style="z-index: 101;"></div>
<div id="editor-container" style="z-index: 100;"></div>
```

### Full-Screen

wangEditor embed full-screen menu, but there is one requirement:
**`toolbar-container` and `editor-container` must have same parent node**.

```html
<style>
  .full-screen-container {
    z-index: 100; /* 如有需要，可以自定义 z-index */
  }
</style>

<div class="full-screen-container">
  <div id="toolbar-container"> <!-- for editor --> </div>
  <div id="editor-container"> <!-- for toolbar --> </div>
</div>
```

If you unwanted full-screen menu, you can hide this by `{ excludeKeys: 'fullScreen' }`, see [Toolbar Config](./toolbar-config.md).

### Others

- You can fixed toolbar to top by define `toolbar-container` style.
- You can dev an editor like Google Doc by redefine html structure and style.

![](/image/like-google-doc.png)

## Multiple Editors

You can create many editors in one page.

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
// create editor1
const editor1 = createEditor({
  selector: '#editor-container-1',
  mode: 'default'
})
// create toolbar1
const toolbar1 = createToolbar({
  editor: editor1,
  selector: '#toolbar-container-1',
  mode: 'default'
})

// create editor2
const editor2 = createEditor({
  selector: '#editor-container-2',
  mode: 'simple'
})
// create toolbar2
const toolbar2 = createToolbar({
  editor: editor2,
  selector: '#toolbar-container-2',
  mode: 'simple'
})
```
