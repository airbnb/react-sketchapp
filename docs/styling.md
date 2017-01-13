# Styling

Components use CSS styles + flexbox layout.

#### Layout Styles
```javascript
export type ViewStyle = {
  // shadowColor: Color,
  // shadowOffset: { width: number, height: number },
  // shadowOpacity: number,
  // shadowRadius: number,
  width: number,
  height: number,
  top: number,
  left: number,
  right: number,
  bottom: number,
  minWidth: number,
  maxWidth: number,
  minHeight: number,
  maxHeight: number,
  margin: number,
  marginVertical: number,
  marginHorizontal: number,
  marginTop: number,
  marginBottom: number,
  marginLeft: number,
  marginRight: number,
  padding: number,
  paddingVertical: number,
  paddingHorizontal: number,
  paddingTop: number,
  paddingBottom: number,
  paddingLeft: number,
  paddingRight: number,
  borderWidth: number,
  borderTopWidth: number,
  borderRightWidth: number,
  borderBottomWidth: number,
  borderLeftWidth: number,
  position: 'absolute' | 'relative',
  flexDirection: 'row' | 'row-reverse' | 'column' | 'column-reverse',
  flexWrap: 'wrap' | 'nowrap',
  justifyContent: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around',
  alignItems: 'flex-start' | 'flex-end' | 'center' | 'stretch',
  alignSelf: 'auto' | 'flex-start' | 'flex-end' | 'center' | 'stretch',
  // overflow: 'visible' | 'hidden' | 'scroll',
  flex: number,
  flexGrow: number,
  flexShrink: number,
  flexBasis: number,
  // aspectRatio: number,
  zIndex: number,
  // backfaceVisibility: 'visible' | 'hidden',
  backgroundColor: Color,
  borderColor: Color,
  borderTopColor: Color,
  borderRightColor: Color,
  borderBottomColor: Color,
  borderLeftColor: Color,
  borderRadius: number,
  borderTopLeftRadius: number,
  borderTopRightRadius: number,
  borderBottomLeftRadius: number,
  borderBottomRightRadius: number,
  borderStyle: 'solid' | 'dotted' | 'dashed',
  borderWidth: number,
  borderTopWidth: number,
  borderRightWidth: number,
  borderBottomWidth: number,
  borderLeftWidth: number,
  opacity: number,
};
```

#### Type Styles
```javascript
export type TextStyle = {
  color: Color,
  fontFamily: string,
  fontSize: number,
  fontStyle: 'normal' | 'italic',
  fontWeight: string,
  // textShadowOffset: { width: number, height: number },
  // textShadowRadius: number,
  // textShadowColor: Color,
  letterSpacing: number,
  lineHeight: number,
  textAlign: 'auto' | 'left' | 'right' | 'center' | 'justify',
  // writingDirection: 'auto' | 'ltr' | 'rtl',
};
```

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
  { Object.keys(colors).map(name => {
    <View
      style={{
        flex: 1,
        backgroundColor: colors[name],
      }}
    />
  }) }
</View>
```
