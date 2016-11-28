// Useful things
export type Dictionary<K, T> = {[key: K]: T};

// Sketchy things
export type SketchNode = any;
export type NodeID = string;


// Reacty things
export type ReactReconcileTransaction = any;

export type NativeParent =
  NodeID
  | { _rootNodeID: NodeID }


export type NativeContainerInfo = {
  idCounter: number,
};
