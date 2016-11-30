function createComponent(name: string, ...mixins) {
  function ReactSketchComponent(
    element: React$Element<*>,
  ) {
    this.node = null;
    this._mountImage = null;
    this._renderedChildren = null;
    this._currentElement = element; // React$Element
    this._rootNodeID = null; // NodeID
    this.construct(element);
  }

  ReactSketchComponent.displayName = name;

  Object.assign(ReactSketchComponent.prototype, ...mixins);

  return ReactSketchComponent;
}

export default createComponent;
