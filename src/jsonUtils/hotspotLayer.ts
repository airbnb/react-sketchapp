import { FileFormat1 as FileFormat } from '@sketch-hq/sketch-file-format-ts';

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

export const hotspotLayer = ({
  targetId,
  target,
  animationType,
}: {
  targetId?: string;
  target?: string;
  animationType?: 'none' | 'slideFromRight' | 'slideFromLeft' | 'slideFromBottom' | 'slideFromTop';
}): { flow: FileFormat.FlowConnection } => ({
  flow: {
    _class: 'MSImmutableFlowConnection',
    animationType: (animationType && animationTypes[animationType]) || -1,
    destinationArtboardID: target ? getArtboard(target) : targetId || 'broken',
  },
});
