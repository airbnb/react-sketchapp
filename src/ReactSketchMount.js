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

const invalidComponentError = (element) => {
  if (typeof element === 'function') {
    return ' Instead of passing a component class, make sure to instantiate ' +
    'it by passing it to React.createElement.';
  }
  if (element != null && element.props !== undefined) {
    return ' This may be caused by unintentionally loading two independent ' +
    'copies of React.';
  }
  return '';
};

type SketchContext = any;

const ReactSketchMount = {
  render(
    nextElement: React$Element<any>,
    context: SketchContext,
    callback?: ?(() => void),
  ): React$Component<any, any, any> {
    invariant(
      ReactElement.isValidElement(nextElement),
      'ReactSketch.render(): Invalid component element.%s',
      invalidComponentError(nextElement)
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

    return component;
  },
};

export default ReactSketchMount;
