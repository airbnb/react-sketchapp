// @flow

export default function getSketchVersion(): number | 'NodeJS' {
  if (typeof NSBundle !== 'undefined') {
    return parseFloat(NSBundle.mainBundle().infoDictionary().CFBundleShortVersionString);
  }
  return 'NodeJS';
}
