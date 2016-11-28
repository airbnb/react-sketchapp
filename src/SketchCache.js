/* @flow */
import { compose, dissoc, equals, init, join, length, match, split } from 'ramda';
import { initialize } from './shared';
import type { Dictionary, NodeID, SketchNode } from './types';

export const isRootID = compose(
  equals(1),
  length,
  match(/0/g)
);

// toParentID :: NodeID -> NodeID
const dropLastIDPortion = compose(
  join('.'),
  init,
  split('.')
);

class SketchCache {
  context: any;
  nodes: Dictionary<string, SketchNode>;
  artboard: SketchNode;
  page: SketchNode;

  constructor() {
    this.context = null;
    this.nodes = {};
  }

  setContext(context: any): any {
    const { artboard, page } = initialize(context);
    this.context = context;
    this.artboard = artboard;
    this.page = page;
    return context;
  }

  render(node: SketchNode) {
    this.page.addLayers([
      node,
    ]);
  }

  add(id: NodeID, node: SketchNode): SketchNode {
    this.nodes[id] = node;
    return node;
  }

  get(id: NodeID): SketchNode {
    return this.nodes[id];
  }

  getParent(id: NodeID): SketchNode {
    if (isRootID(id)) {
      return this.page;
    }
    return this.get(dropLastIDPortion(id));
  }

  drop(id: NodeID): void {
    this.nodes = dissoc(id, this.nodes);
  }
}

export default new SketchCache();
