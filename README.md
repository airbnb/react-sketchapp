<img alt="react-sketchapp" src="./docs/assets/logo-stijl@2x.png" height="72px" />

A React renderer for [Sketch.app](https://www.sketchapp.com/) :atom_symbol: :gem:

[![npm](https://img.shields.io/npm/v/react-sketchapp.svg)](https://www.npmjs.com/package/react-sketchapp)
[![CircleCI](https://circleci.com/gh/jongold/react-sketchapp.svg?style=shield&circle-token=6a90e014d72c4b27b87b0fc43ec4590117b466fc)](https://circleci.com/gh/jongold/react-sketchapp)

## Features

* **Declarative.** All the lessons we've learnt from the React model of programming. A comfortable layer over Sketch’s API.
* **Familiar.** Flexbox layouts. `react-native` components. You already know how to use `react-sketchapp`.
* **Data-based.** Pipe in real data from JSON files, APIs, and databases.
* **Universal.** Start from scratch, or use your existing component libraries

## Documentation

* [Usage](#Usage)
* [FAQ](/docs/FAQ.md)
* [API Reference](/docs/API.md)
* [Styling](/docs/styling.md)
* [Universal Rendering](/docs/universal-rendering.md)
* [Troubleshooting](/docs/troubleshooting.md)

## Usage
Using [npm](https://www.npmjs.com/):
```bash
npm install --save react-sketchapp
```

`react-sketchapp` projects are implemented as [Sketch plugins](http://developer.sketchapp.com/). We recommend disabling CocoaScript, and using a module bundler like [webpack](https://webpack.github.io/) to compile into Sketch's plugin format.

```js
import { render, Text, View } from 'react-sketchapp';

const Document = props =>
  <View>
    <Text>Hello world!</Text>
  </View>;

const onRun = context =>
  render(<Document />, context);

module.exports = onRun;
```

[`react-sketchapp-starter`](http://github.com/jongold/react-sketchapp-starter) is a minimal boilerplace to start developing your own plugin.

### Examples
react-sketchapp includes [a folder of examples](example-plugin/). We use it internally when developing new features — it may change as we update the API.

Clone & build the repo, and symlink the examples:
```bash
git clone git@github.com:jongold/react-sketchapp.git && cd react-sketchapp
npm install && npm run build:plugin
./symlink-plugin.sh
```

Open Sketch; examples will be in `Plugins → react-example`.
