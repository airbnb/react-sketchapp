# Data Fetching

Pull real data from an API with `fetch` or GraphQL.

## Fetch

[Full example](https://github.com/airbnb/react-sketchapp/tree/master/examples/foursquare-maps)

First, add the [Sketch `fetch` polyfill](https://github.com/mathieudutour/sketch-module-fetch-polyfill) to your projects
```
npm install sketch-module-fetch-polyfill --save
```

```js
import fetch from 'sketch-module-fetch-polyfill'
import { render } from 'react-sketchapp';
import MyApp from './MyApp';

const onRun = (context) => {
  fetch('https://reqres.in/api/users')
  .then(res => res.json())
  .then(data => {
    render(<MyApp users={data.users} />, context);
  })
}
```

## GraphQl

[Full example](https://github.com/airbnb/react-sketchapp/tree/master/examples/profile-cards-graphql)

[`gql-sketch`](https://github.com/jongold/gql-sketch) provides a convenient interface for interacting with GraphQL APIs.

```
npm install gql-sketch --save
```

```js
import Client from 'gql-sketch';
import { render } from 'react-sketchapp';
import MyApp from './MyApp';

const onRun = (context) => {
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
      render(<MyApp films={allFilms} />, context);
    }
  )
}
```
