# For Vue React

If you first-time use wangEditor, please see [Get started](./getting-started.md) it to learn basic usage.

## Attention

This article only introduces editor components, you should also learn some API and configs.
- [Toolbar Config](./toolbar-config.md)
- [Editor Config](./editor-config.md)
- [Editor API](./API.md)
- [Menus Config](./menu-config.md)

## Vue2

### Installation

Install `@wangeditor/editor` 和 `@wangeditor/editor-for-vue`, see [Installation](./installation.md).

### Basic usage

Template

```xml
<template>
    <div style="border: 1px solid #ccc;">
        <Toolbar
            style="border-bottom: 1px solid #ccc"
            :editorId="editorId"
            :defaultConfig="toolbarConfig"
            :mode="mode"
        />
        <Editor
            style="height: 500px"
            :editorId="editorId"
            :defaultConfig="editorConfig"
            :defaultContent="getDefaultContent"
            :defaultHtml="defaultHtml"
            :mode="mode"
        />
        <!-- Choose either `defaultContent` (JSON format) or `defaultHtml` (HTML format) -->
    </div>
</template>
```

Script

```html
<script>
import Vue from 'vue'
import '@wangeditor/editor/dist/css/style.css'
import { Editor, Toolbar, getEditor, removeEditor } from '@wangeditor/editor-for-vue'
import cloneDeep from 'lodash.clonedeep'

export default Vue.extend({
    components: { Editor, Toolbar },
    data() {
        return {
            editorId: `w-e-${Math.random().toString().slice(-5)}`, // Must be unique !
            toolbarConfig: {},
            editorConfig: { placeholder: 'Type your text...' },
            mode: 'default', // or 'simple'

            // Choose either `defaultContent` (JSON format) or `defaultHtml` (HTML format)
            defaultContent: [
                { type: 'paragraph', children: [{ text: 'hello world' }] }
            ],
            defaultHtml: '<p>hello</p>'
        }
    },
    computed: {
        getDefaultContent() {
            return cloneDeep(this.defaultContent) // Must deep clone `defaultContent`
        }
    },
    beforeDestroy() {
        const editor = getEditor(this.editorId)
        if (editor == null) return

        // Timely destroy editor !
        editor.destroy()
        removeEditor(this.editorId)
    }
})
</script>
```

:::tip
- `editorId` should be unique.
- You should choose either `defaultContent` (JSON format) or `defaultHtml` (HTML format)
- If you chose `defaultContent`, you should deep clone it in `computed`.
- Timely destroy `editor` before vue component destroy.
:::

Import style

```html
<style src="@wangeditor/editor/dist/css/style.css"></style>
```

### Ajax async set content

For instance, you may async set content after ajax. **You can not change `defaultContent` or `defaultHtml` directly, but async-render the component**.

Add a `data` property `isEditorShow: false`, set `true` when ajax done.

```js
data() {
    return {
        // other data properties...

        isEditorShow: false
    }
},
mounted() {
    // Simulate ajax, async set content
    setTimeout(() => {
        // Choose either `defaultContent` (JSON format) or `defaultHtml` (HTML format)
        this.defaultContent = [
            { type: 'paragraph', children: [{ text: 'ajax content' }] }
        ]
        this.defaultHtml: '<p>ajax&nbsp;content</p>'

        this.isEditorShow = true
    }, 1000)
},
```

In template, async-render component according to `isEditorShow`.

```xml
<template>
    <div>
        <div v-if="isEditorShow" style="border: 1px solid #ccc;">
            <Toolbar ... />
            <Editor ... />
        </div>
        <p v-else>loading...</p>
    </div>
</template>
```

### Config

