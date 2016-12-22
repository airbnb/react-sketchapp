<a href="https://github.com/jongold/react-sketchapp">
  <img alt="react-sketchapp" src="./docs/assets/logo-stijl@2x.png" height="72px" />
</a>
<br />

[![npm](https://img.shields.io/npm/v/react-sketchapp.svg)](https://www.npmjs.com/package/react-sketchapp)
[![CircleCI](https://circleci.com/gh/jongold/react-sketchapp.svg?style=shield&circle-token=6a90e014d72c4b27b87b0fc43ec4590117b466fc)](https://circleci.com/gh/jongold/react-sketchapp)
<!--[![Build Status](https://img.shields.io/travis/jongold/react-sketchapp.svg)](https://travis-ci.org/jongold/react-sketchapp)-->

- 🦄 Render React components to Sketch.app!
- 🦄 Use flexbox for layout!
- 🦄 Build Sketch documents with real data!
- 🦄 Share styles & components between platforms!

## Motivation
`react-sketchapp` evolved out of our need to generate high-quality, consistent Sketch assets for our design system at Airbnb. Wrapping Sketch’s imperative API is a pragmatic solution for consistent & predictable rendering. By using the same component API as `react-native`—`<View />`, `<Text />`, `<Image />` instead of `<Rect />`, `<Oval />` etc—we can use the same layout algorithms and components across multiple platforms.

Existing plugins try to go from Sketch to the browser (CSS, HTML, sometimes even components) — for our use case this is the wrong model. By inverting the system we can keep our source of truth in code, and treat Sketch as a pure render function.

## Running example scripts
Make sure Sketch automatically reloads plugins:
```bash
defaults write ~/Library/Preferences/com.bohemiancoding.sketch3.plist AlwaysReloadScript -bool YES
```

Clone & build the repo, and symlink the examples:
```bash
git clone git@github.com:jongold/react-sketchapp.git && cd react-sketchapp
npm install && npm run build:plugin
./symlink-plugin.sh
```

Open Sketch; examples will be in `Plugins → react-example`.
