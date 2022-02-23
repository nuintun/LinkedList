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
  const nodes: Node<T>[] = [];

  let prev: Node<T> | null = null;

  for (const value of values) {
    const node: Node<T> = {
      value,
      prev,
      next: null
    };

    if (prev) {
      prev.next = node;
    }

    prev = node;

    nodes.push(node);
  }

  const { length } = nodes;

  return [nodes[0], nodes[length > 1 ? length - 1 : 0]];
}
