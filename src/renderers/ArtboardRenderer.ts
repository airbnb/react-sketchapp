import { FileFormat1 as FileFormat } from '@sketch-hq/sketch-file-format-ts';
import { generateID, makeRect, makeColorFromCSS } from '../jsonUtils/models';
import { makeResizeConstraint } from '../jsonUtils/resizeConstraint';
import { SketchRenderer } from './SketchRenderer';
import { TreeNode } from '../types';
import { Props } from '../components/Artboard';

export class ArtboardRenderer extends SketchRenderer {
  renderGroupLayer({ layout, style, props }: TreeNode<Props>): FileFormat.Artboard {
    let color: FileFormat.Color | undefined;
    if (style.backgroundColor !== undefined) {
      color = makeColorFromCSS(style.backgroundColor);
    }

    return {
      _class: 'artboard',
      do_objectID: generateID(`artboard:${props.name}`, !!props.name),
      frame: makeRect(layout.left, layout.top, layout.width, layout.height),
      name: props.name || 'Artboard',
      nameIsFixed: props.name !== undefined,
      isVisible: true,
      backgroundColor: color || makeColorFromCSS('white'),
      hasBackgroundColor: color !== undefined,
      isFlowHome: !!props.isHome,
      ...(props.viewport && {
        presetDictionary: {
          allowResizedMatching: 0,
          offersLandscapeVariant: 1,

          name: props.viewport.name,
          width: props.viewport.width,
          height: props.viewport.height,
        },
      }),
      isFlippedHorizontal: false,
      isFlippedVertical: false,
      isFixedToViewport: false,
      isLocked: false,
      booleanOperation: FileFormat.BooleanOperation.NA,
      exportOptions: {
        _class: 'exportOptions',
        exportFormats: [],
        includedLayerIds: [],
        layerOptions: 0,
        shouldTrim: false,
      },
      layerListExpandedType: FileFormat.LayerListExpanded.Undecided,
      resizingType: FileFormat.ResizeType.Stretch,
      shouldBreakMaskChain: false,
      hasClickThrough: false,
      layers: [],
      includeInCloudUpload: true,
      includeBackgroundColorInExport: color !== undefined,
      horizontalRulerData: {
        _class: 'rulerData',
        base: 0,
        guides: [],
      },
      verticalRulerData: {
        _class: 'rulerData',
        base: 0,
        guides: [],
      },
      resizingConstraint: makeResizeConstraint(),
      resizesContent: false,
      rotation: 0,
    };
  }
}
