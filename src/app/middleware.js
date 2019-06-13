import { ASYNC_START, ASYNC_END } from "../constants/actionTypes";

const promiseMiddleware = store => next => action => {
  if (isPromise(action.payload)) {
    store.dispatch({
      type: ASYNC_START,
      subtype: action.type,
      isProgress: true
    });

    action.payload.then(
      res => {
        action.status = 200;
        action.payload = res;

        store.dispatch({
          type: ASYNC_END,
          isProgress: false,
          error: false,
          status: action.status
        });
        store.dispatch(action);
      },
      error => {
        action.error = true;

        if (error.response) {
          action.status = error.response.status;
          action.payload = error.response.data;
        } else {
          action.status = 900;
          action.payload = error;
        }
        //get the error payload
        store.dispatch({
          type: ASYNC_END,
          isProgress: false,
          payload: action.payload,
          error: true,
          status: action.status
        });
        store.dispatch(action);
      }
    );

    return;
  }

  next(action);
};

function isPromise(v) {
  return v && typeof v.then === "function";
}

export { promiseMiddleware };
