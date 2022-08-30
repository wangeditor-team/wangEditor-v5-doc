# Menu Config

## General Way

### Get a Menu Key

Use `editor.getAllMenuKeys()` to checkout all menus key, and find your menu key.

### Get the Menu Default Config

When you find a menu key, you can get this menu's default config.

```js
editor.getMenuConfig('uploadImage') // `uploadImage` is a menu key
```

### Change the Menu Config

```ts
import { IEditorConfig } from '@wangeditor/editor'

// add a MENU_CONF prop
const editorConfig: Partial<IEditorConfig> = {  // TS syntax
// const editorConfig = {                       // JS syntax
    MENU_CONF: {}

    // other props...
}

// change `uploadImage` menu config
editorConfig.MENU_CONF['uploadImage'] = {
    server: '/api/upload-image',
    fieldName: 'custom-field-name'
    // other config...
}

// change other menu's config
editorConfig.MENU_CONF['otherMenuKey'] = {
    // config...
}

// create editor, or Vue React <Editor> component
```

## Color

```ts
// font colors
editorConfig.MENU_CONF['color'] = {
    colors: ['#000', '#333', '#666']
}

// background colors
editorConfig.MENU_CONF['bgColor'] = {
    colors: ['#000', '#333', '#666']
}
```

## Font Size

```ts
editorConfig.MENU_CONF['fontSize'] = {
    fontSizeList: ['12px', '16px', '24px', '40px']
}
```

## Font-Family

:::tip
Some fonts are not commercially available.
:::

```ts
editorConfig.MENU_CONF['fontFamily'] = {
    fontFamilyList: [
        // Support two format
        //   1. string
        //   2. object like { name: 'xxx', value: 'xxx' }

        'Arial',
        'Tahoma',
        'Verdana',
        { name: 'Tahoma', value: 'Tahoma' },
    ]
}
```

## Line Height

```ts
editorConfig.MENU_CONF['lineHeight'] = {
    lineHeightList: ['1', '1.5', '2', '2.5']
}
```

## Emotion

```ts
editorConfig.MENU_CONF['emotion'] = {
    emotions: '😀 😃 😄 😁 😆 😅 😂 🤣 😊 😇 🙂 🙃 😉'.split(' ') // 数组
}
```

## Link

- `checkLink` Check link url
- `parseLinkUrl` Parse link url

```ts
function customCheckLinkFn(text: string, url: string): string | boolean | undefined {  // TS syntax
// function customCheckLinkFn(text, url) {                                             // JS syntax
    if (!url) {
        return
    }
    if (url.indexOf('http') !== 0) {
        return 'Link must includes http/https'
    }
    return true

    // The following three way, you should choose one:
    // 1. return true. Means check successful, editor will insert this link
    // 2. return a string. Means check failed, need to alert some text info
    // 3. return undefined. Means check failed, no need to alert some text info
}

function customParseLinkUrl(url: string): string {   // TS syntax
// function customParseLinkUrl(url) {                // JS syntax
    if (url.indexOf('http') !== 0) {
        return `http://${url}`
    }
    return url
}

// insertLink menu config
editorConfig.MENU_CONF['insertLink'] = {
    checkLink: customCheckLinkFn, // support `async function`
    parseLinkUrl: customParseLinkUrl, // support `async function`
}
// editLink menu config
editorConfig.MENU_CONF['editLink'] = {
    checkLink: customCheckLinkFn, // support `async function`
    parseLinkUrl: customParseLinkUrl, // support `async function`
}
```

## Image

If you use Typescript, you need define image element type.

```ts
// create a `.d.ts` file

import { SlateElement } from '@wangeditor/editor'

type ImageElement = SlateElement & {
    src: string
    alt: string
    url: string
    href: string
}
```

Image menu config.

```ts
function customCheckImageFn(src: string, alt: string, url: string): boolean | undefined | string {  // TS syntax
// function customCheckImageFn(src, alt, url) {                                                     // JS syntax
    if (!src) {
        return
    }
    if (src.indexOf('http') !== 0) {
        return 'Image src must start width http/https'
    }
    return true

    // The following three way, you should choose one:
    // 1. return true. Means check successful, editor will insert this image
    // 2. return a string. Means check failed, need to alert some text info
    // 3. return undefined. Means check failed, no need to alert some text info
}

