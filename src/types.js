// Useful things
export type Dictionary<K, T> = { [key: K]: T };

// Sketchy things
export type SketchLayer = any;

export type SketchStyle = any;

export type MSArray<T> = {
  [key: number]: T,
  length: number,
};

type NSString = any;

export type SketchPage = {
  name: () => NSString,
};

export type SketchSharedStyleContainer = {
  setObjects: (objects: Array<SketchStyle>) => void,
  addSharedStyleWithName_firstInstance: (name: string, ins: SketchStyle) => void,
};

type MSGradient = any;

type SketchAssetCollection = {
  colors: () => Array<MSColor>,
  gradients: () => Array<MSGradient>,
};

export type SketchDocumentData = {
  layerStyles: () => void,
  layerTextStyles: () => SketchSharedStyleContainer,
  layerSymbols: () => void,
  assets: () => SketchAssetCollection,
};

export type SketchDocument = {
  documentData: () => SketchDocumentData,
  pages: () => MSArray<SketchPage>,
  addBlankPage: () => SketchPage,
  currentPage: SketchPage,
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

export type LayoutInfo = {
  width: number,
  height: number,
  top: number,
  left: number,
  right: number,
  bottom: number,
  direction: 'ltr' | 'rtl',
};

export type ViewStyle = {
  shadowColor: Color,
  shadowOffset: { width: number, height: number },
  shadowOpacity: number,
  shadowRadius: number,
  width: number,
  height: number,
  top: number,
  left: number,
  right: number,
  bottom: number,
  minWidth: number,
  maxWidth: number,
  minHeight: number,
  maxHeight: number,
  margin: number,
  marginVertical: number,
  marginHorizontal: number,
  marginTop: number,
  marginBottom: number,
  marginLeft: number,
  marginRight: number,
  padding: number,
  paddingVertical: number,
  paddingHorizontal: number,
  paddingTop: number,
  paddingBottom: number,
  paddingLeft: number,
  paddingRight: number,
  borderWidth: number,
  borderTopWidth: number,
  borderRightWidth: number,
  borderBottomWidth: number,
  borderLeftWidth: number,
  position: 'absolute' | 'relative',
  flexDirection: 'row' | 'row-reverse' | 'column' | 'column-reverse',
  flexWrap: 'wrap' | 'nowrap',
  justifyContent: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around',
  alignItems: 'flex-start' | 'flex-end' | 'center' | 'stretch',
  alignSelf: 'auto' | 'flex-start' | 'flex-end' | 'center' | 'stretch',
  overflow: 'visible' | 'hidden' | 'scroll',
  flex: number,
  flexGrow: number,
  flexShrink: number,
  flexBasis: number,
  aspectRatio: number,
  zIndex: number,
  backfaceVisibility: 'visible' | 'hidden',
  backgroundColor: Color,
  borderColor: Color,
  borderTopColor: Color,
  borderRightColor: Color,
  borderBottomColor: Color,
  borderLeftColor: Color,
  borderRadius: number,
  borderTopLeftRadius: number,
  borderTopRightRadius: number,
  borderBottomLeftRadius: number,
  borderBottomRightRadius: number,
  borderStyle: 'solid' | 'dotted' | 'dashed',
  borderWidth: number,
  borderTopWidth: number,
  borderRightWidth: number,
  borderBottomWidth: number,
  borderLeftWidth: number,
  opacity: number,
};

export type TextStyle = {
  color: Color,
  fontFamily: string,
  fontSize: number,
  fontStyle: 'normal' | 'italic',
  fontWeight: string,
  textShadowOffset: { width: number, height: number },
  textShadowRadius: number,
  textShadowColor: Color,
  textTransform: 'uppercase' | 'lowercase',
  letterSpacing: number,
  lineHeight: number,
  textAlign: 'auto' | 'left' | 'right' | 'center' | 'justify',
  writingDirection: 'auto' | 'ltr' | 'rtl',
};

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
