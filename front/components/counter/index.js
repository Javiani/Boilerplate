import store   	from './store'
import Template from './template.jsx'

export default ( component, form, anno )=>{

	const render = Template( form )

	component.init = ()=>{

		const value = form.counter.value

		component.on('click', 'button', onclick)

		store.subscribe( update )
		store.dispatch('UPDATE', { value })
	}

	const update = ( state = store.get() )=>{
		render( state )
	}

	const onclick = ( e )=>{
		let action = e.target.value
		store.dispatch( action )
	}
}
