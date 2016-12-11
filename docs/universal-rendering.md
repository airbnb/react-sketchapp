# Universal Rendering

Because `react-sketchapp` uses the same interfaces as `react-native`, we can render the same components across multiple platforms.

### Usage with react-primitives
[`react-primitives`](https://github.com/lelandrichardson/react-primitives) exposes a consistent interface across platforms.

```
npm install --save react-primitives
```

```javascript
/**
 * components/Row.js
 * Define your component using platform-independent primitives
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-primitives';

const Row = ({ props }) =>
  <View>
    <Text>{ props.title }</Text>
    <Text>{ props.description }</Text>
  </View>

// etc
export default Row;

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
