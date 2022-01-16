# Store and Display

Editor's use cases are:
- New a doc, editor content is empty
- Type or paste your text or images, save content, close the editor
- Edit doc content, save content, close the editor
- Display doc content ( Only view, no editor )

![](/image/store-display-en.png)

This article will introduce how to save and display your content.

## Store

There are three methods, you can choose one according to your needs.

### 1. Save Content and Html

```js
const editor = createEditor({ ... })

// You can use <textarea> to submit form, see <Getting started> article

// click save button
$('#button-save').on('click', () => {
    // 1. get editor's content and html
    const contentStr = JSON.stringify(editor.children)
    const html  = editor.getHtml()

    // 2. commit `contentStr` and `html` to web server, by yourself

    // PS: Splicing `contentStr` and `html`, and commit to server in one time, can ensure data synchronization
})
```

![](/image/store-display-1-en.png)

#### Usage

- Use `content` to edit
- Use `html` to display

#### Analyse

- Advantage: simple
- Weakness: redundant data ( `content` and `html` are some data, only different format )

#### Recommendation

- Front-end render. Require minimum html code volume, like mobile h5 page.
- Server render, not nodejs but other language ( Java C# ... ).

### 2. Only Save Content

```js
const editor = createEditor({ ... })

// You can use <textarea> to submit form, see <Getting started> article

// click save button
$('#button-save').on('click', () => {
    const content = editor.children 
    // commit content to server and store
})
```

![](/image/store-display-2-en.png)

#### Usage

- Use `content` to edit
- Convert `content` to html (see following...), and display

#### Analyse

- Advantage: no redundant data
- Weakness: Only nodejs SSR or front-end render

#### Recommendation

- Nodejs SSR
- Front-end render, do not care about html code volume
- SPA, includes edit page and display page

### 3. Only Save Html

```js
const editor = createEditor({ ... })

// You can use <textarea> to submit form, see <Getting started> article

// click save button
$('#button-save').on('click', () => {
    const html  = editor.getHtml()
    // commit html to server, and store
})
```

- Use html to display
- Only save html, no content, you can not edit again!

## Display

### Output Html

If you saved html, just output html.

### Convert Content to Html

You can convert content to html in browser and nodejs SSR.

If in nodejs, you should exec `yarn add jsdom global-jsdom` firstly, then `require('global-jsdom/register')` in front of the below codes.

```js
// 1. get `content` from your server or database

// 2. create an editor by `content`
const editor = createEditor({ content })

// 3. get then editor's html or text
const html = editor.getHtml()
const text = editor.getText()

// 4. render html or text in your page
```

### Add CSS Style

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

### Code Highlight

You can use [Prism.js](https://prismjs.com/) to highlight code block.

If you type a code block `const a = 100` in editor, select `javascript` language, editor will output html like this format.

```html
<!-- Prism's format -->
<pre>
    <code class="language-javascript"> const a = 100; </code>
</pre>
```

:::tip
If you use front-end render, you should exec `Prism.highlightAll()` when DOM loaded.
:::
