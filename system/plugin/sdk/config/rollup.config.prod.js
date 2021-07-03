import babel from 'rollup-plugin-babel';
import { terser } from "rollup-plugin-terser";

export default {
  input: './src/index.js',
  output: {
    format: 'umd',
    file: 'dist/nodeair.min.js',
    name: 'NodeAir',
    sourcemap: true
  },
  plugins: [
    babel({
      exclude: "node_modules/**"
    }),
    terser({ compress: { drop_console: true } })
  ]
}
