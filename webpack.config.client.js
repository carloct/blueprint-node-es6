const path = require('path');
const autoprefixer = require('autoprefixer');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  devtool: isDev ? 'cheap-module-source-map' : 'none',
  name: 'client',
  target: 'web',
  entry: './src/client/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/static/',
    filename: 'client.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env', '@babel/react']
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.(css|scss)$/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [autoprefixer()]
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  },
  plugins: [new CleanWebpackPlugin(['dist'])],
  resolve: {
    extensions: ['.js', '.jsx']
  }
};
