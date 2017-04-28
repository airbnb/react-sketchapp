/* @flow */
import type { SJSymbolInstanceLayer } from 'sketchapp-json-flow-types';
import SketchRenderer from './SketchRenderer';
import { makeSymbolInstance, makeRect } from '../jsonUtils/models';
import type { ViewStyle, LayoutInfo, TextStyle } from '../types';

class SymbolInstanceRenderer extends SketchRenderer {
  renderGroupLayer(
    layout: LayoutInfo,
    style: ViewStyle,
    textStyle: TextStyle,
    props: any,
    // eslint-disable-next-line no-unused-vars
    value: ?string
  ): SJSymbolInstanceLayer {
    return makeSymbolInstance(
      makeRect(layout.left, layout.top, layout.width, layout.height),
      props.symbolID,
      props.name
    );
  }
}

module.exports = SymbolInstanceRenderer;
