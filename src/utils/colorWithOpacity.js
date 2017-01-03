import normalizeColor from 'normalize-css-color';

const colorWithOpacity = (input, opacity) => {
  const nullableColor: ?number = normalizeColor(input);
  const colorInt: number = nullableColor == null ? 0x00000000 : nullableColor;
  const { r, g, b, a } = normalizeColor.rgba(colorInt);

  return MSColor.colorWithRGBADictionary({ r: r / 255, g: g / 255, b: b / 255, a: a * opacity });
};

module.exports = colorWithOpacity;
