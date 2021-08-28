import userService from '../services/users'

export const initUsers = () =>{
	return async dispatch => {
		console.log('entered')
		const response = await userService.getAll()
		console.log('test')
		dispatch({
			type:'INIT_USERS',
			data:response
		})
	}
} 

const reducer = (state = [],action) => {
	switch(action.type){
		case 'INIT_USERS': 
			return action.data
	}
	return state
}

export default reducer