/* globals NSTextField, NSMakeRect, NSColor */

export default (index = 0, lines = 1) => {
  const y = (30 * index) - ((lines - 1) * 24);
  const textField = NSTextField.alloc().initWithFrame(
    NSMakeRect(75, y, 350, 24 * lines),
  );

  textField.cell().setWraps(false);
  textField.cell().setScrollable(true);
  textField.cell().setUsesSingleLineMode(true);

  return textField;
};
