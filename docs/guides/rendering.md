# Rendering Guide

You can use the Sketch API to select Sketch containers such as documents, pages or groups, to pass through to the `render` function.

### Rendering to Multiple Pages or New Documents

`src/my-command.js` (or whatever file your Sketch plugin entrypoint is).

```js
import React from 'react';
import { render, Document, Page } from 'react-sketchapp';

// <Document> wrapper is required if you want to use multiple pages
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
    sketch.getSelectedDocument() || new sketch.Document(); // get the current document // or create a new document
};
```

## Rendering to Selected Document

This will render to the last active document. If there is no document open, document will be undefined and you will get an error, so you can add `|| new sketch.Document()` as a fallback to handle this.

```js
import sketch from 'sketch';
import { render } from 'react-sketchapp';

// const App = () => ... or import App from './App';

export default () => {
  const document = sketch.getSelectedDocument();

  render(<App />, document);
};
```

## Rendering to Document by Name

We can select a document by name, by looping through `sketch.getDocuments()` and checking `doc.path` inside the loop.

```js
import path from 'path';
import sketch from 'sketch';
import { render } from 'react-sketchapp';

// const App = () => ... or import App from './App';

const getDocumentByName = name => {
  return (sketch.getDocuments() || []).find(doc => {
    return doc.path && path.basename(doc.path, '.sketch') === name;
  });
};

export default () => {
  const document = getDocumentByName('My App Design') || new sketch.Document(); // Fallback to new document if document not found

  render(<App />, document);
};
```
