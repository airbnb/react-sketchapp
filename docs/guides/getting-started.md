# Getting Started

You can create a `react-sketchapp` project with `skpm`, by cloning a ready-made [example](../examples.md), or by manually setting up the `package.json` and `manifest.json` scripts (advanced usage).

## Environment Setup

You will need npm, Node and Sketch.

- Code editor e.g. [VSCode](https://code.visualstudio.com/), [Atom](https://atom.io/)
- Node.js & `npm` – [install with Homebrew](https://nodejs.org/en/download/package-manager/#macos) (or install with [Node Version Manager](https://nodejs.org/en/download/package-manager/#nvm))
- [Sketch](https://www.sketch.com/)
  - requires macOS

## Creating a Project With Skpm

**Replace** `my-app` with your desired project name:

### Installation

```bash
npm i -g skpm
skpm create my-app --template=airbnb/react-sketchapp # template is a GitHub repo
cd my-app
```

### Setup

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
// Make sure you've already done `cd my-app`
npm run render
```

If you forget to create a new document, you may get an error saying `null is not an object`. You can handle this case with the instructions below:

### Rendering to Multiple Pages or New Documents

`src/my-command.js` (or whatever file you may have renamed it to).

```js
import React from 'react';
import { render } from 'react-sketchapp';

import { render, Document, Page } from 'react-sketchapp';

const App = () => (
  <Document>
    <Page name="Page 1">
      <Artboard>
        <Text>Hello World!</Text>
      </Artboard>
    </Page>
    <Page name="Page 2">
      <Artboard>
        <Text>Hello World, again!</Text>
      </Artboard>
    </Page>
  </Document>
);

export default () => {
  const documents = sketch.getDocuments();
  const document =
    Array.isArray(documents) && documents.length >= 1 // if there are any open documents
      ? documents[0] // select the last active document
      : new sketch.Document(); // or create a new document

  render(<App />, document);
};
```

Here are some examples of retrieving our desired target document:

**Get selected document**

```js
const sketch = require('sketch');

export default () => {
  const document = sketch.getSelectedDocument();

  render(<App />, document);
};
```

**Get document by name**

```js
const sketch = require('sketch');

const getDocumentByName = name => {
  return (sketch.getDocuments() || []).find(doc => {
    const nativeDoc = doc.sketchObject || {};
    // (unstable/native API)
    const name = nativeDoc.displayName ? nativeDoc.displayName() : '';
    if (name.trim() === name) {
      return doc;
    }
  });
};

export default () => {
  const document = getDocumentByName('My App Design') || new sketch.Document(); // Fallback to new document if document not found

  render(<App />, document);
};
```
