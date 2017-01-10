/* eslint-disable global-require */
let StyleProvider;
let context;

beforeEach(() => {
  jest.resetModules();
  StyleProvider = require('../src/StyleProvider').default;
  const createLayerFromStyle = require('../src/createLayerFromStyle').default;

  jest.mock('../src/createLayerFromStyle');
  createLayerFromStyle.mockImplementation((name, style) => ({
    style() { return style; },
  }));

  context = {
    sharedStyles: {
      setObjects: jest.fn(),
      addSharedStyleWithName_firstInstance: jest.fn(),
    },
  };
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
    });
  });
});

describe('registerStyle', () => {
  describe('without a context', () => {
    test('it errors', () => {
      const style = {};
      expect(() =>
        StyleProvider.registerStyle('foo', style)
      ).toThrowError(/Please provide a context/);
    });
  });

  describe('with a context', () => {
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

      expect(context.sharedStyles.addSharedStyleWithName_firstInstance).toBeCalled();
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

      expect(context.sharedStyles.addSharedStyleWithName_firstInstance).toHaveBeenCalledTimes(2);
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

      expect(context.sharedStyles.addSharedStyleWithName_firstInstance).toHaveBeenCalledTimes(2);
    });

    test('duplicate keys w/ duplicate styles', () => {
      const key = 'foo';
      const style = {
        foo: 'bar',
      };

      let styles = StyleProvider.registerStyle(key, style);
      styles = StyleProvider.registerStyle(key, style);

      expect(Object.keys(styles).length).toBe(1);

      expect(context.sharedStyles.addSharedStyleWithName_firstInstance).toHaveBeenCalledTimes(2);
    });
  });
});
