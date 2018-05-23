// @flow
export type Transform = Array<Object>;
export type Style = Object;
export type StyleId = number;
export type RawStyle = Object;
export type RawStyles = { [string]: RawStyle };
export type UserStyle = RawStyles | StyleId;
export type UserStyles = Array<UserStyle> | UserStyle;
export type Rules = { declarations: { [string]: RawStyle } };
export type StyleSheetInstance = { [string]: StyleId };
