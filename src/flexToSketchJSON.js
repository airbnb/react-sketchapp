/* @flow */
import renderers from './renderers';
import type { TreeNode } from './types';

const flexToSketchJSON = (node: TreeNode) => {
  const { type, style, textStyle, layout, props, children } = node;
  const Renderer = renderers[type];
  if (Renderer == null) {
    // Give some insight as to why there might be issues
    // specific to Page and Document components or SVG components
    const additionalNotes =
      type === 'document'
        ? '\nBe sure to only have <Page> components as children of <Document>.'
        : type.indexOf('svg') === 0
          ? '\nBe sure to always have <Svg.*> components as children of <Svg>.'
          : '';
    throw new Error(
      `Could not find renderer for type '${type}'. ${additionalNotes}`
    );
  }

  const renderer = new Renderer();
  const groupLayer = renderer.renderGroupLayer(layout, style, textStyle, props);
  const backingLayers = renderer.renderBackingLayers(
    layout,
    style,
    textStyle,
    props,
    children
  );

  const sublayers =
    type !== 'svg' ? children.map(child => flexToSketchJSON(child)) : [];

  // Filter out anything null, undefined
  const layers = [...backingLayers, ...sublayers].filter(l => l);

  return { ...groupLayer, layers };
};

export default flexToSketchJSON;
