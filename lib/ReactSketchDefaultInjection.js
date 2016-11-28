'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ReactInjection = require('react/lib/ReactInjection');

var _ReactInjection2 = _interopRequireDefault(_ReactInjection);

var _ReactDefaultBatchingStrategy = require('react/lib/ReactDefaultBatchingStrategy');

var _ReactDefaultBatchingStrategy2 = _interopRequireDefault(_ReactDefaultBatchingStrategy);

var _ReactComponentEnvironment = require('react/lib/ReactComponentEnvironment');

var _ReactComponentEnvironment2 = _interopRequireDefault(_ReactComponentEnvironment);

var _ReactSketchComponent = require('./ReactSketchComponent');

var _ReactSketchComponent2 = _interopRequireDefault(_ReactSketchComponent);

var _ReactSketchReconcileTransaction = require('./ReactSketchReconcileTransaction');

var _ReactSketchReconcileTransaction2 = _interopRequireDefault(_ReactSketchReconcileTransaction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function inject() {
  (_ReactInjection2.default.NativeComponent || _ReactInjection2.default.HostComponent).injectGenericComponentClass(_ReactSketchComponent2.default);

  // TODO: injectTextComponentClass?
  // TODO: injectEmptyComponentFactory?

  _ReactInjection2.default.Updates.injectReconcileTransaction(_ReactSketchReconcileTransaction2.default);

  _ReactInjection2.default.Updates.injectBatchingStrategy(_ReactDefaultBatchingStrategy2.default);

  _ReactComponentEnvironment2.default.processChildrenUpdates = function () {
    return null;
  };
  _ReactComponentEnvironment2.default.replaceNodeWithMarkup = function () {
    return null;
  };
  _ReactComponentEnvironment2.default.unmountIDFromEnvironment = function () {
    return null;
  };
}
exports.default = {
  inject: inject
};