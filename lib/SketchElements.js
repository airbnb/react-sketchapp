'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _shared = require('./shared');

var elements = {
  // page(parent: SketchNode, props) { return null; }

  artboard: function artboard(parent, props) {
    var layer = (0, _shared.drawArtboard)(_extends({}, props, {
      children: []
    }));
    return layer;
  },
  group: function group(parent, props) {
    var layer = (0, _shared.drawGroup)(_extends({}, props, {
      children: []
    }));
    if (parent) {
      (0, _shared.addLayerToGroup)(parent, layer);
    }
    return layer;
  },
  rect: function rect(parent, props) {
    var layer = (0, _shared.drawRectangle)(props);
    if (parent) {
      (0, _shared.addLayerToGroup)(parent, layer);
    }
    return layer;
  },
  oval: function oval(parent, props) {
    var layer = (0, _shared.drawOval)(props);
    if (parent) {
      (0, _shared.addLayerToGroup)(parent, layer);
    }
    return layer;
  },
  text: function text(parent, props) {
    var layer = (0, _shared.drawText)(props);

    if (parent) {
      (0, _shared.addLayerToGroup)(parent, layer);
    }
    return layer;
  }
};

exports.default = elements;