/* @flow */

declare module 'sketchapp-json-plugin' {
  declare var fromSJSONDictionary: (json: Object) => any
  declare var appVersionSupported: () => bool
  declare var toSJSON: (nativeLayer: any) => string
}
