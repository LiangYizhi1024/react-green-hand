const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: './src/app.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'index.js'
	},
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['env','react']
					}
				}
			},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: "css-loader"
		        })
			},
			{
		        test: /\.scss$/,
		        use: ExtractTextPlugin.extract({
			        fallback: 'style-loader',
			        use: ['css-loader', 'sass-loader']
		        })
		    }
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template:'./src/index.html'
		}),
		new ExtractTextPlugin("index.css")
	]
};