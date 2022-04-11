# 编辑器配置

如果是第一次使用，请先通过 [快速开始](/v5/getting-started.html) 了解基本使用。

```ts{4}
import { IEditorConfig, createEditor } from '@wangeditor/editor'

const editorConfig: Partial<IEditorConfig> = {
    /* 编辑器配置 */
}

const editor = createEditor({
  selector: '#editor-container',
  config: editorConfig,
})

// 可通过 editor.getConfig() 查看编辑器默认配置
```

## placeholder

配置编辑器 placeholder

```ts
const editorConfig: Partial<IEditorConfig> = {}
editorConfig.placeholder = '请输入内容...'
```

## readOnly

配置编辑器是否只读，默认为 `false`

```ts
const editorConfig: Partial<IEditorConfig> = {}
editorConfig.readOnly = true
```

只读状态可通过 `editor.enable()` 和 `editor.disable()` 切换，详见 [API](/v5/API.html) 。

## autoFocus

配置编辑器默认是否 focus ，默认为 `true`

```ts
const editorConfig: Partial<IEditorConfig> = {}
editorConfig.autoFocus = false
```

## scroll

配置编辑器是否支持滚动，默认为 `true` 。注意，此时**不要固定 `editor-container` 的高度**，设置一个 `min-height` 即可。

```ts
const editorConfig: Partial<IEditorConfig> = {}
editorConfig.scroll = false
```

:::tip
可将 scroll 设置为 `false` 的情况：
- 编辑器高度自增
- 在线文档，如腾讯文档、语雀那样的，参考 [demo](https://www.wangeditor.com/demo/zh-CN/like-qq-doc.html) 中的“仿腾讯文档”
:::

## maxLength onMaxLength

配置编辑器的 maxlength ，默认不限制

```ts
const editorConfig: Partial<IEditorConfig> = {}
editorConfig.maxLength = 1000
editorConfig.onMaxLength = function (editor: IDomEditor) {
    // 当达到 maxlength 限制时，触发该回调函数
}
```

:::tip
无特殊需求，请慎用 maxLength ，这可能会导致编辑器内容过多时，编辑卡顿。
:::

## hoverbarKeys

配置编辑器的 hoverbar 菜单。通过 `editor.getConfig().hoverbarKeys` 可查看当前的 hoverbarKeys

![](/image/hoverbar.png)

:::tip
createEditor 时设置 `model: 'simple'` 可隐藏选中文本时的 hoverbar 。
:::

### 使用 element type

可以通过元素 `type` 配置某种元素的 hoverbar

- 元素的 `type` 可通过 `editor.children` 查看，如下图
- 使用 `editor.getAllMenuKeys()` 可查看所有内置 menu key

![](/image/elem-type.png)

```ts
const editorConfig: Partial<IEditorConfig> = {}
editorConfig.hoverbarKeys = {
    'link': {
        // 重写 link 元素的 hoverbar
        menuKeys: ['editLink', 'unLink', 'viewLink'],
    },
    'image': {
        // 清空 image 元素的 hoverbar
        menuKeys: [],
    }
}
```

### 自定义 match 函数

如果 element type 无法满足需求，可通过自定义 `match` 函数匹配元素。

```ts
import { SlateNode, IDomEditor, IEditorConfig } from '@wangeditor/editor'

const editorConfig: Partial<IEditorConfig> = {}
editorConfig.hoverbarKeys = {
    'text': {
        // 如有 match 函数，则优先根据 match 判断，而忽略 element type
        match: (editor: IDomEditor, n: SlateNode) => {
            // 可参考下文的源码
        },
        menuKeys: [ ... ], // 定义你想要的 menu keys
    }
}
```

可参考 hoverbar 配置的[源码](https://github.com/wangeditor-team/wangEditor-v5/blob/main/packages/editor/src/init-default-config/config/hoverbar.ts)。

## onCreated

编辑器创建完毕时的回调函数。

```ts
const editorConfig: Partial<IEditorConfig> = {}
editorConfig.onCreated = (editor: IDomEditor) => {
    // editor created
}
```

## onChange

编辑器内容、选区变化时的回调函数。

```ts
const editorConfig: Partial<IEditorConfig> = {}
editorConfig.onChange = (editor: IDomEditor) => {
    // editor changed
    console.log('content', editor.children)
}
```

## onDestroyed

编辑器销毁时的回调函数。调用 `editor.destroy()` 即可销毁编辑器，详见 [API](/v5/API.html) 。

```ts
const editorConfig: Partial<IEditorConfig> = {}
editorConfig.onDestroyed = (editor: IDomEditor) => {
    // editor destroyed
}
```

## onFocus

编辑器 focus 时的回调函数。

```ts
const editorConfig: Partial<IEditorConfig> = {}
editorConfig.onFocus = (editor: IDomEditor) => {
    // editor focused
}
```

## onBlur

编辑器 blur 时的回调函数。

```ts
const editorConfig: Partial<IEditorConfig> = {}
editorConfig.onBlur = (editor: IDomEditor) => {
    // editor blur
}
```

## customPaste

自定义粘贴。可阻止编辑器的默认粘贴，实现自己的粘贴逻辑。

```ts
const editorConfig: Partial<IEditorConfig> = {}
editorConfig.customPaste = (editor: IDomEditor, event: ClipboardEvent): boolean => {
    // event 是 ClipboardEvent 类型，可以拿到粘贴的数据
    // 可参考 https://developer.mozilla.org/zh-CN/docs/Web/API/ClipboardEvent

    // const html = event.clipboardData.getData('text/html') // 获取粘贴的 html
    // const text = event.clipboardData.getData('text/plain') // 获取粘贴的纯文本
    // const rtf = event.clipboardData.getData('text/rtf') // 获取 rtf 数据（如从 word wsp 复制粘贴）

    // 同步
    editor.insertText('xxx')

    // 异步
    setTimeout(() => {
        editor.insertText('yy')
    }, 1000)

    // 阻止默认的粘贴行为
    event.preventDefault()
    return false

    // 继续执行默认的粘贴行为
    // return true
}
```

## customAlert

自定义编辑器 alert 。如想用 antd 的 message 功能。

```ts
import { message } from 'antd'

const editorConfig: Partial<IEditorConfig> = {}
editorConfig.customAlert = (s: string, t: string) => {
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

## EXTEND_CONF

用于第三方插件做扩展配置，如 [mention 插件](https://github.com/wangeditor-team/wangEditor-plugin-mention)。
