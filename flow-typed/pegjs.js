// @flow

declare module 'pegjs' {
  declare var generate: (
    template: string,
  ) => {
    parse: (s: string) => any,
  };
}
