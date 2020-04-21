# API Reference

- [`render`](#renderelement-container)
- [`renderToJSON`](#rendertojsonelement)
- [Components](#components)
  - [`<Document>`](#document)
  - [`<Page>`](#page)
  - [`<Artboard>`](#artboard)
  - [`<Image>`](#image)
  - [`<RedBox>`](#redbox)
  - [`<Svg>`](#svg)
  - [`<Text>`](#text)
  - [`<View>`](#view)
- [`Hooks`](#hooks)
  - [`useWindowDimensions`](#usewindowdimensions)
- [`Platform`](#platform)
  - [`OS`](#os)
  - [`Version`](#version)
  - [`select`](#selectobj)
- [`StyleSheet`](#stylesheet)
  - [`hairlineWidth`](#hairlinewidth)
  - [`absoluteFill`](#absolutefill)
  - [`create`](#createstyles)
  - [`flatten`](#flattenstyles)
  - [`resolve`](#resolvestyle)
- [`TextStyles`](#textstyles)
  - [`create`](#createstyleoptionsstyles)
  - [`resolve`](#resolvestyle)
- [`Symbols`](#symbols)
  - [`makeSymbol`](#makesymbolnode-props-document)

### `render(element, container)`

Returns the top-level rendered Sketch object or an array of Sketch objects if you use `<Page>` components.

#### Parameters

##### `element` (required)

Top-level React component that defines your Sketch document.

Example:

```js
<Document>
  <Page name="Mobile">
    <Artboard name="iPhone">
      <View>
        <Text>Hello World</Text>
      </View>
    </Artboard>
  </Page>
</Document>
```

##### `container` (optional)

The element to render into - will be replaced. Should either be a Sketch [Document](https://developer.sketchapp.com/reference/api/#document), Sketch [Group](https://developer.sketchapp.com/reference/api/#group) or Sketch [Page](https://developer.sketchapp.com/reference/api/#page) Object.

Example: `sketch.getSelectedDocument().selectedPage`.

#### Returns

The top-most rendered native Sketch layer.

#### Example

```js
import sketch from 'sketch';
import { View, Text, render } from 'react-sketchapp';

const Document = props => (
  <View>
    <Text>Hello world!</Text>
  </View>
);

export default () => {
  render(<Document />, sketch.getSelectedDocument().selectedPage);
};
```

### `renderToJSON(element)`

Returns a Sketch JSON object for further consumption - doesn't add to the page.

#### Parameters

##### `element` (required)

Top-level React component that defines your Sketch document.

#### Returns

The top-most Sketch layer as JSON.

## Components

### `<Document>`

Wrapper for Sketch's Documents. Must be used at the root of your application and is required if you would like to have multiple pages.

#### Props

| Prop       | Type   | Default | Note                                     |
| ---------- | ------ | ------- | ---------------------------------------- |
| `children` | `Node` |         | Can only be [`<Page>`](#page) components |

#### Example

```js
<Document>
  <Page>
    <Text>Hello world!</Text>
  </Page>
  <Page>
    <Text>Hello second world!!</Text>
  </Page>
</Document>
```

### `<Page>`

Wrapper for Sketch's Pages. Requires a [`<Document>`](#document) component as a parent if you would like to use multiple of these components.

#### Props

| Prop       | Type     | Default | Note                                             |
| ---------- | -------- | ------- | ------------------------------------------------ |
| `name`     | `String` |         | The name to be displayed in the Sketch Page List |
| `children` | `Node`   |         |                                                  |

#### Example

```js
<Page name="My Page">
  <Text>Hello world!</Text>
</Page>
```

### `<Artboard>`

Wrapper for Sketch's Artboards. Requires a [`<Page>`](#page) component as a parent if you would like to use multiple of these components.

#### Props

| Prop | Type | Default | Note |
| --- | --- | --- | --- |
| `name` | `String` |  | The name to be displayed in the Sketch Layer List |
| `children` | `Node` |  |  |
| `style` | [`Style`](/docs/styling.md) |  |  |
| `viewport` | `Viewport` |  | Object: { name: string, width: number, height: number, scale?: number, fontScale?: number } |
| `isHome` | `Boolean` |  | Is prototype home screen if true |

The `scale` and `fontScale` attributes in the `viewport` prop are not used by Sketch, but can be used together with the [`useWindowDimensions`](#usewindowdimensions) hook for conditional styling/rendering.

#### Examples

Hello world with width of 480px.

```js
<Artboard
  name="My Artboard"
  style={{
    width: 480,
  }}
>
  <Text>Hello world!</Text>
</Artboard>
```

Mobile screen artboard with viewport preset (supports scrolling in prototypes).

```js
<Artboard
  name="Home/Mobile"
  style={{
    width: 360,
    height: 1280,
  }}
  viewport={{
    name: 'Mobile',
    width: 360,
    height: 640,
  }}
>
  <Text>Hello world!</Text>
</Artboard>
```

### `<Image>`

#### Props

| Prop         | Type                        | Default   | Note |
| ------------ | --------------------------- | --------- | ---- |
| `children`   | `Node`                      |           |      |
| `source`     | `ImageSource`               |           |      |
| `style`      | [`Style`](/docs/styling.md) |           |      |
| `resizeMode` | `ResizeMode`                | `contain` |      |

```js
type ImageSource = string | { src: string };
type ResizeMode = 'contain' | 'cover' | 'stretch' | 'center' | 'repeat' | 'none';
```

#### Example

```js
<Image
  source="http://placekitten.com/400"
  resizeMode="contain"
  style={{
    height: 400,
    width: 400,
  }}
/>
```

### `<RedBox>`

A red box / 'red screen of death' error handler. Thanks to [commissure/redbox-react](https://github.com/commissure/redbox-react).

#### Props

| Prop | Type | Default | Note |
| --- | --- | --- | --- |
| `error` | [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) | **required** | A JavaScript Error object |

#### Example

```js
import sketch from 'sketch';
import { RedBox, render } from 'react-sketchapp';

export default () => {
  const { selectedPage } = sketch.getSelectedDocument();
  try {
    render(<BrokenComponent />, selectedPage);
  } catch (err) {
    render(<RedBox error={err} />, selectedPage);
  }
};
```

### `<Svg>`

SVG Interface to Sketch

The API is based on [`react-native-svg`](https://github.com/react-native-community/react-native-svg). See more information on [its README](https://github.com/react-native-community/react-native-svg#Usage).

#### Example

```js
import sketch from 'sketch';
import { Svg, render } from 'react-sketchapp';

export default () => {
  render(
    <Svg xmlns="http://www.w3.org/2000/svg" width="494" height="447" viewBox="0 0 494 447">
      <Svg.G fill="none" fillRule="evenodd">
        <Svg.Path fill="#FFAE00" d="M247 447L0 160 107 15 247 0l140 15 107 145" />
        <Svg.Path fill="#EC6C00" d="M247 447L0 160h494" />
        <Svg.Path fill="#FFAE00" d="M247 447L100 160h294" />
        <Svg.Path fill="#FFEFB4" d="M247 0L100 160h294" />
        <Svg.Path fill="#FFAE00" d="M107 15L52 88 0 160h101M387 15l55 73 52 72H393" />
        <Svg.Path fill="#FED305" d="M107 15l-7 145L247 0m140 15l7 145L247 0" />
      </Svg.G>
    </Svg>,
    sketch.getSelectedDocument().selectedPage,
  );
};
```

#### Direct imports

Additionally, to have a somewhat more compliant mode to the `react-native-svg` API, the SVG components might as well be imported directly:

```js
import sketch from 'sketch';
import { render } from 'react-sketchapp';
import Svg, { G, Path } from 'react-sketchapp/lib/components/Svg';

export default () => {
  render(
    <Svg xmlns="http://www.w3.org/2000/svg" width="494" height="447" viewBox="0 0 494 447">
      <G fill="none" fillRule="evenodd">
        <Path fill="#FFAE00" d="M247 447L0 160 107 15 247 0l140 15 107 145" />
        <Path fill="#EC6C00" d="M247 447L0 160h494" />
        <Path fill="#FFAE00" d="M247 447L100 160h294" />
        <Path fill="#FFEFB4" d="M247 0L100 160h294" />
        <Path fill="#FFAE00" d="M107 15L52 88 0 160h101M387 15l55 73 52 72H393" />
        <Path fill="#FED305" d="M107 15l-7 145L247 0m140 15l7 145L247 0" />
      </G>
    </Svg>,
    sketch.getSelectedDocument().selectedPage,
  );
};
```

### `<Text>`

Text primitives

#### Props

| Prop | Type | Default | Note |
| --- | --- | --- | --- |
| `name` | `String` |  | The name to be displayed in the Sketch Layer List |
| `children` | `String` |  |  |
| `style` | [`Style`](/docs/styling.md) |  |  |

#### Example

```js
<Text
  name="Sketch Layer name"
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
| --- | --- | --- | --- |
| `name` | `String` |  | The name to be displayed in the Sketch Layer List |
| `children` | `Node` |  |  |
| `style` | [`Style`](/docs/styling.md) |  |  |
| `flow` | `Flow` |  | Object: { target: string, targetId: string, animationType: string } |

#### Examples

##### Example with children

```js
<View
  name="Sketch Layer name"
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

##### Example using `flow` prop for prototyping destination

```js
<Document>
  <Artboard name="Home">
    <View
      name="Menu Button"
      style={{
        height: 100,
        backgroundColor: '#01ffae',
      }}
      flow={{
        target: 'menu', // From <Artboard name" or can be "back"
        // targetId: uuid (can be used to reference existing artboards/uuids)
        // animationType: string (constants can be used from require('sketch') API, or hardcoded)
      }}
    >
      <Text>Open menu!</Text>
    </View>
  </Artboard>
  <Artboard name="Menu">
    <View name="Go back" flow={{ target: 'back' }} /* "back" used instead of <Artboard> id */>
      <Text>Go back!</Text>
    </View>
  </Artboard>
</Document>
```

## Hooks

### `useWindowDimensions()`

Returns the window dimensions of the parent `<Artboard>`. Returns `{ width: number, height: number, fontScale: number, scale: number }`.

#### Example

```js
import { Page, Artboard, View, Text, useWindowDimensions } from 'react-sketchapp';

const HomePage = () => {
  const { height, width } = useWindowDimensions();

  return (
    <View style={{ flex: 1 }}>
      <View style={{ height, width }}>
        <Text>Hello World</Text>
      </View>
      {(width >= 768) && (
        <View style={{ height, width, backgroundColor: 'blue' }}>
          <Text style={{ color: 'white' }}>
            You can only see this text on tablet/desktop
          </Text>
        </View>
      )}
    </View>
  );
};

const devices = [{
  name: 'Mobile',
  width: 360,
  height: 640,
}, {
  name: 'Tablet',
  width: 768
  height: 1024,
}, {
  name: 'Desktop',
  width: 1024
  height: 1280,
}];

render(
  <Page style={{ flexDirection: 'row' }}>
    {devices.map(viewport => (
      <Artboard viewport={viewport} style={{ marginRight: 80 }}>
        <HomePage />
      </Artboard>
    ))}
  </Page>,
);
```

## Platform

### `OS`

`sketch`

### `Version`

`1`

### `select(obj)`

#### Parameters

##### `obj`

## StyleSheet

Compared to single-use `style` objects, `StyleSheets` enable creation of re-usable, optimized style references.

### `hairlineWidth`

The platform's global 'hairline width'.

### `absoluteFill`

A constant 'absolute fill' style.

### `create(styles)`

Create an optimized `StyleSheet` reference from a style object.

#### Parameters

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
</View>;
```

### `flatten(styles)`

Flatten an array of style objects into one aggregated object, **or** look up the definition for a registered stylesheet.

#### Parameters

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

#### Parameters

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

### `create(styles, options)`

The primary interface to TextStyles. **Call this before rendering**.

#### Parameters

##### `styles` **(required)**

An object of JavaScript styles. The keys will be used as Sketch's Text Style names.

##### `options: { document, clearExistingStyles }`

###### `document`

The Sketch Document currently being rendered into.

###### `clearExistingStyles`

Clear any styles already registered in the document.

#### Example

```js
import sketch from 'sketch';
import { TextStyles, View, Text, render } from 'react-sketchapp';

export default () => {
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

  TextStyles.create(
    {
      context: context,
      clearExistingStyles: true,
    },
    typeStyles,
  );

  const Document = () => (
    <View>
      <Text style={typeStyles.Headline}>Headline text</Text>
      <Text style={typeStyles.Body}>Body text</Text>
    </View>
  );

  render(<Document />, sketch.getSelectedDocument().selectedPage);
};
```

### `resolve(style)`

Find a stored native Sketch style object for a given JavaScript style object. You probably don't need to use this.

#### Parameters

##### `style`

A JavaScript style

### `styles`

Find all of the registered styles. You probably don't need to use this.

### `get(name)`

Find a text style by _name_.

#### Parameters

##### `name`

The style name

#### Example

```js
import sketch from 'sketch';
import { TextStyles, View, Text, render } from 'react-sketchapp';

export default () => {
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

  TextStyles.create(
    {
      context: context,
      clearExistingStyles: true,
    },
    typeStyles,
  );

  const Document = () => (
    <View>
      <Text style={TextStyles.get('Headline')}>Headline text</Text>
      <Text style={TextStyles.get('Body')}>Body text</Text>
    </View>
  );

  render(<Document />, sketch.getSelectedDocument().selectedPage);
};
```

### `clear`

Reset the registered styles.

## Symbols

An interface to Sketch's symbols. Create symbols and optionally inject them into the symbols page.

### `makeSymbol(node, props, document)`

Creates a new symbol and injects it into the `Symbols` page. The name of the symbol can be optionally provided and will default to the display name of the component.

Returns a react component which is an can be used to render instances of the symbol.

#### Parameters

| Parameter | Type | Default | Note |
| --- | --- | --- | --- |
| `node` | `Node` |  | The node object that will be rendered as a symbol |
| `props` | `Object` | The node name | Optional name for the symbol, string can include backslashes to organize these symbols with Sketch. For example `squares/blue` |
| `props.name` | `String` | The node name | Optional name for the symbol, string can include backslashes to organize these symbols with Sketch. For example `squares/blue` |
| `props.style` | [`Style`](/docs/styling.md) |  |  |
| `document` | `Object` | The current document | The Sketch document to make the symbol in |

### `getSymbolComponentByName(name)`

Returns a react component which can be used to render the symbol instance that is associated with that name.

### `getSymbolMasterByName(name)`

Returns the JSON representation of the symbol master that is associated with that name.

### Symbol example

```js
import sketch from 'sketch';
import { View, makeSymbol, Artboard, render } from 'react-sketchapp';

const BlueSquare = () => (
  <View name="Blue Square" style={{ width: 100, height: 100, backgroundColor: 'blue' }} />
);

const BlueSquareSymbol = makeSymbol(BlueSquare);

const Document = () => (
  <Artboard>
    <BlueSquareSymbol />
  </Artboard>
);

export default () => {
  render(<Document />, sketch.getSelectedDocument().selectedPage);
};
```

### Text override example

Text overrides use the name parameter to target a specific Text primitive. When no name is given the value within the Text primitive can be used to override the value.

```js
import sketch from 'sketch';
import { View, Text, makeSymbol, Artboard, render } from 'react-sketchapp';

const BlueSquare = () => (
  <View name="Blue Square" style={{ width: 100, height: 100, backgroundColor: 'blue' }}>
    <Text>Blue Square Text</Text>
  </View>
);

const BlueSquareSymbol = makeSymbol(BlueSquare, 'squares/blue');

const Document = () => (
  <Artboard>
    <BlueSquareSymbol
      overrides={{
        'Blue Square Text': 'Override Text',
      }}
    />
  </Artboard>
);

export default () => {
  render(<Document />, sketch.getSelectedDocument().selectedPage);
};
```

### Image override example

Image overrides use the name parameter to target a specific Image primitive.

```js
import sketch from 'sketch';
import { View, Image, Artboard, makeSymbol, render } from 'react-sketchapp';

const BlueSquare = () => (
  <View name="Blue Square" style={{ width: 100, height: 100, backgroundColor: 'blue' }}>
    <Image name="Blue Square Image" source="https://hello.world/image.jpg" />
  </View>
);

const BlueSquareSymbol = makeSymbol(BlueSquare, 'squares/blue');

const Document = () => (
  <Artboard>
    <BlueSquareSymbol
      overrides={{
        'Blue Square Image': 'https://hello.world/different.jpg',
      }}
    />
  </Artboard>
);

export default () => {
  render(<Document />, sketch.getSelectedDocument().selectedPage);
};
```

#### Nested symbol + override example

```js
import sketch from 'sketch';
import { View, Text, makeSymbol, Image, Artboard, render } from 'react-sketchapp';

const RedSquare = () => (
  <View name="Red Square" style={{ width: 100, height: 100, backgroundColor: 'red' }}>
    <Text name="Red Square Text">Red Square</Text>
  </View>
);

const RedSquareSymbol = makeSymbol(RedSquare, 'squares/red');

const BlueSquare = () => (
  <View name="Blue Square" style={{ width: 100, height: 100, backgroundColor: 'blue' }}>
    <Text name="Blue Square Text">Blue Square</Text>
  </View>
);

const BlueSquareSymbol = makeSymbol(BlueSquare, 'squares/blue');

const Photo = () => (
  <Image
    name="Photo"
    source="https://pbs.twimg.com/profile_images/895665264464764930/7Mb3QtEB_400x400.jpg"
    style={{ width: 100, height: 100 }}
  />
);

const PhotoSymbol = makeSymbol(Photo);

const Nested = () => (
  <View name="Nested" style={{ display: 'flex', flexDirection: 'column', width: 75, height: 150 }}>
    <PhotoSymbol name="Photo Instance" style={{ width: 75, height: 75 }} />
    <RedSquareSymbol name="Red Square Instance" style={{ width: 75, height: 75 }} />
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

export default () => {
  render(<Document />, sketch.getSelectedDocument().selectedPage);
};
```
