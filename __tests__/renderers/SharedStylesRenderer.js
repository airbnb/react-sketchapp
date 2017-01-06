import Renderer from '../../src/renderers/SharedStylesRenderer';

// eslint-disable-next-line no-console
global.log = x => console.log(x);

global.MSColor = {
  colorWithRGBADictionary: jest.fn().mockReturnThis(),
};

class MSRect {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  setX(x) {
    this.x = x;
    return this;
  }

  setY(y) {
    this.y = y;
    return this;
  }

  setWidth(width) {
    this.width = width;
    return this;
  }

  setHeight(height) {
    this.height = height;
    return this;
  }

  // eslint-disable-next-line camelcase
  static rectWithX_y_width_height(x, y, width, height) {
    return new MSRect(x, y, width, height);
  }

  static rectWithRect(rect) {
    return new MSRect(rect.x, rect.y, rect.width, rect.height);
  }
}
global.MSRect = MSRect;

class MSStylePart {
  setFillType() {}
  setThickness() {}
  setPosition() {}
}

class MSStyle {
  constructor(style) {
    this.style = style;
  }

  addStylePartOfType(type) {
    // TODO
    this.parts = [...this.parts, type];
    return new MSStylePart();
  }
}

class MSTextLayer {
  setStringValue(x) {
    this.stringValue = x;
    return this;
  }

  setTextColor(x) {
    this.textColor = x;
    return this;
  }

  setLineHeight(x) {
    this.lineHeight = x;
    return this;
  }

  setCharacterSpacing(x) {
    this.characterSpacing = x;
    return this;
  }

  setTextAlignment(x) {
    this.textAlignment = x;
    return this;
  }

  setTextBehaviour(x) {
    this.textBehavior = x;
    return this;
  }

  setFont(x) {
    this.font = x;
    return this;
  }

  style() {
    return new MSStyle({
      textColor: this.textColor,
      lineHeight: this.lineHeight,
    });
  }

  static alloc = jest.fn().mockReturnThis()
  static initWithFrame_(frame) {
    const layer = new MSTextLayer();
    layer.frame = frame;
    return layer;
  }
}
global.MSTextLayer = MSTextLayer;

class MSRectangleShape {
  setCornerRadiusFromComponents() {
    return this;
  }

  static alloc = jest.fn().mockReturnThis()
  static init() {
    return new MSRectangleShape();
  }
}

global.MSRectangleShape = MSRectangleShape;

class MSShapeGroup {
  setName(name) {
    this.name = name;
  }

  style() {
    return new MSStyle();
  }

  static shapeWithPath(path) {
    return new MSShapeGroup({ path });
  }
}

global.MSShapeGroup = MSShapeGroup;

class MSLayerGroup {
  frame() {
    return new MSRect();
  }

  setName(name) {
    this.name = name;
  }

  static alloc = jest.fn().mockReturnThis()
  static init() {
    return new MSLayerGroup();
  }
}
global.MSLayerGroup = MSLayerGroup;

global.NSMakeRect = jest.fn((a, b, c, d) => [a, b, c, d].join('-'));

global.NSFont = {
  fontWithName_size: jest.fn().mockReturnThis(),
};

jest.mock('../../src/renderers/processTransform');
jest.mock('../../src/utils/convertToColor');
jest.mock('../../src/utils/findFont');
jest.mock('../../src/utils/createStringMeasurer');

test('Renderer', () => {
  const renderer = new Renderer();
  const layout = jest.fn();
  const style = {};
  const textStyle = {};

  const props = {
    styles: {
      foo: {
        fontSize: 24,
      },
    },
  };

  global.sharedStyles = {
    setObjects: jest.fn(),
    addSharedStyleWithName_firstInstance: jest.fn(),
  };

  renderer.renderGroupLayer(layout, style, textStyle, props);
  expect(global.sharedStyles.setObjects).not.toBeCalled();
});

test('with clearExistingStyles set', () => {
  const renderer = new Renderer();
  const layout = jest.fn();
  const style = {};
  const textStyle = {};

  const props = {
    clearExistingStyles: true,
    styles: {
      foo: {
        fontSize: 24,
      },
    },
  };

  global.sharedStyles = {
    setObjects: jest.fn(),
    addSharedStyleWithName_firstInstance: jest.fn(),
  };

  renderer.renderGroupLayer(layout, style, textStyle, props);

  expect(global.sharedStyles.setObjects).toBeCalled();
});
