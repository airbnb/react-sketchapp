import { FileFormat1 as FileFormat } from '@sketch-hq/sketch-file-format-ts';
import { makeSymbolMaster, makeRect } from '../jsonUtils/models';
import SketchRenderer from './SketchRenderer';
import { ViewStyle, LayoutInfo, TextStyle } from '../types';

export default class SymbolMasterRenderer extends SketchRenderer {
  renderGroupLayer(
    layout: LayoutInfo,
    _style: ViewStyle,
    _textStyle: TextStyle,
    props: { symbolID: string; name: string },
  ): FileFormat.SymbolMaster {
    return makeSymbolMaster(
      makeRect(layout.left, layout.top, layout.width, layout.height),
      props.symbolID,
      props.name,
    );
  }
}
