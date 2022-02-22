import { Callback, Node } from './types';
import { LinkedList } from './LinkedList';

/**
 * @function isNull
 * @description 是否为空值
 * @param value 需要验证的值
 */
export function isNull(value: any): value is null {
  return value === null;
}

/**
 * @function normalizeIndex
 * @description 标准化开始索引
 * @param length 双链表长度
 * @param fromIndex 开始索引
 */
export function normalizeIndex(length: number, fromIndex: number = 0): number {
  return fromIndex < 0 ? Math.max(0, length + fromIndex) : fromIndex;
}

/**
 * @function search
 * @description 根据指定回调搜索双链表
 * @param source 双链表
 * @param callback 回调函数
 * @param reverse 是否逆向搜索
 * @param context 回调函数上下文
 */
export function search<T>(
  source: LinkedList<T>,
  callback: Callback<T>,
  reverse?: boolean,
  context?: any
): [node: Node<T>, index: number] | [node: undefined, index: -1] {
  const { length } = source;

  if (length > 0) {
    const callbackBound = callback.bind(context);

    if (reverse) {
      let index = length - 1;
      let current = source.last;

      while (!isNull(current)) {
        if (callbackBound(current.value, index, source)) {
          return [current, index];
        } else {
          current = current.prev;
        }

        index--;
      }
    } else {
      let index = 0;
      let current = source.first;

      while (!isNull(current)) {
        if (callbackBound(current.value, index, source)) {
          return [current, index];
        } else {
          current = current.next;
        }

        index++;
      }
    }
  }

  return [, -1];
}

/**
 * @function searchIndexOf
 * @description 根据指定值搜索双链表
 * @param source 双链表
 * @param value 搜索值
 * @param fromIndex 开始索引
 * @param reverse 是否逆向搜索
 */
export function searchIndexOf<T>(source: LinkedList<T>, value: T, fromIndex?: number, reverse?: boolean): number {
  const { length } = source;
  const startIndex = normalizeIndex(length, fromIndex);

  if (startIndex + 1 <= length) {
    const callback: Callback<T> = (currentValue, currentIndex) => {
      return currentValue === value && currentIndex >= startIndex;
    };

    const [, index] = search(source, callback, reverse);

    return index;
  }

  return -1;
}
