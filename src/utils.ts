/**
 * @module utils
 */

import { Node } from './interface';

/**
 * @function normalizeIndex
 * @description 标准化开始索引
 * @param size 链表长度
 * @param fromIndex 开始索引
 */
export function normalizeIndex(size: number, fromIndex: number = 0): number {
  return fromIndex < 0 ? Math.max(0, size + fromIndex) : fromIndex;
}

/**
 * @function createNodes
 * @description 根据值列表生成链表节点
 * @param values 值列表
 */
export function createNodes<T>(values: T[]): [head: Node<T>, tail: Node<T>] {
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

/**
 * @function removeNodes
 * @description 从开始节点删除指定长度节点
 * @param node 开始节点
 * @param length 删除数目
 */
export function removeNodes<T>(node: Node<T>, length: number): [node: Node<T> | null, values: T[]] {
  const values: T[] = [];

  let current: Node<T> | null = node;

  while (length-- > 0 && current) {
    values.push(current.value);

    current = current.next;
  }

  return [current, values];
}
