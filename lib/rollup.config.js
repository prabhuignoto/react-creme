import babel from "@rollup/plugin-babel";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import BemLinter from "postcss-bem-linter";
import PostCSSPreset from "postcss-preset-env";
import esbuild from "rollup-plugin-esbuild";
import postcss from "rollup-plugin-postcss";
import progress from "rollup-plugin-progress";
import purgecss from "rollup-plugin-purgecss";
import { terser } from "rollup-plugin-terser";
import sass from "sass";
import pkg from "./package.json";

const banner = `/*
 * ${pkg.name}
 * ${pkg.description}
 * ${pkg.version}
 * ${pkg.license} License
 */
`;

export default {
  input: "react-creme-alpha.ts",
  output: [
    {
      file: `dist/${pkg.main}`,
      format: "cjs",
      exports: "named",
      strict: true,
      banner,
    },
    {
      file: `dist/${pkg.module}`,
      format: "es",
      exports: "named",
      strict: true,
      banner,
    },
    {
      file: `dist/${pkg.umd}`,
      format: "umd",
      exports: "named",
      strict: true,
      banner,
      name: "ReactCreme",
      globals: {
        react: "React",
        "react-dom": "ReactDOM",
      },
    },
  ],
  plugins: [
    progress({
      clearLine: false,
    }),
    esbuild({
      include: /\.[jt]sx?$/, // default, inferred from `loaders` option
      exclude: /node_modules/, // default
      sourceMap: false, // by default inferred from rollup's `output.sourcemap` option
      minify: process.env.NODE_ENV === "production",
      target: "esnext", // default, or 'es20XX', 'esnext'
      jsx: "transform", // default, or 'preserve'
      jsxFactory: "React.createElement",
      jsxFragment: "React.Fragment",
      // Like @rollup/plugin-replace
      define: {
        __VERSION__: '"x.y.z"',
      },
      tsconfig: "tsconfig.json", // default
      // Add extra loaders
      loaders: {
        // Add .json files support
        // require @rollup/plugin-commonjs
        ".json": "json",
        // Enable JSX in .js files too
        ".js": "jsx",
      },
    }),
    babel({
      presets: ['@babel/preset-env', '@babel/preset-react'],
      babelHelpers: "runtime",
      plugins: [
        "@babel/plugin-transform-runtime",
        "@babel/plugin-proposal-optional-chaining",
      ],
    }),
    purgecss({
      content: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    }),
    postcss({
      preprocessor: (content, id) =>
        new Promise((resolve, reject) => {
          const result = sass.compileString({ file: id });
          resolve({ code: result.css.toString() });
        }),
      plugins: [
        autoprefixer,
        BemLinter,
        PostCSSPreset,
        cssnano({
          preset: "default",
        }),
      ],
      sourceMap: false,
      extract: true,
      extensions: [".scss"],
    }),
    terser({
      compress: {
        drop_debugger: true,
        drop_console: true,
      },
      format: {
        comments: false,
      },
    }),
  ],
  external: ["react", "react-dom", "@babel/runtime"],
};
