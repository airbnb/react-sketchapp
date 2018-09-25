// @flow
// Useful things
export type Dictionary<K, T> = { [key: K]: T };

// Sketchy things
export type SketchLayer = any;

export type WrappedSketchLayer = {
  sketchObject: SketchLayer,
};

export type MSArray<T> = {
  [key: number]: T,
  length: number,
};

type NSString = any;

export type SketchPage = {
  name: () => NSString,
  setName: string => void,
  layers: () => Array<SketchLayer>,
};

export type SketchStyle = any;

export type SketchSharedStyleContainer = {
  setObjects: (objects: Array<SketchStyle>) => void,
  addSharedStyleWithName_firstInstance: (name: string, ins: SketchStyle) => any,
};

type MSGradient = any;

type SketchAssetCollection = {
  colors: () => Array<MSColor>,
  gradients: () => Array<MSGradient>,
};

export type SketchDocumentData = {
  assets: () => SketchAssetCollection,
  layerStyles: () => void,
  layerTextStyles: () => SketchSharedStyleContainer,
  layerSymbols: () => void,
  removePageAtIndex: Function,
  addBlankPage: () => SketchPage,
  currentPage: () => SketchPage,
  setCurrentPage: (page: SketchPage) => void,
  pages: () => MSArray<SketchPage>,
  symbolsPageOrCreateIfNecessary: () => SketchPage,
};

export type SketchDocument = {
  documentData: () => SketchDocumentData,
  showMessage: (message: string) => void,
};

export type WrappedSketchDocument = {
  sketchObject: SketchDocument | SketchDocumentData,
};

export type SketchContext = {
  document: SketchDocument,
};

// Reacty things

export type Size = { width: number, height: number };

// undefined: max content
// exactly: fill available space
// at-most: fit content
export type MeasureMode = 'undefined' | 'exactly' | 'at-most';

export type Color = string | number;

export type BorderStyle = 'solid' | 'dotted' | 'dashed';

export type Overflow = 'visible' | 'hidden' | 'scroll';

export type LayoutInfo = {
  width: number,
  height: number,
  top: number,
  left: number,
  right: number,
  bottom: number,
  direction?: 'ltr' | 'rtl',
};

export type ViewStyle = {|
  color?: Color,
  shadowColor?: Color,
  shadowInner?: boolean,
  shadowSpread?: number,
  shadowOffset?: { width: number, height: number },
  shadowOpacity?: number,
  shadowRadius?: number,
  width?: number,
  height?: number,
  top?: number,
  left?: number,
  right?: number,
  bottom?: number,
  minWidth?: number,
  maxWidth?: number,
  minHeight?: number,
  maxHeight?: number,
  margin?: number,
  marginVertical?: number,
  marginHorizontal?: number,
  marginTop?: number,
  marginBottom?: number,
  marginLeft?: number,
  marginRight?: number,
  padding?: number,
  paddingVertical?: number,
  paddingHorizontal?: number,
  paddingTop?: number,
  paddingBottom?: number,
  paddingLeft?: number,
  paddingRight?: number,
  borderWidth?: number,
  borderTopWidth?: number,
  borderRightWidth?: number,
  borderBottomWidth?: number,
  borderLeftWidth?: number,
  position?: 'absolute' | 'relative',
  flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse',
  flexWrap?: 'wrap' | 'nowrap',
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around',
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch',
  alignSelf?: 'auto' | 'flex-start' | 'flex-end' | 'center' | 'stretch',
  overflow?: Overflow,
  overflowX?: Overflow,
  overflowY?: Overflow,
  flex?: number,
  flexGrow?: number,
  flexShrink?: number,
  flexBasis?: number,
  aspectRatio?: number,
  zIndex?: number,
  backfaceVisibility?: 'visible' | 'hidden',
  backgroundColor?: Color,
  borderColor?: Color,
  borderTopColor?: Color,
  borderRightColor?: Color,
  borderBottomColor?: Color,
  borderLeftColor?: Color,
  borderRadius?: number,
  borderTopLeftRadius?: number,
  borderTopRightRadius?: number,
  borderBottomLeftRadius?: number,
  borderBottomRightRadius?: number,
  borderStyle?: BorderStyle,
  borderTopStyle?: BorderStyle,
  borderRightStyle?: BorderStyle,
  borderBottomStyle?: BorderStyle,
  borderLeftStyle?: BorderStyle,
  borderWidth?: number,
  borderTopWidth?: number,
  borderRightWidth?: number,
  borderBottomWidth?: number,
  borderLeftWidth?: number,
  opacity?: number,
  transform?: string,
  transformOrigin?: string,
|};

export type TextStyle = {|
  color?: Color,
  fontFamily?: string,
  fontSize?: number,
  fontStyle?: 'normal' | 'italic',
  fontWeight?: string,
  textDecoration?: string,
  textShadowOpacity?: number,
  textShadowSpread?: number,
  textShadowOffset?: { width: number, height: number },
  textShadowRadius?: number,
  textShadowColor?: Color,
  textTransform?: 'uppercase' | 'lowercase',
  letterSpacing?: number,
  lineHeight?: number,
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify',
  paragraphSpacing?: number,
  writingDirection?: 'auto' | 'ltr' | 'rtl',
|};

export type TextNode = { content: string, textStyles: TextStyle };
export type TextNodes = Array<TextNode>;

export type TreeNode = {
  type: string,
  style: ViewStyle,
  textStyle: TextStyle,
  layout: LayoutInfo,
  props: any,
  children: ?Array<TreeNode>,
};

export type LayerCreator = (
  style: ViewStyle,
  layout: LayoutInfo,
  textStyle: TextStyle,
  props: any,
  value: ?string,
) => SketchLayer;

export type ResizeConstraints = {
  top: boolean,
  right: boolean,
  bottom: boolean,
  left: boolean,
  fixedHeight: boolean,
  fixedWidth: boolean,
};

export type SketchShadow = {
  shadowColor: Color,
  shadowOffset: { width: number, height: number },
  shadowSpread: number,
  shadowOpacity: number,
  shadowRadius: number,
  shadowInner: boolean,
};

export type SketchShadows = Array<SketchShadow>;
