const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: './src/app.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'js/index.js'
	},
	mode: 'development', // 设置mode
	performance: { 
		hints:false   
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
		    },
		    {
				test: /\.(png|svg|jpg|gif)$/i,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 8192,
							name: 'resource/[name].[ext]'
						}
					}
				]
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 8192,
							name:'resource/[name].[ext]'
						}
					}
				]
			}
		]
	},//webpack 4X 升级后取代 new webpack.optimize.CommonsChunkPlugin
	optimization: {
		splitChunks: {
			cacheGroups: {
				commons: {
			        name: 'commons',
			        chunks: 'initial',
			        minChunks: 2
        		}
			}
		}
	},
	devServer: {
		contentBase: './dist'
	},
	plugins: [
		//处理HTML文件
		new HtmlWebpackPlugin({
			template:'./src/index.html'
		}),
		//独立CSS文件
		new ExtractTextPlugin("css/[name].css")
	]
};