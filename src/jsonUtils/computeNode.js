// @flow
import * as yoga from 'yoga-layout';
import type { TreeNode, ViewStyle } from '../types';
import Context from '../utils/Context';
import createStringMeasurer from '../utils/createStringMeasurer';
import hasAnyDefined from '../utils/hasAnyDefined';
import pick from '../utils/pick';
import { INHERITABLE_FONT_STYLES } from '../utils/constants';

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

const isNullOrUndefined = (value: any) => value === null || value === undefined;

const computeNode = (node: TreeNode, context: Context) => {
  const yogaNode = yoga.Node.create();
  const hasStyle = node.props && node.props.style;
  const style: ViewStyle | Object = hasStyle ? getStyles(node) : {};

  if (hasStyle) {
    // http://facebook.github.io/react-native/releases/0.48/docs/layout-props.html

    // Width
    if (!isNullOrUndefined(style.width)) {
      yogaNode.setWidth(style.width);
    }

    // Height
    if (!isNullOrUndefined(style.height)) {
      yogaNode.setHeight(style.height);
    }

    // Min-Height
    if (!isNullOrUndefined(style.minHeight)) {
      yogaNode.setMinHeight(style.minHeight);
    }

    // Min-Width
    if (!isNullOrUndefined(style.minWidth)) {
      yogaNode.setMinWidth(style.minWidth);
    }

    // Max-Height
    if (!isNullOrUndefined(style.maxHeight)) {
      yogaNode.setMaxHeight(style.maxHeight);
    }

    // Min-Width
    if (!isNullOrUndefined(style.maxWidth)) {
      yogaNode.setMaxWidth(style.maxWidth);
    }

    // Margin
    if (!isNullOrUndefined(style.marginTop)) {
      yogaNode.setMargin(yoga.EDGE_TOP, style.marginTop);
    }
    if (!isNullOrUndefined(style.marginBottom)) {
      yogaNode.setMargin(yoga.EDGE_BOTTOM, style.marginBottom);
    }
    if (!isNullOrUndefined(style.marginLeft)) {
      yogaNode.setMargin(yoga.EDGE_LEFT, style.marginLeft);
    }
    if (!isNullOrUndefined(style.marginRight)) {
      yogaNode.setMargin(yoga.EDGE_RIGHT, style.marginRight);
    }
    if (!isNullOrUndefined(style.marginVertical)) {
      yogaNode.setMargin(yoga.EDGE_VERTICAL, style.marginVertical);
    }
    if (!isNullOrUndefined(style.marginHorizontal)) {
      yogaNode.setMargin(yoga.EDGE_HORIZONTAL, style.marginHorizontal);
    }
    if (!isNullOrUndefined(style.margin)) {
      yogaNode.setMargin(yoga.EDGE_ALL, style.margin);
    }

    // Padding
    if (!isNullOrUndefined(style.paddingTop)) {
      yogaNode.setPadding(yoga.EDGE_TOP, style.paddingTop);
    }
    if (!isNullOrUndefined(style.paddingBottom)) {
      yogaNode.setPadding(yoga.EDGE_BOTTOM, style.paddingBottom);
    }
    if (!isNullOrUndefined(style.paddingLeft)) {
      yogaNode.setPadding(yoga.EDGE_LEFT, style.paddingLeft);
    }
    if (!isNullOrUndefined(style.paddingRight)) {
      yogaNode.setPadding(yoga.EDGE_RIGHT, style.paddingRight);
    }
    if (!isNullOrUndefined(style.paddingVertical)) {
      yogaNode.setPadding(yoga.EDGE_VERTICAL, style.paddingVertical);
    }
    if (!isNullOrUndefined(style.paddingHorizontal)) {
      yogaNode.setPadding(yoga.EDGE_HORIZONTAL, style.paddingHorizontal);
    }
    if (!isNullOrUndefined(style.padding)) {
      yogaNode.setPadding(yoga.EDGE_ALL, style.padding);
    }

    // Border
    if (!isNullOrUndefined(style.borderTop)) {
      yogaNode.setBorder(yoga.EDGE_TOP, style.borderTop);
    }
    if (!isNullOrUndefined(style.borderBottom)) {
      yogaNode.setBorder(yoga.EDGE_BOTTOM, style.borderBottom);
    }
    if (!isNullOrUndefined(style.borderLeft)) {
      yogaNode.setBorder(yoga.EDGE_LEFT, style.borderLeft);
    }
    if (!isNullOrUndefined(style.borderRight)) {
      yogaNode.setBorder(yoga.EDGE_RIGHT, style.borderRight);
    }
    if (!isNullOrUndefined(style.borderVertical)) {
      yogaNode.setBorder(yoga.EDGE_VERTICAL, style.borderVertical);
    }
    if (!isNullOrUndefined(style.borderHorizontal)) {
      yogaNode.setBorder(yoga.EDGE_HORIZONTAL, style.borderHorizontal);
    }
    if (!isNullOrUndefined(style.border)) {
      yogaNode.setBorder(yoga.EDGE_ALL, style.border);
    }

    // Flex
    if (!isNullOrUndefined(style.flex)) {
      yogaNode.setFlex(style.flex);
    }
    if (!isNullOrUndefined(style.flexGrow)) {
      yogaNode.setFlexGrow(style.flexGrow);
    }
    if (!isNullOrUndefined(style.flexShrink)) {
      yogaNode.setFlexShrink(style.flexShrink);
    }
    if (!isNullOrUndefined(style.flexBasis)) {
      yogaNode.setFlexBasis(style.flexBasis);
    }

    // Position
    if (style.position === 'absolute') {
      yogaNode.setPositionType(yoga.POSITION_TYPE_ABSOLUTE);
    }
    if (style.position === 'relative') {
      yogaNode.setPositionType(yoga.POSITION_TYPE_RELATIVE);
    }

    if (!isNullOrUndefined(style.top)) {
      yogaNode.setPosition(yoga.EDGE_TOP, style.top);
    }
    if (!isNullOrUndefined(style.left)) {
      yogaNode.setPosition(yoga.EDGE_LEFT, style.left);
    }
    if (!isNullOrUndefined(style.right)) {
      yogaNode.setPosition(yoga.EDGE_RIGHT, style.right);
    }
    if (!isNullOrUndefined(style.bottom)) {
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
        yogaNode.setDisplay(yoga.OVERFLOW_VISIBLE);
      }
      if (style.overflow === 'scroll') {
        yogaNode.setDisplay(yoga.OVERFLOW_SCROLL);
      }
      if (style.overflow === 'hidden') {
        yogaNode.setDisplay(yoga.OVERFLOW_HIDDEN);
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
        yogaNode.setAlignSelf(yoga.ALIGN_FLEX_END);
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

  if (typeof node === 'string') {
    const textStyle = context.getInheritedStyles();
    yogaNode.setMeasureFunc(createStringMeasurer(node, textStyle));
    return yogaNode;
  }

  if (
    node.type === 'text' &&
    node.props.style &&
    hasAnyDefined(style, INHERITABLE_FONT_STYLES)
  ) {
    const inheritableStyles = pick(style, INHERITABLE_FONT_STYLES);
    context.addInheritableStyles(inheritableStyles);
  }

  return yogaNode;
};

export default computeNode;
