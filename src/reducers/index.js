import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { reducer as reduxFormReducer } from "redux-form";
import search from "./search";
import discover from './discover';
import genre from './genre';

export default combineReducers({
  router: routerReducer,
  reduxForm: reduxFormReducer,
  search,
  discover,
  genre,
});
