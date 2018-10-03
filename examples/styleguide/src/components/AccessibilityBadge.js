// @flow
import * as React from 'react';
import Badge from './Badge';

type P = {
  level: {
    aaa?: boolean,
    aa?: boolean,
    aaLarge?: boolean,
  },
};
const AccessibilityBadge = ({ level }: P) => {
  let text;
  switch (true) {
    case level.aaa:
      text = 'AAA';
      break;
    case level.aa:
      text = 'AA';
      break;
    case level.aaLarge:
      text = 'AA Large';
      break;
    default:
      text = null;
  }
  return text && <Badge>{text}</Badge>;
};

export default AccessibilityBadge;
