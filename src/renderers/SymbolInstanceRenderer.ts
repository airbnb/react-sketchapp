import { FileFormat1 as FileFormat } from '@sketch-hq/sketch-file-format-ts';
import SketchRenderer from './SketchRenderer';
import {
  makeSymbolInstance,
  makeRect,
  makeJSONDataReference,
  makeOverride,
} from '../jsonUtils/models';
import { TreeNode } from '../types';
import { getSymbolMasterById, SymbolInstanceProps } from '../symbol';
import getImageDataFromURL from '../utils/getImageDataFromURL';

type Override = {
  type: 'symbolID' | 'stringValue' | 'layerStyle' | 'textStyle' | 'flowDestination' | 'image';
  path: string;
  name: string;
  symbolID?: string;
};

const findInGroup = (layer: FileFormat.AnyGroup, type: string): FileFormat.AnyLayer | undefined =>
  layer && layer.layers && layer.layers.find(l => l._class === type);

const hasImageFill = (layer: FileFormat.AnyLayer): boolean =>
  // @ts-ignore
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
  overrides: Override[],
  layer: FileFormat.AnyLayer,
): Override[] => {
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
    const subGroup = findInGroup(layer, 'group') as FileFormat.Group;
    const textLayer = findInGroup(subGroup, 'text') as FileFormat.Text;
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

const extractOverrides = (layers: FileFormat.AnyLayer[] = [], path?: string): Override[] => {
  const overrides = layers.reduce(extractOverridesReducer(path || ''), []);
  return removeDuplicateOverrides(overrides);
};

export default class SymbolInstanceRenderer extends SketchRenderer {
  renderGroupLayer({
    layout,
    props,
  }: TreeNode<SymbolInstanceProps & { symbolID: string }>): FileFormat.SymbolInstance {
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

        if (props.overrides.hasOwnProperty(reference.name)) {
          const overrideValue = props.overrides[reference.name];
          if (typeof overrideValue !== 'function' || typeof overrideValue.symbolID !== 'string') {
            throw new Error(
              `The overriden nested symbol needs to the constructor of another symbol.\n\nIn Symbol Instance: "${props.name}"\nFor Override: "${reference.name}"`,
            );
          }

          const replacementMaster = getSymbolMasterById(overrideValue.symbolID);

          if (
            originalMaster.frame.width !== replacementMaster.frame.width ||
            originalMaster.frame.height !== replacementMaster.frame.height
          ) {
            throw new Error(
              `The overriden nested symbol needs to have the same dimensions.\n\nIn Symbol Instance: "${props.name}"\nFor Override: "${reference.name}"`,
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
          throw new Error(
            `The override value of a Text must be a string.\n\nIn Symbol Instance: "${props.name}"\nFor Override: "${reference.name}"`,
          );
        }
        memo.push(makeOverride(reference.path, reference.type, overrideValue));
      }

      if (reference.type === 'image') {
        if (typeof overrideValue !== 'string') {
          throw new Error(
            `The override value of an Image must be a url.\n\nIn Symbol Instance: "${props.name}"\nFor Override: "${reference.name}"`,
          );
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
