export default ( jquery )=>{
	return{
		on(el, ev, callback){
			$(el).on(ev, function(e, data){
				e.detail = data? data.detail :e.detail
				return callback.call(this, e)
			})
		},
		off(el, ev, callback){
			$(el).off(ev)
		},
		trigger(el, ev, args){
			$(el).trigger(ev, {detail:args} )
		}
	}
}
