# 内容处理

## 获取内容

### 获取 HTML 和 Text

使用 `editor.getHtml()` 获取 HTML 内容。使用 `editor.getText()` 获取纯文本内容。

### 获取 JSON

使用 `editor.children` 获取 JSON 内容。

JSON 格式可以转换为 HTML 和 Text 格式，支持浏览器和 nodejs 。
如果是在 nodejs 中，需要安装 `yarn add jsdom global-jsdom` ，并且引入 `require('global-jsdom/register')`。

```js
const editor = createEditor({ content }) // `content` 即为 JSON 内容
const html = editor.getHtml()
const text = editor.getText()
```

### 自定义样式

编辑器输出或者生成的 html 都是纯标签，直接输出显示看起来会和编辑器的不一样。<br>
所以，需要在显示时，对 html 增加一些样式。

以下是几个最常见的样式，作为参考。你可以再自己修改，也据此实现“多皮肤”功能。

```css
p, li, td, th, blockquote {
    white-space: pre-wrap; /* 显示空格 */
}

/* 表格 */
table {
    border-collapse: collapse;
}
table th,
table td {
    border: 1px solid #ccc;
    min-width: 50px;
    height: 20px;
    text-align: left;
}
table th {
    background-color: #f1f1f1;
    text-align: center
}

/* 代码块 */
pre>code {
    display: block;
    border: 1px solid hsl(0, 0%, 91%);
    border-radius: 4px 4px;
    text-indent: 0;
    background-color: #fafafa;
    padding: 10px;
    font-size: 14px;
}

/* 引用 */
blockquote {
    display: block;
    border-left: 8px solid #d0e5f2;
    padding: 10px 10px;
    margin: 10px 0;
    background-color: #f1f1f1;
}

/* 列表 */
ul, ol {
  margin: 10px 0 10px 20px;
}

/* 分割线 */
hr {
    display: block;
    width: 90%;
    margin: 20px auto;
    border: 0;
    height: 1px;
    background-color: #ccc;
}

img {
    max-width: 100%;
}
```

另外，代码高亮也需要自行处理，推荐使用 [Prism.js](https://prismjs.com/) ，因为编辑器内容内部也是基于 Prism.js 来实现的。

## 设置内容

创建编辑器时，传入的默认内容。即编辑器创建完成后，立马显示这些内容。

### 设置 HTML

<b style="color: red;">【注意】这里的 `html` 内容必须是 wangEditor 生成的 HTML 格式，不可以自己随意写</b>。HTML 格式非常灵活，wangEditor 无法兼容所有的 HTML 格式。

例如，wangEditor 可以识别 `<strong>hello</strong>` 为加粗，但无法识别 `<span style="font-weight: bold;">hello</span>` 等其他加粗方式。

```js
const editor = createEditor({
  html: '<p>hello <strong>world</strong></p>', // 从 editor.getHtml() 获取的 html 内容
  // 其他属性...
})
```

### 设置 Text

```js
// 1. 把 text 转换为 html
const text = '...' // text 内容
const html = text.split(/\n/).map(line => `<p>${line}</p>`).join('\n')

// 2. 设置 html
const editor = createEditor({
  html,
  // 其他属性...
})
```

### 设置 JSON

```js
const editor = createEditor({
  content: [...], // editor.children 获取的内容
  // 其他属性
})
```

::: tip
其他的内容处理，可参考 [API](./API.html)
:::
