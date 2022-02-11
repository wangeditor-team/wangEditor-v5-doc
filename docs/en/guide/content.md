# Content

## Get Content

### Get HTML and Text

Use `editor.getHtml()` to get HTML content. Use `editor.getText()` to get text content.

### Get JSON

Use `editor.children` to get JSON content.

You can convert JSON to HTML or text format in browser and nodejs.<br>
If in nodejs, you should exec `yarn add jsdom global-jsdom` firstly, then `require('global-jsdom/register')` in front of the below codes.

```js
const editor = createEditor({ content }) // `content` is JSON content
const html = editor.getHtml()
const text = editor.getText()
```

### Custom Style

The html is clean, only has tag, but no style. You may define some style like:

```css
p, li, td, th, blockquote {
    white-space: pre-wrap; /* Show space */
}

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

/* code block */
pre>code {
    display: block;
    border: 1px solid hsl(0, 0%, 91%);
    border-radius: 4px 4px;
    text-indent: 0;
    background-color: #fafafa;
    padding: 10px;
    font-size: 14px;
}

blockquote {
    display: block;
    border-left: 8px solid #d0e5f2;
    padding: 10px 10px;
    margin: 10px 0;
    background-color: #f1f1f1;
}

/* list */
ul, ol {
  margin: 10px 0 10px 20px;
}

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

PS: You should use [Prism.js](https://prismjs.com/) to highlight code block by yourself.

## Set Content

You can set your custom content when creating an editor.

### Set HTML

<b style="color: red;">Be careful: wangEditor can only understand the HTML format from `editor.getHtml()`, but not all HTML formats.</b>

For instance, wangEditor can understand `<strong>hello</strong>`, but can not understand `<span style="font-weight:bold;"></span>`.

```js
const editor = createEditor({
  html: '<p>hello <strong>world</strong></p>', // html content, got from `editor.getHtml()`
  // other props ...
})
```

### Set Text

```js
// 1. Convert text to HTML format
const text = '...' // text content
const html = text.split(/\n/).map(line => `<p>${line}</p>`).join('\n')

// 2. set HTML
const editor = createEditor({
  html,
  // other props ...
})
```

### Set JSON

```js
const editor = createEditor({
  content: [...], // JSON content, got from `editor.children`
  // other props ...
})
```

### Ajax async set content

You can create editor after ajax success callback.

```js
// pseudo code
import { IDomEditor } from '@wangeditor/editor'

let editor: IDomEditor | null = null

ajax(url, res => {
  editor = createEditor({
    // content or html
    // other props...
  })
})
```

::: tip
Goto [API](./API.html) to checkout more content APIs.
:::
