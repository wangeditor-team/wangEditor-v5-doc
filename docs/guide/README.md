# 介绍

争做国内最好的开源 Web 富文本编辑器！

## 是什么

wangEditor 是一个 Web 富文本编辑器，用于网页内容输入，如论坛、博客、邮箱、在线文档等。<br>
它从 2015 年开源，至今已发布到 V5 版本。

它已封装了最常用的富文本功能，如标题、文本格式、段落格式、链接、图片、表格、视频等。<br>
具体操作可直接查看 [demo](/demo.html) 。

![editor](/image/editor.png)

## 兼容性

- 兼容主流的 PC 浏览器，如 Chrome Firefox Safari Edge 等
- 暂不支持移动端（尚在规划中～）
- **不再支持 IE 浏览器**

## 其他富文本编辑器的问题

网络搜索“Web 富文本编辑器”你会得到很多结果，例如国内的 UEditor kindEditor ，国外的 CKEditor TinyMCE Quill ProseMirror Draft Slate 等等。也有很多人使用这些编辑器，或者来做二次开发。

但他们都存在下面几个问题（敲黑板～），这可能会大大影响你的**开发效率、开发成本和产品稳定性**。

### 技术老旧

如 UEditor KindEditor ，依然使用 `document.execCommand` API 。这将大大影响产品的稳定性、扩展性。

到时候啥啥都实现不了，哪儿哪儿都有问题，会被 PM 鄙视：“人家 xxx 咋能行？”

### 中文不友好

如 CKEditor TinyMCE Quill 等，没有官方的中文文档。这将大大影响你的开发效率（今晚加班～）

PS：英语特别的，请略过。

### 需要大量二次开发

如 ProseMirror Draft Slate ，他们虽然也是富文本编辑器，但他们仅仅是一个 core 或者 controller ，并不是一个完整的功能。

大量的二次开发，不仅仅会导致研发成本大增（本月封闭～），还可能因为测试不完善而出现无尽的 bug ，陷入泥潭。

PS：除非你们有强烈的定制开发需要。

### 新产品尚未稳定

上述列出来的编辑器，都是比较成熟的产品，用户量较大。你可能还会搜到其他产品，如新开发的、用户量不大的。<br>
无论如何，请你慎重选择，因为富文本编辑器的坑真的太多了，需要经过大量的测试、使用才会慢慢稳定。

选择稳定的产品，可参考
- github stars
- npm 下载量
- npm 发布时间和频率
- 搜索引擎的相关结果数量
- 是否有大厂背书
- 是否有单元测试 / e2e 测试

## wangEditor 的优势

一个产品的价值，就在于解决用户的问题，提高效率、降低成本、增加稳定性和扩展性。

wangEditor 不是为了做而做，也不是单纯的模仿谁，而是经过上述问题分析之后，给出一个系统的解决方案。旨在真正去解决用户的问题，产出自己的价值。

### 使用主流技术

wangEditor 从 V5 版本开始，有较大的技术更新。

#### 1. 升级为 L1 能力

弃用了 `document.execCommand` API ，使用 [slate.js](https://www.slatejs.org/)（但不依赖 React）为内核，升级为 L1 能力。

这也是目前主流富文本编辑器的技术方案，如知名的 Quill ProseMirror Draft 都在使用。

#### 2. 使用 vdom

使用 vdom 技术（基于 [snabbdom.js](https://github.com/snabbdom/snabbdom) ）做视图更新，model 和 view 分离，增加稳定性。

#### 3. 扩展性

使用扩展插件和模块的机制，保证**扩展性**。未来还会继续扩展更多功能。 

其实，现在 wangEditor 内置的各个功能，也都是通过扩展插件和模块的形式搭建起来的。

### 中文文档

wangEditor 有详细的中文文档，以及中文交流环境。因为[作者](https://github.com/wangfupeng1988)就是国内程序员。

### 及时反馈和沟通

可以加入 QQ 群，与其他用户、团队成员一起沟通问题。

也可以去 github 提交 issue ，团队都会及时反馈或受理。

### 集成所有功能，无需二次开发

wangEditor 内置了所有常见的富文本操作功能，能满足绝大部分使用需求。直接配置使用即可，无需再二次开发。

```js
// wangEditor 已内置 50+ 菜单
editor.getAllMenuKeys()

[
    "bold","underline","italic","through","code","clearStyle","headerSelect","header1","header2","header3",
    "color","bgColor","insertLink","updateLink","unLink","viewLink","insertImage","deleteImage","editImage",
    "viewImageLink","imageWidth30","imageWidth50","imageWidth100","blockquote","emotion","fontSize","fontFamily",
    "indent","delIndent","justifyLeft","justifyRight","justifyCenter","lineHeight","redo","undo","divider","codeBlock",
    "bulletedList","numberedList","insertTable","deleteTable","insertTableRow","deleteTableRow","insertTableCol",
    "deleteTableCol","tableHeader","tableFullWidth","insertVideo","deleteVideo","uploadImage","codeSelectLang"
]
```

PS：同时，wangEditor 有足够的扩展性，允许你自己开发菜单、模块、插件等。

### 踩过 4000 个坑

wangEditor 开源多年，大量用户使用和反馈，已经解决了[很多问题](https://github.com/wangeditor-team/wangEditor/issues)。在 V5 版本测试过程中，也这些问题进行了重复测试，最大程度保证稳定性。

### 团队作业，持续迭代升级

wangEditor 早已不是作者单人作战，我们有多人团队，一起修复 bug 、升级功能、跟踪问题、社区答疑。

## 团队

### 成员

- a
- b
- c

### 申请加入

加入 QQ 群，然后私聊群主即可。

加入团队的条件：
- 熟悉 [slate.js](https://www.slatejs.org/)
- 熟悉 vdom ，了解 [snabbdom.js](https://github.com/snabbdom/snabbdom)
- 熟悉 Vue 或 React
- 熟悉 webpack rollup 配置
