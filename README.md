<img alt="react-sketchapp" src="./docs/assets/logo-stijl@2x.png" height="72px" />

A React renderer for [Sketch.app](https://www.sketchapp.com/) :atom_symbol: :gem:

[![npm](https://img.shields.io/npm/v/react-sketchapp.svg)](https://www.npmjs.com/package/react-sketchapp)
[![CircleCI](https://circleci.com/gh/jongold/react-sketchapp.svg?style=shield&circle-token=6a90e014d72c4b27b87b0fc43ec4590117b466fc)](https://circleci.com/gh/jongold/react-sketchapp)
![Sketch.app](https://img.shields.io/badge/Sketch.app-42-brightgreen.svg)

> This project is currently in **alpha and APIs are subject to change**. The source (& docs, oops) is private for now; it will be announced on <a href="jon.gold/txt">my mailing list</a> and <a href="http://twitter.com/jongold">Twitter</a> very soon :)

## Features

* **Declarative.** All the lessons we've learnt from the React model of programming. A comfortable layer over Sketch’s API.
* **Familiar.** Flexbox layouts. `react-native` components. You already know how to use `react-sketchapp`.
* **Data-based.** Pipe in real data from JSON files, APIs, and databases.
* **Universal.** Start from scratch, or use your existing component libraries

## Documentation

* [Usage](#usage)
* [FAQ](/docs/FAQ.md)
* [API Reference](/docs/API.md)
* [Styling](/docs/styling.md)
* [Universal Rendering](/docs/universal-rendering.md)
* [Troubleshooting](/docs/troubleshooting.md)

## Usage
`react-sketchapp` projects are implemented as [Sketch plugins](http://developer.sketchapp.com/). First, make sure you've disabled [Sketch's caching mechanism](http://developer.sketchapp.com/introduction/preferences#always-reload-scripts-before-running).
```
defaults write ~/Library/Preferences/com.bohemiancoding.sketch3.plist AlwaysReloadScript -bool YES
```

There are several ways to build Sketch plugins:

### The simple way
The simplest way to build Sketch plugins with modern JavaScript is [skpm](https://github.com/sketch-pm/skpm) 💎📦.

Install skpm, if you don't have it already, and create a new project.
```
npm install -g skpm
mkdir my-rad-sketch-plugin
cd my-rad-sketch-plugin
skpm init
skpm link .
```
Install some dependencies and set up JSX compilation
```
npm install --save react-sketchapp react react-test-renderer
npm install --save-dev babel-preset-react
echo '{"presets": ["react"]}' > .babelrc
```

Then, to build your plugin
```
skpm build --watch
```

And write your plugin in `src/my-command.js`
```js
import React from 'react';
import { render, Text, View } from 'react-sketchapp';

const Document = props =>
  <View>
    <Text>Hello world!</Text>
  </View>;

export default function (context) {
  render(<Document />, context);
}
```

Run your plugin in Sketch via `Plugins → [your plugin name] → my-command`.

Refer to the [skpm docs](https://github.com/sketch-pm/skpm) for more information.

### The manual way
Feel free to use whatever build process you're comfortable with — just [disable CocoaScript](http://developer.sketchapp.com/introduction/plugin-bundles/#disablecocoascriptpreprocessor) and you can use [react-native-packager](https://github.com/facebook/react-native/tree/master/packager), [rollup](http://rollupjs.org/), [webpack](https://webpack.github.io/) etc.

[`react-sketchapp-starter`](http://github.com/jongold/react-sketchapp-starter) is a minimal boilerplace to start developing with Webpack.

### Examples
`react-sketchapp` includes [a folder of examples](example-plugin/) showing how you might use it to work with a JavaScript [design system](example-plugin/designSystem.js).
* [Styleguide](example-plugin/Styleguide.js)
* [Twitter-style profiles](example-plugin/Test React.js)

Clone & build the repo, and symlink the examples:
```bash
git clone git@github.com:jongold/react-sketchapp.git && cd react-sketchapp
npm install && npm run build:plugin
./symlink-plugin.sh
```

Open Sketch; examples will be in `Plugins → react-example`.
