// @flow
import * as yoga from 'yoga-layout';
import type { TreeNode, ViewStyle } from '../types';
import Context from '../utils/Context';
import createStringMeasurer from '../utils/createStringMeasurer';

// flatten all styles (including nested) into one object
const getStyles = (node: TreeNode): ViewStyle | Object => {
  let style = node.props.style;

  if (Array.isArray(style)) {
    const flattened = Array.prototype.concat.apply([], style);
    const themeFlattened = Array.prototype.concat.apply([], flattened);
    const objectsOnly = themeFlattened.filter(f => f);
    style = Object.assign({}, ...objectsOnly);
  }

  return style;
};

const computeNode = (node: TreeNode, context: Context) => {
  const yogaNode = yoga.Node.create();
  const hasStyle = node.props && node.props.style;
  const style: ViewStyle | Object = hasStyle ? getStyles(node) : {};

  if (hasStyle) {
    // http://facebook.github.io/react-native/releases/0.48/docs/layout-props.html

    // Height & Width
    if (style.width) {
      yogaNode.setWidth(style.width);
    }
    if (style.height) {
      yogaNode.setHeight(style.height);
    }

    if (style.minHeight) {
      yogaNode.setMinHeight(style.minHeight);
    }
    if (style.minWidth) {
      yogaNode.setMinWidth(style.minWidth);
    }

    if (style.maxHeight) {
      yogaNode.setMaxHeight(style.maxHeight);
    }
    if (style.maxWidth) {
      yogaNode.setMaxWidth(style.maxWidth);
    }

    // Margin
    if (style.marginTop) {
      yogaNode.setMargin(yoga.EDGE_TOP, style.marginTop);
    }
    if (style.marginBottom) {
      yogaNode.setMargin(yoga.EDGE_BOTTOM, style.marginBottom);
    }
    if (style.marginLeft) {
      yogaNode.setMargin(yoga.EDGE_LEFT, style.marginLeft);
    }
    if (style.marginRight) {
      yogaNode.setMargin(yoga.EDGE_RIGHT, style.marginRight);
    }
    if (style.marginVertical) {
      yogaNode.setMargin(yoga.EDGE_VERTICAL, style.marginVertical);
    }
    if (style.marginHorizontal) {
      yogaNode.setMargin(yoga.EDGE_HORIZONTAL, style.marginHorizontal);
    }

    // Padding
    if (style.paddingTop) {
      yogaNode.setPadding(yoga.EDGE_TOP, style.paddingTop);
    }
    if (style.paddingBottom) {
      yogaNode.setPadding(yoga.EDGE_BOTTOM, style.paddingBottom);
    }
    if (style.paddingLeft) {
      yogaNode.setPadding(yoga.EDGE_LEFT, style.paddingLeft);
    }
    if (style.paddingRight) {
      yogaNode.setPadding(yoga.EDGE_RIGHT, style.paddingRight);
    }
    if (style.paddingVertical) {
      yogaNode.setPadding(yoga.EDGE_VERTICAL, style.paddingVertical);
    }
    if (style.paddingHorizontal) {
      yogaNode.setPadding(yoga.EDGE_HORIZONTAL, style.paddingHorizontal);
    }

    // Flex
    if (style.flex) {
      yogaNode.setFlex(style.flex);
    }
    if (style.flexGrow) {
      yogaNode.setFlexGrow(style.flexGrow);
    }
    if (style.flexShrink) {
      yogaNode.setFlexShrink(style.flexShrink);
    }
    if (style.flexBasis) {
      yogaNode.setFlexBasis(style.flexBasis);
    }

    // Position
    if (style.position === 'absolute') {
      yogaNode.setPositionType(yoga.POSITION_TYPE_ABSOLUTE);
    }
    if (style.top) {
      yogaNode.setPosition(yoga.EDGE_TOP, style.top);
    }
    if (style.left) {
      yogaNode.setPosition(yoga.EDGE_LEFT, style.left);
    }
    if (style.right) {
      yogaNode.setPosition(yoga.EDGE_RIGHT, style.right);
    }
    if (style.bottom) {
      yogaNode.setPosition(yoga.EDGE_BOTTOM, style.bottom);
    }

    // Flex direction
    const flexDirection = style.flexDirection;
    if (flexDirection) {
      if (flexDirection === 'row') {
        yogaNode.setFlexDirection(yoga.FLEX_DIRECTION_ROW);
      }
      if (flexDirection === 'column') {
        yogaNode.setFlexDirection(yoga.FLEX_DIRECTION_COLUMN);
      }
      if (flexDirection === 'row-reverse') {
        yogaNode.setFlexDirection(yoga.FLEX_DIRECTION_ROW_REVERSE);
      }
      if (flexDirection === 'column-reverse') {
        yogaNode.setFlexDirection(yoga.FLEX_DIRECTION_COLUMN_REVERSE);
      }
    }

    // Justify Content
    const justifyContent = style.justifyContent;
    if (justifyContent) {
      if (justifyContent === 'flex-start') {
        yogaNode.setJustifyContent(yoga.JUSTIFY_FLEX_START);
      }
      if (justifyContent === 'flex-end') {
        yogaNode.setJustifyContent(yoga.JUSTIFY_FLEX_END);
      }
      if (justifyContent === 'center') {
        yogaNode.setJustifyContent(yoga.JUSTIFY_CENTER);
      }
      if (justifyContent === 'space-between') {
        yogaNode.setJustifyContent(yoga.JUSTIFY_SPACE_BETWEEN);
      }
      if (justifyContent === 'space-around') {
        yogaNode.setJustifyContent(yoga.JUSTIFY_SPACE_AROUND);
      }
    }

    // Align Items
    const alignItems = style.alignItems;
    if (alignItems) {
      if (alignItems === 'flex-start') {
        yogaNode.setAlignItems(yoga.ALIGN_FLEX_END);
      }
      if (alignItems === 'flex-end') {
        yogaNode.setAlignItems(yoga.ALIGN_FLEX_END);
      }
      if (alignItems === 'center') {
        yogaNode.setAlignItems(yoga.ALIGN_CENTER);
      }
      if (alignItems === 'stretch') {
        yogaNode.setAlignItems(yoga.ALIGN_STRETCH);
      }
      if (alignItems === 'baseline') {
        yogaNode.setAlignItems(yoga.ALIGN_BASELINE);
      }
    }

    // Align Self
    const alignSelf = style.alignSelf;
    if (alignSelf) {
      if (alignSelf === 'flex-start') {
        yogaNode.setAlignSelf(yoga.ALIGN_FLEX_END);
      }
      if (alignSelf === 'flex-end') {
        yogaNode.setAlignSelf(yoga.ALIGN_FLEX_END);
      }
      if (alignSelf === 'center') {
        yogaNode.setAlignSelf(yoga.ALIGN_CENTER);
      }
      if (alignSelf === 'stretch') {
        yogaNode.setAlignSelf(yoga.ALIGN_STRETCH);
      }
      if (alignSelf === 'baseline') {
        yogaNode.setAlignSelf(yoga.ALIGN_BASELINE);
      }
    }

    // Flex Wrap
    const flexWrap = style.flexWrap;
    if (flexWrap) {
      if (flexWrap === 'nowrap') {
        yogaNode.setFlexWrap(yoga.WRAP_NO_WRAP);
      }
      if (flexWrap === 'wrap') {
        yogaNode.setFlexWrap(yoga.WRAP_WRAP);
      }
      if (flexWrap === 'wrap-reverse') {
        yogaNode.setFlexWrap(yoga.WRAP_WRAP_REVERSE);
      }
    }
  }

  // if Text node
  if (
    node &&
    node.type === 'text' &&
    node.children &&
    (typeof node.children[0] === 'string' ||
      typeof node.children[0] === 'number')
  ) {
    const content = String(node.children[0]);
    const textStyle = context.getInheritedStyles();
    const measure = createStringMeasurer(content, textStyle)();

    if (!style.height) {
      yogaNode.setHeight(measure.height);
    }

    // Use hardcoded width if present
    if (style.width || typeof style.width === 'number') {
      return yogaNode;
    }

    yogaNode.setWidth(measure.width);
  }

  return yogaNode;
};

export default computeNode;
