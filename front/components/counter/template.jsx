import vdom from 'jails-modules/vdom'

export default vdom(( state )=>{
	return (
		<div class="holder">
			<input type="number" value={ String(state.counter) } readonly />
			<button type="button" value="SUBTRACT">-</button>
			<button type="button" value="ADD">+</button>
		</div>
	)
})
