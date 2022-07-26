# 节点数据结构

wangEditor 是基于 slate.js 为内核开发的，所以学习本文之前，要先了解 [slate Node 设计](https://docs.slatejs.org/concepts/02-nodes) 。

## 是什么

很多同学可能根本不知道本文要讲什么，对于这里的“节点”和“数据结构”也不知何意。<br>
没关系，接下来通过几个问题，就可以让你快速入门。

我们通过 [API](/v5/API.html) 的学习，已经知道了 wangEditor 有丰富的 API 可供使用。<br>
那么问题来了：

- `editor.addMark(key, value)` 可以设置文本样式，如何设置删除线呢？此时 `key` `value` 该怎么写？
- `editor.insertNode(node)` 可以插入一个节点，如何插入一个链接呢？此时 `node` 该怎么写？
- `SlateTransforms.setNodes(editor, {...})` 可以设置节点的属性，如何设置行高呢？此时 `{...}` 这个属性该怎么写？

通过上述问题，你大概知道了本文的目的 —— 就是告诉你，编辑器内所有内容、节点的数据结构 —— 它们都是由哪些数据构成的。

## 快速了解

如果想快速了解各个节点的数据结构，其实方法很简单。
- 创建一个编辑器，操作一下
- 查看 `editor.children`

例如，写一段文字、设置一个标题或列表，查看 `editor.children` 即可看到他们的数据结构

![](/image/数据结构-1.png)

再例如，对文字设置行高，设置文本样式，查看 `editor.children` 即可看到他们的数据结构

![](/image/数据结构-2.png)

## Text Node

文本节点，例如 `{ text: 'hello' }` **必须有 `text` 属性**。还可以自定义属性，例如加粗的文本可表示为 `{ text: 'hello', bold: true }` ，其他属性可自行扩展。

注意，文本节点是底层节点，所以没有子节点，**没有 `children` 属性**。

## Element Node

元素节点，例如 `{ type: 'header1', children: [ { text: 'hello' } ] }` **必须有两个属性 `type` 和 `children` 属性**。还可以自定义属性，例如居中对齐可表示为 `{ type: 'header1', textAlign: 'center', children: [ { text: 'hello' } ] }` ，其他属性自行扩展。


## Inline Element

元素默认是 block 显示，即占满一整行。但有些元素需要变为 inline 显示，如 `<img>` `<a>` 等。

我们可以**通过[插件](./development.md#劫持编辑器事件和操作-插件)来修改 `isInline` 把一个元素改为 inline** ，参考链接元素的[插件源码](https://github.com/wangeditor-team/wangEditor/blob/master/packages/basic-modules/src/modules/link/plugin.ts)。

## Void Element

有些元素需要定义为 void 类型（即没有子节点），例如 `<img>` `<video>` 等。

我们可以**通过[插件](./development.md#劫持编辑器事件和操作-插件)来修改 `isVoid` 把一个元素改为 void** ，参考图片元素的[插件源码](https://github.com/wangeditor-team/wangEditor/blob/master/packages/basic-modules/src/modules/image/plugin.ts)。

注意，void 类型虽然在语义上没有子节点，但 slate.js 规定，**它必须有一个 `children` 属性，其中只有一个空字符串**。例如图片元素：

```js
{
    type: 'image',
    // 其他属性 ...
    children: [{ text: '' }] // void 元素必须有一个 children ，其中只有一个空字符串，重要！！！
}
```

## 各种节点的数据结构

详细的节点数据结构，可以直接查看源码中 `type` 定义。

- [文本样式](https://github.com/wangeditor-team/wangEditor/blob/master/packages/basic-modules/src/modules/text-style/custom-types.ts) - 扩展 text node 属性
- [文字颜色 背景色](https://github.com/wangeditor-team/wangEditor/blob/master/packages/basic-modules/src/modules/color/custom-types.ts) - 扩展 text node 属性
- [段落](https://github.com/wangeditor-team/wangEditor/blob/master/packages/basic-modules/src/modules/paragraph/custom-types.ts) - 定义 element node
- [行高](https://github.com/wangeditor-team/wangEditor/blob/master/packages/basic-modules/src/modules/line-height/custom-types.ts) - 扩展 element node 属性
- [字号 字体](https://github.com/wangeditor-team/wangEditor/blob/master/packages/basic-modules/src/modules/font-size-family/custom-types.ts) - 扩展 text node 属性
- [对齐](https://github.com/wangeditor-team/wangEditor/blob/master/packages/basic-modules/src/modules/justify/custom-types.ts) - 扩展 element node 属性
- [缩进](https://github.com/wangeditor-team/wangEditor/blob/master/packages/basic-modules/src/modules/indent/custom-types.ts) - 扩展 element node 属性
- [链接](https://github.com/wangeditor-team/wangEditor/blob/master/packages/basic-modules/src/modules/link/custom-types.ts) - 定义 **inline** element node
- [标题](https://github.com/wangeditor-team/wangEditor/blob/master/packages/basic-modules/src/modules/header/custom-types.ts) - 定义 element node
- [引用](https://github.com/wangeditor-team/wangEditor/blob/master/packages/basic-modules/src/modules/blockquote/custom-types.ts) - 定义 element node
- [图片](https://github.com/wangeditor-team/wangEditor/blob/master/packages/basic-modules/src/modules/image/custom-types.ts) - 定义 **inline void** element node
- [分割线](https://github.com/wangeditor-team/wangEditor/blob/master/packages/basic-modules/src/modules/divider/custom-types.ts) - 定义 **void** element node
- [代码块](https://github.com/wangeditor-team/wangEditor/blob/master/packages/basic-modules/src/modules/code-block/custom-types.ts) - 定义 element node
- [列表](https://github.com/wangeditor-team/wangEditor/blob/master/packages/list-module/src/module/custom-types.ts) - 定义 element node
- [表格](https://github.com/wangeditor-team/wangEditor/blob/master/packages/table-module/src/module/custom-types.ts) - 定义 element node
- [视频](https://github.com/wangeditor-team/wangEditor/blob/master/packages/video-module/src/module/custom-types.ts) - 定义 **void** element node
