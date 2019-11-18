import * as React from 'react';
import * as renderer from 'react-test-renderer';
import Text from '../../../src/components/Text';
import StyleSheet from '../../../src/stylesheet';

describe('<Text />', () => {
  it('passes its children', () => {
    const tree = renderer.create(<Text>foo</Text>).toJSON();

    expect(tree).toMatchSnapshot();
  });

  describe('name', () => {
    it('passes its name', () => {
      const tree = renderer.create(<Text name="foo" />).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('defaults to Text', () => {
      const tree = renderer.create(<Text />).toJSON();

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
      const tree = renderer.create(<Text style={{ flex: 1 }} />).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('accepts a StyleSheet ordinal', () => {
      const tree = renderer.create(<Text style={styles.view} />).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('accepts an array of plain objects and/or StyleSheet ordinals', () => {
      const tree = renderer.create(<Text style={[{ flexGrow: 1 }, styles.view]} />).toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
