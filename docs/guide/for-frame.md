# 用于 Vue React

如果是第一次使用，请先通过 [快速开始](/guide/getting-started.html) 了解基本使用。

## 注意

本文只介绍各个框架的组件接入，实际使用时还需要很多配置、API 。<br>
所以，阅读下文代码时，如遇到 `工具栏配置` `编辑器配置` `菜单配置` `editor API` 等字眼，请继续参考其他文档：
- [工具栏配置](/guide/toolbar-config.html)
- [编辑器配置](/guide/editor-config.html)
- [编辑器 API](/guide/API.html)
- [菜单配置](/guide/menu-config.html)

## Vue2

### 安装

需安装 `wangEditor` 和 `@wangeditor/editor-for-vue`，可参考[这里](/guide/installation.html)。

### 模板

```html
<div>
    <div>
        <button @click="onGetHtml">get html</button>
    </div>
    <div style="border: 1px solid #ccc;">
        <Toolbar :editorId="editorId" :defaultConfig="toolbarConfig"/>
    </div>
    <div style="border: 1px solid #ccc; margin-top: 10px;">
        <Editor
            :editorId="editorId"
            :defaultConfig="editorConfig"
            :defaultContent="defaultContent"
            @onCreated="onCreated"
            @onChange="onChange"
            @onDestroyed="onDestroyed"
            @onMaxLength="onMaxLength"
            @onFocus="onFocus"
            @onBlur="onBlur"
            @customAlert="customAlert"
        />
    </div>
</div>
```

### script

```ts
import Vue from 'vue'
import { Editor, Toolbar, getEditor, removeEditor } from '@wangeditor/editor-for-vue'

export default Vue.extend({
    components: { Editor, Toolbar },
    data() {
        return {
            //【特别注意】
            // 1. editorId Toolbar 和 Editor 的关联，要保持一致
            // 2. 多个编辑器时，每个的 editorId 要唯一
            editorId: 'w-e-1001',

            toolbarConfig: { /* 工具栏配置 */ },
            defaultContent: [],
            editorConfig: {
                placeholder: '请输入内容...',
                // 其他编辑器配置
                // 菜单配置
            }
        },
        curContent: []
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

        onGetHtml() {
            // 获取 editor 实例，即可执行 editor API
            const editor = getEditor(this.editorId)
            if (editor == null) return

            const html = editor.getHtml()
            console.log('cur html', html)
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

## Vue3

Vue3 组件正在开发中...

## React

### 安装

需安装 `wangEditor` 和 `@wangeditor/editor-for-react`，可参考[这里](/guide/installation.html)。

### 使用

以下代码使用 React Hooks 。如使用 React class 组件，可参考[这里](https://github.com/wangeditor-team/we-2021/blob/main/packages/editor-for-react/example/pages/BasicInClass.tsx)。

```tsx
import React, { useState, useEffect } from 'react'
import { IDomEditor, IEditorConfig, IToolbarConfig, SlateDescendant } from 'wangeditor'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'

function ReactEditor() {
    // 存储 editor 实例
    const [editor, setEditor] = useState<IDomEditor | null>(null)
    // 存储 editor 的最新内容（json 格式）
    const [curContent, setCurContent] = useState<SlateDescendant[]>([])
    // 存储 editor 的最新 html
    const [curHtml, setCurHtml] = useState<string>('')

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
        // editor 选区或者内容变化时，获取当前最新的的 content 和 html
        setCurContent(editor.children)
        setCurHtml(editor.getHtml())
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
    }, [])

    return (
        <React.Fragment>
            <div style={{ border: '1px solid #ccc'}}>
                {/* 渲染 toolbar */}
                <Toolbar editor={editor} defaultConfig={toolbarConfig} />
            </div>
            <div style={{ border: '1px solid #ccc', marginTop: '10px' }}>
                {/* 渲染 editor */}
                <Editor defaultConfig={editorConfig} defaultContent={[]} />
            </div>
        </React.Fragment>
    )
}

export default ReactEditor
```
