/* @flow */
import { addLayerToGroup, drawArtboard, drawRectangle, drawOval, drawGroup, drawText } from './shared';
import type { SketchNode } from './types';
import type { Artboard, Group, Rect, Oval, Text } from './shared';

const elements = {
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
