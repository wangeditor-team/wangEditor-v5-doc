# Toolbar Config

If you first-time use wangEditor, please see [Get Started](./getting-started.md) it to learn basic usage.

```ts{4}
import { IToolbarConfig, createToolbar } from '@wangeditor/editor'

const toolbarConfig: Partial<IToolbarConfig> = {
    /* your toolbar config */
}

// create toolbar
const toolbar = createToolbar({
  editor,
  selector: '#toolbar-container',
  config: toolbarConfig
  mode: 'default'
})
```

## getConfig

Use `toolbar.getConfig()` to checkout default toolbar config.<br>
If you use Vue or React, you can get `toolbar` instance by these codes.

```ts
import { DomEditor } from '@wangeditor/editor'
const toolbar = DomEditor.getToolbar(editor)
```

## toolbarKeys

**Rewrite** toolbar menus, re-order and re-group.

- `toolbar.getConfig().toolbarKeys` checkout default `toolbarKeys` config.
- `editor.getAllMenuKeys()` checkout all embedded menu keys.

```ts
const toolbarConfig: Partial<IToolbarConfig> = {
    toolbarKeys: [
        // menu key
        'headerSelect',

        // split line
        '|',

        // menu key
        'bold', 'italic',

        // menu group, includes many menu
        {
            key: 'group-more-style', // required, must start with `group-`
            title: 'more', // required
            iconSvg: '<svg>....</svg>', // optional
            menuKeys: ["through", "code", "clearStyle"] // required, children menu keys
        },
        // other menu keys...
    ]
}

// create toolbar
```

## insertKeys

You may only want to insert some new menus, based on current `toolbarKeys`.

```ts
const toolbarConfig: Partial<IToolbarConfig> = {
    insertKeys: {
        index: 5, // inserted index, in current toolbarKeys
        keys: ['menu-key1', 'menu-key2']
    },
}

// create toolbar
```

## excludeKeys

You may only want to exclude some menus, and keep the rest.

```ts
const toolbarConfig: Partial<IToolbarConfig> = {
    excludeKeys: [
        'headerSelect',
        'italic',
        'group-more-style' // exclude menu-group
    ]
}

// create toolbar
```

If you want to exclude a menu group, you can find it's key by `toolbar.getConfig().toolbarKeys`

![](/image/exclude-group-en.png)

## modalAppendToBody

You may want to append the modal when a menu clicked to `<body>`, and custom its position style.

![](/image/modal-appendTo-body-en.png)

```ts
const toolbarConfig: Partial<IToolbarConfig> = {
    modalAppendToBody: true
}

// Create toolbar and editor

// Observe `modalOrPanelShow` and `modalOrPanelHide` custom event, then set modal style, and even you can show a mask <div>
editor.on('modalOrPanelShow', modalOrPanel => {
    if (modalOrPanel.type !== 'modal') return
    const { $elem } = modalOrPanel // modal element

    // set modal style (position, z-index)
    // show a mask <div>
})
editor.on('modalOrPanelHide', () => {
    // hide your mask <div>
})
```

You could checkout [example source code](https://github.com/wangeditor-team/wangEditor-v5/blob/main/packages/editor/examples/modal-appendTo-body.html).
