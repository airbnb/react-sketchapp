/* @flow */
import drawGroup, { addLayerToGroup } from './bridge/group';
import drawArtboard from './bridge/artboard';
import drawOval from './bridge/oval';
import drawRectangle from './bridge/rectangle';
import drawText from './bridge/text';
import type { Artboard } from './bridge/artboard';
import type { Group } from './bridge/group';
import type { Oval } from './bridge/oval';
import type { Rect } from './bridge/rectangle';
import type { Text } from './bridge/text';
import type { Dictionary, SketchNode } from './types';

type f = (p: any, props: any) => any;
type Hash = Dictionary<string, f>;
const elements: Hash = {
  // page(parent: SketchNode, props) { return null; }

  artboard(parent: SketchNode, props: Artboard) {
    const layer = drawArtboard({
      ...props,
      children: [],
    });
    return layer;
  },

  group(parent: SketchNode, props: Group) {
    const layer = drawGroup({
      ...props,
      children: [],
    });
    if (parent) {
      addLayerToGroup(parent, layer);
    }
    return layer;
  },

  rect(parent: SketchNode, props: Rect) {
    const layer = drawRectangle(props);
    if (parent) {
      addLayerToGroup(parent, layer);
    }
    return layer;
  },

  oval(parent: SketchNode, props: Oval) {
    const layer = drawOval(props);
    if (parent) {
      addLayerToGroup(parent, layer);
    }
    return layer;
  },

  text(parent: SketchNode, props: Text) {
    const layer = drawText(props);

    if (parent) {
      addLayerToGroup(parent, layer);
    }
    return layer;
  },
};

export default elements;
