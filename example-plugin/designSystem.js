import { map } from 'ramda';
import processColor from './processColor';
import type { Color } from './processColor';

const colors = {
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

const fontFamilies = {
  bold: 'SFUIDisplay-Bold',
  regular: 'SFUIDisplay-Regular',
};

const fonts = {
  Headline: {
    fontSize: typeSizes[0],
    fontFamily: fontFamilies.bold,
    lineHeight: 60,
  },
  'Title 1': {
    fontSize: typeSizes[1],
    fontFamily: fontFamilies.bold,
    lineHeight: 48,
  },
  'Title 2': {
    fontSize: typeSizes[2],
    fontFamily: fontFamilies.bold,
    lineHeight: 48,
  },
  Body: {
    fontSize: typeSizes[5],
    fontFamily: fontFamilies.regular,
    lineHeight: 48,
  },
};

export default {
  colors: map(processColor, colors),
  fonts,
};

export type DesignSystem = {
  fonts: any,
  colors: {[key: string]: Color},
}
