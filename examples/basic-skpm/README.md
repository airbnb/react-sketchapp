# Basic skpm example

## How to use
Download the example or [clone the repo](http://github.com/airbnb/react-sketchapp):
```
curl https://codeload.github.com/airbnb/react-sketchapp/tar.gz/master | tar -xz --strip=2 react-sketchapp-master/examples/basic-skpm
cd basic-skpm
```

Install the dependencies
```
npm install
```

Run with live reloading in Sketch
```
npm run render
```

To install as a Sketch plugin:
```
npm run build
npm run link-plugin
```
Then, open Sketch and navigate to `Plugins → react-sketchapp: Basic skpm Example`

## The idea behind the example

Using skpm to build `react-sketchapp` apps requires a little bit of configuration - use this as an example.
