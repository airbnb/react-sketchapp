/* @flow */
import { omit } from 'ramda';
import invariant from 'invariant';
import ReactMultiChild from 'react/lib/ReactMultiChild';
import SketchCache from './SketchCache';
import StyleManager from './SketchSharedStylesManager';
import SketchElements from './SketchElements';
import createComponent from './createComponent';
import type { ReactReconcileTransaction, NativeParent, NativeContainerInfo, SketchNode } from './types';

let idCounter = 0;

/* TODO: root nodes aren't incrementing.
 * I have a feeling nativeParent._rootNodeID is the wrong key
 */
const ReactSketchComponentMixin = {
  construct(element: React$Element<*>) {
    this._currentElement = element;
  },

  getPublicInstance() {
    return SketchCache.get(this._rootNodeID);
  },

  mountComponent(
    transaction: ReactReconcileTransaction, // the one we made in render
    nativeParent: NativeParent,
    nativeContainerInfo: NativeContainerInfo, // idCounter: n
    context: Object, // standard-ass React Context. should be empty.
  ) {
    const id = idCounter++; // eslint-disable-line no-plusplus
    const parentId = typeof nativeParent === 'object' ? nativeParent._rootNodeID : nativeParent;
    const rootID = `${parentId}.${id}`;
    this._rootNodeID = rootID;

    const parent = SketchCache.getParent(rootID);

    const node = this.mountNode(
      parent,
      this._currentElement
    );

    SketchCache.add(rootID, node);

    this.mountChildren(
      this._currentElement.props.children,
      transaction,
      context
    );

    if (this._currentElement.type === 'group') {
      node.resizeToFitChildrenWithOption(1);
    }

    if (this._currentElement.type === 'text' && this._currentElement.props.makeTextStyle) {
      StyleManager.addTextStyle(node);
    }

    // if (isRootID(rootID)) {
    if (rootID === '.0.0') {
      SketchCache.render(node);
    }
  },

  // returns an MSLayerWhateverBS
  mountNode(parent: SketchNode, element: React$Element<*>) {
    const { props, type } = element;
    const options = omit(['children'], props);
    const el = SketchElements[type];

    invariant(!!element, 'You used a weirdo component');

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
  unmountComponent() {
    log('unmountComponent');
  },

  getNativeNode() {
    log('getNativeNode');
    return SketchCache.get(this._rootNodeID);
  },

  getHostNode() {
    log('getHostNode');
    return SketchCache.get(this._rootNodeID);
  },
};

export default createComponent('GenericComponent', ReactSketchComponentMixin, ReactMultiChild.Mixin);
