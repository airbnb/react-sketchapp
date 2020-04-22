import { isDefined } from '../../../src/utils/isDefined';

describe('isNullOrUndefined', () => {
  it('correctly identify null', () => {
    const shouldBeNull = isDefined(null);

    expect(shouldBeNull).toEqual(false);
  });

  it('correctly identify undefined', () => {
    const shouldBeUndefined = isDefined(undefined);

    expect(shouldBeUndefined).toEqual(false);
  });

  it('correctly identify zero (0)', () => {
    const shouldBeZero = isDefined(0);

    expect(shouldBeZero).toEqual(true);
  });
});
