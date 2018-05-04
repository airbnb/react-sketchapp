/* @flow */
import renderers from './renderers';
import type { TreeNode } from './types';

const flexToSketchJSON = (node: TreeNode) => {
  const {
    type, style, textStyle, layout, props, children,
  } = node;
  const Renderer = renderers[type];
  if (Renderer == null) {
    // Give some insight as to why there might be issues
    // specific to Page and Document components or SVG components
    let additionalNotes = '';
    if (type === 'document') {
      additionalNotes = '\nBe sure to only have <Page> components as children of <Document>.';
    } else if (type.indexOf('svg') === 0) {
      // the svg renderer should stop the walk down the tree so it shouldn't happen
      additionalNotes = '\nBe sure to always have <Svg.*> components as children of <Svg>.';
    }
    throw new Error(`Could not find renderer for type '${type}'. ${additionalNotes}`);
  }

  const renderer = new Renderer();
  const groupLayer = renderer.renderGroupLayer(layout, style, textStyle, props);
  const backingLayers = renderer.renderBackingLayers(layout, style, textStyle, props, children);

  // stopping the walk down the tree if we have an svg
  const sublayers = type !== 'svg' ? children.map(child => flexToSketchJSON(child)) : [];

  // Filter out anything null, undefined
  const layers = [...backingLayers, ...sublayers].filter(l => l);

  return { ...groupLayer, layers };
};

export default flexToSketchJSON;
