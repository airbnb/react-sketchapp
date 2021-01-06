import { LayoutInfo } from '../../types';

const KEYWORDS: { [keyword: string]: [number, number, number] } = {
  top: [0.5, 0, 0],
  bottom: [0.5, 1, 0],
  left: [0, 0.5, 0],
  right: [1, 0.5, 0],
  center: [0.5, 0.5, 0],
};

function isPercentage(token: string) {
  return token.indexOf('%') !== -1;
}

export function parseTransformOriginProp(
  layout: LayoutInfo,
  _origin?: string | null,
): [number, number, number] {
  const origin = (_origin || '').trim();

  const tokens = origin.split(' ');

  let offsetX: number;
  let offsetY: number;

  if (tokens.length <= 1) {
    const keyword = KEYWORDS[tokens[0] || 'center'];
    if (keyword) {
      offsetX = keyword[0] * layout.width;
      offsetY = keyword[1] * layout.height;
    } else {
      let value = parseFloat(tokens[0]);

      if (isPercentage(tokens[0])) {
        value /= 100;
        offsetX = value * layout.width;
        offsetY = value * layout.height;
      } else {
        offsetX = value;
        offsetY = value;
      }
    }
  } else {
    const keywordX = KEYWORDS[tokens[0]];
    if (keywordX) {
      offsetX = keywordX[0] * layout.width;
    } else {
      let value = parseFloat(tokens[0]);

      if (isPercentage(tokens[0])) {
        value /= 100;
        offsetX = value * layout.width;
      } else {
        offsetX = value;
      }
    }

    const keywordY = KEYWORDS[tokens[1]];
    if (keywordY) {
      offsetY = keywordY[1] * layout.height;
    } else {
      let value = parseFloat(tokens[1]);

      if (isPercentage(tokens[1])) {
        value /= 100;
        offsetY = value * layout.height;
      } else {
        offsetY = value;
      }
    }
  }

  return [
    offsetX - layout.width / 2,
    offsetY - layout.height / 2,
    tokens[2] ? parseFloat(tokens[2]) : 0,
  ];
}
