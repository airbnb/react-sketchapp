import { FileFormat1 as FileFormat } from '@sketch-hq/sketch-file-format-ts';
import * as renderers from './renderers';
import { SketchRenderer } from './renderers/SketchRenderer';
import { TreeNode, PlatformBridge } from './types';

function missingRendererError(type: string, annotations?: string) {
  return new Error(
    `Could not find renderer for type '${type}'.${annotations ? `\n${annotations}` : ''}`,
  );
}

export const flexToSketchJSON = (bridge: PlatformBridge) => (
  node: TreeNode | string,
):
  | FileFormat.SymbolMaster
  | FileFormat.Artboard
  | FileFormat.Group
  | FileFormat.ShapeGroup
  | FileFormat.SymbolInstance => {
  if (typeof node === 'string') {
    throw missingRendererError('string');
  }
  const { type, children } = node;

  // Give some insight as to why there might be issues
  // specific to Page and Document components or SVG components
  if (type === 'sketch_document') {
    throw missingRendererError(
      type,
      'Be sure to only have <Page> components as children of <Document>.',
    );
  }

  // @ts-ignore
  const Renderer: typeof SketchRenderer | null = renderers[type];

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

  const renderer = new Renderer(bridge);
  const groupLayer = renderer.renderGroupLayer(node);

  if (groupLayer._class === 'symbolInstance') {
    return groupLayer;
  }

  const backingLayers = renderer.renderBackingLayers(node);

  // stopping the walk down the tree if we have an svg
  const curriedFlexToSketchJSON = flexToSketchJSON(bridge);
  const sublayers =
    children && type !== 'sketch_svg'
      ? children.map((child) => curriedFlexToSketchJSON(child))
      : [];

  // Filter out anything null, undefined
  const layers = [...backingLayers, ...sublayers].filter((l) => l);

  return { ...groupLayer, layers };
};
