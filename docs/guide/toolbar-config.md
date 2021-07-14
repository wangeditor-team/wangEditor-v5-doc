# 工具栏配置

如果是第一次使用，请先通过 [快速开始](/guide/getting-started.html) 了解基本使用。

:::tip
wangEditor V5 开始，工具栏配置和[菜单配置](/guide/menu-config.html)（如配置颜色、字体、链接校验、上传图片等）分离了。本文只讲编辑器配置。
:::

```js{5}
// 创建工具栏
const toolbar = wangEditor.createToolbar({
  editor,
  toolbarSelector: '#toolbar-container',
  config: { /* 工具栏配置 */ }
  mode: 'default'
})

// 可通过 toolbar.getConfig() 查看工具栏的默认配置
```

## toolbarKeys

配置工具栏显示哪些菜单，以及菜单的排序、分组。

【注意】可以通过 `editor.getAllMenuKeys()` 查询编辑器注册的所有菜单 key 。这些都可以用于 `toolbarKeys` 中。

```js
const toolbarConfig = {
    toolbarKeys: [
        // 菜单 key
        'headerSelect',

        // 分割线
        '|',

        // 菜单 key
        'bold', 'italic',

        // 菜单组，包含多个菜单
        {
            title: '更多样式',
            iconSvg: '<svg>....</svg>', // 可选
            menuKeys: ["through", "code", "clearStyle"]
        },
        // 继续配置其他菜单...
    ]
}
// 创建 toolbar
const toolbar = wangEditor.createToolbar({
    config: toolbarConfig,
    // 其他属性
})
```
