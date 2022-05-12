/**
 * @module rollup.examples
 */

import pkg from '../package.json';
import treeShake from './plugins/tree-shake';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

const banner = `/**
 * @module LinkedList
 * @package ${pkg.name}
 * @license ${pkg.license}
 * @version ${pkg.version}
 * @author ${pkg.author.name} <${pkg.author.email}>
 * @description ${pkg.description}
 * @see ${pkg.homepage}
 */
`;

export default {
  input: 'src/index.ts',
  output: {
    banner,
    format: 'esm',
    interop: false,
    exports: 'auto',
    esModule: false,
    preferConst: true,
    file: 'tests/LinkedList.js'
  },
  plugins: [resolve(), typescript(), treeShake()]
};
