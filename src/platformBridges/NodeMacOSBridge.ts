import { PlatformBridge } from '../types';
import weakRequire from '../utils/weakRequire';

const { createStringMeasurer, findFontName } = weakRequire(module, 'node-sketch-bridge');
const fetch = weakRequire(module, 'node-fetch');
const { readFile: nodeReadFile } = weakRequire(module, 'fs');

const NodeMacOSBridge: PlatformBridge = {
  createStringMeasurer,
  findFontName,
  fetch,
  async readFile(path: string): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      nodeReadFile(path, (err, data) => (err ? reject(err) : resolve(data)));
    });
  },
};

export default NodeMacOSBridge;
