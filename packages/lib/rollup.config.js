import babel from '@rollup/plugin-babel';
import common from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import BemLinter from 'postcss-bem-linter';
import PostCSSPreset from 'postcss-preset-env';
import postcss from 'rollup-plugin-postcss';
import purgecss from 'rollup-plugin-purgecss';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';
import visualizer from 'rollup-plugin-visualizer';
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

const globals = {
  globals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
};

export default {
  external: [...Object.keys(pkg.peerDependencies || {})],
  input: 'react-creme.ts',
  output: [
    {
      banner,
      exports: 'named',
      file: pkg.browser,
      format: 'umd',
      ...globals,
      name: OUTPUT_NAME,
      strict: true,
    },
    {
      banner,
      exports: 'named',
      file: pkg.main,
      format: 'cjs',
      ...globals,
      name: OUTPUT_NAME,
      strict: true,
    },
    {
      banner,
      exports: 'named',
      file: pkg.module,
      format: 'es',
      ...globals,
      name: OUTPUT_NAME,
      strict: true,
    },
  ],
  plugins: [
    typescript({
      useTsconfigDeclarationDir: true,
    }),
    resolve({
      browser: true,
    }),
    common({}),
    babel({
      babelHelpers: 'runtime',
      babelrc: true,
      exclude: '**/node_modules/**',
      extensions: ['.ts', '.tsx'],
      plugins: [
        '@babel/plugin-transform-runtime',
        '@babel/plugin-proposal-optional-chaining',
      ],
      // skipPreflightCheck: true,
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
      preprocessor: (_, id) =>
        new Promise(resolve => {
          const result = sass.compileString({ file: id });
          resolve({ code: result.css.toString() });
        }),
      sourceMap: false,
    }),
    terser({
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
      format: {
        comments: false,
      },
    }),
    visualizer({
      filename: 'bundle-analysis.html',
    }),
  ],
};
