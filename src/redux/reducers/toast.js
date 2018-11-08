import { SHOW_TOAST, HIDE_TOAST } from '../actions/toast';

export default function setToast(state = { visible: false, msg: '' }, action) {
  switch (action.type) {
    case SHOW_TOAST:
      return {
        visible: true,
        msg: action.data,
      };
    case HIDE_TOAST:
      return {
        visible: false,
        msg: '',
      };
    default:
      return state;
  }
}
