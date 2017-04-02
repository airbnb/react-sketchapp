import React from 'react';
import { render } from 'react-sketchapp';
import fetch from 'sketch-module-fetch-polyfill';
import param from 'jquery-param';
import App from './App';

const onRun = (context) => {
  const latitude = '37.773972';
  const longitude = '-122.431297';
  const params = param({
    v: '20161016',
    ll: [latitude, longitude].join(','),
    query: 'coffee',
    limit: 5,
    intent: 'checkin',
    client_id: 'BCUJZ2MSKUWJC2Q5HVIYZLHRWGFJ2OFPKPLBP1NOBNR3VW5R',
    client_secret: 'Q10HUP5APBQOYNTPABSH4CSKRGEAI2CXIYULYGG0EZYUUWUZ',
  });

  fetch(`https://api.foursquare.com/v2/venues/search?${params}`)
    .then(res => res.json())
    .then((data) => {
      render(<App venues={data.response.venues} center={{ latitude, longitude }} />, context);
    });
};

module.exports = onRun;
