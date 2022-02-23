import { Callback, Node } from './types';
import { makeLinkedNode, normalizeIndex } from './utils';

export class LinkedList<T> {
  /**
   * @property #size
   */
  #size: number = 0;

  /**
   * @property #head
   */
  #head: Node<T> | null = null;

  /**
   * @property #tail
   */
  #tail: Node<T> | null = null;

  constructor(iterable: Iterable<T> = []) {
    this.push(...iterable);
  }

  /**
   * @function #search
   * @description 根据指定回调搜索双链表
   * @param callback 回调函数
   * @param reverse 是否逆向搜索
   * @param context 回调函数上下文
   */
  #search(
    callback: Callback<T>,
    reverse?: boolean,
    context?: any
  ): [node: Node<T>, index: number] | [node: undefined, index: -1] {
    const size = this.#size;

    if (size > 0) {
      const callbackBound = callback.bind(context);

      if (reverse) {
        let index = size - 1;
        let current = this.#tail;

        while (current) {
          if (callbackBound(current.value, index, this)) {
            return [current, index];
          } else {
            current = current.prev;
          }

          index--;
        }
      } else {
        let index = 0;
        let current = this.#head;

        while (current) {
          if (callbackBound(current.value, index, this)) {
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
   * @function #searchIndexOf
   * @description 根据指定值搜索双链表
   * @param value 搜索值
   * @param fromIndex 开始索引
   * @param reverse 是否逆向搜索
   */
  #searchIndexOf(value: T, fromIndex?: number, reverse?: boolean): number {
    const size = this.#size;
    const startIndex = normalizeIndex(size, fromIndex);

    if (startIndex < size) {
      const callback: Callback<T> = (currentValue, currentIndex) => {
        return currentValue === value && currentIndex >= startIndex;
      };

      const [, index] = this.#search(callback, reverse);

      return index;
    }

    return -1;
  }

  /**
   * @method #clear
   */
  #clear() {
    this.#size = 0;
    this.#head = null;
    this.#tail = null;
  }

  /**
   * @property length
   */
  get length(): number {
    return this.#size;
  }

  /**
   * @method unshift
   * @param values
   */
  unshift(...values: T[]): number {
    const { length } = values;

    if (length < 1) return this.#size;

    const head = this.#head;
    const [first, last] = makeLinkedNode(values);

    if (head) {
      head.prev = last;
      last.next = head;
    } else {
      this.#tail = last;
    }

    this.#head = first;

    this.#size += length;

    return this.#size;
  }

  /**
   * @method shift
   */
  shift(): T | undefined {
    const head = this.#head;

    if (head) {
      const { next } = head;

      if (next) {
        next.prev = null;
      } else {
        this.#tail = next;
      }

      this.#head = next;

      this.#size--;

      return head.value;
    }
  }

  /**
   * @method push
   * @param values
   */
  push(...values: T[]): number {
    const { length } = values;

    if (length < 1) return this.#size;

    const tail = this.#tail;
    const [first, last] = makeLinkedNode(values);

    if (tail) {
      first.prev = tail;
      tail.next = first;
    } else {
      this.#head = first;
    }

    this.#tail = last;

    this.#size += length;

    return this.#size;
  }

  /**
   * @method pop
   */
  pop(): T | undefined {
    const tail = this.#tail;

    if (tail) {
      const { prev } = tail;

      if (prev) {
        prev.next = null;
      } else {
        this.#head = prev;
      }

      this.#tail = prev;

      this.#size--;

      return tail.value;
    }
  }

  /**
   * @method at
   * @param index
   */
  at(index: number): T | undefined {
    const size = this.#size;
    const startIndex = normalizeIndex(size, index);

    if (startIndex < size) {
      const callback: Callback<T> = (_currentValue, currentIndex) => {
        return currentIndex === startIndex;
      };

      const [node] = this.#search(callback, startIndex > size / 2);

      return node?.value;
    }
  }

  /**
   * @method includes
   * @param value
   * @param fromIndex
   */
  includes(value: T, fromIndex?: number): boolean {
    const size = this.#size;
    const startIndex = normalizeIndex(size, fromIndex);

    if (startIndex < size) {
      const callback: Callback<T> = (currentValue, currentIndex) => {
        return currentValue === value && currentIndex >= startIndex;
      };

      const [, index] = this.#search(callback, startIndex > size / 2);

      return index >= 0;
    }

    return false;
  }

  /**
   * @method indexOf
   * @param value
   * @param fromIndex
   */
  indexOf(value: T, fromIndex?: number): number {
    return this.#searchIndexOf(value, fromIndex);
  }

  /**
   * @method lastIndexOf
   * @param value
   * @param fromIndex
   */
  lastIndexOf(value: T, fromIndex?: number): number {
    return this.#searchIndexOf(value, fromIndex, true);
  }

  /**
   * @method find
   * @param callback
   * @param context
   */
  find(callback: Callback<T>, context?: any): T | undefined {
    const [node] = this.#search(callback, false, context);

    return node?.value;
  }

  /**
   * @method findIndex
   * @param callback
   * @param context
   */
  findIndex(callback: Callback<T>, context?: any): number {
    const [, index] = this.#search(callback, false, context);

    return index;
  }

  /**
   * @method splice
   * @param fromIndex
   * @param deleteLength
   * @param values
   */
  splice(fromIndex: number, deleteLength: number, ...values: T[]): T[] {
    const itmes = [...this];
    const removed = itmes.splice(fromIndex, deleteLength, ...values);

    this.#clear();
    this.push(...itmes);

    return removed;

    // const size = this.#size;

    // if (size > 0) {
    //   const startIndex = normalizeIndex(size, fromIndex);

    //   if (startIndex < size) {
    //     const removed: T[] = [];
    //     const [node] = this.#search((_currentValue, currentIndex) => {
    //       return currentIndex === startIndex;
    //     }, startIndex / 2 > size) as [Node<T>, number];
    //     const removeLength = Math.min(size - startIndex, Math.max(0, deleteLength));

    //     if (removeLength) {
    //       let count = removeLength;
    //       let deleted: Node<T> | null = node;

    //       while (count-- > 0 && deleted) {
    //         removed.push(deleted.value);

    //         deleted = deleted.next;
    //       }
    //     }

    //     return removed;
    //   }
    // }

    // this.push(...values);

    // return [];
  }

  /**
   * @method slice
   * @param fromIndex
   * @param toIndex
   */
  slice(fromIndex?: number, toIndex?: number): LinkedList<T> {
    const itmes = [...this];
    const saved = itmes.slice(fromIndex, toIndex);

    return new LinkedList<T>(saved);
  }

  /**
   * @method concat
   * @param sources
   */
  concat(...sources: LinkedList<T>[]): LinkedList<T> {
    const result = new LinkedList<T>();

    sources.forEach(source => {
      result.push(...source);
    });

    return result;
  }

  /**
   * @method map
   * @param callback
   * @param context
   */
  map<U>(callback: Callback<T, U>, context?: any): LinkedList<U> {
    const result = new LinkedList<U>();
    const callbackBound = callback.bind(context);

    this.forEach((value, index, source) => {
      result.push(callbackBound(value, index, source));
    });

    return result;
  }

  /**
   * @method filter
   * @param callback
   * @param context
   */
  filter(callback: Callback<T>, context?: any): LinkedList<T> {
    const result = new LinkedList<T>();
    const callbackBound = callback.bind(context);

    this.forEach((value, index, source) => {
      if (callbackBound(value, index, source)) {
        result.push(value);
      }
    });

    return result;
  }

  /**
   * @method reverse
   */
  reverse(): LinkedList<T> {
    let current = this.#head;

    while (current) {
      const { prev, next } = current;

      [current.prev, current.next] = [next, prev];

      current = next;
    }

    [this.#head, this.#tail] = [this.#tail, this.#head];

    return this;
  }

  /**
   * @method every
   * @param callback
   * @param context
   */
  every(callback: Callback<T>, context?: any): boolean {
    const callbackBound = callback.bind(context);

    const [, index] = this.#search((currentValue, currentIndex, source) => {
      return !callbackBound(currentValue, currentIndex, source);
    });

    return index < 0;
  }

  /**
   * @method some
   * @param callback
   * @param context
   */
  some(callback: Callback<T>, context?: any): boolean {
    const callbackBound = callback.bind(context);

    const [, index] = this.#search(callbackBound);

    return index >= 0;
  }

  /**
   * @method forEach
   * @param callback
   * @param context
   */
  forEach(callback: Callback<T, void>, context?: any): void {
    let index = 0;
    let current = this.#head;

    const callbackBound = callback.bind(context);

    while (current) {
      callbackBound(current.value, index, this);

      current = current.next;

      index++;
    }
  }

  /**
   * @method join
   * @param separator
   */
  join(separator: string = ','): string {
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
  *values(): Iterator<T> {
    let current = this.#head;

    while (current) {
      yield current.value;

      current = current.next;
    }
  }

  /**
   * @method iterator
   */
  [Symbol.iterator](): Iterator<T> {
    return this.values();
  }

  /**
   * @method toString
   */
  toString(): string {
    return this.join();
  }
}
