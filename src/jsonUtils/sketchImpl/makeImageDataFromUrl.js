export default function makeImageDataFromUrl(url: string): { data: string, sha1: string } {
  let fetchedData = NSData.dataWithContentsOfURL(NSURL.URLWithString(url));

  if (fetchedData) {
    const firstByte = fetchedData.subdataWithRange(NSMakeRange(0, 1)).description();

    // Check for first byte. Must use non-type-exact matching (!=).
    // 0xFF = JPEG, 0x89 = PNG, 0x47 = GIF, 0x49 = TIFF, 0x4D = TIFF
    if (
      /* eslint-disable eqeqeq */
      firstByte != '<ff>' &&
      firstByte != '<89>' &&
      firstByte != '<47>' &&
      firstByte != '<49>' &&
      firstByte != '<4d>'
      /* eslint-enable eqeqeq */
    ) {
      fetchedData = null;
    }
  }

  let image;

  if (!fetchedData) {
    const errorUrl =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM8w8DwHwAEOQHNmnaaOAAAAABJRU5ErkJggg==';
    image = NSImage.alloc().initWithContentsOfURL(NSURL.URLWithString(errorUrl));
  } else {
    image = NSImage.alloc().initWithData(fetchedData);
  }

  let imageData: MSImageData;

  if (MSImageData.alloc().initWithImage_convertColorSpace !== undefined) {
    imageData = MSImageData.alloc().initWithImage_convertColorSpace(image, false);
  } else {
    imageData = MSImageData.alloc().initWithImage(image);
  }

  return {
    data: imageData
      .data()
      .base64EncodedStringWithOptions(NSDataBase64EncodingEndLineWithCarriageReturn),
    sha1: imageData
      .sha1()
      .base64EncodedStringWithOptions(NSDataBase64EncodingEndLineWithCarriageReturn),
  };
}
