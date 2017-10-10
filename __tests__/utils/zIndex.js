import zIndex from '../../src/utils/zIndex';

const noZIndexNode = {
  props: {
    style: {
      zIndex: 0,
    },
  },
};

const zIndexNode = {
  props: {
    style: {
      zIndex: 1,
    },
  },
};

const fixureThatShouldBeSortedDifferently = [noZIndexNode, zIndexNode];
const fixureThatShouldNotBeSortedDifferently = [noZIndexNode, noZIndexNode];

describe('zIndex', () => {
  it('correctly resort zIndex', () => {
    const shouldBeResorted = zIndex(fixureThatShouldBeSortedDifferently);

    expect(shouldBeResorted[0].props.style.zIndex).toEqual(1);
  });

  it('correctly resort zIndex (reversed)', () => {
    const shouldBeResorted = zIndex(fixureThatShouldBeSortedDifferently, true);

    expect(shouldBeResorted[0].props.style.zIndex).toEqual(0);
  });

  it('correctly add original index to returned objects ', () => {
    const shouldBeResorted = zIndex(fixureThatShouldBeSortedDifferently);

    expect(shouldBeResorted[0].oIndex).toEqual(1);
  });

  it('correctly resort zIndexes that are all the same', () => {
    const shouldNotBeResorted = zIndex(fixureThatShouldNotBeSortedDifferently);

    expect(shouldNotBeResorted[0].props.style.zIndex).toEqual(0);
  });

  it('correctly resort zIndexes that are all the same (reversed)', () => {
    const shouldNotBeResorted = zIndex(
      fixureThatShouldNotBeSortedDifferently,
      true
    );

    expect(shouldNotBeResorted[0].props.style.zIndex).toEqual(0);
  });
});
