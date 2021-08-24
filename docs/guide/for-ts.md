# 用于 Typescript

将 wangEditor 用于 Typescript 的注意事项。

## 扩展类型

新建一个 `custom-types.d.ts` ，源码如下。注意，保证该文件在 `tsconfig.json` 的 `include` 中。

```ts
import { SlateDescendant } from '@wangeditor/editor-cattle'

declare module 'slate' {
    interface CustomTypes {
        // 扩展 text
        Text: {
            text: string
            bold?: boolean
            italic?: boolean
            code?: boolean
            through?: boolean
            underline?: boolean
            sup?: boolean
            sub?: boolean
            color?: string
            bgColor?: string
            fontSize?: string
            fontFamily?: string
        }

        // 扩展 Element 的 type 属性
        Element: {
            type: string
            children: SlateDescendant[]
        }
    }
}
```

## 常用接口和类型

```js
import {
    IDomEditor,     // 编辑器实例接口
    IEditorConfig,  // 编辑器配置
    IToolbarConfig, // 工具栏配置
} from '@wangeditor/editor-cattle'
```
