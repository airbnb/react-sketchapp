// TODO: It would be better to move everything over to node-sketch-bridge
import { PlatformBridge } from '../types';

import { createStringMeasurer, findFontName } from 'node-sketch-bridge';
import fetch from 'node-fetch';
import { readFile as nodeReadFile } from 'fs';

const NodeMacOSBridge: PlatformBridge = {
  createStringMeasurer,
  findFontName,
  fetch: fetch as any, // call signatures are not perfectly identical, but we'll make do
  async readFile(path: string): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      nodeReadFile(path, (err, data) => (err ? reject(err) : resolve(data)));
    });
  },
};

export default NodeMacOSBridge;
