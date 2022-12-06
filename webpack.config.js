// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { mergeWith } = require('lodash');
const examplesList = require('./examples-list');

const mergeArrays = (a, b) => (Array.isArray(a) ? a.concat(b) : undefined);

const addEntryIteration = (entries, example) => {
  const filePath = `./src/pages/${example.path}.index.jsx`;
  const entryName = path.basename(filePath, '.jsx');
  entries[entryName] = ['@babel/polyfill', 'whatwg-fetch', './src/common/apply-mode.js', filePath];
  return entries;
};

const entries = examplesList.reduce(addEntryIteration, {});

const configs = ({ outputPath }) =>
  [
    {
      entry: {
        'fake-server': './src/fake-server',
      },
      optimization: {
        splitChunks: {
          cacheGroups: {
            vendor: {
              // disable vendor chunk for fake-server
              test: () => false,
            },
          },
        },
      },
      output: {
        libraryTarget: 'window',
        library: 'FakeServer',
        path: path.join(outputPath, 'libs'),
      },
      plugins: [
        new CopyWebpackPlugin({
          patterns: [
            {
              from: '**/*',
              to: path.join(outputPath, 'libs', 'ace'),
              context: 'node_modules/ace-builds/src-min-noconflict/',
            },
            {
              from: '*',
              to: path.join(outputPath, 'resources'),
              context: 'src/resources',
            },
          ],
        }),
      ],
    },
    //
    // React
    //
    {
      entry: entries,
      output: {
        path: outputPath,
      },
    },
  ].filter(i => !!i);

const createWebpackConfig = (config, { outputPath, includeDevServer }) => {
  const defaults = {
    mode: process.env.NODE_ENV,

    stats: process.env.NODE_ENV === 'development' ? 'minimal' : undefined,

    ...(includeDevServer
      ? {
          devServer: {
            static: {
              directory: outputPath,
              serveIndex: {
                icons: true,
                filter: filename => filename.endsWith('.html'),
              },
            },
            port: 9615,
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
      extensions: ['.js', '.jsx', '.ts'],
    },

    module: {
      rules: [
        {
          test: /\.jsx?/,
          include: path.join(__dirname, 'src'),
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
        },
        {
          test: /\.scss$/,
          include: path.join(__dirname, 'src/styles'),
          use: [
            MiniCssExtractPlugin.loader,
            { loader: 'css-loader', options: { url: false } },
            {
              loader: 'sass-loader',
              options: {
                implementation: require('sass'),
              },
            },
          ],
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.png$/,
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
  return mergeWith(defaults, config, mergeArrays);
};

const options = { outputPath: path.resolve('build') };

module.exports = configs(options).map((config, index) =>
  createWebpackConfig(config, { ...options, includeDevServer: index === 1 })
);
