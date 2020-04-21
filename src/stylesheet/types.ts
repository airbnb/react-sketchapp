export type Transform = { [key: string]: number }[];
export type Style = {
  resizeMode?: 'contain' | 'cover' | 'stretch' | 'center' | 'repeat' | 'none';
  height?: number | null;
  width?: number | null;
  transform?: Transform;
  [key: string]: unknown;
};
export type StyleId = number;
export type RawStyle = { [key: string]: any };
export type RawStyles = { [key: string]: RawStyle };
export type UserStyle = RawStyle | StyleId;
export type UserStyles = Array<UserStyle> | UserStyle;
export type Rules = { declarations: { [key: string]: RawStyle } };
export type StyleSheetInstance = { [key: string]: StyleId };
