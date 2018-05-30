// @flow
import type { SJGroupLayer } from 'sketchapp-json-flow-types';
import { makeResizeConstraint } from './hacksForJSONImpl';
import { generateID, makeRect } from './models';
import type { ResizeConstraints } from '../types';

const layerGroup = (
  x: number,
  y: number,
  width: number,
  height: number,
  opacity: number,
  resizingConstraint?: ResizeConstraints,
): SJGroupLayer => ({
  _class: 'group',
  do_objectID: generateID(),
  exportOptions: {
    _class: 'exportOptions',
    exportFormats: [],
    includedLayerIds: [],
    layerOptions: 0,
    shouldTrim: false,
  },
  frame: makeRect(x, y, width, height),
  isFlippedHorizontal: false,
  isFlippedVertical: false,
  isLocked: false,
  isVisible: true,
  layerListExpandedType: 2,
  name: 'Group',
  nameIsFixed: false,
  resizingConstraint: makeResizeConstraint(resizingConstraint),
  resizingType: 0,
  rotation: 0,
  shouldBreakMaskChain: false,
  style: {
    _class: 'style',
    endDecorationType: 0,
    miterLimit: 10,
    startDecorationType: 0,
    contextSettings: {
      _class: 'graphicsContextSettings',
      blendMode: 0,
      opacity,
    },
  },
  hasClickThrough: false,
  layers: [],
});

export default layerGroup;
