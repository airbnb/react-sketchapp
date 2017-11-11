# Foursquare + Google Maps

## How to use
Download the example or [clone the repo](http://github.com/airbnb/react-sketchapp):
```
curl https://codeload.github.com/airbnb/react-sketchapp/tar.gz/master | tar -xz --strip=2 react-sketchapp-master/examples/foursquare-maps
cd foursquare-maps
```

Install the dependencies
```
npm install
```

Then, open Sketch and navigate to `Plugins → react-sketchapp: Foursquare + Google Maps`

### Run it in Sketch
Run with live reloading in Sketch
```
npm run render
```

### Run it in your browser

```
npm run web
```

Open a browser to `http://localhost:3000`

## The idea behind the example

Creating maps with live data into Sketch is notoriously difficult — until now ;)

This example is created with `react-primitives` and renders simultaneously to Sketch & Web — maps are provided by [react-primitives-google-static-map](https://www.npmjs.com/package/react-primitives-google-static-map).

![foursquare-maps](https://cloud.githubusercontent.com/assets/591643/25052095/f666928e-2104-11e7-805c-a3c73ffcabcb.png)
