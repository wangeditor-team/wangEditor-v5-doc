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

### 基本使用

模板

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
            style="height: 500px; overflow-y: hidden;"
            :editorId="editorId"
            :defaultConfig="editorConfig"
            :defaultContent="getDefaultContent"
            :defaultHtml="defaultHtml"
            :mode="mode"
        />
        <!-- 注意： defaultContent （JSON 格式） 和 defaultHtml （HTML 格式），二选一 -->
    </div>
</template>
```

script

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
            editorId: `w-e-${Math.random().toString().slice(-5)}`, //【注意】编辑器 id ，要全局唯一
            toolbarConfig: {},
            editorConfig: { placeholder: '请输入内容...' },
            mode: 'default', // or 'simple'

            // defaultContent （JSON 格式） 和 defaultHtml（HTML 格式）二选一
            defaultContent: [
                { type: 'paragraph', children: [{ text: '一行文字' }] }
            ],
            defaultHtml: '<p>hello</p>',
        }
    },
    computed: {
        getDefaultContent() {
            return cloneDeep(this.defaultContent) //【注意】深度拷贝 defaultContent ，否则会报错
        }
    },
    beforeDestroy() {
        const editor = getEditor(this.editorId)
        if (editor == null) return

        // 【注意】组件销毁时，及时销毁编辑器
        editor.destroy()
        removeEditor(this.editorId)
    }
})
</script>
```

:::tip
- `editorId` 要全局唯一，不可重复
- `defaultContent`（JSON 格式） 和 `defaultHtml`（HTML 格式），二选一
- 如果使用 `defaultContent` ，要使用 `computed` 和深拷贝，否则会报错
- 组件销毁时，要及时销毁编辑器
:::

记得引入 style

```html
<style src="@wangeditor/editor/dist/css/style.css"></style>
```

### Ajax 异步设置内容

例如，Ajax 异步获取内容，然后设置到编辑器中。**注意，不可以直接修改 `defaultContent` 或 `defaultHtml` ，而是要异步渲染组件**。

在 `data` 中定义一个属性 `isEditorShow: false`，在 Ajax 结束时设置为 `true`

```js
data() {
    return {
        // 省略其他属性...
        isEditorShow: false
    }
},
mounted() {
    // 模拟 ajax 请求，异步渲染编辑器
    setTimeout(() => {
        // defaultContent （JSON 格式） 和 defaultHtml（HTML 格式）二选一
        this.defaultContent = [
            { type: 'paragraph', children: [{ text: 'ajax 异步获取的内容' }] }
        ]
        this.defaultHtml = '<p>ajax&nbsp;异步获取的内容</p>'

        this.isEditorShow = true
    }, 1000)
},
```

模板中，根据 `isEditorShow` 来渲染组件

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

### 配置

可通过 `toolbarConfig` 和 `editorConfig` 来修改菜单栏和编辑器的配置，详细文档参考
- [工具栏配置](/v5/guide/toolbar-config.html)
- [编辑器配置](/v5/guide/editor-config.html)
- [菜单配置](/v5/guide/menu-config.html)

【注意】，编辑器配置中 `onXxx` 格式的生命周期函数，**必须通过 Vue 事件来传递，不可以放在 `editorConfig` 中**，例如：

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
        console.log('ClipboardEvent 粘贴事件对象', event)

        // 自定义插入内容
        editor.insertText('xxx')

        // 返回值（注意，vue 事件的返回值，不能用 return）
        callback(false) // 返回 false ，阻止默认粘贴行为
        // callback(true) // 返回 true ，继续默认的粘贴行为
    },
}
```

### 调用 API

当编辑器渲染完成之后，通过 `getEditor(this.editorId)` 获取 editor 实例，即可调用它的 API 。参考 [编辑器 API](/v5/guide/API.html) 。

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
        const editor = getEditor(this.editorId) // 获取 editor 实例（必须等它渲染完成）
        if (editor == null) return

        // 调用 editor 属性和 API
        editor.insertText('一段文字')
        console.log(editor.children)
    },
},
mounted() {
    this.$nextTick(() => {
        const editor = getEditor(this.editorId) // 获取 editor 实例（必须等它渲染完成）
        if (editor == null) return
        console.log('getEditor on mounted', editor)
    })
},
```

