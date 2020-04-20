# Getting Started

You can create a `react-sketchapp` project with `skpm`, by cloning a ready-made [example](../examples.md), or by manually setting up the `package.json` and `manifest.json` scripts (advanced usage).

## Environment Setup

You will need npm, Node and Sketch.

- Terminal (if you’re new to the command line, this [guide](https://medium.com/32pixels/the-designers-guide-to-the-osx-command-prompt-71b0016cac31) may help)
  - You need to make sure `git` is installed – type `git --version` in your Terminal to check if it's installed, if it isn’t, you should be prompted to install via “command line developer tools”.
- Code editor e.g. [VSCode](https://code.visualstudio.com/), [Atom](https://atom.io/)
- Node.js & `npm` – [install with Homebrew](https://nodejs.org/en/download/package-manager/#macos) (or install with [Node Version Manager](https://nodejs.org/en/download/package-manager/#nvm))
- [Sketch](https://www.sketch.com/)
  - requires macOS

## Creating a Project With Skpm

**Replace** `my-app` with your desired project name:

### Installation

```bash
npm install --global skpm
skpm create my-app --template=airbnb/react-sketchapp # template is a GitHub repo
cd my-app
```

### Setup

You can now open `my-app` in your code editor of choice. You will see a `src` folder with a `manifest.json` file and Sketch entrypoint (e.g. `my-command.js`). If you wish to rename `my-command.js`, you can do so and update the file name in `script` in `manifest.json`

Example modifications (assuming we want to rename the entrypoint file to `main.js` and don't want to have sub-commands):

`src/manifest.json`

```diff
  "commands": [
    {
-      "name": "my-command",
+      "name": "My App Name: Sketch Components"
-      "identifier": "my-command-identifier",
+      "identifier": "main",
-      "script": "./my-command.js"
+      "script": "./main.js"
    }
  ],
  "menu": {
-    "title": "my-app",
-    "items": [
-      "my-command-identifier"
-    ]
+    "isRoot": true,
+    "items": [
+      "main"
+    ]
+  }
  }
```

### Rendering to Sketch

To render your app to Sketch, open the Sketch application, create a new blank document, then go to your Terminal and run:

```bash
# Make sure you've already done `cd my-app`
npm run render
```

You can pass the target Sketch container layer (i.e. document, group or page object) to the `render` function in your Sketch plugin entrypoint file, using the Sketch API: `render(<App />, sketch.getSelectedDocument()`.

For more info on rendering to Sketch, see the [rendering](./rendering.md) page.
