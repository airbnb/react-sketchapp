import bridge from '../../../src/platformBridges/macos';

let TextStyles;
let doc;
let sharedTextStyles;

beforeEach(() => {
  jest.resetModules();

  jest.mock('../../../src/utils/getSketchVersion', () => ({
    getSketchVersion: jest.fn(() => 51),
  }));

  TextStyles = require('../../../src/sharedStyles/TextStyles').TextStyles;

  sharedTextStyles = require('../../../src/utils/sharedTextStyles');

  jest.mock('../../../src/utils/sharedTextStyles');

  TextStyles = TextStyles(() => bridge);
  sharedTextStyles = sharedTextStyles.sharedTextStyles;

  sharedTextStyles.setDocument = jest.fn((doc) => {
    if (!doc) {
      throw new Error('Please provide a sketch document reference');
    }
  });
  sharedTextStyles.addStyle = jest.fn(() => 'styleId');
  sharedTextStyles.setStyles = jest.fn(() => sharedTextStyles);

  doc = jest.fn();
});

describe('create', () => {
  describe('without a context', () => {
    it('it errors', () => {
      const styles = {};

      expect(() => TextStyles.create({}, styles)).toThrowError(
        /Please provide a sketch document reference/,
      );
    });
  });

  describe('with a context', () => {
    it('clears clearExistingStyles when true', () => {
      TextStyles.create(
        {},
        {
          clearExistingStyles: true,
          document: doc,
        },
      );

      expect(sharedTextStyles.setStyles).toHaveBeenCalled();
    });

    it('doesn’t clearExistingStyles when false', () => {
      TextStyles.create(
        {},
        {
          clearExistingStyles: false,
          document: doc,
        },
      );
      expect(sharedTextStyles.setStyles).not.toHaveBeenCalled();
    });

    it('stores one style', () => {
      const styles = {
        foo: {
          fontSize: 'bar',
        },
      };

      const res = TextStyles.create(styles, { document: doc });

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

      const res = TextStyles.create(styles, { document: doc });

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

      const res = TextStyles.create(styles, { document: doc });

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
          [key]: '',
        }),
        {},
      );

      const res = TextStyles.create({ foo: input }, { document: doc });

      const firstStoredStyle = res[Object.keys(res)[0]].cssStyle;

      whitelist.forEach((key) => {
        expect(firstStoredStyle).toHaveProperty(key, '');
      });

      blacklist.forEach((key) => {
        expect(firstStoredStyle).not.toHaveProperty(key);
      });
    });
  });
});

describe('resolve', () => {
  beforeEach(() => {
    TextStyles.create({}, { document: doc });
  });

  it('retrieves a matching style', () => {
    const key = 'foo';
    const styles = {
      [key]: { fontSize: 'bar' },
    };

    TextStyles.create(styles, { document: doc });

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

    TextStyles.create(styles, { document: doc });

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

    TextStyles.create(styles, { document: doc });

    expect(TextStyles.get('foo')).toEqual(styles.foo);
    expect(TextStyles.get('baz')).toEqual(undefined);
  });

  it('returns undefined when not found', () => {
    const styles = {
      foo: {
        fontSize: 'bar',
      },
    };

    TextStyles.create(styles, { document: doc });

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

    TextStyles.create(styles, { document: doc });
    TextStyles.clear();

    expect(TextStyles.styles()).toEqual({});
  });
});
