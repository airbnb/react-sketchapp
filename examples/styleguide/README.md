# Styleguide

## How to use
Download the example or [clone the repo](http://github.com/airbnb/react-sketchapp):
```
curl https://codeload.github.com/airbnb/react-sketchapp/tar.gz/master | tar -xz --strip=2 react-sketchapp-master/examples/styleguide
cd styleguide
```

Install the dependencies
```
npm install
```

Then, open Sketch and navigate to `Plugins → react-sketchapp: Styleguide`

Run with live reloading in Sketch
```
npm run render
```

## The idea behind the example

The reason we started `react-sketchapp` was to build dynamic styleguides! This is an example showing how to quickly render rich styleguides from JavaScript design system definition. It uses `flow` to enforce correctness, and `chroma-js` to dynamically generate color contrast labels.

![examples-styleguide](https://cloud.githubusercontent.com/assets/591643/24778196/2a4ef41a-1ade-11e7-9805-8d974bbfd708.png)
