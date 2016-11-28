const { drawRectangle, drawOval, initialize, utils } = require('../src/shared');

// CocoaScript doesn't like strict equality checks.
const cocoaEqual = (a, b) => a == b; // eslint-disable-line

const onRun = (context) => {
  const { artboard, page } = initialize(context);

  const alert = COSAlertWindow.new();
  alert.setMessageText('Create a shape from props');
  alert.addButtonWithTitle('Ok');
  alert.addButtonWithTitle('Cancel');

  const viewWidth = 300;
  const viewHeight = 250;
  // const viewSpacer = 10;
  const view = NSView.alloc().initWithFrame(
    NSMakeRect(0, 0, viewWidth, viewHeight)
  );
  alert.addAccessoryView(view);

  const typeLabel = utils.createLabel(
    NSMakeRect(0, viewHeight - 20, viewWidth, 20),
    'Type'
  );
  view.addSubview(typeLabel);

  const typeTextField = NSTextField.alloc().initWithFrame(
    NSMakeRect(0, viewHeight - 40, viewWidth, 20)
  );
  typeTextField.setStringValue('Rect');
  view.addSubview(typeTextField);

  const propsLabel = utils.createLabel(
    NSMakeRect(0, viewHeight - 80, viewWidth, 20),
    'Props'
  );
  view.addSubview(propsLabel);

  const propsTextView = NSTextView.alloc().initWithFrame(
    NSMakeRect(0, viewHeight - 120, viewWidth, 40)
  );
  propsTextView.setAutomaticQuoteSubstitutionEnabled(false);
  propsTextView.setString(`{
    "name": "Test Layer",
    "x": 20,
    "y": 20,
    "width": 100,
    "height": 100,
    "radius": 2,
    "backgroundColor": "#01b0f0"
  }`);
  propsTextView.textStorage().setFont(NSFont.fontWithName_size('Menlo', 11));

  view.addSubview(propsTextView);

  const response = alert.runModal();

  if (cocoaEqual(response, 1000)) {
    const rawProps = propsTextView.string();
    const props = JSON.parse(rawProps);
    const type = typeTextField.stringValue();

    let layer;

    if (cocoaEqual(type, 'Rect')) {
      layer = drawRectangle(props);
    }

    if (cocoaEqual(type, 'Oval')) {
      layer = drawOval(props);
    }

    if (layer) {
      if (artboard) {
        artboard.addLayers([layer]);
      } else {
        page.addLayers([layer]);
      }

      layer.setIsSelected(true);
    }
  }
};

module.exports = onRun;
