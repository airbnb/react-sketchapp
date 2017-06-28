import React from 'react';
import { render, Artboard, Text, View, Image, makeSymbol, injectSymbols } from 'react-sketchapp';

const RedSquare = () => (
  <View name="Square" style={{ width: 100, height: 100, backgroundColor: 'red' }}>
    <Text name="Red Square Text">
      Red Square
    </Text>
  </View>
);
const BlueSquare = () => (
  <View name="Square" style={{ width: 100, height: 100, backgroundColor: 'blue' }}>
    <Text name="Blue Square Text">
      Blue Square
    </Text>
  </View>
);

const Photo = () => (
  <Image
    name="Photo"
    source="https://pbs.twimg.com/profile_images/756488692135526400/JUCawBiW_400x400.jpg"
    style={{ width: 100, height: 100 }}
  />
);

export default (context) => {

  const RedSquareSym = makeSymbol(RedSquare, context);

  const BlueSquareSym = makeSymbol(BlueSquare, context);

  const PhotoSym = makeSymbol(Photo, context);

  const Nested = () => (
    <View name="Multi" style={{ display: 'flex', flexDirection: 'column', width: 75, height: 150 }}>
      <PhotoSym name="Photo Instance" style={{ width: 75, height: 75 }} />
      <RedSquareSym name="Red Square Instance" style={{ width: 75, height: 75 }} />
    </View>
  );

  const NestedSym = makeSymbol(Nested, context);

  const Document = () => (
    <Artboard name="Swatches" style={{ display: 'flex' }}>
      <NestedSym
        name="Nested Symbol"
        style={{ width: 75, height: 150 }}
        overrides={{
          'Red Square Instance': BlueSquareSym,
          'Blue Square Text': 'TESTING',
          Photo: 'https://pbs.twimg.com/profile_images/833785170285178881/loBb32g3.jpg'
        }}
      />
    </Artboard>
  );

  injectSymbols(context);
  render(<Document />, context.document.currentPage());
};
