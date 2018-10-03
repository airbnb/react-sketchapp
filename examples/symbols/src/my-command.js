import * as React from 'react';
import { render, Artboard, Text, View, Image, makeSymbol } from 'react-sketchapp';

const RedSquare = () => (
  <View name="Square" style={{ width: 100, height: 100, backgroundColor: 'red' }}>
    <Text name="Red Square Text">Red Square</Text>
  </View>
);

const RedSquareSym = makeSymbol(RedSquare, 'squares/red');

const BlueSquare = () => (
  <View name="Square" style={{ width: 100, height: 100, backgroundColor: 'blue' }}>
    <Text name="Blue Square Text">Blue Square</Text>
  </View>
);

const BlueSquareSym = makeSymbol(BlueSquare, 'squares/blue');

const Photo = () => (
  <Image
    name="Photo"
    source="https://pbs.twimg.com/profile_images/895665264464764930/7Mb3QtEB_400x400.jpg"
    style={{ width: 100, height: 100 }}
  />
);

const PhotoSym = makeSymbol(Photo);

const Nested = () => (
  <View name="Multi" style={{ display: 'flex', flexDirection: 'column' }}>
    <PhotoSym name="Photo Instance" style={{ width: 75, height: 75 }} />
    <RedSquareSym name="Red Square Instance" style={{ width: 75, height: 75 }} />
  </View>
);

const NestedSym = makeSymbol(Nested);

export default () => {
  const Document = () => (
    <Artboard name="Swatches" style={{ display: 'flex' }}>
      <NestedSym
        name="Nested Symbol"
        overrides={{
          'Red Square Instance': BlueSquareSym,
          'Blue Square Text': 'TESTING',
          Photo: 'https://pbs.twimg.com/profile_images/833785170285178881/loBb32g3.jpg',
        }}
      />
    </Artboard>
  );

  render(<Document />, context.document.currentPage());
};
