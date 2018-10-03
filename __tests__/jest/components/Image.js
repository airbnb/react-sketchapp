import * as React from 'react';
import * as renderer from 'react-test-renderer';
import Image from '../../../src/components/Image';
import StyleSheet from '../../../src/stylesheet';

describe('<Image />', () => {
  it('renders children', () => {
    const tree = renderer
      .create(
        <Image source="foo">
          <foo />
        </Image>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('flattens its stylesheet');

  describe('name', () => {
    it('passes its name', () => {
      const tree = renderer.create(<Image source="foo" name="bar" />).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('defaults to Image', () => {
      const tree = renderer.create(<Image source="foo" />).toJSON();

      expect(tree).toMatchSnapshot();
    });
  });

  describe('resizeMode', () => {
    it('translates contain', () => {
      const tree = renderer.create(<Image source="foo" resizeMode="contain" />).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('translates cover', () => {
      const tree = renderer.create(<Image source="foo" resizeMode="cover" />).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('translates stretch', () => {
      const tree = renderer.create(<Image source="foo" resizeMode="stretch" />).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('translates center', () => {
      const tree = renderer.create(<Image source="foo" resizeMode="center" />).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('translates repeat', () => {
      const tree = renderer.create(<Image source="foo" resizeMode="repeat" />).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('translates none', () => {
      const tree = renderer.create(<Image source="foo" resizeMode="none" />).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('falls back to cover', () => {
      const tree = renderer.create(<Image source="foo" />).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('prefers prop to style', () => {
      const tree = renderer
        .create(<Image source="foo" resizeMode="cover" style={{ resizeMode: 'contain' }} />)
        .toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('falls back to a resizeMode from style', () => {
      const tree = renderer
        .create(<Image source="foo" style={{ resizeMode: 'contain' }} />)
        .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });

  describe('source', () => {
    it('prefers source over defaultSource', () => {
      const tree = renderer.create(<Image source="foo" defaultSource="bar" />).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('falls back to defaultSource if available', () => {
      const tree = renderer.create(<Image defaultSource="foo" />).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('sets height from source', () => {
      const tree = renderer.create(<Image source={{ uri: 'foo', height: 500 }} />).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('sets width from source', () => {
      const tree = renderer.create(<Image source={{ uri: 'foo', width: 500 }} />).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('favors style over source for height', () => {
      const tree = renderer
        .create(<Image source={{ uri: 'foo', height: 500 }} style={{ height: 400, width: 300 }} />)
        .toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('favors style over source for width', () => {
      const tree = renderer
        .create(<Image source={{ uri: 'foo', width: 500 }} style={{ height: 400, width: 300 }} />)
        .toJSON();

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
      const tree = renderer.create(<Image style={{ flex: 1 }} />).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('accepts a StyleSheet ordinal', () => {
      const tree = renderer.create(<Image style={styles.view} />).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('accepts an array of plain objects and/or StyleSheet ordinals', () => {
      const tree = renderer.create(<Image style={[{ flexGrow: 1 }, styles.view]} />).toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
