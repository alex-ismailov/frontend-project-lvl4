// @ts-check

const Dotenv = require('dotenv-webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const mode = process.env.NODE_ENV || 'development';

module.exports = {
  mode,
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      Modal: path.resolve(__dirname, 'src/features/modal'),
      Context: path.resolve(__dirname, 'src/context'),
    },
  },
  output: {
    path: path.join(__dirname, 'dist', 'public'),
    publicPath: '/assets/',
  },
  devtool: process.env.NODE_ENV === 'production' ? false : 'source-map',
  devServer: {
    compress: true,
    port: 8080,
    host: '0.0.0.0',
    publicPath: '/assets/',
    historyApiFallback: true,
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new Dotenv(),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader' },
          { loader: 'postcss-loader' },
          { loader: 'sass-loader' },
        ],
      },
    ],
  },
};
