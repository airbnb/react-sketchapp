export type Transform = Array<Object>;
export type Style = {
  resizeMode?: 'contain' | 'cover' | 'stretch' | 'center' | 'repeat' | 'none';
  height?: number;
  width?: number;
};
export type StyleId = number;
export type RawStyle = Object;
export type RawStyles = { [key: string]: RawStyle };
export type UserStyle = RawStyles | StyleId;
export type UserStyles = Array<UserStyle> | UserStyle;
export type Rules = { declarations: { [key: string]: RawStyle } };
export type StyleSheetInstance = { [key: string]: StyleId };
