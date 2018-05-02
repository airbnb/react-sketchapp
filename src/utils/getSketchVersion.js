/* @flow */

export default function getSketchVersion() {
  if (typeof NSBundle !== 'undefined') {
    return parseFloat(
      NSBundle.mainBundle().infoDictionary().CFBundleShortVersionString
    );
  }
  return undefined;
}
