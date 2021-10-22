import babel from "@rollup/plugin-babel";
import common from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import BemLinter from "postcss-bem-linter";
import postcss from "rollup-plugin-postcss";
import { terser } from "rollup-plugin-terser";
import typescript from "rollup-plugin-typescript2";
import sass from "sass";
import pkg from "./package.json";
import PostCSSPreset from "postcss-preset-env";

const banner = `/*
 * ${pkg.name}
 * ${pkg.description}
 * ${pkg.version}
 * ${pkg.license} License
 */
`;

export default {
  input: "src/components/index.ts",
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
      name: "ReactPhoenix",
      globals: {
        react: "React",
        "react-dom": "ReactDOM",
      },
    },
  ],
  plugins: [
    typescript(),
    babel({
      extensions: ["tsx", "ts"],
      babelHelpers: "runtime",
      plugins: [
        "@babel/plugin-transform-runtime",
        "@babel/plugin-proposal-optional-chaining",
        [
          "react-remove-properties",
          {
            "properties": ["data-testid"],
          },
        ],
      ],
    }),
    postcss({
      preprocessor: (content, id) =>
        new Promise((resolve, reject) => {
          const result = sass.renderSync({ file: id });
          resolve({ code: result.css.toString() });
        }),
      plugins: [
        cssnano({
          preset: "default",
        }),
        autoprefixer,
        BemLinter,
        PostCSSPreset
      ],
      sourceMap: false,
      extract: true,
      extensions: [".scss"],
    }),
    common(),
    resolve(),
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
