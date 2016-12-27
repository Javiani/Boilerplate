import jails from 'jails'
import scriptjs from 'scriptjs'
import logger from 'jails-modules/logger'
import adapter from 'modules/jquery.adapter'

let mainscript 	= document.getElementById('main-script')
let app = mainscript.getAttribute('data-application')
let jquery = '//code.jquery.com/jquery-3.1.1.min.js'

scriptjs([ app, jquery ], ()=>{
	logger()
	jails.events = adapter( jQuery )
	jails.start()
})
