'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _ReactMultiChild = require('react/lib/ReactMultiChild');

var _ReactMultiChild2 = _interopRequireDefault(_ReactMultiChild);

var _SketchCache = require('./SketchCache');

var _SketchCache2 = _interopRequireDefault(_SketchCache);

var _SketchSharedStylesManager = require('./SketchSharedStylesManager');

var _SketchSharedStylesManager2 = _interopRequireDefault(_SketchSharedStylesManager);

var _SketchElements = require('./SketchElements');

var _SketchElements2 = _interopRequireDefault(_SketchElements);

var _createComponent = require('./createComponent');

var _createComponent2 = _interopRequireDefault(_createComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var idCounter = 0;

/* TODO: root nodes aren't incrementing.
 * I have a feeling nativeParent._rootNodeID is the wrong key
 */
var ReactSketchComponentMixin = {
  construct: function construct(element) {
    this._currentElement = element;
  },
  getPublicInstance: function getPublicInstance() {
    return _SketchCache2.default.get(this._rootNodeID);
  },
  mountComponent: function mountComponent(transaction, // the one we made in render
  nativeParent, nativeContainerInfo, // idCounter: n
  context) // standard-ass React Context. should be empty.
  {
    var id = idCounter++;
    var parentId = (typeof nativeParent === 'undefined' ? 'undefined' : _typeof(nativeParent)) === 'object' ? nativeParent._rootNodeID : nativeParent;
    var rootID = parentId + '.' + id;
    this._rootNodeID = rootID;

    var parent = _SketchCache2.default.getParent(rootID);

    var node = this.mountNode(parent, this._currentElement);

    _SketchCache2.default.add(rootID, node);

    this.mountChildren(this._currentElement.props.children, transaction, context);

    if (this._currentElement.type === 'group') {
      node.resizeToFitChildrenWithOption(1);
    }

    if (this._currentElement.type === 'text' && this._currentElement.props.makeTextStyle) {
      _SketchSharedStylesManager2.default.addTextStyle(node);
    }

    // if (isRootID(rootID)) {
    if (rootID === '.0.0') {
      _SketchCache2.default.render(node);
    }
  },


  // returns an MSLayerWhateverBS
  mountNode: function mountNode(parent, element) {
    var props = element.props,
        type = element.type;

    var children = props.children,
        options = _objectWithoutProperties(props, ['children']);

    var el = _SketchElements2.default[type];

    (0, _invariant2.default)(!!element, 'You used a weirdo component');

    return el(parent, options);
  },


  // TODO: implement me
  // receiveComponent(nextElement, transaction, context) {
  //   log('recive component');
  //   const prevElement = this._currentElement;
  //   this._currentElement = nextElement;
  //
  //   this.updateChildren(nextElement.props.children, transaction, context);
  // },

  // TODO: implement me
  unmountComponent: function unmountComponent() {
    log('unmountComponent');
  },
  getNativeNode: function getNativeNode() {
    log('getNativeNode');
    return _SketchCache2.default.get(this._rootNodeID);
  },
  getHostNode: function getHostNode() {
    log('getHostNode');
    return _SketchCache2.default.get(this._rootNodeID);
  }
};

exports.default = (0, _createComponent2.default)('GenericComponent', ReactSketchComponentMixin, _ReactMultiChild2.default.Mixin);