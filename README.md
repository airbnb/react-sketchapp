# react-sketch
[![Build Status](https://img.shields.io/travis/jongold/react-sketchapp.svg)](https://travis-ci.org/jongold/react-sketchapp)
[![npm](https://img.shields.io/npm/v/react-sketchapp.svg)](https://www.npmjs.com/package/react-sketchapp)

Declarative bridge to Sketch.app.

WIP; not ready for public consumption yet!

## Running example scripts
Make sure Sketch automatically reloads plugins:
```sh
defaults write ~/Library/Preferences/com.bohemiancoding.sketch3.plist AlwaysReloadScript -bool YES
```

Clone & build the repo, and symlink the examples:
```sh
git clone git@github.com:jongold/react-sketchapp.git
cd react-sketchapp
npm install && npm run watch:plugin
./symlink-plugin.sh
```

Open Sketch; examples will be in `Plugins -> react-example`.

## Using react-sketchapp
Check out:
```
webpack.config.js
example-plugin/
  *.js (raw sources)
react-example.sketchplugin
  Contents/
    Sketch/
      manifest.json
      *.js (compiled code)
```

You'll want to create a new repo, create a similar build process to ^^^, and implement your handler ~= this:

```jsx
import { render, Artboard, View, Text } from 'react-sketchapp';

const Document = () => (
  <Artboard>
    <View>
      <View
        style={{
          height: 10,
          width: 10,
          backgroundColor: '#333',
        }}
      />
      <Text
        style={{
          fontSize: 24,
          fontFamily: 'FontFoo-PostscriptName',
          //etc
        }}
        children='yoooo'
      />
    </View>
  </Artboard>
);

const onRun = (context) => {
  render(<Document />, context);
};
```

## Documentation
WIP, sorry. `<View />` & `<Text />` mirror their [`react-native`](https://github.com/facebook/react-native) /
[`react-primitives`](https://github.com/lelandrichardson/react-primitives)
counterparts - have fun with full flexbox layout.

## Further Reading & inspiration
### React Renderers
- [Dustan Kasten - tiny-react-renderer](https://github.com/iamdustan/tiny-react-renderer)

- [Dustan Kasten - react-hardware](https://github.com/iamdustan/react-hardware)

- [Dustan Kasten - React renderer directory](http://iamdustan.com/react-renderers/)

- [Gosha Arinich - Making custom renderers for React](http://goshakkk.name/react-custom-renderers/)

- [Flipboard - react-canvas](https://github.com/Flipboard/react-canvas)

- 🎥 [Jafar Husain — Beyond The DOM](https://www.youtube.com/watch?v=eNC0mRYGWgc)

### Sketch Plugins
- Creating custom UIs https://github.com/romannurik/sketch-nibuitemplateplugin

- Interacting with binaries https://github.com/abynim/Sketch-PluginHelper

- CocoaScript reference https://sketchplugindev.james.ooo/interacting-with-objective-c-classes-in-cocoascript-68be7f39616f#.e2fndxvpp

- Fluid for Sketch - provides a means to create constraint-based designs. Shows custom UI and interacts with a framework https://github.com/matt-curtis/Fluid-for-Sketch https://github.com/matt-curtis/Sketch-Plugin-Framework

- Create shapes from props https://github.com/elliotekj/specify
