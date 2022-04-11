# 内容处理

## 获取内容

### 获取 HTML 和 Text

使用 `editor.getHtml()` 获取 HTML 内容。使用 `editor.getText()` 获取纯文本内容。

推荐使用 HTML 格式存储数据。

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

编辑器输出或者生成的 HTML 都是**纯标签**，没有内联样式。所以，显示 HTML 时需要你自定义样式。可参考以下示例
- [显示 HTML](https://www.wangeditor.com/demo/get-html.html)
- [自定义样式](https://www.wangeditor.com/demo/css/view.css)

另外，**代码高亮**也需要自行处理，推荐使用 [Prism.js](https://prismjs.com/) ，因为编辑器内容内部也是基于 Prism.js 来实现的。可参考 [demo](https://www.wangeditor.com/demo/code-highlight.html)。

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

### Ajax 异步设置内容

可等待 Ajax 返回之后再创建编辑器。

```ts
// 伪代码
import { IDomEditor } from '@wangeditor/editor'

let editor: IDomEditor | null = null

ajax(url, res => {
  editor = createEditor({
    // content 或 html
    // 其他属性
  })
})
```

::: tip
其他的内容处理，可参考 [API](./API.html)
:::
