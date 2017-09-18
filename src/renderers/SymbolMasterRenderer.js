/* @flow */
import type { SJSymbolMaster } from 'sketchapp-json-flow-types';
import { makeSymbolMaster, makeRect } from '../jsonUtils/models';
import SketchRenderer from './SketchRenderer';
import type { ViewStyle, LayoutInfo, TextStyle } from '../types';

class SymbolMasterRenderer extends SketchRenderer {
  renderGroupLayer(
    layout: LayoutInfo,
    style: ViewStyle,
    textStyle: TextStyle,
    props: any,
    // eslint-disable-next-line no-unused-vars
    value: ?string
  ): SJSymbolMaster {
    return makeSymbolMaster(
      makeRect(layout.left, layout.top, layout.width, layout.height),
      props.symbolID,
      props.name
    );
  }
}

module.exports = SymbolMasterRenderer;
