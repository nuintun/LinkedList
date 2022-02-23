import { Node } from './types';

/**
 * @function normalizeIndex
 * @description 标准化开始索引
 * @param size 双链表长度
 * @param fromIndex 开始索引
 */
export function normalizeIndex(size: number, fromIndex: number = 0): number {
  return fromIndex < 0 ? Math.max(0, size + fromIndex) : fromIndex;
}

/**
 * @function makeLinkedNode
 * @description 根据值列表生产双链表节点
 * @param values 值列表
 */
export function makeLinkedNode<T>(values: T[]): [head: Node<T>, tail: Node<T>] {
  const [value] = values;

  const head: Node<T> = { value, prev: null, next: null };

  const tail = values.reduce((prev, value, index) => {
    if (index > 0) {
      const node: Node<T> = { value, prev, next: null };

      prev.next = node;

      return node;
    }

    return prev;
  }, head);

  return [head, tail];
}
