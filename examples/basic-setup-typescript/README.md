# Basic setup with Typescript

> **NOTE:** you may also use the typings *without* using typescript if you editor supports it. [See here](../../docs/guides/community-provided-tooling.md).

## How to use
Download the example or [clone the repo](http://github.com/airbnb/react-sketchapp):
```
curl https://codeload.github.com/airbnb/react-sketchapp/tar.gz/master | tar -xz --strip=2 react-sketchapp-master/examples/basic-setup-typescript
cd basic-setup-typescript
```

Install the dependencies
```
npm install
```

Run with live reloading in Sketch, need a new sketch doc open
```
npm start
```

> **NOTE:** If you're on windows you may need to run the following commands in different command-prompt windows:

This starts the typescript compiler in watch mode:

```
npm run typescript
```

And this starts skpm in watch mode:

```
npm run render
```

## How the typescript works

This example compiles the typescript into javascript that can be used by `skpm`. The compiled typescript files get output into the `.ts-compiled` directory. The `manifest.json` of `skpm` then simply points to the compiled javascript. To get live re-loading working, use the typescript compiler in watch mode. Whenever you save a typescript file, the typescript compiler will output javascript to the `.ts-compiled` directory. Once `skpm` notices the javascript file in `.ts-compiled` changes, it will re-build and re-render.

Here is a reference `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "es2015",
    "module": "es2015",
    "jsx": "preserve",
    "strict": true,
    "outDir": "./.ts-compiled",
    "rootDir": "./src",
    "allowSyntheticDefaultImports": true
  },
  "include": [
    "./src/**/*"
  ]
}
```

## The idea behind the example

[`skpm`](https://github.com/sketch-pm/skpm) is the easiest way to build `react-sketchapp` projects - this is a minimal example of it in use.

![examples-basic](https://cloud.githubusercontent.com/assets/591643/24778192/1f0684ec-1ade-11e7-866b-b11bb60ac109.png)
