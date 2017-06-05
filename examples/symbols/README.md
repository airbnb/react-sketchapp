# Symbol Support

## How to use
Download the example or [clone the repo](http://github.com/airbnb/react-sketchapp):
```
curl https://codeload.github.com/airbnb/react-sketchapp/tar.gz/master | tar -xz --strip=2 react-sketchapp-master/examples/symbols
cd symbols
```

Install the dependencies
```
npm install
```

Run with live reloading in Sketch
```
npm run render
```

Or, to install as a Sketch plugin:
```
npm run build
npm run link-plugin
```
Then, open Sketch and navigate to `Plugins → react-sketchapp: Symbol Support`

## The idea behind the example

`react-sketchapp@^0.11.0` introduces an API for creating Sketch symbols — this example shows them in use with React components.