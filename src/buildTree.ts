import * as TestRenderer from 'react-test-renderer';
import yoga from 'yoga-layout-prebuilt';
import { Context } from './utils/Context';
import { TreeNode, TextNode, PlatformBridge } from './types';
import { hasAnyDefined } from './utils/hasAnyDefined';
import { pick } from './utils/pick';
import { computeYogaTree } from './jsonUtils/computeYogaTree';
import { computeTextTree } from './jsonUtils/computeTextTree';
import { INHERITABLE_FONT_STYLES } from './utils/constants';
import { zIndex } from './utils/zIndex';

export const reactTreeToFlexTree = (
  node: TestRenderer.ReactTestRendererNode,
  yogaNode: yoga.YogaNode,
  context: Context,
): TreeNode => {
  let textNodes: TextNode[] = [];
  let textStyle = context.getInheritedStyles();

  let newChildren: (string | TreeNode<any>)[] = [];

  let style: any;
  let type: string;

  if (typeof node === 'string') {
    textNodes = computeTextTree(node, context);
    type = 'sketch_text';
  } else {
    style = node.props && node.props.style ? node.props.style : {};
    type = node.type || 'sketch_text';

    if (type === 'sketch_svg' && node.children) {
      // @ts-ignore
      newChildren = node.children;
    } else if (type === 'sketch_text') {
      // If current node is a Text node, add text styles to Context to pass down to
      // child nodes.
      if (node.props && node.props.style && hasAnyDefined(style, INHERITABLE_FONT_STYLES)) {
        const inheritableStyles: any = pick(style, INHERITABLE_FONT_STYLES);
        inheritableStyles.flexDirection = 'row';
        context.addInheritableStyles(inheritableStyles);
        textStyle = {
          ...context.getInheritedStyles(),
          ...inheritableStyles,
        };
      }

      // Compute Text Children
      textNodes = computeTextTree(node, context);
    } else if (node.children && node.children.length > 0) {
      // Recursion reverses the render stacking order
      // but that's actually fine because Sketch renders the first on top

      // Calculates zIndex order to match yoga
      const children = zIndex(node.children);

      for (let index = 0; index < children.length; index += 1) {
        const childComponent = children[index];

        const childNode = yogaNode.getChild(index);

        const renderedChildComponent = reactTreeToFlexTree(
          childComponent,
          childNode,
          context.forChildren(),
        );
        newChildren.push(renderedChildComponent);
      }
    }
  }

  return {
    type,
    style,
    textStyle,
    layout: {
      left: yogaNode.getComputedLeft(),
      right: yogaNode.getComputedRight(),
      top: yogaNode.getComputedTop(),
      bottom: yogaNode.getComputedBottom(),
      width: yogaNode.getComputedWidth(),
      height: yogaNode.getComputedHeight(),
    },
    props: {
      ...(typeof node !== 'string' ? node.props : {}),
      textNodes,
    },
    children: newChildren,
  };
};

export const buildTree = (bridge: PlatformBridge) => (element: React.ReactElement) => {
  let renderer: TestRenderer.ReactTestRenderer | undefined;

  if (typeof TestRenderer.act !== 'undefined') {
    TestRenderer.act(() => {
      // synchronous callback
      renderer = TestRenderer.create(element);
    });
  } else {
    renderer = TestRenderer.create(element);
  }

  if (!renderer) {
    throw new Error('Cannot access react renderer');
  }

  const json = renderer.toJSON();
  if (!json) {
    throw new Error('Cannot render react element');
  }
  const yogaNode = computeYogaTree(bridge)(json, new Context());
  yogaNode.calculateLayout(undefined, undefined, yoga.DIRECTION_LTR);
  const tree = reactTreeToFlexTree(json, yogaNode, new Context());

  return tree;
};
