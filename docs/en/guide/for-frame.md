# For Vue React

If you first-time use wangEditor, please see [Get started](./getting-started.md) it to learn basic usage.

## Attention

This article only introduces editor components, you should also learn some API and configs.
- [Toolbar Config](./toolbar-config.md)
- [Editor Config](./editor-config.md)
- [Editor API](./API.md)
- [Menus Config](./menu-config.md)

## Vue 2.x

### Installation

Install `@wangeditor/editor` 和 `@wangeditor/editor-for-vue`, see [Installation](./installation.md).
### Template

```html
<div>
    <div>
        <button @click="insertText">insert text</button>
    </div>
    <div style="border: 1px solid #ccc;">
        <!-- toolbar -->
        <Toolbar
            style="border-bottom: 1px solid #ccc"
            :editorId="editorId"
            :defaultConfig="toolbarConfig"
            :mode="mode"
        />

        <!-- editor -->
        <Editor
            style="height: 500px"

            :editorId="editorId"

            :defaultConfig="editorConfig"
            :defaultContent="getDefaultContent"
            :mode="mode"

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
</div>
```

### Script

```ts
import Vue from 'vue'
import '@wangeditor/editor/dist/css/style.css'
import { Editor, Toolbar, getEditor, removeEditor } from '@wangeditor/editor-for-vue'
import cloneDeep from 'lodash.clonedeep'

export default Vue.extend({
    components: { Editor, Toolbar },
    data() {
        return {
            // Particular attention:
            // 1. `editorId` is used to relate Toolbar and Editor
            // 2. When you create multiple editors in one page, every editor must be unique
            editorId: 'w-e-1',

            toolbarConfig: { /* toolbar config */ },
            defaultContent: [
                {
                    type: 'paragraph',
                    children: [{ text: 'hello world' }],
                },
            ],
            editorConfig: {
                placeholder: 'Type your text',
                // other editor config
                // menus config
            },
            mode: 'default', // or 'simple'
            curContent: []
        }
    },

    computed: {
        // Deep clone `content`
        getDefaultContent() {
            return cloneDeep(this.defaultContent)
        }
    },

    methods: {
        onCreated(editor) {
            console.log('onCreated', editor)
        },
        onChange(editor) {
            console.log('onChange', editor.children)
            this.curContent = editor.children
        },
        onDestroyed(editor) {
            console.log('onDestroyed', editor)
        },
        onMaxLength(editor) {
            console.log('onMaxLength', editor)
        },
        onFocus(editor) {
            console.log('onFocus', editor)
        },
        onBlur(editor) {
            console.log('onBlur', editor)
        },
        customAlert(info: string, type: string) {
            window.alert(`customAlert in Vue demo\n${type}:\n${info}`)
        },
        customPaste(editor, event, callback) {
            console.log('ClipboardEvent is paste event data', event)

            // insert your custom text
            editor.insertText('xxx')

            // You can not `return xxx` in Vue event function, use `callback`
            callback(false) // return false ，prevent default paste behavior
            // callback(true) // return true ，go on default paste behavior
        },

        insertText() {
            // get editor instance by `editorId`
            const editor = getEditor(this.editorId)
            if (editor == null) return
            if (editor.selection == null) return

            // Insert text in selection
            editor.insertText('hello wangEditor.')
        },
    },

    // Timely destroy editor
    beforeDestroy() {
        const editor = getEditor(this.editorId)
        if (editor == null) return

        // destroy and remove editor
        editor.destroy()
        removeEditor(this.editorId)
    }
})
```

## Vue 3.x

### Installation

Install `@wangeditor/editor` and `@wangeditor/editor-for-vue@next`, see [Installation](./installation.md).

### Template

```html
<template>
    <div style="border: 1px solid #ccc">
      <!-- toolbar -->
      <Toolbar
        :editorId="editorId"
        :mode="mode"
        style="border-bottom: 1px solid #ccc"
      />
      <!-- editor -->
      <Editor
        :editorId="editorId"
        :mode="mode"
        :defaultConfig="editorConfig"
        :defaultContent="getDefaultContent"
        @onCreated="handleCreated"
        @onChange="handleChange"
        @onDestroyed="handleDestroyed"
        @onFocus="handleFocus"
        @onBlur="handleBlur"
        @customAlert="customAlert"
        @customPaste="customPaste"
        style="height: 500px"
      />
    </div>
</template>
```

