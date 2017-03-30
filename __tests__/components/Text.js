import React from 'react';
import renderer from 'react-test-renderer';
import Text from '../../src/components/Text';

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
});
