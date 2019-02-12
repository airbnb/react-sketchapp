// @flow
import SketchRenderer from './SketchRenderer';
import {
  makeSymbolInstance,
  makeRect,
  makeJSONDataReference,
  makeOverride,
} from '../jsonUtils/models';
import type { ViewStyle, LayoutInfo, SketchLayer, TextStyle } from '../types';
import { getSymbolMasterById } from '../symbol';
import getImageDataFromURL from '../utils/getImageDataFromURL';

type Override = {
  type: 'symbolID' | 'stringValue' | 'layerStyle' | 'textStyle' | 'flowDestination' | 'image',
  path: string,
  name: string,
  symbolID?: string,
};

const findInGroup = (layer: ?SketchLayer, type: string): ?SketchLayer =>
  layer && layer.layers && layer.layers.find(l => l._class === type);

const hasImageFill = (layer: SketchLayer): boolean =>
  !!(layer.style && layer.style.fills && layer.style.fills.some(f => f.image));

const removeDuplicateOverrides = (overrides: Array<Override>): Array<Override> => {
  const seen = {};

  return overrides.filter(({ path }) => {
    const isDuplicate = typeof seen[path] !== 'undefined';
    seen[path] = true;

    return !isDuplicate;
  });
};

const extractOverridesReducer = (path: string) => (
  overrides: Array<Override>,
  layer: SketchLayer,
): Array<Override> => {
  if (layer._class === 'text') {
    return overrides.concat({
      type: 'stringValue',
      path: `${path}${layer.do_objectID}`,
      name: layer.name,
    });
  }

  if (layer._class === 'group') {
    // here we're doing some look-ahead to see if this group contains a group
    // that contains text. this is the structure that will appear if the user
    // creates a `<Text />` element with a custom name
    const subGroup = findInGroup(layer, 'group');
    const textLayer = findInGroup(subGroup, 'text');
    if (textLayer) {
      return overrides.concat({
        type: 'stringValue',
        path: `${path}${textLayer.do_objectID}`,
        name: textLayer.name,
      });
    }

    // here we're doing look-ahead to see if this group contains a shapeGroup
    // with an image fill. if it does we can do an image override on that
    // fill
    const shapeGroup = findInGroup(layer, 'shapeGroup');
    if (shapeGroup && hasImageFill(shapeGroup)) {
      return overrides.concat({
        type: 'image',
        path: `${path}${shapeGroup.do_objectID}`,
        name: layer.name,
      });
    }
  }

  if (layer._class === 'symbolInstance') {
    return overrides.concat({
      type: 'symbolID',
      path: `${path}${layer.do_objectID}`,
      name: layer.name,
      symbolID: layer.symbolID,
    });
  }

  if (
    (layer._class === 'shapeGroup' || layer._class === 'artboard' || layer._class === 'group') &&
    layer.layers
  ) {
    return layer.layers.reduce(extractOverridesReducer(path), overrides);
  }

  return overrides;
};

const extractOverrides = (layers: Array<SketchLayer> = [], path?: string): Array<Override> => {
  const overrides = layers.reduce(extractOverridesReducer(path || ''), []);
  return removeDuplicateOverrides(overrides);
};

export default class SymbolInstanceRenderer extends SketchRenderer {
  renderGroupLayer(layout: LayoutInfo, style: ViewStyle, textStyle: TextStyle, props: any): any {
    const masterTree = getSymbolMasterById(props.symbolID);

    const symbolInstance = makeSymbolInstance(
      makeRect(layout.left, layout.top, layout.width, layout.height),
      masterTree.symbolID,
      props.name,
      props.resizingConstraint,
    );

    if (!props.overrides) {
      return symbolInstance;
    }

    const overridableLayers = extractOverrides(masterTree.layers);

    const overrides = overridableLayers.reduce(function inject(
      memo: Array<any>,
      reference: Override,
    ) {
      if (reference.type === 'symbolID') {
        const newPath = `${reference.path}/`;
        const originalMaster = getSymbolMasterById(reference.symbolID);

        // eslint-disable-next-line
        if (props.overrides.hasOwnProperty(reference.name)) {
          const overrideValue = props.overrides[reference.name];
          if (typeof overrideValue !== 'function' || typeof overrideValue.symbolID !== 'string') {
            throw new Error(
              '##FIXME## SYMBOL INSTANCE SUBSTITUTIONS MUST BE PASSED THE CONSTRUCTOR OF THE OTHER SYMBOL',
            );
          }

          const replacementMaster = getSymbolMasterById(overrideValue.symbolID);

          if (
            originalMaster.frame.width !== replacementMaster.frame.width ||
            originalMaster.frame.height !== replacementMaster.frame.height
          ) {
            throw new Error(
              '##FIXME## SYMBOL MASTER SUBSTITUTIONS REQUIRE THAT MASTERS HAVE THE SAME DIMENSIONS',
            );
          }

          memo.push(makeOverride(reference.path, reference.type, replacementMaster.symbolID));

          extractOverrides(replacementMaster.layers, newPath).reduce(inject, memo);

          return memo;
        }

        extractOverrides(originalMaster.layers, newPath).reduce(inject, memo);

        return memo;
      }

      // eslint-disable-next-line
      if (!props.overrides.hasOwnProperty(reference.name)) {
        return memo;
      }

      const overrideValue = props.overrides[reference.name];

      if (reference.type === 'stringValue') {
        if (typeof overrideValue !== 'string') {
          throw new Error('##FIXME## TEXT OVERRIDE VALUES MUST BE STRINGS');
        }
        memo.push(makeOverride(reference.path, reference.type, overrideValue));
      }

      if (reference.type === 'image') {
        if (typeof overrideValue !== 'string') {
          throw new Error('##FIXME"" IMAGE OVERRIDE VALUES MUST BE VALID IMAGE HREFS');
        }
        memo.push(
          makeOverride(
            reference.path,
            reference.type,
            makeJSONDataReference(getImageDataFromURL(overrideValue)),
          ),
        );
      }

      return memo;
    },
    []);

    symbolInstance.overrideValues = overrides;

    return symbolInstance;
  }
}
