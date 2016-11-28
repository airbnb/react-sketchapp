/* @flow */

declare module 'fbjs/lib/invariant' {
  declare var exports: (
    condition: boolean,
    format: string,
    a: any,
    b: any,
    c: any,
    d: any,
    e: any,
    f: any
  ) => void;
}

declare module 'fbjs/lib/warning' {
  declare var exports: (
    condition: boolean,
    format: string,
    ...args?: Array<any>
  ) => void;
}