function customParseImageSrc(src: string): string {  // TS syntax
// function customParseImageSrc(src) {               // JS syntax
    if (src.indexOf('http') !== 0) {
        return `http://${src}`
    }
    return src
}

// insertImage menu config
editorConfig.MENU_CONF['insertImage'] = {
    onInsertedImage(imageNode: ImageElement | null) {  // TS syntax
    // onInsertedImage(imageNode) {                    // JS syntax
        if (imageNode == null) return

        const { src, alt, url, href } = imageNode
        console.log('inserted image', src, alt, url, href)
    },
    checkImage: customCheckImageFn, // support `async function`
    parseImageSrc: customParseImageSrc, // support `async function`
}
// editImage menu config
editorConfig.MENU_CONF['editImage'] = {
    onUpdatedImage(imageNode: ImageElement | null) {   // TS syntax
    // onUpdatedImage(imageNode) {                     // JS syntax
        if (imageNode == null) return

        const { src, alt, url } = imageNode
        console.log('updated image', src, alt, url)
    },
    checkImage: customCheckImageFn, // support `async function`
    parseImageSrc: customParseImageSrc, // support `async function`
}
```

## Upload Image

See [demo](https://github.com/wangeditor-team/server).

```ts{2}
editorConfig.MENU_CONF['uploadImage'] = {
    // menu config...
}
```

### Server Address

Required.

```ts
editorConfig.MENU_CONF['uploadImage'] = {
     server: '/api/upload',
}
```

If uploaded successfully, the server must return data like this format:

```ts
{
    "errno": 0, // it's number, not string
    "data": {
        "url": "xxx", // image src, required
        "alt": "yyy", // image alt, optional
        "href": "zzz" // image link, optional
    }
}
```

If uploaded failed, the server must return data like this format:

```ts
{
    "errno": 1, // number, not equal 0
    "message": 'your failed message'
}
```

:::tip
If your server's response body is not above format, you can use the following `customInsert`.
:::

### Basic Config

```ts
editorConfig.MENU_CONF['uploadImage'] = {
    // form-data fieldName ，default 'wangeditor-uploaded-image'
    fieldName: 'your-custom-name',

    // max size of one file
    maxFileSize: 1 * 1024 * 1024, // 1M

    // max length of uploaded files
    maxNumberOfFiles: 10,

    // file types, default `['image/*']`. If unwanted, you can set []
    allowedFileTypes: ['image/*'],

    // custom upload params, like token
    meta: {
        token: 'xxx',
        otherKey: 'yyy'
    },

    // Embed meta in url, not in formData. Default is false
    metaWithUrl: false,

    // custom http headers
    headers: {
        Accept: 'text/x-json',
        otherKey: 'xxx'
    },

    // send cookie when cross-origin
    withCredentials: true,

    // timeout, default 10s
    timeout: 5 * 1000, // 5 秒
}
```

### Callbacks

```ts
editorConfig.MENU_CONF['uploadImage'] = {
    onBeforeUpload(file: File) {   // TS syntax
    // onBeforeUpload(file) {      // JS syntax
        // `file` is selected file, format like { key: file }
        return file

        // You can return:
        // 1. return the file object or a new file object. Editor will upload it.
        // 2. return false. Stop upload this file.
    },

    onProgress(progress: number) {   // TS syntax
    // onProgress(progress) {        // JS syntax
        // progress is a number 0-100
        console.log('progress', progress)
    },

    // One file upload success
    onSuccess(file: File, res: any) {     // TS syntax
    // onSuccess(file, res) {             // JS syntax
        console.log(`${file.name} uploaded`, res)
    },

    // One file upload failed
    onFailed(file: File, res: any) {     // TS syntax
    // onFailed(file, res) {             // JS syntax
        console.log(`${file.name} failed`, res)
    },

    // upload error or timeout
    onError(file: File, err: any, res: any) {  // TS syntax
    // onError(file, err, res) {               // JS syntax
        console.log(`${file.name} error`, err, res)
    },
}
```

### Custom Functions

If you use Type script, you should define a function type first.

```ts
type InsertFnType = (url: string, alt: string, href: string) => void
```

#### Custom Insert

If your server response body is not above format, you can use `customInsert` to insert image.

```ts
editorConfig.MENU_CONF['uploadImage'] = {
    customInsert(res: any, insertFn: InsertFnType) {   // TS syntax
    // customInsert(res, insertFn) {                   // JS syntax

        // `res` is server response

        // Get image's url, alt, href in res, and insert to editor
        insertFn(url, alt, href)
    },
}
```

#### Custom Upload

If you unwanted wangEditor's embedded upload function, you can use `customUpload` to upload images yourself.

```ts
editorConfig.MENU_CONF['uploadImage'] = {
    async customUpload(file: File, insertFn: InsertFnType) {   // TS syntax
    // async customUpload(file, insertFn) {                    // JS syntax

        // `file` is your selected file

        // upload images yourself, and get image's url, alt, href

        // insert image
        insertFn(url, alt, href)
    }
}
```

#### Custom Select Images

If you unwanted wangEditor's embedded select function, you can use `customBrowseAndUpload` to implement by yourself.

```ts
editorConfig.MENU_CONF['uploadImage'] = {
    customBrowseAndUpload(insertFn: InsertFnType) {  // TS syntax
    // customBrowseAndUpload(insertFn) {             // JS syntax
        // 1. select files by yourself
        // 2. upload files, and get image's url, alt, href
        // 3. insert image
        insertFn(url, alt, href)
    }
}
```

### Base64 insert images

```ts
editorConfig.MENU_CONF['uploadImage'] = {
    // other props...

    // If image's size less than this, then insert image by base64 format. Default 0.
    base64LimitSize: 5 * 1024 // 5kb
}
```

### Get Deleted Images

This is a common requirement.<br>
You upload an image to the server, then you delete this image. You want to get this deleted image and delete it from the server when you save content.

- Use [onInsertedImage](#image) to collect all images, record to `imageList1`
- When you save content, use `editor.getElemsByType('image')` to get rest images, record to `imageList2`
- Diff `imageList1` and `imageList2`, then you will get deleted images

You may wonder: If I can get this image when it just is deleted, but when save content?<br>
You could not do this. Because the image which is deleted may restore by you **redo** or **undo** the editor.

## Video

If you use Typescript, you need to define video element type first.

```ts
// create a `.d.ts` file

