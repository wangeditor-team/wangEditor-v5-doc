# 菜单配置

本文是各个菜单项的详细配置。如想要自定义工具栏的菜单（隐藏某些菜单、排序、分组等），请参考[工具栏配置](/v5/guide/toolbar-config.html)。

## 通用方法

### 确定 menu key

要配置哪个菜单，首先要知道这个菜单的 key 。执行 `editor.getAllMenuKeys()` 可获取编辑器所有菜单，从中找到自己想要的菜单 key 即可。

### 获取菜单的默认配置

找到菜单 key 之后，可以先看看菜单的当前配置，再自行修改。

```ts
editor.getMenuConfig('uploadImage') // 获取 uploadImage 的当前配置
```

### 修改配置

```ts
import { IEditorConfig, createEditor, createToolbar } from '@wangeditor/editor'

const editorConfig: Partial<IEditorConfig> = { MENU_CONF: {} } // 初始化 MENU_CONF 属性

// 修改 uploadImage 菜单配置
editorConfig.MENU_CONF['uploadImage'] = {
    server: '/api/upload-image',
    fieldName: 'custom-field-name'
    // 继续写其他配置...
    
    //【注意】不需要修改的不用写，wangEditor 会去 merge 当前其他配置
}

// 修改 otherMenuKey 菜单配置
editorConfig.MENU_CONF['otherMenuKey'] = {
    // 配置
}

// 创建编辑器
const editor = createEditor({
  selector: '#editor-container',
  config: editorConfig,
  content: [],
  mode: 'default'
})

// 创建菜单栏
const toolbar = createToolbar({...})
```

:::tip
请一定在 `createEditor` 之前完成菜单配置的修改，否则可能无效。
:::

## 颜色

```ts
const editorConfig: Partial<IEditorConfig> = { MENU_CONF: {} }

// 文字颜色
editorConfig.MENU_CONF['color'] = {
    colors: ['#000', '#333', '#666']
}

// 背景色
editorConfig.MENU_CONF['bgColor'] = {
    colors: ['#000', '#333', '#666']
}

// 执行 createEditor
```

## 字号

```ts
const editorConfig: Partial<IEditorConfig> = { MENU_CONF: {} }

editorConfig.MENU_CONF['fontSize'] = {
    fontSizeList: ['12px', '16px', '24px', '40px']
}

// 执行 createEditor
```

## 字体

:::tip
请注意，某些字体不能商用。具体请自行查找。
:::

```ts
const editorConfig: Partial<IEditorConfig> = { MENU_CONF: {} }

editorConfig.MENU_CONF['fontFamily'] = {
    fontFamilyList: [
        // 元素支持两种形式
        //   1. 字符串；
        //   2. { name: 'xxx', value: 'xxx' }

        '黑体',
        '楷体',
        { name: '仿宋', value: '仿宋' },
        'Arial',
        'Tahoma',
        'Verdana'
    ]
}

// 执行 createEditor
```

## 行高

```ts
const editorConfig: Partial<IEditorConfig> = { MENU_CONF: {} }

editorConfig.MENU_CONF['lineHeight'] = {
    lineHeightList: ['1', '1.5', '2', '2.5']
}

// 执行 createEditor
```

## 表情

```ts
const editorConfig: Partial<IEditorConfig> = { MENU_CONF: {} }

editorConfig.MENU_CONF['emotion'] = {
    emotions: '😀 😃 😄 😁 😆 😅 😂 🤣 😊 😇 🙂 🙃 😉'.split(' ') // 数组
}

// 执行 createEditor
```


## 链接

- `checkLink` 校验链接
- `parseLinkUrl` 转换链接 url

