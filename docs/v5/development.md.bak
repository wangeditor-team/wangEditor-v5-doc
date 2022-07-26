# 自定义扩展新功能

wangEditor 从 V5 开始，源码上就分离了 core editor 还有各个 module 。<br>
core 是核心 API ，editor 负责汇总集成。所有的具体功能，都分布在各个 module 中来实现。

所以，从底层设计就保证了扩展性。

![](/image/架构图.png)

## 概述

wangEditor 扩展性包括以下部分，你可以来扩展大部分常用的功能。
- 定义新元素（如 todo-list 、链接卡片、`@xxx` 功能，插入地图等）
    - 渲染到编辑器
    - 显示时获取 html
- 劫持编辑器的 API 并自定义（如输入 `#` 之后，切换为 H1 ，实现简单的 markdown 功能）
- 扩展菜单

## 元素的数据结构

如果你需要扩展新元素，则需要先定义数据结构。<br>
如果不需要，则忽略该步骤。

具体可参考 [节点数据结构](/v5/node-define.html) ，定义自己的节点数据结构。<br>
注意要符合 [slate.js](https://docs.slatejs.org/) 的数据规范。

## Render

需要你提前了解 vdom 概念，以及 [snabbdom.js](https://github.com/snabbdom/snabbdom) 和它的 `h` 函数。

如果你定义了新元素，则需要把它显示到编辑器内。主要过程是：**model -> 生成 vdom -> 渲染 DOM** <br>
用到了 vdom 需要安装 `snabbdom`，参考上文。

![](/image/extend-api.png)

### 安装 snabbdom.js

```shell
yarn add snabbdom --peer
## 安装到 package.json 的 peerDependencies 中即可
```

### renderElem

增加了新的元素，需要渲染到编辑器中。

注意：
- 必须在创建编辑器之前注册
- 全局只能注册一次，不要重复注册

```tsx
import { h, VNode } from 'snabbdom'
import { Boot, IDomEditor, SlateElement } from '@wangeditor/editor'

// 渲染函数
function renderParagraph(elem: SlateElement, children: VNode[] | null, editor: IDomEditor): VNode {
    // elem 即当前节点
    // children 是下级节点
    // editor 即编辑器实例

    const vnode = h('p', {}, children) // type: 'paragraph' 节点，即渲染为 <p> 标签
    return vnode
}

// 渲染配置
const renderElemConf = {
    type: 'paragraph', // 节点 type ，重要！！！
    renderElem: renderParagraph,
}

// 注册到 wangEditor
Boot.registerRenderElem(renderElemConf)
```

PS：`h` 函数的使用，请参考 [snabbdom](https://github.com/snabbdom/snabbdom)

### renderStyle

渲染 CSS 样式，最基本的一些样式（如加粗、斜体、颜色、对齐方式等）编辑器已经自带了。
如果你需要再自定义新的样式，可以通过以下方式来注册。

注意：
- 必须在创建编辑器之前注册
- 全局只能注册一次，不要重复注册

```ts
import { h, VNode, VNodeStyle } from 'snabbdom'
import { Boot, SlateElement, SlateText, SlateDescendant } from '@wangeditor/editor'

/**
 * 给 vnode 添加样式
 * @param vnode vnode
 * @param newStyle { key: val }
 */
function addVnodeStyle(vnode: VNode, newStyle: VNodeStyle) {
  if (vnode.data == null) vnode.data = {}
  const data = vnode.data
  if (data.style == null) data.style = {}
  Object.assign(data.style, newStyle)
}

/**
 * render style
 * @param node slate node
 * @param vnode vnode
 * @returns new vnode
 */
function renderStyle(node: SlateDescendant, vnode: VNode): VNode {
    // 1. 获取样式相关的属性
    const { bold, color } = node as SlateText
    // const { lineHeight } = node as SlateElement // node 可能是 Text 也可能是 Element
    let newVnode = vnode

    // 2. 为 vnode 添加样式标签
    if (bold) {
      newVnode = h('strong', {}, [newVnode])
    }
    if (color) {
      addVnodeStyle(newVnode, { color })
    }
    // if (lineHeight) {
    //   addVnodeStyle(newVnode, { lineHeight })
    // }

    // 3. 返回添加了样式的 vnode
    return newVnode
}

// 注册到 wangEditor
Boot.registerRenderStyle(renderStyle)
```

PS：`h` 函数的使用，请参考 [snabbdom](https://github.com/snabbdom/snabbdom)

## To HTML

在显示编辑器内容时 ，无论什么渲染形式，都需要得到各个元素的 html。所以对于新元素，必须要扩展 toHtml 方法。

### elemToHtml

生成元素的 html

注意：
- 必须在创建编辑器之前注册
- 全局只能注册一次，不要重复注册

```ts
import { Boot, SlateElement } from '@wangeditor/editor'

// 生成 html 的函数
function paragraphToHtml(elem: SlateElement, childrenHtml: string): string {
    if (childrenHtml === '') {
        return '<p><br/></p>'
    }
    return `<p>${childrenHtml}</p>`
}

// 配置
const elemToHtmlConf = {
    type: 'paragraph', // 节点 type ，重要！！！
    elemToHtml: paragraphToHtml,
}

// 注册到 wangEditor
Boot.registerElemToHtml(elemToHtmlConf)
```

可参考 wangEditor 源码中 [基础模块](https://github.com/wangeditor-team/wangEditor/tree/master/packages/basic-modules/src/modules) 中各个模块的所有 `elem-to-html.ts` 文件。

### styleToHtml

生成 CSS 样式的 html ，如文本的加粗、斜体、颜色等，还有段落的对齐、行高等。

注意：
- 必须在创建编辑器之前注册
- 全局只能注册一次，不要重复注册

```ts
import { Boot, SlateText, SlateElement, SlateDescendant } from '@wangeditor/editor'
import $ from 'dom7' // jquery 也可以

/**
 * style to html
 * @param node slate node
 * @param nodeHtml node html
 * @returns styled html
 */
function styleToHtml(node: SlateDescendant, nodeHtml: string): string {
    // 1. 获取样式相关的属性获取属性
    const { color, bgColor } = node as SlateText
    // const { lineHeight } = node as SlateElement // node 可能是 Text 也可能是 Element

    // 设置 css 样式
    const $elem = $(elemHtml)
    if (color) $elem.css('color', color)
    if (bgColor) $elem.css('background-color', bgColor)
    // $elem.css('line-height', lineHeight)

    // 输出 html
    return $elem[0].outerHTML
}

// 注册到 wangEditor
Boot.registerStyleToHtml(styleToHtml)
```

可参考 wangEditor 源码中 [颜色、背景色](https://github.com/wangeditor-team/wangEditor/blob/master/packages/basic-modules/src/modules/color/style-to-html.ts) 和 [字体字号](https://github.com/wangeditor-team/wangEditor/blob/master/packages/basic-modules/src/modules/font-size-family/style-to-html.ts) 的 style-to-html 。

## Parse HTML

上文的 toHtml 是从编辑器获取 html 。得到的 html 还可能再设置回显到编辑器中，这就需要 parse html 。

### parseElemHtml

例如编辑器的“链接”，以下函数会把 html `'<a href="https://www.baidu.com/" target="_blank">百度<a/>'` 转换为 slate element 。

```ts
import { Dom7Array } from 'dom7'
import { Boot, IDomEditor, SlateDescendant, SlateText, SlateElement } from '@wangeditor/editor'

/**
 * 将 html 转换为 slate elem
 * @param $elem 由 html 生成的 DOM 节点（Dom7 封装，类似于 jquery）
 * @param children 子节点
 * @param editor editor
 * @returns slate element
 */
function parseHtml($elem: Dom7Array, children: SlateDescendant[], editor: IDomEditor): SlateElement {
  // 过滤 children
  children = children.filter(child => {
    // child 必须是 text 或者 inline element （不能是 block element）
    if (SlateText.isText(child)) return true
    if (editor.isInline(child)) return true
    return false
  })

  // 无 children ，则取 $elem 纯文本
  if (children.length === 0) {
    children = [{ text: $elem.text().replace(/\s+/gm, ' ') }]
  }

  // 返回 slate elem ，链接类型
  return {
    type: 'link',
    url: $elem.attr('href') || '',
    target: $elem.attr('target') || '',
    children,
  }
}

export const parseHtmlConf = {
  selector: 'a', // CSS 选择器，以匹配“链接”的 html tag
  parseElemHtml: parseHtml,
}

// 注册
Boot.registerParseElemHtml(parseHtmlConf)
```

### parseStyleHtml

例如编辑器处理颜色，以下代码可识别 html `'<span style="color: rgb(231, 95, 51); background-color: rgb(252, 251, 207);">hello</span>'` 中的 `color` 和 `background-color` ，并添加到 text node 。

```ts
import { Dom7Array, SlateText } from 'dom7'
import { Boot, SlateDescendant, SlateText, IDomEditor } from '@wangeditor/editor'

/**
 * 识别 html 中的颜色，并添加到 text node
 * @param $text 由 html 创建的 DOM 节点（Dom7 创建，类似 jquery）
 * @param node text node
 * @param editor editor
 * @returns text node with color and bgColor
 */
export function parseStyleHtml($text: Dom7Array, node: SlateDescendant, editor: IDomEditor): SlateDescendant {
  if (!SlateText.isText(node)) return node

  const textNode = node as SlateText

  const color = getStyleValue($text, 'color') // 获取 style 中的 color 值
  if (color) {
    textNode.color = color
  }

  const bgColor = getStyleValue($text, 'background-color') // 获取 style 中的 background-color 值
  if (bgColor) {
    textNode.bgColor = bgColor
  }

  return textNode
}

// 注册
Boot.registerParseStyleHtml(parseStyleHtml)
```

## 注册插件

wangEditor 是基于 [slate.js](https://docs.slatejs.org/) 内核的，所以可以直接使用 slate.js 插件。所以你先要去了解 slate.js 的 API 和插件机制。

注意：
- 必须在创建编辑器之前注册
- 全局只能注册一次，不要重复注册

```ts
import { Boot, IDomEditor } from '@wangeditor/editor'

// 定义 slate 插件
function withBreak<T extends IDomEditor>(editor: T): T {
    const { insertBreak } = editor
    const newEditor = editor

    // 重写 editor insertBreak API
    // 例如做一个 ctrl + enter 换行功能
    newEditor.insertBreak = () => {
        // 判断，如果按键是 ctrl + enter ，则执行 insertBreak
        insertBreak()

        // 否则，则 return
    }

    // 还可以重写其他 API

    // 返回 editor ，重要！
    return newEditor
}

// 注册到 wangEditor
Boot.registerPlugin(withBreak)
```

可参考 wangEditor 源码 [基础模块](https://github.com/wangeditor-team/wangEditor/tree/master/packages/basic-modules/src/modules) 中所有 `withXxx.ts` 文件源码。

## 注册菜单

菜单分为几种，都可以扩展
- ButtonMenu 按钮菜单，如加粗、斜体
- SelectMenu 下拉菜单，如标题、字体、行高
- DropPanelMenu 下拉面板菜单，如颜色、创建表格
- ModalMenu 弹出框菜单，如插入链接、插入网络图片

注意，下面代码中的 `key` 即菜单 key ，要唯一不重复。<br>
注册完菜单之后，即可把这个 `key` 配置到[工具栏](/v5/toolbar-config.html)中。

### ButtonMenu

代码如下。菜单的详细配置，可参考“引用”菜单[源码](https://github.com/wangeditor-team/wangEditor/blob/master/packages/basic-modules/src/modules/blockquote/menu/BlockquoteMenu.ts)。

注意：
- 必须在创建编辑器之前注册
- 全局只能注册一次，不要重复注册

```ts
import { Boot, IButtonMenu } from '@wangeditor/editor'

// 定义菜单 class
class MyButtonMenu implements IButtonMenu {
    // 菜单配置，参考“引用”菜单源码
}

// 定义菜单配置
export const menu1Conf = {
  key: 'menu1', // menu key ，唯一。注册之后，可配置到工具栏
  factory() {
    return new MyButtonMenu()
  },
}

// 注册到 wangEditor
Boot.registerMenu(menu1Conf)
```

### SelectMenu

代码如下。菜单的详细配置，可参考“标题”菜单[源码](https://github.com/wangeditor-team/wangEditor/blob/master/packages/basic-modules/src/modules/header/menu/HeaderSelectMenu.ts)。

注意：
- 必须在创建编辑器之前注册
- 全局只能注册一次，不要重复注册

```ts
import { Boot, ISelectMenu } from '@wangeditor/editor'

// 定义菜单 class
class MySelectMenu implements ISelectMenu {
    // 菜单配置，代码可参考“标题”菜单源码
}

// 定义菜单配置
export const menu2Conf = {
  key: 'menu2', // menu key ，唯一。注册之后，可配置到工具栏
  factory() {
    return new MySelectMenu()
  },
}

// 注册到 wangEditor
Boot.registerMenu(menu2Conf)
```

### DropPanelMenu

代码如下。菜单的详细配置，可参考“颜色”菜单[源码](https://github.com/wangeditor-team/wangEditor/blob/master/packages/basic-modules/src/modules/color/menu/BaseMenu.ts)。

注意：
- 必须在创建编辑器之前注册
- 全局只能注册一次，不要重复注册

```ts
import { Boot, IDropPanelMenu } from '@wangeditor/editor'

// 定义菜单 class
class MyDropPanelMenu implements IDropPanelMenu {
  // 菜单配置，代码可参考“颜色”菜单源码
}

// 定义菜单配置
export const menu3Conf = {
  key: 'menu3', // menu key ，唯一。注册之后，可配置到工具栏
  factory() {
    return new MyDropPanelMenu()
  },
}

// 注册到 wangEditor
Boot.registerMenu(menu3Conf)
```

### ModalMenu

代码如下。菜单配置可参考“插入链接”菜单[源码](https://github.com/wangeditor-team/wangEditor/blob/master/packages/basic-modules/src/modules/link/menu/InsertLink.ts)。

注意：
- 必须在创建编辑器之前注册
- 全局只能注册一次，不要重复注册

```ts
import { Boot, IModalMenu } from '@wangeditor/editor'

// 定义菜单 class
class MyModalMenu implements IModalMenu {
    // 菜单配置，代码可参考“插入链接”菜单源码
}

// 定义菜单配置
export const menu4Conf = {
  key: 'menu4', // menu key ，唯一。注册之后，可配置到工具栏
  factory() {
    return new MyModalMenu()
  },
}

// 注册到 wangEditor
Boot.registerMenu(menu4Conf)
```

## 封装为模块

可以把上述的 renderElem toHtml parseHtml 插件 菜单等，封装为一个 module ，然后一次性注册。

```ts
import { Boot, IModuleConf } from '@wangeditor/editor'

const module: Partial<IModuleConf> = {
  editorPlugin: withBreak,
  renderElems: [renderElemConf],
  renderStyle: renderStyle,
  elemsToHtml: [elemToHtmlConf],
  styleToHtml: styleToHtml,
  parseElemsHtml: [parseHtmlConf],
  parseStyleHtml: parseStyleHtml,
  menus: [menu1Conf, menu2Conf, menu3Conf],
}

Boot.registerModule(module)
```

## 总结

一个模块常用代码文件如下，共选择参考（不一定都用到）
- render-elem.ts
- render-style.ts
- elem-to-html.ts
- style-to-html.ts
- parse-elem-html.ts
- parse-style-html.ts
- plugin.ts
- menu/
    - Menu1.ts
    - Menu2.ts
