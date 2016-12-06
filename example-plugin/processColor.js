/* @flow */
/* eslint-disable import/no-extraneous-dependencies */
import color from 'color';

export type Color = {
  hex: string,
  contrast: number,
  accessibility: {
    aa?: bool,
    aaLarge?: bool,
    aaa?: bool,
    aaaLarge?: bool,
  },
};
const white = color('#fff');

const minimums = {
  aa: 4.5,
  aaLarge: 3,
  aaa: 7,
  aaaLarge: 4.5,
};

export default (hex: string): Color => {
  const contrast = color(hex).contrast(white);
  return {
    hex,
    contrast,
    accessibility: {
      aa: contrast >= minimums.aa,
      aaLarge: contrast >= minimums.aaLarge,
      aaa: contrast >= minimums.aaa,
      aaaLarge: contrast >= minimums.aaaLarge,
    },
  };
};
