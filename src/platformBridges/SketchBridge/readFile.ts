import { readFileSync } from '@skpm/fs';

export default async function readFile(path: string): Promise<Buffer> {
  return Promise.resolve(readFileSync(path));
}