### Script

```js
import '@wangeditor/editor/dist/css/style.css' // or import this in <style>

import { computed, onUnmounted } from 'vue'
import { Editor, Toolbar, getEditor, removeEditor } from '@wangeditor/editor-for-vue'
import cloneDeep from 'lodash.clonedeep'

export default {
  name: 'MyEditor',
  components: { Editor, Toolbar },
  setup() {
    const editorId = 'w-e-1'

    // Default content
    const defaultContent = [
        {
            type: "paragraph",
            children: [{ text: "hello world" }],
        },
    ]

    // Deep clone `content`
    const getDefaultContent = computed(() => cloneDeep(defaultContent))

    // Editor config
    const editorConfig = {
        placeholder: 'Type your text',
        MENU_CONF: {
            insertImage: {
                checkImage(src) {
                    console.log('image src', src)
                    if (src.indexOf('http') !== 0) {
                        return 'Image source must includes http/https';
                    }
                    return true;
                },
            },
        }
    }

    // Editor callbacks
    const handleCreated = (editor) => {
      console.log('created', editor);
    }
    const handleChange = (editor) => {
      console.log('change:', editor.children);
    }
    const handleDestroyed = (editor) => {
      console.log('destroyed', editor)
    }
    const handleFocus = (editor) => {
        console.log('focus', editor)
    }
    const handleBlur = (editor) => {
        console.log('blur', editor)
    }
    const customAlert = (info, type) => {
        alert(`Custom info: ${type} - ${info}`)
    }
    const customPaste = (editor, event, callback) => {
        console.log('ClipboardEvent is paste event data', event)

        // Insert your custom text
        editor.insertText('xxx')

        // You can not `return xxx` in Vue event function, use `callback`
        callback(false) // return false ，prevent default paste behavior
        // callback(true) // return true ，go on default paste behavior
    }

    // Timely destroy editor
    onUnmounted(() => {
        const editor = getEditor(editorId)
        if (editor == null) return

        // Destroy and remove editor
        editor.destroy()
        removeEditor(editorId)
    })

    return {
      editorId,
      mode: 'default',
      getDefaultContent,
      editorConfig,
      handleCreated,
      handleChange,
      handleDestroyed,
      handleFocus,
      handleBlur,
      customAlert,
      customPaste
    };
  }
}
```

## React

### Installation

Install `@wangeditor/editor` and `@wangeditor/editor-for-react`, see [Installation](./installation.md).

### Usage

```tsx
import React, { useState, useEffect } from 'react'
import '@wangeditor/editor/dist/css/style.css'
import { IDomEditor, IEditorConfig, IToolbarConfig, SlateDescendant } from '@wangeditor/editor'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'

function ReactEditor() {
    // Save editor instance
    const [editor, setEditor] = useState<IDomEditor | null>(null)
    // Save editor's latest content
    const [curContent, setCurContent] = useState<SlateDescendant[]>([])

    // Toolbar config
    const toolbarConfig: Partial<IToolbarConfig> = { /* toolbar config */ }

    // Editor config
    const editorConfig: Partial<IEditorConfig> = {}
    editorConfig.placeholder = 'Type your text'
    editorConfig.onCreated = (editor: IDomEditor) => {
        // Save editor instance here, important!
        setEditor(editor)
    }
    editorConfig.onChange = (editor: IDomEditor) => {
        // get latest content where editor changed
        setCurContent(editor.children)
    }
    // Other editor config...
    // Menus config...

    // Timely destroy editor
    useEffect(() => {
        return () => {
            if (editor == null) return
            editor.destroy()
            setEditor(null)
        }
    }, [])

    return (
        <React.Fragment>
            <div style={{ border: '1px solid #ccc'}}>
                {/* render toolbar */}
                <Toolbar
                    editor={editor}
                    defaultConfig={toolbarConfig}
                    mode="default"
                    style={{ borderBottom: '1px solid #ccc' }}
                />

                {/* render editor */}
                <Editor
                    defaultConfig={editorConfig}
                    defaultContent={[]}
                    mode="default"
                    style={{ height: '500px' }}
                />
            </div>
        </React.Fragment>
    )
}

export default ReactEditor
```
