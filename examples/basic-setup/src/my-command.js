import React from 'react';
import PropTypes from 'prop-types';
import { render, Artboard, Text, View, Image, makeSymbol, injectSymbols, makeSymbolByName } from 'react-sketchapp';
import chroma from 'chroma-js';

// take a hex and give us a nice text color to put over it
const textColor = (hex) => {
  const vsWhite = chroma.contrast(hex, 'white');
  if (vsWhite > 4) {
    return '#FFF';
  }
  return chroma(hex).darken(3).hex();
};

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
    <Text name="Swatch Name" style={{ color: textColor(hex), fontWeight: 'bold' }}>
      {name}
    </Text>
    <Text name="Swatch Hex" style={{ color: textColor(hex) }}>
      {hex}
    </Text>
  </View>
);

Swatch.defaultProps = {
  name: 'Name',
  hex: '#000'
}

Swatch.propTypes = Color;

const Color = {
  hex: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

// const ImageSym = makeSymbol(() =>
//   <Image
//     source="https://pbs.twimg.com/profile_images/763033229993574400/6frGyDyA_400x400.jpg"
//     name="myImage"
//     style={{ width: 100, height: 100 }}
//   />
// );
const ImageSym = makeSymbol(() =>
  <View style={{ widht: 100, height: 100 }}>
    myImage
  </View>
);

const OtherSymbol = makeSymbol(() =>
  <View
    name="A square"
    style={{
      height: 100,
      width: 100,
      backgroundColor: 'blue'
    }}
  >
    hi
  </View>
)

// const SwatchHaus = makeSymbolByName('Swatch Haus')

const NestedSymbolSymbol = makeSymbol(() =>
  <View
    style={{
      height: 104,
      width: 104,
    }}
  >
    <ImageSym name="A nested symbol" style={{ width: 100, height: 100 }} />
  </View>
)

const Document = ({ colors }) => (
  <Artboard
    name="Swatches"
    style={{
      flexDirection: 'row',
      flexWrap: 'wrap',
      width: (96 + 8) * 4,
    }}
  >
    {Object.keys(colors).map(color => <Swatch name={color} hex={colors[color]} key={color} />)}
    <NestedSymbolSymbol
      style={{ width: 104, height: 104 }}
      overrides={{
        'A nested symbol': OtherSymbol,
        hi: 'hello!'
      }}
    />
  </Artboard>
);

Document.propTypes = {
  colors: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default (context) => {
  injectSymbols(context);

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

  render(<Document colors={colorList} />, context.document.currentPage());
}
