import * as React from 'react';
import sketch from 'sketch';
import { render, Document, Page } from 'react-sketchapp';

import { App } from '../examples/src/main';

function getDoc(document) {
  return sketch.getSelectedDocument() || document;
}

test('should render examples', (context, document) => {
  const doc = getDoc(document);

  render(<App />, doc);

  const pageByName = doc.pages.reduce((acc, page) => {
    if (page.name) {
      acc[page.name] = page;
    }
    return acc;
  }, {});

  const expectedLayerNames = {
    'Basic Setup': 'Swatches',
    'Basic Svg': 'Sketch Logo',
    Colors: 'View',
    Emotion: 'View',
    'Form Validation': 'View',
  };

  for (const pageName in pageByName) {
    const page = pageByName[pageName];

    const layerName = page.layers[0].name;
    const expectedLayerName = expectedLayerNames[pageName];
    expect(layerName).toBe(expectedLayerName);
  }
});
