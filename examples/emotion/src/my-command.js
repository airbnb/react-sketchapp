import React from 'react';
import emotion from 'emotion-primitives';
import { render } from 'react-sketchapp';

const Container = emotion.View`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 50px;
  border: 5px solid red;
  background-color: ${(props) => props.theme.backgroundColor}
`;

const Description = emotion.Text`
  color: hotpink;
`;

const Image = emotion.Image`
  padding: 40px;
`;

const emotionLogo = 'https://avatars3.githubusercontent.com/u/31557565?s=400&v=4';

class App extends React.Component {
  render() {
    return (
      <Container borderRadius="10px">
        <Description fontSize={45} fontWeight="bold">
          Emotion Primitives
        </Description>
        <Image
          source={{
            uri: emotionLogo,
            height: 150,
            width: 150,
          }}
        />
      </Container>
    );
  }
}

export default () => {
  render(<App />, context.document.currentPage());
};
