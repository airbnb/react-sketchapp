import * as React from 'react';
import glamorous from 'glamorous-primitives';
import { render } from 'react-sketchapp';

const Container = glamorous.view({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const Image = glamorous.image({
  width: 400,
  height: 400,
});

const Description = glamorous.text({
  fontSize: 35,
  padding: 40,
  color: '#a4a4c1',
});

class App extends React.Component {
  render() {
    return (
      <Container>
        <Image
          source={{
            uri: 'https://github.com/paypal/glamorous/raw/master/other/logo/full.png',
          }}
        />
        <Description>Maintainable CSS with React</Description>
      </Container>
    );
  }
}

export default () => {
  render(<App />, context.document.currentPage());
};
