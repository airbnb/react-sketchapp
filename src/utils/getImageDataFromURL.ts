import sha1 from 'js-sha1';

export default async function getImageDataFromURL(
  url?: string,
): Promise<{ data: string; sha1: string }> {
  // FIXME: Mock
  console.log(url);
  const data =
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM8w8DwHwAEOQHNmnaaOAAAAABJRU5ErkJggg==';

  return {
    data,
    sha1: sha1(data),
  };
}
