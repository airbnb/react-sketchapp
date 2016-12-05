/* @flow */
import type { SketchLayer } from '../types';

const group = (style: any, layout: any): SketchLayer => {
  const layer = MSLayerGroup.alloc().init();

  // NOTE:
  // in sketch, borders with width are centered on the frame, so a border width of 10 will result
  // in 5 pixels of it being outside of the frame, and 5 being inside. The flexbox algorithm assumes
  // box-sizing: border-box, which includes border widths in the width/height calculations. As a
  // result, we want to add half of the border width to the top/left.
  const borderWidth = style.borderWidth || 0;
  layer.frame().setX(layout.left + (borderWidth / 2));
  layer.frame().setY(layout.top + (borderWidth / 2));
  layer.frame().setWidth(layout.width - borderWidth);
  layer.frame().setHeight(layout.height - borderWidth);
  return layer;
};

module.exports = group;
