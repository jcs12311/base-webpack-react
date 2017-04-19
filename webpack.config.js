var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var autoprefixer = require('autoprefixer');

var TARGET = process.env.npm_lifecycle_event;
var isCSSMinimize = TARGET === 'deploy';

var cssCommonUse = [
	{
		loader: "style-loader"
	},
	{
		loader: "css-loader",
		options: {
			sourceMap: true,
			importLoaders: 1,
			minimize: isCSSMinimize
		}
	},
	{
		loader: "postcss-loader",
		options: {
      plugins: function () {
        return [autoprefixer]
      }
    }
	},
];


var UglifyJsPlugin = new webpack.optimize.UglifyJsPlugin({
		sourceMap: true,
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
  		extensions: [".js", ".jsx", ".json"]
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
			  exclude: /node_modules/,
				use: [
					"babel-loader"
				]
			}, 
			{
				test: /\.less$/,
				use: [
					{
						loader: "less-loader",
						options: {
							sourceMap: true
						}
					}, 
					...cssCommonUse
				]
			}, 
			{
				test: /\.scss$/,
				use: [
					...cssCommonUse,
					{
						loader: "sass-loader",
						options: {
							sourceMap: true
						}
					}
				]
			},
			{
				test: /\.css$/,
				use: cssCommonUse
			},
			{
				test: /\.(png|jpg|jpeg|gif)$/,
				use: ["file-loader"]
			}
		]
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