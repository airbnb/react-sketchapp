/* eslint-disable global-require */
let StyleProvider;
let context;
let TextStyles;

beforeEach(() => {
  jest.resetModules();
  StyleProvider = require('../src/StyleProvider').default;

  const applyTextStyleToLayer = require('../src/utils/applyTextStyleToLayer').default;

  jest.mock('../src/utils/applyTextStyleToLayer');
  applyTextStyleToLayer.mockImplementation(layer => layer);

  TextStyles = require('../src/wrappers/sharedTextStyles').default;

  jest.mock('../src/wrappers/sharedTextStyles');

  const textLayer = require('../src/wrappers/textLayer').default;
  jest.mock('../src/wrappers/textLayer');

  textLayer.mockImplementation(() => ({
    style: () => null,
  }));

  TextStyles.addStyle = jest.fn();
  TextStyles.setStyles = jest.fn();

  context = jest.fn();
});

describe('create', () => {
  describe('without a context', () => {
    test('it errors', () => {
      const styles = {};
      expect(() =>
        StyleProvider.create(null, styles)
      ).toThrowError(/Please provide a context/);

      expect(() =>
        StyleProvider.create({}, styles)
      ).toThrowError(/Please provide a context/);
    });
  });

  describe('with a context', () => {
    test('with clearExistingStyles', () => {
      StyleProvider.create({
        clearExistingStyles: true,
        context,
      }, {});

      expect(TextStyles.setStyles).toHaveBeenCalled();
    });

    test('without clearExistingStyles', () => {
      StyleProvider.create({
        clearExistingStyles: false,
        context,
      }, {});
      expect(TextStyles.setStyles).not.toHaveBeenCalled();
    });
    test('one style', () => {
      const styles = {
        foo: {
          foo: 'bar',
        },
      };

      const res = StyleProvider.create({ context }, styles);

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

      const res = StyleProvider.create({ context }, styles);

      expect(Object.keys(res).length).toBe(2);
      expect(TextStyles.addStyle).toHaveBeenCalledTimes(2);
    });
  });
});

describe('registerStyle', () => {
  beforeEach(() => {
    StyleProvider.create({
      context,
    }, {});
  });

  test('one style', () => {
    const key = 'foo';
    const style = {
      foo: 'bar',
    };

    const styles = StyleProvider.registerStyle(key, style);

    expect(Object.keys(styles).length).toBe(1);
    expect(TextStyles.addStyle).toHaveBeenCalledTimes(1);
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

    let styles = StyleProvider.registerStyle(key1, style1);
    styles = StyleProvider.registerStyle(key2, style2);

    expect(Object.keys(styles).length).toBe(2);
    expect(TextStyles.addStyle).toHaveBeenCalledTimes(2);
  });

  test('duplicate keys w/ unique styles', () => {
    const key = 'foo';
    const style1 = {
      foo: 'bar',
    };

    const style2 = {
      baz: 'bar',
    };

    let styles = StyleProvider.registerStyle(key, style1);
    styles = StyleProvider.registerStyle(key, style2);

    expect(Object.keys(styles).length).toBe(2);
    expect(TextStyles.addStyle).toHaveBeenCalledTimes(2);
  });

  test('unique keys w/ duplicate styles', () => {
    const key1 = 'foo';
    const key2 = 'bar';
    const style = {
      foo: 'bar',
    };

    let styles = StyleProvider.registerStyle(key1, style);
    styles = StyleProvider.registerStyle(key2, style);

    expect(Object.keys(styles).length).toBe(1);
  });

  test('duplicate keys w/ duplicate styles', () => {
    const key = 'foo';
    const style = {
      foo: 'bar',
    };

    let styles = StyleProvider.registerStyle(key, style);
    styles = StyleProvider.registerStyle(key, style);

    expect(Object.keys(styles).length).toBe(1);
    expect(TextStyles.addStyle).toHaveBeenCalledTimes(2);
  });
});

describe('resolve', () => {
  beforeEach(() => {
    StyleProvider.create({
      context,
    }, {});
  });

  test('retrieves a matching style', () => {
    const key = 'foo';
    const style = {
      foo: 'bar',
    };

    StyleProvider.registerStyle(key, style);

    expect(StyleProvider.resolve(style)).toBeDefined();
    expect(TextStyles.addStyle).toHaveBeenCalledTimes(1);
  });

  test('returns null with no matching style', () => {
    const key = 'foo';
    const style1 = {
      foo: 'bar',
    };
    const style2 = {
      baz: 'qux',
    };

    StyleProvider.registerStyle(key, style1);

    expect(StyleProvider.resolve(style2)).not.toBeDefined();
    expect(TextStyles.addStyle).toHaveBeenCalledTimes(1);
  });
});
