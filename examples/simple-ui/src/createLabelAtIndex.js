/* globals NSTextField, NSMakeRect, NSColor */
export default (text, index = 0) => {
  const y = 30 * index;
  const label = NSTextField.alloc().initWithFrame(
    NSMakeRect(0, y, 75, 0),
  );
  label.backgroundColor = NSColor.clearColor();
  label.bordered = false;
  label.selectable = false;
  label.stringValue = text;
  label.sizeToFit();
  return label;
};
