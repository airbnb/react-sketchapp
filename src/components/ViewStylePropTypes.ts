import * as PropTypes from 'prop-types';

export const BorderStyle = PropTypes.oneOf<'solid' | 'dotted' | 'dashed'>([
  'solid',
  'dotted',
  'dashed',
]);
export const Color = PropTypes.oneOfType([PropTypes.string, PropTypes.number]);
export const Overflow = PropTypes.oneOf<'visible' | 'hidden' | 'scroll'>([
  'visible',
  'hidden',
  'scroll',
]);

export const ViewStylePropTypes = {
  display: PropTypes.oneOf(['flex', 'none']),
  color: Color,
  shadowColor: Color,
  shadowInner: PropTypes.bool,
  shadowSpread: PropTypes.number,
  shadowOffset: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
  }),
  shadowOpacity: PropTypes.number,
  shadowRadius: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  top: PropTypes.number,
  left: PropTypes.number,
  right: PropTypes.number,
  bottom: PropTypes.number,
  minWidth: PropTypes.number,
  maxWidth: PropTypes.number,
  minHeight: PropTypes.number,
  maxHeight: PropTypes.number,
  margin: PropTypes.number,
  marginVertical: PropTypes.number,
  marginHorizontal: PropTypes.number,
  marginTop: PropTypes.number,
  marginBottom: PropTypes.number,
  marginLeft: PropTypes.number,
  marginRight: PropTypes.number,
  padding: PropTypes.number,
  paddingVertical: PropTypes.number,
  paddingHorizontal: PropTypes.number,
  paddingTop: PropTypes.number,
  paddingBottom: PropTypes.number,
  paddingLeft: PropTypes.number,
  paddingRight: PropTypes.number,
  position: PropTypes.oneOf<'absolute' | 'relative'>(['absolute', 'relative']),
  flexDirection: PropTypes.oneOf<'row' | 'row-reverse' | 'column' | 'column-reverse'>([
    'row',
    'row-reverse',
    'column',
    'column-reverse',
  ]),
  flexWrap: PropTypes.oneOf<'wrap' | 'nowrap' | 'wrap-reverse'>(['wrap', 'nowrap', 'wrap-reverse']),
  justifyContent: PropTypes.oneOf<
    'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around'
  >(['flex-start', 'flex-end', 'center', 'space-between', 'space-around']),
  alignContent: PropTypes.oneOf<
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'stretch'
    | 'baseline'
    | 'auto'
  >([
    'flex-start',
    'flex-end',
    'center',
    'space-between',
    'space-around',
    'stretch',
    'baseline',
    'auto',
  ]),
  alignItems: PropTypes.oneOf<'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline'>([
    'flex-start',
    'flex-end',
    'center',
    'stretch',
    'baseline',
  ]),
  alignSelf: PropTypes.oneOf<
    'auto' | 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline'
  >(['auto', 'flex-start', 'flex-end', 'center', 'stretch', 'baseline']),
  overflow: Overflow,
  overflowX: Overflow,
  overflowY: Overflow,
  flex: PropTypes.number,
  flexGrow: PropTypes.number,
  flexShrink: PropTypes.number,
  flexBasis: PropTypes.number,
  aspectRatio: PropTypes.number,
  zIndex: PropTypes.number,
  backfaceVisibility: PropTypes.oneOf<'visible' | 'hidden'>(['visible', 'hidden']),
  backgroundColor: Color,
  borderColor: Color,
  borderTopColor: Color,
  borderRightColor: Color,
  borderBottomColor: Color,
  borderLeftColor: Color,
  borderRadius: PropTypes.number,
  borderTopLeftRadius: PropTypes.number,
  borderTopRightRadius: PropTypes.number,
  borderBottomLeftRadius: PropTypes.number,
  borderBottomRightRadius: PropTypes.number,
  borderStyle: BorderStyle,
  borderTopStyle: BorderStyle,
  borderRightStyle: BorderStyle,
  borderBottomStyle: BorderStyle,
  borderLeftStyle: BorderStyle,
  borderWidth: PropTypes.number,
  borderTopWidth: PropTypes.number,
  borderRightWidth: PropTypes.number,
  borderBottomWidth: PropTypes.number,
  borderLeftWidth: PropTypes.number,
  opacity: PropTypes.number,
  transform: PropTypes.string,
  transformOrigin: PropTypes.string,
};
