import litestore from 'jails-modules/litestore'

let store

export default store = litestore({
	counter :0
})

store.actions({

	ADD( state, payload ){
		state.counter = state.counter + 1
		return state
	},

	SUBTRACT( state, payload ){
		state.counter = state.counter - 1
		return state
	},

	UPDATE( state, payload ){
		state.counter = +payload.value
		return state
	}
})
