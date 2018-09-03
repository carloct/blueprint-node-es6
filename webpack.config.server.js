const path = require('path');
const nodeExternals = require('webpack-node-externals');
const NodemonPlugin = require('nodemon-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  name: 'server',
  target: 'node',
  externals: [nodeExternals()],
  entry: './src/server/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'server.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/env',
                {
                  targets: {
                    node: 'current'
                  }
                }
              ],
              '@babel/react'
            ]
          }
        },
        exclude: /node_modules/
      }
    ]
  },
  plugins: [new NodemonPlugin()],
  devtool: isDev ? 'source-maps' : 'none',
  resolve: {
    extensions: ['.js', '.jsx']
  }
};
