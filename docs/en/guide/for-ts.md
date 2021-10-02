# For Typescript

## Define type

Create a `custom-types.d.ts` file, ensure it will be included in `tsconfig.json`.

```ts
// custom-types.d.ts

import { SlateDescendant } from '@wangeditor/editor'

declare module 'slate' {
    interface CustomTypes {
        // Extend text props
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

        // Extend Element props
        Element: {
            type: string
            children: SlateDescendant[]
        }
    }
}
```

## Common interface and type

```js
import {
    IDomEditor,     // editor instance interface
    IEditorConfig,  // editor config interface
    IToolbarConfig, // toolbar config interface
} from '@wangeditor/editor'
```