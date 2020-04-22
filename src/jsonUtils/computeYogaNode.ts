import yoga from 'yoga-layout-prebuilt';
import { ReactTestRendererNode } from 'react-test-renderer';
import { ViewStyle, PlatformBridge } from '../types';
import { Context } from '../utils/Context';
import { createStringMeasurer } from '../utils/createStringMeasurer';
import { hasAnyDefined } from '../utils/hasAnyDefined';
import { pick } from '../utils/pick';
import { computeTextTree } from './computeTextTree';
import { INHERITABLE_FONT_STYLES } from '../utils/constants';
import { isDefined } from '../utils/isDefined';
import { getSymbolMasterById } from '../symbol';

// flatten all styles (including nested) into one object
export const getStyles = (node: ReactTestRendererNode): ViewStyle => {
  if (typeof node === 'string') {
    return {};
  }

  let { style } = node.props;

  if (Array.isArray(style)) {
    const flattened = Array.prototype.concat.apply([], style);
    const themeFlattened = Array.prototype.concat.apply([], flattened);
    const objectsOnly = themeFlattened.filter((f) => f);
    style = Object.assign({}, ...objectsOnly);
  }

  return style;
};

export const computeYogaNode = (bridge: PlatformBridge) => (
  node: ReactTestRendererNode,
  context: Context,
): { node: yoga.YogaNode; stop?: boolean } => {
  const yogaNode = yoga.Node.create();
  const hasStyle = typeof node !== 'string' && node.props && node.props.style;
  const style: ViewStyle = hasStyle ? getStyles(node) : {};

  // Setup default symbol instance dimensions
  if (typeof node !== 'string' && node.type === 'sketch_symbolinstance') {
    const symbolProps = node.props;
    const symbolMaster = getSymbolMasterById(symbolProps.symbolID);
    if (!symbolMaster) {
      throw new Error('Cannot find Symbol Master with id ' + symbolProps.symbolID);
    }
    const { frame } = symbolMaster;
    yogaNode.setWidth(frame.width);
    yogaNode.setHeight(frame.height);
  }

  if (typeof node !== 'string' && node.type === 'sketch_svg') {
    const svgProps = node.props;
    // Width
    if (isDefined(svgProps.width)) {
      yogaNode.setWidth(svgProps.width);
    }

    // Height
    if (isDefined(svgProps.height)) {
      yogaNode.setHeight(svgProps.height);
    }
  }

  if (hasStyle) {
    // http://facebook.github.io/react-native/releases/0.48/docs/layout-props.html

    // Width
    if (isDefined(style.width)) {
      yogaNode.setWidth(style.width);
    }

    // Height
    if (isDefined(style.height)) {
      yogaNode.setHeight(style.height);
    }

    // Min-Height
    if (isDefined(style.minHeight)) {
      yogaNode.setMinHeight(style.minHeight);
    }

    // Min-Width
    if (isDefined(style.minWidth)) {
      yogaNode.setMinWidth(style.minWidth);
    }

    // Max-Height
    if (isDefined(style.maxHeight)) {
      yogaNode.setMaxHeight(style.maxHeight);
    }

    // Min-Width
    if (isDefined(style.maxWidth)) {
      yogaNode.setMaxWidth(style.maxWidth);
    }

    // Margin
    if (isDefined(style.marginTop)) {
      yogaNode.setMargin(yoga.EDGE_TOP, style.marginTop);
    }
    if (isDefined(style.marginBottom)) {
      yogaNode.setMargin(yoga.EDGE_BOTTOM, style.marginBottom);
    }
    if (isDefined(style.marginLeft)) {
      yogaNode.setMargin(yoga.EDGE_LEFT, style.marginLeft);
    }
    if (isDefined(style.marginRight)) {
      yogaNode.setMargin(yoga.EDGE_RIGHT, style.marginRight);
    }
    if (isDefined(style.marginVertical)) {
      yogaNode.setMargin(yoga.EDGE_VERTICAL, style.marginVertical);
    }
    if (isDefined(style.marginHorizontal)) {
      yogaNode.setMargin(yoga.EDGE_HORIZONTAL, style.marginHorizontal);
    }
    if (isDefined(style.margin)) {
      yogaNode.setMargin(yoga.EDGE_ALL, style.margin);
    }

    // Padding
    if (isDefined(style.paddingTop)) {
      yogaNode.setPadding(yoga.EDGE_TOP, style.paddingTop);
    }
    if (isDefined(style.paddingBottom)) {
      yogaNode.setPadding(yoga.EDGE_BOTTOM, style.paddingBottom);
    }
    if (isDefined(style.paddingLeft)) {
      yogaNode.setPadding(yoga.EDGE_LEFT, style.paddingLeft);
    }
    if (isDefined(style.paddingRight)) {
      yogaNode.setPadding(yoga.EDGE_RIGHT, style.paddingRight);
    }
    if (isDefined(style.paddingVertical)) {
      yogaNode.setPadding(yoga.EDGE_VERTICAL, style.paddingVertical);
    }
    if (isDefined(style.paddingHorizontal)) {
      yogaNode.setPadding(yoga.EDGE_HORIZONTAL, style.paddingHorizontal);
    }
    if (isDefined(style.padding)) {
      yogaNode.setPadding(yoga.EDGE_ALL, style.padding);
    }

    // Border
    if (isDefined(style.borderTopWidth)) {
      yogaNode.setBorder(yoga.EDGE_TOP, style.borderTopWidth);
    }
    if (isDefined(style.borderBottomWidth)) {
      yogaNode.setBorder(yoga.EDGE_BOTTOM, style.borderBottomWidth);
    }
    if (isDefined(style.borderLeftWidth)) {
      yogaNode.setBorder(yoga.EDGE_LEFT, style.borderLeftWidth);
    }
    if (isDefined(style.borderRightWidth)) {
      yogaNode.setBorder(yoga.EDGE_RIGHT, style.borderRightWidth);
    }
    if (isDefined(style.borderWidth)) {
      yogaNode.setBorder(yoga.EDGE_ALL, style.borderWidth);
    }

    // Flex
    if (isDefined(style.flex)) {
      yogaNode.setFlex(style.flex);
    }
    if (isDefined(style.flexGrow)) {
      yogaNode.setFlexGrow(style.flexGrow);
    }
    if (isDefined(style.flexShrink)) {
      yogaNode.setFlexShrink(style.flexShrink);
    }
    if (isDefined(style.flexBasis)) {
      yogaNode.setFlexBasis(style.flexBasis);
    }

    // Position
    if (style.position === 'absolute') {
      yogaNode.setPositionType(yoga.POSITION_TYPE_ABSOLUTE);
    }
    if (style.position === 'relative') {
      yogaNode.setPositionType(yoga.POSITION_TYPE_RELATIVE);
    }

    if (isDefined(style.top)) {
      yogaNode.setPosition(yoga.EDGE_TOP, style.top);
    }
    if (isDefined(style.left)) {
      yogaNode.setPosition(yoga.EDGE_LEFT, style.left);
    }
    if (isDefined(style.right)) {
      yogaNode.setPosition(yoga.EDGE_RIGHT, style.right);
    }
    if (isDefined(style.bottom)) {
      yogaNode.setPosition(yoga.EDGE_BOTTOM, style.bottom);
    }

    // Display
    if (style.display) {
      if (style.display === 'flex') {
        yogaNode.setDisplay(yoga.DISPLAY_FLEX);
      }
      if (style.display === 'none') {
        yogaNode.setDisplay(yoga.DISPLAY_NONE);
      }
    }

    // Overflow
    if (style.overflow) {
      if (style.overflow === 'visible') {
        yogaNode.setOverflow(yoga.OVERFLOW_VISIBLE);
      }
      if (style.overflow === 'scroll') {
        yogaNode.setOverflow(yoga.OVERFLOW_SCROLL);
      }
      if (style.overflow === 'hidden') {
        yogaNode.setOverflow(yoga.OVERFLOW_HIDDEN);
      }
    }

    // Flex direction
    if (style.flexDirection) {
      if (style.flexDirection === 'row') {
        yogaNode.setFlexDirection(yoga.FLEX_DIRECTION_ROW);
      }
      if (style.flexDirection === 'column') {
        yogaNode.setFlexDirection(yoga.FLEX_DIRECTION_COLUMN);
      }
      if (style.flexDirection === 'row-reverse') {
        yogaNode.setFlexDirection(yoga.FLEX_DIRECTION_ROW_REVERSE);
      }
      if (style.flexDirection === 'column-reverse') {
        yogaNode.setFlexDirection(yoga.FLEX_DIRECTION_COLUMN_REVERSE);
      }
    }

    // Justify Content
    if (style.justifyContent) {
      if (style.justifyContent === 'flex-start') {
        yogaNode.setJustifyContent(yoga.JUSTIFY_FLEX_START);
      }
      if (style.justifyContent === 'flex-end') {
        yogaNode.setJustifyContent(yoga.JUSTIFY_FLEX_END);
      }
      if (style.justifyContent === 'center') {
        yogaNode.setJustifyContent(yoga.JUSTIFY_CENTER);
      }
      if (style.justifyContent === 'space-between') {
        yogaNode.setJustifyContent(yoga.JUSTIFY_SPACE_BETWEEN);
      }
      if (style.justifyContent === 'space-around') {
        yogaNode.setJustifyContent(yoga.JUSTIFY_SPACE_AROUND);
      }
    }

    // Align Content
    if (style.alignContent) {
      if (style.alignContent === 'flex-start') {
        yogaNode.setAlignContent(yoga.ALIGN_FLEX_START);
      }
      if (style.alignContent === 'flex-end') {
        yogaNode.setAlignContent(yoga.ALIGN_FLEX_END);
      }
      if (style.alignContent === 'center') {
        yogaNode.setAlignContent(yoga.ALIGN_CENTER);
      }
      if (style.alignContent === 'stretch') {
        yogaNode.setAlignContent(yoga.ALIGN_STRETCH);
      }
      if (style.alignContent === 'baseline') {
        yogaNode.setAlignContent(yoga.ALIGN_BASELINE);
      }
      if (style.alignContent === 'space-between') {
        yogaNode.setAlignContent(yoga.ALIGN_SPACE_BETWEEN);
      }
      if (style.alignContent === 'space-around') {
        yogaNode.setAlignContent(yoga.ALIGN_SPACE_AROUND);
      }
      if (style.alignContent === 'auto') {
        yogaNode.setAlignContent(yoga.ALIGN_AUTO);
      }
    }

    // Align Items
    if (style.alignItems) {
      if (style.alignItems === 'flex-start') {
        yogaNode.setAlignItems(yoga.ALIGN_FLEX_START);
      }
      if (style.alignItems === 'flex-end') {
        yogaNode.setAlignItems(yoga.ALIGN_FLEX_END);
      }
      if (style.alignItems === 'center') {
        yogaNode.setAlignItems(yoga.ALIGN_CENTER);
      }
      if (style.alignItems === 'stretch') {
        yogaNode.setAlignItems(yoga.ALIGN_STRETCH);
      }
      if (style.alignItems === 'baseline') {
        yogaNode.setAlignItems(yoga.ALIGN_BASELINE);
      }
    }

    // Align Self
    if (style.alignSelf) {
      if (style.alignSelf === 'flex-start') {
        yogaNode.setAlignSelf(yoga.ALIGN_FLEX_START);
      }
      if (style.alignSelf === 'flex-end') {
        yogaNode.setAlignSelf(yoga.ALIGN_FLEX_END);
      }
      if (style.alignSelf === 'center') {
        yogaNode.setAlignSelf(yoga.ALIGN_CENTER);
      }
      if (style.alignSelf === 'stretch') {
        yogaNode.setAlignSelf(yoga.ALIGN_STRETCH);
      }
      if (style.alignSelf === 'baseline') {
        yogaNode.setAlignSelf(yoga.ALIGN_BASELINE);
      }
    }

    // Flex Wrap
    if (style.flexWrap) {
      if (style.flexWrap === 'nowrap') {
        yogaNode.setFlexWrap(yoga.WRAP_NO_WRAP);
      }
      if (style.flexWrap === 'wrap') {
        yogaNode.setFlexWrap(yoga.WRAP_WRAP);
      }
      if (style.flexWrap === 'wrap-reverse') {
        yogaNode.setFlexWrap(yoga.WRAP_WRAP_REVERSE);
      }
    }
  }

  if (typeof node === 'string' || node.type === 'sketch_text') {
    // If current node is a Text node, add text styles to Context to pass down to
    // child nodes.
    if (
      typeof node !== 'string' &&
      node.props &&
      node.props.style &&
      hasAnyDefined(style, INHERITABLE_FONT_STYLES)
    ) {
      // @ts-ignore
      const inheritableStyles = pick(style, INHERITABLE_FONT_STYLES);
      context.addInheritableStyles(inheritableStyles);
    }

    // Handle Text Children
    const textNodes = computeTextTree(node, context);
    yogaNode.setMeasureFunc(createStringMeasurer(bridge)(textNodes));

    return { node: yogaNode, stop: true };
  }

  return { node: yogaNode };
};
