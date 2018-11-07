import { SHOW_LOADING, HIDE_LOADING } from '../actions/loading';

export default function counter(state = false, action) {
  switch (action.type) {
    case SHOW_LOADING:
      return true;
    case HIDE_LOADING:
      return false;
    default:
      return false;
  }
}