import { SlateElement } from '@wangeditor/editor'

type VideoElement = SlateElement & {
    src: string
    poster?: string
}
```

Menu config.

```ts
function customCheckVideoFn(src: string, poster: string): boolean | string | undefined {   // TS syntax
// function customCheckVideoFn(src, poster) {                                              // JS syntax
    if (!src) {
        return
    }
    if (src.indexOf('http') !== 0) {
        return 'Video src must start width http/https'
    }
    return true

    // The following three way, you should choose one:
    // 1. return true. Means check successful, editor will insert this video
    // 2. return a string. Means check failed, need to alert some text info
    // 3. return undefined. Means check failed, no need to alert some text info
}

function customParseVideoSrc(src: string): string {  // TS syntax
// function customParseVideoSrc(src) {               // JS syntax
    // parse video src and return the new src
    return newSrc
}

editorConfig.MENU_CONF['insertVideo'] = {
    onInsertedVideo(videoNode: VideoElement | null) {  // TS syntax
    // onInsertedVideo(videoNode) {                    // JS syntax
        if (videoNode == null) return

        const { src } = videoNode
        console.log('inserted video', src)
    },
    checkVideo: customCheckVideoFn, // support `async function`
    parseVideoSrc: customParseVideoSrc, // support `async function`
}
```

## Upload Video

See [demo](https://github.com/wangeditor-team/server).

```ts{2}
editorConfig.MENU_CONF['uploadVideo'] = {
    // menu config...
}
```

### Server Address

Required.

```ts
editorConfig.MENU_CONF['uploadVideo'] = {
     server: '/api/upload',
}
```

If uploaded successfully, the server must return data like this format:

```js
{
    "errno": 0, // it's number, not string
    "data": {
        "url": "xxx", // video src, required
        "poster": "xxx.png" // video poster image, optional
    }
}

