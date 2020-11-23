import * as path from 'path';
import resolve from 'rollup-plugin-node-resolve';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import pkg from './package.json';

const generateSourceMaps = process.env.GENERATE_MAPS === 'true';

export default {
  input: 'lib/index.js',
  output: {
    file: pkg.module,
    format: 'cjs',
    exports: 'named',
    sourcemap: generateSourceMaps,
    sourcemapPathTransform: relativeSourcePath => {
      return path.resolve('distribution', relativeSourcePath);
    },
  },
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs({
      include: 'node_modules/**',
    }),
    babel({
      exclude: 'node_modules/**', // only transpile our source code
    }),
  ],
};
