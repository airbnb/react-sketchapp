# Basic setup with Typescript

This example was adapted from the [basic-setup example](../basic-setup).

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

Run with live reloading in Sketch, need a new sketch doc open. This will put both skpm and the Typescript compiler in watch mode:

```
npm run render
```

To clean the `.ts-compiled` directory, you can run:

```
npm run typescript:clean
```

## How the typescript works

This example compiles the typescript into javascript that can be used by `skpm`. The compiled typescript files get output into the `.ts-compiled` directory. The `manifest.json` of `skpm` then simply points to the compiled javascript. To get live re-loading working, use the typescript compiler in watch mode. Whenever you save a typescript file, the typescript compiler will output javascript to the `.ts-compiled` directory. Once `skpm` notices the javascript file in `.ts-compiled` changes, it will re-build and re-render.

Here is a reference `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "es2015",
    "module": "es2015",
    "jsx": "react-native",
    "allowJs": true,
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
