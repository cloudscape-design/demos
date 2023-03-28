// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { mergeWith } = require('lodash');
const { outputPath, devServerPort } = require('./scripts/config');
const examplesList = require('./examples-list');

const mergeArrays = (a, b) => (Array.isArray(a) ? a.concat(b) : undefined);

const addEntryIteration = (entries, example) => {
  const filePath = `./src/pages/${example.path}/index`;
  entries[example.path] = ['./src/common/apply-mode', filePath];
  return entries;
};

const entries = examplesList.reduce(addEntryIteration, {});

const configs = [
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

const createWebpackConfig = (config, { includeDevServer }) => {
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
            port: devServerPort,
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
          include: path.join(__dirname, 'src'),
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
        },
        {
          test: /\.tsx?/,
          include: path.join(__dirname, 'src'),
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
            },
          },
        },
        {
          test: /\.module\.scss$/,
          include: path.join(__dirname, 'src/pages'),
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                modules: true,
                url: false,
              },
            },
            'sass-loader',
          ],
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

module.exports = configs.map((config, index) => createWebpackConfig(config, { includeDevServer: index === 1 }));
