# react-sketch
[![Build Status](https://img.shields.io/travis/jongold/react-sketchapp.svg)](https://travis-ci.org/jongold/react-sketchapp)
[![npm](https://img.shields.io/npm/v/npm.svg)](https://www.npmjs.com/package/react-sketchapp)

Declarative bridge to Sketch.app.

WIP; not ready for public consumption yet!

## Running example scripts
Make sure Sketch automatically reloads plugins:
```
defaults write ~/Library/Preferences/com.bohemiancoding.sketch3.plist AlwaysReloadScript -bool YES
```

Clone & build the repo, and symlink the examples:
```
git clone git@github.com:jongold/react-sketchapp.git
cd react-sketchapp
npm install && npm run build:plugin
./symlink-plugin.sh
```

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

```
import { render } from 'react-sketchapp';

const document = () => (
  <artboard>
    <group>
      <rect x={10} y={10} height={10} width={10} />
      <oval x={10} y={10} height={10} width={10} />
      <text value='yoooo' />
    </group>
  </artboard>
);

const onRun = (context) => {
  render(document, context, (element) => {
    console.log(element)
  });
};
```

## Documentation
WIP!
```
<artboard />
type Artboard = {
  name?: string,
  children?: any,
  paddingTop?: number,
  paddingRight?: number,
  paddingBottom?: number,
  paddingLeft?: number,
  backgroundColor?: string,
};

<rect />
export type Rect = {
  name?: string,
  x: number,
  y: number,
  width: number,
  height: number,
  radius?: number,
  locked?: boolean,
  backgroundColor?: string,
}

<oval />
export type Oval = {
  name?: string,
  x: number,
  y: number,
  width: number,
  height: number,
  locked?: boolean,
  backgroundColor?: string,
}

<group />
export type Group = {
  name?: string,
  x?: number,
  y?: number,
  locked?: boolean,
  clickThrough?: boolean,
  children: any[],
}

<text>
export type Text = {
  name?: string,
  value: string,
  uppercase?: boolean,
  fontFamily: string,
  fontSize: number,
  color?: string,
  lineHeight?: number,
  opacity?: number,
  x?: number,
  y?: number,
  letterSpacing?: number,
  align?: 'left' | 'right' | 'center' | 'full',
  locked?: boolean,
}
```

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

### Development
```
```
