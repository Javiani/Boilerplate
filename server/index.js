import express  from 'express'
import nunjucks from 'nunjucks'

let app = express()

nunjucks.configure(['front'], {
	express   : app,
	autoescape: false,
	watch	  : true
})

app.set('view engine', 'njk')
app.set('views', './front')
app.use( express.static('dist') )

app.get( '/:folder/:page/:action', ( req, res ) =>
	res.render( `${req.params.folder}/${req.params.page}/${req.params.action}`) )

app.get( '/:folder/:page', ( req, res ) =>
	res.render( `${req.params.folder}/${req.params.page}`) )

app.get( '/:page', ( req, res ) =>
	res.render( `${req.params.page}`) )

app.use( ( req, res ) =>{
	if (req.originalUrl === '/')
		res.redirect('pages/home/index')
})

app.listen( 3000 )
