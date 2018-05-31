> This project is currently in **beta and APIs are subject to change**.

<div align="center">
  <img alt="react-sketchapp" src="https://cldup.com/MxSVEkc_gb.png" style="max-height:163px; width:100; height: auto; max-width:100%" />
</div>

<div align="center">
  <strong>render React components to Sketch; tailor-made for design systems</strong>
</div>

## Quickstart 🏃‍

First, make sure you have installed [Sketch](http://sketchapp.com) version 43+, & a recent [npm](https://nodejs.org/en/download/).

Open a new Sketch file, then in a terminal:

```bash
git clone https://github.com/airbnb/react-sketchapp.git
cd react-sketchapp/examples/basic-setup && npm install

npm run render
```

Next, [check out some more examples](https://github.com/airbnb/react-sketchapp/tree/master/examples)!

![readme-intro](https://cloud.githubusercontent.com/assets/591643/24777148/e742cd0e-1ad8-11e7-8751-090f6b2db514.png)

[![npm](https://img.shields.io/npm/v/react-sketchapp.svg)](https://www.npmjs.com/package/react-sketchapp)
![Sketch.app](https://img.shields.io/badge/Sketch.app-43--50-brightgreen.svg)
[![Travis](https://img.shields.io/travis/rust-lang/rust.svg)](https://travis-ci.org/airbnb/react-sketchapp)
[![Gitter](https://img.shields.io/gitter/room/nwjs/nw.js.svg)](https://gitter.im/react-sketchapp/Lobby)

## Why?!

Managing the assets of design systems in Sketch is complex, error-prone and time consuming. Sketch is scriptable, but the API often changes. React provides the perfect wrapper to build reusable documents in a way already familiar to JavaScript developers.

## What does the code look like?

```js
import * as React from 'react';
import { render, Text, Artboard } from 'react-sketchapp';

const App = props => (
  <Artboard>
    <Text style={{ fontFamily: 'Comic Sans MS', color: 'hotPink' }}>
      { props.message }
    </Text>
  </Artboard>
);

export default (context) => {
  render(<App message="Hello world!" />, context.document.currentPage());
}
```

## What can I do with it?

* **Manage design systems—** `react-sketchapp` was built for [Airbnb’s design system](http://airbnb.design/building-a-visual-language/); this is the easiest way to manage Sketch assets in a large design system
* **Use real components for designs—** Implement your designs in code as React components and render them into Sketch
* **Design with real data—** Designing with data is important but challenging; `react-sketchapp` makes it simple to fetch and incorporate real data into your Sketch files
* **Build new tools on top of Sketch—** the easiest way to use Sketch as a canvas for custom design tooling

Found a novel use? We'd love to hear about it!

[Read more about why we built it](http://airbnb.design/painting-with-code/)

## Documentation

* [Examples](http://airbnb.io/react-sketchapp/docs/examples.html)
* [API Reference](http://airbnb.io/react-sketchapp/docs/API.html)
* [Styling](http://airbnb.io/react-sketchapp/docs/styling.html)
* [Universal Rendering](http://airbnb.io/react-sketchapp/docs/guides/universal-rendering.html)
* [Data Fetching](http://airbnb.io/react-sketchapp/docs/guides/data-fetching.html)
* [FAQ](http://airbnb.io/react-sketchapp/docs/FAQ.html)
* [Contributing](http://airbnb.io/react-sketchapp/CONTRIBUTING.html)
