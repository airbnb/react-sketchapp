import * as hacks from '../../src/jsonUtils/hacksForJSONImpl';

describe('API', () => {
  it('exports makeImageDataFromUrl', () => {
    expect(hacks.makeImageDataFromUrl).toBeInstanceOf(Function);
  });

  it('exports makeImageDataFromUrl', () => {
    expect(hacks.createAttributedString).toBeInstanceOf(Function);
  });

  it('exports makeEncodedAttributedString', () => {
    expect(hacks.makeEncodedAttributedString).toBeInstanceOf(Function);
  });

  it('exports makeTextStyle', () => {
    expect(hacks.makeTextStyle).toBeInstanceOf(Function);
  });
});
