export const SHOW_TOAST = 'SHOW_TOAST';
export const HIDE_TOAST = 'HIDE_TOAST';

export const showToast = (msg) => {
  return {
    type: SHOW_TOAST,
    data: msg
  }
};

export const hideToast = (msg) => {
  return {
    type: HIDE_TOAST
  }
};
