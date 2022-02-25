import { Callback, FindResult, Node } from './types';
import { createNode, findNode, normalizeIndex } from './utils';

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
   * @function #find
   * @description 根据指定回调查找双链表
   * @param callback 回调函数
   * @param reverse 是否逆向搜索
   * @param context 回调函数上下文
   */
  #find(callback: Callback<T>, reverse?: boolean, context?: any): FindResult<T> {
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
   * @function #indexOf
   * @description 根据指定值搜索双链表
   * @param value 搜索值
   * @param fromIndex 开始索引
   * @param reverse 是否逆向搜索
   */
  #indexOf(value: T, fromIndex?: number, reverse?: boolean): number {
    const self = this;
    const size = self.#size;
    const startIndex = normalizeIndex(size, fromIndex);

    if (startIndex < size) {
      const callback: Callback<T> = (currentValue, currentIndex) => {
        return currentValue === value && currentIndex >= startIndex;
      };

      const [, index] = self.#find(callback, reverse);

      return index;
    }

    return -1;
  }

  /**
   * @method unshift
   * @param values
   */
  unshift(...values: T[]): number {
    const self = this;
    const { length: addedLength } = values;

    if (addedLength < 1) return self.#size;

    const head = self.#head;
    const [first, last] = createNode(values);

    if (head) {
      head.prev = last;
      last.next = head;
    } else {
      self.#tail = last;
    }

    self.#head = first;

    self.#size += addedLength;

    return self.#size;
  }

  /**
   * @method shift
   */
  shift(): T | undefined {
    const self = this;
    const head = self.#head;

    if (head) {
      const { next } = head;

      if (next) {
        next.prev = null;
      } else {
        self.#tail = next;
      }

      self.#head = next;

      self.#size--;

      return head.value;
    }
  }

  /**
   * @method push
   * @param values
   */
  push(...values: T[]): number {
    const self = this;
    const { length: addedLength } = values;

    if (addedLength < 1) return self.#size;

    const tail = self.#tail;
    const [first, last] = createNode(values);

    if (tail) {
      first.prev = tail;
      tail.next = first;
    } else {
      self.#head = first;
    }

    self.#tail = last;

    self.#size += addedLength;

    return self.#size;
  }

  /**
   * @method pop
   */
  pop(): T | undefined {
    const self = this;
    const tail = self.#tail;

    if (tail) {
      const { prev } = tail;

      if (prev) {
        prev.next = null;
      } else {
        self.#head = prev;
      }

      self.#tail = prev;

      self.#size--;

      return tail.value;
    }
  }

  /**
   * @method at
   * @param index
   */
  at(index: number): T | undefined {
    const self = this;
    const size = self.#size;
    const startIndex = normalizeIndex(size, index);

    if (startIndex < size) {
      const callback: Callback<T> = (_currentValue, currentIndex) => {
        return currentIndex === startIndex;
      };

      const [node] = self.#find(callback, startIndex > size / 2);

      return node?.value;
    }
  }

  /**
   * @method includes
   * @param value
   * @param fromIndex
   */
  includes(value: T, fromIndex?: number): boolean {
    const self = this;
    const size = self.#size;
    const startIndex = normalizeIndex(size, fromIndex);

    if (startIndex < size) {
      const callback: Callback<T> = (currentValue, currentIndex) => {
        return currentValue === value && currentIndex >= startIndex;
      };

      const [, index] = self.#find(callback, startIndex > size / 2);

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
    return this.#indexOf(value, fromIndex);
  }

  /**
   * @method lastIndexOf
   * @param value
   * @param fromIndex
   */
  lastIndexOf(value: T, fromIndex?: number): number {
    return this.#indexOf(value, fromIndex, true);
  }

  /**
   * @method find
   * @param callback
   * @param context
   */
  find(callback: Callback<T>, context?: any): T | undefined {
    const [node] = this.#find(callback, false, context);

    return node?.value;
  }

  /**
   * @method findIndex
   * @param callback
   * @param context
   */
  findIndex(callback: Callback<T>, context?: any): number {
    const [, index] = this.#find(callback, false, context);

    return index;
  }

  /**
   * @method splice
   * @param fromIndex
   * @param deleteLength
   * @param values
   */
  splice(fromIndex: number, deleteLength: number = this.#size, ...values: T[]): T[] {
    const self = this;
    const size = self.#size;

    if (size > 0) {
      const startIndex = normalizeIndex(size, fromIndex);

      if (startIndex < size) {
        const [start] = self.#find((_currentValue, currentIndex) => {
          return currentIndex === startIndex;
        }, startIndex / 2 > size) as [Node<T>, number];

        const head = start.prev;
        const [tail, removed] = findNode(start, deleteLength);

        self.#size -= removed.length;

        if (head && tail) {
          const { length: addedLength } = values;

          if (addedLength > 0) {
            const [first, last] = createNode(values);

            [head.next, tail.prev] = [first, last];
            [first.prev, last.next] = [head, tail];

            self.#size += addedLength;
          } else {
            head.next = tail;
            tail.prev = head;
          }

          return removed;
        } else if (tail) {
          tail.prev = null;

          self.#head = tail;

          self.unshift(...values);

          return removed;
        } else if (head) {
          head.next = null;

          self.#tail = head;
        } else {
          self.#head = head;
          self.#tail = tail;
        }

        self.push(...values);

        return removed;
      }
    }

    self.push(...values);

    return [];
  }

  /**
   * @method slice
   * @param fromIndex
   * @param toIndex
   */
  slice(fromIndex: number = 0, toIndex: number = this.#size): LinkedList<T> {
    const self = this;
    const size = self.#size;
    const result = new LinkedList<T>();
    const startIndex = normalizeIndex(size, fromIndex);
    const endIndex = normalizeIndex(size, toIndex);

    if (startIndex < endIndex) {
      if (startIndex > size / 2) {
        let index = size - 1;
        let current = self.#tail;

        while (current) {
          if (index < startIndex) break;

          if (index < endIndex) {
            result.unshift(current.value);
          }

          current = current.prev;

          index--;
        }
      } else {
        let index = 0;
        let current = self.#head;

        while (current) {
          if (index >= endIndex) break;

          if (index >= startIndex) {
            result.push(current.value);
          }

          current = current.next;

          index++;
        }
      }
    }

    return result;
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
    const self = this;

    let current = self.#head;

    while (current) {
      const { prev, next } = current;

      [current.prev, current.next] = [next, prev];

      current = next;
    }

    [self.#head, self.#tail] = [self.#tail, self.#head];

    return self;
  }

  /**
   * @method every
   * @param callback
   * @param context
   */
  every(callback: Callback<T>, context?: any): boolean {
    const callbackBound = callback.bind(context);

    const [, index] = this.#find((currentValue, currentIndex, source) => {
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

    const [, index] = this.#find(callbackBound);

    return index >= 0;
  }

  /**
   * @method forEach
   * @param callback
   * @param context
   */
  forEach(callback: Callback<T, void>, context?: any): void {
    const self = this;

    let index = 0;
    let current = self.#head;

    const callbackBound = callback.bind(context);

    while (current) {
      callbackBound(current.value, index, self);

      current = current.next;

      index++;
    }
  }

  /**
   * @method join
   * @param separator
   */
  join(separator: string = ','): string {
    let result = '';

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
   * @property length
   */
  get length(): number {
    return this.#size;
  }

  /**
   * @method valueOf
   */
  valueOf() {
    return [...this];
  }

  /**
   * @method toString
   */
  toString(): string {
    return this.join();
  }
}
