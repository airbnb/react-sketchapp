# Basic Webpack example

## How to use
Download the example or [clone the repo](http://github.com/airbnb/react-sketchapp):
```
curl https://codeload.github.com/airbnb/react-sketchapp/tar.gz/master | tar -xz --strip=2 react-sketchapp-master/examples/colors
cd colors
```

Install the dependencies, build, and link
```
npm install
npm run build
npm run link-plugin
```

Then, open Sketch and navigate to `Plugins → react-sketchapp: Generative Colors`

## The idea behind the example

Using Webpack to build `react-sketchapp` apps requires a little bit of configuration - use this as an example.
