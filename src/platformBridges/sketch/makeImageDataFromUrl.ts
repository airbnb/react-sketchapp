export function makeImageDataFromUrl(url?: string) {
  let fetchedData = url ? NSData.dataWithContentsOfURL(NSURL.URLWithString(url)) : undefined;

  if (fetchedData) {
    const firstByte = String(
      NSString.alloc().initWithData_encoding(fetchedData, NSISOLatin1StringEncoding),
    ).charCodeAt(0);

    // Check for first byte to see if we have an image.
    // 0xFF = JPEG, 0x89 = PNG, 0x47 = GIF, 0x49 = TIFF, 0x4D = TIFF
    if (
      firstByte !== 0xff &&
      firstByte !== 0x89 &&
      firstByte !== 0x47 &&
      firstByte !== 0x49 &&
      firstByte !== 0x4d
    ) {
      fetchedData = null;
    }
  }

  let image: any;

  if (!fetchedData) {
    const errorUrl =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM8w8DwHwAEOQHNmnaaOAAAAABJRU5ErkJggg==';
    image = NSImage.alloc().initWithContentsOfURL(NSURL.URLWithString(errorUrl));
  } else {
    image = NSImage.alloc().initWithData(fetchedData);
  }

  let imageData: any;

  if (MSImageData.alloc().initWithImage_convertColorSpace !== undefined) {
    imageData = MSImageData.alloc().initWithImage_convertColorSpace(image, false);
  } else {
    imageData = MSImageData.alloc().initWithImage(image);
  }

  return String(
    imageData.data().base64EncodedStringWithOptions(NSDataBase64EncodingEndLineWithCarriageReturn),
  );
}
