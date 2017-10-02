import isNullOrUndefined from '../../src/utils/isNullOrUndefined';

describe('isNullOrUndefined', () => {
  it('correctly identify null', () => {
    const shouldBeNull = isNullOrUndefined(null);

    expect(shouldBeNull).toEqual(true);
  });

  it('correctly identify undefined', () => {
    const shouldBeUndefined = isNullOrUndefined(undefined);

    expect(shouldBeUndefined).toEqual(true);
  });

  it('correctly identify zero (0)', () => {
    const shouldBeZero = isNullOrUndefined(0);

    expect(shouldBeZero).toEqual(false);
  });
});