// @wangeditor/editor >= 5.1.8 support video poster
```

If uploaded failed, the server must return data like this format:

```json
{
    "errno": 1, // number, not equal 0
    "message": "your failed message"
}
```

:::tip
If your server's response body is not above format, you can use the following `customInsert`.
:::

### Basic Config

```ts
editorConfig.MENU_CONF['uploadVideo'] = {
    // form-data fieldName ，default 'wangeditor-uploaded-video'
    fieldName: 'your-custom-name',

    // max size of one file
    maxFileSize: 5 * 1024 * 1024, // 5M

    // max length of uploaded files
    maxNumberOfFiles: 3,

    // file types, default `['video/*']`. If unwanted, you can set []
    allowedFileTypes: ['video/*'],

    // custom upload params, like token
    meta: {
        token: 'xxx',
        otherKey: 'yyy'
    },

    // Embed meta in url, not in formData. Default is false
    metaWithUrl: false,

    // custom http headers
    headers: {
        Accept: 'text/x-json',
        otherKey: 'xxx'
    },

    // send cookie when cross-origin
    withCredentials: true,

    // timeout, default 30s
    timeout: 5 * 1000, // 5 秒

    // video do not support base64 format src.
}
```

### Callbacks

```ts
editorConfig.MENU_CONF['uploadVideo'] = {
    onBeforeUpload(file: File) {   // TS syntax
    // onBeforeUpload(file) {      // JS syntax
        // `file` is selected file, format like { key: file }
        return file

        // You can return:
        // 1. return the file object or a new file object. Editor will upload it.
        // 2. return false. Stop upload this file.
    },

    onProgress(progress: number) {  // TS syntax
    // onProgress(progress) {       // JS syntax
        // progress is a number 0-100
        console.log('progress', progress)
    },

    // One file upload success
    onSuccess(file: File, res: any) {  // TS syntax
    // onSuccess(file, res) {          // JS syntax
        console.log(`${file.name} uploaded`, res)
    },

    // One file upload failed
    onFailed(file: File, res: any) {  // TS syntax
    // onFailed(file, res) {          // JS syntax
        console.log(`${file.name} failed`, res)
    },

    // upload error or timeout
    onError(file: File, err: any, res: any) {   // TS syntax
    // onError(file, err, res) {                // JS syntax
        console.log(`${file.name} error`, err, res)
    },
}
```

### Custom Functions

If you use Type script, you should define a function type first.

```ts
type InsertFnType = (url: string, poster: string = '') => void
```

#### Custom Insert

If your server response body is not above format, you can use `customInsert` to insert video.

```ts
editorConfig.MENU_CONF['uploadVideo'] = {
    customInsert(res: any, insertFn: InsertFnType) {     // TS syntax
    // customInsert(res: any, insertFn: InsertFnType) {  // JS syntax

        // `res` is server response

        // Get video's url and poster in res, and insert to editor
        insertFn(url, poster)
    },
}
```

#### Custom Upload

If you unwanted wangEditor's embedded upload function, you can use `customUpload` to upload videos yourself.

```ts
editorConfig.MENU_CONF['uploadVideo'] = {
    async customUpload(file: File, insertFn: InsertFnType) {  // TS syntax
    // async customUpload(file, insertFn) {                   // JS syntax

        // `file` is your selected file

        // upload videos yourself, and get video's url and poster

        // insert video
        insertFn(url, poster)
    }
}
```

#### Custom Select Videos

If you unwanted wangEditor's embedded select function, you can use `customBrowseAndUpload` to implement by yourself.

```ts
editorConfig.MENU_CONF['uploadVideo'] = {
    customBrowseAndUpload(insertFn: InsertFnType) {   // TS syntax
    // customBrowseAndUpload(insertFn) {              // JS syntax
        // 1. select files by yourself
        // 2. upload files, and get video's url and poster
        // 3. insert video
        insertFn(url, poster)
    }
}
```

## Code Highlight

```ts
editorConfig.MENU_CONF['codeSelectLang'] = {
    codeLangs: [
        { text: 'CSS', value: 'css' },
        { text: 'HTML', value: 'html' },
        { text: 'XML', value: 'xml' },
        // others...
    ]
}
```

:::tip
When you want to edit code language, you can only choose language from `editor.getMenuConfig('codeSelectLang').codeLangs`.You can't edit it at will!<br>
If you want a new language, please commit an issue to us. It needs to change the editor's source code.
:::

## Others

You can see [General-way](#general-way) to change other menus config.
