"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function createComponent(name) {
  var ReactSketchComponent = function ReactSketchComponent(element) {
    this.node = null;
    this._mountImage = null;
    this._renderedChildren = null;
    this._currentElement = element; // React$Element
    this._rootNodeID = null; // NodeID
    this.construct(element);
  };

  ReactSketchComponent.displayName = name;

  for (var _len = arguments.length, mixins = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    mixins[_key - 1] = arguments[_key];
  }

  Object.assign.apply(Object, [ReactSketchComponent.prototype].concat(mixins));

  return ReactSketchComponent;
}

exports.default = createComponent;