```ts
// 自定义校验链接
function customCheckLinkFn(text: string, url: string): string | boolean | undefined {
    if (!url) {
        return
    }
    if (url.indexOf('http') !== 0) {
        return '链接必须以 http/https 开头'
    }
    return true

    // 返回值有三种选择：
    // 1. 返回 true ，说明检查通过，编辑器将正常插入链接
    // 2. 返回一个字符串，说明检查未通过，编辑器会阻止插入。会 alert 出错误信息（即返回的字符串）
    // 3. 返回 undefined（即没有任何返回），说明检查未通过，编辑器会阻止插入。但不会提示任何信息
}

// 自定义转换链接 url
function customParseLinkUrl(url: string): string {
    if (url.indexOf('http') !== 0) {
        return `http://${url}`
    }
    return url
}

const editorConfig: Partial<IEditorConfig> = { MENU_CONF: {} }

// 插入链接
editorConfig.MENU_CONF['insertLink'] = {
    checkLink: customCheckLinkFn, // 也支持 async 函数
    parseLinkUrl: customParseLinkUrl, // 也支持 async 函数
}
// 更新链接
editorConfig.MENU_CONF['editLink'] = {
    checkLink: customCheckLinkFn, // 也支持 async 函数
    parseLinkUrl: customParseLinkUrl, // 也支持 async 函数
}

// 执行 createEditor
```

## 图片

如果用于 Typescript ，需定义图片元素类型。可单独放在 `.d.ts` 中定义。

```ts
import { SlateElement } from '@wangeditor/editor'

type ImageElement = SlateElement & {
    src: string
    alt: string
    url: string
    href: string
}
```

图片菜单的配置
- `onInsertedImage` 插入图片之后的回调
- `onUpdatedImage` 更新图片之后的回调
- `checkImage` 校验图片链接
- `parseImageSrc` 转换图片链接

```ts
// 自定义校验图片
function customCheckImageFn(src: string, alt: string, url: string): boolean | undefined | string {
    if (!src) {
        return
    }
    if (src.indexOf('http') !== 0) {
        return '图片网址必须以 http/https 开头'
    }
    return true

    // 返回值有三种选择：
    // 1. 返回 true ，说明检查通过，编辑器将正常插入图片
    // 2. 返回一个字符串，说明检查未通过，编辑器会阻止插入。会 alert 出错误信息（即返回的字符串）
    // 3. 返回 undefined（即没有任何返回），说明检查未通过，编辑器会阻止插入。但不会提示任何信息
}

// 转换图片链接
function customParseImageSrc(src: string): string {
    if (src.indexOf('http') !== 0) {
        return `http://${src}`
    }
    return src
}

const editorConfig: Partial<IEditorConfig> = { MENU_CONF: {} }

// 插入图片
editorConfig.MENU_CONF['insertImage'] = {
    onInsertedImage(imageNode: ImageElement | null) {
        if (imageNode == null) return

        const { src, alt, url, href } = imageNode
        console.log('inserted image', src, alt, url, href)
    },
    checkImage: customCheckImageFn, // 也支持 async 函数
    parseImageSrc: customParseImageSrc, // 也支持 async 函数
}
// 编辑图片
editorConfig.MENU_CONF['editImage'] = {
    onUpdatedImage(imageNode: ImageElement | null) {
        if (imageNode == null) return

        const { src, alt, url } = imageNode
        console.log('updated image', src, alt, url)
    },
    checkImage: customCheckImageFn, // 也支持 async 函数
    parseImageSrc: customParseImageSrc, // 也支持 async 函数
}

// 执行 createEditor
```

## 上传图片

上传图片的配置比较复杂，拆分为几个部分来讲解。

```ts{4}
const editorConfig: Partial<IEditorConfig> = { MENU_CONF: {} }

editorConfig.MENU_CONF['uploadImage'] = {
    // 上传图片的配置
}

