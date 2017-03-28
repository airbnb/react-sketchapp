import { makeBorderOptions } from '../../src/jsonUtils/style';

describe.only('makeBorderOptions', () => {
  it('makes solid borders', () => {
    expect(makeBorderOptions('solid', 1)).toHaveProperty('dashPattern', []);
  });

  it('makes dotted borders', () => {
    expect(makeBorderOptions('dotted', 1)).toHaveProperty('dashPattern', [1, 1]);

    expect(makeBorderOptions('dotted', 5)).toHaveProperty('dashPattern', [5, 5]);
  });

  it('makes dashed borders', () => {
    expect(makeBorderOptions('dashed', 1)).toHaveProperty('dashPattern', [3, 3]);

    expect(makeBorderOptions('dashed', 5)).toHaveProperty('dashPattern', [15, 15]);
  });
});

xdescribe('makeShadow');

xdescribe('makeVerticalBorder');

xdescribe('makeHorizontalBorder');
