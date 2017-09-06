var path = require("path");
module.exports = {
	entry: {
		app: ['whatwg-fetch',"./src2/index.js"]
	},
	output: {
		path: path.resolve(__dirname, "build"),
		publicPath: "/assets/",
		filename: "bundle.js"
	},
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
