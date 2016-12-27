import scriptjs from 'scriptjs'

export default ( component, element, anno )=>{

	const name = element.getAttribute('name')
	const src  = element.getAttribute('data-src')

	component.init = ()=>{
		load()
	}

	const load = ()=>{
		if( src ){
			scriptjs([ src ], ()=> component.publish( `third-party:${name}`, { name, element } ))
		}else{
			try{
				new Function( element.text )()
				component.publish( `third-party:${name}`, { name, element } )
			}catch(e){
				console.error( e, element )
			}
		}
	}
}
