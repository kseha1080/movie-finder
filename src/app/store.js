import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import { routerMiddleware } from 'react-router-redux';
import { history } from './history';
import { promiseMiddleware } from './middleware';
// import thunk from "redux-thunk";
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

const appRouterMiddleware = routerMiddleware(history);

const getMiddleware = () => {
  if (process.env.NODE_ENV === 'production') {
    return applyMiddleware(appRouterMiddleware, promiseMiddleware);
  } else {
    // Enable redux-logger on non-production environments
    return applyMiddleware(
      appRouterMiddleware,
      promiseMiddleware,
      createLogger(),
    );
  }
};

export const store = createStore(
  rootReducer,
  composeWithDevTools(getMiddleware()),
);
