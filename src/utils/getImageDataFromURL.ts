/* global fetch */
// TODO: Read data:// URLs
// TODO: Load node polyfill
// TODO: Read from FS
import sha1 from 'js-sha1';

const ERROR_IMAGE =
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM8w8DwHwAEOQHNmnaaOAAAAABJRU5ErkJggg==';

const ERROR_RESULT = {
  data: ERROR_IMAGE,
  sha1: sha1(ERROR_IMAGE),
};

const readBufferFromResponse = async (response: Response): Promise<Buffer> => {
  const arrayBuffer = await response.arrayBuffer();
  if (Buffer.isBuffer(arrayBuffer)) {
    // skpm polyfill returns a Buffer instead of an ArrayBuffer
    return arrayBuffer;
  }
  return Buffer.from(arrayBuffer);
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

export default async function getImageDataFromURL(
  url?: string,
): Promise<Readonly<{ data: string; sha1: string }>> {
  if (!url) {
    return ERROR_RESULT;
  }

  const response = await fetch(url);
  if (!response.ok) {
    return ERROR_RESULT;
  }

  const buffer = await readBufferFromResponse(response);
  if (!isImage(buffer)) return ERROR_RESULT;

  const data = buffer.toString('base64');

  return {
    data,
    sha1: sha1(data),
  };
}
