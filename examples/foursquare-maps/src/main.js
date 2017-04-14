import React from 'react';
import fetch from 'sketch-module-fetch-polyfill';
import { Artboard, render } from 'react-sketchapp';
import App from './App';
import getVenues from './getVenues';

export default (context) => {
  getVenues(fetch).then(({
    venues,
    latitude,
    longitude,
  }) => {
    render(<Artboard><App venues={venues} center={{ latitude, longitude }} /></Artboard>, context.document.currentPage());
  });
}
