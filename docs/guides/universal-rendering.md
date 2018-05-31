# Universal Rendering
The `react-sketchapp` components have been architected to provide the same metaphors, layout system & interfaces as `react-native`, so there is less switching cost between platforms. However, it is also possible to render the _same code_ across multiple platforms. We call this _Universal Rendering_.

The [`react-primitives`](https://github.com/lelandrichardson/react-primitives) project provides consistent primitive interfaces across platforms, and is the simplest way to achieve Universal Rendering.

### Setup
React Primitives works out-of-the-box with `react-dom` & `react-native`, and `react-sketchapp` (when using `skpm`).

Install `react-primitives` and its peer dependencies
```
npm install --save react-primitives react react-dom react-native react-sketchapp
```

### Creating your components
Import base primitives from `react-primitives` rather than `react-sketchapp` / `react-native` — e.g.

```diff
/**
 * components/Row.js
 * Define your component using platform-independent primitives
 */
import React from 'react';
- import { View, Text, StyleSheet } from 'react-sketchapp';
+ import { View, Text, StyleSheet } from 'react-primitives';

const Row = props =>
  <View>
    <Text>{ props.title }</Text>
    <Text>{ props.subtitle }</Text>
  </View>

export default Row;
```

### Importing existing components
If you have a large existing React Native component library, you might enjoy using a codemod to automatically convert `react-native` imports to `react-primitives` — [a proof-of-concept codemod is provided on ASTExplorer](https://astexplorer.net/#/gist/68d1b3ae3ec7b0a088452a7d38643dc4/latest).

### Rendering

Each platform will require an entry point with its respective `render` / registration call - e.g:

```js
/**
  * dom-entry.js
  * Standard ReactDOM setup for the browser
  */
import React from 'react';
import { render } from 'react-dom';
import Row from './components/Row';

render(<Row title='Foo' subtitle='Bar' />, document.getElementById('root'));
```

```js
/**
 * native-entry.js
 * Standard ReactNative setup
 */
import React from 'react';
import { AppRegistry } from 'react-native';
import Row from './components/Row';

AppRegistry.registerComponent('Row', () => Row);
```

```js
/**
 * sketch-entry.js
 * same setup as other examples
 */
import React from 'react';
import { render } from 'react-sketchapp';
import Row from './components/Row';

export default (context) => {
  render(<Row title='Foo' subtitle='Bar' />, context.document.currentPage());
}
```

React Primitives only provides components that make sense on every platform, so Sketch-specific concepts like `TextStyles` and `<Artboard />` should be imported from the main `react-sketchapp` package. You can mix-and-match them as necessary - e.g.

```js
/**
 * sketch-entry.js
 * same setup as other examples
 */
import React from 'react';
import { Artboard, render } from 'react-sketchapp';
import Row from './components/Row'; // built with react-primitives

export default (context) => {
  render(<Artboard><Row title='Foo' subtitle='Bar' /></Artboard>, context.document.currentPage());
}
```
