/**
 * @module LinkedList
 */

import { Callback, FindResult, Node } from './interface';
import { createNodes, normalizeIndex, removeNodes } from './utils';

/**
 * @class LinkedList
 * @description 类数组接口双向链表
 */
export class LinkedList<T> {
  /**
   * @property #size
   * @description 链表长度
   */
  #size: number = 0;

  /**
   * @property #head
   * @description 链表头部
   */
  #head: Node<T> | null = null;

  /**
   * @property #tail
   * @description 链表尾部
   */
  #tail: Node<T> | null = null;

  /**
   * @constructor
   * @description 类数组接口双向链表
   * @param iterable 初始值
   */
  constructor(iterable: Iterable<T> = []) {
    this.push(...iterable);
  }

  /**
   * @function #find
   * @description 根据指定回调查找链表，返回找到的值和索引
   * @param callback 回调函数
   * @param reverse 是否逆向查找
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
   * @description 获取值在链表中的索引
   * @param value 要获取的值
   * @param fromIndex 开始索引
   * @param reverse 是否逆向查找
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
   * @description 将一个或多个值添加到链表的头部，并返回该链表的新长度
   * @param values 要添加到链表头部的值或多个值
   */
  unshift(...values: T[]): number {
    const self = this;
    const { length: addedLength } = values;

    if (addedLength < 1) return self.#size;

    const head = self.#head;
    const [first, last] = createNodes(values);

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
   * @description 从链表中删除第一个值，并返回该值的值
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
   * @description 将一个或多个值添加到链表的尾部，并返回该链表的新长度
   * @param values 要添加到链表尾部的值或多个值
   */
  push(...values: T[]): number {
    const self = this;
    const { length: addedLength } = values;

    if (addedLength < 1) return self.#size;

    const tail = self.#tail;
    const [first, last] = createNodes(values);

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
   * @description 从链表中删除最后一个值，并返回该值的值
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
   * @description 查找指定索引处的值
   * @param index 要查找的索引，允许负数
   */
  at(index: number): T | undefined {
    const self = this;
    const size = self.#size;
    const startIndex = normalizeIndex(size, index);

    if (startIndex >= 0 && startIndex < size) {
      const callback: Callback<T> = (_currentValue, currentIndex) => {
        return currentIndex === startIndex;
      };

      const [node] = self.#find(callback, startIndex > size / 2);

      return node?.value;
    }
  }

  /**
   * @method includes
   * @description 用来判断一个链表是否包含一个指定的值
   * @param value 需要查找的值
   * @param fromIndex 开始索引，允许负数
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
   * @description 返回在链表中可以找到一个给定值的第一个索引
   * @param value 要查找的值
   * @param fromIndex 开始索引，允许负数
   */
  indexOf(value: T, fromIndex?: number): number {
    return this.#indexOf(value, fromIndex);
  }

  /**
   * @method lastIndexOf
   * @description 返回在链表中可以找到一个给定值的最后一个索引
   * @param value 要查找的值
   * @param fromIndex 开始索引，允许负数
   */
  lastIndexOf(value: T, fromIndex?: number): number {
    return this.#indexOf(value, fromIndex, true);
  }

  /**
   * @function find
   * @description 根据指定回调查找链表，返回找到的值
   * @param callback 回调函数
   * @param context 回调函数上下文
   */
  find(callback: Callback<T>, context?: any): T | undefined {
    const [node] = this.#find(callback, false, context);

    return node?.value;
  }

  /**
   * @function findIndex
   * @description 根据指定回调查找链表，返回找到的索引
   * @param callback 回调函数
   * @param context 回调函数上下文
   */
  findIndex(callback: Callback<T>, context?: any): number {
    const [, index] = this.#find(callback, false, context);

    return index;
  }

  /**
   * @method splice
   * @description 通过删除或替换现有值或者原地添加新的值来修改链表，并以数组形式返回被修改的内容
   * @param fromIndex 开始索引，允许负数
   * @param removedLength 要移除的长度
   * @param values 要添加进链表的值
   */
  splice(fromIndex: number, removedLength: number = this.#size, ...values: T[]): T[] {
    const self = this;
    const size = self.#size;

    if (size > 0) {
      const startIndex = normalizeIndex(size, fromIndex);

      if (startIndex < size) {
        const [start] = self.#find(
          (_currentValue, currentIndex) => {
            return currentIndex === startIndex;
          },
          startIndex / 2 > size
        ) as [Node<T>, number];

        const head = start.prev;
        const [tail, removed] = removeNodes(start, removedLength);

        self.#size -= removed.length;

        if (head && tail) {
          const { length: addedLength } = values;

          if (addedLength > 0) {
            const [first, last] = createNodes(values);

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
   * @description 从当前链表中截取新的链表
   * @param fromIndex 开始索引，允许负数
   * @param toIndex 结束索引，允许负数
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
   * @description 合并一个链表，并返回新的链表
   * @param sources 要合并的链表
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
   * @description 根据回调映射出一个新链表
   * @param callback 回调函数
   * @param context 回调上下文
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
   * @description 根据回过滤出一个新链表
   * @param callback 回调函数
   * @param context 回调上下文
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
   * @description 反转链表
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
   * @description 校验链表值是否都满足指定回调函数校验
   * @param callback 回调函数
   * @param context 回调上下文
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
   * @description 校验链表值是否有一个满足指定回调函数校验
   * @param callback 回调函数
   * @param context 回调上下文
   */
  some(callback: Callback<T>, context?: any): boolean {
    const callbackBound = callback.bind(context);

    const [, index] = this.#find(callbackBound);

    return index >= 0;
  }

  /**
   * @method forEach
   * @description 遍历链表
   * @param callback 回调函数
   * @param context 回调上下文
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
   * @description 将链表值根据指定字符拼接成字符串
   * @param separator 分隔字符串
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
   * @description 返回链表值的迭代器
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
   * @description 默认迭代器
   */
  [Symbol.iterator](): Iterator<T> {
    return this.values();
  }

  /**
   * @property length
   * @description 获取链表长度
   */
  get length(): number {
    return this.#size;
  }

  /**
   * @method valueOf
   * @description 获取链表原始值
   */
  valueOf(): T[] {
    return [...this];
  }

  /**
   * @method toString
   * @description 获取链表字符串
   */
  toString(): string {
    return this.join();
  }
}
