import { render as _render, renderToJSON as _renderToJSON } from './render';
import _Platform from './Platform';
import _StyleSheet from './stylesheet';
import _Document from './components/Document';
import _Page from './components/Page';
import _Artboard from './components/Artboard';
import _Image from './components/Image';
import _RedBox from './components/RedBox';
import _Svg from './components/Svg';
import _View from './components/View';
import _Text from './components/Text';
import _TextStyles from './sharedStyles/TextStyles';
import {
  makeSymbol as _makeSymbol,
  getSymbolComponentByName as _getSymbolComponentByName,
  getSymbolMasterByName as _getSymbolMasterByName,
  injectSymbols as _injectSymbols,
} from './symbol';
import { useWindowDimensions as _useWindowDimensions } from './context';

export const render = _render;
export const renderToJSON = _renderToJSON;
export const StyleSheet = _StyleSheet;
export const Document = _Document;
export const Page = _Page;
export const Artboard = _Artboard;
export const Image = _Image;
export const RedBox = _RedBox;
export const Svg = _Svg;
export const Text = _Text;
export const TextStyles = _TextStyles;
export const View = _View;
export const Platform = _Platform;
export const makeSymbol = _makeSymbol;
export const getSymbolComponentByName = _getSymbolComponentByName;
export const getSymbolMasterByName = _getSymbolMasterByName;
export const injectSymbols = _injectSymbols;
export const useWindowDimensions = _useWindowDimensions;

export default {
  render,
  renderToJSON,
  StyleSheet,
  Document,
  Page,
  Artboard,
  Image,
  RedBox,
  Svg,
  Text,
  TextStyles,
  View,
  Platform,
  makeSymbol,
  getSymbolComponentByName,
  getSymbolMasterByName,
  injectSymbols,
  useWindowDimensions,
};
