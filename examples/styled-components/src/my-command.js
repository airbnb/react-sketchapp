import * as React from 'react';
import * as PropTypes from 'prop-types';
import styled from 'styled-components/primitives';
import { render } from 'react-sketchapp';
import chroma from 'chroma-js';

// take a hex and give us a nice text color to put over it
const textColor = (hex) => {
  const vsWhite = chroma.contrast(hex, 'white');
  if (vsWhite > 4) {
    return '#FFF';
  }
  return chroma(hex)
    .darken(3)
    .hex();
};

const SwatchTile = styled.View`
  height: 250px;
  width: 250px;
  border-radius: 4px;
  margin: 4px;
  background-color: ${props => props.hex};
  justify-content: center;
  align-items: center;
`;

const SwatchName = styled.Text`
  color: ${props => textColor(props.hex)};
  font-weight: bold;
`;

const Ampersand = styled.Text`
  color: #f3f3f3;
  font-size: 120px;
  font-family: Himalaya;
  line-height: 144px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-family: 'GT America';
  font-weight: bold;
  padding: 4px;
`;

const Swatch = ({ name, hex }) => (
  <SwatchTile name={`Swatch ${name}`} hex={hex}>
    <SwatchName name="Swatch Name" hex={hex}>
      {name}
    </SwatchName>
    <Ampersand hex={hex}>&</Ampersand>
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
  justify-content: center;
`;

const Document = ({ colors }) => (
  <Artboard name="Swatches">
    <Title>Max’s Sweaters</Title>
    {Object.keys(colors).map(color => <Swatch name={color} hex={colors[color]} key={color} />)}
  </Artboard>
);

Document.propTypes = {
  colors: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default () => {
  const colorList = {
    Classic: '#96324E',
    Neue: '#21304E',
  };

  render(<Document colors={colorList} />, context.document.currentPage());
};
