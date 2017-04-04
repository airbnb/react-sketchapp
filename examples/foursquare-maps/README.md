# Foursquare + Google Maps

## How to use
Download the example or [clone the repo](http://github.com/airbnb/react-sketchapp):
```
curl https://codeload.github.com/airbnb/react-sketchapp/tar.gz/master | tar -xz --strip=2 react-sketchapp-master/examples/foursquare-maps
cd foursquare-maps
```

### Run it in Sketch
Install the dependencies, build, and link
```
npm install
npm run build
npm run link-plugin
```

Then, open Sketch and navigate to `Plugins → react-sketchapp: Foursquare + Google Maps → Run Plugin`

### Run it in your browser

Install the dependencies, start server, open browser.
```
npm install
npm start:web
```

## The idea behind the example

Creating maps with live data into Sketch is notoriously difficult — until now ;)

This example is created with `react-primitives` and renders simultaneously to Sketch & Web, and polyfills `fetch` in Sketch with [`sketch-module-fetch-polyfill`](https://github.com/mathieudutour/sketch-module-fetch-polyfill).
