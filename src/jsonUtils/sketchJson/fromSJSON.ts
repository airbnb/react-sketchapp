import { FileFormat1 as FileFormat } from '@sketch-hq/sketch-file-format-ts';
import { SketchLayer } from '../../types';

/*
Versions based on discussion info: http://sketchplugins.com/d/316-sketch-version
*/
// Internal Sketch Version (ex: 95 => v47 and below)
const SKETCH_HIGHEST_COMPATIBLE_VERSION = '95';

/**
 *  Takes a Sketch JSON tree and turns it into a native object. May throw on invalid data
 */
export function fromSJSON(
  jsonTree: FileFormat.AnyLayer | FileFormat.AnyObject,
  version = SKETCH_HIGHEST_COMPATIBLE_VERSION,
): SketchLayer {
  const err = MOPointer.alloc().init();
  const unarchivedObjectFromDictionary =
    MSJSONDictionaryUnarchiver.unarchivedObjectFromDictionary_asVersion_corruptionDetected_error ||
    MSJSONDictionaryUnarchiver.unarchiveObjectFromDictionary_asVersion_corruptionDetected_error;
  const decoded = unarchivedObjectFromDictionary(jsonTree, version, null, err);

  if (err.value() !== null) {
    console.error(err.value());
    throw new Error(err.value());
  }

  const mutableClass = decoded.class().mutableClass();
  return mutableClass.alloc().initWithImmutableModelObject(decoded);
}
