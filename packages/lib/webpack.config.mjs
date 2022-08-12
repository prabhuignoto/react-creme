// Generated using webpack-cli https://github.com/webpack/webpack-cli

import autoprefixer from 'autoprefixer';
import CopyPlugin from 'copy-webpack-plugin';
import CSSNano from 'cssnano';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path, { dirname } from 'path';
import PostCSSpresetEnv from 'postcss-preset-env';
import TerserPlugin from 'terser-webpack-plugin';
import { fileURLToPath } from 'url';
import webpack from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import pkg from './package.json' assert { type: 'json' };

const __dirname = dirname(fileURLToPath(import.meta.url));

const isProduction = process.env.NODE_ENV === 'production';

const stylesHandler = MiniCssExtractPlugin.loader;

const config = {
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
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.(tsx|ts)$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: ['@babel/plugin-transform-runtime'],
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
          'ts-loader',
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
    new webpack.BannerPlugin({
      banner: `${pkg.name} v${pkg.version} | ${pkg.license} | ${pkg.homepage} | ${pkg.author}`,
    }),
    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
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
