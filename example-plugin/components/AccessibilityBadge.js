/* @flow */
import React from 'react';
import Badge from './Badge';

type P = {
  level: {
    aaa?: bool,
    aa?: bool,
    aaLarge?: bool,
  }
}
const AccessibilityBadge = ({ level }: P) => {
  let text = null;
  if (level.aaa) { text = 'AAA'; }
  if (level.aa) { text = 'AA'; }
  if (level.aaLarge) { text = 'AA Large'; }
  return (
    text && <Badge>
      { text }
    </Badge>
  );
};

export default AccessibilityBadge;
