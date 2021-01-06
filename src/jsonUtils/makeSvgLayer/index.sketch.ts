import { FileFormat1 as FileFormat } from '@sketch-hq/sketch-file-format-ts';
import { toSJSON } from '../sketchJson/toSJSON';

import { LayoutInfo } from '../../types';

export function makeSvgLayer(_layout: LayoutInfo, name: string, svg: string): FileFormat.Group {
  const svgString = NSString.stringWithString(svg);
  const svgData = svgString.dataUsingEncoding(NSUTF8StringEncoding);
  const svgImporter = MSSVGImporter.svgImporter();
  svgImporter.prepareToImportFromData(svgData);

  const frame = NSMakeRect(0, 0, svgImporter.graph().width(), svgImporter.graph().height());
  const root = MSLayerGroup.alloc().initWithFrame(frame);
  root.name = name;

  svgImporter.graph().makeLayerWithParentLayer_progress(root, null);
  root.ungroupSingleChildDescendentGroups();
  svgImporter.scale_rootGroup(svgImporter.importer().scaleValue(), root);

  return toSJSON(root) as FileFormat.Group;
}
