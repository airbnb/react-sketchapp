import PropTypes from 'prop-types';

const numberProp = PropTypes.oneOfType([PropTypes.string, PropTypes.number]);
const numberArrayProp = PropTypes.oneOfType([PropTypes.arrayOf(numberProp), numberProp]);

const fillProps = {
  fill: PropTypes.string,
  fillOpacity: numberProp,
  fillRule: PropTypes.oneOf(['evenodd', 'nonzero']),
};

const clipProps = {
  clipRule: PropTypes.oneOf(['evenodd', 'nonzero']),
  clipPath: PropTypes.string,
};

const definationProps = {
  name: PropTypes.string,
};

const strokeProps = {
  stroke: PropTypes.string,
  strokeWidth: numberProp,
  strokeOpacity: numberProp,
  strokeDasharray: numberArrayProp,
  strokeDashoffset: numberProp,
  strokeLinecap: PropTypes.oneOf(['butt', 'square', 'round']),
  strokeLinejoin: PropTypes.oneOf(['miter', 'bevel', 'round']),
  strokeMiterlimit: numberProp,
};

const transformProps = {
  scale: numberProp,
  scaleX: numberProp,
  scaleY: numberProp,
  rotate: numberProp,
  rotation: numberProp,
  translate: numberProp,
  translateX: numberProp,
  translateY: numberProp,
  x: numberProp,
  y: numberProp,
  origin: numberProp,
  originX: numberProp,
  originY: numberProp,
  skew: numberProp,
  skewX: numberProp,
  skewY: numberProp,
  transform: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

const pathProps = {
  ...fillProps,
  ...strokeProps,
  ...clipProps,
  ...transformProps,
  ...definationProps,
};

// normal | italic | oblique | inherit
// https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/font-style
const fontStyle = PropTypes.oneOf(['normal', 'italic', 'oblique']);

// normal | small-caps | inherit
// https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/font-variant
const fontVariant = PropTypes.oneOf(['normal', 'small-caps']);

// normal | bold | bolder | lighter | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
// https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/font-weight
const fontWeight = PropTypes.oneOf([
  'normal',
  'bold',
  'bolder',
  'lighter',
  '100',
  '200',
  '300',
  '400',
  '500',
  '600',
  '700',
  '800',
  '900',
]);

// normal | wider | narrower | ultra-condensed | extra-condensed |
// condensed | semi-condensed | semi-expanded | expanded | extra-expanded | ultra-expanded | inherit
// https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/font-stretch
const fontStretch = PropTypes.oneOf([
  'normal',
  'wider',
  'narrower',
  'ultra-condensed',
  'extra-condensed',
  'condensed',
  'semi-condensed',
  'semi-expanded',
  'expanded',
  'extra-expanded',
  'ultra-expanded',
]);

// <absolute-size> | <relative-size> | <length> | <percentage> | inherit
// https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/font-size
const fontSize = numberProp;

// [[<family-name> | <generic-family>],]* [<family-name> | <generic-family>] | inherit
// https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/font-family
const fontFamily = PropTypes.string;

/*
    font syntax [ [ <'font-style'> || <font-variant-css21> ||
    <'font-weight'> || <'font-stretch'> ]? <'font-size'> [ / <'line-height'> ]? <'font-family'> ] |
    caption | icon | menu | message-box | small-caption | status-bar
    where <font-variant-css21> = [ normal | small-caps ]

    Shorthand property for setting ‘font-style’, ‘font-variant’,
    ‘font-weight’, ‘font-size’, ‘line-height’ and ‘font-family’.

    The ‘line-height’ property has no effect on text layout in SVG.

    Note: for the purposes of processing the ‘font’ property in SVG,
    'line-height' is assumed to be equal the value for property ‘font-size’

    https://www.w3.org/TR/SVG11/text.html#FontProperty
    https://developer.mozilla.org/en-US/docs/Web/CSS/font
    https://drafts.csswg.org/css-fonts-3/#font-prop
    https://www.w3.org/TR/CSS2/fonts.html#font-shorthand
    https://www.w3.org/TR/CSS1/#font
*/
const font = PropTypes.object;

// start | middle | end | inherit
// https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/text-anchor
const textAnchor = PropTypes.oneOf(['start', 'middle', 'end']);

// none | underline | overline | line-through | blink | inherit
// https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/text-decoration
const textDecoration = PropTypes.oneOf(['none', 'underline', 'overline', 'line-through', 'blink']);

// normal | <length> | inherit
// https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/letter-spacing
const letterSpacing = numberProp;

// normal | <length> | inherit
// https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/word-spacing
const wordSpacing = numberProp;

// auto | <length> | inherit
// https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/kerning
const kerning = numberProp;

/*
Name: font-variant-ligatures
Value: normal | none | [ <common-lig-values> || <discretionary-lig-values> ||
  <historical-lig-values> || <contextual-alt-values> ]
    Initial: normal
    Applies to: all elements
    Inherited: yes
    Percentages: N/A
    Media: visual
    Computed value: as specified
    Animatable: no

 Ligatures and contextual forms are ways of combining glyphs to produce more harmonized forms.

 <common-lig-values>        = [ common-ligatures | no-common-ligatures ]
 <discretionary-lig-values> = [ discretionary-ligatures | no-discretionary-ligatures ]
 <historical-lig-values>    = [ historical-ligatures | no-historical-ligatures ]
 <contextual-alt-values>    = [ contextual | no-contextual ]

 https://developer.mozilla.org/en/docs/Web/CSS/font-variant-ligatures
 https://www.w3.org/TR/css-fonts-3/#font-variant-ligatures-prop
*/
const fontVariantLigatures = PropTypes.oneOf(['normal', 'none']);

const fontProps = {
  fontStyle,
  fontVariant,
  fontWeight,
  fontStretch,
  fontSize,
  fontFamily,
  textAnchor,
  textDecoration,
  letterSpacing,
  wordSpacing,
  kerning,
  fontVariantLigatures,
  font,
};

/*
 Name Value Initial value Animatable
 lengthAdjust spacing | spacingAndGlyphs spacing yes
 https://svgwg.org/svg2-draft/text.html#TextElementLengthAdjustAttribute
 https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/lengthAdjust
 */
const lengthAdjust = PropTypes.oneOf(['spacing', 'spacingAndGlyphs']);

/*
 Name Value Initial value Animatable
 textLength <length> | <percentage> | <number> See below yes
 https://svgwg.org/svg2-draft/text.html#TextElementTextLengthAttribute
 https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/textLength
*/
const textLength = numberProp;

/*
 2.2. Transverse Box Alignment: the vertical-align property

 Name: vertical-align
 Value: <‘baseline-shift’> || <‘alignment-baseline’>
 Initial: baseline
 Applies to: inline-level boxes
 Inherited: no
 Percentages: N/A
 Media: visual
 Computed value: as specified
 Canonical order: per grammar
 Animation type: discrete
 This shorthand property specifies how an inline-level box is aligned within the line.
 Values are the same as for its longhand properties, see below.

 Authors should use this property (vertical-align) instead of its longhands.

 https://www.w3.org/TR/css-inline-3/#transverse-alignment
 https://drafts.csswg.org/css-inline/#propdef-vertical-align
 */
const verticalAlign = numberProp;

/*
 Name: alignment-baseline

 1.1 Value: auto | baseline | before-edge | text-before-edge | middle | central |
 after-edge | text-after-edge | ideographic | alphabetic | hanging | mathematical | inherit
 2.0 Value: baseline | text-bottom | alphabetic | ideographic | middle | central |
 mathematical | text-top | bottom | center | top
 Initial: baseline
 Applies to: inline-level boxes, flex items, grid items, table cells
 Inherited: no
 Percentages: N/A
 Media: visual
 Computed value: as specified
 Canonical order: per grammar
 Animation type: discrete
 https://drafts.csswg.org/css-inline/#propdef-alignment-baseline
 https://www.w3.org/TR/SVG11/text.html#AlignmentBaselineProperty
 https://svgwg.org/svg2-draft/text.html#AlignmentBaselineProperty
 https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/alignment-baseline
*/
const alignmentBaseline = PropTypes.oneOf([
  'baseline',
  'text-bottom',
  'alphabetic',
  'ideographic',
  'middle',
  'central',
  'mathematical',
  'text-top',
  'bottom',
  'center',
  'top',
  'text-before-edge',
  'text-after-edge',
  'before-edge',
  'after-edge',
  'hanging',
]);

/*
 2.2.2. Alignment Shift: baseline-shift longhand

 Name: baseline-shift
 Value: <length> | <percentage> | sub | super
 Initial: 0
 Applies to: inline-level boxes
 Inherited: no
 Percentages: refer to the used value of line-height
 Media: visual
 Computed value: absolute length, percentage, or keyword specified
 Animation type: discrete

 This property specifies by how much the box is shifted up from its alignment point.
 It does not apply when alignment-baseline is top or bottom.

 https://www.w3.org/TR/css-inline-3/#propdef-baseline-shift
*/
const baselineShift = PropTypes.oneOfType([
  PropTypes.oneOf(['sub', 'super', 'baseline']),
  PropTypes.arrayOf(numberProp),
  numberProp,
]);

/*
 6.12. Low-level font feature settings control: the font-feature-settings property

 Name: font-feature-settings
 Value: normal | <feature-tag-value> #
 Initial: normal
 Applies to: all elements
 Inherited: yes
 Percentages: N/A
 Media: visual
 Computed value: as specified
 Animatable: no

    This property provides low-level control over OpenType font features.

    It is intended as a way of providing access to font features
    that are not widely used but are needed for a particular use case.

    Authors should generally use ‘font-variant’ and its related subproperties
    whenever possible and only use this property for special cases where its use
    is the only way of accessing a particular infrequently used font feature.

    enable small caps and use second swash alternate
    font-feature-settings: "smcp", "swsh" 2;
    A value of ‘normal’ means that no change in glyph selection or positioning
    occurs due to this property.

    Feature tag values have the following syntax:

    <feature-tag-value> = <string> [ <integer> | on | off ]?
    The <string> is a case-sensitive OpenType feature tag. As specified in the
    OpenType specification, feature tags contain four ASCII characters.

    Tag strings longer or shorter than four characters,
    or containing characters outside the U+20–7E codepoint range are invalid.

    Feature tags need only match a feature tag defined in the font,
    so they are not limited to explicitly registered OpenType features.

    Fonts defining custom feature tags should follow the tag name rules
    defined in the OpenType specification [OPENTYPE-FEATURES].

    Feature tags not present in the font are ignored;
    a user agent must not attempt to synthesize fallback behavior based on these feature tags.

    The one exception is that user agents may synthetically support the kern feature with fonts
    that contain kerning data in the form of a ‘kern’ table but lack kern feature
    support in the ‘GPOS’ table.

    In general, authors should use the ‘font-kerning’ property to explicitly
    enable or disable kerning
    since this property always affects fonts with either type of kerning data.

    If present, a value indicates an index used for glyph selection.

    An <integer> value must be 0 or greater.

    A value of 0 indicates that the feature is disabled.

    For boolean features, a value of 1 enables the feature.

    For non-boolean features, a value of 1 or greater enables the
    feature and indicates the feature selection index.

    A value of ‘on’ is synonymous with 1 and ‘off’ is synonymous with 0.

    If the value is omitted, a value of 1 is assumed.

    font-feature-settings: "dlig" 1;       /* dlig=1 enable discretionary ligatures * /
    font-feature-settings: "smcp" on;      /* smcp=1 enable small caps * /
    font-feature-settings: 'c2sc';         /* c2sc=1 enable caps to small caps * /
    font-feature-settings: "liga" off;     /* liga=0 no common ligatures * /
    font-feature-settings: "tnum", 'hist'; /* tnum=1, hist=1 enable tabular numbers
                                              and historical forms * /
    font-feature-settings: "tnum" "hist";  /* invalid, need a comma-delimited list * /
    font-feature-settings: "silly" off;    /* invalid, tag too long * /
    font-feature-settings: "PKRN";         /* PKRN=1 enable custom feature * /
    font-feature-settings: dlig;           /* invalid, tag must be a string * /

    When values greater than the range supported by the font are specified,
    the behavior is explicitly undefined.

    For boolean features, in general these will enable the feature.

    For non-boolean features, out of range values will in general be equivalent to a 0 value.

    However, in both cases the exact behavior will depend upon the way the font is designed
    (specifically, which type of lookup is used to define the feature).

    Although specifically defined for OpenType feature tags,
    feature tags for other modern font formats that support font features
    may be added in the future.

    Where possible, features defined for other font formats
    should attempt to follow the pattern of registered OpenType tags.

    The Japanese text below will be rendered with half-width kana characters:

    body { font-feature-settings: "hwid"; /* Half-width OpenType feature * / }

    <p>毎日カレー食べてるのに、飽きない</p>

    https://drafts.csswg.org/css-fonts-3/#propdef-font-feature-settings
    https://developer.mozilla.org/en/docs/Web/CSS/font-feature-settings
*/
const fontFeatureSettings = PropTypes.string;

const textSpecificProps = {
  ...pathProps,
  ...fontProps,
  alignmentBaseline,
  baselineShift,
  verticalAlign,
  lengthAdjust,
  textLength,
  fontData: PropTypes.object,
  fontFeatureSettings,
};

// https://svgwg.org/svg2-draft/text.html#TSpanAttributes
const textProps = {
  ...textSpecificProps,
  dx: numberArrayProp,
  dy: numberArrayProp,
};

/*
 Name
 side
 Value
 left | right
 initial value
 left
 Animatable
 yes
 https://svgwg.org/svg2-draft/text.html#TextPathElementSideAttribute
*/
const side = PropTypes.oneOf(['left', 'right']);

/*
 Name
 startOffset
 Value
 <length> | <percentage> | <number>
 initial value
 0
 Animatable
 yes
 https://svgwg.org/svg2-draft/text.html#TextPathElementStartOffsetAttribute
 https://developer.mozilla.org/en/docs/Web/SVG/Element/textPath
 */
const startOffset = numberProp;

/*
 Name
 method
 Value
 align | stretch
 initial value
 align
 Animatable
 yes
 https://svgwg.org/svg2-draft/text.html#TextPathElementMethodAttribute
 https://developer.mozilla.org/en/docs/Web/SVG/Element/textPath
 */
const method = PropTypes.oneOf(['align', 'stretch']);

/*
 Name
 spacing
 Value
 auto | exact
 initial value
 exact
 Animatable
 yes
 https://svgwg.org/svg2-draft/text.html#TextPathElementSpacingAttribute
 https://developer.mozilla.org/en/docs/Web/SVG/Element/textPath
 */
const spacing = PropTypes.oneOf(['auto', 'exact']);

/*
 Name
 mid-line
 Value
 sharp | smooth
 initial value
 smooth
 Animatable
 yes
 */
const midLine = PropTypes.oneOf(['sharp', 'smooth']);

// https://svgwg.org/svg2-draft/text.html#TextPathAttributes
// https://developer.mozilla.org/en/docs/Web/SVG/Element/textPath
const textPathProps = {
  ...textSpecificProps,
  href: PropTypes.string.isRequired,
  startOffset,
  method,
  spacing,
  side,
  midLine,
};

export {
  numberProp,
  fillProps,
  strokeProps,
  fontProps,
  textProps,
  textPathProps,
  clipProps,
  pathProps,
};
