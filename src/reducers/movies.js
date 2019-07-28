import {
  GET_MOVIES_DATA,
  UNLOAD_MOVIES,
  GET_PAGE_NUM,
  GET_MOVIES_BY_QUERY,
  GET_MOVIE_ID,
  UNLOAD_SEARCHES,
} from '../constants/actionTypes';

const initState = {
  movieData: {},
  pageNum: 1,
  moviesByQuery: {},
  searchMovieId: '',
};

export default (state = initState, action) => {
  switch (action.type) {
    case GET_MOVIES_DATA:
      return {
        ...state,
        movieData: action.payload,
      };
    case GET_PAGE_NUM:
      return {
        ...state,
        pageNum: action.payload,
      };
    case GET_MOVIES_BY_QUERY:
      return {
        ...state,
        moviesByQuery: action.payload,
      };
    case GET_MOVIE_ID:
      return {
        ...state,
        searchMovieId: action.payload,
      };
    case UNLOAD_MOVIES:
      return {
        ...initState,
      };
    case UNLOAD_SEARCHES:
      return {
        ...state,
        moviesByQuery: {},
      };
    default:
      return state;
  }
};
