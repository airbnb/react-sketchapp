'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compact = compact;
var alignment = exports.alignment = {
  left: 0,
  right: 1,
  center: 2,
  full: 3
};

var initialize = exports.initialize = function initialize(context) {
  var doc = context.document;
  var page = doc.currentPage();
  var artboard = page.currentArtboard();
  var selection = context.selection;

  return { doc: doc, page: page, artboard: artboard, selection: selection };
};

var utils = exports.utils = {
  createLabel: function createLabel(frame, text) {
    var label = NSTextField.alloc().initWithFrame(frame);
    label.setStringValue(text);
    label.setSelectable(false);
    label.setEditable(false);
    label.setBezeled(false);
    label.setDrawsBackground(false);
    return label;
  },
  dump: function dump(obj) {
    log('#####################################################################################');
    log('## Dumping object ' + obj);
    log('## obj class is: ' + obj.className());
    log('#####################################################################################');
    log('obj.properties:');
    log(obj.class().mocha().properties());
    log('obj.propertiesWithAncestors:');
    log(obj.class().mocha().propertiesWithAncestors());
    log('obj.classMethods:');
    log(obj.class().mocha().classMethods());
    log('obj.classMethodsWithAncestors:');
    log(obj.class().mocha().classMethodsWithAncestors());
    log('obj.instanceMethods:');
    log(obj.class().mocha().instanceMethods());
    log('obj.instanceMethodsWithAncestors:');
    log(obj.class().mocha().instanceMethodsWithAncestors());
    log('obj.protocols:');
    log(obj.class().mocha().protocols());
    log('obj.protocolsWithAncestors:');
    log(obj.class().mocha().protocolsWithAncestors());
    log('obj.treeAsDictionary():');
    log(obj.treeAsDictionary());
  }
};

var drawLayerFrame = exports.drawLayerFrame = function drawLayerFrame(_ref) {
  var layer = _ref.layer,
      _ref$padding = _ref.padding,
      padding = _ref$padding === undefined ? 10 : _ref$padding,
      _ref$locked = _ref.locked,
      locked = _ref$locked === undefined ? false : _ref$locked,
      _ref$backgroundColor = _ref.backgroundColor,
      backgroundColor = _ref$backgroundColor === undefined ? '#ffffff' : _ref$backgroundColor;

  var props = {
    name: layer.name() + ' BG',
    x: layer.frame().x() - padding,
    y: layer.frame().y() - padding,
    width: layer.frame().width() + padding * 2,
    height: layer.frame().height() + padding * 2,
    locked: locked,
    backgroundColor: backgroundColor
  };

  return drawRectangle(props);
};

var drawArtboard = exports.drawArtboard = function drawArtboard(props) {
  var artboard = MSArtboardGroup.alloc().init();

  var x = props.x || 0;
  var y = props.y || 0;
  var paddingTop = props.paddingTop || 0;
  var paddingRight = props.paddingRight || 0;
  var paddingBottom = props.paddingBottom || 0;
  var paddingLeft = props.paddingLeft || 0;
  // const children = props.children || [];

  if (props.name) {
    artboard.setName(props.name);
  }

  if (props.children) {
    artboard.addLayers(props.children);
    // const childBounds = MSLayerGroup.groupBoundsForLayers(props.children);
    // artboard.frame = frameFromProps({
    //   x,
    //   y,
    //   width: childBounds.size.width + paddingLeft + paddingRight,
    //   height: childBounds.size.height + paddingTop + paddingBottom,
    // });
  }

  if (props.backgroundColor) {
    var background = colorFromString(props.backgroundColor);
    artboard.setBackgroundColor(background);
    artboard.hasBackgroundColor = true;
  }

  // if (props.paddingRight) {
  //   const frame = artboard.frame();
  //   frame.x = frame.x() - props.paddingRight;
  //   frame.width = frame.width() + props.paddingRight;
  // }
  //
  // if (props.paddingBottom) {
  //   const frame = artboard.frame();
  //   frame.y = frame.y() - props.paddingBottom;
  //   frame.height = frame.height() + props.paddingBottom;
  // }

  return artboard;
};

