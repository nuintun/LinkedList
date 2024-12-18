/**
 * @module tests
 */

import { LinkedList } from '@nuintun/linked-list';

const linked = new LinkedList([1, 2, 3, 4, 5]);

console.log('Removed:', linked.splice(2, 1, 68, 86));
console.log('Sliced :', linked.slice().valueOf());
console.log('Linked :', linked.valueOf());
