# Styling
Components use CSS styles + flexbox layout.

#### Layout Styles
| property | type | supported? |
| -------- | ---- | ---------- |
| `shadowColor` | `Color` | ⛔️ |
| `shadowOffset` | `{ width: number, height: number }` | ✅ |
| `shadowOpacity` | `number` | ✅ |
| `shadowRadius` | `number` | ✅ |
| `width` | `number` | ✅ |
| `height` | `number` | ✅ |
| `top` | `number` | ✅ |
| `left` | `number` | ✅ |
| `right` | `number` | ✅ |
| `bottom` | `number` | ✅ |
| `minWidth` | `number` | ✅ |
| `maxWidth` | `number` | ✅ |
| `minHeight` | `number` | ✅ |
| `maxHeight` | `number` | ✅ |
| `margin` | `number` | ✅ |
| `marginVertical` | `number` | ✅ |
| `marginHorizontal` | `number` | ✅ |
| `marginTop` | `number` | ✅ |
| `marginBottom` | `number` | ✅ |
| `marginLeft` | `number` | ✅ |
| `marginRight` | `number` | ✅ |
| `padding` | `number` | ✅ |
| `paddingVertical` | `number` | ✅ |
| `paddingHorizontal` | `number` | ✅ |
| `paddingTop` | `number` | ✅ |
| `paddingBottom` | `number` | ✅ |
| `paddingLeft` | `number` | ✅ |
| `paddingRight` | `number` | ✅ |
| `borderWidth` | `number` | ✅ |
| `borderTopWidth` | `number` | ✅ |
| `borderRightWidth` | `number` | ✅ |
| `borderBottomWidth` | `number` | ✅ |
| `borderLeftWidth` | `number` | ✅ |
| `position` | `absolute` &#124; `relative` | ✅ |
| `flexDirection` | `row` &#124; `row-reverse` &#124; `column` &#124; `column-reverse` | ✅ |
| `flexWrap` | `wrap` &#124; `nowrap` | ✅ |
| `justifyContent` | `flex-start` &#124; `flex-end` &#124; `center` &#124; `space-between` &#124; `space-around` | ✅ |
| `alignItems` | `flex-start` &#124; `flex-end` &#124; `center` &#124; `stretch` | ✅ |
| `alignSelf` | `auto` &#124; `flex-start` &#124; `flex-end` &#124; `center` &#124; `stretch` | ✅ |
| `overflow` | `visible` &#124; `hidden` &#124; `scroll` | ✅ |
| `flex` | `number` | ✅ |
| `flexGrow` | `number` | ✅ |
| `flexShrink` | `number` | ✅ |
| `flexBasis` | `number` | ✅ |
| `aspectRatio` | `number` | ⛔️ |
| `zIndex` | `number` | ✅ |
| `backfaceVisibility` | `visible` &#124; `hidden` | ⛔️ |
| `backgroundColor` | `Color` | ✅ |
| `borderColor` | `Color` | ✅ |
| `borderTopColor` | `Color` | ✅ |
| `borderRightColor` | `Color` | ✅ |
| `borderBottomColor` | `Color` | ✅ |
| `borderLeftColor` | `Color` | ✅ |
| `borderRadius` | `number` | ✅ |
| `borderTopLeftRadius` | `number` | ✅ |
| `borderTopRightRadius` | `number` | ✅ |
| `borderBottomLeftRadius` | `number` | ✅ |
| `borderBottomRightRadius` | `number` | ✅ |
| `borderStyle` | `solid` &#124; `dotted` &#124; `dashed` | ✅ |
| `borderWidth` | `number` | ✅ |
| `borderTopWidth` | `number` | ✅ |
| `borderRightWidth` | `number` | ✅ |
| `borderBottomWidth` | `number` | ✅ |
| `borderLeftWidth` | `number` | ✅ |
| `opacity` | `number` | ✅ |

#### Type Styles
| property | type | supported? |
| -------- | ---- | ---------- |
| `color` | `Color` | ✅ |
| `fontFamily` | `string` | ✅ |
| `fontSize` | `number` | ✅ |
| `fontStyle` | `normal` &#124; `italic` | ✅ |
| `fontWeight` | `string` &#124; `number` | ✅ |
| `textDecorationLine` | `none` &#124; `underline` &#124; `double` &#124; `line-through`  | ✅ |
| `textShadowOffset` | `{ width: number, height: number }` | ⛔️ |
| `textShadowRadius` | `number` | ⛔️ |
| `textShadowColor` | `Color` | ⛔️ |
| `letterSpacing` | `number` | ✅ |
| `lineHeight` | `number` | ✅ |
| `textAlign` | `auto` &#124; `left` &#124; `right` &#124; `center` &#124; `justify` | ✅ |
| `writingDirection` | `auto` &#124; `ltr` &#124; `rtl` | ⛔️ |
| `opacity` | `number` | ✅ |

Styles can be passed to components as plain objects, or via [`StyleSheet`](/docs/API.md).

```js
import { View, StyleSheet } from 'react-sketchapp';

// inline props
<View
  style={{
    backgroundColor: 'hotPink',
    width: 300,
  }}
/>

// plain JS object
const style = {
  backgroundColor: 'hotPink',
  width: 300,
}

<View style={style} />

// StyleSheet
const styles = StyleSheet.create({
  foo: {
    backgroundColor: 'hotPink',
    width: 300,
  }
})

<View style={styles.foo} />
<View style={[styles.foo, styles.bar]} />
```

You can use variables in your styles just like a standard React application:
```javascript
const colors = {
  Haus: '#F3F4F4',
  Night: '#333',
  Sur: '#96DBE4',
  Peach: '#EFADA0',
  Pear: '#93DAAB',
};

<View>
  {Object.keys(colors).map(name => (
    <View
      key={name}
      style={{
        flex: 1,
        backgroundColor: colors[name],
      }}
    />
  ))}
</View>
```