You can extend toolbar and editor config in `toolbarConfig` and `editorConfig` (above code)
- [Toolbar Config](./toolbar-config.md)
- [Editor Config](./editor-config.md)
- [Menus Config](./menu-config.md)

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
    onCreated(editor) { console.log('onCreated', editor) },
    onChange(editor) { console.log('onChange', editor.children) },
    onDestroyed(editor) { console.log('onDestroyed', editor) },
    onMaxLength(editor) { console.log('onMaxLength', editor) },
    onFocus(editor) { console.log('onFocus', editor) },
    onBlur(editor) { console.log('onBlur', editor) },
    customAlert(info: string, type: string) { window.alert(`customAlert in Vue demo\n${type}:\n${info}`) },
    customPaste(editor, event, callback) {
        console.log('ClipboardEvent is paste event data', event)

        // Insert some text
        editor.insertText('xxx')

        // You can not `return xxx` in Vue event function, use `callback`
        callback(false) // return false ，prevent default paste behavior
        // callback(true) // return true ，go on default paste behavior
    },
}
```

### API

You can use `getEditor(this.editorId)` to get the `editor` instance after it's rendered, and trigger it's [APIs]((./API.md)).

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
        const editor = getEditor(this.editorId) // get editor instance (after it's rendered)
        if (editor == null) return

        // Trigger it's API or property
        editor.insertText('hello')
        console.log(editor.children)
    },
},
mounted() {
    this.$nextTick(() => {
        const editor = getEditor(this.editorId) // get editor instance (after it's rendered)
        if (editor == null) return
        console.log('getEditor on mounted', editor)
    })
},
```

## Vue3

### Installation

Install `@wangeditor/editor` and `@wangeditor/editor-for-vue@next`, see [Installation](./installation.md).

### Basic usage

Template

```xml
<template>
    <div style="border: 1px solid #ccc">
      <Toolbar
        :editorId="editorId"
        :defaultConfig="toolbarConfig"
        :mode="mode"
        style="border-bottom: 1px solid #ccc"
      />
      <Editor
        :editorId="editorId"
        :defaultConfig="editorConfig"
        :defaultContent="getDefaultContent"
        :defaultHtml="defaultHtml"
        :mode="mode"
        style="height: 500px"
      />
      <!-- Choose either `defaultContent` (JSON format) or `defaultHtml` (HTML format) -->
    </div>
</template>
```

Script

```html
<script>
import { computed, onBeforeUnmount, ref } from 'vue'
import { Editor, Toolbar, getEditor, removeEditor } from '@wangeditor/editor-for-vue'
import cloneDeep from 'lodash.clonedeep'

export default {
  components: { Editor, Toolbar },
  setup() {
    const editorId = `w-e-${Math.random().toString().slice(-5)}` // Must be unique !

    // Choose either `defaultContent` (JSON format) or `defaultHtml` (HTML format)
    const defaultHtml = 'hello&nbsp;word'
    const defaultContent = [
        { type: 'paragraph', children: [{ text: 'hello word' }] }
    ]
    const getDefaultContent = computed(() => cloneDeep(defaultContent)) // Must deep clone `defaultContent`

    const toolbarConfig = {}
    const editorConfig = { placeholder: 'Type here...' }

    // Timely destroy `editor` before vue component destroy.
    onBeforeUnmount(() => {
        const editor = getEditor(editorId)
        if (editor == null) return

        editor.destroy()
        removeEditor(editorId)
    })

    return {
      editorId,
      mode: 'default',
      defaultHtml,
      getDefaultContent,
      toolbarConfig,
      editorConfig,
    };
  }
}
</script>    
```

:::tip
- `editorId` should be unique.
- Choose either `defaultContent` (JSON format) or `defaultHtml` (HTML format)
- If you chose `defaultContent`, you should deep clone it in `computed`.
- Timely destroy `editor` before vue component destroy.
:::

Import style

```html
<style src="@wangeditor/editor/dist/css/style.css"></style>
```

### Ajax async set content

For instance, you may async set content after ajax. **You can not change `defaultContent` or `defaultHtml` directly, but async-render the component**.

You can declare a ref `isEditorShow = false`, set `true` when ajax done.

```js
// const defaultHtml = 'hello&nbsp;world'
const defaultHtml = ref('')

// const defaultContent = []
// const getDefaultContent = computed(() => cloneDeep(defaultContent))
const defaultContent = ref([])
const getDefaultContent = computed(() => cloneDeep(defaultContent.value))

const isEditorShow = ref(false)

// Simulate ajax, async set content
setTimeout(() => {
    // Choose either `defaultContent` (JSON format) or `defaultHtml` (HTML format)
    defaultHtml.value = '<p>ajax&nbsp;content</p>'
    defaultContent.value =  [
        { type: "paragraph", children: [{ text: "ajax content" }] },
    ]

    isEditorShow.value = true
}, 1000)
```

