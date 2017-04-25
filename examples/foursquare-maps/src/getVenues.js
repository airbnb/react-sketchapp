import param from 'jquery-param';

export default () => {
  const query = 'burger';
  const latitude = '37.773972';
  const longitude = '-122.431297';

  const params = param({
    v: '20161016',
    ll: [latitude, longitude].join(','),
    query,
    limit: 15,
    intent: 'checkin',
    client_id: 'BCUJZ2MSKUWJC2Q5HVIYZLHRWGFJ2OFPKPLBP1NOBNR3VW5R',
    client_secret: 'Q10HUP5APBQOYNTPABSH4CSKRGEAI2CXIYULYGG0EZYUUWUZ',
  });

  return fetch(`https://api.foursquare.com/v2/venues/search?${params}`)
    .then(res => res.json())
    .then(data => ({
      venues: data.response.venues,
      latitude,
      longitude,
      query,
    }));
};
