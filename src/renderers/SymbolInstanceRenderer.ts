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
import { extractOverrides, Override } from '../utils/extractOverrides';

export default class SymbolInstanceRenderer extends SketchRenderer {
  renderGroupLayer({ layout, props }: TreeNode<SymbolInstanceProps & { symbolID: string }>) {
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
      memo: FileFormat.OverrideValue[],
      reference: Override,
    ) {
      if (reference.type === 'symbolID') {
        const newPath = `${reference.path}/`;
        const originalMaster = getSymbolMasterById(reference.symbolID);

        if (props.overrides.hasOwnProperty(reference.name)) {
          const overrideValue = props.overrides[reference.name];
          if (typeof overrideValue !== 'function' || typeof overrideValue.symbolID !== 'string') {
            throw new Error(
              `The overriden nested symbol needs to be the constructor of another symbol.\n\nIn Symbol Instance: "${props.name}"\nFor Override: "${reference.name}"`,
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
