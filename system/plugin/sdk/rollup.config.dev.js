import babel from 'rollup-plugin-babel';
import serve from 'rollup-plugin-serve';

export default {
  input: './src/index.js',
  output: {
    format: 'umd',
    file: 'dist/nodeair.js',
    name: 'NodeAir',
    sourcemap: true
  },
  plugins: [
    babel({
      exclude: "node_modules/**"
    }),
    serve({
      open: true,
      openPage: '/test/index.html',
      port: 3001,
      contentBase: ''
    })
  ]
}
