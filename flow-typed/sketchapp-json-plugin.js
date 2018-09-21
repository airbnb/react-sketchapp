// @flow

declare module '@skpm/sketchapp-json-plugin' {
  declare var fromSJSONDictionary: (json: Object, version?: string) => any
  declare var appVersionSupported: () => bool
  declare var toSJSON: (nativeLayer: any) => string
}