// 执行 createEditor
```

### 服务端地址

**必填**，否则上传图片会报错。

```ts
editorConfig.MENU_CONF['uploadImage'] = {
     server: '/api/upload',
}
```

**【特别注意】服务端 response body 格式要求如下：**<br>
上传成功的返回格式：

```ts
{
    "errno": 0, // 注意：值是数字，不能是字符串
    "data": {
        "url": "xxx", // 图片 src ，必须
        "alt": "yyy", // 图片描述文字，非必须
        "href": "zzz" // 图片的链接，非必须
    }
}
```

上传失败的返回格式：

```ts
{
    "errno": 1, // 只要不等于 0 就行
    "message": '失败信息'
}
```

:::tip
如果你的服务端 response body 无法按照上述格式，可以使用下文的 `customInsert`
:::


### 基本配置

```ts
editorConfig.MENU_CONF['uploadImage'] = {
    // form-data fieldName ，默认值 'wangeditor-uploaded-file'
    fieldName: 'your-custom-name',

    // 单个文件的最大体积限制，默认为 2M
    maxFileSize: 1 * 1024 * 1024, // 1M

    // 最多可上传几个文件，默认为 100
    maxNumberOfFiles: 10,

    // 选择文件时的类型限制，默认为 ['image/*'] 。如不想限制，则设置为 []
    allowedFileTypes: ['image/*'],

    // 自定义上传参数，例如传递验证的 token 等。参数会被添加到 formData 中，一起上传到服务端。
    meta: {
        token: 'xxx',
        otherKey: 'yyy'
    },

    // 将 meta 拼接到 url 参数中，默认 false
    metaWithUrl: false,

    // 自定义增加 http  header
    headers: {
        Accept: 'text/x-json',
        otherKey: 'xxx'
    },

    // 跨域是否传递 cookie ，默认为 false
    withCredentials: true,

    // 超时时间，默认为 10 秒
    timeout: 5 * 1000, // 5 秒

    // 小于该值就插入 base64 格式（而不上传），默认为 0
    base64LimitSize: 5 * 1024 // 5kb
}
```

### 回调函数

```ts
editorConfig.MENU_CONF['uploadImage'] = {
    // 上传之前触发
    onBeforeUpload(files) {
        // files 选中的文件列表，格式如 { key1: file1, key2: file2 }
        return files

        // 返回值可选择：
        // 1. 返回一个对象（files 或者 files 的一部分），则将上传返回结果中的文件
        // 2. 返回 false ，终止上传
    },
    // 上传进度的回调函数
    onProgress(progress: number) {
        // progress 是 0-100 的数字
        console.log('progress', progress)
    },
    // 单个文件上传成功之后
    onSuccess(file: File, res: any) {
        console.log(`${file.name} 上传成功`, res)
    },
    // 单个文件上传失败
    onFailed(file: File, res: any) {
        console.log(`${file.name} 上传失败`, res)
    },
    // 上传错误，或者触发 timeout 超时
    onError(file: File, err: any, res: any) {
        console.log(`${file.name} 上传出错`, err, res)
    },
}
```

### 自定义功能

如果用于 Typescript ，则要定义插入函数的类型。

```ts
type InsertFnType = (url: string, alt: string, href: string) => void
```

#### 自定义插入

如果你的服务端 response body 无法按照上文规定的格式，则无法插入图片，提示失败。<br>
但你可以使用 `customInsert` 来自定义插入图片。

```ts
editorConfig.MENU_CONF['uploadImage'] = {
    // 自定义插入图片
    customInsert(res: any, insertFn: InsertFnType) {
        // res 即服务端的返回结果

        // 从 res 中找到 url alt href ，然后插图图片
        insertFn(url, alt, href)
    },
}
```

#### 自定义上传

如果你不想使用 wangEditor 自带的上传功能，例如你要上传到阿里云 OSS 。<br>
可以通过 `customUpload` 来自定义上传。

```ts
editorConfig.MENU_CONF['uploadImage'] = {
    // 自定义上传
    async customUpload(file: File, insertFn: InsertFnType) {
        // file 即选中的文件
        // 自己实现上传，并得到图片 url alt href
        // 最后插入图片
        insertFn(url, alt, href)
    }
}
```

#### 自定义选择图片

如果你不想使用 wangEditor 自带的选择文件功能，例如你有自己的图床，或者图片选择器。<br>
可以通过 `customBrowseAndUpload` 来自己实现选择图片、上传图片，并插入图片。

```ts
editorConfig.MENU_CONF['uploadImage'] = {
    // 自定义选择图片
    customBrowseAndUpload(insertFn: InsertFnType) {
        // 自己选择文件
        // 自己上传文件，并得到图片 url alt href
        // 最后插入图片
        insertFn(url, alt, href)
    }
}
```

### 获取已删除的图片

这是一个常见的需求。<br>
上传图片到编辑器，然后又把图片删除了。此时你可能想要拿到这张删除的图片，在服务器也把图片文件删了。

- 使用 [onInsertedImage](/v5/guide/menu-config.html#图片) 来收集所有上传或者插入的图片，记录为 `imageList1`
- 最后保存编辑器内容之前，使用 `editor.getElemsByType('image')` 获取当前编辑器的所有图片，记录为 `imageList2`
- 对比 `imageList1` 和 `imageList2` ，两者的差异，就是删除过的图片

可能会有疑问：为何要在最后去对比？我想要在图片删除时就及时得到反馈。<br>
但，这样是不行的，因为图片删除了，还可能会被**撤销**回来。所以，一定要在最后去操作。

## 视频

如果用于 Typescript ，需定义视频元素类型。可单独放在 `.d.ts` 中定义。

```ts
import { SlateElement } from '@wangeditor/editor'

