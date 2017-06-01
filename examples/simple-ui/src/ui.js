/* globals NSAlert, NSAlertFirstButtonReturn */
import createLabelAtIndex from './createLabelAtIndex';
import createInputAtIndex from './createTextFieldAtIndex';

const defaultColors = {
  Night: '#333',
  Sur: '#96DBE4',
  Peach: '#EFADA0',
  Pear: '#93DAAB',
};

export default (cb) => {
  const LABEL_WIDTH = 75;
  const INPUT_WIDTH = 350;
  const alert = NSAlert.alloc().init();

  const swatchSizeInput = createInputAtIndex(1);
  swatchSizeInput.intValue = 96;

  const colorInput = createInputAtIndex(0, 3);
  colorInput.stringValue = JSON.stringify(defaultColors);
  colorInput.maximumNumberOfLines = 3;

  const accessoryView = NSView.alloc().initWithFrame(
    NSMakeRect(0, 0, LABEL_WIDTH + INPUT_WIDTH, 60)
  );

  accessoryView.addSubview(createLabelAtIndex('Swatch Size', 1));
  accessoryView.addSubview(swatchSizeInput);
  accessoryView.addSubview(createLabelAtIndex('Colors', 0));
  accessoryView.addSubview(colorInput);

  swatchSizeInput.setNextResponder(colorInput);

  alert.setMessageText('Let’s make some swatches!');
  alert.addButtonWithTitle('Do it!');
  alert.addButtonWithTitle('Cancel');
  alert.setAccessoryView(accessoryView);
  alert.window().setInitialFirstResponder(swatchSizeInput);
  alert.window().setAutorecalculatesKeyViewLoop(true);

  const button = alert.runModal();

  if (button === NSAlertFirstButtonReturn) {
    cb({
      swatchSize: swatchSizeInput.intValue(),
      colorList: JSON.parse(colorInput.stringValue()),
    });
  }
};
