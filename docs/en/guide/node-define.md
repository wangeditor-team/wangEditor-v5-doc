# Date Structure

wangEditor is based on Slate.js, so you may learn [Slate node design](https://docs.slatejs.org/concepts/02-nodes) first.

## What

You maybe have learned [editor API](./API.md), let me ask you some questions.

- `editor.addMark(key, value)` can set tet style, but how can I set through-line, Which `key` and `value`?
- `editor.insertNode(node)` can insert a node, but how can I insert a link node, how to define the `node`?
- `SlateTransforms.setNodes(editor, {...})` can set node props, but how can I set line-height, how to define `{...}`?

This article will tell you all of the node types and props, so you can do everything by the editor API.

## Getting Started

If you want to know a node structure quickly, it's very simply.
- Create an editor and run in browser, or use [demo](https://www.wangeditor.com/demo/en/)
- Do something, like: bold, set color, set header ...
- Run `editor.children` in browser's console

For example, you type some text, set a header or list, run `editor.children` then you can see it's structure

![](/image/数据结构-1-en.png)

Set line height and text style, run `editor.children` then you can see it's structure

![](/image/数据结构-2-en.png)

## All Nodes Structure

See `type` in every source code.

- [Text style](https://github.com/wangeditor-team/wangEditor-v5/blob/main/packages/basic-modules/src/modules/text-style/custom-types.ts)
- [Font color and background color](https://github.com/wangeditor-team/wangEditor-v5/blob/main/packages/basic-modules/src/modules/color/custom-types.ts)
- [Paragraph](https://github.com/wangeditor-team/wangEditor-v5/blob/main/packages/basic-modules/src/modules/paragraph/custom-types.ts)
- [Line height](https://github.com/wangeditor-team/wangEditor-v5/blob/main/packages/basic-modules/src/modules/line-height/custom-types.ts)
- [Font size and family](https://github.com/wangeditor-team/wangEditor-v5/blob/main/packages/basic-modules/src/modules/font-size-family/custom-types.ts)
- [Justify](https://github.com/wangeditor-team/wangEditor-v5/blob/main/packages/basic-modules/src/modules/justify/custom-types.ts)
- [indent](https://github.com/wangeditor-team/wangEditor-v5/blob/main/packages/basic-modules/src/modules/indent/custom-types.ts)
- [Link](https://github.com/wangeditor-team/wangEditor-v5/blob/main/packages/basic-modules/src/modules/link/custom-types.ts)
- [Header](https://github.com/wangeditor-team/wangEditor-v5/blob/main/packages/basic-modules/src/modules/header/custom-types.ts)
- [Blockquote](https://github.com/wangeditor-team/wangEditor-v5/blob/main/packages/basic-modules/src/modules/blockquote/custom-types.ts)
- [Image](https://github.com/wangeditor-team/wangEditor-v5/blob/main/packages/basic-modules/src/modules/image/custom-types.ts)
- [Split line](https://github.com/wangeditor-team/wangEditor-v5/blob/main/packages/basic-modules/src/modules/divider/custom-types.ts)
- [Code block](https://github.com/wangeditor-team/wangEditor-v5/blob/main/packages/basic-modules/src/modules/code-block/custom-types.ts)
- [List](https://github.com/wangeditor-team/wangEditor-v5/blob/main/packages/list-module/src/module/custom-types.ts)
- [Table](https://github.com/wangeditor-team/wangEditor-v5/blob/main/packages/table-module/src/module/custom-types.ts)
- [Video](https://github.com/wangeditor-team/wangEditor-v5/blob/main/packages/video-module/src/module/custom-types.ts)

