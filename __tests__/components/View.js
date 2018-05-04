import React from 'react';
import renderer from 'react-test-renderer';
import View from '../../src/components/View';
import StyleSheet from '../../src/stylesheet';

describe('<View />', () => {
  it('passes its children', () => {
    const tree = renderer.create(<View>foo</View>).toJSON();

    expect(tree).toMatchSnapshot();
  });

  describe('name', () => {
    it('passes its name', () => {
      const tree = renderer.create(<View name="foo" />).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('defaults to View', () => {
      const tree = renderer.create(<View />).toJSON();

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
      const tree = renderer.create(<View style={{ flex: 1 }} />).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('accepts a StyleSheet ordinal', () => {
      const tree = renderer.create(<View style={styles.view} />).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('accepts an array of plain objects and/or StyleSheet ordinals', () => {
      const tree = renderer.create(<View style={[{ flexGrow: 1 }, styles.view]} />).toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
