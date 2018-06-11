import * as React from 'react';
import * as sketch from 'sketch'; // eslint-disable-line
import { render, View, Artboard, Text } from '../../src';

// depending on where those tests run, we don't get the things,
// eg. the context might be empty or there is no selected document
// This make sure we always get something
function getDoc(context, document) {
  return context.document || (sketch.getSelectedDocument() || document).sketchObject;
}

const colorList = {
  Haus: '#F3F4F4',
  Night: '#333',
  Sur: '#96DBE4',
  'Sur Dark': '#24828F',
  Peach: '#EFADA0',
  'Peach Dark': '#E37059',
  Pear: '#93DAAB',
  'Pear Dark': '#2E854B',
};

test('should render a Page with a rectangle', (context, document) => {
  const nativePage = getDoc(context, document).currentPage();
  // eslint-disable-next-line
  const Swatch = ({ name, hex }) => (
    <View
      name={`Swatch ${name}`}
      style={{
        height: 96,
        width: 96,
        margin: 4,
        backgroundColor: hex,
        padding: 8,
      }}
    >
      <Text name="Swatch Name" style={{ color: '#000', fontWeight: 'bold' }}>
        {name}
      </Text>
      <Text name="Swatch Hex" style={{ color: '#000' }}>
        {hex}
      </Text>
    </View>
  );

  render(
    <Artboard
      name="Swatches"
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: (96 + 8) * 4,
      }}
    >
      {Object.keys(colorList).map(color => (
        <Swatch name={color} hex={colorList[color]} key={color} />
      ))}
    </Artboard>,
    nativePage,
  );

  const page = sketch.Page.fromNative(nativePage);
  expect(page.layers[0].name).toBe('Swatches');
});
