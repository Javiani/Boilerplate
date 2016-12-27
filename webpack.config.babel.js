import path from 'path'
import glob from 'glob'
import webpack from 'webpack'

let optimize = webpack.optimize
let dev	 	 = process.env.NODE_ENV != 'production'

let config = {
	js	: './front',
	dist: `${__dirname}/dist/js/`,
	publicPath :'./dist/js/'
}

export default {

	entry : glob.sync( `${config.js}/pages/**/*.js` ).reduce( entries, {
		main:[ `${config.js}/main` ]
	}),

	output: {
		path: config.dist,
		filename: '[name].min.js',
		publicPath: config.publicPath
	},

	resolve:{
		root  :[ path.resolve(config.js) ],
		alias :{
			jails :'jails-js/source/jails'
		}
	},

	plugins :[
		new optimize.CommonsChunkPlugin('main', 'main.min.js')
	].concat(
		dev? [] :new optimize.UglifyJsPlugin({
			compress :{ warnings:false },
			minimize :true}
		)
	),

	module: {
		loaders: [{
			loader: 'babel',
			test: /\.js|\.jsx$/,
			exclude: /node_modules/,
			query:{
				presets: [ 'es2015' ],
				plugins: [[ 'transform-react-jsx', { 'pragma': 'vdom.h' } ]]
			}
		}]
	}
}

function entries( acc, file ){

	let filename  = path.basename(file, '.js'),
		directory = path.dirname(file),
		dir = directory.split(/\//).pop()

	filename = dir == 'apps' ? filename : `${dir}/${filename}`
	acc[filename] = `./${file}`

	return acc
}
