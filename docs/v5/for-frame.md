# 用于 Vue React

快速了解可查看[视频教程](/v5/video-course.html)。

## Vue2

### Demo

- [Demo 源码](https://github.com/wangfupeng1988/vue2-wangeditor-demo)
- [在线 demo](https://codesandbox.io/s/vue2-wangeditor-demo-1rwjms?file=/src/components/MyEditor.vue)

### 安装

```sh
yarn add @wangeditor/editor
# 或者 npm install @wangeditor/editor --save

yarn add @wangeditor/editor-for-vue
# 或者 npm install @wangeditor/editor-for-vue --save
```

### 使用

模板

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

script

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
            editorConfig: { placeholder: '请输入内容...' },
            mode: 'default', // or 'simple'
        }
    },
    methods: {
        onCreated(editor) {
            this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
        },
    },
    mounted() {
        // 模拟 ajax 请求，异步渲染编辑器
        setTimeout(() => {
            this.html = '<p>模拟 Ajax 异步设置内容 HTML</p>'
        }, 1500)
    },
    beforeDestroy() {
        const editor = this.editor
        if (editor == null) return
        editor.destroy() // 组件销毁时，及时销毁编辑器
    }
})
</script>
```

:::tip
- 赋值 `this.editor` 时要用 `Object.seal()`
- 组件销毁时，要及时销毁编辑器
:::

记得引入 style

```html
<style src="@wangeditor/editor/dist/css/style.css"></style>
```

### 配置

可通过 `toolbarConfig` 和 `editorConfig` 来修改菜单栏和编辑器的配置，详细文档参考
- [工具栏配置](/v5/toolbar-config.html) - 插入新菜单，屏蔽某个菜单等
- [编辑器配置](/v5/editor-config.html) - 兼听各个**生命周期**，自定义**粘贴**
- [菜单配置](/v5/menu-config.html) - 配置颜色、字体、字号、链接校验、**上传图片、视频**等

【注意】编辑器配置中 `onXxx` 格式的生命周期函数，**必须通过 Vue 事件来传递，不可以放在 `editorConfig` 中**，例如：

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
        console.log('ClipboardEvent 粘贴事件对象', event)
        // const html = event.clipboardData.getData('text/html') // 获取粘贴的 html
        // const text = event.clipboardData.getData('text/plain') // 获取粘贴的纯文本
        // const rtf = event.clipboardData.getData('text/rtf') // 获取 rtf 数据（如从 word wsp 复制粘贴）

        // 自定义插入内容
        editor.insertText('xxx')

        // 返回 false ，阻止默认粘贴行为
        event.preventDefault()
        callback(false) // 返回值（注意，vue 事件的返回值，不能用 return）

        // 返回 true ，继续默认的粘贴行为
        // callback(true)
    },
}
```

### 调用 API

当编辑器渲染完成之后，通过 `this.editor` 获取 editor 实例，即可调用它的 API 。参考 [编辑器 API](/v5/API.html) 。

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
        const editor = this.editor // 获取 editor 实例
        if (editor == null) return

        // 调用 editor 属性和 API
        editor.insertText('一段文字')
        console.log(editor.children)
    },
},
```

## Vue3

### Demo

- [Demo 源码](https://github.com/wangfupeng1988/vue3-wangeditor-demo)
- [在线 demo](https://stackblitz.com/edit/vue3-wangeditor-demo?file=src%2Fcomponents%2FBasicEditor.vue)

### 安装

```sh
yarn add @wangeditor/editor
# 或者 npm install @wangeditor/editor --save

yarn add @wangeditor/editor-for-vue@next
# 或者 npm install @wangeditor/editor-for-vue@next --save
```

### 使用

模板

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

script

```html
<script>
import '@wangeditor/editor/dist/css/style.css' // 引入 css

import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

