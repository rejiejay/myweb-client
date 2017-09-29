var path = require("path");
var webpack = require("webpack");

module.exports = {
	entry: {
		app: ['whatwg-fetch',"./src2/index.js"]
	},
	output: {
		path: path.resolve(__dirname, "build2"),
		publicPath: "./",
		filename: '[name].js',
		chunkFilename: '[name].js'
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env':{
				'NODE_ENV': JSON.stringify('production')
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress:{
				warnings: true
			}
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name:'vendor'
		})
	],
	module: {
		loaders: [
		  {
		    test: /\.jsx?$/,
		    exclude: /(node_modules|bower_components)/,
		    loader: 'babel',
		    query: {
		      presets: ['react', 'es2015']
		    }
		  }
		]
	}
};