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

## Get Content

### Get HTML and Text

Use `editor.getHtml()` to get HTML content. Use `editor.getText()` to get text content.

### Get JSON

Use `editor.children` to get JSON content.

You can convert JSON to HTML or text format in browser and nodejs.<br>
If in nodejs, you should exec `yarn add jsdom global-jsdom` firstly, then `require('global-jsdom/register')` in front of the below codes.

```js
const editor = createEditor({ content }) // `content` is JSON content
const html = editor.getHtml()
const text = editor.getText()
```

### Custom Style

The html is clean, only has tag, but no style. You may define some style like:

```css
p, li, td, th, blockquote {
    white-space: pre-wrap; /* Show space */
}

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

/* code block */
pre>code {
    display: block;
    border: 1px solid hsl(0, 0%, 91%);
    border-radius: 4px 4px;
    text-indent: 0;
    background-color: #fafafa;
    padding: 10px;
    font-size: 14px;
}

blockquote {
    display: block;
    border-left: 8px solid #d0e5f2;
    padding: 10px 10px;
    margin: 10px 0;
    background-color: #f1f1f1;
}

/* list */
ul, ol {
  margin: 10px 0 10px 20px;
}

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

PS: You should use [Prism.js](https://prismjs.com/) to highlight code block by yourself.

## Set Content

You can set your custom content when creating an editor.

### Set HTML

<b style="color: red;">Be careful: wangEditor can only understand the HTML format from `editor.getHtml()`, but not all HTML formats.</b>

For instance, wangEditor can understand `<strong>hello</strong>`, but can not understand `<span style="font-weight:bold;"></span>`.

```js
const editor = createEditor({
  html: '<p>hello <strong>world</strong></p>', // html content, got from `editor.getHtml()`
  // other props ...
})
```

### Set Text

```js
// 1. Convert text to HTML format
const text = '...' // text content
const html = text.split(/\n/).map(line => `<p>${line}</p>`).join('\n')

// 2. set HTML
const editor = createEditor({
  html,
  // other props ...
})
```

### Set JSON

```js
const editor = createEditor({
  content: [...], // JSON content, got from `editor.children`
  // other props ...
})
```

::: tip
Goto [API](./API.html) to checkout more content APIs.
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
    document.getElementById('textarea-1').innerHTML = contentStr

    const html = editor.getHtml()
    document.getElementById('textarea-2').innerHTML = html
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

```js
<div id="toolbar-container-1"></div>
<div id="editor-container-1"></div>

<hr>

<div id="toolbar-container-2"></div>
<div id="editor-container-2"></div>
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
