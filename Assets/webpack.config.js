const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: './js/main.js', 
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'jsMin'),
  },
  mode: 'production', // Enables minification
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
};