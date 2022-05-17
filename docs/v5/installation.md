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

如果上述 CDN 访问不成功，可使用以下备用地址
- https://unpkg.com/@wangeditor/editor@latest/dist/css/style.css
- https://unpkg.com/@wangeditor/editor@latest/dist/index.js
