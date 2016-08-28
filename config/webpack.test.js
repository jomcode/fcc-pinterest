const path = require('path');
const webpack = require('webpack');

const helpers = require('./helpers');

module.exports = {
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['', '.js', '.jsx', '.json']
  },
  module: {
    preLoaders: [
      {
        test: /\.js?$/,
        loader: 'source-map-loader',
        exclude: [
          path.join(helpers.modulesDir, 'rxjs')
        ]
      }
    ],
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loaders: ['babel'],
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loaders: ['json']
      }
    ],
    postLoaders: []
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        HMR: JSON.stringify(process.env.HMR),
        SANITY: JSON.stringify(process.env.SANITY)
      }
    })
  ],
  externals: {
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true
  }
};
