# API Reference

* [`render`](#renderelement-context-callback)
* [Components](#components)
  * [`<Artboard>`](#artboard)
  * [`<Image>`](#image)
  * [`<RedBox>`](#redbox)
  * [`<Text>`](#text)
  * [`<View>`](#view)
* [`Platform`](#platform)
  * [`OS`](#os)
  * [`Version`](#version)
  * [`select`](#selectobj)
* [`StyleSheet`](#stylesheet)
  * [`hairlineWidth`](#hairlinewidth)
  * [`absoluteFill`](#absolutefill)
  * [`create`](#createstyle)
  * [`flatten`](#flattenstyles)
  * [`resolve`](#resolvestyles)

### `render(element, context, [callback])`

#### params
##### `element` (required)

##### `context` (required)
The Sketch context passed to a plugin

#### Example
```js
const Document = props =>
  <View>
    <Text>Hello world!</Text>
  </View>;

const onRun = context =>
  render(<Document />, context);
```

## Components
### `<Artboard>`
Wrapper for Sketch's artboards.

#### Props
| Prop | Type | Default | Note |
|---|---|---|---|
| `name` | `String` | | The name to be displayed in the Sketch Layer List |
| `children` | `Node` | | |
| `style` | [`Style`](/docs/styling.md) | | |

#### Example
```js
<Artboard
  name='My Artboard'
  style={{
    width: 480
  }}
>
  <Text>Hello world!</Text>
</Artboard>
```

### `<Image>`

#### Props
| Prop | Type | Default | Note |
|---|---|---|---|
| `children` | `Node` | | |
| `source` | `ImageSource` | | |
| `style` | [`Style`](/docs/styling.md) | | |
| `resizeMode` | `ResizeMode` | `contain` | |

```
type ImageSource = String | { src: String }
type ResizeMode = 'contain' | 'cover' | 'stretch' | 'center' | 'repeat' | 'none'
```

#### Example
```js
<Image
  source='http://placekitten.com/400'
  resizeMode='contain'
  style={{
    height: 400,
    width: 400,
  }}
/>
```


### `<RedBox>`
A red box / 'red screen of death' error handler. Thanks to [commissure/redbox-react](https://github.com/commissure/redbox-react)

#### Props
| Prop | Type | Default | Note |
|---|---|---|---|
| `error` | [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) | **required** | A JavaScript Error object |

#### Example
```js
const onRun = context => {
  try {
    render(<BrokenComponent />, context);
  } catch (err) {
    render(<RedBox error={err} />, context);
  }
}
```

### `<Text>`
Text primitives

#### Props
| Prop | Type | Default | Note |
|---|---|---|---|
| `name` | `String` | | The name to be displayed in the Sketch Layer List |
| `children` | `String` | | |
| `style` | [`Style`](/docs/styling.md) | | |


#### Example
```js
<Text
  name='Sketch Layer name'
  style={{
    fontSize: 24,
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    color: '#01ffae',
  }}
>
  Hello World!
</Text>
```

### `<View>`
View primitives

#### Props
| Prop | Type | Default | Note |
|---|---|---|---|
| `name` | `String` | | The name to be displayed in the Sketch Layer List |
| `children` | `Node` | | |
| `style` | [`Style`](/docs/styling.md) | | |

#### Example
```js
<View
  name='Sketch Layer name'
  style={{
    flexDirection: 'row',
    width: 480,
    backgroundColor: '#01ffae',
  }}
>
  <Text>Hello World!</Text>
  <Text>Hello World!</Text>
  <Text>Hello World!</Text>
</View>
```

## Platform

### `OS`
`sketch`

### `Version`
`1`

### `select(obj)`

#### params
##### `obj`

## StyleSheet

### `hairlineWidth`
The platform's global 'hairline width'

### `absoluteFill`
A constant 'absolute fill' style.

### `create(styles)`
Create an optimized StyleSheet reference from a style object.

#### params
##### `styles`

#### Example
```js
const styles = StyleSheet.create({
  foo: {
    fontSize: 24,
    color: 'red',
  },
  bar: {
    fontSize: 36,
    color: 'blue',
  },
});
// { foo: 1, bar: 2 }

<View>
  <Text style={styles.foo} />
  <Text style={styles.bar} />
</View>
```

### `flatten(styles)`
Flatten an array of style objects into one aggregated object, **or** look up the definition for a registered stylesheet.

#### params
##### `styles`

#### Example
```js
const styles = StyleSheet.create({
  foo: {
    fontSize: 24,
    color: 'red',
  },
  bar: {
    backgroundColor: 'blue',
    lineHeight: 36,
  },
});

StyleSheet.flatten([styles.foo, styles.bar]);
// { fontSize: 24, color: 'red',  backgroundColor: 'blue', lineHeight: 36 }

// alternatively:
StyleSheet.flatten(styles.foo);
// { fontSize: 24, color: 'red' }
```

### `resolve(styles)`
Resolve one style

#### params
##### `style`

#### Example
```js
const styles = StyleSheet.create({
  foo: {
    fontSize: 24,
    color: 'red',
  },
});

StyleSheet.resolve(styles.foo);
// { style: { fontSize: 24, color: 'red' } }
```
