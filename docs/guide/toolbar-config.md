# 工具栏配置

如果是第一次使用，请先通过 [快速开始](/v5/guide/getting-started.html) 了解基本使用。

:::tip
wangEditor V5 开始，工具栏配置和[菜单配置](/v5/guide/menu-config.html)（如配置颜色、字体、链接校验、上传图片等）分离了。本文只讲编辑器配置。
:::

```ts{4}
import { IToolbarConfig, createToolbar } from '@wangeditor/editor'

const toolbarConfig: Partial<IToolbarConfig> = {
    /* 工具栏配置 */
}

// 创建工具栏
const toolbar = createToolbar({
  editor,
  selector: '#toolbar-container',
  config: toolbarConfig
  mode: 'default'
})

// 可通过 toolbar.getConfig() 查看工具栏的默认配置
```

## toolbarKeys

配置工具栏显示哪些菜单，以及菜单的排序、分组。

【注意】可以通过 `editor.getAllMenuKeys()` 查询编辑器注册的所有菜单 key 。这些都可以用于 `toolbarKeys` 中。

```ts
const toolbarConfig: Partial<IToolbarConfig> = {
    toolbarKeys: [
        // 菜单 key
        'headerSelect',

        // 分割线
        '|',

        // 菜单 key
        'bold', 'italic',

        // 菜单组，包含多个菜单
        {
            key: 'group-more-style', // 必填，要以 group 开头
            title: '更多样式', // 必填
            iconSvg: '<svg>....</svg>', // 可选
            menuKeys: ["through", "code", "clearStyle"] // 下级菜单 key ，必填
        },
        // 继续配置其他菜单...
    ]
}

// 创建 toolbar
```

## excludeKeys

如果仅仅想排除掉某些菜单，其他都保留，可以使用 `excludeKeys` 来配置。<br>
可通过 `toolbar.getConfig().toolbarKeys` 查看工具栏的默认配置

```ts
const toolbarConfig: Partial<IToolbarConfig> = {
    excludeKeys: [
        'headerSelect',
        'italic',
        'group-more-style' // 排除菜单组，写菜单组 key 的值即可
    ]
}

// 创建 toolbar
```