export default {
  components: { Editor, Toolbar },
  setup() {
    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef()

    // 内容 HTML
    const valueHtml = ref('<p>hello</p>')

    // 模拟 ajax 异步获取内容
    onMounted(() => {
        setTimeout(() => {
            valueHtml.value = '<p>模拟 Ajax 异步设置内容</p>'
        }, 1500)
    })

    const toolbarConfig = {}
    const editorConfig = { placeholder: '请输入内容...' }

    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
        const editor = editorRef.value
        if (editor == null) return
        editor.destroy()
    })

    const handleCreated = (editor) => {
      editorRef.value = editor // 记录 editor 实例，重要！
    }

    return {
      editorRef,
      valueHtml,
      mode: 'default', // 或 'simple'
      toolbarConfig,
      editorConfig,
      handleCreated
    };
  }
}
</script>    
```

:::tip
- `editorRef` 必须用 `shallowRef`
- 组件销毁时，要及时销毁编辑器
:::

### 配置

可通过 `toolbarConfig` 和 `editorConfig` 来修改菜单栏和编辑器的配置，详细文档参考
- [工具栏配置](/v5/toolbar-config.html) - 插入新菜单，屏蔽某个菜单等
- [编辑器配置](/v5/editor-config.html) - 兼听各个**生命周期**，自定义**粘贴**
- [菜单配置](/v5/menu-config.html) - 配置颜色、字体、字号、链接校验、**上传图片、视频**等

【注意】编辑器配置中 `onXxx` 格式的生命周期函数，**必须通过 Vue 事件来传递，不可以放在 `editorConfig` 中**，例如：

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
const customAlert = (info, type) => { alert(`【自定义提示】${type} - ${info}`) }
const customPaste = (editor, event, callback) => {
    console.log('ClipboardEvent 粘贴事件对象', event)
    // const html = event.clipboardData.getData('text/html') // 获取粘贴的 html
    // const text = event.clipboardData.getData('text/plain') // 获取粘贴的纯文本
    // const rtf = event.clipboardData.getData('text/rtf') // 获取 rtf 数据（如从 word wsp 复制粘贴）

    // 自定义插入内容
    editor.insertText('xxx')

    // 返回 false ，阻止默认粘贴行为
    event.preventDefault()
    callback(false) // 返回值（注意，vue 事件的返回值，不能用 return）

    // 返回 true ，继续默认的粘贴行为
    // callback(true)
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

当编辑器渲染完成之后，通过 `editorRef.value` 获取 editor 实例，即可调用它的 API 。参考 [编辑器 API](/v5/API.html) 。

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
    const editor = editorRef.value // 获取 editor ，必须等待它渲染完之后
    if (editor == null) return

    editor.insertText('hello world') // 执行 editor API
}

return {
    // 省略其他 ...

    insertText
}
```

## React

### Demo

- [Demo 源码](https://github.com/wangfupeng1988/react-wangeditor-demo)
- [在线 demo](https://codesandbox.io/s/react-wangeditor-demo-unvron?file=/src/components/MyEditor.js)

### 安装

```sh
yarn add @wangeditor/editor
# 或者 npm install @wangeditor/editor --save

yarn add @wangeditor/editor-for-react
# 或者 npm install @wangeditor/editor-for-react --save
```

### 使用

```tsx
import '@wangeditor/editor/dist/css/style.css' // 引入 css

import React, { useState, useEffect } from 'react'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'

function MyEditor() {
    // editor 实例
    const [editor, setEditor] = useState<IDomEditor | null>(null)   // TS 语法
    // const [editor, setEditor] = useState(null)                   // JS 语法

    // 编辑器内容
    const [html, setHtml] = useState('<p>hello</p>')

    // 模拟 ajax 请求，异步设置 html
    useEffect(() => {
        setTimeout(() => {
            setHtml('<p>hello world</p>')
        }, 1500)
    }, [])

    // 工具栏配置
    const toolbarConfig: Partial<IToolbarConfig> = { }  // TS 语法
    // const toolbarConfig = { }                        // JS 语法

    // 编辑器配置
    const editorConfig: Partial<IEditorConfig> = {    // TS 语法
    // const editorConfig = {                         // JS 语法
        placeholder: '请输入内容...',
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

### 配置

可通过 `toolbarConfig` 和 `editorConfig` 来修改菜单栏和编辑器的配置，详细文档参考
- [工具栏配置](/v5/toolbar-config.html) - 插入新菜单，屏蔽某个菜单等
- [编辑器配置](/v5/editor-config.html) - 兼听各个**生命周期**，自定义**粘贴**
- [菜单配置](/v5/menu-config.html) - 配置颜色、字体、字号、链接校验、**上传图片、视频**等

### 调用 API

当编辑器渲染完成之后，即可调用它的 API 。参考 [编辑器 API](/v5/API.html) 。

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
### 组件API
#### Toolbar
|参数 |说明|类型|
|:---|:---|:---|
|editor|编辑器对象|IDomEditor|
|defaultConfig|编辑器工具栏配置|IToolbarConfig|
|mode|编辑器模式|string|

#### Editor
|参数 |说明|类型|
|:---|:---|:---|
|defaultContent|默认内容|SlateDescendant[]|
|defaultHtml|默认html结构|string|
|defaultConfig|编辑器配置(note:组件传递的属性比config属性的优先级更高)|IEditorConfig|
|value|输入框内容|string|
|mode|编辑器模式|string|
|placeholder|编辑器空白占位符|string|
|maxLength|编辑器最大长度|number|
|readOnly|只读属性|boolean|
|onCreated|编辑器的创建函数|function(e:IDomEditor)|
|onChange|编辑器内容变化时的回调|function(e:IDomEditor)|
|onDestroyed|编辑器销毁后的回调|function(e:IDomEditor)|
|onBlur|编辑器失焦后的回调|function(e:IDomEditor)|
|onFocus|编辑器合焦后的回调|function(e:IDomEditor)|
|onMaxLength|编辑器内容到达最大长度的调用|function()|