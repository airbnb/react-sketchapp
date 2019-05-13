declare module 'yoga-layout' {
  /**
   * Copyright (c) 2014-present, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @flow
   * @format
   */

  declare var ALIGN_COUNT: 8;
  declare var ALIGN_AUTO: 0;
  declare var ALIGN_FLEX_START: 1;
  declare var ALIGN_CENTER: 2;
  declare var ALIGN_FLEX_END: 3;
  declare var ALIGN_STRETCH: 4;
  declare var ALIGN_BASELINE: 5;
  declare var ALIGN_SPACE_BETWEEN: 6;
  declare var ALIGN_SPACE_AROUND: 7;

  declare var DIMENSION_COUNT: 2;
  declare var DIMENSION_WIDTH: 0;
  declare var DIMENSION_HEIGHT: 1;

  declare var DIRECTION_COUNT: 3;
  declare var DIRECTION_INHERIT: 0;
  declare var DIRECTION_LTR: 1;
  declare var DIRECTION_RTL: 2;

  declare var DISPLAY_COUNT: 2;
  declare var DISPLAY_FLEX: 0;
  declare var DISPLAY_NONE: 1;

  declare var EDGE_COUNT: 9;
  declare var EDGE_LEFT: 0;
  declare var EDGE_TOP: 1;
  declare var EDGE_RIGHT: 2;
  declare var EDGE_BOTTOM: 3;
  declare var EDGE_START: 4;
  declare var EDGE_END: 5;
  declare var EDGE_HORIZONTAL: 6;
  declare var EDGE_VERTICAL: 7;
  declare var EDGE_ALL: 8;

  declare var EXPERIMENTAL_FEATURE_COUNT: 1;
  declare var EXPERIMENTAL_FEATURE_WEB_FLEX_BASIS: 0;

  declare var FLEX_DIRECTION_COUNT: 4;
  declare var FLEX_DIRECTION_COLUMN: 0;
  declare var FLEX_DIRECTION_COLUMN_REVERSE: 1;
  declare var FLEX_DIRECTION_ROW: 2;
  declare var FLEX_DIRECTION_ROW_REVERSE: 3;

  declare var JUSTIFY_COUNT: 6;
  declare var JUSTIFY_FLEX_START: 0;
  declare var JUSTIFY_CENTER: 1;
  declare var JUSTIFY_FLEX_END: 2;
  declare var JUSTIFY_SPACE_BETWEEN: 3;
  declare var JUSTIFY_SPACE_AROUND: 4;
  declare var JUSTIFY_SPACE_EVENLY: 5;

  declare var LOG_LEVEL_COUNT: 6;
  declare var LOG_LEVEL_ERROR: 0;
  declare var LOG_LEVEL_WARN: 1;
  declare var LOG_LEVEL_INFO: 2;
  declare var LOG_LEVEL_DEBUG: 3;
  declare var LOG_LEVEL_VERBOSE: 4;
  declare var LOG_LEVEL_FATAL: 5;

  declare var MEASURE_MODE_COUNT: 3;
  declare var MEASURE_MODE_UNDEFINED: 0;
  declare var MEASURE_MODE_EXACTLY: 1;
  declare var MEASURE_MODE_AT_MOST: 2;

  declare var NODE_TYPE_COUNT: 2;
  declare var NODE_TYPE_DEFAULT: 0;
  declare var NODE_TYPE_TEXT: 1;

  declare var OVERFLOW_COUNT: 3;
  declare var OVERFLOW_VISIBLE: 0;
  declare var OVERFLOW_HIDDEN: 1;
  declare var OVERFLOW_SCROLL: 2;

  declare var POSITION_TYPE_COUNT: 2;
  declare var POSITION_TYPE_RELATIVE: 0;
  declare var POSITION_TYPE_ABSOLUTE: 1;

  declare var PRINT_OPTIONS_COUNT: 3;
  declare var PRINT_OPTIONS_LAYOUT: 1;
  declare var PRINT_OPTIONS_STYLE: 2;
  declare var PRINT_OPTIONS_CHILDREN: 4;

  declare var UNIT_COUNT: 4;
  declare var UNIT_UNDEFINED: 0;
  declare var UNIT_POINT: 1;
  declare var UNIT_PERCENT: 2;
  declare var UNIT_AUTO: 3;

  declare var WRAP_COUNT: 3;
  declare var WRAP_NO_WRAP: 0;
  declare var WRAP_WRAP: 1;
  declare var WRAP_WRAP_REVERSE: 2;

  declare type Yoga$JustifyContent =
    | typeof JUSTIFY_CENTER
    | typeof JUSTIFY_FLEX_END
    | typeof JUSTIFY_FLEX_START
    | typeof JUSTIFY_SPACE_AROUND
    | typeof JUSTIFY_SPACE_BETWEEN
    | typeof JUSTIFY_SPACE_EVENLY;

  declare type Yoga$Align =
    | typeof ALIGN_AUTO
    | typeof ALIGN_BASELINE
    | typeof ALIGN_CENTER
    | typeof ALIGN_FLEX_END
    | typeof ALIGN_FLEX_START
    | typeof ALIGN_SPACE_AROUND
    | typeof ALIGN_SPACE_BETWEEN
    | typeof ALIGN_STRETCH;

  declare type Yoga$FlexDirection =
    | typeof FLEX_DIRECTION_COLUMN
    | typeof FLEX_DIRECTION_COLUMN_REVERSE
    | typeof FLEX_DIRECTION_COUNT
    | typeof FLEX_DIRECTION_ROW
    | typeof FLEX_DIRECTION_ROW_REVERSE;

  declare type Yoga$Direction =
    | typeof DIRECTION_INHERIT
    | typeof DIRECTION_LTR
    | typeof DIRECTION_RTL;

  declare type Yoga$FlexWrap = typeof WRAP_NO_WRAP | typeof WRAP_WRAP | typeof WRAP_WRAP_REVERSE;

  declare type Yoga$Edge =
    | typeof EDGE_LEFT
    | typeof EDGE_TOP
    | typeof EDGE_RIGHT
    | typeof EDGE_BOTTOM
    | typeof EDGE_START
    | typeof EDGE_END
    | typeof EDGE_HORIZONTAL
    | typeof EDGE_VERTICAL
    | typeof EDGE_ALL;

  declare type Yoga$Display = typeof DISPLAY_FLEX | typeof DISPLAY_NONE;

  declare type Yoga$Unit =
    | typeof UNIT_AUTO
    | typeof UNIT_PERCENT
    | typeof UNIT_POINT
    | typeof UNIT_UNDEFINED;

  declare type Yoga$Overflow =
    | typeof OVERFLOW_HIDDEN
    | typeof OVERFLOW_SCROLL
    | typeof OVERFLOW_VISIBLE;

  declare type Yoga$PositionType = typeof POSITION_TYPE_ABSOLUTE | typeof POSITION_TYPE_RELATIVE;

  declare type Yoga$ExperimentalFeature = typeof EXPERIMENTAL_FEATURE_WEB_FLEX_BASIS;

  declare class Layout {
    left: number;
    right: number;
    top: number;
    bottom: number;
    width: number;
    height: number;

    constructor(
      left: number,
      right: number,
      top: number,
      bottom: number,
      width: number,
      height: number,
    ): void;

    fromJS(expose: any): void;

    toString(): string;
  }

  declare class Size {
    static fromJS(size: { width: number, height: number }): Size;

    width: number;
    height: number;

    constructor(width: number, height: number): void;

    fromJS(expose: any): void;

    toString(): string;
  }

  declare class Value {
    unit: number;
    value: number;

    constructor(unit: number, value: number): void;

    fromJS(expose: any): void;

    toString(): string;

    valueOf(): number;
  }

  declare type Yoga$Config = {
    isExperimentalFeatureEnabled(feature: Yoga$ExperimentalFeature): boolean,
    setExperimentalFeatureEnabled(feature: Yoga$ExperimentalFeature, enabled: boolean): void,
    setPointScaleFactor(factor: number): void,
  };

  declare type Yoga$Node = {
    calculateLayout(width?: number, height?: number, direction?: Yoga$Direction): void,
    copyStyle(node: Yoga$Node): void,
    free(): void,
    freeRecursive(): void,
    getAlignContent(): Yoga$Align,
    getAlignItems(): Yoga$Align,
    getAlignSelf(): Yoga$Align,
    getAspectRatio(): number,
    getBorder(edge: Yoga$Edge): number,
    getChild(index: number): Yoga$Node,
    getChildCount(): number,
    getComputedBorder(edge: Yoga$Edge): number,
    getComputedBottom(): number,
    getComputedHeight(): number,
    getComputedLayout(): Layout,
    getComputedLeft(): number,
    getComputedMargin(edge: Yoga$Edge): number,
    getComputedPadding(edge: Yoga$Edge): number,
    getComputedRight(): number,
    getComputedTop(): number,
    getComputedWidth(): number,
    getDisplay(): Yoga$Display,
    getFlexBasis(): number,
    getFlexDirection(): Yoga$FlexDirection,
    getFlexGrow(): number,
    getFlexShrink(): number,
    getFlexWrap(): Yoga$FlexWrap,
    getHeight(): Value,
    getJustifyContent(): Yoga$JustifyContent,
    getMargin(edge: Yoga$Edge): Value,
    getMaxHeight(): Value,
    getMaxWidth(): Value,
    getMinHeight(): Value,
    getMinWidth(): Value,
    getOverflow(): Yoga$Overflow,
    getPadding(edge: Yoga$Edge): Value,
    getParent(): ?Yoga$Node,
    getPosition(edge: Yoga$Edge): Value,
    getPositionType(): Yoga$PositionType,
    getWidth(): Value,
    insertChild(child: Yoga$Node, index: number): void,
    isDirty(): boolean,
    markDirty(): void,
    removeChild(child: Yoga$Node): void,
    reset(): void,
    setAlignContent(alignContent: Yoga$Align): void,
    setAlignItems(alignItems: Yoga$Align): void,
    setAlignSelf(alignSelf: Yoga$Align): void,
    setAspectRatio(aspectRatio: number): void,
    setBorder(edge: Yoga$Edge, borderWidth: number): void,
    setDisplay(display: Yoga$Display): void,
    setFlex(flex: number): void,
    setFlexBasis(flexBasis: number | string): void,
    setFlexBasisPercent(flexBasis: number): void,
    setFlexDirection(flexDirection: Yoga$FlexDirection): void,
    setFlexGrow(flexGrow: number): void,
    setFlexShrink(flexShrink: number): void,
    setFlexWrap(flexWrap: Yoga$FlexWrap): void,
    setHeight(height: number | string): void,
    setHeightAuto(): void,
    setHeightPercent(height: number): void,
    setJustifyContent(justifyContent: Yoga$JustifyContent): void,
    setMargin(edge: Yoga$Edge, margin: number): void,
    setMarginAuto(edge: Yoga$Edge): void,
    setMarginPercent(edge: Yoga$Edge, margin: number): void,
    setMaxHeight(maxHeight: number | string): void,
    setMaxHeightPercent(maxHeight: number): void,
    setMaxWidth(maxWidth: number | string): void,
    setMaxWidthPercent(maxWidth: number): void,
    setMeasureFunc(measureFunc: ?Function): void,
    setMinHeight(minHeight: number | string): void,
    setMinHeightPercent(minHeight: number): void,
    setMinWidth(minWidth: number | string): void,
    setMinWidthPercent(minWidth: number): void,
    setOverflow(overflow: Yoga$Overflow): void,
    setPadding(edge: Yoga$Edge, padding: number | string): void,
    setPaddingPercent(edge: Yoga$Edge, padding: number): void,
    setPosition(edge: Yoga$Edge, position: number | string): void,
    setPositionPercent(edge: Yoga$Edge, position: number): void,
    setPositionType(positionType: Yoga$PositionType): void,
    setWidth(width: number | string): void,
    setWidthAuto(): void,
    setWidthPercent(width: number): void,
    unsetMeasureFun(): void,
  };

  declare var Config: {
    create(): Yoga$Config,
    destroy(config: Yoga$Config): any,
  };
  declare var Node: {
    create(): Yoga$Node,
    createDefault(): Yoga$Node,
    createWithConfig(config: Yoga$Config): Yoga$Node,
    destroy(node: Yoga$Node): any,
  };
}
