import { makeSymbolMaster, makeRect } from '../jsonUtils/models';
import SketchRenderer from './SketchRenderer';
import { TreeNode } from '../types';
import { SymbolMasterProps } from '../symbol';

export default class SymbolMasterRenderer extends SketchRenderer {
  async renderGroupLayer({
    layout,
    props,
  }: TreeNode<SymbolMasterProps & { symbolID: string; name: string }>) {
    return makeSymbolMaster(
      makeRect(layout.left, layout.top, layout.width, layout.height),
      props.symbolID,
      props.name,
    );
  }
}
