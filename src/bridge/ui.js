/* @flow */

// eslint-disable-next-line import/prefer-default-export
export const createLabel = (frame: any, text: string): any => {
  const label = NSTextField.alloc().initWithFrame(frame);
  label.setStringValue(text);
  label.setSelectable(false);
  label.setEditable(false);
  label.setBezeled(false);
  label.setDrawsBackground(false);
  return label;
};
