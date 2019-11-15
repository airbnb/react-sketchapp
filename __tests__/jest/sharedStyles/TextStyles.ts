/* eslint-disable global-require */
let TextStyles;
let ctx;
let sharedTextStyles;

beforeEach(() => {
  jest.resetModules();

  jest.mock('../../../src/utils/getSketchVersion', () => ({
    getSketchVersion: jest.fn(() => 51),
  }));

  TextStyles = require('../../../src/sharedStyles/TextStyles');

  sharedTextStyles = require('../../../src/wrappers/sharedTextStyles');

  jest.mock('../../../src/wrappers/sharedTextStyles');

  jest.mock('../../../src/jsonUtils/sketchImpl/createStringMeasurer');
  jest.mock('../../../src/jsonUtils/sketchImpl/findFontName');
  jest.mock('../../../src/jsonUtils/sketchImpl/makeImageDataFromUrl');
  jest.mock('../../../src/jsonUtils/sketchImpl/makeSvgLayer');

  TextStyles = TextStyles.default;
  sharedTextStyles = sharedTextStyles.default;

  sharedTextStyles.setContext = jest.fn(ctx => {
    if (!ctx) {
      throw new Error('Please provide a context');
    }
  });
  sharedTextStyles.addStyle = jest.fn(() => 'styleId');
  sharedTextStyles.setStyles = jest.fn(() => sharedTextStyles);

  ctx = jest.fn();
});

describe('create', () => {
  describe('without a context', () => {
    it('it errors', () => {
      const styles = {};

      expect(() => TextStyles.create({}, styles)).toThrowError(/Please provide a context/);
    });
  });

  describe('with a context', () => {
    it('clears clearExistingStyles when true', () => {
      TextStyles.create(
        {
          clearExistingStyles: true,
          context: ctx,
        },
        {},
      );

      expect(sharedTextStyles.setStyles).toHaveBeenCalled();
    });

    it('doesn’t clearExistingStyles when false', () => {
      TextStyles.create(
        {
          clearExistingStyles: false,
          context: ctx,
        },
        {},
      );
      expect(sharedTextStyles.setStyles).not.toHaveBeenCalled();
    });

    it('stores one style', () => {
      const styles = {
        foo: {
          fontSize: 'bar',
        },
      };

      const res = TextStyles.create({ context: ctx }, styles);

      expect(Object.keys(res).length).toBe(1);
    });

    it('stores unique styles seperately', () => {
      const styles = {
        foo: {
          fontSize: 'bar',
        },
        bar: {
          fontSize: 'baz',
        },
      };

      const res = TextStyles.create({ context: ctx }, styles);

      expect(Object.keys(res).length).toBe(2);
      expect(sharedTextStyles.addStyle).toHaveBeenCalledTimes(2);
    });

    it('merges duplicate styles', () => {
      const styles = {
        foo: {
          fontSize: 'foo',
        },
        bar: {
          fontSize: 'foo',
        },
      };

      const res = TextStyles.create({ context: ctx }, styles);

      expect(Object.keys(res).length).toBe(1);
      expect(sharedTextStyles.addStyle).toHaveBeenCalledTimes(2);
    });

    it('only stores text attributes', () => {
      const whitelist = [
        'color',
        'fontFamily',
        'fontSize',
        'fontStyle',
        'fontWeight',
        'textShadowOffset',
        'textShadowRadius',
        'textShadowColor',
        'textTransform',
        'letterSpacing',
        'lineHeight',
        'textAlign',
        'writingDirection',
      ];

      const blacklist = ['foo', 'bar', 'baz'];

      const input = [...whitelist, ...blacklist].reduce(
        (acc, key) => ({
          ...acc,
          [key]: true,
        }),
        {},
      );

      const res = TextStyles.create(
        {
          context: ctx,
        },
        { foo: input },
      );

      const firstStoredStyle = res[Object.keys(res)[0]].cssStyle;

      whitelist.forEach(key => {
        expect(firstStoredStyle).toHaveProperty(key, true);
      });

      blacklist.forEach(key => {
        expect(firstStoredStyle).not.toHaveProperty(key);
      });
    });
  });
});

describe('resolve', () => {
  beforeEach(() => {
    TextStyles.create(
      {
        context: ctx,
      },
      {},
    );
  });

  it('retrieves a matching style', () => {
    const key = 'foo';
    const styles = {
      [key]: { fontSize: 'bar' },
    };

    TextStyles.create({ context: ctx }, styles);

    expect(TextStyles.resolve(styles[key])).toBeDefined();
    expect(sharedTextStyles.addStyle).toHaveBeenCalledTimes(1);
  });

  it('returns null with no matching style', () => {
    const key = 'foo';
    const styles = {
      [key]: {
        fontSize: 'bar',
      },
    };
    const style2 = {
      fontSize: 'qux',
    };

    TextStyles.create({ context: ctx }, styles);

    expect(TextStyles.resolve(style2)).not.toBeDefined();
    expect(sharedTextStyles.addStyle).toHaveBeenCalledTimes(1);
  });
});

describe('get', () => {
  it('finds a matching registered style by name', () => {
    const styles = {
      foo: {
        fontSize: 'bar',
      },
      bar: {
        fontSize: 'baz',
      },
    };

    TextStyles.create({ context: ctx }, styles);

    expect(TextStyles.get('foo')).toEqual(styles.foo);
    expect(TextStyles.get('baz')).toEqual(undefined);
  });

  it('returns undefined when not found', () => {
    const styles = {
      foo: {
        fontSize: 'bar',
      },
    };

    TextStyles.create({ context: ctx }, styles);

    expect(TextStyles.get('baz')).toEqual(undefined);
  });
});

describe('clear', () => {
  it('clears previously registered styles', () => {
    const styles = {
      foo: {
        fontSize: 'bar',
      },
      bar: {
        fontSize: 'baz',
      },
    };

    TextStyles.create({ context: ctx }, styles);
    TextStyles.clear();

    expect(TextStyles.styles()).toEqual({});
  });
});
