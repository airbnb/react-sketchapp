import sha1 from 'js-sha1';
import { PlatformBridge } from '../types';

const ERROR_IMAGE =
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM8w8DwHwAEOQHNmnaaOAAAAABJRU5ErkJggg==';

const ERROR_RESULT = {
  data: ERROR_IMAGE,
  sha1: sha1(ERROR_IMAGE),
};

const isImage = (buffer: Buffer): boolean => {
  const firstByte = buffer[0];

  // Check for first byte to see if we have an image.
  // 0xFF = JPEG, 0x89 = PNG, 0x47 = GIF, 0x49 = TIFF, 0x4D = TIFF
  return (
    firstByte === 0xff ||
    firstByte === 0x89 ||
    firstByte === 0x47 ||
    firstByte === 0x49 ||
    firstByte === 0x4d
  );
};

const fetchRemoteImage = async (url: string, { fetch }: PlatformBridge): Promise<Buffer> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`${response.status}`);
  }

  return Buffer.from(await response.arrayBuffer());
};

export default async function getImageDataFromURL(
  bridge: PlatformBridge,
  url?: string,
): Promise<Readonly<{ data: string; sha1: string }>> {
  if (!url) {
    return ERROR_RESULT;
  }

  try {
    const parsedUrl = new URL(url);

    const buffer = await (parsedUrl.protocol === 'file:'
      ? bridge.readFile(parsedUrl.pathname)
      : fetchRemoteImage(url, bridge));

    if (!isImage(buffer)) throw new Error('Unrecognized image format');

    const data = buffer.toString('base64');

    return {
      data,
      sha1: sha1(data),
    };
  } catch (error) {
    if (process.env.NODE_ENV !== 'production')
      console.error(`Error while fetching '${url}':`, error);

    return ERROR_RESULT;
  }
}
