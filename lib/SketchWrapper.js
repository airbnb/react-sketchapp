'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isRootID = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ramda = require('ramda');

var _shared = require('./shared');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var isRootID = exports.isRootID = (0, _ramda.compose)((0, _ramda.equals)(1), _ramda.length, (0, _ramda.match)(/0/g));

// toParentID :: NodeID -> NodeID
var dropLastIDPortion = (0, _ramda.compose)((0, _ramda.join)('.'), _ramda.init, (0, _ramda.split)('.'));

var SketchWrapper = function () {
  function SketchWrapper() {
    _classCallCheck(this, SketchWrapper);

    this.context = null;
    this.nodes = {};
  }

  _createClass(SketchWrapper, [{
    key: 'setContext',
    value: function setContext(context) {
      var _initialize = (0, _shared.initialize)(context),
          artboard = _initialize.artboard,
          page = _initialize.page;

      this.context = context;
      this.artboard = artboard;
      this.page = page;
      return context;
    }
  }, {
    key: 'render',
    value: function render(node) {
      this.page.addLayers([node]);
    }
  }, {
    key: 'add',
    value: function add(id, node) {
      this.nodes[id] = node;
      return node;
    }
  }, {
    key: 'get',
    value: function get(id) {
      return this.nodes[id];
    }
  }, {
    key: 'getParent',
    value: function getParent(id) {
      if (isRootID(id)) {
        return this.page;
      }
      return this.get(dropLastIDPortion(id));
    }
  }, {
    key: 'drop',
    value: function drop(id) {
      this.nodes = (0, _ramda.dissoc)(id, this.nodes);
    }
  }]);

  return SketchWrapper;
}();

exports.default = new SketchWrapper();