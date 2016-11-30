import CallbackQueue from 'react/lib/CallbackQueue';
import PooledClass from 'react/lib/PooledClass';
import Transaction from 'react/lib/Transaction';

const ON_RENDERER_READY_QUEUEING = {
  initialize() {
    this.reactMountReady.reset();
  },

  close() {
    this.reactMountReady.notifyAll();
  },
};

const TRANSACTION_WRAPPERS = [ON_RENDERER_READY_QUEUEING];

function ReactSketchReconcileTransaction() {
  this.reinitializeTransaction();
  this.reactMountReady = CallbackQueue.getPooled(null);
}

const Mixin = {
  getTransactionWrappers() {
    return TRANSACTION_WRAPPERS;
  },

  getReactMountReady() {
    return this.reactMountReady;
  },

  getUpdateQueue() {
    // this was missing and broke non-intrinsic components
  },

  destructor() {
    CallbackQueue.release(this.reactMountReady);
    this.reactMountReady = null;
  },
};

Object.assign(
  ReactSketchReconcileTransaction.prototype,
  Transaction.Mixin,
  Mixin,
);

PooledClass.addPoolingTo(ReactSketchReconcileTransaction);

export default ReactSketchReconcileTransaction;