var frameFromProps = exports.frameFromProps = function frameFromProps(_ref2) {
  var x = _ref2.x,
      y = _ref2.y,
      width = _ref2.width,
      height = _ref2.height;
  return MSRect.rectWithRect(NSMakeRect(x, y, width, height));
};

// returns MSColor
var colorFromString = exports.colorFromString = function colorFromString(string) {
  var str = NSString.stringWithFormat('%@', string);
  var c = str.colorFromHexColor();
  return MSColor.colorWithNSColor(c);
};

var shapeGroup = exports.shapeGroup = function shapeGroup(shape, props) {
  var group = MSShapeGroup.shapeWithPath(shape);
  var style = group.style().addStylePartOfType(0);
  style.color = colorFromString(props.backgroundColor || '#000');

  if (props.name) {
    group.name = props.name;
  }

  return group;
};

var drawRectangle = exports.drawRectangle = function drawRectangle(props) {
  var rect = MSRectangleShape.alloc().init();
  rect.frame = frameFromProps(props);

  if (props.radius) {
    rect.cornerRadiusFloat = props.radius;
  }

  var layer = shapeGroup(rect, props);

  if (props.locked) {
    layer.setIsLocked(true);
  }

  return layer;
};

var drawOval = exports.drawOval = function drawOval(props) {
  var oval = MSOvalShape.alloc().init();
  oval.frame = frameFromProps(props);

  var layer = shapeGroup(oval, props);

  if (props.locked) {
    layer.setIsLocked(true);
  }

  return layer;
};

var drawGroup = exports.drawGroup = function drawGroup(props) {
  var layer = MSLayerGroup.alloc().init();

  if (props.name) {
    layer.name = props.name;
  }

  layer.addLayers(props.children);
  layer.resizeToFitChildrenWithOption(1);

  if (props.x) {
    var frame = layer.frame();
    frame.setX(frame.x() + props.x);
  }

  if (props.y) {
    var _frame = layer.frame();
    _frame.setY(_frame.y() + props.y);
  }

  if (props.locked) {
    layer.setIsLocked(true);
  }

  if (props.clickThrough) {
    layer.setHasClickThrough(true);
  }

  return layer;
};

var addLayerToGroup = exports.addLayerToGroup = function addLayerToGroup(group, layer) {
  group.addLayers([layer]);
  return group;
};

var drawText = exports.drawText = function drawText(props) {
  var layer = MSTextLayer.alloc().init();

  var value = props.value;
  if (props.uppercase) {
    value = props.value.toUpperCase();
  }

  layer.setStringValue(value);

  layer.setName(props.name || value);

  var font = NSFont.fontWithName_size(props.fontFamily, props.fontSize);
  layer.setFont(font);

  if (props.color) {
    layer.setTextColor(colorFromString(props.color));
  }

  if (props.lineHeight) {
    layer.setLineHeight(props.lineHeight);
  }

  if (props.x) {
    var frame = layer.frame();
    frame.setX(props.x);
  }

  if (props.y) {
    var _frame2 = layer.frame();
    _frame2.setY(props.y);
  }

  if (props.letterSpacing) {
    layer.setCharacterSpacing(props.letterSpacing);
  }

  if (props.align) {
    layer.setTextAlignment(alignment[props.align]);
  }

  if (props.locked) {
    layer.setIsLocked(true);
  }

  if (props.opacity) {
    layer.style().contextSettings().opacity = props.opacity;
  }

  return layer;
};

var addTextStyleFromLayer = exports.addTextStyleFromLayer = function addTextStyleFromLayer(styles, layer) {
  return styles.addSharedStyleWithName_firstInstance(layer.name(), layer.style());
};

function compact(arr) {
  return arr.filter(function (x) {
    return x !== undefined;
  });
}