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

  /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

  function __classPrivateFieldGet(receiver, state, kind, f) {
    if (kind === 'a' && !f) throw new TypeError('Private accessor was defined without a getter');
    if (typeof state === 'function' ? receiver !== state || !f : !state.has(receiver))
      throw new TypeError('Cannot read private member from an object whose class did not declare it');
    return kind === 'm' ? f : kind === 'a' ? f.call(receiver) : f ? f.value : state.get(receiver);
  }

  function __classPrivateFieldSet(receiver, state, value, kind, f) {
    if (kind === 'm') throw new TypeError('Private method is not writable');
    if (kind === 'a' && !f) throw new TypeError('Private accessor was defined without a setter');
    if (typeof state === 'function' ? receiver !== state || !f : !state.has(receiver))
      throw new TypeError('Cannot write private member to an object whose class did not declare it');
    return kind === 'a' ? f.call(receiver, value) : f ? (f.value = value) : state.set(receiver, value), value;
  }

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
   * @param size 双链表长度
   * @param fromIndex 开始索引
   */
  function normalizeIndex(size, fromIndex = 0) {
    return fromIndex < 0 ? Math.max(0, size + fromIndex) : fromIndex;
  }

  var _LinkedList_instances,
    _LinkedList_size,
    _LinkedList_head,
    _LinkedList_tail,
    _LinkedList_search,
    _LinkedList_searchIndexOf;
  class LinkedList {
    constructor(iterable = []) {
      _LinkedList_instances.add(this);
      /**
       * @property #size
       */
      _LinkedList_size.set(this, 0);
      /**
       * @property #head
       */
      _LinkedList_head.set(this, null);
      /**
       * @property #tail
       */
      _LinkedList_tail.set(this, null);
      this.push(...iterable);
    }
    /**
     * @property length
     */
    get length() {
      return __classPrivateFieldGet(this, _LinkedList_size, 'f');
    }
    /**
     * @method unshift
     * @param values
     */
    unshift(...values) {
      var _a;
      for (const value of values) {
        const head = __classPrivateFieldGet(this, _LinkedList_head, 'f');
        const node = {
          value,
          prev: null,
          next: head
        };
        if (isNull(head)) {
          __classPrivateFieldSet(this, _LinkedList_tail, node, 'f');
        } else {
          head.prev = node;
        }
        __classPrivateFieldSet(this, _LinkedList_head, node, 'f');
        __classPrivateFieldSet(
          this,
          _LinkedList_size,
          ((_a = __classPrivateFieldGet(this, _LinkedList_size, 'f')), _a++, _a),
          'f'
        );
      }
      return __classPrivateFieldGet(this, _LinkedList_size, 'f');
    }
    /**
     * @method shift
     */
    shift() {
      var _a;
      const head = __classPrivateFieldGet(this, _LinkedList_head, 'f');
      if (!isNull(head)) {
        const { next } = head;
        if (isNull(next)) {
          __classPrivateFieldSet(this, _LinkedList_tail, next, 'f');
        } else {
          next.prev = null;
        }
        __classPrivateFieldSet(this, _LinkedList_head, next, 'f');
        __classPrivateFieldSet(
          this,
          _LinkedList_size,
          ((_a = __classPrivateFieldGet(this, _LinkedList_size, 'f')), _a--, _a),
          'f'
        );
        return head.value;
      }
    }
    /**
     * @method push
     * @param values
     */
    push(...values) {
      var _a;
      for (const value of values) {
        const tail = __classPrivateFieldGet(this, _LinkedList_tail, 'f');
        const node = {
          value,
          prev: tail,
          next: null
        };
        if (isNull(tail)) {
          __classPrivateFieldSet(this, _LinkedList_head, node, 'f');
        } else {
          tail.next = node;
        }
        __classPrivateFieldSet(this, _LinkedList_tail, node, 'f');
        __classPrivateFieldSet(
          this,
          _LinkedList_size,
          ((_a = __classPrivateFieldGet(this, _LinkedList_size, 'f')), _a++, _a),
          'f'
        );
      }
      return __classPrivateFieldGet(this, _LinkedList_size, 'f');
    }
    /**
     * @method pop
     */
    pop() {
      var _a;
      const tail = __classPrivateFieldGet(this, _LinkedList_tail, 'f');
      if (!isNull(tail)) {
        const { prev } = tail;
        if (isNull(prev)) {
          __classPrivateFieldSet(this, _LinkedList_head, prev, 'f');
        } else {
          prev.next = null;
        }
        __classPrivateFieldSet(this, _LinkedList_tail, prev, 'f');
        __classPrivateFieldSet(
          this,
          _LinkedList_size,
          ((_a = __classPrivateFieldGet(this, _LinkedList_size, 'f')), _a--, _a),
          'f'
        );
        return tail.value;
      }
    }
    /**
     * @method at
     * @param index
     */
    at(index) {
      const size = __classPrivateFieldGet(this, _LinkedList_size, 'f');
      const startIndex = normalizeIndex(size, index);
      if (startIndex + 1 <= size) {
        const callback = (_currentValue, currentIndex) => {
          return currentIndex === startIndex;
        };
        const [node] = __classPrivateFieldGet(this, _LinkedList_instances, 'm', _LinkedList_search).call(
          this,
          callback,
          startIndex > size / 2
        );
        return node === null || node === void 0 ? void 0 : node.value;
      }
    }
    /**
     * @method includes
     * @param value
     * @param fromIndex
     */
    includes(value, fromIndex) {
      const size = __classPrivateFieldGet(this, _LinkedList_size, 'f');
      const startIndex = normalizeIndex(size, fromIndex);
      if (startIndex + 1 <= size) {
        const callback = (currentValue, currentIndex) => {
          return currentValue === value && currentIndex >= startIndex;
        };
        const [, index] = __classPrivateFieldGet(this, _LinkedList_instances, 'm', _LinkedList_search).call(
          this,
          callback,
          startIndex > size / 2
        );
        return index >= 0;
      }
      return false;
    }
    /**
     * @method indexOf
     * @param value
     * @param fromIndex
     */
    indexOf(value, fromIndex) {
      return __classPrivateFieldGet(this, _LinkedList_instances, 'm', _LinkedList_searchIndexOf).call(this, value, fromIndex);
    }
    /**
     * @method lastIndexOf
     * @param value
     * @param fromIndex
     */
    lastIndexOf(value, fromIndex) {
      return __classPrivateFieldGet(this, _LinkedList_instances, 'm', _LinkedList_searchIndexOf).call(
        this,
        value,
        fromIndex,
        true
      );
    }
    /**
     * @method find
     * @param callback
     * @param context
     */
    find(callback, context) {
      const [node] = __classPrivateFieldGet(this, _LinkedList_instances, 'm', _LinkedList_search).call(
        this,
        callback,
        false,
        context
      );
      return node === null || node === void 0 ? void 0 : node.value;
    }
    /**
     * @method findIndex
     * @param callback
     * @param context
     */
    findIndex(callback, context) {
      const [, index] = __classPrivateFieldGet(this, _LinkedList_instances, 'm', _LinkedList_search).call(
        this,
        callback,
        false,
        context
      );
      return index;
    }
    /**
     * @method splice
     * @param fromIndex
     * @param deleteLength
     * @param values
     */
    splice(fromIndex, deleteLength, ...values) {
      console.log(fromIndex, deleteLength, values);
      return undefined;
    }
    /**
     * @method map
     * @param callback
     * @param context
     */
    map(callback, context) {
      let index = 0;
      let current = __classPrivateFieldGet(this, _LinkedList_head, 'f');
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
    forEach(callback, context) {
      let index = 0;
      let current = __classPrivateFieldGet(this, _LinkedList_head, 'f');
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
    join(separator = ',') {
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
    values() {
      let current = __classPrivateFieldGet(this, _LinkedList_head, 'f');
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
    [((_LinkedList_size = new WeakMap()),
    (_LinkedList_head = new WeakMap()),
    (_LinkedList_tail = new WeakMap()),
    (_LinkedList_instances = new WeakSet()),
    (_LinkedList_search = function _LinkedList_search(callback, reverse, context) {
      const size = __classPrivateFieldGet(this, _LinkedList_size, 'f');
      if (size > 0) {
        const callbackBound = callback.bind(context);
        if (reverse) {
          let index = size - 1;
          let current = __classPrivateFieldGet(this, _LinkedList_tail, 'f');
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
          let current = __classPrivateFieldGet(this, _LinkedList_head, 'f');
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
    }),
    (_LinkedList_searchIndexOf = function _LinkedList_searchIndexOf(value, fromIndex, reverse) {
      const size = __classPrivateFieldGet(this, _LinkedList_size, 'f');
      const startIndex = normalizeIndex(size, fromIndex);
      if (startIndex + 1 <= size) {
        const callback = (currentValue, currentIndex) => {
          return currentValue === value && currentIndex >= startIndex;
        };
        const [, index] = __classPrivateFieldGet(this, _LinkedList_instances, 'm', _LinkedList_search).call(
          this,
          callback,
          reverse
        );
        return index;
      }
      return -1;
    }),
    Symbol.iterator)]() {
      return this.values();
    }
    /**
     * @method toString
     */
    toString() {
      return this.join();
    }
  }

  return LinkedList;
});
