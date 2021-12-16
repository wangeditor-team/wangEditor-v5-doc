# 工具栏配置

如果是第一次使用，请先通过 [快速开始](/v5/guide/getting-started.html) 了解基本使用。

:::tip
wangEditor 从 V5 版本开始，工具栏配置和[菜单配置](/v5/guide/menu-config.html)（如配置颜色、字体、链接校验、上传图片等）分离了。本文只讲编辑器配置。
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

【附加】如果你使用 Vue React ，可以通过如下代码获取 `toolbar` 实例

```ts
import { DomEditor } from '@wangeditor/editor'
const toolbar = DomEditor.getToolbar(editor)
```

## toolbarKeys

**重新**配置工具栏，显示哪些菜单，以及菜单的排序、分组。

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

## insertKeys

可以在当前 `toolbarKeys` 的基础上继续插入新菜单，如自定义扩展的菜单。

```ts
const toolbarConfig: Partial<IToolbarConfig> = {
    insertKeys: {
        index: 5, // 插入的位置，基于当前的 toolbarKeys
        keys: ['menu-key1', 'menu-key2']
    },
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

## modalAppendToBody

将菜单弹出的 modal 添加到 body 下，并自定义 modal 的定位和其他样式。

![](/v5/image/modal-appendTo-body.png)

```ts
const toolbarConfig: Partial<IToolbarConfig> = {
    modalAppendToBody: true
}

// 创建 toolbar 和 editor

// 可监听 `modalOrPanelShow` 和 `modalOrPanelHide` 自定义事件来设置样式、蒙层
editor.on('modalOrPanelShow', modalOrPanel => {
    if (modalOrPanel.type !== 'modal') return
    const { $elem } = modalOrPanel // modal element

    // 设置 modal 样式（定位、z-index）
    // 显示蒙层
})
editor.on('modalOrPanelHide', () => {
    // 隐藏蒙层
})
```

上述代码细节可以参考 [example 源码](https://github.com/wangeditor-team/wangEditor-v5/blob/main/packages/editor/examples/modal-appendTo-body.html)
