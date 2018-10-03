// @flow
import { render, renderToJSON } from './render';
import Platform from './Platform';
import StyleSheet from './stylesheet';
import Document from './components/Document';
import Page from './components/Page';
import Artboard from './components/Artboard';
import Image from './components/Image';
import RedBox from './components/RedBox';
import Svg from './components/Svg';
import View from './components/View';
import Text from './components/Text';
import TextStyles from './sharedStyles/TextStyles';
import { makeSymbol, getSymbolComponentByName, injectSymbols } from './symbol';

module.exports = {
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
  injectSymbols,
};
