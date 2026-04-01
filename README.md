# LinkedList

<!-- prettier-ignore -->
> A TypeScript array-like doubly linked list.
>
> [![NPM Version][npm-image]][npm-url]
> [![Download Status][download-image]][npm-url]
> [![License][license-image]][license-url]

An **array-like doubly linked list** implementation for TypeScript. It mirrors common `Array` usage patterns while keeping efficient linked-list node operations and `for...of` iteration support.

## Installation

```bash
pnpm add @nuintun/linked-list
# or
npm i @nuintun/linked-list
```

## Quick Start

```ts
import { LinkedList } from '@nuintun/linked-list';

const list = new LinkedList<number>([1, 2, 3]);

list.push(4); // [1, 2, 3, 4]
list.unshift(0); // [0, 1, 2, 3, 4]

console.log(list.at(-1)); // 4
console.log(list.length); // 5
console.log([...list]); // [0, 1, 2, 3, 4]
```

## Features

- Array-like mutation methods: `push / pop / shift / unshift / splice / slice / concat`
- Lookup methods: `at / includes / indexOf / lastIndexOf / find / findIndex`
- Functional methods: `map / filter / every / some / forEach`
- Iteration & conversion: `values / Symbol.iterator / valueOf / toString / join`
- Full TypeScript type support

## API Overview

> For method semantics, see MDN Array docs: [MDN Array API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)

### Constructor

- `new LinkedList<T>(iterable?: Iterable<T>)`

### Mutating Methods

- `unshift(...values: T[]): number`
- `shift(): T | undefined`
- `push(...values: T[]): number`
- `pop(): T | undefined`
- `splice(fromIndex: number, removedLength?: number, ...values: T[]): T[]`
- `reverse(): LinkedList<T>`

### Read & Query Methods

- `at(index: number): T | undefined`
- `includes(value: T, fromIndex?: number): boolean`
- `indexOf(value: T, fromIndex?: number): number`
- `lastIndexOf(value: T, fromIndex?: number): number`
- `find(callback, context?): T | undefined`
- `findIndex(callback, context?): number`
- `slice(fromIndex?: number, toIndex?: number): LinkedList<T>`
- `concat(...sources: LinkedList<T>[]): LinkedList<T>`
- `get length(): number`

### Iteration & Transformation

- `forEach(callback, context?): void`
- `map<U>(callback, context?): LinkedList<U>`
- `filter(callback, context?): LinkedList<T>`
- `every(callback, context?): boolean`
- `some(callback, context?): boolean`
- `join(separator?: string): string`
- `values(): Iterator<T>`
- `[Symbol.iterator](): Iterator<T>`
- `valueOf(): T[]`
- `toString(): string`

## Type Definition

```ts
export interface Callback<T, R = boolean> {
  (value: T, index: number, source: LinkedList<T>): R;
}
```

## License

[MIT](./LICENSE)

[npm-image]: https://img.shields.io/npm/v/@nuintun/linked-list?style=flat-square
[npm-url]: https://www.npmjs.org/package/@nuintun/linked-list
[download-image]: https://img.shields.io/npm/dm/@nuintun/linked-list?style=flat-square
[license-image]: https://img.shields.io/github/license/nuintun/LinkedList?style=flat-square
[license-url]: https://github.com/nuintun/LinkedList/blob/main/LICENSE
