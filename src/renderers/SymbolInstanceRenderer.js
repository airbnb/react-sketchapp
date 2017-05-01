/* @flow */
import type { SJSymbolInstanceLayer, SJLayer, SJObjectId } from 'sketchapp-json-flow-types';
import SketchRenderer from './SketchRenderer';
import { makeSymbolInstance, makeRect, makeJSONDataReference } from '../jsonUtils/models';
import type { ViewStyle, LayoutInfo, TextStyle } from '../types';
import { getMasterByName } from '../symbol';
import { makeImageDataFromUrl } from '../jsonUtils/hacksForJSONImpl';

type OverrideReferenceBase = {
  objectId: SJObjectId,
  name: string
};

type OverrideReference =
  | ({ type: 'text' } & OverrideReferenceBase)
  | ({ type: 'image' } & OverrideReferenceBase);

const extractOverridesHelp = (subLayer: SJLayer, output: Array<OverrideReference>) => {
  if (subLayer._class === 'text') {
    output.push({ type: 'text', objectId: subLayer.do_objectID, name: subLayer.name });
    return;
  }

  if (subLayer._class === 'group') {
    if (subLayer.layers && subLayer.layers.length) {
      const shapeGroup = subLayer.layers.find(l => l._class === 'shapeGroup');
      if (
        shapeGroup &&
        shapeGroup._class === 'shapeGroup' &&
        shapeGroup.style &&
        shapeGroup.style.fills.some(f => f.image)
      ) {
        output.push({ type: 'image', objectId: shapeGroup.do_objectID, name: subLayer.name });
      }
    }
  }

  if (
    (subLayer._class === 'shapeGroup' ||
      subLayer._class === 'artboard' ||
      subLayer._class === 'group') &&
    subLayer.layers
  ) {
    subLayer.layers.forEach(subSubLayer => extractOverridesHelp(subSubLayer, output));
  }
};

const extractOverrides = (subLayers: Array<SJLayer>): Array<OverrideReference> => {
  const output = [];
  subLayers.forEach(subLayer => extractOverridesHelp(subLayer, output));
  return output;
};

class SymbolInstanceRenderer extends SketchRenderer {
  renderGroupLayer(
    layout: LayoutInfo,
    style: ViewStyle,
    textStyle: TextStyle,
    props: any,
    // eslint-disable-next-line no-unused-vars
    value: ?string
  ): SJSymbolInstanceLayer {
    const symbolInstance = makeSymbolInstance(
      makeRect(layout.left, layout.top, layout.width, layout.height),
      props.symbolID,
      props.name
    );

    if (!props.overrides) {
      return symbolInstance;
    }

    const masterTree = getMasterByName(props.name);
    if (!masterTree) {
      throw new Error('##FIXME### NO MASTER BY THAT NAME');
    }

    const overridableLayers = extractOverrides(masterTree.layers);
    console.log(overridableLayers);

    const overrides = Object.keys(props.overrides).reduce((memo, next) => {
      const overrideKey = next;
      const overrideValue = props.overrides[next];

      const reference = overridableLayers.find(l => l.name === overrideKey);
      if (!reference) {
        throw new Error('##FIXME## TRIED TO OVERRIDE NON-EXISTENT LAYER');
      }

      if (reference.type === 'text') {
        if (typeof overrideValue !== 'string') {
          throw new Error('##FIXME## TEXT OVERRIDE VALUES MUST BE STRINGS');
        }
        return { ...memo, [reference.objectId]: overrideValue };
      } else if (reference.type === 'image') {
        if (typeof overrideValue !== 'string') {
          throw new Error('##FIXME"" IMAGE OVERRIDE VALUES MUST BE VALID IMAGE HREFS');
        }
        return {
          ...memo,
          [reference.objectId]: makeJSONDataReference(makeImageDataFromUrl(overrideValue)),
        };
      }

      return memo;
    }, {});

    symbolInstance.overrides = {};
    symbolInstance.overrides['0'] = overrides;

    return symbolInstance;
  }
}

module.exports = SymbolInstanceRenderer;
