// This is the ugliest but it's kind of the only way to avoid bundling
// this module when using skpm (the other solution would be to add an `ignore` option
// in every client webpack config...)
let cached$; // cache nodobjc instance
export default function requireNodobjC() {
  if (cached$) {
    return cached$;
  }
  cached$ = eval("require('nodobjc')"); // eslint-disable-line
  cached$.framework('Foundation');
  cached$.framework('AppKit');
  cached$.framework('CoreGraphics');
  return cached$;
}
