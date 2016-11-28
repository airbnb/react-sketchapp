/* @flow */
import invariant from 'fbjs/lib/invariant';
import instantiateReactComponent from 'react/lib/instantiateReactComponent';
import ReactElement from 'react/lib/ReactElement';
import ReactInstanceHandles from 'react/lib/ReactInstanceHandles';
import ReactUpdates from 'react/lib/ReactUpdates';
import ReactReconciler from 'react/lib/ReactReconciler';
import DefaultInjection from './ReactSketchDefaultInjection';
import SketchCache from './SketchCache';
import StyleManager from './SketchSharedStylesManager';

DefaultInjection.inject();

const ReactSketchMount = {
  render(
    nextElement: React$Element<*>,
    context: any,
    callback?: () => void
  ): void {
    invariant(
      ReactElement.isValidElement(nextElement),
      'ReactSketch.render(): Invalid component element.%s',
      (
        typeof nextElement === 'function' ?
          ' Instead of passing a component class, make sure to instantiate ' +
          'it by passing it to React.createElement.' :
          // Check if it quacks like an element
          nextElement != null && nextElement.props !== undefined ?
          ' This may be caused by unintentionally loading two independent ' +
          'copies of React.' :
          ''
      )
    );

    const id = ReactInstanceHandles.createReactRootID(0);

    const component = instantiateReactComponent(nextElement);

    SketchCache.setContext(context);
    StyleManager.setContext(context);

    ReactUpdates.batchedUpdates(() => {
      const transaction = ReactUpdates.ReactReconcileTransaction.getPooled();

      transaction.perform(() => {
        ReactReconciler.mountComponent(
          component,
          transaction, // transaction
          id, // nativeParent
          { _idCounter: 0 }, // nativeContainerInfo
          {}, // context
        );

        if (callback) {
          callback(component.getPublicInstance());
        }
      });
      ReactUpdates.ReactReconcileTransaction.release(transaction);
    });
  },
};

export default ReactSketchMount;
