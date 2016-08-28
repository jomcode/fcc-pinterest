const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const commonConfig = require('./webpack.common');
const helpers = require('./helpers');

const devPlugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      HMR: JSON.stringify(process.env.HMR)
    }
  })
];

if (helpers.isHot) devPlugins.push(new webpack.HotModuleReplacementPlugin());

const hotEntry = {
  reacthotloader: 'react-hot-loader/patch',
  webpackdevserver: `webpack-dev-server/client?http://${helpers.host}:${helpers.port}`,
  onlydevserver: 'webpack/hot/only-dev-server',
  polyfills: path.join(helpers.sourceDir, 'polyfills.js'),
  vendor: path.join(helpers.sourceDir, 'vendor.js'),
  main: helpers.mainPath
};

module.exports = webpackMerge(commonConfig, {
  entry: helpers.isHot ? hotEntry : undefined,
  debug: true,
  devtool: 'cheap-module-source-map',
  output: {
    path: helpers.outputDir,
    filename: '[name].js',
    sourceMapFilename: '[name].map',
    chunkFilename: '[id].chunk.js'
  },
  // module: {
    // loaders: []
  // },
  plugins: devPlugins,
  devServer: {
    contentBase: helpers.outputDir,
    host: helpers.host,
    port: helpers.port,
    historyApiFallback: true,
    hot: helpers.isHot,
    inline: true,
    stats: {
      chunks: false,
      colors: true,
      timings: true,
      version: false,
      hash: false,
      assets: false,
      chunkModules: false,
      modules: false,
      children: false
    }
  },
  node: {
    global: 'window',
    crypto: 'empty',
    process: true,
    module: false,
    clearImmediate: false,
    setImmediate: false
  }
});
