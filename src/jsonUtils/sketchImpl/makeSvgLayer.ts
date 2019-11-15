import { FileFormat1 as FileFormat } from '@sketch-hq/sketch-file-format-ts';
import { toSJSON } from './sketch-to-json';

import { LayoutInfo } from '../../types';

export default function makeSvgLayer(
  layout: LayoutInfo,
  name: string,
  svg: string,
): FileFormat.Group {
  const svgString = NSString.stringWithString(svg);
  const svgData = svgString.dataUsingEncoding(NSUTF8StringEncoding);
  const svgImporter = MSSVGImporter.svgImporter();
  svgImporter.prepareToImportFromData(svgData);
  const svgLayer = svgImporter.importAsLayer();
  svgLayer.name = name;
  svgLayer.rect = {
    origin: {
      x: 0,
      y: 0,
    },
    size: {
      width: layout.width,
      height: layout.height,
    },
  };
  return toSJSON(svgLayer) as FileFormat.Group;
}
