/* eslint max-len:0 no-nested-ternary:0 */
const { hasOwnProperty } = Object.prototype;

const styleShortHands = {
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
const sortProps = propsArray =>
  propsArray.sort((a, b) => {
    const expandedA = styleShortHands[a];
    const expandedB = styleShortHands[b];
    if (expandedA && expandedA[b]) {
      return -1;
    } else if (expandedB && expandedB[a]) {
      return 1;
    }
    return a < b ? -1 : a > b ? 1 : 0;
  });

/**
 * Expand the shorthand properties to isolate every declaration from the others.
 */
const expandStyle = (style) => {
  if (!style) return style;
  /* eslint no-param-reassign:0 */
  const propsArray = Object.keys(style);
  const sortedProps = sortProps(propsArray);
  const resolvedStyle = {};

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < sortedProps.length; i++) {
    const key = sortedProps[i];
    const expandedProps = styleShortHands[key];
    const value = style[key];

    if (expandedProps) {
      // eslint-disable-next-line no-restricted-syntax
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

module.exports = expandStyle;
