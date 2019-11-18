// This is the ugliest but it's kind of the only way to avoid bundling
// this module when using skpm (the other solution would be to add an `ignore` option
// in every client webpack config...)
let cached$: any; // cache nodobjc instance
export default function requireObjCBridge() {
  if (cached$) {
    return cached$;
  }
  cached$ = eval("require('node-sketch-bridge')"); // eslint-disable-line
  return cached$;
}
