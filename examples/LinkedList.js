/**
 * @module LinkedList
 * @license MIT
 * @version 0.0.1
 * @author nuintun
 * @description Typescript doubly linked list implemented using Array api.
 * @see https://github.com/nuintun/LinkedList#readme
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? (module.exports = factory())
    : typeof define === 'function' && define.amd
    ? define('LinkedList', factory)
    : ((global = typeof globalThis !== 'undefined' ? globalThis : global || self), (global.LinkedList = factory()));
})(this, function () {
  'use strict';

  /**
   * @function isNull
   * @description 是否为空值
   * @param value 需要验证的值
   */
  function isNull(value) {
    return value === null;
  }
  /**
   * @function normalizeIndex
   * @description 标准化开始索引
   * @param length 双链表长度
   * @param fromIndex 开始索引
   */
  function normalizeIndex(length, fromIndex = 0) {
    return fromIndex < 0 ? Math.max(0, length + fromIndex) : fromIndex;
  }
  /**
   * @function search
   * @description 根据指定回调搜索双链表
   * @param source 双链表
   * @param callback 回调函数
   * @param reverse 是否逆向搜索
   * @param context 回调函数上下文
   */
  function search(source, callback, reverse, context) {
    const { length } = source;
    if (length > 0) {
      const callbackBound = callback.bind(context);
      if (reverse) {
        let index = length - 1;
        let current = source.last;
        while (!isNull(current)) {
          if (callbackBound(current.value, index, source)) {
            return [current, index];
          } else {
            current = current.prev;
          }
          index--;
        }
      } else {
        let index = 0;
        let current = source.first;
        while (!isNull(current)) {
          if (callbackBound(current.value, index, source)) {
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
   * @function searchIndexOf
   * @description 根据指定值搜索双链表
   * @param source 双链表
   * @param value 搜索值
   * @param fromIndex 开始索引
   * @param reverse 是否逆向搜索
   */
  function searchIndexOf(source, value, fromIndex, reverse) {
    const { length } = source;
    const startIndex = normalizeIndex(length, fromIndex);
    if (startIndex + 1 <= length) {
      const callback = (currentValue, currentIndex) => {
        return currentValue === value && currentIndex >= startIndex;
      };
      const [, index] = search(source, callback, reverse);
      return index;
    }
    return -1;
  }

  class LinkedList {
    constructor(iterable = []) {
      this.size = 0;
      this.head = null;
      this.tail = null;
      this.push(...iterable);
    }
    unshift(...values) {
      for (const value of values) {
        const { head } = this;
        const node = {
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
    shift() {
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
    push(...values) {
      for (const value of values) {
        const { tail } = this;
        const node = {
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
    pop() {
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
    at(index) {
      const { size } = this;
      const startIndex = normalizeIndex(size, index);
      if (startIndex + 1 <= size) {
        const callback = (_currentValue, currentIndex) => {
          return currentIndex === startIndex;
        };
        const [node] = search(this, callback, startIndex > size / 2);
        return node === null || node === void 0 ? void 0 : node.value;
      }
    }
    includes(value, fromIndex) {
      const { size } = this;
      const startIndex = normalizeIndex(size, fromIndex);
      if (startIndex + 1 <= size) {
        const callback = (currentValue, currentIndex) => {
          return currentValue === value && currentIndex >= startIndex;
        };
        const [, index] = search(this, callback, startIndex > size / 2);
        return index >= 0;
      }
      return false;
    }
    indexOf(value, fromIndex) {
      return searchIndexOf(this, value, fromIndex);
    }
    lastIndexOf(value, fromIndex) {
      return searchIndexOf(this, value, fromIndex, true);
    }
    find(callback, context) {
      const [node] = search(this, callback, false, context);
      return node === null || node === void 0 ? void 0 : node.value;
    }
    findIndex(callback, context) {
      const [, index] = search(this, callback, false, context);
      return index;
    }
    splice(fromIndex, deleteSize, ...values) {
      console.log(fromIndex, deleteSize, values);
      return undefined;
    }
    forEach(callback, context) {
      let index = 0;
      let current = this.head;
      const callbackBound = callback.bind(context);
      while (!isNull(current)) {
        callbackBound(current.value, index, this);
        current = current.next;
        index++;
      }
    }
    values() {
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
    [Symbol.iterator]() {
      return this.values();
    }
    get length() {
      return this.size;
    }
    get first() {
      return this.head;
    }
    get last() {
      return this.tail;
    }
    toString() {
      return 'LinkedList';
    }
  }

  return LinkedList;
});
