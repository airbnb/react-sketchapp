import { makeSymbolMaster, makeRect } from '../jsonUtils/models';
import SketchRenderer from './SketchRenderer';
import { TreeNode } from '../types';

export default class SymbolMasterRenderer extends SketchRenderer {
  renderGroupLayer({ layout, props }: TreeNode<{ symbolID: string; name: string }>) {
    return makeSymbolMaster(
      makeRect(layout.left, layout.top, layout.width, layout.height),
      props.symbolID,
      props.name,
    );
  }
}
