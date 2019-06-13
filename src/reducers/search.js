import { SEARCH_MV } from "../constants/actionTypes";

const initState = {
  searchedMv: "",
  searchMvProgress: false
};

export default (state = initState, action) => {
  switch (action.type) {
    case SEARCH_MV:
      return {
        ...state,
        searchedMv: action.payload,
        searchMvProgress: false
      };
    default:
      return state;
  }
};