## Vue3

可参考博客[50 行代码 Vue3 中使用富文本编辑器](https://juejin.cn/post/7027977252331585544)。

### 安装

需安装 `@wangeditor/editor` 和 `@wangeditor/editor-for-vue@next`，可参考[这里](/v5/guide/installation.html)。

### 基本使用

模板

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
        style="height: 500px; overflow-y: hidden;"
      />
      <!-- 注意: defaultContent (JSON 格式) 和 defaultHtml (HTML 格式) ，二选一 -->
    </div>
</template>
```

script

```html
<script>
import { computed, onBeforeUnmount, ref } from 'vue'
import { Editor, Toolbar, getEditor, removeEditor } from '@wangeditor/editor-for-vue'
import cloneDeep from 'lodash.clonedeep'

export default {
  components: { Editor, Toolbar },
  setup() {
    const editorId = `w-e-${Math.random().toString().slice(-5)}` //【注意】编辑器 id ，要全局唯一

    // defaultContent (JSON 格式) 和 defaultHtml (HTML 格式) ，二选一
    const defaultHtml = '一行文字'
    const defaultContent = [
        { type: 'paragraph', children: [{ text: '一行文字' }] }
    ]
    const getDefaultContent = computed(() => cloneDeep(defaultContent)) // 注意，要深拷贝 defaultContent ，否则报错

    const toolbarConfig = {}
    const editorConfig = { placeholder: '请输入内容...' }

    // 组件销毁时，也及时销毁编辑器
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
- `editorId` 要全局唯一，不可重复
- `defaultContent` (JSON 格式) 和 `defaultHtml` (HTML 格式) ，二选一
- 如果选择了 `defaultContent` ，要使用 `computed` 和深拷贝，否则会报错
- 组件销毁时，要及时销毁编辑器
:::

记得引入 style

```html
<style src="@wangeditor/editor/dist/css/style.css"></style>
```

### Ajax 异步设置内容

例如，Ajax 异步获取内容，然后设置到编辑器中。注意，**不可以直接修改 `defaultContent` 或 `defaultHtml` ，而是要异步渲染组件**。

可以使用 Vue3 ref 定义一个响应式变量 `isEditorShow = false`，在 Ajax 结束时设置为 `true`。

```js
// const defaultHtml = '一行文字'
const defaultHtml = ref('')

// const defaultContent = []
// const getDefaultContent = computed(() => cloneDeep(defaultContent))
const defaultContent = ref([])
const getDefaultContent = computed(() => cloneDeep(defaultContent.value))

const isEditorShow = ref(false)

// 模拟 ajax 异步获取内容
setTimeout(() => {
    // defaultContent (JSON 格式) 和 defaultHtml (HTML 格式) ，二选一
    defaultHtml.value = 'ajax&nbsp;异步获取的内容'
    defaultContent.value =  [
        { type: "paragraph", children: [{ text: "ajax 异步获取的内容" }] },
    ]

    isEditorShow.value = true
}, 1000)
```

然后 template 根据 `isEditorShow` 异步渲染编辑器

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

### 配置

可通过 `toolbarConfig` 和 `editorConfig` 来修改菜单栏和编辑器的配置，详细文档参考
- [工具栏配置](/v5/guide/toolbar-config.html)
- [编辑器配置](/v5/guide/editor-config.html)
- [菜单配置](/v5/guide/menu-config.html)

【注意】，编辑器配置中 `onXxx` 格式的生命周期函数，**必须通过 Vue 事件来传递，不可以放在 `editorConfig` 中**，例如：

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
const customAlert = (info, type) => { alert(`【自定义提示】${type} - ${info}`) }
const customPaste = (editor, event, callback) => {
    console.log('ClipboardEvent 粘贴事件对象', event)

    // 自定义插入内容
    editor.insertText('xxx')

    // 返回值（注意，vue 事件的返回值，不能用 return）
    callback(false) // 返回 false ，阻止默认粘贴行为
    // callback(true) // 返回 true ，继续默认的粘贴行为
}

return {
    // 省略其他 ...

    handleCreated,
    handleChange,
    handleDestroyed,
    handleFocus,
    handleBlur,
    customAlert,
    customPaste
}
```

### 调用 API

当编辑器渲染完成之后，通过 `getEditor(editorId)` 获取 editor 实例，即可调用它的 API 。参考 [编辑器 API](/v5/guide/API.html) 。

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
    const editor = getEditor(editorId) // 获取 editor ，必须等待它渲染完之后
    if (editor == null) return

    editor.insertText('hello world') // 执行 editor API
}

return {
    // 省略其他 ...

    insertText
}
```

## React

可参考博客 [50 行代码 React Hooks 中使用富文本编辑器](https://juejin.cn/post/7030584414652334093)

### 安装

需安装 `@wangeditor/editor` 和 `@wangeditor/editor-for-react`，可参考[这里](/v5/guide/installation.html)。

### 基本使用

以下代码使用 React Hooks 。如使用 React class 组件，可参考[这里](https://github.com/wangeditor-team/wangEditor-for-react/tree/main/example/pages)。

```jsx
import React, { useState, useEffect } from 'react'
import '@wangeditor/editor/dist/css/style.css'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'

function MyEditor() {
    const [editor, setEditor] = useState(null) // 存储 editor 实例

    // `defaultContent` (JSON 格式) 和 `defaultHtml` (HTML 格式) 二选一
    const defaultContent = [
        { type: "paragraph", children: [{ text: "一行文字" }], }
    ]
    // const defaultHtml = '<p>一行文字</p>'

    const toolbarConfig = { }
    const editorConfig = {
        placeholder: '请输入内容...',
        onCreated(editor) { setEditor(editor) } // 记录下 editor 实例，重要！
    }

    // 及时销毁 editor ，重要！
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
                    style={{ height: '500px', overflowY: 'hidden' }}
                />
            </div>
        </>
    )
}

export default MyEditor
```

### Ajax 异步设置内容

例如，Ajax 异步获取内容，然后设置到编辑器中。注意，**不可以直接修改 `defaultContent` 或 `defaultHtml` ，而是要异步渲染组件**。

可定义一个 state `isEditorShow = false` ，等 Ajax 结束时设置为 `true`

```js
// `defaultContent` (JSON 格式) 和 `defaultHtml` (HTML 格式) 二选一
const [defaultContent, setDefaultContent] = useState([])
// const [defaultHtml, setDefaultHtml] = useState('')

const [isEditorShow, setIsEditorShow] = useState(false)

// 模拟 ajax 异步请求
setTimeout(() => {
    setDefaultContent([
        { type: "paragraph", children: [{ text: "ajax 异步获取的内容" }] }
    ])
    // setDefaultHtml('<p>ajax&nbsp;异步获取的内容</p>')

    setIsEditorShow(true)
}, 1000)
```

JSX 中根据 `isEditorShow` 异步渲染组件

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


### 配置

可通过 `toolbarConfig` 和 `editorConfig` 来修改菜单栏和编辑器的配置，详细文档参考
- [工具栏配置](/v5/guide/toolbar-config.html)
- [编辑器配置](/v5/guide/editor-config.html)
- [菜单配置](/v5/guide/menu-config.html)

### 调用 API

当编辑器渲染完成之后，即可调用它的 API 。参考 [编辑器 API](/v5/guide/API.html) 。

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
