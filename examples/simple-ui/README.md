# Simple UI

## How to use
Download the example or [clone the repo](http://github.com/airbnb/react-sketchapp):
```
curl https://codeload.github.com/airbnb/react-sketchapp/tar.gz/master | tar -xz --strip=2 react-sketchapp-master/examples/simple-ui
cd simple-ui
```

Install the dependencies
```bash
npm install
```

To install as a Sketch plugin:
```bash
npm run build # or npm run watch
npm run link-plugin
```
Then, open Sketch and navigate to `Plugins → react-sketchapp: Simple UI`

## The idea behind the example

You can use CocoaScript to create UIs that pass data into react-sketchapp — this is a simple example building a UI with `NSAlert` and `NSTextField`.
![image](https://cloud.githubusercontent.com/assets/591643/26658949/2d565576-4622-11e7-9350-4b6aac7096b8.png)
