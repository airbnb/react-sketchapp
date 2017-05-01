export const colors = {
  Purple: '#5700A2',
  Yellow: '#f9cc00',
  Orange: '#fd6134',
  Rose: '#ff4289',
  Green: '#005b4c',
  Black: '#222223',
  LightGrey: '#eeeeee',
  White: '#ffffff'
};

export const spacing = {
  xSmall: 4,
  Small: 8,
  Medium: 16,
  Large: 32,
  xLarge: 64
};

// http://www.modularscale.com/?16&px&1.5
export const typeRamp = {
  xSmall: 7,
  Small: 10,
  Medium: 16,
  Large: 24,
  xLarge: 36
};

export const typography = {
  Heading: {
    fontSize: typeRamp.Large
  }
};

export const fontFamily = "'SF UI Display', 'San Francisco', sans-serif";

export default {
  colors,
  spacing,
  typeRamp,
  typography,
  fontFamily
};