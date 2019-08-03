import React from 'react';
import {
  BrowserRouter,
  Route,
  Link } from 'react-router-dom';
// import Router from 'react-router-dom';
// const BrowserRouter = Router.BrowserRouter;
import Home from './Home';
import About from './About';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Link to="/profile/1">ver usuario 1</Link>
        <Link to="/profile/2">ver usuario 2</Link>
        <Link to="/profile/3">ver usuario 3</Link>

        <Route exact path="/" component={Home} />
        <Route path="/profile/:id" component={About} />
        <Route path="/movies/:category" component={Category} />
      </div>

    </BrowserRouter>
  );
}

export default App;
