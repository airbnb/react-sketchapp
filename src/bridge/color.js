/* @flow */

const colorFromString = (string: string): MSColor => {
  const str = NSString.stringWithFormat('%@', string);
  const c = str.colorFromHexColor();
  return MSColor.colorWithNSColor(c);
};

export default colorFromString;
