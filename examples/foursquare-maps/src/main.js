import 'sketch-module-fetch-polyfill';
import React from 'react';
import { Artboard, render } from 'react-sketchapp';
import App from './App';
import getVenues from './getVenues';

const onRun = (context) => {
  getVenues().then(({
    venues,
    latitude,
    longitude,
  }) => {
    render(<Artboard><App venues={venues} center={{ latitude, longitude }} /></Artboard>, context);
  });
};

module.exports = onRun;
