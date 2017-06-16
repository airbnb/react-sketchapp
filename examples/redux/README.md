# Basic setup

## How to use
Download the example or [clone the repo](http://github.com/airbnb/react-sketchapp):
```
curl https://codeload.github.com/airbnb/react-sketchapp/tar.gz/master | tar -xz --strip=2 react-sketchapp-master/examples/redux
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
Then, open Sketch and navigate to `Plugins → react-sketchapp: Redux`

## The idea behind the example

Redux is commonly used with React — this shows that it doesn't break. TODO: write a better README