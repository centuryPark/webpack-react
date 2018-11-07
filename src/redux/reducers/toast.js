import {SHOW_TOAST, HIDE_TOAST} from '../actions/toast';

export default function setToast(state = {show: false, msg: ''}, action) {
  switch (action.type) {
    case SHOW_TOAST:
      return {
        show: true,
        msg: action.data
      };
    case HIDE_TOAST:
      return {
        show: false,
        msg: ''
      };
    default:
      return state;
  }
}
