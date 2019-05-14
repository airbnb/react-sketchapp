// @flow
import * as renderers from './renderers';
import type { TreeNode } from './types';

function missingRendererError(type: string, annotations?: string) {
  return new Error(
    `Could not find renderer for type '${type}'.${annotations ? `\n${annotations}` : ''}`,
  );
}

const flexToSketchJSON = (node: TreeNode) => {
  const { type, style, textStyle, layout, props, children } = node;

  // Give some insight as to why there might be issues
  // specific to Page and Document components or SVG components
  if (type === 'document') {
    throw missingRendererError(
      type,
      'Be sure to only have <Page> components as children of <Document>.',
    );
  }

  const Renderer = renderers[type];
  if (Renderer == null) {
    if (type.indexOf('svg') === 0) {
      // the svg renderer should stop the walk down the tree so it shouldn't happen
      throw missingRendererError(
        type,
        'Be sure to always have <Svg.*> components as children of <Svg>.',
      );
    }
    throw missingRendererError(type);
  }

  const renderer = new Renderer();
  const groupLayer = renderer.renderGroupLayer(layout, style, textStyle, props);
  const backingLayers = renderer.renderBackingLayers(layout, style, textStyle, props, children);

  // stopping the walk down the tree if we have an svg
  const sublayers =
    children && type !== 'svg' ? children.map(child => flexToSketchJSON(child)) : [];

  // Filter out anything null, undefined
  const layers = [...backingLayers, ...sublayers].filter(l => l);

  return { ...groupLayer, layers };
};

export default flexToSketchJSON;
