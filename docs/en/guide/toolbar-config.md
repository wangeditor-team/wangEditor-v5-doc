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

// Use `toolbar.getConfig()` to checkout default toolbar config
```

## ToolbarKeys

You can re-order and re-group toolbar menus.<br>
You can run `editor.getAllMenuKeys()` to checkout all embedded menu keys.

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

## ExcludeKeys

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
