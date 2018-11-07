/*
 * action 类型
 */

export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';

/*
 * action 创建函数
 */

export function increment() {
  return { type: INCREMENT };
}

export function decrement() {
  return { type: DECREMENT };
}
