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

    test('one style', () => {
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
  });
});

describe('registerStyle', () => {
  beforeEach(() => {
    TextStyles.create({
      context,
    }, {});
  });

  test('one style', () => {
    const key = 'foo';
    const style = {
      foo: 'bar',
    };

    const styles = TextStyles.registerStyle(key, style);

    expect(Object.keys(styles).length).toBe(1);
    expect(sharedTextStyles.addStyle).toHaveBeenCalledTimes(1);
  });

  test('unique keys w/ unique styles', () => {
    const key1 = 'foo';
    const style1 = {
      foo: 'bar',
    };

    const key2 = 'bar';
    const style2 = {
      baz: 'bar',
    };

    let styles = TextStyles.registerStyle(key1, style1);
    styles = TextStyles.registerStyle(key2, style2);

    expect(Object.keys(styles).length).toBe(2);
    expect(sharedTextStyles.addStyle).toHaveBeenCalledTimes(2);
  });

  test('duplicate keys w/ unique styles', () => {
    const key = 'foo';
    const style1 = {
      foo: 'bar',
    };

    const style2 = {
      baz: 'bar',
    };

    let styles = TextStyles.registerStyle(key, style1);
    styles = TextStyles.registerStyle(key, style2);

    expect(Object.keys(styles).length).toBe(2);
    expect(sharedTextStyles.addStyle).toHaveBeenCalledTimes(2);
  });

  test('unique keys w/ duplicate styles', () => {
    const key1 = 'foo';
    const key2 = 'bar';
    const style = {
      foo: 'bar',
    };

    let styles = TextStyles.registerStyle(key1, style);
    styles = TextStyles.registerStyle(key2, style);

    expect(Object.keys(styles).length).toBe(1);
  });

  test('duplicate keys w/ duplicate styles', () => {
    const key = 'foo';
    const style = {
      foo: 'bar',
    };

    let styles = TextStyles.registerStyle(key, style);
    styles = TextStyles.registerStyle(key, style);

    expect(Object.keys(styles).length).toBe(1);
    expect(sharedTextStyles.addStyle).toHaveBeenCalledTimes(2);
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
    const style = {
      foo: 'bar',
    };

    TextStyles.registerStyle(key, style);

    expect(TextStyles.resolve(style)).toBeDefined();
    expect(sharedTextStyles.addStyle).toHaveBeenCalledTimes(1);
  });

  test('returns null with no matching style', () => {
    const key = 'foo';
    const style1 = {
      foo: 'bar',
    };
    const style2 = {
      baz: 'qux',
    };

    TextStyles.registerStyle(key, style1);

    expect(TextStyles.resolve(style2)).not.toBeDefined();
    expect(sharedTextStyles.addStyle).toHaveBeenCalledTimes(1);
  });
});
