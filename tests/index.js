import assert from 'node:assert';
import { LinkedList } from '@nuintun/linked-list';
import { beforeEach, describe, it } from 'node:test';

describe('LinkedList', () => {
  describe('Constructor', () => {
    it('should create empty list', () => {
      const list = new LinkedList();

      assert.strictEqual(list.length, 0);
    });

    it('should create list from array', () => {
      const list = new LinkedList([1, 2, 3]);

      assert.strictEqual(list.length, 3);
      assert.deepStrictEqual([...list], [1, 2, 3]);
    });

    it('should throw error for invalid iterable', () => {
      assert.throws(() => new LinkedList({}));
    });
  });

  describe('Basic Operations', () => {
    let list;

    beforeEach(() => {
      list = new LinkedList();
    });

    it('should push items', () => {
      list.push(1);
      list.push(2);
      assert.strictEqual(list.length, 2);
      assert.deepStrictEqual([...list], [1, 2]);
    });

    it('should pop items', () => {
      list.push(1, 2);
      assert.strictEqual(list.pop(), 2);
      assert.strictEqual(list.pop(), 1);
      assert.strictEqual(list.pop(), undefined);
    });

    it('should unshift items', () => {
      list.unshift(1);
      list.unshift(2);
      assert.strictEqual(list.length, 2);
      assert.deepStrictEqual([...list], [2, 1]);
    });

    it('should shift items', () => {
      list.push(1, 2);
      assert.strictEqual(list.shift(), 1);
      assert.strictEqual(list.shift(), 2);
      assert.strictEqual(list.shift(), undefined);
    });
  });

  describe('Search Operations', () => {
    let list;

    beforeEach(() => {
      list = new LinkedList([1, 2, 3, 2, 1]);
    });

    it('should find index of value', () => {
      assert.strictEqual(list.indexOf(2), 1);
      assert.strictEqual(list.indexOf(4), -1);
    });

    it('should find last index of value', () => {
      assert.strictEqual(list.lastIndexOf(2), 3);
      assert.strictEqual(list.lastIndexOf(4), -1);
    });

    it('should check if value exists', () => {
      assert.strictEqual(list.includes(2), true);
      assert.strictEqual(list.includes(4), false);
    });

    it('should find value by callback', () => {
      const result = list.find(v => v > 2);

      assert.strictEqual(result, 3);
    });

    it('should find index by callback', () => {
      const index = list.findIndex(v => v > 2);

      assert.strictEqual(index, 2);
    });
  });

  describe('Modification Operations', () => {
    let list;

    beforeEach(() => {
      list = new LinkedList([1, 2, 3, 4, 5]);
    });

    it('should splice items', () => {
      const removed = list.splice(1, 2);

      assert.deepStrictEqual(removed, [2, 3]);
      assert.deepStrictEqual([...list], [1, 4, 5]);
    });

    it('should splice and insert items', () => {
      const removed = list.splice(1, 2, 6, 7);

      assert.deepStrictEqual(removed, [2, 3]);
      assert.deepStrictEqual([...list], [1, 6, 7, 4, 5]);
    });

    it('should slice items', () => {
      const sliced = list.slice(1, 3);

      assert.deepStrictEqual([...sliced], [2, 3]);
    });
  });

  describe('Iterator', () => {
    it('should iterate values', () => {
      const values = [];
      const list = new LinkedList([1, 2, 3]);

      for (const value of list) {
        values.push(value);
      }

      assert.deepStrictEqual(values, [1, 2, 3]);
    });

    it('should spread values', () => {
      const list = new LinkedList([1, 2, 3]);

      assert.deepStrictEqual([...list], [1, 2, 3]);
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty list operations', () => {
      const list = new LinkedList();

      assert.strictEqual(list.pop(), undefined);
      assert.strictEqual(list.shift(), undefined);
      assert.strictEqual(list.at(0), undefined);
    });

    it('should handle negative indices', () => {
      const list = new LinkedList([1, 2, 3]);

      assert.strictEqual(list.at(-1), 3);
      assert.strictEqual(list.at(-2), 2);
    });

    it('should handle out of bounds indices', () => {
      const list = new LinkedList([1, 2, 3]);

      assert.strictEqual(list.at(3), undefined);
      assert.strictEqual(list.at(-4), undefined);
    });
  });
});
