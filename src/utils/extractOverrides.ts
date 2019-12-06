import { FileFormat1 as FileFormat } from '@sketch-hq/sketch-file-format-ts';

export type Override = {
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

export const extractOverrides = (layers: FileFormat.AnyLayer[] = [], path?: string): Override[] => {
  const overrides = layers.reduce(extractOverridesReducer(path || ''), []);
  return removeDuplicateOverrides(overrides);
};
