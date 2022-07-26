# Getting Started

If you wanna to use wangEditor in Vue or React, please read this article first, then check [this article](./for-frame.md).

## Create Empty Editor

You can see [demo](https://www.wangeditor.com/demo/index.html?lang=en) page source code.

### Import CSS and define style

```html
<link href="https://unpkg.com/@wangeditor/editor@latest/dist/css/style.css" rel="stylesheet">
<style>
  #editor—wrapper {
    border: 1px solid #ccc;
    z-index: 100; /* If you need */
  }
  #toolbar-container { border-bottom: 1px solid #ccc; }
  #editor-container { height: 500px; }
</style>
```

### Define Html Code

```html
<div id="editor—wrapper">
    <div id="toolbar-container"><!-- toolbar --></div>
    <div id="editor-container"><!-- editor --></div>
</div>
```

:::tip
- If you need **full-screen** function, `toolbar-container` and `editor-container` must have a same parent node.
- You can separate `toolbar-container` and `editor-container`, e.g. [simulate Google doc editor](https://www.wangeditor.com/demo/like-qq-doc.html?lang=en).
:::

### Import JS and create editor


```html
<script src="https://unpkg.com/@wangeditor/editor@latest/dist/index.js"></script>
<script>
const { createEditor, createToolbar } = window.wangEditor

const editorConfig = {
    placeholder: 'Type here...',
    onChange(editor) {
      const html = editor.getHtml()
      console.log('editor content', html)
      // You can sync HTML to <textarea>
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
    config: toolbarConfig,
    mode: 'default', // or 'simple'
})
</script>
```

:::tip
- `mode: 'default'` Integrate all wangEditor functions, see [demo](https://www.wangeditor.com/demo/index.html?lang=en) 
- `mode: 'simple'` Only basic functions, but terse, see [demo](https://www.wangeditor.com/demo/simple-mode.html?lang=en)
:::

With the simple code above, you will create a basic editor.

![](/image/editor-en.png)

## Next Todo

If you want a completed editor, you may need to the following work

- [Handle content](./content.md) - Get content, set content, render content
- [Toolbar config](./toolbar-config.md) - Insert a new menu, exclude some menus
- [Editor config](./editor-config.md) - Editor life-cycles, custom **paste** event
- [Menu config](./menu-config.md) - Config colors font-size font-family, config **upload image**
- [Editor API](./API.md) - Control editor content and session
