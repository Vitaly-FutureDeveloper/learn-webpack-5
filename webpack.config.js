const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const { loader } = require('mini-css-extract-plugin');


const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const optimisation = () => {
  const config = {
    splitChunks: {
      chunks: 'all'
    }
  };

  if(isProd){
    config.minimizer = [
      new OptimizeCssAssetsWebpackPlugin(),
      new TerserWebpackPlugin()
    ];
  }

  return config;
}

const fileName = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`;

const cssLoaders = (extra=null) => {
  const loaders = [{
    loader: MiniCssExtractPlugin.loader,
    options: {
      publicPath: path.resolve(__dirname, 'dist')
      },
    },
    'css-loader',
  ];

  if(extra){
    loaders.push(extra);
  }

  return loaders;
}

console.log('IS DEV: ', isDev);

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',

  entry: {
    main: './index.js',
    analytics: './analytics.js',
  },

  output: {
    filename: fileName('js'),
    path: path.resolve(__dirname, 'dist')
  },

  resolve: {
    extensions: ['.js', '.json'],
    alias:{
      '@models': path.resolve(__dirname, './src/models'),
      '@': path.resolve(__dirname, './src'),
    },
  },

  optimization: optimisation(),

  devServer: {
    open: true,
    hot: isDev,
    port: 4000,
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      minify: {
        collapseWhitespace: isProd,
      }
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
      {
        from: path.resolve(__dirname, './src/assets/favicon.ico'),
        to: path.resolve(__dirname, 'dist'),
      },
      ]
    }),
    new MiniCssExtractPlugin({
      filename: fileName('css')
    })
  ],

  module: {
    rules:[
      {
        test: /\.css$/,
        use: cssLoaders(),
      },
      {
        test: /\.less$/,
        use: cssLoaders('less-loader'),
      },
      {
        test: /\.(sass|scss)$/,
        use: cssLoaders('sass-loader'),
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: ['file-loader']
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        use: ['file-loader']
      },
      {
        test: /\.xml$/,
        use: ['xml-loader']
      },
      {
        test: /\.csv$/,
        use: ['csv-loader']
      },

      {
        module: {
          rules: [
            {
              test: /\.m?js$/,
              exclude: /node_modules/,
              use: {
                loader: "babel-loader",
                options: {
                  presets: ['@babel/preset-env']
                }
              }
            }
          ]
        }
      },

    ]
  }
}
