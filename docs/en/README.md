---
home: true
heroImage: null
heroText: wangEditor
tagline: Open source web rich text editor, run right out of the box, config simply.
actions:
  - text: Getting started
    link: /en/guide/getting-started.html
    type: primary
  - text: demo
    link: https://www.wangeditor.com/demo/index.html?lang=en
    type: secondary
features:
- title: Easy to use
  details: Quick use, easy config, few codes will create an editor. Integrate all basic functions, No need to secondary develop.
- title: Support JS Vue React
  details: Independent of any third-party frameworks, you can use it in jQuery, Vue, React. We supply official Vue React components.
- title: Closed 4000+ issues
  details: wangEditor open source for many years, many users committed many issues. We have closed 4000+ Github issues and will go on.
footer: Copyright © 2017-present wangeditor.com
---

### Easy usage

You can create a fully functional rich-text editor with 10 lines of code. See [demo](https://www.wangeditor.com/demo/index.html?lang=en).
You can use [official component](/v5/en/guide/for-frame.html) in Vue or React.

![](/image/editor-en.png)

```js
import '@wangeditor/editor/dist/css/style.css'
import { createEditor, createToolbar } from '@wangeditor/editor'

// Create editor
const editor = createEditor({
  selector: '#editor-container'
})
// Create toolbar
const toolbar = createToolbar({
  editor,
  selector: '#toolbar-container'
})
```

### Compatibility

- Support most PC browsers, like Chrome, Firefox, Safari, Edge
- Not support mobile editing at the moment (Support mobile viewing)
- **No longer support IE browser**

### Communication

- [Commit an issue]((https://github.com/wangeditor-team/wangEditor-v5/issues))
