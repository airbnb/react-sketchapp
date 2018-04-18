/* @flow */
import SketchRenderer from './SketchRenderer';
import { makeSymbolInstance, makeRect, makeJSONDataReference } from '../jsonUtils/models';
import type { ViewStyle, LayoutInfo, SketchLayer, TextStyle } from '../types';
import { getSymbolMasterByName, getSymbolMasterById } from '../symbol';
import { makeImageDataFromUrl } from '../jsonUtils/hacksForJSONImpl';

// type OverrideReferenceBase = {
//   objectId: SJObjectId,
//   name: string
// };

// type OverrideReference =
//   | ({ type: 'text' } & OverrideReferenceBase)
//   | ({ type: 'image' } & OverrideReferenceBase)
//   | ({
//     type: 'symbolInstance',
//     symbolId: string,
//     width: number,
//     height: number
//   } & OverrideReferenceBase);

const findInGroup = (layer: ?SketchLayer, type: string): ?SketchLayer =>
  layer && layer.layers && layer.layers.find(l => l._class === type);

const hasImageFill = (layer: SketchLayer): boolean =>
  !!(layer.style && layer.style.fills && layer.style.fills.some(f => f.image));

const extractOverridesHelp = (subLayer: any, output: any) => {
  if (subLayer._class === 'text' && !output.some(r => r.objectId === subLayer.do_objectID)) {
    output.push({
      type: 'text',
      objectId: subLayer.do_objectID,
      name: subLayer.name,
    });
    return;
  }

  if (subLayer._class === 'group') {
    // here we're doing some look-ahead to see if this group contains a group
    // that contains text. this is the structure that will appear if the user
    // creates a `<Text />` element with a custom name
    const subGroup = findInGroup(subLayer, 'group');
    const textLayer = findInGroup(subGroup, 'text');
    if (textLayer) {
      output.push({
        type: 'text',
        objectId: textLayer.do_objectID,
        name: textLayer.name,
      });
      return;
    }

    // here we're doing look-ahead to see if this group contains a shapeGroup
    // with an image fill. if it does we can do an image override on that
    // fill
    const shapeGroup = findInGroup(subLayer, 'shapeGroup');
    if (shapeGroup && hasImageFill(shapeGroup)) {
      output.push({
        type: 'image',
        objectId: shapeGroup.do_objectID,
        name: subLayer.name,
      });
    }
  }

  if (subLayer._class === 'symbolInstance') {
    output.push({
      type: 'symbolInstance',
      objectId: subLayer.do_objectID,
      name: subLayer.name,
      symbolId: subLayer.symbolID,
      width: subLayer.frame.width,
      height: subLayer.frame.height,
    });
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

const extractOverrides = (subLayers: any) => {
  const output = [];
  subLayers.forEach(subLayer => extractOverridesHelp(subLayer, output));
  return output;
};

class SymbolInstanceRenderer extends SketchRenderer {
  renderGroupLayer(layout: LayoutInfo, style: ViewStyle, textStyle: TextStyle, props: any): any {
    const masterTree = getSymbolMasterByName(props.masterName);

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
          if (typeof overrideValue !== 'function' || typeof overrideValue.masterName !== 'string') {
            throw new Error(
              '##FIXME## SYMBOL INSTANCE SUBSTITUTIONS MUST BE PASSED THE CONSTRUCTOR OF THE OTHER SYMBOL',
            );
          }

          const originalMaster = getSymbolMasterById(reference.symbolId);
          const replacementMaster = getSymbolMasterByName(overrideValue.masterName);

          if (
            originalMaster.frame.width !== replacementMaster.frame.width ||
            originalMaster.frame.height !== replacementMaster.frame.height
          ) {
            throw new Error(
              '##FIXME## SYMBOL MASTER SUBSTITUTIONS REQUIRE THAT MASTERS HAVE THE SAME DIMENSIONS',
            );
          }

          const nestedOverrides = extractOverrides(
            getSymbolMasterByName(overrideValue.masterName).layers,
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
          getSymbolMasterById(reference.symbolId).layers,
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

module.exports = SymbolInstanceRenderer;
