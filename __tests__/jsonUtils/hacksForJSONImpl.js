import * as hacks from '../../src/jsonUtils/hacksForJSONImpl';

describe('API', () => {
  it('exports makeImageDataFromUrl', () => {
    expect(hacks.makeImageDataFromUrl).toBeInstanceOf(Function);
  });

  it('exports makeAttributedString', () => {
    expect(hacks.makeAttributedString).toBeInstanceOf(Function);
  });

  it('exports makeTextStyle', () => {
    expect(hacks.makeTextStyle).toBeInstanceOf(Function);
  });
});
