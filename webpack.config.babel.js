import path from 'path'
import glob from 'glob'
import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

let optimize = webpack.optimize
let dev	 	 = process.env.NODE_ENV != 'production'

let config = {
	js	: './front',
	dist: `${__dirname}/dist/`,
	publicPath :'./dist/'
}

export default {

	entry : glob.sync( `${config.js}/pages/**/*{.js,.styl}` ).reduce( entries, {
		main:[ `${config.js}/main` ]
	}),

	output: {
		path: config.dist,
		filename: '[name]/index.js',
		publicPath: config.publicPath
	},

	resolve:{
		root  :[ path.resolve(config.js), path.resolve(config.dist) ],
		alias :{
			jails :'jails-js/dist/jails.legacy'
		}
	},

	plugins :[
		new optimize.CommonsChunkPlugin('main', 'main.js')
	].concat(
		dev? [] :new optimize.UglifyJsPlugin({
			compress :{ warnings:false },
			minimize :true}
		),
		new ExtractTextPlugin('[name]/index.css', {allChunks: false})
	),

	module: {
		loaders: [{
			loader: 'babel',
			test: /\.js|\.jsx$/,
			exclude: /node_modules/,
			query:{
				presets:['es2015'],
				plugins:[['transform-react-jsx', { 'pragma': 'vdom.h'}]]
			}
		},
		{
			test:   /\.styl$/,
			loader: ExtractTextPlugin.extract('css-loader!stylus-loader?paths[]=node_modules&paths[]=front')
		}]
	}
}

function entries(acc, file){

	let filename = path.basename(file)
	let dir 	 = path.dirname(file).split(/\//).pop()
	acc[dir] 	 = (acc[dir] || []).concat(file)

	return acc
}
