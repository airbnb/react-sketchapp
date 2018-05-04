import React from 'react';
import renderer from 'react-test-renderer';
import RedBox from '../../src/components/RedBox';

describe('<RedBox />', () => {
  it.skip('renders simple errors', () => {
    const tree = renderer.create(<RedBox error={new Error('THIS IS AN ERROR')} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders string errors', () => {
    const tree = renderer.create(<RedBox error="String only error" />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
