import { Callback, Node } from './types';
import { isNull, normalizeIndex } from './utils';

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

        while (!isNull(current)) {
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

        while (!isNull(current)) {
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

    if (startIndex + 1 <= size) {
      const callback: Callback<T> = (currentValue, currentIndex) => {
        return currentValue === value && currentIndex >= startIndex;
      };

      const [, index] = this.#search(callback, reverse);

      return index;
    }

    return -1;
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
    for (const value of values) {
      const head = this.#head;
      const node: Node<T> = {
        value,
        prev: null,
        next: head
      };

      if (isNull(head)) {
        this.#tail = node;
      } else {
        head.prev = node;
      }

      this.#head = node;

      this.#size++;
    }

    return this.#size;
  }

  /**
   * @method shift
   */
  shift(): T | undefined {
    const head = this.#head;

    if (!isNull(head)) {
      const { next } = head;

      if (isNull(next)) {
        this.#tail = next;
      } else {
        next.prev = null;
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
    for (const value of values) {
      const tail = this.#tail;
      const node: Node<T> = {
        value,
        prev: tail,
        next: null
      };

      if (isNull(tail)) {
        this.#head = node;
      } else {
        tail.next = node;
      }

      this.#tail = node;

      this.#size++;
    }

    return this.#size;
  }

  /**
   * @method pop
   */
  pop(): T | undefined {
    const tail = this.#tail;

    if (!isNull(tail)) {
      const { prev } = tail;

      if (isNull(prev)) {
        this.#head = prev;
      } else {
        prev.next = null;
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

    if (startIndex + 1 <= size) {
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

    if (startIndex + 1 <= size) {
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
  splice(fromIndex: number, deleteLength: number, ...values: T[]): T | undefined {
    console.log(fromIndex, deleteLength, values);

    return undefined;
  }

  /**
   * @method map
   * @param callback
   * @param context
   */
  map(callback: Callback<T, T>, context?: any): void {
    let index = 0;
    let current = this.#head;

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
  forEach(callback: Callback<T, void>, context?: any): void {
    let index = 0;
    let current = this.#head;

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
  values(): Iterator<T> {
    let current = this.#head;

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
