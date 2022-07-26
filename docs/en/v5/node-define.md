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
- Create an editor and run in browser, or use [demo](https://www.wangeditor.com/demo/index.html?lang=en)
- Do something, like: bold, set color, set header ...
- Run `editor.children` in browser's console

For example, you type some text, set a header or list, run `editor.children` then you can see it's structure

![](/image/数据结构-1-en.png)

Set line height and text style, run `editor.children` then you can see it's structure

![](/image/数据结构-2-en.png)

## Text Node

A text node **must have a `text` prop**, like `{ text: 'hello' }` . You can extend custom props, for instance bold text can be `{ text: 'hello', bold: true }` .

Text node is leaf node, it **can not have `children` prop**.

## Element Node

An element node **must have two props `type` and `children`** , like `{ type: 'header1', children: [ { text: 'hello' } ] }` . You can extend custom props, for instance `{ type: 'header1', textAlign: 'center', children: [ { text: 'hello' } ] }` .

## Inline Element

By default, an element node is **block** style, like `<div>` in HTML. But we want some elements are **inline** style, like `<img>` `<a>` .

We can define an element node as `inline` by **rewrite editor `isInline` API**, see link element [plugin source code](https://github.com/wangeditor-team/wangEditor/blob/master/packages/basic-modules/src/modules/link/plugin.ts).

## Void Element

By default, an element node is not void node, it can have children. But we want some elements ar `void` node, like `<img>` `<video>` .

We can define an element node as `void` by **rewrite editor `isVoid` API**, see image element [plugin source code](https://github.com/wangeditor-team/wangEditor/blob/master/packages/basic-modules/src/modules/image/plugin.ts).

Void element must have a `children` prop, which involve an empty text node. A image element is like:

```js
{
    type: 'image',
    // other props ...
    children: [{ text: '' }] // A void element must have a children props, which involve an empty text node.
}
```

## All Nodes Structure

See `type` in every source code.

- [Text style](https://github.com/wangeditor-team/wangEditor/blob/master/packages/basic-modules/src/modules/text-style/custom-types.ts) - Extend text node props
- [Font color and background color](https://github.com/wangeditor-team/wangEditor/blob/master/packages/basic-modules/src/modules/color/custom-types.ts) - Extend text node props
- [Paragraph](https://github.com/wangeditor-team/wangEditor/blob/master/packages/basic-modules/src/modules/paragraph/custom-types.ts) - Define element node
- [Line height](https://github.com/wangeditor-team/wangEditor/blob/master/packages/basic-modules/src/modules/line-height/custom-types.ts) - Extend element node props
- [Font size and family](https://github.com/wangeditor-team/wangEditor/blob/master/packages/basic-modules/src/modules/font-size-family/custom-types.ts) - Extend text node props
- [Justify](https://github.com/wangeditor-team/wangEditor/blob/master/packages/basic-modules/src/modules/justify/custom-types.ts) - Extend element node props
- [indent](https://github.com/wangeditor-team/wangEditor/blob/master/packages/basic-modules/src/modules/indent/custom-types.ts) - Extend element node props
- [Link](https://github.com/wangeditor-team/wangEditor/blob/master/packages/basic-modules/src/modules/link/custom-types.ts) - Define **inline** element
- [Header](https://github.com/wangeditor-team/wangEditor/blob/master/packages/basic-modules/src/modules/header/custom-types.ts) - Define element node
- [Blockquote](https://github.com/wangeditor-team/wangEditor/blob/master/packages/basic-modules/src/modules/blockquote/custom-types.ts) - Define element node
- [Image](https://github.com/wangeditor-team/wangEditor/blob/master/packages/basic-modules/src/modules/image/custom-types.ts) - Define **inline and void** element
- [Split line](https://github.com/wangeditor-team/wangEditor/blob/master/packages/basic-modules/src/modules/divider/custom-types.ts) - Define **void** element
- [Code block](https://github.com/wangeditor-team/wangEditor/blob/master/packages/basic-modules/src/modules/code-block/custom-types.ts) - Define element node
- [List](https://github.com/wangeditor-team/wangEditor/blob/master/packages/list-module/src/module/custom-types.ts) - Define element node
- [Table](https://github.com/wangeditor-team/wangEditor/blob/master/packages/table-module/src/module/custom-types.ts) - Define element node
- [Video](https://github.com/wangeditor-team/wangEditor/blob/master/packages/video-module/src/module/custom-types.ts) - Define **void** element

