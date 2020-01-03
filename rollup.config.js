import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

export default {
  output: {
    exports: 'named' // using named export
  },
  plugins: [resolve(), commonjs()]
};
