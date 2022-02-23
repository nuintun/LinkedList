/**
 * @module LinkedList
 * @license MIT
 * @version 0.0.1
 * @author nuintun
 * @description A typescript array-like doubly linked list.
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
   * @function normalizeIndex
   * @description 标准化开始索引
   * @param size 双链表长度
   * @param fromIndex 开始索引
   */
  function normalizeIndex(size, fromIndex = 0) {
    return fromIndex < 0 ? Math.max(0, size + fromIndex) : fromIndex;
  }
  /**
   * @function makeLinkedNode
   * @description 根据值列表生产双链表节点
   * @param values 值列表
   */
  function makeLinkedNode(values) {
    const [value] = values;
    const head = { value, prev: null, next: null };
    const tail = values.reduce((prev, value, index) => {
      if (index > 0) {
        const node = { value, prev, next: null };
        prev.next = node;
        return node;
      }
      return prev;
    }, head);
    return [head, tail];
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
      const { length } = values;
      if (length < 1) return __classPrivateFieldGet(this, _LinkedList_size, 'f');
      const head = __classPrivateFieldGet(this, _LinkedList_head, 'f');
      const [first, last] = makeLinkedNode(values);
      if (head) {
        head.prev = last;
        last.next = head;
      } else {
        __classPrivateFieldSet(this, _LinkedList_tail, last, 'f');
      }
      __classPrivateFieldSet(this, _LinkedList_head, first, 'f');
      __classPrivateFieldSet(this, _LinkedList_size, __classPrivateFieldGet(this, _LinkedList_size, 'f') + length, 'f');
      return __classPrivateFieldGet(this, _LinkedList_size, 'f');
    }
    /**
     * @method shift
     */
    shift() {
      var _a;
      const head = __classPrivateFieldGet(this, _LinkedList_head, 'f');
      if (head) {
        const { next } = head;
        if (next) {
          next.prev = null;
        } else {
          __classPrivateFieldSet(this, _LinkedList_tail, next, 'f');
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
      const { length } = values;
      if (length < 1) return __classPrivateFieldGet(this, _LinkedList_size, 'f');
      const tail = __classPrivateFieldGet(this, _LinkedList_tail, 'f');
      const [first, last] = makeLinkedNode(values);
      if (tail) {
        first.prev = tail;
        tail.next = first;
      } else {
        __classPrivateFieldSet(this, _LinkedList_head, first, 'f');
      }
      __classPrivateFieldSet(this, _LinkedList_tail, last, 'f');
      __classPrivateFieldSet(this, _LinkedList_size, __classPrivateFieldGet(this, _LinkedList_size, 'f') + length, 'f');
      return __classPrivateFieldGet(this, _LinkedList_size, 'f');
    }
    /**
     * @method pop
     */
    pop() {
      var _a;
      const tail = __classPrivateFieldGet(this, _LinkedList_tail, 'f');
      if (tail) {
        const { prev } = tail;
        if (prev) {
          prev.next = null;
        } else {
          __classPrivateFieldSet(this, _LinkedList_head, prev, 'f');
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
      if (startIndex < size) {
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
      if (startIndex < size) {
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
     * @method concat
     * @param sources
     */
    concat(...sources) {
      const result = new LinkedList();
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
    map(callback, context) {
      const result = new LinkedList();
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
    filter(callback, context) {
      const result = new LinkedList();
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
    reverse() {
      var _a, _b;
      let current = __classPrivateFieldGet(this, _LinkedList_head, 'f');
      while (current) {
        const { prev, next } = current;
        [current.prev, current.next] = [next, prev];
        current = next;
      }
      (_a = this),
        (_b = this),
        ([
          {
            set value(_c) {
              __classPrivateFieldSet(_a, _LinkedList_head, _c, 'f');
            }
          }.value,
          {
            set value(_c) {
              __classPrivateFieldSet(_b, _LinkedList_tail, _c, 'f');
            }
          }.value
        ] = [__classPrivateFieldGet(this, _LinkedList_tail, 'f'), __classPrivateFieldGet(this, _LinkedList_head, 'f')]);
      return this;
    }
    /**
     * @method every
     * @param callback
     * @param context
     */
    every(callback, context) {
      const callbackBound = callback.bind(context);
      const [, index] = __classPrivateFieldGet(this, _LinkedList_instances, 'm', _LinkedList_search).call(
        this,
        (value, index, source) => {
          return !callbackBound(value, index, source);
        }
      );
      return index < 0;
    }
    /**
     * @method some
     * @param callback
     * @param context
     */
    some(callback, context) {
      const callbackBound = callback.bind(context);
      const [, index] = __classPrivateFieldGet(this, _LinkedList_instances, 'm', _LinkedList_search).call(this, callbackBound);
      return index >= 0;
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
    *values() {
      let current = __classPrivateFieldGet(this, _LinkedList_head, 'f');
      while (current) {
        yield current.value;
        current = current.next;
      }
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
          let current = __classPrivateFieldGet(this, _LinkedList_head, 'f');
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
    }),
    (_LinkedList_searchIndexOf = function _LinkedList_searchIndexOf(value, fromIndex, reverse) {
      const size = __classPrivateFieldGet(this, _LinkedList_size, 'f');
      const startIndex = normalizeIndex(size, fromIndex);
      if (startIndex < size) {
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
