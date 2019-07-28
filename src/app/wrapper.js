import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router-dom';
import { history } from './history';
import App from './app';

const Wrapper = ({ store }) => (
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' name='App' component={App} />
    </Router>
  </Provider>
);

export default Wrapper;
