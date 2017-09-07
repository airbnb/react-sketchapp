# API Reference

* [`render`](#renderelement-container)
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
* [`Symbols`](#symbols)
  * [`makeSymbol`](#makesymbolnode-name)
  * [`injectSymbols`](#injectsymbols)

### `render(element, container)`
Returns the top-level rendered Sketch object.

#### params
##### `element` (required)

##### `container` (required)
The element to render into - will be replaced. Should either be a Group or a Page — usually you should use `context.document.currentPage()`.

### returns
The top-most rendered native Sketch layer.

#### Example
```js
const Document = props =>
  <View>
    <Text>Hello world!</Text>
  </View>;

export default (context) => {
  render(<Document />, context.document.currentPage());
}
```

### `renderToJSON(element)`
Returns a Sketch JSON object for further consumption - doesn't add to the page.

#### params
##### `element` (required)

### returns
The top-most Sketch layer as JSON.

## Components
### `<Artboard>`
Wrapper for Sketch's Artboards.

#### props
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
A red box / 'red screen of death' error handler. Thanks to [commissure/redbox-react](https://github.com/commissure/redbox-react).
--SUGGESTION: can you give a screenshot of what this looks like?

#### Props
| Prop | Type | Default | Note |
|---|---|---|---|
| `error` | [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) | **required** | A JavaScript Error object |

#### Example
```js
export default (context) => {
  try {
    render(<BrokenComponent />, context.document.currentPage());
  } catch (err) {
    render(<RedBox error={err} />, context.document.currentPage());
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
Compared to single-use `style` objects, `StyleSheets` enable creation of re-usable, optimized style references.

### `hairlineWidth`
The platform's global 'hairline width'.

### `absoluteFill`
A constant 'absolute fill' style.

### `create(styles)`
Create an optimized `StyleSheet` reference from a style object.

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
Resolve one style.

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
// { fontSize: 24, color: 'red' }
```

## TextStyles
An interface to Sketch's shared text styles. Create styles with or without rendering them to the document canvas.

### `create(options, styles)`
The primary interface to TextStyles. **Call this before rendering**.

#### params
##### `options: { context, clearExistingStyles }`
###### `context` **(required)**
The Sketch API context.

###### `clearExistingStyles`
Clear any styles already registered in the document.

##### `styles` **(required)**
An object of JavaScript styles. The keys will be used as Sketch's Text Style names.

#### Example
```js
export default (context) => {
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

  render(<Document />, context.document.currentPage());
}
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
export default (context) => {
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
      <Text style={TextStyles.get('Headline')}>Headline text</Text>
      <Text style={TextStyles.get('Body')}>Body text</Text>
    </View>

  render(<Document />, context.document.currentPage());
}
```

### `clear`
Reset the registered styles.

## Symbols
An interface to Sketch's symbols. Create symbols and optionally inject them into the symbols page.

### `makeSymbol(node, name)`
Returns a Sketch symbol given a node and an optional name.

#### Parameters
| Parameter | Type | Default | Note |
|---|---|---|---|
| `node` | `Node` | | The node object that will be rendered as a symbol |
| `name` | `String` | The node name | Optional name for the symbol, string can include backslashes to organise these symbols with Sketch. For example `squares/blue` |

#### Symbol example
```js
const BlueSquare = () => (
  <View
    name="Blue Square"
    style={{ width: 100, height: 100, backgroundColor: 'blue' }}
  />
);

const BlueSquareSymbol = makeSymbol(BlueSquare);

const Document = () => (
  <Artboard>
    <BlueSquareSymbol />
  </Artboard>
);

export default (context) => {
  render(<Document />, context.document.currentPage());
}
```

#### Text override example
Text overrides use the name paramater to target a specific Text primitive. When no name is given the value within the Text primitive can be used to override the value.

```js
const BlueSquare = () => (
  <View
    name="Blue Square"
    style={{ width: 100, height: 100, backgroundColor: 'blue' }}
  >
    <Text>Blue Square Text</Text>
  </View>
);

const BlueSquareSymbol = makeSymbol(BlueSquare, 'squares/blue');

const Document = () => (
  <Artboard>
    <BlueSquareSymbol overrides={{
      'Blue Square Text': 'Override Text',
    }} />
  </Artboard>
);

export default (context) => {
  render(<Document />, context.document.currentPage());
}
```

#### Image override example
Image overrides use the name paramater to target a specific Image primitive.

```js
const BlueSquare = () => (
  <View
    name="Blue Square"
    style={{ width: 100, height: 100, backgroundColor: 'blue' }}
  >
    <Image name="Blue Square Image" source="https://hello.world/image.jpg" />
  </View>
);

const BlueSquareSymbol = makeSymbol(BlueSquare, 'squares/blue');

const Document = () => (
  <Artboard>
    <BlueSquareSymbol overrides={{
      'Blue Square Image': 'https://hello.world/different.jpg',
    }} />
  </Artboard>
);

export default (context) => {
  render(<Document />, context.document.currentPage());
}
```

#### Nested symbol + override example

```js
const RedSquare = () => (
  <View
    name="Red Square"
    style={{ width: 100, height: 100, backgroundColor: 'red' }}
  >
    <Text name="Red Square Text">Red Square</Text>
  </View>
);

const RedSquareSymbol = makeSymbol(RedSquare, 'squares/red');

const BlueSquare = () => (
  <View
    name="Blue Square"
    style={{ width: 100, height: 100, backgroundColor: 'blue' }}
  >
    <Text name="Blue Square Text">Blue Square</Text>
  </View>
);

const BlueSquareSymbol = makeSymbol(BlueSquare, 'squares/blue');

const Photo = () => (
  <Image
    name="Photo"
    source="https://pbs.twimg.com/profile_images/756488692135526400/JUCawBiW_400x400.jpg"
    style={{ width: 100, height: 100 }}
  />
);

const PhotoSymbol = makeSymbol(Photo);

const Nested = () => (
  <View
    name="Nested"
    style={{ display: 'flex', flexDirection: 'column', width: 75, height: 150 }}
  >
    <PhotoSymbol name="Photo Instance" style={{ width: 75, height: 75 }} />
    <RedSquareSymbol
      name="Red Square Instance"
      style={{ width: 75, height: 75 }}
    />
  </View>
);

const NestedSymbol = makeSymbol(Nested);

const Document = () => (
  <Artboard style={{ display: 'flex' }}>
    <NestedSymbol
      name="Nested Symbol"
      style={{ width: 75, height: 150 }}
      overrides={{
        'Red Square Instance': BlueSquareSymbol,
        'Blue Square Text': 'Text override',
        Photo: 'https://pbs.twimg.com/profile_images/833785170285178881/loBb32g3.jpg',
      }}
    />
  </Artboard>
);

export default (context) => {
  render(<Document />, context.document.currentPage());
}
```

### `injectSymbols(context)`
Injects the symbols into Sketch's symbol page. **Call this before rendering**.

```js
const BlueSquare = () => (
  <View
    name="Blue Square"
    style={{ width: 100, height: 100, backgroundColor: 'blue' }}
  />
);

const BlueSquareSymbol = makeSymbol(BlueSquare);

const Document = () => (
  <Artboard>
    <BlueSquareSymbol />
  </Artboard>
);

export default (context) => {
  injectSymbols(context);
  render(<Document />, context.document.currentPage());
}
```
