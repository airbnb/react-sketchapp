# Basic setup

## How to use
Download the example or [clone the repo](http://github.com/airbnb/react-sketchapp):
```
curl https://codeload.github.com/airbnb/react-sketchapp/tar.gz/master | tar -xz --strip=2 react-sketchapp-master/examples/basic-setup
cd basic-setup
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
Then, open Sketch and navigate to `Plugins → react-sketchapp: Basic skpm Example`

## The idea behind the example

Using skpm to build `react-sketchapp` apps requires a little bit of configuration - use this as an example.

![examples-basic](https://cloud.githubusercontent.com/assets/591643/24778192/1f0684ec-1ade-11e7-866b-b11bb60ac109.png)