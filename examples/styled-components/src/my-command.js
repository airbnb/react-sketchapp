import React from 'react';
import PropTypes from 'prop-types';
import 'react-primitives';
import styled from 'styled-components/primitives';
import { render } from 'react-sketchapp';
import chroma from 'chroma-js';

// take a hex and give us a nice text color to put over it
const textColor = (hex) => {
  const vsWhite = chroma.contrast(hex, 'white');
  if (vsWhite > 4) {
    return '#FFF';
  }
  return chroma(hex).darken(3).hex();
};

const SwatchTile = styled.View`
  height: 96px;
  width: 96px;
  margin: 4px;
  background-color: ${props => props.hex};
  padding: 8px;
`;

const SwatchName = styled.Text`
  color: ${props => textColor(props.hex)};
  font-weight: 'bold';
`;

const SwatchHex = styled.Text`
  color: ${props => textColor(props.hex)};
`;

const Swatch = ({ name, hex }) => (
  <SwatchTile name={`Swatch ${name}`} hex={hex}>
    <SwatchName name="Swatch Name" hex={hex}>
      {name}
    </SwatchName>
    <SwatchHex name="Swatch Hex" hex={hex}>
      {hex}
    </SwatchHex>
  </SwatchTile>
);

const Color = {
  hex: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

Swatch.propTypes = Color;

const Artboard = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  width: ${(96 + 8) * 4}px;
`;

const Document = ({ colors }) => (
  <Artboard name="Swatches">
    {Object.keys(colors).map(color => <Swatch name={color} hex={colors[color]} key={color} />)}
  </Artboard>
);

Document.propTypes = {
  colors: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default (context) => {
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
};
