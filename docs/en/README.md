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
    link: https://www.wangeditor.com/demo/en/
    type: secondary
features:
- title: Free and open source
  details: The basic version will always be free and open source. 
- title: Easy to use
  details: Quick use, easy config, few codes will create an editor. Integrate all basic functions, No need to secondary develop.
- title: Independent frameworks
  details: Independent of any third-party frameworks, you can use it in jQuery, Vue, React.
- title: Closed 4000+ issues
  details: wangEditor open source for many years, many users committed many issues. We have closed 4000+ Github issues and will go on.
- title: Timely feedback
  details: Welcome to commit issues on Github, we will reply timely.
- title: We are a team
  details: Not only the author but there are also many coders to dev functions and fix bugs. Ensure continuous upgrading.
footer: Copyright © 2017-present wangeditor.com
---

### Easy usage

You can create a fully functional rich-text editor with 10 lines of code. See [demo](https://www.wangeditor.com/demo/en/).

![](/v5/image/editor-en.png)

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
- Not support mobile browsers at the moment
- **No longer support IE browser**

### Communication

- [Commit an issue]((https://github.com/wangeditor-team/wangEditor-v5/issues))

### Team

- [Team members](https://github.com/wangeditor-team/wangEditor-v5/graphs/contributors)
