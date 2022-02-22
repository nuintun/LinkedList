import { Callback, Node } from './types';
import { isNull, normalizeIndex, search, searchIndexOf } from './utils';

export class LinkedList<T> {
  protected size: number = 0;
  protected head: Node<T> | null = null;
  protected tail: Node<T> | null = null;

  public constructor(iterable: Iterable<T> = []) {
    this.push(...iterable);
  }

  /**
   * @method unshift
   * @param values
   */
  public unshift(...values: T[]): number {
    for (const value of values) {
      const { head } = this;
      const node: Node<T> = {
        value,
        prev: null,
        next: head
      };

      if (isNull(head)) {
        this.tail = node;
      } else {
        head.prev = node;
      }

      this.head = node;

      this.size++;
    }

    return this.size;
  }

  /**
   * @method shift
   */
  public shift(): T | undefined {
    const { head } = this;

    if (!isNull(head)) {
      const { next } = head;

      if (isNull(next)) {
        this.tail = next;
      } else {
        next.prev = null;
      }

      this.head = next;

      this.size--;

      return head.value;
    }
  }

  /**
   * @method push
   * @param values
   */
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

  /**
   * @method pop
   */
  public pop(): T | undefined {
    const { tail } = this;

    if (!isNull(tail)) {
      const { prev } = tail;

      if (isNull(prev)) {
        this.head = prev;
      } else {
        prev.next = null;
      }

      this.tail = prev;

      this.size--;

      return tail.value;
    }
  }

  /**
   * @method at
   * @param index
   */
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

  /**
   * @method includes
   * @param value
   * @param fromIndex
   */
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

  /**
   * @method indexOf
   * @param value
   * @param fromIndex
   */
  public indexOf(value: T, fromIndex?: number): number {
    return searchIndexOf(this, value, fromIndex);
  }

  /**
   * @method lastIndexOf
   * @param value
   * @param fromIndex
   */
  public lastIndexOf(value: T, fromIndex?: number): number {
    return searchIndexOf(this, value, fromIndex, true);
  }

  /**
   * @method find
   * @param callback
   * @param context
   */
  public find(callback: Callback<T>, context?: any): T | undefined {
    const [node] = search(this, callback, false, context);

    return node?.value;
  }

  /**
   * @method findIndex
   * @param callback
   * @param context
   */
  public findIndex(callback: Callback<T>, context?: any): number {
    const [, index] = search(this, callback, false, context);

    return index;
  }

  /**
   * @method splice
   * @param fromIndex
   * @param deleteLength
   * @param values
   */
  public splice(fromIndex: number, deleteLength: number, ...values: T[]): T | undefined {
    console.log(fromIndex, deleteLength, values);

    return undefined;
  }

  /**
   * @method map
   * @param callback
   * @param context
   */
  public map(callback: Callback<T, T>, context?: any): void {
    let index = 0;
    let current = this.head;

    const callbackBound = callback.bind(context);

    while (!isNull(current)) {
      current.value = callbackBound(current.value, index, this);

      current = current.next;

      index++;
    }
  }

  /**
   * @method forEach
   * @param callback
   * @param context
   */
  public forEach(callback: Callback<T, void>, context?: any): void {
    let index = 0;
    let current = this.head;

    const callbackBound = callback.bind(context);

    while (!isNull(current)) {
      callbackBound(current.value, index, this);

      current = current.next;

      index++;
    }
  }

  /**
   * @method join
   * @param separator
   */
  public join(separator: string = ','): string {
    let result: string = '';

    this.forEach((value, index) => {
      if (index > 0) {
        result += `${separator}${value}`;
      } else {
        result += value;
      }
    });

    return result;
  }

  /**
   * @method values
   */
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

  /**
   * @method iterator
   */
  public [Symbol.iterator](): Iterator<T> {
    return this.values();
  }

  /**
   * @property length
   */
  public get length(): number {
    return this.size;
  }

  /**
   * @property first
   */
  public get first(): Node<T> | null {
    return this.head;
  }

  /**
   * @property last
   */
  public get last(): Node<T> | null {
    return this.tail;
  }

  /**
   * @method toString
   */
  public toString(): string {
    return this.join();
  }
}
