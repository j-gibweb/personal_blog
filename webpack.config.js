'use strict';

module.exports = {
  cache: true,
  context: __dirname + "/public",
  entry: "./main.js",
  devtool: 'eval',
  module: {
    loaders: [
      { test: /\.html$/, loader: "html" },
      { test: /\.js$/, exclude: /(node_modules|bower_components)/, loader: 'imports' },
      { test: /\.jsx$/, exclude: /(node_modules|bower_components)/, loader: 'jsx-loader' },
      { test: /\.scss$/, loader: "style-loader!css-loader!sass-loader!autoprefixer-loader" },
      { test: /\.css$/, loader: 'style-loader!css-loader!autoprefixer-loader'},
      { test: /bootstrap\/js\//, loader: 'imports?jQuery=jquery' },
      { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" }
    ]
  },
  output: {
    path: __dirname + "/public/dist",
    filename: "bundle.js"
  },
  node: {
    // fs: "empty"
  }
};

// webpack --watch
// index.html

// webpack-dev-server --progress --colors
// http://localhost:8080/webpack-dev-server/bundle