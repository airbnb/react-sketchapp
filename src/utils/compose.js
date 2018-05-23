// @flow
export default (...fs: Array<Function>): Function => (arg: mixed): mixed =>
  fs.reduceRight((a, f) => f(a), arg);
