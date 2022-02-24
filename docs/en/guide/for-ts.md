# For Typescript

## Extend Type

Create a `custom-types.d.ts` file, ensure it will be included in `tsconfig.json`.

```ts
// custom-types.d.ts

import { SlateDescendant, SlateElement, SlateText } from '@wangeditor/editor'

declare module '@wangeditor/editor' {
    // Extend Text
    interface SlateText {
        text: string
    }

    // Extend Element
    interface SlateElement {
        type: string
        children: SlateDescendant[]
    }
}
```
