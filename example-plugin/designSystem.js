import processColor from './processColor';
import type { Color } from './processColor';

export const colors = {
  Haus: '#F3F4F4',
  Night: '#333',
  Sur: '#96DBE4',
  'Sur a11y': '#24828F',
  Peach: '#EFADA0',
  'Peach a11y': '#E37059',
  Pear: '#93DAAB',
  'Pear a11y': '#2E854B',
};

const typeSizes = [
  80,
  48,
  36,
  24,
  20,
  16,
];

export const spacing = 16;

const fontFamilies = {
  bold: 'SFUIDisplay-Bold',
  regular: 'SFUIDisplay-Regular',
};

export const fonts = {
  Headline: {
    fontSize: typeSizes[0],
    fontFamily: fontFamilies.bold,
    lineHeight: 60,
  },
  'Title 1': {
    fontSize: typeSizes[2],
    fontFamily: fontFamilies.bold,
    lineHeight: 48,
  },
  'Title 2': {
    fontSize: typeSizes[3],
    fontFamily: fontFamilies.bold,
    lineHeight: 36,
  },
  'Title 3': {
    fontSize: typeSizes[4],
    fontFamily: fontFamilies.regular,
    lineHeight: 24,
  },
  Body: {
    fontSize: typeSizes[5],
    fontFamily: fontFamilies.regular,
    lineHeight: 24,
  },
};

export default {
  colors: Object.keys(colors).reduce((acc, name) => ({
    ...acc,
    [name]: processColor(colors[name]),
  }), {}),
  fonts,
  spacing,
};

export type DesignSystem = {
  fonts: any,
  colors: {[key: string]: Color},
}
