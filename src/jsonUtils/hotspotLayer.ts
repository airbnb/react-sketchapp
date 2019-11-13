import FileFormat from '@sketch-hq/sketch-file-format-ts';

import { generateID } from './models';

const animationTypes = {
  none: -1,
  slideFromRight: 0,
  slideFromLeft: 1,
  slideFromBottom: 2,
  slideFromTop: 3,
};

const BackTarget = 'back';

const getArtboard = (target: string) => {
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
  targetId?: string;
  target?: string;
  animationType?: string;
}): { flow: FileFormat.FlowConnection } => ({
  flow: {
    _class: 'MSImmutableFlowConnection',
    animationType: (animationType && animationTypes[animationType]) || -1,
    destinationArtboardID: target ? getArtboard(target) : targetId,
  },
});

export default hotspotLayer;
