import autoprefixer from 'autoprefixer';
import CSSNano from 'cssnano';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path, { dirname } from 'path';
import PostCSSpresetEnv from 'postcss-preset-env';
import RemoveFilesPlugin from 'remove-files-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import { fileURLToPath } from 'url';
import webpack from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
const stylesHandler = MiniCssExtractPlugin.loader;

const __dirname = dirname(fileURLToPath(import.meta.url));

const isProduction = process.env.NODE_ENV === 'production';

export default (name, pkg) => ({
  // cache: {
  //   type: 'filesystem',
  // },
  devtool: 'source-map',
  entry: { [name]: `./components/${name}/index.ts` },
  experiments: {
    outputModule: true,
  },
  externals: [
    {
      react: 'react',
      'react-dom': 'react-dom',
    },
  ],
  externalsType: 'module',
  module: {
    rules: [
      {
        exclude: /node_modules/,
        include: [path.resolve(__dirname, 'components')],
        test: /\.(tsx|ts)$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: ['@babel/plugin-transform-runtime'],
              // presets: ['@babel/preset-env', '@babel/preset-react'],
              presets: ['@babel/preset-env'],
            },
          },
          {
            loader: 'ts-loader',
            options: {
              compilerOptions: {
                declaration: true,
                declarationDir: './',
              },
              configFile: path.resolve(
                __dirname,
                `components/${name}/tsconfig.json`
              ),
              experimentalFileCaching: true,
              happyPackMode: true,
              projectReferences: true,
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          stylesHandler,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [autoprefixer(), PostCSSpresetEnv(), CSSNano()],
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset',
      },

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
  optimization: {
    minimize: isProduction,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          compress: {
            drop_console: true,
          },
          output: {
            comments: false,
          },
        },
      }),
    ],
  },
  output: {
    clean: true,
    environment: {
      module: true,
    },
    filename: `index.js`,
    library: {
      // name: pkg.name,
      type: 'module',
    },
    path: path.resolve(__dirname, `components/${name}/dist`),
  },
  plugins: [
    new MiniCssExtractPlugin({
      // filename: name + '.css',
      filename: `${name}.css`,
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        build: true,
        configFile: path.resolve(__dirname, `components/${name}/tsconfig.json`),
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
        },
      },
    }),
    // new CopyPlugin({
    //   patterns: [
    //     {
    //       from: 'README.md',
    //       to: 'README.md',
    //     },
    //   ],
    // }),
    new webpack.BannerPlugin({
      banner: `${pkg.name} v${pkg.version} | ${pkg.license} | ${pkg.homepage} | ${pkg.author.name}`,
    }),
    new RemoveFilesPlugin({
      before: {
        include: ['./dist'],
        log: true,
        root: path.resolve(__dirname, `components/${name}`),
      },
    }),
    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, `components/${name}/tsconfig.json`),
      }),
    ],
  },
  stats: {
    entrypoints: true,
    errorDetails: true,
    errors: true,
    logging: 'verbose',
    moduleTrace: true,
    modules: true,
    performance: true,
    timings: true,
    warnings: true,
    warningsFilter: /export .* was not found in/,
  },
});
