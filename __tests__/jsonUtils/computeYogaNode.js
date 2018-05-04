import * as yoga from 'yoga-layout';
import computeYogaNode from '../../src/jsonUtils/computeYogaNode';

const widthAndHeightStylesStub = {
  width: 10,
  height: 10,
};

const widthAndHeightStylesStubFixture = {
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  width: 10,
  height: 10,
};

const createTreeNode = (style: { [key: string]: number | string }) => ({
  props: {
    style,
  },
});

const createYogaNodes = (
  styles: Array<{ [key: string]: number | string }>,
  containerWidth: number,
  containerHeight: number,
) => {
  const yogaNodes = [];
  styles.forEach((style) => {
    const treeNode = createTreeNode(style);
    const { node } = computeYogaNode(treeNode);
    node.calculateLayout(
      containerWidth || yoga.UNDEFINED,
      containerHeight || yoga.UNDEFINED,
      yoga.DIRECTION_LTR,
    );
    yogaNodes.push(node.getComputedLayout());
  });

  return yogaNodes;
};

describe('Compute Yoga Node', () => {
  it('correctly handles width: 0, auto, number', () => {
    const stylesToTest = [{ width: 100 }, { width: 0 }, { width: 'auto' }];
    const [numberNode, noneNode, autoNode] = createYogaNodes(stylesToTest);

    expect(numberNode.width).toEqual(100);
    expect(noneNode.width).toEqual(0);
    expect(autoNode.width).toEqual(0);
  });

  it('correctly handles height: 0, auto, number', () => {
    const stylesToTest = [{ height: 100 }, { height: 0 }, { height: 'auto' }];
    const [numberNode, noneNode, autoNode] = createYogaNodes(stylesToTest);

    expect(numberNode.height).toEqual(100);
    expect(noneNode.height).toEqual(0);
    expect(autoNode.height).toEqual(0);
  });

  it('correctly handles min-height: 0 & number', () => {
    const stylesToTest = [{ minHeight: 100 }, { minHeight: 0 }];
    const [numberNode, noneNode] = createYogaNodes(stylesToTest);

    expect(numberNode.height).toEqual(100);
    expect(noneNode.height).toEqual(0);
  });

  it('correctly handles max-height: 0 & number', () => {
    const stylesToTest = [{ height: '100%', maxHeight: 100 }, { maxHeight: 0 }];
    const [numberNode, noneNode] = createYogaNodes(stylesToTest, 500, 500);

    expect(numberNode.height).toEqual(100);
    expect(noneNode.height).toEqual(0);
  });

  it('correctly handles min-width: 0 & number', () => {
    const stylesToTest = [{ minWidth: 100 }, { minWidth: 0 }];
    const [numberNode, noneNode] = createYogaNodes(stylesToTest);

    expect(numberNode.width).toEqual(100);
    expect(noneNode.width).toEqual(0);
  });

  it('correctly handles max-width: 0 & number', () => {
    const stylesToTest = [{ width: '100%', maxWidth: 100 }, { maxWidth: 0 }];
    const [numberNode, noneNode] = createYogaNodes(stylesToTest, 500, 500);

    expect(numberNode.width).toEqual(100);
    expect(noneNode.width).toEqual(0);
  });

  it('correctly handles margin', () => {
    const stylesToTest = [{ margin: 100 }, { margin: 0 }, { margin: 'auto' }];
    const [numberNode, noneNode, autoNode] = createYogaNodes(stylesToTest);

    expect(numberNode).toEqual({
      left: 100,
      right: 100,
      top: 100,
      bottom: 100,
      width: 0,
      height: 0,
    });
    expect(noneNode).toEqual({
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      width: 0,
      height: 0,
    });
    expect(autoNode).toEqual({
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      width: 0,
      height: 0,
    });
  });

  it('correctly handles padding', () => {
    const stylesToTest = [{ padding: 100 }, { padding: 0 }];
    const [numberNode, noneNode] = createYogaNodes(stylesToTest);

    expect(numberNode).toEqual({
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      width: 200,
      height: 200,
    });
    expect(noneNode).toEqual({
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      width: 0,
      height: 0,
    });
  });

  it('correctly handles border', () => {
    const stylesToTest = [{ borderWidth: 10 }, { borderWidth: 0 }];
    const [numberNode, noneNode] = createYogaNodes(stylesToTest);

    expect(numberNode).toEqual({
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      width: 20,
      height: 20,
    });
    expect(noneNode).toEqual({
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      width: 0,
      height: 0,
    });
  });

  it('correctly handles flex: 0, number', () => {
    const stylesToTest = [{ flex: 1 }, { flex: 0 }];
    const [numberNode, noneNode] = createYogaNodes(stylesToTest);

    expect(numberNode.width).toEqual(0);
    expect(noneNode.width).toEqual(0);
  });

  it('correctly handles flexGrow: 0, number', () => {
    const stylesToTest = [{ flexGrow: 1 }, { flexGrow: 0 }];
    const [numberNode, noneNode] = createYogaNodes(stylesToTest);

    expect(numberNode.width).toEqual(0);
    expect(noneNode.width).toEqual(0);
  });

  it('correctly handles flexShrink: 0, number', () => {
    const stylesToTest = [{ flexShrink: 1 }, { flexShrink: 0 }];
    const [numberNode, noneNode] = createYogaNodes(stylesToTest);

    expect(numberNode.width).toEqual(0);
    expect(noneNode.width).toEqual(0);
  });

  it('correctly handles flexBasis: 0, number', () => {
    const stylesToTest = [{ flexBasis: 1 }, { flexBasis: 0 }];
    const [numberNode, noneNode] = createYogaNodes(stylesToTest);

    expect(numberNode.width).toEqual(0);
    expect(noneNode.width).toEqual(0);
  });

  it('correctly handles position: relative & absolute', () => {
    const stylesToTest = [{ position: 'relative', left: 10 }, { position: 'absolute', top: 10 }];
    const [relativeNode, absoluteNode] = createYogaNodes(stylesToTest);

    expect(relativeNode).toEqual({
      left: 10,
      right: 10,
      top: 0,
      bottom: 0,
      width: 0,
      height: 0,
    });
    expect(absoluteNode).toEqual({
      left: 0,
      right: 0,
      top: 10,
      bottom: 10,
      width: 0,
      height: 0,
    });
  });

  it('correctly handles display: flex & none', () => {
    const stylesToTest = [
      { display: 'flex', ...widthAndHeightStylesStub },
      { display: 'none', width: 10, height: 10 },
    ];
    const [relativeNode, absoluteNode] = createYogaNodes(stylesToTest);

    expect(relativeNode).toEqual(widthAndHeightStylesStubFixture);
    expect(absoluteNode).toEqual(widthAndHeightStylesStubFixture);
  });

  it('correctly handles overflow: visible, scroll, hidden', () => {
    const stylesToTest = [
      { overflow: 'visible', ...widthAndHeightStylesStub },
      { overflow: 'scroll', ...widthAndHeightStylesStub },
      { overflow: 'hidden', ...widthAndHeightStylesStub },
    ];
    const [visibleNode, scrollNode, hiddenNode] = createYogaNodes(stylesToTest);

    expect(visibleNode).toEqual(widthAndHeightStylesStubFixture);
    expect(scrollNode).toEqual(widthAndHeightStylesStubFixture);
    expect(hiddenNode).toEqual(widthAndHeightStylesStubFixture);
  });

  it('correctly handles flexDirection', () => {
    const stylesToTest = [
      { flexDirection: 'row', ...widthAndHeightStylesStub },
      { flexDirection: 'column', ...widthAndHeightStylesStub },
      { flexDirection: 'row-reverse', ...widthAndHeightStylesStub },
      { flexDirection: 'column-reverse', ...widthAndHeightStylesStub },
    ];
    const [rowNode, colNode, rowReverseNode, colReverseNode] = createYogaNodes(stylesToTest);

    expect(rowNode).toEqual(widthAndHeightStylesStubFixture);
    expect(colNode).toEqual(widthAndHeightStylesStubFixture);
    expect(rowReverseNode).toEqual(widthAndHeightStylesStubFixture);
    expect(colReverseNode).toEqual(widthAndHeightStylesStubFixture);
  });

  it('correctly handles justifyContent', () => {
    const stylesToTest = [
      { justifyContent: 'flex-start', ...widthAndHeightStylesStub },
      { justifyContent: 'flex-end', ...widthAndHeightStylesStub },
      { justifyContent: 'center', ...widthAndHeightStylesStub },
      { justifyContent: 'space-between', ...widthAndHeightStylesStub },
      { justifyContent: 'space-around', ...widthAndHeightStylesStub },
    ];
    const [startNode, endNode, centerNode, spaceBetweenNode, spaceAroundNode] = createYogaNodes(
      stylesToTest,
    );

    expect(startNode).toEqual(widthAndHeightStylesStubFixture);
    expect(endNode).toEqual(widthAndHeightStylesStubFixture);
    expect(centerNode).toEqual(widthAndHeightStylesStubFixture);
    expect(spaceBetweenNode).toEqual(widthAndHeightStylesStubFixture);
    expect(spaceAroundNode).toEqual(widthAndHeightStylesStubFixture);
  });

  it('correctly handles alignContent', () => {
    const stylesToTest = [
      { alignContent: 'flex-start', ...widthAndHeightStylesStub },
      { alignContent: 'flex-end', ...widthAndHeightStylesStub },
      { alignContent: 'center', ...widthAndHeightStylesStub },
      { alignContent: 'stretch', ...widthAndHeightStylesStub },
      { alignContent: 'baseline', ...widthAndHeightStylesStub },
      { alignContent: 'space-between', ...widthAndHeightStylesStub },
      { alignContent: 'space-around', ...widthAndHeightStylesStub },
      { alignContent: 'auto', ...widthAndHeightStylesStub },
    ];
    const [
      startNode,
      endNode,
      centerNode,
      stretchNode,
      baselineNode,
      spaceBetweenNode,
      spaceAroundNode,
      autoNode,
    ] = createYogaNodes(stylesToTest);

    expect(startNode).toEqual(widthAndHeightStylesStubFixture);
    expect(endNode).toEqual(widthAndHeightStylesStubFixture);
    expect(centerNode).toEqual(widthAndHeightStylesStubFixture);
    expect(stretchNode).toEqual(widthAndHeightStylesStubFixture);
    expect(baselineNode).toEqual(widthAndHeightStylesStubFixture);
    expect(spaceBetweenNode).toEqual(widthAndHeightStylesStubFixture);
    expect(spaceAroundNode).toEqual(widthAndHeightStylesStubFixture);
    expect(autoNode).toEqual(widthAndHeightStylesStubFixture);
  });

  it('correctly handles alignItems', () => {
    const stylesToTest = [
      { alignItems: 'flex-start', ...widthAndHeightStylesStub },
      { alignItems: 'flex-end', ...widthAndHeightStylesStub },
      { alignItems: 'center', ...widthAndHeightStylesStub },
      { alignItems: 'stretch', ...widthAndHeightStylesStub },
      { alignItems: 'baseline', ...widthAndHeightStylesStub },
    ];
    const [startNode, endNode, centerNode, stretchNode, baselineNode] = createYogaNodes(
      stylesToTest,
    );

    expect(startNode).toEqual(widthAndHeightStylesStubFixture);
    expect(endNode).toEqual(widthAndHeightStylesStubFixture);
    expect(centerNode).toEqual(widthAndHeightStylesStubFixture);
    expect(stretchNode).toEqual(widthAndHeightStylesStubFixture);
    expect(baselineNode).toEqual(widthAndHeightStylesStubFixture);
  });

  it('correctly handles alignSelf', () => {
    const stylesToTest = [
      { alignSelf: 'flex-start', ...widthAndHeightStylesStub },
      { alignSelf: 'flex-end', ...widthAndHeightStylesStub },
      { alignSelf: 'center', ...widthAndHeightStylesStub },
      { alignSelf: 'stretch', ...widthAndHeightStylesStub },
      { alignSelf: 'baseline', ...widthAndHeightStylesStub },
    ];
    const [startNode, endNode, centerNode, stretchNode, baselineNode] = createYogaNodes(
      stylesToTest,
    );

    expect(startNode).toEqual(widthAndHeightStylesStubFixture);
    expect(endNode).toEqual(widthAndHeightStylesStubFixture);
    expect(centerNode).toEqual(widthAndHeightStylesStubFixture);
    expect(stretchNode).toEqual(widthAndHeightStylesStubFixture);
    expect(baselineNode).toEqual(widthAndHeightStylesStubFixture);
  });

  it('correctly handles flexWrap', () => {
    const stylesToTest = [
      { flexWrap: 'no-wrap', ...widthAndHeightStylesStub },
      { flexWrap: 'wrap', ...widthAndHeightStylesStub },
      { flexWrap: 'wrap-reverse', ...widthAndHeightStylesStub },
    ];
    const [noWrapNode, wrapNode, wrapReverseNode] = createYogaNodes(stylesToTest);

    expect(noWrapNode).toEqual(widthAndHeightStylesStubFixture);
    expect(wrapNode).toEqual(widthAndHeightStylesStubFixture);
    expect(wrapReverseNode).toEqual(widthAndHeightStylesStubFixture);
  });
});
