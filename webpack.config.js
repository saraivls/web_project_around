const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  
  entry: './pages/index.js',

  
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    
  },

  
  mode: 'development',


  devServer: {
    static: path.resolve(__dirname, 'dist'),
    port: 3000,
    open: true,
  },

  
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', 
    }),
  ],

  
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: 'asset/resource',
      },
    ],
  },
};
