import * as React from 'react';
import * as renderer from 'react-test-renderer';
import Page from '../../../src/components/Page';

describe('<Page />', () => {
  it('renders children', () => {
    const tree = renderer
      .create(
        <Page>
          <foo>
            <bar />
          </foo>
        </Page>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  describe('name', () => {
    it('passes its name', () => {
      const tree = renderer.create(<Page name="bar" />).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('passes its name and avoids Symbol page conflict', () => {
      const tree = renderer.create(<Page name="Symbols" />).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('passes otherProps', () => {
      const tree = renderer.create(<Page propName="something" style={{}} />).toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
