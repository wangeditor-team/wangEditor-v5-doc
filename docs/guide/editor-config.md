# 编辑器配置

如果是第一次使用，请先通过 [快速开始](/v5/guide/getting-started.html) 了解基本使用。

```js{3}
const editor = wangEditor.createEditor({
  textareaSelector: '#editor-container',
  config: editorConfig,
  content: [],
  mode: 'default'
})

// 可通过 editor.getConfig() 查看编辑器默认配置
```

## placeholder

配置编辑器 placeholder

```js
const editorConfig = {}
editorConfig.placeholder = '请输入内容...'
```

## readOnly

配置编辑器是否只读，默认为 `false`

```js
const editorConfig = {}
editorConfig.readOnly = true
```

只读状态可通过 `editor.enable()` 和 `editor.disable()` 切换，详见 [API](/v5/guide/API.html) 。

## autoFocus

配置编辑器默认是否 focus ，默认为 `true`

```js
const editorConfig = {}
editorConfig.autoFocus = false
```

## scroll

配置编辑器是否支持滚动，默认为 `true`

```js
const editorConfig = {}
editorConfig.scroll = false
```

:::tip
可将 scroll 设置为 `false` 的情况：
- 编辑器高度自增
- 在线文档文档，如腾讯文档、语雀那样的，参考 [demo](https://www.wangeditor.com/demo/zh-CN/like-qq-doc.html) 中的“仿语雀编辑器”
:::

## maxLength onMaxLength

配置编辑器的 maxlength ，默认不限制

```js
const editorConfig = {}
editorConfig.maxLength = 1000
editorConfig.onMaxLength = function (editor) {
    // 当达到 maxlength 限制时，触发该回调函数
}
```

:::tip
无特殊需求，请慎用 maxLength ，这可能会导致编辑器内容过多时，编辑卡顿。
:::

## hoverbarKeys

配置编辑器的 hoverbar 菜单。通过 `editor.getConfig().hoverbarKeys` 可查看当前的 hoverbarKeys 。

![](/v5/image/hoverbar.png)

```js
import { DomEditor } from '@wangeditor/editor-cattle'
// 使用 CDN ： const DomEditor = window.wangEditor.DomEditor

const editorConfig = {}
editorConfig.hoverbarKeys = [
    {
        desc: '选中链接 selected link',
        match: (editor, node) => DomEditor.checkNodeType(node, 'link'),
        menuKeys: ['updateLink', 'unLink', 'viewLink'],
    }
]
```

其他配置可参考[源码](https://github.com/wangeditor-team/we-2021/blob/main/packages/editor/src/config/hoverbar.ts)。

**不建议直接修改这个配置**，用编辑器默认的即可。建议这样操作：
- 如果想要选中文字的 hoverbar ，就在 createEditor 时设置 `mode: 'default'`
- 如果不想要选中文字的 hoverbar ，就在 createEditor 时设置 `model: 'simple'`

:::tip
千万不要直接设置 `editorConfig.hoverbarKeys = []` 空数组，这会清空所有 hoverbar 。<br>
除非你的工具栏里已经包含了 `hoverbarKeys` 的所有菜单。
:::

## onCreated

编辑器创建完毕时的回调函数。

```js
const editorConfig = {}
editorConfig.onCreated = (editor) => {
    // editor created
}
```

## onChange

编辑器内容、选区变化时的回调函数。

```js
const editorConfig = {}
editorConfig.onChange = (editor) => {
    // editor changed
    console.log('content', editor.children)
}
```

## onDestroyed

编辑器销毁时的回调函数。调用 `editor.destroy()` 即可销毁编辑器，详见 [API](/v5/guide/API.html) 。

```js
const editorConfig = {}
editorConfig.onDestroyed = (editor) => {
    // editor destroyed
}
```

## onFocus

编辑器 focus 时的回调函数。

```js
const editorConfig = {}
editorConfig.onFocus = (editor) => {
    // editor focused
}
```

## onBlur

编辑器 blur 时的回调函数。

```js
const editorConfig = {}
editorConfig.onBlur = (editor) => {
    // editor blur
}
```

## customPaste

自定义粘贴。可阻止编辑器的默认粘贴，实现自己的粘贴逻辑。

```js
const editorConfig = {}
editorConfig.customPaste = (editor, event) => {
    // event 是 ClipboardEvent 类型，可以拿到粘贴的数据
    // 可参考 https://developer.mozilla.org/zh-CN/docs/Web/API/ClipboardEvent

    // 同步
    editor.insertText('xxx')

    // 异步
    setTimeout(() => {
        editor.insertText('yy')
    }, 1000)

    return false // 阻止默认的粘贴行为
    // return true // 继续执行默认的粘贴行为
}
```

## customAlert

自定义编辑器 alert 。如想用 antd 的 message 功能。

```js
import { message } from 'antd'

const editorConfig = {}
editorConfig.customAlert = (s, t) => {
    switch (t) {
        case 'success':
            message.success(s)
            break
        case 'info':
            message.info(s)
            break
        case 'warning':
            message.warning(s)
            break
        case 'error':
            message.error(s)
            break
        default:
            message.info(s)
            break
    }
}
```
