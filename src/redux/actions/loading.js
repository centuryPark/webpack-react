/*
 * action 类型
 */

export const SHOW_LOADING = 'SHOW_LOADING';
export const HIDE_LOADING = 'HIDE_LOADING';

/*
 * action 创建函数
 */

export function show() {
  return { type: SHOW_LOADING };
}

export function hide() {
  return { type: HIDE_LOADING };
}
