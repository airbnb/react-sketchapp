import { FileFormat1 as FileFormat } from '@sketch-hq/sketch-file-format-ts';
import { makeSymbolMaster, makeRect } from '../jsonUtils/models';
import SketchRenderer from './SketchRenderer';
import { TreeNode } from '../types';

export default class SymbolMasterRenderer extends SketchRenderer {
  renderGroupLayer({
    layout,
    props,
  }: TreeNode<{ symbolID: string; name: string }>): FileFormat.SymbolMaster {
    return makeSymbolMaster(
      makeRect(layout.left, layout.top, layout.width, layout.height),
      props.symbolID,
      props.name,
    );
  }
}
