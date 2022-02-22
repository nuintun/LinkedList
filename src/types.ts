import { LinkedList } from './LinkedList';

export interface Node<T> {
  value: T;
  prev: Node<T> | null;
  next: Node<T> | null;
}

export type Callback<T> = (value: T, index: number, source: LinkedList<T>) => boolean;
