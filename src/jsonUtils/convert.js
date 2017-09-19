// @flow
import type { SketchLayer } from '../types';

// Converts a Sketch page object into it's JSON equivalent
export const SketchToJSON = (sketchObj: SketchLayer): string => {
  const imm = sketchObj.immutableModelObject();
  return MSJSONDataArchiver.archiveStringWithRootObject_error_(imm, null);
};

// Converts a Sketch page object into it's JS Object equivalent
export const SketchToJSObject = (sketchObj: SketchLayer): Object => {
  const json = SketchToJSON(sketchObj);
  return JSON.parse(json);
};

// Converts a JS Object tree into it's Sketch page object equivalent
export const JSObjectToSketch = (jsTree: Object): SketchLayer => {
  const decoded = MSJSONDictionaryUnarchiver.unarchiveObjectFromDictionary_asVersion_corruptionDetected_error(
    jsTree,
    88, // 88 = Sketch v43
    null,
    null
  );
  const mutableClass = decoded.class().mutableClass();
  return mutableClass.alloc().initWithImmutableModelObject(decoded);
};

// Converts a JSON tree into it's Sketch page object equivalent
export const JSONToSketch = (jsonTree: string): SketchLayer => {
  const jsTree = JSON.parse(jsonTree);
  return JSObjectToSketch(jsTree);
};
