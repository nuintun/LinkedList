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
    ? define('qrcode', factory)
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
   * @param size 双链表大小
   * @param fromIndex 开始索引
   */
  function normalizeIndex(size, fromIndex = 0) {
    return fromIndex < 0 ? Math.max(0, size + fromIndex) : fromIndex;
  }

  class LinkedList {
    constructor(iterable = []) {
      this.size = 0;
      this.head = null;
      this.tail = null;
      this.push(...iterable);
    }
    search(callback, reverse, context) {
      const { size } = this;
      if (size > 0) {
        const callbackBound = callback.bind(context);
        if (reverse) {
          let index = size - 1;
          let current = this.tail;
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
          let current = this.head;
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
    splice(index, deleteCount, ...values) {
      console.log(index, deleteCount, ...values);
      return undefined;
    }
    find(callback, context) {
      const [node] = this.search(callback, false, context);
      return node === null || node === void 0 ? void 0 : node.value;
    }
    findIndex(callback, context) {
      const [, index] = this.search(callback, false, context);
      return index;
    }
    at(index) {
      const { size } = this;
      const position = normalizeIndex(size, index);
      if (position + 1 <= size) {
        const [node] = this.search((_value, index) => {
          return index === position;
        }, position > size / 2);
        return node === null || node === void 0 ? void 0 : node.value;
      }
    }
    includes(valueToFind, fromIndex) {
      const { size } = this;
      const position = normalizeIndex(size, fromIndex);
      if (position + 1 <= size) {
        const [, index] = this.search((value, index) => {
          return value === valueToFind && index >= position;
        }, position > size / 2);
        return index >= 0;
      }
      return false;
    }
    indexOf(valueToFind, fromIndex) {
      const { size } = this;
      const position = normalizeIndex(size, fromIndex);
      if (position + 1 <= size) {
        const [, index] = this.search((value, index) => {
          return value === valueToFind && index >= position;
        });
        return index;
      }
      return -1;
    }
    lastIndexOf(valueToFind, fromIndex) {
      const { size } = this;
      const position = normalizeIndex(size, fromIndex);
      if (position + 1 <= size) {
        const [, index] = this.search((value, index) => {
          return value === valueToFind && index >= position;
        }, true);
        return index;
      }
      return -1;
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
    get length() {
      return this.size;
    }
    [Symbol.iterator]() {
      return this.values();
    }
  }

  return LinkedList;
});
