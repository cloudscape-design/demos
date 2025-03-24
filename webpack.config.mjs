// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import path from 'node:path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import lodash from 'lodash';
import examplesList from './examples-list.json' with { type: 'json' };
import config from './scripts/config.js';

const banJsLoader = path.resolve('./scripts/ban-js-loader.js');
const mergeArrays = (a, b) => (Array.isArray(a) ? a.concat(b) : undefined);
const addEntryIteration = (entries, example) => {
  const filePath = `./src/pages/${example.path}/index`;
  entries[example.path] = ['./src/common/apply-mode.ts', './src/common/adjust-body-padding.ts', filePath];
  return entries;
};

const entries = examplesList.reduce(addEntryIteration, {});

const configs = [
  {
    entry: entries,
    output: {
      path: config.outputPath,
    },
  },
  {
    entry: {
      'fake-server': './src/fake-server/index.ts',
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: () => false,
          },
        },
      },
    },
    output: {
      libraryTarget: 'window',
      library: 'FakeServer',
      path: path.join(config.outputPath, 'libs'),
    },
    resolve: {
      extensions: ['.ts'],
    },
    module: {
      rules: [
        {
          test: /\.tsx?/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-typescript'],
            },
          },
        },
      ],
    },
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          {
            from: '**/*',
            to: path.join(config.outputPath, 'libs', 'ace'),
            context: 'node_modules/ace-builds/src-min-noconflict/',
          },
          {
            from: '*',
            to: path.join(config.outputPath, 'resources'),
            context: 'src/resources',
          },
        ],
      }),
    ],
  },
];

const createWebpackConfig = (base, { includeDevServer }) => {
  const defaults = {
    mode: process.env.NODE_ENV,

    stats: process.env.NODE_ENV === 'development' ? 'minimal' : undefined,

    ...(includeDevServer
      ? {
          devServer: {
            devMiddleware: {
              publicPath: '/' + path.relative(config.outputPath, base.output.path),
            },
            static: {
              directory: config.outputPath,
              serveIndex: {
                icons: true,
                filter: filename => filename.endsWith('.html'),
              },
            },
            port: config.devServerPort,
          },
        }
      : {}),

    devtool: 'source-map',

    output: {
      filename: '[name].js',
    },

    optimization: {
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /node_modules/,
            chunks: 'all',
            name: 'vendor',
          },
        },
      },
    },

    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },

    module: {
      rules: [
        {
          test: /\.jsx?/,
          include: path.resolve('src/pages'),
          // Fails the bundling if the demo is in JS.
          // Normal JS files outside of src/pages can be still bundled but they won't be transpiled by babel.
          use: [banJsLoader],
        },
        {
          test: /\.tsx?/,
          include: path.resolve('src'),
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
            },
          },
        },
        {
          test: /\.module\.scss$/,
          include: path.resolve('src/pages'),
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: '[path]__[local]--[hash:base64]',
                },
                url: false,
              },
            },
            {
              loader: 'sass-loader',
            },
          ],
        },
        {
          test: /\.scss$/,
          include: path.resolve('src/styles'),
          use: [
            MiniCssExtractPlugin.loader,
            { loader: 'css-loader', options: { url: false } },
            {
              loader: 'sass-loader',
            },
          ],
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.(png|jpg)$/,
          use: ['url-loader'],
        },
        {
          test: /\.svg$/,
          use: ['@svgr/webpack', 'url-loader'],
        },
      ],
    },

    plugins: [
      new MiniCssExtractPlugin({
        // Our styles are properly scoped and they can be bundled in any order
        ignoreOrder: true,
        filename: '[name].css',
      }),
    ],
  };
  return lodash.mergeWith(defaults, base, mergeArrays);
};

export default configs.map((config, index) => createWebpackConfig(config, { includeDevServer: index === 0 }));
