import { GET_SEARCH_TYPE } from '../constants/actionTypes';

const initState = {
  searchType: '',
};

export default (state = initState, action) => {
  switch (action.type) {
    case GET_SEARCH_TYPE:
      return {
        ...state,
        searchType: action.payload,
      };
    default:
      return state;
  }
};
