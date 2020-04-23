import { FileFormat1 as FileFormat } from '@sketch-hq/sketch-file-format-ts';
import { SketchRenderer } from './SketchRenderer';
import {
  makeSymbolInstance,
  makeRect,
  makeJSONDataReference,
  makeOverride,
} from '../jsonUtils/models';
import { TreeNode } from '../types';
import { getSymbolMasterById, SymbolInstanceProps } from '../symbol';
import { getImageDataFromURL } from '../utils/getImageDataFromURL';

type Override = {
  type: 'symbolID' | 'stringValue' | 'layerStyle' | 'textStyle' | 'flowDestination' | 'image';
  path: string;
  name: string;
  symbolID?: string;
};

const findInGroup = (layer: FileFormat.AnyGroup, type: string): FileFormat.AnyLayer | undefined =>
  layer && layer.layers && layer.layers.find((l) => l._class === type);

const hasImageFill = (layer: FileFormat.AnyLayer): boolean =>
  !!(layer.style && layer.style.fills && layer.style.fills.some((f) => f.image));

const removeDuplicateOverrides = (overrides: Array<Override>): Array<Override> => {
  const seen: { [path: string]: boolean } = {};

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

export class SymbolInstanceRenderer extends SketchRenderer {
  renderGroupLayer({
    layout,
    props,
  }: TreeNode<SymbolInstanceProps & { symbolID: string; name: string }>) {
    const bridge = this.platformBridge;
    const masterTree = getSymbolMasterById(props.symbolID);

    if (!masterTree) {
      throw new Error(
        'Trying to create a symbol instance for a Symbol Master that does not exists',
      );
    }

    const symbolInstance = makeSymbolInstance(
      makeRect(layout.left, layout.top, layout.width, layout.height),
      masterTree.symbolID,
      props.name,
      props.resizingConstraint,
    );

    const { overrides } = props;

    if (!overrides) {
      return symbolInstance;
    }

    const overridableLayers = extractOverrides(masterTree.layers);

    const overrideValues = overridableLayers.reduce(function inject(
      memo: FileFormat.OverrideValue[],
      reference: Override,
    ) {
      if (reference.type === 'symbolID') {
        const newPath = `${reference.path}/`;
        const originalMaster = getSymbolMasterById(reference.symbolID);

        if (!originalMaster) {
          return memo;
        }

        if (reference.name in overrides) {
          const overrideValue = overrides[reference.name];
          // @ts-ignore
          const overrideSymbolId = overrideValue.symbolID;
          if (typeof overrideValue !== 'function' || typeof overrideSymbolId !== 'string') {
            throw new Error(
              `The overriden nested symbol needs to be the constructor of another symbol.\n\nIn Symbol Instance: "${props.name}"\nFor Override: "${reference.name}"`,
            );
          }

          const replacementMaster = getSymbolMasterById(overrideSymbolId);

          if (!replacementMaster) {
            return memo;
          }

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

      if (!overrides.hasOwnProperty(reference.name)) {
        return memo;
      }

      const overrideValue = overrides[reference.name];

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
            makeJSONDataReference(getImageDataFromURL(bridge)(overrideValue)),
          ),
        );
      }

      return memo;
    },
    []);

    symbolInstance.overrideValues = overrideValues;

    return symbolInstance;
  }
}
