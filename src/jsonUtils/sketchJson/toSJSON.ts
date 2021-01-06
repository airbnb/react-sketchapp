import { FileFormat1 as FileFormat } from '@sketch-hq/sketch-file-format-ts';
import { SketchLayer } from '../../types';

export function toSJSON(
  sketchObject: SketchLayer,
): FileFormat.AnyObject | FileFormat.AnyLayer | null {
  if (!sketchObject) {
    return null;
  }
  const imm = sketchObject.immutableModelObject();

  const err = MOPointer.alloc().init();
  const data = MSJSONDataArchiver.archiveStringWithRootObject_error(imm, err);

  if (err.value() !== null) {
    console.error(err.value());
    throw new Error(err.value());
  }

  return data ? JSON.parse(data) : data;
}
