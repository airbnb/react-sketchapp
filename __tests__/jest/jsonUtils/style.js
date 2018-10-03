import { makeBorderOptions, makeShadow } from '../../../src/jsonUtils/style';

describe('makeBorderOptions', () => {
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

describe('makeShadow', () => {
  it('has sensible defaults', () => {
    const result = makeShadow({});

    expect(result).toHaveProperty('color.alpha', 1);
    expect(result).toHaveProperty('blurRadius', 1);
    expect(result).toHaveProperty('offsetX', 0);
    expect(result).toHaveProperty('offsetY', 0);
  });

  it('passes through props', () => {
    const result = makeShadow({
      shadowOpacity: 0.5,
      shadowColor: 'red',
      shadowRadius: 10,
      shadowOffset: {
        width: 5,
        height: 7,
      },
    });

    expect(result).toHaveProperty('color.alpha', 0.5);
    expect(result).toHaveProperty('blurRadius', 10);
    expect(result).toHaveProperty('offsetX', 5);
    expect(result).toHaveProperty('offsetY', 7);
  });

  it('combines rgba alpha & shadowOpacity', () => {
    const result = makeShadow({
      shadowOpacity: 0.5,
      shadowColor: 'rgba(0,0,0,0.5)',
      shadowRadius: 10,
      shadowOffset: {
        width: 5,
        height: 7,
      },
    });

    expect(result.color.alpha).toBeCloseTo(0.25);
  });
});

xdescribe('makeVerticalBorder');

xdescribe('makeHorizontalBorder');
