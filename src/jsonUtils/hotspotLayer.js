// @flow
import type { SJObjectId } from 'sketchapp-json-flow-types';

import { generateID } from './models';

type SJFlow = {
  _class: 'MSImmutableFlowConnection',
  animationType: number,
  destinationArtboardID?: SJObjectId | 'back',
};

const animationTypes = {
  none: -1,
  slideFromRight: 0,
  slideFromLeft: 1,
  slideFromBottom: 2,
  slideFromTop: 3,
};

const BackTarget = 'back';

const getArtboard = target => {
  if (target === BackTarget) {
    return BackTarget;
  }
  return generateID(`artboard:${target}`, true);
};

const hotspotLayer = ({
  targetId,
  target,
  animationType,
}: {
  targetId?: string,
  target?: string,
  animationType?: string,
}): { flow: SJFlow } => ({
  flow: {
    _class: 'MSImmutableFlowConnection',
    animationType: (animationType && animationTypes[animationType]) || -1,
    destinationArtboardID: target ? getArtboard(target) : targetId,
  },
});

export default hotspotLayer;
