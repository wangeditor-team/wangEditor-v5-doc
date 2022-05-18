# 安装

包括 vue React 组件

## npm

安装 editor

```shell
yarn add @wangeditor/editor
# 或者 npm install @wangeditor/editor --save
```

安装 React 组件

```shell
yarn add @wangeditor/editor-for-react
# 或者 npm install @wangeditor/editor-for-react --save
```

安装 Vue2 组件

```shell
yarn add @wangeditor/editor-for-vue
# 或者 npm install @wangeditor/editor-for-vue --save
```

安装 Vue3 组件

```shell
yarn add @wangeditor/editor-for-vue@next
# 或者 npm install @wangeditor/editor-for-vue@next --save
```

## CDN

```html
<!-- 引入 css -->
<link href="https://cdn.jsdelivr.net/npm/@wangeditor/editor@latest/dist/css/style.css" rel="stylesheet">

<!-- 引入 js -->
<script src="https://cdn.jsdelivr.net/npm/@wangeditor/editor@latest/dist/index.min.js"></script>
<script>
    var E = window.wangEditor; // 全局变量
</script>
```

如果上述 CDN 访问不成功，可选择如下两种备用方案：

第一，使用以下备用地址
- [https://unpkg.com/@wangeditor/editor@latest/dist/css/style.css](https://unpkg.com/@wangeditor/editor@latest/dist/css/style.css)
- [https://unpkg.com/@wangeditor/editor@latest/dist/index.js](https://unpkg.com/@wangeditor/editor@latest/dist/index.js)

第二，在 npm 安装完成之后，在安装包找到 JS CSS 文件，步骤如下：
- 新建一个 `test1` 文件夹，打开控制台，目录定位到该文件夹，执行 `npm install @wangeditor/editor` 或 `yarn add @wangeditor/editor`
- 安装完成，打开 `node_modules/@wangeditor/editor/dist` 文件夹，即可找到 JS CSS 文件：
    - `index.js`
    - `css/style.css`
- 把这俩文件拷贝出来，然后删掉 `test1` 文件夹
