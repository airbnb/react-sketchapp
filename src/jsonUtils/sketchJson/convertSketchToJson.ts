import { FileFormat1 as FileFormat } from '@sketch-hq/sketch-file-format-ts';
import { SketchLayer } from '../../types';

export default function convertSketchToJson(
  sketchObject: SketchLayer,
): FileFormat.AnyObject | FileFormat.AnyLayer {
  if (!sketchObject) {
    return null;
  }
  const imm = sketchObject.immutableModelObject();

  const err = MOPointer.alloc().init();
  const data = MSJSONDataArchiver.archiveStringWithRootObject_error(imm, err);

  if (err.value() !== null) {
    if (process.env.NODE_ENV !== 'production') console.error(err.value());
    throw new Error(err.value());
  }

  return data ? JSON.parse(data) : data;
}
