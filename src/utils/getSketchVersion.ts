export default function getSketchVersion(): string {
  return typeof NSBundle !== 'undefined'
    ? NSBundle.mainBundle().infoDictionary().CFBundleShortVersionString
    : '';
}
