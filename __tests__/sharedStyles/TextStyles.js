/* eslint-disable global-require */
let TextStyles;
let context;
let sharedTextStyles;

beforeEach(() => {
  jest.resetModules();
  TextStyles = require('../../src/sharedStyles/TextStyles').default;

  const applyTextStyleToLayer = require('../../src/utils/applyTextStyleToLayer').default;

  jest.mock('../../src/utils/applyTextStyleToLayer');
  applyTextStyleToLayer.mockImplementation(layer => layer);

  sharedTextStyles = require('../../src/wrappers/sharedTextStyles').default;

  jest.mock('../../src/wrappers/sharedTextStyles');

  const textLayer = require('../../src/wrappers/textLayer').default;

  jest.mock('../../src/wrappers/textLayer');

  textLayer.mockImplementation(() => ({
    style: () => null,
  }));

  sharedTextStyles.addStyle = jest.fn();
  sharedTextStyles.setStyles = jest.fn();

  context = jest.fn();
});

describe('create', () => {
  describe('without a context', () => {
    test('it errors', () => {
      const styles = {};
      expect(() =>
        TextStyles.create(null, styles)
      ).toThrowError(/Please provide a context/);

      expect(() =>
        TextStyles.create({}, styles)
      ).toThrowError(/Please provide a context/);
    });
  });

  describe('with a context', () => {
    test('with clearExistingStyles', () => {
      TextStyles.create({
        clearExistingStyles: true,
        context,
      }, {});

      expect(sharedTextStyles.setStyles).toHaveBeenCalled();
    });

    test('without clearExistingStyles', () => {
      TextStyles.create({
        clearExistingStyles: false,
        context,
      }, {});
      expect(sharedTextStyles.setStyles).not.toHaveBeenCalled();
    });

    test('one style', () => {
      const styles = {
        foo: {
          foo: 'bar',
        },
      };

      const res = TextStyles.create({ context }, styles);

      expect(Object.keys(res).length).toBe(1);
    });

    test('two styles', () => {
      const styles = {
        foo: {
          foo: 'bar',
        },
        bar: {
          baz: 'qux',
        },
      };

      const res = TextStyles.create({ context }, styles);

      expect(Object.keys(res).length).toBe(2);
      expect(sharedTextStyles.addStyle).toHaveBeenCalledTimes(2);
    });

    test('unique keys w/ unique styles', () => {
      const styles = {
        foo: {
          foo: 'bar',
        },
        bar: {
          baz: 'bar',
        },
      };

      const res = TextStyles.create({ context }, styles);

      expect(Object.keys(res).length).toBe(2);
      expect(sharedTextStyles.addStyle).toHaveBeenCalledTimes(2);
    });

    test('duplicate keys w/ unique styles', () => {
      const styles = {
        foo: {
          foo: 'bar',
        },
        foo: { // eslint-disable-line no-dupe-keys
          baz: 'bar',
        },
      };

      const res = TextStyles.create({ context }, styles);

      expect(Object.keys(res).length).toBe(1);
      expect(sharedTextStyles.addStyle).toHaveBeenCalledTimes(1);
    });

    test('unique keys w/ duplicate styles', () => {
      const styles = {
        foo: {
          foo: 'bar',
        },
        bar: {
          foo: 'bar',
        },
      };

      const res = TextStyles.create({ context }, styles);

      expect(Object.keys(res).length).toBe(1);
      expect(sharedTextStyles.addStyle).toHaveBeenCalledTimes(2);
    });

    test('duplicate keys w/ duplicate styles', () => {
      const styles = {
        foo: {
          foo: 'bar',
        },
        foo: { // eslint-disable-line no-dupe-keys
          foo: 'bar',
        },
      };

      const res = TextStyles.create({ context }, styles);

      expect(Object.keys(res).length).toBe(1);
      expect(sharedTextStyles.addStyle).toHaveBeenCalledTimes(1);
    });
  });
});

describe('resolve', () => {
  beforeEach(() => {
    TextStyles.create({
      context,
    }, {});
  });

  test('retrieves a matching style', () => {
    const key = 'foo';
    const styles = {
      [key]: { foo: 'bar' },
    };

    TextStyles.create({ context }, styles);

    expect(TextStyles.resolve(styles[key])).toBeDefined();
    expect(sharedTextStyles.addStyle).toHaveBeenCalledTimes(1);
  });

  test('returns null with no matching style', () => {
    const key = 'foo';
    const styles = {
      [key]: {
        foo: 'bar',
      },
    };
    const style2 = {
      baz: 'qux',
    };

    TextStyles.create({ context }, styles);

    expect(TextStyles.resolve(style2)).not.toBeDefined();
    expect(sharedTextStyles.addStyle).toHaveBeenCalledTimes(1);
  });
});
