import React from 'react';
import { SketchRouter, Switch, Route } from 'react-sketchapp-router';

import Home from './routes/home';
import About from './routes/about';
import Post from './routes/post';
import Profile from './routes/profile';

const App = () => (
  <SketchRouter
    locations={['/profile/john', '/post/1']}
    viewport={{ name: 'Mobile', width: 360, height: 640 }}
  >
    {/* (Need to have menus/sidebars inside of a Route) */}
    <Switch>
      <Route path="/" exact render={({ location }) => <Home />} />
      <Route path="/about" render={() => <About />} />
      <Route path="/post/:id" render={({ match: { params } }) => <Post {...params} />} />
      <Route path="/profile/:user" render={({ match: { params } }) => <Profile {...params} />} />
      {/* <Route render={() => <NotFound />} /> */}
    </Switch>
  </SketchRouter>
);

export default App;
