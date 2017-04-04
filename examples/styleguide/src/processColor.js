/* @flow */
/* eslint-disable import/no-extraneous-dependencies */
import chroma from 'chroma-js';

export type Color = {
  hex: string,
  contrast: number,
  accessibility: {
    aa?: boolean,
    aaLarge?: boolean,
    aaa?: boolean,
    aaaLarge?: boolean,
  },
};

const minimums = {
  aa: 4.5,
  aaLarge: 3,
  aaa: 7,
  aaaLarge: 4.5,
};

export default (hex: string): Color => {
  const contrast = chroma.contrast(hex, 'white');
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
