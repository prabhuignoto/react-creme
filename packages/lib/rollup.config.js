import babel from '@rollup/plugin-babel';
import common from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import BemLinter from 'postcss-bem-linter';
import PostCSSPreset from 'postcss-preset-env';
// import esbuild from "rollup-plugin-esbuild";
import postcss from 'rollup-plugin-postcss';
import progress from 'rollup-plugin-progress';
import purgecss from 'rollup-plugin-purgecss';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';
import sass from 'sass';
import pkg from './package.json';

const banner = `/*
 * ${pkg.name}
 * ${pkg.description}
 * ${pkg.version}
 * ${pkg.license} License
 */
`;

const OUTPUT_NAME = 'ReactCreme';

export default {
  external: ['react', 'react-dom', '@babel/runtime'],
  input: 'react-creme.ts',
  output: [
    {
      banner,
      exports: 'named',
      file: pkg.main,
      format: 'cjs',
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
      },
      name: OUTPUT_NAME,
      strict: true,
    },
    {
      banner,
      exports: 'named',
      file: pkg.module,
      format: 'es',
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
      },
      name: OUTPUT_NAME,
      strict: true,
    },
    {
      banner,
      exports: 'named',
      file: pkg.umd,
      format: 'umd',
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
      },
      name: OUTPUT_NAME,
      strict: true,
    },
  ],
  plugins: [
    progress({
      clearLine: false,
    }),
    typescript(),
    babel({
      babelHelpers: 'runtime',
      plugins: [
        '@babel/plugin-transform-runtime',
        '@babel/plugin-proposal-optional-chaining',
      ],
      presets: ['@babel/preset-env', '@babel/preset-react'],
    }),
    purgecss({
      content: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
    }),
    postcss({
      extensions: ['.scss'],
      extract: true,
      plugins: [
        autoprefixer,
        BemLinter,
        PostCSSPreset,
        cssnano({
          preset: 'default',
        }),
      ],
      preprocessor: (content, id) =>
        new Promise((resolve, reject) => {
          const result = sass.compileString({ file: id });
          resolve({ code: result.css.toString() });
        }),
      sourceMap: false,
    }),
    resolve({
      browser: true,
    }),
    common(),
    terser({
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
      format: {
        comments: false,
      },
    }),
  ],
};
