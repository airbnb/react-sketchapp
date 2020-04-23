import { RawStyle, Style } from './types';

const { hasOwnProperty } = Object.prototype;

const styleShortHands: { [key: string]: { [subKey: string]: boolean } } = {
  borderColor: {
    borderTopColor: true,
    borderRightColor: true,
    borderBottomColor: true,
    borderLeftColor: true,
  },
  borderRadius: {
    borderTopLeftRadius: true,
    borderTopRightRadius: true,
    borderBottomRightRadius: true,
    borderBottomLeftRadius: true,
  },
  borderStyle: {
    borderTopStyle: true,
    borderRightStyle: true,
    borderBottomStyle: true,
    borderLeftStyle: true,
  },
  borderWidth: {
    borderTopWidth: true,
    borderRightWidth: true,
    borderBottomWidth: true,
    borderLeftWidth: true,
  },
  margin: {
    marginTop: true,
    marginRight: true,
    marginBottom: true,
    marginLeft: true,
  },
  marginHorizontal: {
    marginRight: true,
    marginLeft: true,
  },
  marginVertical: {
    marginTop: true,
    marginBottom: true,
  },
  overflow: {
    overflowX: true,
    overflowY: true,
  },
  padding: {
    paddingTop: true,
    paddingRight: true,
    paddingBottom: true,
    paddingLeft: true,
  },
  paddingHorizontal: {
    paddingRight: true,
    paddingLeft: true,
  },
  paddingVertical: {
    paddingTop: true,
    paddingBottom: true,
  },
  textDecorationLine: {
    textDecoration: true,
  },
  writingDirection: {
    direction: true,
  },
};

/**
 * Alpha-sort properties, apart from shorthands – they must appear before the
 * longhand properties that they expand into. This lets more specific styles
 * override less specific styles, whatever the order in which they were
 * originally declared.
 */
const sortProps = (propsArray: string[]) =>
  propsArray.sort((a, b) => {
    const expandedA = styleShortHands[a];
    const expandedB = styleShortHands[b];
    if (expandedA && expandedA[b]) {
      return -1;
    }
    if (expandedB && expandedB[a]) {
      return 1;
    }
    return a < b ? -1 : a > b ? 1 : 0;
  });

/**
 * Expand the shorthand properties to isolate every declaration from the others.
 */
export const expandStyle = (style: RawStyle): Style => {
  if (!style) return style;
  const propsArray = Object.keys(style);
  const sortedProps = sortProps(propsArray);
  const resolvedStyle: Style = {};

  for (let i = 0; i < sortedProps.length; i++) {
    const key = sortedProps[i];
    const expandedProps = styleShortHands[key];
    const value = style[key];

    if (expandedProps) {
      for (const propName in expandedProps) {
        if (hasOwnProperty.call(expandedProps, propName)) {
          resolvedStyle[propName] = value;
        }
      }
    } else {
      resolvedStyle[key] = value;
    }
  }
  return resolvedStyle;
};
