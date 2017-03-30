/* @flow */

import { generateID, makeRect } from './models';

const layerGroup = (x: number, y: number, width: number, height: number) => ({
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
  resizingType: 0,
  rotation: 0,
  shouldBreakMaskChain: false,
  style: {
    _class: 'style',
    endDecorationType: 0,
    miterLimit: 10,
    startDecorationType: 0,
  },
  hasClickThrough: false,
  layers: [],
});

export default layerGroup;
