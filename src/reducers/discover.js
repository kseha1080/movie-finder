import { DISCOVER_THEATER } from "../constants/actionTypes";

const initState = {
  discoveredTheater: {}
};

export default (state = initState, action) => {
  switch (action.type) {
    case DISCOVER_THEATER:
      return {
        ...state,
        discoveredTheater: action.payload,
        error: action.error? action.message : null
      };
    default:
      return state;
  }
};
