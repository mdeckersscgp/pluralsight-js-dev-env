import path from 'path';

export default {
  debug: true,
   devtool: 'inline-source-map',
   noInfo: false,
   entry: [
     path.resolve(__dirname, 'src/index')
   ],
   target: 'web',
   output: {
     path:path.resolve(__dirname, 'src'),
     publicPath: '/',
     filename: 'bundle.js'
   },
   devServer: {
     contentBase: path.resolve(__dirname, 'src')
   },
   plugins: [],
   modules: {
     loaders: [
       {test: /\.js$/, exclude: /node_modules/, loaders: ['bable']},
       {test: /\.css$/, loadrs: ['style', 'css']}
     ]
   }
};
