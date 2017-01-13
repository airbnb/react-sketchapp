# Universal Rendering

[`react-primitives`](https://github.com/lelandrichardson/react-primitives) exposes consistent primitive interfaces across platforms. We can use it to render the same components across multiple platforms.

```
npm install --save react-primitives
```

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

Then, render as usual.
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
 * same setup as examples in example-plugin/
 */
import React from 'react';
import { render } from 'react-sketchapp';
import Row from './components/Row';

const onRun = (context) =>
  render(<Row title='Foo' subtitle='Bar' />, context);

module.exports = onRun;
```
