// @flow

export default function getSketchVersion(): number {
  if (typeof NSBundle !== 'undefined') {
    return parseFloat(NSBundle.mainBundle().infoDictionary().CFBundleShortVersionString);
  }
  return 0;
}
