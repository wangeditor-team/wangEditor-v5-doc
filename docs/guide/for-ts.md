# 用于 Typescript

将 wangEditor 用于 Typescript 的注意事项。

## 扩展类型

新建一个 `custom-types.d.ts` ，源码如下。注意，保证该文件在 `tsconfig.json` 的 `include` 中。

```ts
import { SlateDescendant, SlateElement, SlateText } from '@wangeditor/editor'

declare module '@wangeditor/editor' {
    // 扩展 Text
    interface SlateText {
        text: string
    }

    // 扩展 Element
    interface SlateElement {
        type: string
        children: SlateDescendant[]
    }
}
```
