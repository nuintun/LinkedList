/**
 * @module interface
 */

import { LinkedList } from './LinkedList';

export interface Node<T> {
  value: T;
  prev: Node<T> | null;
  next: Node<T> | null;
}

export interface Callback<T, R = boolean> {
  (value: T, index: number, source: LinkedList<T>): R;
}

export type FindResult<T> = [node: Node<T>, index: number] | [node: undefined, index: -1];
