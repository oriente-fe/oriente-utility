import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

const { NODE_ENV } = process.env

export default {
  input: 'src/index.js',
  output: {
    name: 'oriente-utility',
    file: `dist/oriente-utility.${NODE_ENV}.js`,
    format: NODE_ENV
  },
  plugins: [resolve(), commonjs()]
};
