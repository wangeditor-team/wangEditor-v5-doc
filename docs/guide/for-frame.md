# 用于 Vue React

如果是第一次使用，请先通过 [快速开始](/v5/guide/getting-started.html) 了解基本使用。

## 注意

本文只介绍各个框架的组件接入，实际使用时还需要很多配置、API 。<br>
所以，阅读下文代码时，如遇到 `工具栏配置` `编辑器配置` `菜单配置` `editor API` 等字眼，请继续参考其他文档：
- [工具栏配置](/v5/guide/toolbar-config.html)
- [编辑器配置](/v5/guide/editor-config.html)
- [编辑器 API](/v5/guide/API.html)
- [菜单配置](/v5/guide/menu-config.html)

## Vue2

可参考博客 [50 行代码 Vue2.6 中使用富文本编辑器](https://juejin.cn/post/7030722267264843783/)

### 安装

需安装 `@wangeditor/editor` 和 `@wangeditor/editor-for-vue`，可参考[这里](/v5/guide/installation.html)。

### 模板

```html
<div>
    <div>
        <button @click="insertText">insert text</button>
    </div>
    <div style="border: 1px solid #ccc;">
        <!-- 工具栏 -->
        <Toolbar
            style="border-bottom: 1px solid #ccc"
            :editorId="editorId"
            :defaultConfig="toolbarConfig"
            :mode="mode"
        />

        <!-- 编辑器 -->
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

### script

```ts
import Vue from 'vue'
import '@wangeditor/editor/dist/css/style.css'
import { Editor, Toolbar, getEditor, removeEditor } from '@wangeditor/editor-for-vue'
import cloneDeep from 'lodash.clonedeep'

export default Vue.extend({
    components: { Editor, Toolbar },
    data() {
        return {
            //【特别注意】
            // 1. editorId Toolbar 和 Editor 的关联，要保持一致
            // 2. 多个编辑器时，每个的 editorId 要唯一
            editorId: 'w-e-1',

            toolbarConfig: { /* 工具栏配置 */ },
            defaultContent: [
                {
                    type: 'paragraph',
                    children: [{ text: '一行文字' }],
                },
            ],
            editorConfig: {
                placeholder: '请输入内容...',
                // 其他编辑器配置
                // 菜单配置
            },
            mode: 'default', // or 'simple'
            curContent: []
        }
    },

    computed: {
        // 注意，深度拷贝 content ，否则会报错
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
            console.log('ClipboardEvent 粘贴事件对象', event)

            // 自定义插入内容
            editor.insertText('xxx')

            // 返回值（注意，vue 事件的返回值，不能用 return）
            callback(false) // 返回 false ，阻止默认粘贴行为
            // callback(true) // 返回 true ，继续默认的粘贴行为
        },

        insertText() {
            // 获取 editor 实例，即可执行 editor API
            const editor = getEditor(this.editorId)
            if (editor == null) return
            if (editor.selection == null) return

            // 在选区插入一段文字
            editor.insertText('一段文字')
        },
    },

    // 及时销毁 editor
    beforeDestroy() {
        const editor = getEditor(this.editorId)
        if (editor == null) return

        // 销毁，并移除 editor
        editor.destroy()
        removeEditor(this.editorId)
    }
})
```

:::tip
请关注以上代码中关于 `editorId` 的注释
:::

## Vue3

可参考博客[50 行代码 Vue3 中使用富文本编辑器](https://juejin.cn/post/7027977252331585544)。

### 安装

需安装 `@wangeditor/editor` 和 `@wangeditor/editor-for-vue@next`，可参考[这里](/v5/guide/installation.html)。

### 模板

```html
<template>
    <div style="border: 1px solid #ccc">
      <!-- 工具栏 -->
      <Toolbar
        :editorId="editorId"
        :mode="mode"
        style="border-bottom: 1px solid #ccc"
      />
      <!-- 编辑器 -->
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

### script

