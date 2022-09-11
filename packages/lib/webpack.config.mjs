// Generated using webpack-cli https://github.com/webpack/webpack-cli

import autoprefixer from 'autoprefixer';
import CopyPlugin from 'copy-webpack-plugin';
import CSSNano from 'cssnano';
import doiuse from 'doiuse';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path, { dirname } from 'path';
import PostCSSpresetEnv from 'postcss-preset-env';
import RemovePlugin from 'remove-files-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import threadLoader from 'thread-loader';
import { fileURLToPath } from 'url';
import webpack from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { StatsWriterPlugin } from 'webpack-stats-plugin';
import pkg from './package.json' assert { type: 'json' };

const __dirname = dirname(fileURLToPath(import.meta.url));

const isProduction = process.env.NODE_ENV === 'production';

const stylesHandler = MiniCssExtractPlugin.loader;

threadLoader.warmup(
  {
    // pool options, like passed to loader options
    // must match loader options to boot the correct pool
  },
  [
    // modules to load
    // can be any module, i. e.
    'babel-loader',
    'ts-loader',
  ]
);
const config = {
  cache: {
    type: 'filesystem',
  },
  devtool: 'source-map',
  entry: './react-creme.ts',
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
  ignoreWarnings: [
    {
      message: /export .* was not found in/,
    },
  ],
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.(tsx|ts)$/,
        use: [
          'thread-loader',
          {
            loader: 'babel-loader',
            options: {
              plugins: ['@babel/plugin-transform-runtime'],
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
          {
            loader: 'ts-loader',
            options: {
              happyPackMode: true,
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
                plugins: [
                  autoprefixer(),
                  PostCSSpresetEnv({
                    browsers: [
                      'last 2 versions',
                      'not IE 11',
                      'not op_mini all',
                    ],
                  }),
                  CSSNano(),
                  doiuse({
                    browsers: [
                      'last 2 versions',
                      'ie >= 11',
                      'not op_mini all',
                    ],
                    ignore: ['rem'],
                  }),
                ],
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
        parallel: true,
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
    filename: pkg.name + '.js',
    library: {
      // name: pkg.name,
      type: 'module',
    },
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: pkg.name + '.css',
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
    }),
    new CopyPlugin({
      patterns: [
        {
          from: 'README.md',
          to: 'README.md',
        },
      ],
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
        },
      },
    }),
    new webpack.BannerPlugin({
      banner: `${pkg.name} v${pkg.version} | ${pkg.license} | ${pkg.homepage} | ${pkg.author}`,
    }),
    new RemovePlugin({
      before: {
        include: ['./dist'],
      },
    }),
    new StatsWriterPlugin({
      stats: {
        all: true,
      },
    }),
    // new RelativeCiAgentWebpackPlugin({
    //   payloadFilepath: path.join(ARTIFACTS_DIR, 'stats.json'),
    // }),
    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ],
  resolve: {
    alias: {
      '@design': path.resolve(__dirname, './design'),
      '@icons': path.resolve(__dirname, './icons'),
    },
    extensions: ['.tsx', '.ts', '.js'],
  },
  stats: {
    assets: true,
    chunks: true,
    modules: true,
    // warningsFilter: /export .* was not found in/,
  },
};

export default () => {
  if (isProduction) {
    config.mode = 'production';
  } else {
    config.mode = 'development';
  }
  return config;
};
