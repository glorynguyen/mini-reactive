import terser from '@rollup/plugin-terser';

const input = 'src/index.js';
const name = 'MiniReactive';

export default {
  input,
  output: [
    {
      file: 'dist/mini-reactive.mjs',
      format: 'esm',
    },
    {
      file: 'dist/mini-reactive.js',
      format: 'umd',
      name: 'MiniReactive',
    },
    {
      file: 'dist/mini-reactive.min.js',
      format: 'umd',
      name: 'MiniReactive',
      name,
      plugins: [terser()],
    },
  ],
};