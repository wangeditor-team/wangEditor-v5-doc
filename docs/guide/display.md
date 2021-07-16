# 存储和显示

关于编辑器，最基本的使用场景如下：

- 新建一个文档（此时编辑器内容为空）
- 输入内容，保存文档，关闭编辑器
- 再次编辑文档，修改内容，保存，关闭编辑器
- 查看文档内容（此时只查看，用不到编辑器）

本文就解决这些场景中的所有问题。

## 存储内容到服务器

```js
const editor = wangEditor.createEditor({ ... })

// 也可以通过 onChange 把 content html 实时同步到 textarea ，再保存

// 点击保存按钮
$('#button-save').on('click', () => {
    const content = editor.children 
    // 存储 content 到服务器，自行实现

    const html  = editor.getHtml()
    // 存储 html 到服务器，自行实现
})
```

有三种形式可供选择。

### 1.同时存储 content 和 html

- 再次编辑文档时，使用 content
- 显示文档内容时，使用 html

### 2.只存储 content

- 再次编辑文档时，使用 content
- 显示文档内容时，**将 content 转换为 html** （下文有介绍）

:::tip
如果你使用 nodejs SSR 服务端渲染，推荐这个形式
:::

### 3.只存储 html

- **无法再次编辑文档，请考虑清楚！！！**
- 显示文档内容时，使用 html

## 显示内容

### 直接显示 html

如果你存储了 html ，直接将 html 输出到页面显示即可。

【注意】继续参考下文，需要为 html 增加一些样式。

### content 转换为 html

如果你没有存储 html ，只存储了 content ，可以通过以下方式将 content 转换为 html 。

支持浏览器，**也支持 nodejs**（所以可以用于 nodejs SSR 服务端渲染）

```js
// 自己从服务端或这数据库获取 content
const content = await getContentFromDatabaseOrServer()

// 创建编辑器，只传入 content 即可
const editor = wangEditor.createEditor({ content })

const html = editor.getHtml()
const text = editor.getText()

// 将 html 或者 text 渲染到页面
```

【注意】继续参考下文，需要为 html 增加一些样式。

### 增加样式

编辑器输出或者生成的 html 都是纯标签，直接输出显示看起来会和编辑器的不一样。<br>
所以，需要在显示时，对 html 增加一些样式。

以下是几个最常见的样式，作为参考。你可以再自己修改，也据此实现“多皮肤”功能。

```css
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
```

### 代码高亮

代码高亮推荐使用 [Prism.js](https://prismjs.com/) ，因为编辑器内容内部也是基于 Prism.js 来实现的。

如果在编辑器中添加代码块 `const a = 100;` ，并选择语言 `javascript` 。输出的 html 好符合 Prism.js 规定的 html 格式。

```html
<pre>
    <code class="language-javascript"> const a = 100; </code>
</pre>
```

使用 Prism.js 可以参考 [demo](/demo.html) 。

:::tip
如果是前端异步渲染（非 SSR 渲染），待渲染完毕需要执行 `Prism.highlightAll()` 来触发高亮。
:::
