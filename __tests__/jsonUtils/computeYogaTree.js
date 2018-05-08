import * as yoga from 'yoga-layout';
import computeYogaTree from '../../src/jsonUtils/computeYogaTree';
import Context from '../../src/utils/Context';

const treeRootStub = {
  type: 'artboard',
  props: {
    style: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      width: 416,
    },
    name: 'Swatches',
  },
  children: [
    {
      type: 'view',
      props: {
        name: 'Swatch Haus',
        style: {
          backgroundColor: '#F3F4F4',
          height: 96,
          marginTop: 4,
          marginRight: 4,
          marginBottom: 4,
          marginLeft: 4,
          paddingTop: 8,
          paddingRight: 8,
          paddingBottom: 8,
          paddingLeft: 8,
          width: 96,
        },
      },
    },
  ],
};

computeYogaTree(treeRootStub, new Context());

describe('Compute Yoga Tree', () => {
  it('correctly create yoga nodes into layout tree', () => {
    const yogaTree = computeYogaTree(treeRootStub, new Context());
    yogaTree.calculateLayout(yoga.UNDEFINED, yoga.UNDEFINED, yoga.DIRECTION_LTR);
    expect(yogaTree.getComputedLayout()).toEqual({
      bottom: 0,
      height: 104,
      left: 0,
      right: 0,
      top: 0,
      width: 416,
    });

    expect(yogaTree.getChild(0).getComputedLayout()).toEqual({
      bottom: 4,
      height: 96,
      left: 4,
      right: 4,
      top: 4,
      width: 96,
    });
  });
});
