'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.render = exports.sketchShared = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _components = require('./components');

Object.keys(_components).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _components[key];
    }
  });
});

var _ReactSketchMount = require('./ReactSketchMount');

var _ReactSketchMount2 = _interopRequireDefault(_ReactSketchMount);

var ReactSketchComponents = _interopRequireWildcard(_components);

var _shared = require('./shared');

var shared = _interopRequireWildcard(_shared);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sketchShared = exports.sketchShared = shared;
var render = exports.render = _ReactSketchMount2.default.render;

var ReactSketch = _extends({
  render: render,
  sketchShared: sketchShared
}, ReactSketchComponents);

exports.default = ReactSketch;