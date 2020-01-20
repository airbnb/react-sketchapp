import * as React from 'react';
import * as sketch from 'sketch';
import { render, View, Text } from '../../lib';

// depending on where those tests run, we don't get the things,
// eg. the context might be empty or there is no selected document
// This make sure we always get something
function getDoc(document) {
  return sketch.getSelectedDocument() || document;
}

test('should render a Page with context events', (context, document) => {
  const { selectedPage } = getDoc(document);
  const Swatch = ({ hex }) => {
    const [count, setCount] = React.useState(0);

    React.useEffect(() => {
      setCount(10);
    }, [count]);

    return (
      <View
        name={`Count is ${count}`}
        style={{
          height: 96,
          width: 96,
          margin: 4,
          backgroundColor: hex,
          padding: 8,
        }}
      >
        <Text name="Swatch Name" style={{ color: '#000', fontWeight: 'bold' }}>
          Count is {count}
        </Text>
      </View>
    );
  };

  render(<Swatch hex="#F3F4F4" />, selectedPage);

  expect(selectedPage.layers[0].name).toBe('Count is 10');
});
