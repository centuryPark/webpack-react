import { SET_MOVIES_LIST } from '../actions/moviesList';

export default function setMoviesList(state = [], action) {
  switch (action.type) {
    case SET_MOVIES_LIST:
      return [...action.data];
    default:
      return state;
  }
}
