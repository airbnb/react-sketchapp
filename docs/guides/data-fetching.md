# Data Fetching

Pull real data from an API with `fetch` or GraphQL.

## Fetch

[Full example](https://github.com/airbnb/react-sketchapp/tree/master/examples/foursquare-maps)

`skpm` automatically provides the [Sketch `fetch` polyfill](https://github.com/skpm/sketch-polyfill-fetch) — just use `fetch` as usual.

```js
import fetch from 'sketch-module-fetch-polyfill'
import { render } from 'react-sketchapp';
import MyApp from './MyApp';

export default (context) => {
  fetch('https://reqres.in/api/users')
  .then(res => res.json())
  .then(data => {
    render(<MyApp users={data.users} />, context.document.currentPage());
  });
}
```

## GraphQL

[Full example](https://github.com/airbnb/react-sketchapp/tree/master/examples/profile-cards-graphql)

[`gql-sketch`](https://github.com/jongold/gql-sketch) provides a convenient interface for interacting with GraphQL APIs.

```
npm install gql-sketch --save
```

```js
import Client from 'gql-sketch';
import { render } from 'react-sketchapp';
import MyApp from './MyApp';

export default (context) => {
  Client('http://example.com/my-graphql-endpoint').query(`
    {
      allFilms {
        films {
          title,
          actor,
          catchphrase
        }
      }
    }
  `).then(
    ({ allFilms }) => {
      render(<MyApp films={allFilms} />, context.document.currentPage());
    }
  );
}
```
