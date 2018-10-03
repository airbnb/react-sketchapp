import * as React from 'react';
import { render, Artboard, Text, View } from 'react-sketchapp';
import chroma from 'chroma-js';

// take a hex and give us a nice text color to put over it
const textColor = (hex: string) => {
  const vsWhite = chroma.contrast(hex, 'white');
  if (vsWhite > 4) {
    return '#FFF';
  }
  return chroma(hex)
    .darken(3)
    .hex();
};

interface SwatchProps {
  name: string,
  hex: string,
}

const Swatch = ({ name, hex }: SwatchProps) => (
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
    <Text
      name="Swatch Name"
      style={{ color: textColor(hex), fontWeight: 'bold' }}
    >
      {name}
    </Text>
    <Text name="Swatch Hex" style={{ color: textColor(hex) }}>
      {hex}
    </Text>
  </View>
);

interface DocumentProps {
  colors: { [key: string]: string }
}
const Document = ({ colors }: DocumentProps) => (
  <Artboard
    name="Swatches"
    style={{
      flexDirection: 'row',
      flexWrap: 'wrap',
      width: (96 + 8) * 4,
    }}
  >
    {Object.keys(colors).map(color => (
      <Swatch name={color} hex={colors[color]} key={color} />
    ))}
  </Artboard>
);


export default () => {
  const colorList = {
    Haus: '#F3F4F4',
    Night: '#333',
    Sur: '#96DBE4',
    'Sur Dark': '#24828F',
    Peach: '#EFADA0',
    'Peach Dark': '#E37059',
    Pear: '#93DAAB',
    'Pear Dark': '#2E854B',
    'TypeScript Blue': '#007ACC',
  };

  render(<Document colors={colorList} />, context.document.currentPage());
};
