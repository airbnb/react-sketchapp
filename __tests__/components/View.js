import React from 'react';
import renderer from 'react-test-renderer';
import View from '../../src/components/View';

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
});
