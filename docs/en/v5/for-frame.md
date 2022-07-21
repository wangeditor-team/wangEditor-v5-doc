# For Vue React

If you first-time use wangEditor, please see [Get started](./getting-started.md) it to learn basic usage.

## Vue2

### Demo

- [Demo source](https://github.com/wangfupeng1988/vue2-wangeditor-demo)
- [Online demo](https://codesandbox.io/s/vue2-wangeditor-demo-1rwjms?file=/src/components/MyEditor.vue)

### Installation

```sh
yarn add @wangeditor/editor
# npm install @wangeditor/editor --save

yarn add @wangeditor/editor-for-vue
# npm install @wangeditor/editor-for-vue --save
```

### Usage

Template

```xml
<template>
    <div style="border: 1px solid #ccc;">
        <Toolbar
            style="border-bottom: 1px solid #ccc"
            :editor="editor"
            :defaultConfig="toolbarConfig"
            :mode="mode"
        />
        <Editor
            style="height: 500px; overflow-y: hidden;"
            v-model="html"
            :defaultConfig="editorConfig"
            :mode="mode"
            @onCreated="onCreated"
        />
    </div>
</template>
```

Script

```html
<script>
import Vue from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

export default Vue.extend({
    components: { Editor, Toolbar },
    data() {
        return {
            editor: null,
            html: '<p>hello</p>',
            toolbarConfig: { },
            editorConfig: { placeholder: 'Type here...' },
            mode: 'default', // or 'simple'
        }
    },
    methods: {
        onCreated(editor) {
            this.editor = Object.seal(editor) // Use `Object.seal`
        },
    },
    mounted() {
        // Simulate ajax async set HTMl content.
        setTimeout(() => {
            this.html = '<p>Async set HTML content.</p>'
        }, 1500)
    },
    beforeDestroy() {
        const editor = this.editor
        if (editor == null) return
        editor.destroy() // Timely destroy editor !
    }
})
</script>
```

:::tip
- Use `Object.seal()` when set `this.editor`
- Timely destroy `editor` before vue component destroy.
:::

Import style

```html
<style src="@wangeditor/editor/dist/css/style.css"></style>
```

### Config

You can extend toolbar and editor config in `toolbarConfig` and `editorConfig` (above code)
- [Toolbar Config](./toolbar-config.md) - Insert a new menu, exclude some menus
- [Editor Config](./editor-config.md) - Editor life-cycles, custom **paste** event
- [Menus Config](./menu-config.md) - Config colors font-size font-family, config **upload image**

Be careful: life-cycle functions (format like `onXxx`) which in editor's config, **you should use Vue events, not use in `editorConfig`**

```xml
<template>
    <div style="border: 1px solid #ccc;">
        <Toolbar ... />
        <Editor
            @onCreated="onCreated"
            @onChange="onChange"
            @onDestroyed="onDestroyed"
            @onMaxLength="onMaxLength"
            @onFocus="onFocus"
            @onBlur="onBlur"
            @customAlert="customAlert"
            @customPaste="customPaste"
        />
    </div>
</template>
```

```js
methods: {
    onCreated(editor) {
        this.editor = Object.seal(editor)
        console.log('onCreated', editor)
    },
    onChange(editor) { console.log('onChange', editor.children) },
    onDestroyed(editor) { console.log('onDestroyed', editor) },
    onMaxLength(editor) { console.log('onMaxLength', editor) },
    onFocus(editor) { console.log('onFocus', editor) },
    onBlur(editor) { console.log('onBlur', editor) },
    customAlert(info: string, type: string) { window.alert(`customAlert in Vue demo\n${type}:\n${info}`) },
    customPaste(editor, event, callback) {
        console.log('ClipboardEvent is paste event data', event)
        // const html = event.clipboardData.getData('text/html') // get paste html
        // const text = event.clipboardData.getData('text/plain') // get paste text
        // const rtf = event.clipboardData.getData('text/rtf') // get paste rtf data (word, wsp...)

        // Insert some text
        editor.insertText('xxx')

        // return false ，prevent default paste behavior
        event.preventDefault() // If you return false
        callback(false) // You can not `return xxx` in Vue event function, use `callback`

        // return true ，go on default paste behavior
        // callback(true)
    },
}
```

### API

You can use `this.editor` to get the `editor` instance after it's rendered, and trigger it's [APIs]((./API.md)).

```xml
<template>
    <div>
        <button @click="insertText">insert text</button>
        <div style="border: 1px solid #ccc;">
            <Toolbar .../>
            <Editor .../>
        </div>
    </div>
</template>
```

```js
methods: {
    insertText() {
        const editor = this.editor // get editor instance
        if (editor == null) return

        // Trigger it's API or property
        editor.insertText('hello')
        console.log(editor.children)
    },
},
```

## Vue3

### Demo

- [Demo source](https://github.com/wangfupeng1988/vue3-wangeditor-demo)
- [Online demo](https://stackblitz.com/edit/vue3-wangeditor-demo?file=src%2Fcomponents%2FBasicEditor.vue)

### Installation

Install `@wangeditor/editor` and `@wangeditor/editor-for-vue@next`, see [Installation](./installation.md).

```sh
yarn add @wangeditor/editor
# npm install @wangeditor/editor --save

yarn add @wangeditor/editor-for-vue@next
# npm install @wangeditor/editor-for-vue@next --save
```

### Usage

Template

```xml
<template>
    <div style="border: 1px solid #ccc">
      <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        :mode="mode"
      />
      <Editor
        style="height: 500px; overflow-y: hidden;"
        v-model="valueHtml"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onCreated="handleCreated"
      />
    </div>
</template>
```

Script

```html
<script>
import '@wangeditor/editor/dist/css/style.css' // import css

import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

export default {
  components: { Editor, Toolbar },
  setup() {
    // editor instance, use `shallowRef`
    const editorRef = shallowRef()

    // content HTML
    const valueHtml = ref('<p>hello</p>')

    // Simulate ajax async set HTML
    onMounted(() => {
        setTimeout(() => {
            valueHtml.value = '<p>Ajax async set HTML.</p>'
        }, 1500)
    })

    const toolbarConfig = {}
    const editorConfig = { placeholder: 'Type here...' }

    // Timely destroy `editor` before vue component destroy.
    onBeforeUnmount(() => {
        const editor = editorRef.value
        if (editor == null) return
        editor.destroy()
    })

    const handleCreated = (editor) => {
      editorRef.value = editor // record editor instance
    }

    return {
      editorRef,
      mode: 'default', // or 'simple'
      valueHtml,
      toolbarConfig,
      editorConfig,
      handleCreated
    };
  }
}
</script>    
```

:::tip
- Use `shallowRef` when create editor instance.
- Timely destroy `editor` before vue component destroy.
:::

### Config

You can extend toolbar and editor config in `toolbarConfig` and `editorConfig` (above code)
- [Toolbar Config](./toolbar-config.md) - Insert a new menu, exclude some menus
- [Editor Config](./editor-config.md) - Editor life-cycles, custom **paste** event
- [Menus Config](./menu-config.md) - Config colors font-size font-family, config **upload image**

Be careful: life-cycle functions (format like `onXxx`) which in editor's config, **you should use Vue events, not use in `editorConfig`**

```xml
<template>
    <div style="border: 1px solid #ccc">
      <Toolbar ... />
      <Editor
        @onCreated="handleCreated"
        @onChange="handleChange"
        @onDestroyed="handleDestroyed"
        @onFocus="handleFocus"
        @onBlur="handleBlur"
        @customAlert="customAlert"
        @customPaste="customPaste"
      />
    </div>
</template>
```

```js
const handleCreated = (editor) => {
    editorRef.value = editor
    console.log('created', editor)
}
const handleChange = (editor) => { console.log('change:', editor.children) }
const handleDestroyed = (editor) => { console.log('destroyed', editor) }
const handleFocus = (editor) => { console.log('focus', editor) }
const handleBlur = (editor) => { console.log('blur', editor) }
const customAlert = (info, type) => { alert(`Custom alert: ${type} - ${info}`) }
const customPaste = (editor, event, callback) => {
    console.log('ClipboardEvent is paste event data', event)
    // const html = event.clipboardData.getData('text/html') // get paste html
    // const text = event.clipboardData.getData('text/plain') // get paste text
    // const rtf = event.clipboardData.getData('text/rtf') // get paste rtf data (word, wsp...)

    // Insert your custom text
    editor.insertText('xxx')

    // return false ，prevent default paste behavior
    event.preventDefault()
    callback(false) // You can not `return xxx` in Vue event function, use `callback`

    // return true ，go on default paste behavior
    // callback(true)
}

return {
    // others...

    handleCreated,
    handleChange,
    handleDestroyed,
    handleFocus,
    handleBlur,
    customAlert,
    customPaste
}
```

### API

You can use `editorRef.value` to get the `editor` instance after it's rendered, and trigger it's [APIs]((./API.md)).

```xml
<template>
    <div>
        <button @click="insertText">insert text</button>
        <div style="border: 1px solid #ccc">
            <Toolbar ... />
            <Editor ... />
        </div>
    </div>
</template>
```

```js
const insertText = () => {
    const editor = editorRef.value // get editor instance, after it's rendered
    if (editor == null) return

    editor.insertText('hello world') // trigger editor API
}

return {
    // others...

    insertText
}
```

## React

### Demo

- [Demo source](https://github.com/wangfupeng1988/react-wangeditor-demo)
- [Online demo](https://codesandbox.io/s/react-wangeditor-demo-unvron?file=/src/components/MyEditor.js)

### Installation

```sh
yarn add @wangeditor/editor
# npm install @wangeditor/editor --save

yarn add @wangeditor/editor-for-react
# npm install @wangeditor/editor-for-react --save
```

### Usage

```tsx
import '@wangeditor/editor/dist/css/style.css' // import css

import React, { useState, useEffect } from 'react'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'

function MyEditor() {
    // editor instance
    const [editor, setEditor] = useState<IDomEditor | null>(null)  // TS syntax
    // const [editor, setEditor] = useState(null)                  // JS syntax

    // editor content
    const [html, setHtml] = useState('<p>hello</p>')

    // Simulate ajax async set html
    useEffect(() => {
        setTimeout(() => {
            setHtml('<p>hello&nbsp;world</p>')
        }, 1500)
    }, [])

    const toolbarConfig: Partial<IToolbarConfig> = { }  // TS syntax
    // const toolbarConfig = { }                        // JS syntax

    const editorConfig: Partial<IEditorConfig> = {  // TS syntax
    // const editorConfig = {                       // JS syntax
        placeholder: 'Type here...',
    }

    // Timely destroy editor, important!
    useEffect(() => {
        return () => {
            if (editor == null) return
            editor.destroy()
            setEditor(null)
        }
    }, [editor])

    return (
        <>
            <div style={{ border: '1px solid #ccc', zIndex: 100}}>
                <Toolbar
                    editor={editor}
                    defaultConfig={toolbarConfig}
                    mode="default"
                    style={{ borderBottom: '1px solid #ccc' }}
                />
                <Editor
                    defaultConfig={editorConfig}
                    value={html}
                    onCreated={setEditor}
                    onChange={editor => setHtml(editor.getHtml())}
                    mode="default"
                    style={{ height: '500px', overflowY: 'hidden' }}
                />
            </div>
            <div style={{ marginTop: '15px' }}>
                {html}
            </div>
        </>
    )
}

export default MyEditor
```

### Config

You can extend toolbar and editor config in `toolbarConfig` and `editorConfig` (above code)
- [Toolbar Config](./toolbar-config.md) - Insert a new menu, exclude some menus
- [Editor Config](./editor-config.md) - Editor life-cycles, custom **paste** event
- [Menus Config](./menu-config.md) - Config colors font-size font-family, config **upload image**

### API

You can get the `editor` state value, and trigger it's [APIs]((./API.md)).

```jsx
function insertText() {
    if (editor == null) return
    editor.insertText('hello')
}

return (
    <>
        <button onClick={insertText}>insert text</button>
        <div style={{ border: '1px solid #ccc', zIndex: 100}}>
            <Toolbar ... />
            <Editor ... />
        </div>
    </>
)
```
