import requireObjCBridge from './requireObjCBridge';

export default function makeImageDataFromUrl(url?: string): string {
  return requireObjCBridge().makeImageDataFromUrl(url);
}
