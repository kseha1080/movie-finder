import { ASYNC_START, ASYNC_END } from '../constants/actionTypes';

export const promiseMiddleware = store => next => action => {
  // Validate if payload is function
  if (isPromise(action.payload)) {
    store.dispatch({
      type: ASYNC_START,
      subtype: action.type,
      inProgress: true,
    });
    action.payload.then(
      // Dispatch res to corresponding action
      res => {
        action.status = 200;
        action.payload = res;
        store.dispatch({
          type: ASYNC_END,
          inProgress: false,
          error: false,
          status: action.status,
        });
        store.dispatch(action);
      },
      // catch error and dipatch to action payload
      error => {
        action.error = true;
        if (error.response) {
          action.status = error.response.status;
          action.payload = error.response.data;
        } else {
          action.status = 900;
          action.payload = error;
        }
        store.dispatch({
          type: ASYNC_END,
          inProgress: false,
          payload: action.payload,
          error: true,
          status: action.status,
        });
        store.dispatch(action);
      },
    );
    return;
  }
  next(action);
};

const isPromise = v => {
  return v && typeof v.then === 'function';
};
