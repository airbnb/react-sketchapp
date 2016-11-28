'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _invariant = require('fbjs/lib/invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _instantiateReactComponent = require('react/lib/instantiateReactComponent');

var _instantiateReactComponent2 = _interopRequireDefault(_instantiateReactComponent);

var _ReactElement = require('react/lib/ReactElement');

var _ReactElement2 = _interopRequireDefault(_ReactElement);

var _ReactInstanceHandles = require('react/lib/ReactInstanceHandles');

var _ReactInstanceHandles2 = _interopRequireDefault(_ReactInstanceHandles);

var _ReactUpdates = require('react/lib/ReactUpdates');

var _ReactUpdates2 = _interopRequireDefault(_ReactUpdates);

var _ReactReconciler = require('react/lib/ReactReconciler');

var _ReactReconciler2 = _interopRequireDefault(_ReactReconciler);

var _ReactSketchDefaultInjection = require('./ReactSketchDefaultInjection');

var _ReactSketchDefaultInjection2 = _interopRequireDefault(_ReactSketchDefaultInjection);

var _SketchCache = require('./SketchCache');

var _SketchCache2 = _interopRequireDefault(_SketchCache);

var _SketchSharedStylesManager = require('./SketchSharedStylesManager');

var _SketchSharedStylesManager2 = _interopRequireDefault(_SketchSharedStylesManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_ReactSketchDefaultInjection2.default.inject();


var ReactSketchMount = {
  render: function render(nextElement, context, callback) {
    (0, _invariant2.default)(_ReactElement2.default.isValidElement(nextElement), 'ReactSketch.render(): Invalid component element.%s', typeof nextElement === 'function' ? ' Instead of passing a component class, make sure to instantiate ' + 'it by passing it to React.createElement.' :
    // Check if it quacks like an element
    nextElement != null && nextElement.props !== undefined ? ' This may be caused by unintentionally loading two independent ' + 'copies of React.' : '');

    var id = _ReactInstanceHandles2.default.createReactRootID(0);

    var component = (0, _instantiateReactComponent2.default)(nextElement);

    _SketchCache2.default.setContext(context);
    _SketchSharedStylesManager2.default.setContext(context);

    _ReactUpdates2.default.batchedUpdates(function () {
      var transaction = _ReactUpdates2.default.ReactReconcileTransaction.getPooled();

      transaction.perform(function () {
        _ReactReconciler2.default.mountComponent(component, transaction, // transaction
        id, // nativeParent
        { _idCounter: 0 }, // nativeContainerInfo
        {});

        if (callback) {
          callback(component.getPublicInstance());
        }
      });
      _ReactUpdates2.default.ReactReconcileTransaction.release(transaction);
    });
  }
};

exports.default = ReactSketchMount;