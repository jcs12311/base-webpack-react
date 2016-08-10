var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var autoprefixer = require('autoprefixer');

var TARGET = process.env.npm_lifecycle_event;
var cssCommonLoader = "style!css?sourceMap!postcss!";

if(TARGET === 'deploy') {
	cssCommonLoader = "style!css?sourceMap&minimize!postcss!";
}

var UglifyJsPlugin = new webpack.optimize.UglifyJsPlugin({
    minimize: true,
    output: {
        comments: false
    },
    compress: {
        warnings: false,
        screw_ie8: true
    }
});

var common = {
	context: path.join(__dirname, 'example'),
	entry: "./app.js",
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: "./bundle.js"
	},
	resolve: {
  		extensions: ['', '.js', '.jsx']
	},
	module: {
		loaders: [
		  /* set up jsx */
		  {
		    test: /\.jsx?$/,
		    exclude: /node_modules/,
		    loaders: ['babel']
		  },
		   //less
			{
			    test: /\.less$/,
			    loader: cssCommonLoader+'less?sourceMap'
			},
			//sass
			{
				test: /\.scss$/,
				loader: cssCommonLoader+'sass?sourceMap'
			},
			{
				test: /\.css$/,
				loader: cssCommonLoader
			},
			//file
			{
				test: /\.(png|jpg|jpeg|gif)$/,
				loader: 'file'
			}
		]
	},
  postcss: function () {
      return [autoprefixer];
  },
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname, 'example/index.html'),
			hash: true
		})
	]
}

if(TARGET === 'deploy'){
	module.exports = merge(common, {
		plugins: [UglifyJsPlugin]
	})
} else {
	module.exports = common;
}