import { generateID, makeRect, makeColorFromCSS, } from './models';

// This could be made more consty
export const makeRectPath = (radii) => {
  const [r0 = 0, r1 = 0, r2 = 0, r3 = 0, r4 = 0] = radii;
  return {
    "_class": "path",
    "isClosed": true,
    "points": [
      {
        "_class": "curvePoint",
        "cornerRadius": r0,
        "curveFrom": "{0, 0}",
        "curveMode": 1,
        "curveTo": "{0, 0}",
        "hasCurveFrom": false,
        "hasCurveTo": false,
        "point": "{0, 0}"
      },
      {
        "_class": "curvePoint",
        "cornerRadius": r1,
        "curveFrom": "{1, 0}",
        "curveMode": 1,
        "curveTo": "{1, 0}",
        "hasCurveFrom": false,
        "hasCurveTo": false,
        "point": "{1, 0}"
      },
      {
        "_class": "curvePoint",
        "cornerRadius": r2,
        "curveFrom": "{1, 1}",
        "curveMode": 1,
        "curveTo": "{1, 1}",
        "hasCurveFrom": false,
        "hasCurveTo": false,
        "point": "{1, 1}"
      },
      {
        "_class": "curvePoint",
        "cornerRadius": r3,
        "curveFrom": "{0, 1}",
        "curveMode": 1,
        "curveTo": "{0, 1}",
        "hasCurveFrom": false,
        "hasCurveTo": false,
        "point": "{0, 1}"
      }
    ]
  }
};

export const makeRectShapeLayer = (x, y, width, height, radii = [0,0,0,0]) => ({
  "_class": "rectangle",
  "do_objectID": generateID(),
  // "exportOptions": {
  //   "_class": "exportOptions",
  //   "exportFormats": [],
  //   "includedLayerIds": [],
  //   "layerOptions": 0,
  //   "shouldTrim": false
  // },
  "frame": makeRect(0, 0, width, height),
  "isFlippedHorizontal": false,
  "isFlippedVertical": false,
  "isLocked": false,
  "isVisible": true,
  "layerListExpandedType": 0,
  "name": "Path",
  "nameIsFixed": false,
  "resizingType": 0,
  "rotation": 0,
  "shouldBreakMaskChain": false,
  "booleanOperation": -1,
  "edited": false,
  "path": makeRectPath(radii),
  "fixedRadius": 8,
  "hasConvertedToNewRoundCorners": true,
});

export function makeRectShapeGroup(x, y, width, height, color) {
  const rsl = makeRectShapeLayer(x, y, width, height);
  return makeShapeGroup(makeRect(x, y, width, height), [rsl], color);
}

export const makeShapeGroup = (frame, layers = [], fillCSSColor = 'black') => ({
  "_class": "shapeGroup",
  "do_objectID": generateID(),
  // "exportOptions": {
  //   "_class": "exportOptions",
  //   "exportFormats": [],
  //   "includedLayerIds": [],
  //   "layerOptions": 0,
  //   "shouldTrim": false
  // },
  "frame": frame,
  // "isFlippedHorizontal": false,
  // "isFlippedVertical": false,
  "isLocked": false,
  "isVisible": true,
  // "layerListExpandedType": 0,
  "name": "ShapeGroup",
  "nameIsFixed": false,
  "resizingType": 0,
  "rotation": 0,
  "shouldBreakMaskChain": false,
  "style": {
    "_class": "style",
    // "borders": [
    //   {
    //     "_class": "border",
    //     "isEnabled": false,
    //     "color": {
    //       "_class": "color",
    //       "alpha": 1,
    //       "blue": 0,
    //       "green": 0,
    //       "red": 0
    //     },
    //     "fillType": 0,
    //     "position": 1,
    //     "thickness": 1
    //   }
    // ],
    "endDecorationType": 0,
    "fills": [
      {
        "_class": "fill",
        "isEnabled": true,
        "color": makeColorFromCSS(fillCSSColor),
        "fillType": 0,
        "noiseIndex": 0,
        "noiseIntensity": 0,
        "patternFillType": 1,
        "patternTileScale": 1
      }
    ],
    "miterLimit": 10,
    "startDecorationType": 0
  },
  "hasClickThrough": false,
  "layers": layers,
  "clippingMaskMode": 0,
  "hasClippingMask": false,
  "windingRule": 1
});


