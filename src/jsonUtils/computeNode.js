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

const isPercent = (value: number | string) => /%/.test(String(value));

const isAuto = (value: number | string) => String(value) === 'auto';

const computeNode = (node: TreeNode, context: Context) => {
  const yogaNode = yoga.Node.create();
  const hasStyle = node.props && node.props.style;
  const style: ViewStyle | Object = hasStyle ? getStyles(node) : {};

  if (hasStyle) {
    // http://facebook.github.io/react-native/releases/0.48/docs/layout-props.html

    // Width
    if (style.width) {
      if (isPercent(style.width)) {
        yogaNode.setWidthPercent(style.width);
      } else if (isAuto(style.width)) {
        yogaNode.setWidthAuto();
      } else {
        yogaNode.setWidth(style.width);
      }
    }

    // Height
    if (style.height) {
      if (isPercent(style.height)) {
        yogaNode.setHeightPercent(style.height);
      } else if (isAuto(style.height)) {
        yogaNode.setHeightAuto();
      } else {
        yogaNode.setHeight(style.height);
      }
    }

    // Min-Height
    if (style.minHeight) {
      if (isPercent(style.minHeight)) {
        yogaNode.setMinHeightPercent(style.minHeight);
      } else {
        yogaNode.setMinHeight(style.minHeight);
      }
    }

    // Min-Width
    if (style.minWidth) {
      if (isPercent(style.minWidth)) {
        yogaNode.setMinWidthPercent(style.minWidth);
      } else {
        yogaNode.setMinWidth(style.minWidth);
      }
    }

    // Max-Height
    if (style.maxHeight) {
      if (isPercent(style.maxHeight)) {
        yogaNode.setMaxHeightPercent(style.maxHeight);
      } else {
        yogaNode.setMaxHeight(style.maxHeight);
      }
    }

    // Min-Width
    if (style.maxWidth) {
      if (isPercent(style.maxWidth)) {
        yogaNode.setMaxWidthPercent(style.maxWidth);
      } else {
        yogaNode.setMaxWidth(style.maxWidth);
      }
    }

    // Margin
    if (style.marginTop) {
      if (isPercent(style.marginTop)) {
        yogaNode.setMarginPercent(yoga.EDGE_TOP, style.marginTop);
      } else if (isAuto(style.marginTop)) {
        yogaNode.setMarginAuto(yoga.EDGE_TOP);
      } else {
        yogaNode.setMargin(yoga.EDGE_TOP, style.marginTop);
      }
    }
    if (style.marginBottom) {
      if (isPercent(style.marginBottom)) {
        yogaNode.setMarginPercent(yoga.EDGE_BOTTOM, style.marginBottom);
      } else if (isAuto(style.marginBottom)) {
        yogaNode.setMarginAuto(yoga.EDGE_BOTTOM);
      } else {
        yogaNode.setMargin(yoga.EDGE_BOTTOM, style.marginBottom);
      }
    }
    if (style.marginLeft) {
      if (isPercent(style.marginLeft)) {
        yogaNode.setMarginPercent(yoga.EDGE_LEFT, style.marginLeft);
      } else if (isAuto(style.marginLeft)) {
        yogaNode.setMarginAuto(yoga.EDGE_LEFT);
      } else {
        yogaNode.setMargin(yoga.EDGE_LEFT, style.marginLeft);
      }
    }
    if (style.marginRight) {
      if (isPercent(style.marginRight)) {
        yogaNode.setMarginPercent(yoga.EDGE_RIGHT, style.marginRight);
      } else if (isAuto(style.marginRight)) {
        yogaNode.setMarginAuto(yoga.EDGE_RIGHT);
      } else {
        yogaNode.setMargin(yoga.EDGE_RIGHT, style.marginRight);
      }
    }
    if (style.marginVertical) {
      if (isPercent(style.marginVertical)) {
        yogaNode.setMarginPercent(yoga.EDGE_VERTICAL, style.marginVertical);
      } else if (isAuto(style.marginVertical)) {
        yogaNode.setMarginAuto(yoga.EDGE_VERTICAL);
      } else {
        yogaNode.setMargin(yoga.EDGE_VERTICAL, style.marginVertical);
      }
    }
    if (style.marginHorizontal) {
      if (isPercent(style.marginHorizontal)) {
        yogaNode.setMarginPercent(yoga.EDGE_HORIZONTAL, style.marginHorizontal);
      } else if (isAuto(style.marginHorizontal)) {
        yogaNode.setMarginAuto(yoga.EDGE_HORIZONTAL);
      } else {
        yogaNode.setMargin(yoga.EDGE_HORIZONTAL, style.marginHorizontal);
      }
    }
    if (style.margin) {
      if (isPercent(style.margin)) {
        yogaNode.setMarginPercent(yoga.EDGE_ALL, style.margin);
      } else if (isAuto(style.margin)) {
        yogaNode.setMarginAuto(yoga.EDGE_ALL);
      } else {
        yogaNode.setMargin(yoga.EDGE_ALL, style.margin);
      }
    }

    // Padding
    if (style.paddingTop) {
      if (isPercent(style.paddingTop)) {
        yogaNode.setPaddingPercent(yoga.EDGE_TOP, style.paddingTop);
      } else {
        yogaNode.setPadding(yoga.EDGE_TOP, style.paddingTop);
      }
    }
    if (style.paddingBottom) {
      if (isPercent(style.paddingBottom)) {
        yogaNode.setPaddingPercent(yoga.EDGE_BOTTOM, style.paddingBottom);
      } else {
        yogaNode.setPadding(yoga.EDGE_BOTTOM, style.paddingBottom);
      }
    }
    if (style.paddingLeft) {
      if (isPercent(style.paddingLeft)) {
        yogaNode.setPaddingPercent(yoga.EDGE_LEFT, style.paddingLeft);
      } else {
        yogaNode.setPadding(yoga.EDGE_LEFT, style.paddingLeft);
      }
    }
    if (style.paddingRight) {
      if (isPercent(style.paddingRight)) {
        yogaNode.setPaddingPercent(yoga.EDGE_RIGHT, style.paddingRight);
      } else {
        yogaNode.setPadding(yoga.EDGE_RIGHT, style.paddingRight);
      }
    }
    if (style.paddingVertical) {
      if (isPercent(style.paddingVertical)) {
        yogaNode.setPaddingPercent(yoga.EDGE_VERTICAL, style.paddingVertical);
      } else {
        yogaNode.setPadding(yoga.EDGE_VERTICAL, style.paddingVertical);
      }
    }
    if (style.paddingHorizontal) {
      if (isPercent(style.paddingHorizontal)) {
        yogaNode.setPaddingPercent(
          yoga.EDGE_HORIZONTAL,
          style.paddingHorizontal
        );
      } else {
        yogaNode.setPadding(yoga.EDGE_HORIZONTAL, style.paddingHorizontal);
      }
    }
    if (style.padding) {
      if (isPercent(style.padding)) {
        yogaNode.setPaddingPercent(yoga.EDGE_ALL, style.padding);
      } else {
        yogaNode.setPadding(yoga.EDGE_ALL, style.padding);
      }
    }

    // Border
    if (style.borderTop) {
      yogaNode.setBorder(yoga.EDGE_TOP, style.borderTop);
    }
    if (style.borderBottom) {
      yogaNode.setBorder(yoga.EDGE_BOTTOM, style.borderBottom);
    }
    if (style.borderLeft) {
      yogaNode.setBorder(yoga.EDGE_LEFT, style.borderLeft);
    }
    if (style.borderRight) {
      yogaNode.setBorder(yoga.EDGE_RIGHT, style.borderRight);
    }
    if (style.borderVertical) {
      yogaNode.setBorder(yoga.EDGE_VERTICAL, style.borderVertical);
    }
    if (style.borderHorizontal) {
      yogaNode.setBorder(yoga.EDGE_HORIZONTAL, style.borderHorizontal);
    }
    if (style.border) {
      yogaNode.setBorder(yoga.EDGE_ALL, style.border);
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
    if (style.position === 'relative') {
      yogaNode.setPositionType(yoga.POSITION_TYPE_RELATIVE);
    }

    if (style.top) {
      if (isPercent(style.top)) {
        yogaNode.setPositionPercent(yoga.EDGE_TOP, style.top);
      } else {
        yogaNode.setPosition(yoga.EDGE_TOP, style.top);
      }
    }
    if (style.left) {
      if (isPercent(style.left)) {
        yogaNode.setPositionPercent(yoga.EDGE_LEFT, style.left);
      } else {
        yogaNode.setPosition(yoga.EDGE_LEFT, style.left);
      }
    }
    if (style.right) {
      if (isPercent(style.right)) {
        yogaNode.setPositionPercent(yoga.EDGE_RIGHT, style.right);
      } else {
        yogaNode.setPosition(yoga.EDGE_RIGHT, style.right);
      }
    }
    if (style.bottom) {
      if (isPercent(style.bottom)) {
        yogaNode.setPositionPercent(yoga.EDGE_BOTTOM, style.bottom);
      } else {
        yogaNode.setPosition(yoga.EDGE_BOTTOM, style.bottom);
      }
    }

    // Display
    const display = style.display;
    if (display) {
      if (display === 'flex') {
        yogaNode.setDisplay(yoga.DISPLAY_FLEX);
      }
      if (display === 'none') {
        yogaNode.setDisplay(yoga.DISPLAY_NONE);
      }
    }

    // Overflow
    const overflow = style.overflow;
    if (overflow) {
      if (overflow === 'visible') {
        yogaNode.setDisplay(yoga.OVERFLOW_VISIBLE);
      }
      if (overflow === 'scroll') {
        yogaNode.setDisplay(yoga.OVERFLOW_SCROLL);
      }
      if (overflow === 'hidden') {
        yogaNode.setDisplay(yoga.OVERFLOW_HIDDEN);
      }
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

    // Align Content
    const alignContent = style.alignContent;
    if (alignContent) {
      if (alignContent === 'flex-start') {
        yogaNode.setAlignContent(yoga.ALIGN_FLEX_START);
      }
      if (alignContent === 'flex-end') {
        yogaNode.setAlignContent(yoga.ALIGN_FLEX_END);
      }
      if (alignContent === 'center') {
        yogaNode.setAlignContent(yoga.ALIGN_CENTER);
      }
      if (alignContent === 'stretch') {
        yogaNode.setAlignContent(yoga.ALIGN_STRETCH);
      }
      if (alignContent === 'baseline') {
        yogaNode.setAlignContent(yoga.ALIGN_BASELINE);
      }
      if (alignContent === 'space-between') {
        yogaNode.setAlignContent(yoga.ALIGN_SPACE_BETWEEN);
      }
      if (alignContent === 'space-around') {
        yogaNode.setAlignContent(yoga.ALIGN_SPACE_AROUND);
      }
      if (alignContent === 'auto') {
        yogaNode.setAlignContent(yoga.ALIGN_AUTO);
      }
    }

    // Align Items
    const alignItems = style.alignItems;
    if (alignItems) {
      if (alignItems === 'flex-start') {
        yogaNode.setAlignItems(yoga.ALIGN_FLEX_START);
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
