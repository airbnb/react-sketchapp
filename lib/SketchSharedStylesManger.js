'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StyleManager = function () {
  function StyleManager() {
    _classCallCheck(this, StyleManager);

    this.context = null;
  }

  _createClass(StyleManager, [{
    key: 'setContext',
    value: function setContext(context) {
      this.context = context;
      return context;
    }
  }, {
    key: 'addTextStyle',
    value: function addTextStyle(node) {
      var sharedStyles = this.context.document.documentData().layerTextStyles();
      addTextStyleFromLayer(sharedStyles, node);
    }
  }]);

  return StyleManager;
}();

exports.default = new StyleManager();