type VideoElement = SlateElement & {
    src: string
}
```

菜单配置
- `onInsertedVideo` 插入视频之后的回调
- `checkVideo` 校验视频链接
- `parseVideoSrc` 转换视频链接

```ts
// 自定义校验视频
function customCheckVideoFn(src: string): boolean | string | undefined {
    if (!src) {
        return
    }
    if (src.indexOf('http') !== 0) {
        return '视频地址必须以 http/https 开头'
    }
    return true

    // 返回值有三种选择：
    // 1. 返回 true ，说明检查通过，编辑器将正常插入视频
    // 2. 返回一个字符串，说明检查未通过，编辑器会阻止插入。会 alert 出错误信息（即返回的字符串）
    // 3. 返回 undefined（即没有任何返回），说明检查未通过，编辑器会阻止插入。但不会提示任何信息
}

// 自定义转换视频
function customParseVideoSrc(src: string): string {
    if (src.includes('.bilibili.com')) {
        // 转换 bilibili url 为 iframe （仅作为示例，不保证代码正确和完整）
        const arr = location.pathname.split('/')
        const vid = arr[arr.length - 1]
        return `<iframe src="//player.bilibili.com/player.html?bvid=${vid}" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>`
    }
    return src
}

const editorConfig: Partial<IEditorConfig> = { MENU_CONF: {} }

editorConfig.MENU_CONF['insertVideo'] = {
    onInsertedVideo(videoNode: VideoElement | null) {
        if (videoNode == null) return

        const { src } = videoNode
        console.log('inserted video', src)
    },
    checkVideo: customCheckVideoFn, // 也支持 async 函数
    parseVideoSrc: customParseVideoSrc, // 也支持 async 函数
}

// 执行 createEditor
```

## 代码高亮

- `codeLangs` 配置代码语言

```ts
const editorConfig: Partial<IEditorConfig> = { MENU_CONF: {} }

editorConfig.MENU_CONF['codeSelectLang'] = {
    // 代码语言
    codeLangs: [
        { text: 'CSS', value: 'css' },
        { text: 'HTML', value: 'html' },
        { text: 'XML', value: 'xml' },
        // 其他
    ]
}

// 执行 createEditor
```

:::tip
配置代码语言时，只能从 `editor.getMenuConfig('codeSelectLang').codeLangs` 中选择，不能自己随意增加。
如有其他语言的需要，可以给我们提交 issue ，这需要修改源码。
:::

## 其他

其他菜单的配置，请参考上文的 [通用方法](#通用方法) 自行修改。
