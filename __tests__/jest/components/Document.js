import * as React from 'react';
import * as renderer from 'react-test-renderer';
import Document from '../../../src/components/Document';

describe('<Document />', () => {
  it('renders children', () => {
    const tree = renderer
      .create(
        <Document>
          <foo>
            <bar />
          </foo>
        </Document>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
