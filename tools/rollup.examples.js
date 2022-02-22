/**
 * @module rollup.examples
 */

import pkg from '../package.json';
import treeShake from './plugins/tree-shake';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

const banner = `/**
 * @module LinkedList
 * @license ${pkg.license}
 * @version ${pkg.version}
 * @author ${pkg.author.name}
 * @description ${pkg.description}
 * @see ${pkg.homepage}
 */
`;

export default {
  input: 'src/index.ts',
  output: {
    banner,
    format: 'umd',
    interop: false,
    exports: 'auto',
    esModule: false,
    name: 'LinkedList',
    amd: { id: 'LinkedList' },
    file: 'examples/LinkedList.js'
  },
  plugins: [resolve(), typescript(), treeShake()]
};
