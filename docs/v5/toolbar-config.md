# 工具栏配置

:::tip
wangEditor 从 V5 版本开始，工具栏配置和[菜单配置](/v5/menu-config.html)（如配置颜色、字体、链接校验、上传图片等）分离了。本文只讲工具栏配置。
:::

```ts{5}
import { IToolbarConfig } from '@wangeditor/editor'

const toolbarConfig: Partial<IToolbarConfig> = {  // TS 语法
// const toolbarConfig = {                        // JS 语法
    /* 工具栏配置 */
}

// 创建 toolbar ，或者传入 Vue React <Toolbar> 组件中
```

## getConfig

可通过 `toolbar.getConfig()` 查看工具栏的默认配置。<br>
如果你使用 Vue React ，可以通过如下代码获取 `toolbar` 实例

```ts
import { DomEditor } from '@wangeditor/editor'
const toolbar = DomEditor.getToolbar(editor)

const curToolbarConfig = toolbar.getConfig()
console.log(curToolbarConfig.toolbarKeys) // 当前菜单排序和分组
```

## toolbarKeys

**重新**配置工具栏，显示哪些菜单，以及菜单的排序、分组。

- `toolbar.getConfig().toolbarKeys` 查看当前的默认配置
- `editor.getAllMenuKeys()` 查询编辑器注册的所有菜单 key （可能有的不在工具栏上）

```ts
toolbarConfig.toolbarKeys = [
  // 菜单 key
  'headerSelect',

  // 分割线
  '|',

  // 菜单 key
  'bold',
  'italic',

  // 菜单组，包含多个菜单
  {
    key: 'group-more-style', // 必填，要以 group 开头
    title: '更多样式', // 必填
    iconSvg: '<svg>....</svg>', // 可选
    menuKeys: ['through', 'code', 'clearStyle'], // 下级菜单 key ，必填
  },
  // 继续配置其他菜单...
]
```

## insertKeys

可以在当前 `toolbarKeys` 的基础上继续插入新菜单，如自定义扩展的菜单。

```ts
toolbarConfig.insertKeys = {
  index: 5, // 插入的位置，基于当前的 toolbarKeys
  keys: ['menu-key1', 'menu-key2'],
}
```

## excludeKeys

如果仅仅想排除掉某些菜单，其他都保留，可以使用 `excludeKeys` 来配置。<br>
可通过 `toolbar.getConfig().toolbarKeys` 查看工具栏的默认配置

```ts
toolbarConfig.excludeKeys = [
  'headerSelect',
  'italic',
  'group-more-style', // 排除菜单组，写菜单组 key 的值即可
]
```

如果你想排除某个菜单组，可通过 `toolbar.getConfig().toolbarKeys` 找到这个菜单组的 key 。

![](/image/exclude-group.png)

## modalAppendToBody

将菜单弹出的 modal 添加到 body 下，并自定义 modal 的定位和其他样式。

![](/image/modal-appendTo-body.png)

```ts{1}
toolbarConfig.modalAppendToBody = true

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

上述代码细节可以参考 [example 源码](https://github.com/wangeditor-team/wangEditor/blob/master/packages/editor/examples/modal-appendTo-body.html)
