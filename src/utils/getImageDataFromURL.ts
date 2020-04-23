import sha1 from 'js-sha1';
import { PlatformBridge } from '../types';

export const getImageDataFromURL = (bridge: PlatformBridge) => (
  url?: string,
): { data: string; sha1: string } => {
  const data = bridge.makeImageDataFromUrl(url);

  return {
    data,
    sha1: sha1(data),
  };
};
