# API Reference

* [`render`](#renderelement-context)
* [`renderToJSON`](#rendertojsonelement)
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
  * [`create`](#createstyles)
  * [`flatten`](#flattenstyles)
  * [`resolve`](#resolvestyle)
* [`TextStyles`](#textstyles)
  * [`create`](#createstyleoptionsstyles)
  * [`resolve`](#resolvestyle)

### `render(element, context)`
Returns the top-level rendered Sketch object.

#### params
##### `element` (required)

##### `context` (required)
The Sketch context passed to a plugin

### returns
The top-most rendered native Sketch layer.

#### Example
```js
const Document = props =>
  <View>
    <Text>Hello world!</Text>
  </View>;

const onRun = context =>
  render(<Document />, context);
```

### `renderToJSON(element)`
Returns a Sketch JSON object for further consumption - doesn't add to the page.

#### params
##### `element` (required)

### returns
The top-most Sketch layer as JSON.

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

### `resolve(style)`
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

## TextStyles
An interface to Sketch's shared text styles. Create styles with or without rendering them to the document canvas.

### `create(options, styles)`
The primary interface to TextStyles. **Call this before rendering**.

#### params
##### `options: { context, styles }`
###### `context` **(required)**
The Sketch API context from the main plugin `onRun` function.

###### `clearExistingStyles`
Clear any styles already registered in the document.

##### `styles` **(required)**
An object of JavaScript styles. The keys will be used as Sketch's Text Style names.

#### Example
```js
const onRun = context =>
  const typeStyles = {
    Headline: {
      fontSize: 36,
      fontFamily: 'Apercu',
      lineHeight: 38,
    },
    Body: {
      fontSize: 16,
      fontFamily: 'Helvetica',
      lineHeight: 22,
    },
  };

  TextStyles.create({
    context: context,
    clearExistingStyles: true,
  }, typeStyles);

  const Document = () =>
    <View>
      <Text style={styles.Headline}>Headline text</Text>
      <Text style={styles.Body}>Body text</Text>
    </View>

  render(<Document />, context);
```

### `resolve(style)`
Find a stored native Sketch style object for a given JavaScript style object. You probably don't need to use this.

#### params
##### `style`
A JavaScript style

### `styles`
Find all of the registered styles. You probably don't need to use this.

### `get(name)`
Find a stored style by _name_.

#### params
##### `name`
The style name

#### Example
```js
const onRun = context =>
  const typeStyles = {
    Headline: {
      fontSize: 36,
      fontFamily: 'Apercu',
      lineHeight: 38,
    },
    Body: {
      fontSize: 16,
      fontFamily: 'Helvetica',
      lineHeight: 22,
    },
  };

  TextStyles.create({
    context: context,
    clearExistingStyles: true,
  }, typeStyles);

  const Document = () =>
    <View>
      <Text style={TextStyle.get('Headline')}>Headline text</Text>
      <Text style={TextStyle.get('Body')}>Body text</Text>
    </View>

  render(<Document />, context);
```

### `clear`
Reset the registered styles.
