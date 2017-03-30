import React from 'react';
import renderer from 'react-test-renderer';
import Artboard from '../../src/components/Artboard';

describe('<Artboard />', () => {
  it('renders children', () => {
    const tree = renderer.create(<Artboard><foo><bar /></foo></Artboard>).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('flattens its stylesheet');

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
});
