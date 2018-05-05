import * as yoga from 'yoga-layout';
import computeYogaTree from '../src/jsonUtils/computeYogaTree';
import Context from '../src/utils/Context';
import { reactTreeToFlexTree } from '../src/buildTree';

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
        name: 'Layer 1',
        style: {
          height: 100,
          position: 'absolute',
          width: 100,
          zIndex: 1,
        },
      },
    },
    {
      type: 'view',
      props: {
        name: 'Layer 3',
        style: {
          height: 300,
          position: 'absolute',
          width: 300,
          zIndex: 3,
        },
      },
    },
    {
      type: 'view',
      props: {
        name: 'Layer 2',
        style: {
          height: 200,
          position: 'absolute',
          width: 200,
          zIndex: 2,
        },
      },
    },
  ],
};

describe('Compute Flex Tree', () => {
  it('correctly creates flex tree', () => {
    const yogaNode = computeYogaTree(treeRootStub, new Context());
    yogaNode.calculateLayout(yoga.UNDEFINED, yoga.UNDEFINED, yoga.DIRECTION_LTR);
    const tree = reactTreeToFlexTree(treeRootStub, yogaNode, new Context());

    expect(tree.children).toEqual([
      {
        type: 'view',
        style: {
          height: 100,
          position: 'absolute',
          width: 100,
          zIndex: 1,
        },
        textStyle: {},
        layout: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          width: 100,
          height: 100,
        },
        props: {
          name: 'Layer 1',
          style: {
            height: 100,
            position: 'absolute',
            width: 100,
            zIndex: 1,
          },
          textNodes: undefined,
        },
        children: [],
      },
      {
        type: 'view',
        style: {
          height: 200,
          position: 'absolute',
          width: 200,
          zIndex: 2,
        },
        textStyle: {},
        layout: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          width: 200,
          height: 200,
        },
        props: {
          name: 'Layer 2',
          style: {
            height: 200,
            position: 'absolute',
            width: 200,
            zIndex: 2,
          },
          textNodes: undefined,
        },
        children: [],
      },
      {
        type: 'view',
        style: {
          height: 300,
          position: 'absolute',
          width: 300,
          zIndex: 3,
        },
        textStyle: {},
        layout: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          width: 300,
          height: 300,
        },
        props: {
          name: 'Layer 3',
          style: {
            height: 300,
            position: 'absolute',
            width: 300,
            zIndex: 3,
          },
          textNodes: undefined,
        },
        children: [],
      },
    ]);
  });
});
