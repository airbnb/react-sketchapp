import * as React from 'react';
import Badge from './Badge';

const AccessibilityBadge = ({ level }) => {
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
