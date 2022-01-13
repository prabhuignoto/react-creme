import babel from "@rollup/plugin-babel";
import common from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import BemLinter from "postcss-bem-linter";
import PostCSSPreset from "postcss-preset-env";
// import esbuild from "rollup-plugin-esbuild";
import postcss from "rollup-plugin-postcss";
import progress from "rollup-plugin-progress";
import purgecss from "rollup-plugin-purgecss";
import { terser } from "rollup-plugin-terser";
import typescript from "rollup-plugin-typescript2";
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
  input: "react-creme.ts",
  output: [
    {
      file: pkg.main,
      format: "cjs",
      exports: "named",
      strict: true,
      banner,
    },
    {
      file: pkg.module,
      format: "es",
      exports: "named",
      strict: true,
      banner,
    },
    {
      file: pkg.umd,
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
    typescript(),
    babel({
      presets: ["@babel/preset-env", "@babel/preset-react"],
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
    resolve({
      browser: true,
    }),
    common(),
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
