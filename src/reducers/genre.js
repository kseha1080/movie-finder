import { GET_GENRE, GET_GENRE_DONE, FIND_BY_GENRE, FIND_BY_GENRE_DONE } from "../constants/actionTypes";

const initState = {
  getGenreInProgress: false,
  allGenre: {},
  foundByGenreInProgress: false,
  foundByGenre: [],
};

export default (state = initState, action) => {
  switch (action.type) {
    case GET_GENRE:
      return {
        ...state,
        getGenreInProgress: true
      };
    case GET_GENRE_DONE:
      return {
        ...state,
        getGenreInProgress: false,
        allGenre: action.payload
      };
    case FIND_BY_GENRE:
      return {
        ...state,
        foundByGenreInProgress: true
      };
    case FIND_BY_GENRE_DONE:
      return {
        ...state,
        foundByGenreInProgress: false,
        foundByGenre: action.payload
      };
    default:
      return state;
  }
};
