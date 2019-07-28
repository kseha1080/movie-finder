import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as reduxFormReducer } from 'redux-form';
import movies from './movies';
import async from './async';
import searchType from './searchType';

export default combineReducers({
  router: routerReducer,
  reduxForm: reduxFormReducer,
  async,
  movies,
  searchType,
});
