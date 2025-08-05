const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV || 'production',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].[contenthash].js',
    clean: true,
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      inject: 'body',
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/about.html',
      filename: 'about.html',
      inject: 'body',
    }),
    // Service pages
    new HtmlWebpackPlugin({
      template: './src/pages/services/tile-installation.html',
      filename: 'services/tile-installation-chicago-il.html',
      inject: 'body',
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/services/hardwood-floor-installation.html',
      filename: 'services/hardwood-floor-installation-chicago-il.html',
      inject: 'body',
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/services/laminate-flooring-installation.html',
      filename: 'services/laminate-flooring-installation-chicago-il.html',
      inject: 'body',
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/services/luxury-vinyl-flooring-installation.html',
      filename: 'services/luxury-vinyl-flooring-installation-chicago-il.html',
      inject: 'body',
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/services/shower-tile-installation.html',
      filename: 'services/shower-tile-installation-chicago-il.html',
      inject: 'body',
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/services/backsplash-installation.html',
      filename: 'services/backsplash-installation-chicago-il.html',
      inject: 'body',
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/services/carpet-tile-installation.html',
      filename: 'services/carpet-tile-installation-chicago-il.html',
      inject: 'body',
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/services/stone-tile-installation.html',
      filename: 'services/stone-tile-installation-chicago-il.html',
      inject: 'body',
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: './src/assets/images', to: 'images' },
        { from: './src/assets/fonts', to: 'fonts' },
        { from: './src/assets/css', to: 'css' },
        { from: './favicon.ico', to: 'favicon.ico', noErrorOnMissing: true },
      ],
    }),
  ],
  devServer: {
    static: './dist',
    hot: true,
    port: 3000,
  },
};