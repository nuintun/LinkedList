const LinkedList = require('./LinkedList');

const x = new LinkedList([1, 2, 3, 4, 5, 6]);

console.log(x.splice(1, 4, 68, 86), x.join(', '));
