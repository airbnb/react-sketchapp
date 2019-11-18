import requireObjCBridge from './requireObjCBridge';

export default function makeImageDataFromUrl(url?: string) {
  return requireObjCBridge().makeImageDataFromUrl(url);
}
