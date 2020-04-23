import * as PropTypes from 'prop-types';
import {
  ViewStylePropTypes,
  Color as ColorProp,
  BorderStyle as BorderProp,
  Overflow as OverflowProp,
} from '../components/ViewStylePropTypes';
import { TextStylePropTypes } from '../components/TextStylePropTypes';

// Sketchy things
export type SketchLayer = any;

export type WrappedSketchLayer = {
  sketchObject: SketchLayer;
};

export type MSArray<T> = {
  [key: number]: T;
  length: number;
};

type NSString = any;

export type SketchPage = {
  name: () => NSString;
  setName: (name: string) => void;
  layers: () => Array<SketchLayer>;
  children: () => Array<SketchLayer>;
};

export type SketchStyle = any;

export type SketchSharedStyleContainer = {
  objects: () => any[];
  setObjects: (objects: Array<SketchStyle>) => void;
  addSharedStyleWithName_firstInstance: (name: string, ins: SketchStyle) => any;
  addSharedObject: (ins: any) => any;
};

type MSGradient = any;
type MSColor = any;

type SketchAssetCollection = {
  colors: () => Array<MSColor>;
  gradients: () => Array<MSGradient>;
};

export type SketchDocumentData = {
  delegate: () => SketchDocument;
  assets: () => SketchAssetCollection;
  layerStyles: () => void;
  layerTextStyles: () => SketchSharedStyleContainer;
  layerSymbols: () => void;
  symbolMap: () => { [symbolID: string]: SketchLayer };
  removePageAtIndex: (index: number) => void;
  addBlankPage: () => SketchPage;
  currentPage: () => SketchPage;
  setCurrentPage: (page: SketchPage) => void;
  pages: () => MSArray<SketchPage>;
  symbolsPageOrCreateIfNecessary: () => SketchPage;
};

export type SketchDocument = {
  documentData: () => SketchDocumentData;
  showMessage: (message: string) => void;
};

export type WrappedSketchDocument = {
  sketchObject: SketchDocument | SketchDocumentData;
};

export type SketchContext = {
  document: SketchDocument;
  actionContext: {
    document?: SketchDocument;
  };
};

// Reacty things

export type Size = { width: number; height: number };

export type LayoutInfo = {
  width: number;
  height: number;
  top: number;
  left: number;
  right: number;
  bottom: number;
  direction?: 'ltr' | 'rtl';
};

// undefined: max content
// exactly: fill available space
// at-most: fit content
export type MeasureMode = 'undefined' | 'exactly' | 'at-most';

export type Color = PropTypes.InferType<typeof ColorProp>;
export type BorderStyle = PropTypes.InferType<typeof BorderProp>;
export type Overflow = PropTypes.InferType<typeof OverflowProp>;
export type ViewStyle = PropTypes.InferProps<typeof ViewStylePropTypes> & { color?: string };
export type TextStyle = PropTypes.InferProps<typeof TextStylePropTypes> & { color?: string };

export type TextNode = { content: string; textStyles: TextStyle };

export type TreeNode<Props = any> = {
  type: string;
  style: ViewStyle;
  textStyle?: TextStyle;
  layout: LayoutInfo;
  props: Props & { textNodes: TextNode[] };
  children?: Array<TreeNode | string>;
};

export type ResizeConstraints = {
  top?: boolean;
  right?: boolean;
  bottom?: boolean;
  left?: boolean;
  fixedHeight?: boolean;
  fixedWidth?: boolean;
};

export type PlatformBridge = {
  createStringMeasurer(textNodes: TextNode[], maxWidth: number): Size;
  findFontName(style: TextStyle): string;
  makeImageDataFromUrl(url?: string): string;
};
