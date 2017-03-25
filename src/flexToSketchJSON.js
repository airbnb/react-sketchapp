/* @flow */
import renderers from './renderers';
import type { TreeNode } from './types';

const flexToSketchJSON = (node: TreeNode) => {
  const { type, style, textStyle, layout, value, props, children } = node;
  const Renderer = renderers[type];
  if (Renderer == null) {
    throw new Error(`Could not find renderer for type '${type}'`);
  }

  const renderer = new Renderer();
  const groupLayer = renderer.renderGroupLayer(layout, style, textStyle, props, value);
  const backingLayers = renderer.renderBackingLayers(layout, style, textStyle, props, value);

  const sublayers = children.map(child => flexToSketchJSON(child));

  // Filter out anything null, undefined
  const layers = [...backingLayers, ...sublayers].filter(l => l);

  return { ...groupLayer, layers };
};

export default flexToSketchJSON;
