import { FileFormat1 as FileFormat } from '@sketch-hq/sketch-file-format-ts';
import { makeResizeConstraint } from './resizeConstraint';
import { generateID, makeRect } from './models';
import { ResizeConstraints } from '../types';
import { makeStyle } from './style';

export const layerGroup = (
  x: number,
  y: number,
  width: number,
  height: number,
  opacity: number,
  resizingConstraint?: ResizeConstraints,
): FileFormat.Group => ({
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
  layerListExpandedType: FileFormat.LayerListExpanded.Expanded,
  name: 'Group',
  nameIsFixed: false,
  resizingConstraint: makeResizeConstraint(resizingConstraint),
  resizingType: FileFormat.ResizeType.Stretch,
  rotation: 0,
  shouldBreakMaskChain: false,
  style: makeStyle({ opacity }),
  hasClickThrough: false,
  layers: [],
  booleanOperation: FileFormat.BooleanOperation.NA,
  isFixedToViewport: false,
});
