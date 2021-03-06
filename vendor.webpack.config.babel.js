import path from 'path';
import webpack from 'webpack';
import CompressionPlugin from 'compression-webpack-plugin';

const outputPath = path.join(__dirname, 'dist');

module.exports = {
  mode: 'production',
  context: process.cwd(),
  entry: {
    vendorPrime: [
      'lodash',
      'classnames',
      'react',
      'react-dom',
      'react-router',
      'react-router-dom',
      'connected-react-router',
      'redux',
      'axios'
    ]
  },

  output: {
    filename: '[name].js',
    path: outputPath,
    library: '[name]',
  },

  plugins: [
    new CompressionPlugin(),
    new webpack.DllPlugin({
      context: outputPath,
      name: '[name]',
      path: path.join(outputPath, '[name].json')
    })
  ]
};
