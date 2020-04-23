import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { Artboard } from '../../../src/components/Artboard';
import { StyleSheet } from '../../../src/stylesheet';

describe('<Artboard />', () => {
  it('renders children', () => {
    const tree = renderer.create(<Artboard>foo</Artboard>).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it.todo('flattens its stylesheet');

  describe('name', () => {
    it('passes its name', () => {
      const tree = renderer.create(<Artboard name="bar" />).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('defaults to Artboard', () => {
      const tree = renderer.create(<Artboard />).toJSON();

      expect(tree).toMatchSnapshot();
    });
  });

  describe('style', () => {
    const styles = StyleSheet.create({
      view: {
        flex: 1,
      },
    });

    it('accepts a plain object', () => {
      const tree = renderer.create(<Artboard style={{ flex: 1 }} />).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('accepts a StyleSheet ordinal', () => {
      const tree = renderer.create(<Artboard style={styles.view} />).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('accepts an array of plain objects and/or StyleSheet ordinals', () => {
      const tree = renderer.create(<Artboard style={[{ flexGrow: 1 }, styles.view]} />).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('accepts artboard viewport preset', () => {
      const tree = renderer
        .create(
          <Artboard
            style={{ flex: 1, width: 360, height: 1280 }}
            viewport={{
              name: 'Mobile',
              width: 360,
              height: 640,
            }}
          />,
        )
        .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
