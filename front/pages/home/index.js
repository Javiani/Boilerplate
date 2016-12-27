import jails	 	from 'jails'
import counter 		from 'components/counter'
import thirdparty 	from 'components/third-party'
import store 		from 'components/counter/store'

jails('counter', counter)
jails('third-party', thirdparty)

// Just logging stuff, none of the code bellow is necessary.
console.log('You\'re at Home!')

store.subscribe( state => {
	console.info( 'COUNTER.Store =>', state )
})
