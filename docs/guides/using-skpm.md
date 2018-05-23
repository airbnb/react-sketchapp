# Using `skpm` as a build system

Sketch allows arbitrary plugins written in [CocoaScript](http://developer.sketchapp.com/guides/cocoascript) to run. [`skpm`](https://github.com/skpm/skpm) is a utility to create, build and manage Sketch plugins. It takes care of transforming your JavaScript into CocoaScript and makes sure the context it is running in is as close as possible to what you are used to when writing JavaScript.

## Installation

> Important: Node.js > V6.x is a minimum requirement.

```bash
npm install -g skpm
```

## Usage

### Creating a new plugin

```bash
skpm create my-plugin --template=mathieudutour/skpm-sketchapp
```

> A note on templates
>
> The purpose of skpm templates are to provide opinionated development tooling setups so that users can get started with actual plugin code as fast as possible.
>
> * [`airbnb/react-sketchapp`](https://github.com/airbnb/react-sketchapp) is a simple template to get started with `react-sketchapp`
>
> 💁 Tip: Any Github repo with a 'template' folder can be used as a custom template: skpm create <project-name> --template=<username>/<repository>

### Build the plugin

Once the installation is done, you can run some commands inside the project folder:

```bash
npm run build
```

To watch for changes:

```bash
npm run watch
```

Additionally, if you wish to run the plugin every time it is built:

```bash
npm run render
```

### View the plugin's log

To view the output of your `console.log`, you have a few different options:

* Using the [sketch-dev-tools](https://github.com/skpm/sketch-dev-tools)
* Open Console.app and look for the sketch logs
* Look at the `~/Library/Logs/com.bohemiancoding.sketch3/Plugin Output.log` file

Skpm provides a convenient way to do the latter:

```
skpm log

  -f, -F        The `-f` option causes tail to not stop when end of file is
                reached, but rather to wait for additional data to be appended
                to the input.                       [boolean] [default: "false"]
  --number, -n  Shows `number` lines of the logs.                       [number]
```

## Custom Configuration

### Babel

To customize Babel, you have two options:

* You may create a [`.babelrc`](https://babeljs.io/docs/usage/babelrc) file in your project's root directory. Any settings you define here will overwrite matching config-keys within skpm preset. For example, if you pass a "presets" object, it will replace & reset all Babel presets that skpm defaults to.

* If you'd like to modify or add to the existing Babel config, you must use a `webpack.skpm.config.js` file. Visit the [Webpack](#webpack) section for more info.

### Webpack

To customize webpack create `webpack.skpm.config.js` file which exports function that will change webpack's config.

```js
/**
 * Function that mutates original webpack config.
 * Supports asynchronous changes when promise is returned.
 *
 * @param {object} config - original webpack config.
 * @param {boolean} isPluginCommand - wether the config is for a plugin command or a resource
 **/
module.exports = function (config, isPluginCommand) {
  /** you can change config here **/
}
```
