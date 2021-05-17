const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const CopyWebpackPlugin = require('copy-webpack-plugin')

const IgnoreEmitPlugin = require('ignore-emit-webpack-plugin')

// const path = require('path')

const defaultConfig = require('@wordpress/scripts/config/webpack.config')

module.exports = {
  ...defaultConfig,

  mode: 'production',

  entry: {
    './recent/app': './src/Recent/index.tsx',
    './recent/editor': './src/Recent/block/index.tsx',
  },

  // watch: true,

  output: {
    ...defaultConfig.output,
    filename: '[name].js',
    path: __dirname + '/dist',
  },

  devtool: '',

  resolve: {
    ...defaultConfig.resolve,
    extensions: ['.ts', '.tsx', '.js', '.json', 'css', 'scss'],
  },

  module: {
    ...defaultConfig.module,
    rules: [
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'typings-for-css-modules-loader',
            options: {
              modules: true,
              namedExport: true,
              camelCase: true,
              localIdentName: '[name]_[local]_[hash:base64]',
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [require('autoprefixer')]
              },
            },
          },
          { loader: 'sass-loader' },
        ],
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'awesome-typescript-loader',
      },
      {
        enforce: 'pre',
        exclude: /node_modules/,
        test: /\.js$/,
        loader: 'source-map-loader',
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        exclude: /node_modules/,
        loader: 'url-loader?limit=100000',
      },
    ],
  },

  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
  },

  plugins: [
    ...defaultConfig.plugins,
    new CleanWebpackPlugin({
      dry: false,
      cleanOnceBeforeBuildPatterns: ['dist'],
    }),
    new IgnoreEmitPlugin([
      /css\/editor\.js$/,
      /css\/both\.js$/,
      /css\/frontend\.js$/,
    ]),
  ],
}
