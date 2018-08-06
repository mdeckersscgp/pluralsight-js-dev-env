import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import ExtraxtTextPlugin from 'extract-text-webpack-plugin';

export default {
  debug: true,
   devtool: 'source-map',
   noInfo: false,
   entry: {
     vendor: path.resolve(__dirname, 'src/vendor'),
     main: path.resolve(__dirname, 'src/index')
   },
   target: 'web',
   output: {
    path: path.resolve(__dirname, 'dist'),
     publicPath: '/',
     filename: '[name].[chunkhash].js'
   },
   devServer: {
     contentBase: path.resolve(__dirname, 'src')
   },
   plugins: [
    //Generate an external css file with hash in filename
    new ExtraxtTextPlugin('[name].[contenthash].css'),

     //Hash files using md5 to change file names when code changes
     new WebpackMd5Hash(),

     //use commonchunckplugin to create a separate bundle
     //of vendor libraries so they can be cached separately
     new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
     }),

     //Eliminate duplicate packages
     new webpack.optimize.DedupePlugin(),

     //Minify js
     new webpack.optimize.UglifyJsPlugin(),

     //Create HTML file that includes references to bundled js
     new HtmlWebpackPlugin({
       template: 'src/index.html',
       minify: {
        removeComments: true,
        collapseWhitespace: true,
        useShortDoctype: true,
        removeRedundantAttributes:true,
        removeStyleLinkTypeAttributes:true,
        keepClosingSlash: true,
        minifyJS:true,
        minifyCSS: true,
        minifyURLs: true
      },
       inject: true
     }),

     //Eliminate duplicate packages when generating bundle
     new webpack.optimize.DedupePlugin(),

     //Minify JS
     new webpack.optimize.UglifyJsPlugin()
   ],
  module: {
     loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
      {test: /\.css$/, loader: ExtraxtTextPlugin.extract('css?sourceMap')}
     ]
   }
}
