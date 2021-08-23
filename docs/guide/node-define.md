# 节点数据结构

wangEditor 是基于 slate.js 为内核开发的，所以学习本文之前，要先了解 [slate Node 设计](https://docs.slatejs.org/concepts/02-nodes) 。

## 是什么

很多同学可能根本不知道本文要讲什么，对于这里的“节点”和“数据结构”也不知何意。<br>
没关系，接下来通过几个问题，就可以让你快速入门。

我们通过 [API](/v5/guide/API.html) 的学习，已经知道了 wangEditor 有丰富的 API 可供使用。<br>
那么问题来了：

- `editor.addMark({ key: value })` 可以设置文本样式，如何设置删除线呢？此时 `key` `value` 该怎么写？
- `editor.insertNode(node)` 可以插入一个节点，如何插入一个链接呢？此时 `node` 该怎么写？
- `SlateTransforms.setNodes(editor, {...})` 可以设置节点的属性，如何设置行高呢？此时 `{...}` 这个属性该怎么写？

通过上述问题，你大概知道了本文的目的 —— 就是告诉你，编辑器内所有内容、节点的数据结构 —— 它们都是由哪些数据构成的。

## 快速了解

如果想快速了解各个节点的数据结构，其实方法很简单：只需要创建一个编辑器，操作一下，查看 `editor.children` 即可。

例如，写一段文字、设置一个标题或列表，查看 `editor.children` 即可看到他们的数据结构

![](/v5/image/数据结构-1.png)

再例如，对文字设置行高，设置文本样式，查看 `editor.children` 即可看到他们的数据结构

![](/v5/image/数据结构-2.png)

## 各种节点的数据结构

详细的节点数据结构，可以直接查看源码中 `type` 定义。

- [文本样式](https://github.com/wangeditor-team/we-2021/blob/main/packages/basic-modules/src/modules/text-style/custom-types.ts)
- [文字颜色 背景色](https://github.com/wangeditor-team/we-2021/blob/main/packages/basic-modules/src/modules/color/custom-types.ts)
- [段落](https://github.com/wangeditor-team/we-2021/blob/main/packages/basic-modules/src/modules/paragraph/custom-types.ts)
- [行高](https://github.com/wangeditor-team/we-2021/blob/main/packages/basic-modules/src/modules/line-height/custom-types.ts)
- [字号 字体](https://github.com/wangeditor-team/we-2021/blob/main/packages/basic-modules/src/modules/font-size-family/custom-types.ts)
- [对齐](https://github.com/wangeditor-team/we-2021/blob/main/packages/basic-modules/src/modules/justify/custom-types.ts)
- [缩进](https://github.com/wangeditor-team/we-2021/blob/main/packages/basic-modules/src/modules/indent/custom-types.ts)
- [链接](https://github.com/wangeditor-team/we-2021/blob/main/packages/basic-modules/src/modules/link/custom-types.ts)
- [标题](https://github.com/wangeditor-team/we-2021/blob/main/packages/basic-modules/src/modules/header/custom-types.ts)
- [引用](https://github.com/wangeditor-team/we-2021/blob/main/packages/basic-modules/src/modules/blockquote/custom-types.ts)
- [图片](https://github.com/wangeditor-team/we-2021/blob/main/packages/basic-modules/src/modules/image/custom-types.ts)
- [分割线](https://github.com/wangeditor-team/we-2021/blob/main/packages/basic-modules/src/modules/divider/custom-types.ts)
- [代码块](https://github.com/wangeditor-team/we-2021/blob/main/packages/basic-modules/src/modules/code-block/custom-types.ts)
- [列表](https://github.com/wangeditor-team/we-2021/blob/main/packages/list-module/src/module/custom-types.ts)
- [表格](https://github.com/wangeditor-team/we-2021/blob/main/packages/table-module/src/module/custom-types.ts)
- [视频](https://github.com/wangeditor-team/we-2021/blob/main/packages/video-module/src/module/custom-types.ts)
