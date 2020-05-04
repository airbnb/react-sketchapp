import { getSketchVersion } from './utils/getSketchVersion';

export const Platform = {
  OS: 'sketch',
  Version: getSketchVersion(),
  select: (obj: { sketch: any }) => obj.sketch,
};
