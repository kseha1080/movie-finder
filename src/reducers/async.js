import { ASYNC_START, ASYNC_END } from '../constants/actionTypes';

const initState = {
  apiStatus: {
    error: false,
    inProgress: false,
    status: null,
  },
};

export default (state = initState, action) => {
  switch (action.type) {
    case ASYNC_START:
      return {
        ...state,
        apiStatus: action,
        inProgress: action.inProgress,
      };
    case ASYNC_END:
      return {
        ...state,
        apiStatus: action,
        inProgress: action.inProgress,
      };
    default:
      return state;
  }
};
