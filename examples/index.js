const LinkedList = require('./LinkedList');

const x = new LinkedList([1, 2, 3, 4, 5]);

console.log('Removed:', x.splice(2, 1, 68, 86));
console.log('Sliced :', x.slice().valueOf());
console.log('Linked :', x.valueOf());
