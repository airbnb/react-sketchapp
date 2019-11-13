import computeTextTree from '../../../src/jsonUtils/computeTextTree';
import Context from '../../../src/utils/Context';

// Example Text component tree
const treeStub = {
  type: 'text',
  props: {
    name: 'Swatch Hex',
    style: {
      color: '#636464',
      zIndex: 1,
    },
  },
  children: [
    '#F3F4F4',
    ' ',
    {
      type: 'text',
      props: {
        name: 'Text',
        style: {
          color: 'blue',
        },
      },
      children: ['Hello World'],
    },
  ],
};

// Correct Output
const treeFixture = [
  { content: '#F3F4F4', textStyles: {} },
  { content: ' ', textStyles: {} },
  { content: 'Hello World', textStyles: { color: 'blue' } },
];

describe('Compute Text Tree', () => {
  it('correctly handle Text nodes', () => {
    const tree = computeTextTree(treeStub, new Context());
    expect(tree).toEqual(treeFixture);
  });
});
