# Editor Config

If you first-time use wangEditor, please see [Get Started](./getting-started.md) it to learn basic usage.


```ts{4}
import { IEditorConfig, createEditor } from '@wangeditor/editor'

const editorConfig: Partial<IEditorConfig> = {
    /* editor config */
}

const editor = createEditor({
  selector: '#editor-container',
  config: editorConfig,
  content: [],
  mode: 'default'
})

// Can use `editor.getConfig()` to checkout editor's default config
```

## placeholder

```ts
const editorConfig: Partial<IEditorConfig> = {}
editorConfig.placeholder = 'Type your text'
```

## readOnly

Default value is `false`. <br>
You can use `editor.enable()` and `editor.disable()` to toggle readOnly. see [Editor API](./API.md).

```ts
const editorConfig: Partial<IEditorConfig> = {}
editorConfig.readOnly = true
```

## autoFocus

Default value is `true`.

```ts
const editorConfig: Partial<IEditorConfig> = {}
editorConfig.autoFocus = false
```

## scroll

Default value is `true`. You can scroll editor area.

If you set `false`, **do not set `editor-container` a fixed height**, just set `min-height`.

```ts
const editorConfig: Partial<IEditorConfig> = {}
editorConfig.scroll = false
```

:::tip
When you need to set `false`?
- Editor height increases automatically
- Want a Google doc style, see [Demo](https://www.wangeditor.com/demo/en/like-google-doc.html)
:::

## maxLength onMaxLength

```ts
const editorConfig: Partial<IEditorConfig> = {}
editorConfig.maxLength = 1000
editorConfig.onMaxLength = function (editor: IDomEditor) {
    // trigger this when exceed maxlength
}
```

:::tip
If you have no strong demand, do not set `maxLength`.<br>
Cause it may affect performance when text is too large.
:::

## hoverbarKeys

You can use `editor.getConfig().hoverbarKeys` to checkout default config.

![](/v5/image/hoverbar-en.png)

:::tip
If you only unwanted hoverbar when select text, set `model: 'simple'` when creating editor
:::

### Use element type

You can config hoverbar menu keys by element type.<br>

- You can checkout every element's type by `editor.children` , see the picture below
- You can use `editor.getAllMenuKeys()` to checkout all embedded menu keys

![](/v5/image/elem-type-en.png)

```ts
const editorConfig: Partial<IEditorConfig> = {}
editorConfig.hoverbarKeys = {
    'link': {
        // rewrite link element's hoverbar
        menuKeys: ['editLink', 'unLink', 'viewLink'],
    },
    'image': {
        // clear image element's hoverbar
        menuKeys: [],
    },
    // others...
}
```

### Custom match function

You can also custom a match function instead of use element type.

```ts
import { SlateNode, IDomEditor, IEditorConfig } from '@wangeditor/editor'

const editorConfig: Partial<IEditorConfig> = {}
editorConfig.hoverbarKeys = {
    'text': {
        match: (editor: IDomEditor, n: SlateNode) => {
            // match your node exactly
        },
        menuKeys: [ ... ], // custom your menu keys
    },
    // others...
}
```

You can see [source code](https://github.com/wangeditor-team/wangEditor-v5/blob/main/packages/editor/src/init-default-config/config/hoverbar.ts) of all default hoverbar keys config.

## onCreated

```ts
const editorConfig: Partial<IEditorConfig> = {}
editorConfig.onCreated = (editor: IDomEditor) => {
    // editor created
}
```

## onChange

```ts
const editorConfig: Partial<IEditorConfig> = {}
editorConfig.onChange = (editor: IDomEditor) => {
    // editor's content or selection changed
    console.log('content', editor.children)
}
```

## onDestroyed

You can use `editor.destroy()` to destroy editor. see [API](./API.md).

```ts
const editorConfig: Partial<IEditorConfig> = {}
editorConfig.onDestroyed = (editor: IDomEditor) => {
    // editor destroyed
}
```

## onFocus

```ts
const editorConfig: Partial<IEditorConfig> = {}
editorConfig.onFocus = (editor: IDomEditor) => {
    // editor focused
}
```

## onBlur

```ts
const editorConfig: Partial<IEditorConfig> = {}
editorConfig.onBlur = (editor: IDomEditor) => {
    // editor blur
}
```

## customPaste

You can prevent default paste event, redefine your custom paste logic.

```ts
const editorConfig: Partial<IEditorConfig> = {}
editorConfig.customPaste = (editor: IDomEditor, event: ClipboardEvent): boolean => {
    // event is ClipboardEvent type, see https://developer.mozilla.org/zh-CN/docs/Web/API/ClipboardEvent

    // insert your custom text (sync)
    editor.insertText('xxx')

    // insert your custom text (async)
    setTimeout(() => {
        editor.insertText('yy')
    }, 1000)

    return false // prevent default paste event.
    // return true // continue default paste event.
}
```

## customAlert

Redefine your custom editor alert.

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