In template, async-render component according to `isEditorShow` value.

```xml
<template>
    <div>
        <div v-if="isEditorShow" style="border: 1px solid #ccc">
            <Toolbar ... />
            <Editor ... />
        </div>
        <p v-else>loading</p>
    </div>
</template>
```

### Config

You can extend toolbar and editor config in `toolbarConfig` and `editorConfig` (above code)
- [Toolbar Config](./toolbar-config.md)
- [Editor Config](./editor-config.md)
- [Menus Config](./menu-config.md)

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
const handleCreated = (editor) => { console.log('created', editor) }
const handleChange = (editor) => { console.log('change:', editor.children) }
const handleDestroyed = (editor) => { console.log('destroyed', editor) }
const handleFocus = (editor) => { console.log('focus', editor) }
const handleBlur = (editor) => { console.log('blur', editor) }
const customAlert = (info, type) => { alert(`Custom alert: ${type} - ${info}`) }
const customPaste = (editor, event, callback) => {
    console.log('ClipboardEvent is paste event data', event)

    // Insert your custom text
    editor.insertText('xxx')

    // You can not `return xxx` in Vue event function, use `callback`
    callback(false) // return false ，prevent default paste behavior
    // callback(true) // return true ，go on default paste behavior
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

You can use `getEditor(editorId)` to get the `editor` instance after it's rendered, and trigger it's [APIs]((./API.md)).

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
    const editor = getEditor(editorId) // get editor instance, after it's rendered
    if (editor == null) return

    editor.insertText('hello world') // trigger editor API
}

return {
    // others...

    insertText
}
```

## React

### Installation

Install `@wangeditor/editor` and `@wangeditor/editor-for-react`, see [Installation](./installation.md).

### Basic usage

```jsx
import React, { useState, useEffect } from 'react'
import '@wangeditor/editor/dist/css/style.css'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'

function MyEditor() {
    const [editor, setEditor] = useState(null) // editor instance

    // Choose either `defaultContent` (JSON format) or `defaultHtml` (HTML format)
    const defaultContent = [
        { type: "paragraph", children: [{ text: "hello world" }], }
    ]
    // const defaultHtml = '<p>hello&nbsp;</p>'

    const toolbarConfig = { }
    const editorConfig = {
        placeholder: 'Type here...',
        onCreated(editor) { setEditor(editor) } // Save editor instance here, important!
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
                    defaultContent={defaultContent}
                    // defaultHtml={defaultHtml}
                    mode="default"
                    style={{ height: '500px' }}
                />
            </div>
        </>
    )
}

export default MyEditor
```

### Ajax async set content

For instance, you may async set content after ajax. **You can not change `defaultContent` or `defaultHtml` directly, but async-render the component**.

You can declare a state variable `isEditorShow = false`, set `true` when ajax done.

```js
// Choose either `defaultContent` (JSON format) or `defaultHtml` (HTML format)
const [defaultContent, setDefaultContent] = useState([])
// const [defaultHtml, setDefaultHtml] = useState('')

const [isEditorShow, setIsEditorShow] = useState(false)

// Simulate ajax, async set content
setTimeout(() => {
    setDefaultContent([
        { type: "paragraph", children: [{ text: "ajax content" }] }
    ])
    // setDefaultHtml('ajax&nbsp;content')

    setIsEditorShow(true)
}, 1000)
```

In JSX, async-render component according to `isEditorShow` value.

```jsx
return (
    <>
        {isEditorShow && <div style={{ border: '1px solid #ccc', zIndex: 100}}>
            <Toolbar ... />
            <Editor ... />
        </div>}
        {!isEditorShow && <p>loading</p>}
    </>
)
```


### Config

You can extend toolbar and editor config in `toolbarConfig` and `editorConfig` (above code)
- [Toolbar Config](./toolbar-config.md)
- [Editor Config](./editor-config.md)
- [Menus Config](./menu-config.md)

### API

You can get the `editor` state value, and trigger it's [APIs]((./API.md)).

```jsx
function insertText() {
    if (editor == null) return
    console.log(editor.insertText('hello'))
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
