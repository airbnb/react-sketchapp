import * as PropTypes from 'prop-types';
import { ViewStylePropTypes, Color } from './ViewStylePropTypes';

export const TextStylePropTypes = {
  ...ViewStylePropTypes,
  fontFamily: PropTypes.string,
  fontSize: PropTypes.number,
  fontStyle: PropTypes.oneOf<'normal' | 'italic'>(['normal', 'italic']),
  fontWeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  textDecoration: PropTypes.oneOf<'none' | 'underline' | 'double' | 'line-through'>([
    'none',
    'underline',
    'double',
    'line-through',
  ]),
  textShadowOpacity: PropTypes.number,
  textShadowSpread: PropTypes.number,
  textShadowOffset: PropTypes.shape({ width: PropTypes.number, height: PropTypes.number }),
  textShadowRadius: PropTypes.number,
  textShadowColor: Color,
  textTransform: PropTypes.oneOf<'uppercase' | 'lowercase'>(['uppercase', 'lowercase']),
  letterSpacing: PropTypes.number,
  lineHeight: PropTypes.number,
  textAlign: PropTypes.oneOf<'auto' | 'left' | 'right' | 'center' | 'justify'>([
    'auto',
    'left',
    'right',
    'center',
    'justify',
  ]),
  paragraphSpacing: PropTypes.number,
  writingDirection: PropTypes.oneOf<'auto' | 'ltr' | 'rtl'>(['auto', 'ltr', 'rtl']),
};
