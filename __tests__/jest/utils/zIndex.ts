import { zIndex } from '../../../src/utils/zIndex';

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
    // @ts-ignore
    const shouldBeResorted = zIndex(fixureThatShouldBeSortedDifferently);
    // @ts-ignore
    expect(shouldBeResorted[0].props.style.zIndex).toEqual(0);
  });

  it('correctly add original index to returned objects ', () => {
    // @ts-ignore
    const shouldBeResorted = zIndex(fixureThatShouldBeSortedDifferently);

    // @ts-ignore
    expect(shouldBeResorted[0].oIndex).toEqual(0);
  });

  it('correctly resort zIndexes that are all the same', () => {
    // @ts-ignore
    const shouldNotBeResorted = zIndex(fixureThatShouldNotBeSortedDifferently);

    // @ts-ignore
    expect(shouldNotBeResorted[0].props.style.zIndex).toEqual(0);
  });
});
