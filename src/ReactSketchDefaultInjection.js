/* @flow */
import ReactInjection from 'react/lib/ReactInjection';
import ReactDefaultBatchingStrategy from 'react/lib/ReactDefaultBatchingStrategy';
import ReactComponentEnvironment from 'react/lib/ReactComponentEnvironment';
import ReactSketchComponent from './ReactSketchComponent';
import ReactSketchReconcileTransaction from './ReactSketchReconcileTransaction';

function inject() {
  (ReactInjection.NativeComponent || ReactInjection.HostComponent).injectGenericComponentClass(
    ReactSketchComponent
  );

  // TODO: injectTextComponentClass?
  // TODO: injectEmptyComponentFactory?

  ReactInjection.Updates.injectReconcileTransaction(
    ReactSketchReconcileTransaction
  );

  ReactInjection.Updates.injectBatchingStrategy(
    ReactDefaultBatchingStrategy
  );

  ReactComponentEnvironment.processChildrenUpdates = () => null;
  ReactComponentEnvironment.replaceNodeWithMarkup = () => null;
  ReactComponentEnvironment.unmountIDFromEnvironment = () => null;
}

export default {
  inject,
};
