// @flow
import SketchRenderer from './SketchRenderer';
import { makeSymbolInstance, makeRect, makeJSONDataReference } from '../jsonUtils/models';
import type { ViewStyle, LayoutInfo, SketchLayer, TextStyle } from '../types';
import { getSymbolMasterById } from '../symbol';
import { makeImageDataFromUrl } from '../jsonUtils/hacksForJSONImpl';

type Override = {
  type: string,
  objectId: string,
  name: string,
  symbolID?: string,
  width?: number,
  height?: number,
};

const findInGroup = (layer: ?SketchLayer, type: string): ?SketchLayer =>
  layer && layer.layers && layer.layers.find(l => l._class === type);

const hasImageFill = (layer: SketchLayer): boolean =>
  !!(layer.style && layer.style.fills && layer.style.fills.some(f => f.image));

const overrideProps = (layer: SketchLayer): Override => ({
  type: layer._class,
  objectId: layer.do_objectID,
  name: layer.name,
});

const removeDuplicateOverrides = (overrides: Array<Override>): Array<Override> => {
  const seen = {};

  return overrides.filter(({ objectId }) => {
    const isDuplicate = typeof seen[objectId] !== 'undefined';
    seen[objectId] = true;

    return !isDuplicate;
  });
};

const extractOverridesReducer = (
  overrides: Array<Override>,
  layer: SketchLayer,
): Array<Override> => {
  if (layer._class === 'text') {
    return overrides.concat(overrideProps(layer));
  }

  if (layer._class === 'group') {
    // here we're doing some look-ahead to see if this group contains a group
    // that contains text. this is the structure that will appear if the user
    // creates a `<Text />` element with a custom name
    const subGroup = findInGroup(layer, 'group');
    const textLayer = findInGroup(subGroup, 'text');
    if (textLayer) {
      return overrides.concat(overrideProps(textLayer));
    }

    // here we're doing look-ahead to see if this group contains a shapeGroup
    // with an image fill. if it does we can do an image override on that
    // fill
    const shapeGroup = findInGroup(layer, 'shapeGroup');
    if (shapeGroup && hasImageFill(shapeGroup)) {
      return overrides.concat({
        ...overrideProps(shapeGroup),
        type: 'image',
        name: layer.name,
      });
    }
  }

  if (layer._class === 'symbolInstance') {
    return overrides.concat({
      ...overrideProps(layer),
      symbolID: layer.symbolID,
      width: layer.frame.width,
      height: layer.frame.height,
    });
  }

  if (
    (layer._class === 'shapeGroup' || layer._class === 'artboard' || layer._class === 'group') &&
    layer.layers
  ) {
    return layer.layers.reduce(extractOverridesReducer, overrides);
  }

  return overrides;
};

const extractOverrides = (layers: Array<SketchLayer> = []): Array<Override> => {
  const overrides = layers.reduce(extractOverridesReducer, []);
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

    const overrides = overridableLayers.reduce(function inject(memo, reference) {
      if (reference.type === 'symbolInstance') {
        // eslint-disable-next-line
        if (props.overrides.hasOwnProperty(reference.name)) {
          const overrideValue = props.overrides[reference.name];
          if (typeof overrideValue !== 'function' || typeof overrideValue.symbolID !== 'string') {
            throw new Error(
              '##FIXME## SYMBOL INSTANCE SUBSTITUTIONS MUST BE PASSED THE CONSTRUCTOR OF THE OTHER SYMBOL',
            );
          }

          const originalMaster = getSymbolMasterById(reference.symbolID);
          const replacementMaster = getSymbolMasterById(overrideValue.symbolID);

          if (
            originalMaster.frame.width !== replacementMaster.frame.width ||
            originalMaster.frame.height !== replacementMaster.frame.height
          ) {
            throw new Error(
              '##FIXME## SYMBOL MASTER SUBSTITUTIONS REQUIRE THAT MASTERS HAVE THE SAME DIMENSIONS',
            );
          }

          const nestedOverrides = extractOverrides(
            getSymbolMasterById(overrideValue.symbolID).layers,
          ).reduce(inject, {});

          return {
            ...memo,
            [reference.objectId]: {
              symbolID: replacementMaster.symbolID,
              ...nestedOverrides,
            },
          };
        }

        const nestedOverrides = extractOverrides(
          getSymbolMasterById(reference.symbolID).layers,
        ).reduce(inject, {});

        return {
          ...memo,
          [reference.objectId]: nestedOverrides,
        };
      }

      // eslint-disable-next-line
      if (!props.overrides.hasOwnProperty(reference.name)) {
        return memo;
      }

      const overrideValue = props.overrides[reference.name];

      if (reference.type === 'text') {
        if (typeof overrideValue !== 'string') {
          throw new Error('##FIXME## TEXT OVERRIDE VALUES MUST BE STRINGS');
        }
        return { ...memo, [reference.objectId]: overrideValue };
      }

      if (reference.type === 'image') {
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

    symbolInstance.overrides = overrides;

    return symbolInstance;
  }
}
