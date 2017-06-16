import React from 'react';
import { render } from 'react-sketchapp';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Document from './Document';

const initialState = {
  Haus: '#F3F4F4',
  Night: '#333',
  Sur: '#96DBE4',
  'Sur Dark': '#24828F',
  Peach: '#EFADA0',
  'Peach Dark': '#E37059',
  Pear: '#93DAAB',
  'Pear Dark': '#2E854B',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const store = createStore(reducer);

export default (context) => {
  render(
    <Provider store={store}>
      <Document />
    </Provider>,
    context.document.currentPage()
  );
};
