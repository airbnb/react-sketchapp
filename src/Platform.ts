import getSketchVersion from './utils/getSketchVersion';

const Platform = {
  OS: 'sketch',
  Version: getSketchVersion(),
  select: (obj: { sketch: any }) => obj.sketch,
};

export default Platform;