```js
import '@wangeditor/editor/dist/css/style.css' // 也可以在 <style> 中 import

import { computed, onUnmounted } from 'vue'
import { Editor, Toolbar, getEditor, removeEditor } from '@wangeditor/editor-for-vue'
import cloneDeep from 'lodash.clonedeep'

export default {
  name: 'MyEditor',
  components: { Editor, Toolbar },
  setup() {
    const editorId = 'wangeEditor-1'

    // 默认内容
    const defaultContent = [
        {
            type: "paragraph",
            children: [{ text: "一行文字" }],
        },
    ]

    // 注意，深度拷贝 content ，否则会报错
    const getDefaultContent = computed(() => cloneDeep(defaultContent))

    // 编辑器配置
    const editorConfig = {
        placeholder: '请输入内容...',
        MENU_CONF: {
            insertImage: {
                checkImage(src) {
                    console.log('image src', src)
                    if (src.indexOf('http') !== 0) {
                        return '图片网址必须以 http/https 开头';
                    }
                    return true;
                },
            },
        }
    }

    // 编辑器回调函数
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
        alert(`【自定义提示】${type} - ${info}`)
    }
    const customPaste = (editor, event, callback) => {
        console.log('ClipboardEvent 粘贴事件对象', event)

        // 自定义插入内容
        editor.insertText('xxx')

        // 返回值（注意，vue 事件的返回值，不能用 return）
        callback(false) // 返回 false ，阻止默认粘贴行为
        // callback(true) // 返回 true ，继续默认的粘贴行为
    }

    // 及时销毁编辑器
    onUnmounted(() => {
        const editor = getEditor(editorId)
        if (editor == null) return

        // 销毁，并移除 editor
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

可参考博客 [50 行代码 React Hooks 中使用富文本编辑器](https://juejin.cn/post/7030584414652334093)

### 安装

需安装 `@wangeditor/editor` 和 `@wangeditor/editor-for-react`，可参考[这里](/v5/guide/installation.html)。

### 使用

以下代码使用 React Hooks 。如使用 React class 组件，可参考[这里](https://github.com/wangeditor-team/wangEditor-v5/blob/main/packages/editor-for-react/example/pages/BasicInClass.tsx)。

```tsx
import React, { useState, useEffect } from 'react'
import '@wangeditor/editor/dist/css/style.css'
import { IDomEditor, IEditorConfig, IToolbarConfig, SlateDescendant } from '@wangeditor/editor'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'

function ReactEditor() {
    // 存储 editor 实例
    const [editor, setEditor] = useState<IDomEditor | null>(null)
    // 存储 editor 的最新内容（json 格式）
    const [curContent, setCurContent] = useState<SlateDescendant[]>([])

    // 工具栏配置
    const toolbarConfig: Partial<IToolbarConfig> = { /* 工具栏配置 */ }

    // editor 配置
    const editorConfig: Partial<IEditorConfig> = {}
    editorConfig.placeholder = '请输入内容...'
    editorConfig.onCreated = (editor: IDomEditor) => {
        // 记录 editor 实例，重要 ！
        // 有了 editor 实例，就可以执行 editor API
        setEditor(editor)
    }
    editorConfig.onChange = (editor: IDomEditor) => {
        // editor 选区或者内容变化时，获取当前最新的的 content
        setCurContent(editor.children)
    }
    // 其他编辑器配置
    // 菜单配置

    // 及时销毁 editor ，重要！！！
    useEffect(() => {
        return () => {
            if (editor == null) return
            editor.destroy()
            setEditor(null)
        }
    }, [editor])

    return (
        <React.Fragment>
            <div style={{ border: '1px solid #ccc'}}>
                {/* 渲染 toolbar */}
                <Toolbar
                    editor={editor}
                    defaultConfig={toolbarConfig}
                    mode="default"
                    style={{ borderBottom: '1px solid #ccc' }}
                />

                {/* 渲染 editor */}
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
