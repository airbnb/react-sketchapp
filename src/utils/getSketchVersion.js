/* @flow */

export default function getSketchVersion(): any {
  if (typeof NSBundle !== 'undefined') {
    return parseFloat(
      NSBundle.mainBundle().infoDictionary().CFBundleShortVersionString
    );
  }
  return undefined;
}
