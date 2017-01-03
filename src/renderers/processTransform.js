import type { LayoutInfo } from '../types';
/*
 a   b   0
 c   d   0
 tx  ty  1
 */
function CGAffineTransformMake(a, b, c, d, tx, ty) {
  return { a, b, c, d, tx, ty };
}

function convertToRadians(value: string): number {
  const floatValue = parseFloat(value, 10);
  return value.indexOf('rad') > -1 ? floatValue : ((floatValue * Math.PI) / 180);
}

const IDENTITY = CGAffineTransformMake(1, 0, 0, 1, 0, 0);
const TRANSLATE = CGAffineTransformMakeTranslation(-0.5, -0.5);
const UNTRANSLATE = CGAffineTransformMakeTranslation(0.5, 0.5);

function makeTransformFromKeyValue(layout, key, value) {
  let transform = IDENTITY;
  switch (key) {
    case 'perspective':
      // TODO: Figure out how to do 3D transforms
      break;
    case 'rotate':
    case 'rotateZ':
      transform = CGAffineTransformMakeRotation(convertToRadians(value));
      break;
    case 'rotateX':
    case 'rotateY':
      // TODO: Figure out how to do 3D transforms
      break;
    case 'scale':
      transform = CGAffineTransformMakeScale(value, value);
      break;
    case 'scaleX':
      transform = CGAffineTransformMakeScale(value, 1);
      break;
    case 'scaleY':
      transform = CGAffineTransformMakeScale(1, value);
      break;
    case 'translateX':
      transform = CGAffineTransformMakeTranslation(value / layout.width, 0);
      break;
    case 'translateY':
      transform = CGAffineTransformMakeTranslation(0, value / layout.height);
      break;
    case 'skewX': {
      //   1      0      0
      // sin(x) cos(x)   0
      //   0      0      1
      const rads = convertToRadians(value);
      transform = CGAffineTransformMake(1, 0, Math.sin(rads), Math.cos(rads), 0, 0);
    } break;
    case 'skewY': {
      // cos(y) sin(y)   0
      //   0      1      0
      //   0      0      1
      const rads = convertToRadians(value);
      transform = CGAffineTransformMake(Math.cos(rads), Math.sin(rads), 0, 1, 0, 0);
    } break;
    default:
      log(`did an unsupported transform: ${key}: ${value}`);
      break;
  }
  return transform;
}

function transformFromTransformArray(layout: LayoutInfo, transforms: Array<any>) {
  let transform = IDENTITY;
  transforms.forEach((t) => {
    Object.keys(t).forEach((key) => {
      transform = CGAffineTransformConcat(
        transform,
        makeTransformFromKeyValue(layout, key, t[key])
      );
    });
  });
  return transform;
}

export default function processTransform(rect: any, layout: LayoutInfo, transforms: Array<any>) {
  let transform = transformFromTransformArray(layout, transforms);
  // by default in sketch, transform origin is (0, 0), but in RN it's (0.5, 0.5)
  // to remedy, we apply a translation matrix before and after the transform
  // this is effectively TRANSLATE * transfrom * UNTRANSLATE
  transform = CGAffineTransformConcat(TRANSLATE, transform);
  transform = CGAffineTransformConcat(transform, UNTRANSLATE);
  rect.applyAffineTransformToPath(transform);
}
