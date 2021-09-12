const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ZipPlugin = require('zip-webpack-plugin');
const config = require('./webpack.config');

const projectTitle = require('./package.json').displayName;

config.mode = 'production';

config.devtool = 'source-map';

config.output = {
  path: path.join(__dirname, 'build'),
  filename: '[name]-[contenthash].js'
};

config.module = {
  rules: [
    {
      test: /\.(gif|png|jpe?g)$/i,
      use: [{
        loader: 'file-loader',
        options: {
          name: '[name]-[contenthash].[ext]',
          outputPath: 'images/'
        }
      }]
    },

    {
      test: /\.(ogg|mp3|wav|mpe?g)$/i,
      use: [{
        loader: 'file-loader',
        options: {
          name: '[name]-[contenthash].[ext]',
          outputPath: 'sounds/'
        }
      }]
    },

    {
      test: /\.css|.scss$/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            sourceMap: true
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
            config: { path: 'postcss.config.js' }
          }
        }
      ]
    },

    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }
  ]
};

config.plugins = [
  new MiniCssExtractPlugin({ filename: '[name]-[contenthash].css' }),
  new HtmlWebpackPlugin({
    title: projectTitle,
    favicon: './favicon.ico',
    template: 'index.html',
    minify: {
      collapseWhitespace: true,
      removeComments: true
    }
  }),
  new ZipPlugin({
    exclude: [/\.map$/]
  })
];

config.optimization = {
  minimizer: [
    new TerserPlugin({
      sourceMap: true,
      terserOptions: {
        compress: { drop_console: true },
        output: { comments: false },
        module: true
      }
    }),
    new OptimizeCSSAssetsPlugin({})
  ]
};

module.exports = config;
