import { Callback, Node } from './types';
import { isNull, normalizeIndex, search, searchIndexOf } from './utils';

export class LinkedList<T> {
  protected size: number = 0;
  protected head: Node<T> | null = null;
  protected tail: Node<T> | null = null;

  public constructor(iterable: Iterable<T> = []) {
    this.push(...iterable);
  }

  public unshift(...values: T[]): number {
    for (const value of values) {
      const { head } = this;
      const node: Node<T> = {
        value,
        prev: null,
        next: head
      };

      this.head = node;

      if (isNull(head)) {
        this.tail = node;
      } else {
        head.prev = node;
      }

      this.size++;
    }

    return this.size;
  }

  public shift(): T | undefined {
    const { head } = this;

    if (!isNull(head)) {
      const { next } = head;

      this.head = next;

      if (isNull(next)) {
        this.tail = next;
      }

      this.size--;

      return head.value;
    }
  }

  public push(...values: T[]): number {
    for (const value of values) {
      const { tail } = this;
      const node: Node<T> = {
        value,
        prev: tail,
        next: null
      };

      if (isNull(tail)) {
        this.head = node;
      } else {
        tail.next = node;
      }

      this.tail = node;

      this.size++;
    }

    return this.size;
  }

  public pop(): T | undefined {
    const { tail } = this;

    if (!isNull(tail)) {
      const { prev } = tail;

      if (isNull(prev)) {
        this.head = prev;
      }

      this.tail = prev;

      this.size--;

      return tail.value;
    }
  }

  public at(index: number): T | undefined {
    const { size } = this;
    const startIndex = normalizeIndex(size, index);

    if (startIndex + 1 <= size) {
      const callback: Callback<T> = (_currentValue, currentIndex) => {
        return currentIndex === startIndex;
      };

      const [node] = search(this, callback, startIndex > size / 2);

      return node?.value;
    }
  }

  public includes(value: T, fromIndex?: number): boolean {
    const { size } = this;
    const startIndex = normalizeIndex(size, fromIndex);

    if (startIndex + 1 <= size) {
      const callback: Callback<T> = (currentValue, currentIndex) => {
        return currentValue === value && currentIndex >= startIndex;
      };

      const [, index] = search(this, callback, startIndex > size / 2);

      return index >= 0;
    }

    return false;
  }

  public indexOf(value: T, fromIndex?: number): number {
    return searchIndexOf(this, value, fromIndex);
  }

  public lastIndexOf(value: T, fromIndex?: number): number {
    return searchIndexOf(this, value, fromIndex, true);
  }

  public find(callback: Callback<T>, context?: any): T | undefined {
    const [node] = search(this, callback, false, context);

    return node?.value;
  }

  public findIndex(callback: Callback<T>, context?: any): number {
    const [, index] = search(this, callback, false, context);

    return index;
  }

  public splice(fromIndex: number, deleteSize: number, ...values: T[]): T | undefined {
    console.log(fromIndex, deleteSize, values);

    return undefined;
  }

  public forEach(callback: Callback<T>, context?: any): void {
    let index = 0;
    let current = this.head;

    const callbackBound = callback.bind(context);

    while (!isNull(current)) {
      callbackBound(current.value, index, this);

      current = current.next;

      index++;
    }
  }

  public values(): Iterator<T> {
    let current = this.head;

    return {
      next: () => {
        if (isNull(current)) {
          return {
            done: true,
            value: undefined
          };
        }

        const { value } = current;

        current = current.next;

        return { done: false, value };
      }
    };
  }

  public [Symbol.iterator](): Iterator<T> {
    return this.values();
  }

  public get length(): number {
    return this.size;
  }

  public get first(): Node<T> | null {
    return this.head;
  }

  public get last(): Node<T> | null {
    return this.tail;
  }

  public toString(): string {
    return 'LinkedList';
  }
}
