/* @flow */
import ReactSketchMount from './ReactSketchMount';
// import * as ReactSketchComponents from './components';
import * as shared from './bridge';

// export * from './components';

export const sketchShared = shared;
export const render = ReactSketchMount.render;

const ReactSketch = {
  render,
  sketchShared,
  // ...ReactSketchComponents,
};

export default ReactSketch;
