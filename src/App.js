import React from 'react';
import './App.css';

import Header from './components/Header/Header';
import BottomNav from './components/BottomNav/BottomNav';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Container } from '@material-ui/core';
// pages
import Trending from './pages/Trending/Trending';
import Movies from './pages/Movies/Movies';
import Series from './pages/Series/Series';
import Search from './pages/Search/Search';

function App() {
  return (
    <BrowserRouter>
      <Header />
        <div className="app">
          <Container> 
            <Switch>
              <Route path="/" component={Trending} exact />
              <Route path="/movies" component={Movies} />
              <Route path="/series" component={Series} />
              <Route path="/search" component={Search} />
            </Switch>
          </Container>
        </div>
      <BottomNav />
    </BrowserRouter>
  );
}

export default App;
