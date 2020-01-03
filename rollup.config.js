import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

export default {
  output: {
    name: 'oriente-utility',
    exports: 'named' // using named export
  },
  plugins: [resolve(), commonjs()]
};
