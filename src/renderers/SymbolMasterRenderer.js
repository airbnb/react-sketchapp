// @flow
import type { SJSymbolMaster } from 'sketchapp-json-flow-types';
import { makeSymbolMaster, makeRect } from '../jsonUtils/models';
import SketchRenderer from './SketchRenderer';
import type { ViewStyle, LayoutInfo, TextStyle } from '../types';

export default class SymbolMasterRenderer extends SketchRenderer {
  renderGroupLayer(
    layout: LayoutInfo,
    style: ViewStyle,
    textStyle: TextStyle,
    props: any,
  ): SJSymbolMaster {
    return makeSymbolMaster(
      makeRect(layout.left, layout.top, layout.width, layout.height),
      props.symbolID,
      props.name,
    );
  }
}
