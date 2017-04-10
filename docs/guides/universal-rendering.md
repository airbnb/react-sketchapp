# Universal Rendering

## React Primitives
[`react-primitives`](https://github.com/lelandrichardson/react-primitives) provides consistent primitive interfaces across platforms. It can be used to render identical components to the browser, mobile and Sketch.

### Setup
React Primitives works out-of-the-box with `react-dom` & `react-native`. For Sketch, a little bit of setup is required.

Install `react-primitives` and its peer dependencies
```
npm install --save react-primitives react react-dom react-native react-sketchapp
```

Set up your module bundler to favor `.sketch.js` files — e.g. in your `webpack.config.js`.
```diff
 module.exports = {
+  resolve: {
+    extensions: ['.sketch.js', '.js']
+  },
 }
```

Rollup configuration is similar -
```diff
+const resolve = require('rollup-plugin-node-resolve');
+const commonjs = require('rollup-plugin-commonjs');
+
+module.exports = {
+  plugins: [
+    resolve({
+      jsnext: true,
+      main: true,
+      browser: true,
+      extensions: ['.sketch.js', '.js'],
+    }),
+    commonjs({
+      ignoreGlobal: false,
+      namedExports: {
+        'node_modules/react/react.js': ['PropTypes'],
+        'node_modules/react-primitives/lib/main.js': [
+          'Text',
+          'Animated',
+          'StyleSheet',
+          'View',
+          'Image',
+          'Touchable',
+          'Platform',
+        ],
+      },
+    }),
+  ],
+};
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
    <Text>{ props.description }</Text>
  </View>

export default Row;
```

### Insertion

Each platform will require an entry point with its respective `render` call - e.g:

```js
/**
  * dom-entry.js
  * Standard ReactDOM setup for the browser
  */
import React from 'react';
import { render } from 'react-dom';
import Row from './components/Row';

render(<Row title='Foo' subtitle='Bar' />, document.getElementById('root'));

/**
 * native-entry.js
 * Standard ReactNative setup
 */
import React from 'react';
import { AppRegistry } from 'react-native';
import Row from './components/Row';

AppRegistry.registerComponent('Row', () => Row);

/**
 * sketch-entry.js
 * same setup as other examples
 */
import React from 'react';
import { render } from 'react-sketchapp';
import Row from './components/Row';

const onRun = (context) =>
  render(<Row title='Foo' subtitle='Bar' />, context.document.currentPage());

module.exports = onRun;
```

You can also use platform-specific components as appropriate - e.g.
```js
/**
 * sketch-entry.js
 * same setup as other examples
 */
import React from 'react';
import { Artboard, render } from 'react-sketchapp';
import Row from './components/Row'; // built with react-primitives

const onRun = (context) =>
  render(<Artboard><Row title='Foo' subtitle='Bar' /></Artboard>, context.document.currentPage());

module.exports = onRun;
```
```
