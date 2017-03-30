import React from 'react';
import invariant from 'invariant';
import renderer from 'react-test-renderer';
import RedBox from '../../src/components/RedBox';

describe('<RedBox />', () => {
  it('renders simple errors', () => {
    try {
      invariant(false, 'THIS IS AN ERROR');
    } catch (e) {
      const tree = renderer.create(<RedBox error={e} />).toJSON();

      expect(tree).toMatchSnapshot();
    }
  });
});
