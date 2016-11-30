/* @flow */

export type Frame = {
  x: number,
  y: number,
  width: number,
  height: number,
};

const frame = ({ x, y, width, height }: Frame): MSRect =>
  MSRect.rectWithRect(NSMakeRect(x, y, width, height));

export default frame;
