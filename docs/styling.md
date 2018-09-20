# Styling

Components use CSS styles + flexbox layout.

#### Layout Styles

| property                  | type                                                                                        | supported? |
| ------------------------- | ------------------------------------------------------------------------------------------- | ---------- |
| `shadowColor`             | `Color`                                                                                     | ✅         |
| `shadowOffset`            | `{ width: number, height: number }`                                                         | ✅         |
| `shadowOpacity`           | `number`                                                                                    | ✅         |
| `shadowRadius`            | `number` &#124; `percentage`                                                                | ✅         |
| `width`                   | `number` &#124; `percentage`                                                                | ✅         |
| `height`                  | `number` &#124; `percentage`                                                                | ✅         |
| `top`                     | `number` &#124; `percentage`                                                                | ✅         |
| `left`                    | `number` &#124; `percentage`                                                                | ✅         |
| `right`                   | `number` &#124; `percentage`                                                                | ✅         |
| `bottom`                  | `number` &#124; `percentage`                                                                | ✅         |
| `minWidth`                | `number` &#124; `percentage`                                                                | ✅         |
| `maxWidth`                | `number` &#124; `percentage`                                                                | ✅         |
| `minHeight`               | `number` &#124; `percentage`                                                                | ✅         |
| `maxHeight`               | `number` &#124; `percentage`                                                                | ✅         |
| `margin`                  | `number` &#124; `percentage`                                                                | ✅         |
| `marginVertical`          | `number` &#124; `percentage`                                                                | ✅         |
| `marginHorizontal`        | `number` &#124; `percentage`                                                                | ✅         |
| `marginTop`               | `number` &#124; `percentage`                                                                | ✅         |
| `marginBottom`            | `number` &#124; `percentage`                                                                | ✅         |
| `marginLeft`              | `number` &#124; `percentage`                                                                | ✅         |
| `marginRight`             | `number` &#124; `percentage`                                                                | ✅         |
| `padding`                 | `number` &#124; `percentage`                                                                | ✅         |
| `paddingVertical`         | `number` &#124; `percentage`                                                                | ✅         |
| `paddingHorizontal`       | `number` &#124; `percentage`                                                                | ✅         |
| `paddingTop`              | `number` &#124; `percentage`                                                                | ✅         |
| `paddingBottom`           | `number` &#124; `percentage`                                                                | ✅         |
| `paddingLeft`             | `number` &#124; `percentage`                                                                | ✅         |
| `paddingRight`            | `number` &#124; `percentage`                                                                | ✅         |
| `borderWidth`             | `number` &#124; `percentage`                                                                | ✅         |
| `borderTopWidth`          | `number` &#124; `percentage`                                                                | ✅         |
| `borderRightWidth`        | `number` &#124; `percentage`                                                                | ✅         |
| `borderBottomWidth`       | `number` &#124; `percentage`                                                                | ✅         |
| `borderLeftWidth`         | `number` &#124; `percentage`                                                                | ✅         |
| `position`                | `absolute` &#124; `relative`                                                                | ✅         |
| `flexDirection`           | `row` &#124; `row-reverse` &#124; `column` &#124; `column-reverse`                          | ✅         |
| `flexWrap`                | `wrap` &#124; `nowrap`                                                                      | ✅         |
| `justifyContent`          | `flex-start` &#124; `flex-end` &#124; `center` &#124; `space-between` &#124; `space-around` | ✅         |
| `alignItems`              | `flex-start` &#124; `flex-end` &#124; `center` &#124; `stretch`                             | ✅         |
| `alignSelf`               | `auto` &#124; `flex-start` &#124; `flex-end` &#124; `center` &#124; `stretch`               | ✅         |
| `overflow`                | `visible` &#124; `hidden` &#124; `scroll`                                                   | ✅         |
| `flex`                    | `number`                                                                                    | ✅         |
| `flexGrow`                | `number`                                                                                    | ✅         |
| `flexShrink`              | `number`                                                                                    | ✅         |
| `flexBasis`               | `number`                                                                                    | ✅         |
| `aspectRatio`             | `number`                                                                                    | ⛔️        |
| `zIndex`                  | `number`                                                                                    | ✅         |
| `backfaceVisibility`      | `visible` &#124; `hidden`                                                                   | ⛔️        |
| `backgroundColor`         | `Color`                                                                                     | ✅         |
| `borderColor`             | `Color`                                                                                     | ✅         |
| `borderTopColor`          | `Color`                                                                                     | ✅         |
| `borderRightColor`        | `Color`                                                                                     | ✅         |
| `borderBottomColor`       | `Color`                                                                                     | ✅         |
| `borderLeftColor`         | `Color`                                                                                     | ✅         |
| `borderRadius`            | `number` &#124; `percentage`                                                                | ✅         |
| `borderTopLeftRadius`     | `number` &#124; `percentage`                                                                | ✅         |
| `borderTopRightRadius`    | `number` &#124; `percentage`                                                                | ✅         |
| `borderBottomLeftRadius`  | `number` &#124; `percentage`                                                                | ✅         |
| `borderBottomRightRadius` | `number` &#124; `percentage`                                                                | ✅         |
| `borderStyle`             | `solid` &#124; `dotted` &#124; `dashed`                                                     | ✅         |
| `borderWidth`             | `number` &#124; `percentage`                                                                | ✅         |
| `borderTopWidth`          | `number` &#124; `percentage`                                                                | ✅         |
| `borderRightWidth`        | `number` &#124; `percentage`                                                                | ✅         |
| `borderBottomWidth`       | `number` &#124; `percentage`                                                                | ✅         |
| `borderLeftWidth`         | `number` &#124; `percentage`                                                                | ✅         |
| `opacity`                 | `number`                                                                                    | ✅         |

#### Type Styles

| property             | type                                                                 | supported? |
| -------------------- | -------------------------------------------------------------------- | ---------- |
| `color`              | `Color`                                                              | ✅         |
| `fontFamily`         | `string`                                                             | ✅         |
| `fontSize`           | `number`                                                             | ✅         |
| `fontStyle`          | `normal` &#124; `italic`                                             | ✅         |
| `fontWeight`         | `string` &#124; `number`                                             | ✅         |
| `textDecorationLine` | `none` &#124; `underline` &#124; `double` &#124; `line-through`      | ✅         |
| `textShadowOffset`   | `{ width: number, height: number }`                                  | ✅         |
| `textShadowRadius`   | `number`                                                             | ✅         |
| `textShadowColor`    | `Color`                                                              | ✅         |
| `letterSpacing`      | `number`                                                             | ✅         |
| `lineHeight`         | `number`                                                             | ✅         |
| `textAlign`          | `auto` &#124; `left` &#124; `right` &#124; `center` &#124; `justify` | ✅         |
| `writingDirection`   | `auto` &#124; `ltr` &#124; `rtl`                                     | ⛔️        |
| `opacity`            | `number`                                                             | ✅         |
| `percentage`         | `points` &#124; `percentages`                                        | ✅         |

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
</View>;
```
